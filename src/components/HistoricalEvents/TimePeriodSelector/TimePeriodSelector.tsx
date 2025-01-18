import { HistoricalEventsArray } from "@/lib/types";
import { JSX, useEffect, useRef, useState } from "react";
import styled from "styled-components";

type TypeStyledPoint = {
  rotate: number;
  radius: number;
}

type TypeStyledDate = {
  $position: "start" | "end";
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
  width: 6px;
  height: 6px;
  background: var(--contrastText);
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: 
    translate(-50%, -50%)
    rotate(${({ rotate }) => rotate}deg)
    translate(${({ radius }) => radius}px, 0);
  z-index: 5;
`;

const StyledEventsDate = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  transform: translate(-50%, -50%);
  gap: 70px;
`;

const StyledDate = styled.div<TypeStyledDate>`
  font-size: 200px;
  font-weight: 700;
  line-height: 160px;
  letter-spacing: -.5px;
  color: var(
  ${({$position}) => ($position === "start" ? "--date-start" : "--date-end" )}
  );
`;

type TypeTimePeriodSelector = {
  events: HistoricalEventsArray;
  startEvents: number;
  endEvents: number;
};

export default function TimePeriodSelector({events, startEvents, endEvents}: TypeTimePeriodSelector) {
  const angle: number = 360 / events.length;
  const points = useRef<JSX.Element[]>([]);
  const refStyledCircle = useRef<HTMLDivElement>(null);
  const [radiusCicle, setRadiusCicle] = useState<number>(0);

  const [prevStartEvents,setPrevStartEvents] = useState(events[0].date);
  const [prevEndEvents,setPrevEndEvents] = useState(events[events.length - 1].date);
  
  useEffect(() => {
    if(refStyledCircle.current) {
      const { width } = getComputedStyle(refStyledCircle.current)
      setRadiusCicle(parseInt(width)/2);
    }
  },[])

  useEffect(() => {
    let timeRef: NodeJS.Timeout | null = null;


    const updateValue = () => {
      const newStart = prevStartEvents;
      const newEnd = prevEndEvents;


        if (startEvents > newStart) {
        setTimeout(() => setPrevStartEvents((prev) => prev + 1 ), 33);
      }
      else if(startEvents < newStart) {
        setTimeout(() => setPrevStartEvents((prev) => prev - 1 ), 33);
      }


      if (endEvents > newEnd) {
        setTimeout(() => setPrevEndEvents((prev) => prev + 1 ), 33);
      }
      else if(endEvents < newEnd) {
        setTimeout(() => setPrevEndEvents((prev) => prev - 1 ), 33);
      }
     
      if (timeRef) {
        clearTimeout(timeRef);
      }
    }


    updateValue();


    return () => {
      if (timeRef) clearTimeout(timeRef);
    }


  },[prevStartEvents,prevEndEvents,startEvents, endEvents])

  points.current = events.map((_, i) => (
    <StyledPoint key={i} rotate={i * angle} radius={radiusCicle} />
  ));

  return (
    <>
      <StyledCircle ref={refStyledCircle}>
        {points.current}
        <StyledEventsDate>
          <StyledDate $position={"start"} className="start_date" >{prevStartEvents}</StyledDate>
          <StyledDate $position={"end"} className="end_date">{prevEndEvents}</StyledDate>
        </StyledEventsDate>
      </StyledCircle>
    </>
    
  )
}

