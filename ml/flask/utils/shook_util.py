import pandas as pd
from sqlalchemy import and_, func
from sklearn.metrics.pairwise import cosine_similarity
from models.ShookLike import ShookLike
from models.Shook import Shook
from models.Member import Member
from models.DTO.ShookLikeResponseDTO import ShookLikeResponseDTO
from models.DTO.ShookResponseDTO import ShookResponseDTO
from config.dbConfig import db

#========================================================================
#1. member_id를 받으면 member_id랑 매칭되는 shook_like 정보를 들고 옴
def get_shook_like(memberId):
    
    shook_likes = ShookLike.query.filter(and_(ShookLike.member_id == memberId,ShookLike.like_status == 1)).all()
    shook_likes_data = [
        ShookLikeResponseDTO(shook_like)
        for shook_like in shook_likes
    ]

    member_df = pd.DataFrame(shook_likes_data)

    return member_df


#2. 1 의 결과를 바탕으로 shook 행렬 반환
def get_df(member_df, member_id):

    shookIds = member_df["shook_id"].tolist()
    
    shook_likes = ShookLike.query.filter(ShookLike.shook_id.in_(shookIds)).all()
    shook_likes_data = [
        ShookLikeResponseDTO(shook_like)
        for shook_like in shook_likes
    ]
    
    # SQL 쿼리 실행
    # df = pd.read_sql(sql_query, conn, params=params)
    df = pd.DataFrame(shook_likes_data)
    # user 제외 나머지 행렬 안 본 값은 0으로
    df_pivoted = df.pivot(index='member_id', columns='shook_id', values='like_status').fillna(0)

    return df_pivoted

#3. 2의 결과물을 받고 가장 유사한 사람 명 수 추려오는 함수
#ex) Int64Index([42, 34, 73, 53, 30], dtype='int64', name='member_id')
def get_user_similarity(df_pivoted, user_id):
    
    #유사도 측정
    user_similarity = cosine_similarity(df_pivoted)
    #행렬 만들기
    user_based_collabor = pd.DataFrame(data = user_similarity, index=df_pivoted.index, columns=df_pivoted.index)
    #자기 자신 제외 상위 5명 (이건 앞으로 개선 가능)
    similar_list = user_based_collabor.loc[user_id].sort_values(ascending=False)[1:6]
    # print(similar_list.index.tolist())
    return similar_list

#4. similar_list 받아서 얘네 정보 다 출력해옴
def get_compare_matrix(similar_list):
    
    memberIds = similar_list.index.tolist()
    shook_likes = ShookLike.query.filter(ShookLike.member_id.in_(memberIds)).all()
    shook_likes_data = [
        ShookLikeResponseDTO(shook_like)
        for shook_like in shook_likes
    ]

    df = pd.DataFrame(shook_likes_data)
    compare_matrix = df.pivot(index='member_id', columns='shook_id', values='like_status').fillna(0)

    return compare_matrix

#5. 유사도 가중치가 부여된 값 생성
def get_similar_summarize(compare_matrix, similar_list):
    similar_summarize = compare_matrix
    
    for idx, weight in enumerate(similar_list):
        similar_summarize.loc[similar_list.index[idx]] *= weight

    return similar_summarize

#6. shook_id_list 반환
def get_shook_list(similar_summarize,df_pivoted):

    col_sum = similar_summarize[similar_summarize.columns].sum()
    sorted_col_sum = col_sum.sort_values(ascending=False)
    sorted_index = sorted_col_sum.index.tolist()
    
    exclude_targets = df_pivoted.columns.tolist()
    
    # 748 -> 390
    sorted_index = [idx for idx in sorted_index if idx not in exclude_targets]
        
    return sorted_index

#7. shook 반환
def get_shooks(shook_ids):
    
    shook_ids = shook_ids[:11]
    
    shooks = Shook.query.filter(Shook.shook_id.in_(shook_ids)).all()
        
    shooks_list = [ShookResponseDTO(shook) for shook in shooks]
    
    return shooks_list


def get_random_shooks(page):

    results = []

    start = (page - 1) * 10
    cnt = 10
    

    """
        select a.shook_id, a.book_title, a.shook_image_url, a.book_id, a.member_id 
        from shook a join shook_like b on a.shook_id = b.shook_id
        group by a.shook_id, a.book_title, a.shook_image_url, a.book_id, a.member_id
        order by sum(b.like_status) desc
        limit %s, %s
        ;
    """
    
    results = db.session.query(
        Shook.shook_id,
        Shook.book_title,
        Shook.shook_image_url,
        Shook.book_id,
        Shook.member_id,
        func.sum(ShookLike.like_status).label('total_likes')
    ).join(
        ShookLike, Shook.shook_id == ShookLike.shook_id
    ).group_by(
        Shook.shook_id, Shook.book_title, Shook.shook_image_url, Shook.book_id,Shook.member_id
    ).order_by(
        func.sum(ShookLike.like_status).desc()
    ).offset(start).limit(cnt).all()
    
    shook_list = [ShookResponseDTO(shook) for shook in results]
    
    return shook_list
    
    
    
    



