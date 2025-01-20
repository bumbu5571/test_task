import { Swiper, SwiperSlide } from 'swiper/react';
import { HistoricalEventsArray } from "@/lib/types";
import styled from "styled-components";

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Navigation } from 'swiper/modules';

import Arrow from '@/assets/arrow_right.svg'
import { memo, useRef, useState } from 'react';
import { Swiper as TypeSwiper } from 'swiper/types';
import { historicalEventsData } from '@/lib/data';
import gsap from 'gsap';

const StyledCardHeader = styled.header`
  font-family: "Bebas Neue";
  font-size: 25px;
  font-weight: 400;
  line-height: 30px;
  color: var(--gradient-first)
`;

const StyledCardText = styled.p`
  margin: 15px 0 0 0;
  font-size: 20px;
  font-weight: 400;
  line-height: 30px;
  color: var(--contrastText);
  white-space: collapse;
  overflow: hidden; 
`;

const StyledWrapperSwiper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  margin-bottom: 104px;
`;

const StyledButtonSwiper = styled.div<TypeStyledButtonSwiper>`
  position: absolute;
  ${({$position}) => $position === "left" ?
    `left: 20px; transform: rotate(180deg)`
    : `right:20px`};
  width: 40px;
  height: 40px ;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 15px 0 var(--arrow-swiper);
`;

const StyledEvents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: end;
  position: absolute;
  left: 0;
  top: -144px;
  width: 120px;
  height: 88px;
  margin-left: 80px;
`;

const StyledWrapperButtonEvents = styled.div`
  display: flex;
  gap: 20px;
`;

const StyledButtonEvents = styled.div<TypeStyledButtonSwiper >`
  ${({$position}) => $position === "left" ?
    `left: 20px; transform: rotate(180deg)`
    : `right:20px`};
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid var(--arrow-hidden);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledTextEventsPosition = styled.p`
  position: absolute;
  left: 0;
  top: 0;
  margin: 0;
  font-size: 14px;
  font-weight: 400;
  line-height: 18.12px;
  color: var(--arrow-view);
  align-self: self-start;
