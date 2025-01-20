import { JSX, useEffect, useRef, useState } from "react";
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
  eventsLenght: number;
};

 export default function TimePeriodSelector({eventsLenght}: TypeTimePeriodSelector) {

  const angleStep = (2 * Math.PI) / eventsLenght;
  const points: Array<JSX.Element> = [];
  const refStyledCircle = useRef<HTMLDivElement>(null);
  const [radiusCicle, setRadiusCicle] = useState<number>(0);
  
  useEffect(() => {
    if(refStyledCircle.current) {
      const { width } = getComputedStyle(refStyledCircle.current)
      setRadiusCicle(parseInt(width)/2);
    }
  },[])

 for(let i = 0; i < eventsLenght; i += 1) {
    const angle = (i - 1) * angleStep;
    const x: number =  radiusCicle * Math.cos(angle);
    const y: number =  radiusCicle * Math.sin(angle);
    points.push(<StyledPoint 
      key={i}
      $i={i}
      $coordX={x}
      $coordY={y}
      className={`point p_${i}`}
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
