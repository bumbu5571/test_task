import { useLayoutEffect, useRef, useState } from "react";
import styled from "styled-components";

type TypeStyledPoint = {
  rotate: number;
  radius: number;
}

type TypeStyledDate = {
  position: string;
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
  ${({position}) => (position === "start" ? "--date-start" : "--date-end" )}
);
`;

type TypeTimePeriodSelector = {
  numEvents: number;
  startEvents: number;
  endEvents: number;
};

export default function TimePeriodSelector({numEvents, startEvents, endEvents}: TypeTimePeriodSelector) {
  const angle = 360 / numEvents;
  const points = [];
  const refStyledCircle = useRef<HTMLDivElement>(null);
  const [radiusCicle, setRadiusCicle] = useState<number>(0);

  useLayoutEffect(() => {
    if(refStyledCircle.current) {
      const { width } = getComputedStyle(refStyledCircle.current)
      setRadiusCicle(parseInt(width)/2);
    }
  },[])

  for(let i = 0; i < numEvents; i += 1) {
    points.push(
      <StyledPoint key={i} rotate={i * angle} radius={radiusCicle} />
    )
  }

  return (
    <>
      <StyledCircle ref={refStyledCircle}>
        {points}
        <StyledEventsDate>
          <StyledDate position={"start"} >{startEvents}</StyledDate>
          <StyledDate position={"end"}>{endEvents}</StyledDate>
        </StyledEventsDate>
      </StyledCircle>
    </>
    
  )
}

