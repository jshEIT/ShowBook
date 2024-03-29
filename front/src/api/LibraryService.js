import { localAxios } from '../utils/http-commons';
const axios = localAxios();
const BASE_URL = process.env.REACT_APP_BASE_URL;

// 읽고 싶은 책 등록
export const createWishBook = (bookId) => {
  // axios
  //   .post(
  //     `/api/library/registration`,
  //     { withCredentials: true },
  //     {
  //       params: { book_id: bookId },
  //       headers: {
  //         'Authorization': localStorage.getItem('accessToken'),
  //       },
  //     },
  //   )
  //   .then((res) => {
  //     console.log(res.data);
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });
  try {
    axios.post(
      `${BASE_URL}/api/library/registration`,
      {},
      {
        headers: {
          'Authorization': localStorage.getItem('accessToken'),
        },
        params: { book_id: bookId },
      },
    );
    //console.log('response.data 타입확인 : ' + typeof response.data);
    console.log('bookId 확인: ' + bookId);
    //return response;
  } catch (error) {
    console.error('Error fetching shook:', error);
    throw error;
  }
};

// 서재별 책 조회
export const getAllbooks = async (readStatus) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/library`, {
      params: { read_status: readStatus },
      headers: {
        'Authorization': localStorage.getItem('accessToken'),
      },
    });
    console.log('FETCH ');
    //console.log('response.data 타입확인 : ' + typeof response.data);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching shook:', error);
    throw error;
  }
};

// 서재 간 책 이동
// Todo: RequestBody 추가
export const moveBooks = (readStatus) => {
  axios
    .patch(
      `/api/library?read_status=${readStatus}`,
      {
        headers: {
          'Authorization': localStorage.getItem('accessToken'),
        },
        data: {},
      },
      { withCredentials: true },
    )
    .then((res) => {
      console.log(res.data);
    })
    .catch((error) => {
      console.error(error);
    });
};

// 서재 내 책 삭제
// export const deleteBook = (readStatus) => {
//   axios
//     .patch(
//       `/api/library?read_status=${readStatus}`,
//       {
//         headers: {
//           'Authorization': localStorage.getItem('accessToken'),
//         },
//         body: {},
//       },
//       { withCredentials: true },
//     )
//     .then((res) => {
//       console.log(res.data);
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// };