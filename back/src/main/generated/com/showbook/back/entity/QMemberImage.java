package com.showbook.back.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QMemberImage is a Querydsl query type for MemberImage
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QMemberImage extends EntityPathBase<MemberImage> {

    private static final long serialVersionUID = 831694306L;

    public static final QMemberImage memberImage = new QMemberImage("memberImage");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath imageUrl = createString("imageUrl");

    public final StringPath memberImageName = createString("memberImageName");

    public final StringPath originalImageName = createString("originalImageName");

    public QMemberImage(String variable) {
        super(MemberImage.class, forVariable(variable));
    }

    public QMemberImage(Path<? extends MemberImage> path) {
        super(path.getType(), path.getMetadata());
    }

    public QMemberImage(PathMetadata metadata) {
        super(MemberImage.class, metadata);
    }

}

