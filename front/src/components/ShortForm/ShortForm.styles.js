import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';

export const StyledSwiperSlide = styled(SwiperSlide)`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  font-size: 22px;
  font-weight: bold;
  color: #fff;
`;

export const StyledSwiper = styled(Swiper)`
  aspect-ratio: 3 / 4.43;

  width: 90svw;
  max-width: 100%;
`;
export const CurrentBookTitle = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  color: #000;
  font-size: 24px;
  background-color: #fff;
  padding: 10px;
  border-radius: 8px;
`;