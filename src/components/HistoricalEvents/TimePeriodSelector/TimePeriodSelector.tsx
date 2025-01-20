import { historicalEventsData } from "@/lib/data";
import { HistoricalEventsArray } from "@/lib/types";
import gsap from "gsap";
import { EventHandler, JSX, useEffect, useRef, useState } from "react";
import styled from "styled-components";

type TypeStyledPoint = {
  $coordX: number;
  $coordY: number;
  $i: number;
}

const StyledCircle = styled.div`
  position: relative;
  margin-top: 215px;
  margin-bottom: 96px;
  width: 530px;
  height: 530px;
  border: 1px solid var(--contrastText);
  border-radius: 50%;
  opacity: 100%;
`;

const StyledPoint = styled.div<TypeStyledPoint>`
  position: absolute;
  width: /* 6px; */ ${({$i}) => $i === 0 ? "56px" : "6px"};
  height:/* 6px; */ ${({$i}) => $i === 0 ? "56px" : "6px"};
  background: /* var(--contrastText); */${({$i}) => $i === 0 ? '#fff' : 'var(--contrastText)'};
  border: 1px solid var(--contrastText);
  border-radius: 50%;
  top:  calc(50% + ${({  $coordY }) => (`${$coordY}px`)});
  left: calc(50% + ${({ $coordX }) => (`${$coordX}px`)});
  transform: translate(-50%, -50%);
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 400;
  line-height: 30px;
  color: var(--arrow-view);
  overflow: hidden;
`;

type TypeTimePeriodSelector = {
  eventsLength: number;
  isAnimation: boolean;
  setIsAnimation: React.Dispatch<React.SetStateAction<boolean>>;
  activeEvents: number;
  setActiveEvents: React.Dispatch<React.SetStateAction<number>>;
  setEvents: React.Dispatch<React.SetStateAction<HistoricalEventsArray>>;
  sortByEvent: (array: HistoricalEventsArray) => HistoricalEventsArray;
  angle: number;
};

 export default function TimePeriodSelector(
  {
    eventsLength,
    isAnimation,
    setIsAnimation,
    activeEvents,
    setActiveEvents,
    setEvents,
    sortByEvent,
    angle
  }: TypeTimePeriodSelector
) {
  const angleStep = (2 * Math.PI) / eventsLength;
  const points: Array<JSX.Element> = [];
  const refStyledCircle = useRef<HTMLDivElement>(null);
  const [radiusCicle, setRadiusCicle] = useState<number>(0);

  useEffect(() => {
    if(refStyledCircle.current) {
      const { width } = getComputedStyle(refStyledCircle.current)
      setRadiusCicle(parseInt(width)/2);
    }
  },[])

  const handlePointerEnter  = (e: React.PointerEvent<HTMLDivElement>, i: number) => {
    const div = e.target as HTMLDivElement;
    if (!div.classList.contains(`p_${activeEvents}`)) {
      gsap.to(`.p_${i}`, {width: 56, height: 56, background: "#fff", duration: .33,});
    };
    return;
  };

  const handlePointerLeave  = (e: React.PointerEvent<HTMLDivElement>, i: number) => {
    const div = e.target as HTMLDivElement;
    if (!div.classList.contains(`p_${activeEvents}`)) {
      gsap.to(`.p_${i}`, {width: 6, height: 6, background: "#42567A", duration: .33,});
    };
    return;
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>,i: number) => {
    const div = e.target as HTMLDivElement;
    if (!div.classList.contains(`p_${activeEvents}`)) {
      const rotationAngle = (i * angle);
      setIsAnimation(prev => !prev);
      setActiveEvents(i);
      setEvents(sortByEvent(historicalEventsData[i]));
      gsap
        .timeline()
        .to(`.p_${activeEvents}`, {width: 6, height: 6, background: "#42567A", overflow: 'hidden', duration: .16})
        .to(`.p_${i}`, {width: 6, height: 6, background: "#42567A", overflow: 'hidden', duration: .16})
        .to(".circle", {
          rotation: `-${rotationAngle}`,duration:.33, transformOrigin: "50% 50%"
        })
        .to(`.point`, {rotate: rotationAngle})
        .to(`.p_${i}`, {width: 56, height: 56, background: "#fff", overflow: 'hidden', duration: .16, onComplete: () => {
          setIsAnimation(prev => !prev)
          }
        });
    };
    return;
  };

 for(let i = 0; i < eventsLength; i += 1) {
    const angle = (i - 1) * angleStep;
    const x: number =  radiusCicle * Math.cos(angle);
    const y: number =  radiusCicle * Math.sin(angle);
    points.push(<StyledPoint 
      key={i}
      $i={i}
      $coordX={x}
      $coordY={y}
      className={`point p_${i}`}
      onPointerEnter={(e) => handlePointerEnter(e, i)}
      onPointerLeave={(e) => handlePointerLeave(e, i)}
      onClick={(e) => handleClick(e,i)}
      >{i+1}</StyledPoint>
    )
  };

  return (
    <>
      <StyledCircle className="circle" ref={refStyledCircle}>
        {points}
      </StyledCircle>
    </>
  )
};