`;

interface TypeStyledButtonSwiper {
  $position: string;
};

type TypeEventDetailsSlider = {
  events: HistoricalEventsArray;
  setEvents: React.Dispatch<React.SetStateAction<HistoricalEventsArray>>;
  activeEvents: number;
  setActiveEvents: React.Dispatch<React.SetStateAction<number>>;
  sortByEvent: (array: HistoricalEventsArray) => HistoricalEventsArray;
};

const MemoEventDetailsSlider = memo ( function EventDetailsSlider(
  {
    events,
    setEvents,
    activeEvents,
    setActiveEvents,
    sortByEvent,
  }: TypeEventDetailsSlider
) {
  const swiperRef = useRef<TypeSwiper>(null);
  const buttonSwiperNextRef = useRef<React.ElementRef<typeof StyledButtonSwiper>>(null);
  const buttonSwiperPrevRef = useRef<React.ElementRef<typeof StyledButtonSwiper>>(null);

  const [isEventsEnd, setIsEventsEnd] = useState<boolean>(false)
  const [isEventsStart, setIsEventsStart] = useState<boolean>(true)

  const angle = 360 / events.length;

  const [isAnimation, setIsAnimation] = useState(false);

  const slideNext = () => {
    swiperRef.current.slideNext();
  };

  const slidePrev = () => {  
    swiperRef.current.slidePrev()
  };

  const handleSwiper = (swiper: TypeSwiper) => {
    swiperRef.current = swiper;

  swiper.on("reachEnd", () => {
    buttonSwiperNextRef.current.classList.add("hidden_arrow_swiper");
  });

  swiper.on("reachBeginning", () => {
    buttonSwiperPrevRef.current.classList.add("hidden_arrow_swiper");
  });

  swiper.on("fromEdge", () => {
    if (!swiperRef.current.isEnd) buttonSwiperNextRef.current.classList.remove("hidden_arrow_swiper");

    if (!swiperRef.current.isBeginning) buttonSwiperPrevRef.current.classList.remove("hidden_arrow_swiper");
  });
};

  const handleClickNext = () => {
    if ( activeEvents === (events.length - 2) ) {
      setIsEventsEnd((prev) => !prev)
    }
    if (activeEvents < 5 && !isAnimation) {
      const rotationAngle = (activeEvents + 1) * angle;
      setIsAnimation(prev => !prev)
       gsap
        .timeline()
        .to(`.p_${activeEvents}`, {width: 6, height: 6, background: "#42567A", overflow: 'hidden', duration: .33,})
        .to(".circle", {
          rotation: `-${rotationAngle}`,duration:1, transformOrigin: "50% 50%"
        })
        .to(`.point`, {rotate: rotationAngle})
        .to(`.p_${activeEvents + 1}`, {width: 56, height: 56, background: "#fff", overflow: 'hidden', duration: .33, onComplete: () => {
          setIsAnimation(prev => !prev)
          }
        });
      
      if (isEventsStart) setIsEventsStart((prev) => !prev);
      const num = activeEvents + 1;
      setActiveEvents(num);
      setEvents(sortByEvent(historicalEventsData[num]))
    };
    return;
  };

  const handleClickPrev = () => {
    if ( activeEvents === 1 ) {
      setIsEventsStart((prev) => !prev)
    }

    if (activeEvents > 0 && !isAnimation) {
      const rotationAngle = ((activeEvents + events.length - 1) * angle);
      setIsAnimation(prev => !prev)
      gsap
        .timeline()
        .to(`.p_${activeEvents}`, {width: 6, height: 6, background: "#42567A", overflow: 'hidden', duration: .33})
        .to(".circle", {
          rotation: `-${rotationAngle}`,duration:1, transformOrigin: "50% 50%"
        })
        .to(`.point`, {rotate: rotationAngle})
        .to(`.p_${activeEvents - 1}`, {width: 56, height: 56, background: "#fff", overflow: 'hidden', duration: .33, onComplete: () => {
          setIsAnimation(prev => !prev)
          }
        });

      if (isEventsEnd) setIsEventsEnd((prev) => !prev);
      const num = activeEvents - 1;
      setActiveEvents(num);
      setEvents(sortByEvent(historicalEventsData[num]))
    };
    return;
  };

  return (
    <StyledWrapperSwiper>
      <StyledEvents>
        <StyledTextEventsPosition>{`0${activeEvents + 1}/0${events.length}`}</StyledTextEventsPosition>
        <StyledWrapperButtonEvents>
          <StyledButtonEvents
            onClick={handleClickPrev}
            $position={"left"}
            className={isEventsStart ?"color_border_hidden" : "color_border_view"} >
              <Arrow width={6.25}
              height={12.5}
              className={isEventsStart ? "color_arrow_hidden": "color_arrow_view"} />
          </StyledButtonEvents>
          <StyledButtonEvents
            onClick={handleClickNext}
            $position={"right"}
            className={isEventsEnd ? "color_border_hidden" : "color_border_view"}>
              <Arrow width={6.25} height={12.5} className={isEventsEnd ? "color_arrow_hidden" : "color_arrow_view"} />
          </StyledButtonEvents>
        </StyledWrapperButtonEvents>
      </StyledEvents>
      
      <Swiper
      onSwiper={handleSwiper}
      modules={[Navigation]}
      slidesPerView={3}
      spaceBetween={80}
      grabCursor={true}
      centeredSlides={true}
      centeredSlidesBounds={true}
      className={isAnimation ? "swiper_hidden" : ''}
      > 
        {events.map((event) => 
        <SwiperSlide key={event.date} >
          <StyledCardHeader>{event.date}</StyledCardHeader>
          <StyledCardText>{event.description}</StyledCardText>
        </SwiperSlide>)}
      </Swiper>
      <StyledButtonSwiper
        className={isAnimation ? 'swiper_hidden' : 'hidden_arrow_swiper'}
        ref={buttonSwiperPrevRef}
        onClick={slidePrev}
        $position={"left"} >
        <Arrow width={5} height={10} className={"color_arrow_swiper"}/>
      </StyledButtonSwiper>
      <StyledButtonSwiper
        className={isAnimation ? 'swiper_hidden' : ''}
        ref={buttonSwiperNextRef}
        onClick={slideNext}
        $position={"right"} >
        <Arrow width={5} height={10} className={"color_arrow_swiper"} />
      </StyledButtonSwiper>
    </StyledWrapperSwiper>
  )
})
export default MemoEventDetailsSlider