import styled from 'styled-components';

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const Title = styled.div`
  font-size: 20px;
  color: ${({ $isactive }) => ($isactive ? 'var(--main)' : '#999')};
  border: 2px solid
    ${({ $isactive }) => ($isactive ? 'var(--main)' : 'var(--bg-gray)')};

  border-radius: 30px;
  padding: 8px 20px;
  margin-left: 10px;
  margin-right: 10px;
`;
export const ErrorMessage = styled.div`
  color: var(--main);
  margin: 10px 0;
  text-align: center;
  position: absolute; // 절대 위치 설정
  top: 50%; // 컨테이너 상단에 위치
  left: 0; // 왼쪽 정렬
  right: 0; // 오른쪽 정렬
  z-index: 10; // 다른 요소 위에 오버레이
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  height: 80vh;
  padding-left: 14px;
  padding-right: 14px;
`;

export const Loading = styled.span`
  color: ${(props) => props.color || 'var(--font-black)'};
  font-weight: ${(props) => (props.bold ? '920' : '620')};
  white-space: pre-wrap;
  font-size: 16px;
  padding: 5px;
  align-content: center;
`;
