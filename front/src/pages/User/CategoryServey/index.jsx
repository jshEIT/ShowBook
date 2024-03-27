import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  CategoryButton,
  Button,
  CategoryContainer,
  Heading,
  Container,
  SmallLetters,
  MarginBottom,
} from '../../../components/common/styles/CommonStyles';
import CATEGORIES from './CATEGORIES';
import CATEGORY_MAPPING from './CATEGORY_MAPPING';
import { MemberService } from '../../../api/MemberService';

const memberService = new MemberService();

function SelectCategory() {
  const location = useLocation();
  
  let navigate = useNavigate();
  const [selectedCategories, setSelectedCategories] = useState([]);

  const toggleCategory = (category) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter((c) => c !== category);
      } else if (prev.length < 3) {
        // 최대 3개까지 선택 가능
        return [...prev, category];
      }
      return prev;
    });
  };

  const handleSubmit = () => {
    navigate('/main');
    // 선택된 카테고리를 처리하는 로직
    const memberInfo = {...location.state, categories : selectedCategories}
    console.log("member의 정보")
    console.log(memberInfo.categories)
    memberService.signup(memberInfo);
  };

  return (
    <Container>
      <Heading>관심있는 카테고리를</Heading>
      <Heading>선택해주세요!</Heading>
      <SmallLetters>1개 이상 3개 이하 필수</SmallLetters>

      <CategoryContainer>
        {CATEGORIES.map((category) => (
          <CategoryButton
            key={category}
            onClick={() => toggleCategory(category)}
            selected={selectedCategories.includes(category)}
          >
            {CATEGORY_MAPPING[category]}
          </CategoryButton>
        ))}
      </CategoryContainer>
      <MarginBottom />
      <Button onClick={handleSubmit}>회원가입 완료</Button>
    </Container>
  );
}

export default SelectCategory;