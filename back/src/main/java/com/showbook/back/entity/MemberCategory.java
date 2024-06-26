package com.showbook.back.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class MemberCategory {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long memberCategoryId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "member_id")
	private Member member;

	@Enumerated(EnumType.STRING)
	private Category category;

	@Builder
	public MemberCategory(Long memberCategoryId, Member member, Category category) {
		this.memberCategoryId = memberCategoryId;
		this.member = member;
		this.category = category;
	}
}
