import { Swiper, SwiperSlide } from 'swiper/react';
import { HistoricalEventsArray } from "@/lib/types";
import styled from "styled-components";

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Navigation } from 'swiper/modules';

import Arrow from '@/assets/arrow_right.svg'
import { useRef } from 'react';
import { Swiper as TypeSwiper } from 'swiper/types';

const StyledCardHeader = styled.header`
  font-size: 25px;
  font-weight: 400;
  line-height: 30px;
  color: var(--gradient-first)
`;

const StyledTextHeader = styled.p`
  margin: 15px 0 0 0;
  font-size: 20px;
  font-weight: 400;
  line-height: 30px;
  color: var(--contrastText);
  white-space: collapse;
  overflow: hidden; 
`;

const StyledWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  margin-bottom: 104px;
`;

type TypeStyledButtonSwiper = {
  $position: string;
};

const StyledButtonSwiper = styled.div<TypeStyledButtonSwiper>`
  position: absolute;
  ${({$position}) => $position === "left" ?
    `left: 20px; transform: rotate(180deg)`
    : `right:20px`};
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 15px 0 var(--arrow);
`;

type TypeEventDetailsSlider = {
  events: HistoricalEventsArray;
};

export default function EventDetailsSlider({events}: TypeEventDetailsSlider) {
  const swiperRef = useRef(null);
  const buttonNextRef = useRef(null);
  const buttonPrevRef = useRef(null);

  const slideNext = () => {
    swiperRef.current.slideNext();
  };

  const slidePrev = () => {  
    swiperRef.current.slidePrev()
  };

  const handleSwiper = (swiper: TypeSwiper) => {
    swiperRef.current = swiper;

    swiper.on("reachEnd", () => {
      buttonNextRef.current.classList.add("hidden");
    });

    swiper.on("reachBeginning", () => {
      buttonPrevRef.current.classList.add("hidden");
    });

    swiper.on("fromEdge", () => {
      if (!swiperRef.current.isEnd) buttonNextRef.current.classList.remove("hidden");

      if (!swiperRef.current.isBeginning) buttonPrevRef.current.classList.remove("hidden");
    });
    
  };

  return (
    <StyledWrapper>
      <Swiper
      onSwiper={handleSwiper}
      modules={[Navigation]}
      slidesPerView={3}
      spaceBetween={80}
      grabCursor={true}
      centeredSlides={true}
      centeredSlidesBounds={true}
      className="mySwiper"
      > 
        {events.map((event) => 
        <SwiperSlide key={event.date} >
          <StyledCardHeader>{event.date}</StyledCardHeader>
          <StyledTextHeader>{event.description}</StyledTextHeader>
        </SwiperSlide>)}
      </Swiper>
      <StyledButtonSwiper className='hidden' ref={buttonPrevRef} onClick={slidePrev} $position={"left"}>
        <Arrow width={5} height={10} />
      </StyledButtonSwiper>
      <StyledButtonSwiper ref={buttonNextRef} onClick={slideNext} $position={"right"}>
        <Arrow width={5} height={10} />
      </StyledButtonSwiper>
    </StyledWrapper>
  )
}
