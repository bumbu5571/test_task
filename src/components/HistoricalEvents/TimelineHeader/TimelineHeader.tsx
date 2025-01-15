import styled from "styled-components";

const TimelineHeaderConteiner = styled.header`
  position: absolute;
  top: 177px;
  display: flex;
  gap: 78px;
  align-items: center;
`;

const LinearGradient = styled.div`
  height: 120px;
  width: 5px;
  background: linear-gradient(#3877EE,#EF5DA8);
`

const TimelineHeaderText = styled.div`
  font-size: 56px;
  font-weight: 700;
  line-height: 67.2px;
  color: #42567A;
`;

export default function TimelineHeader() {
  
  return (
    <TimelineHeaderConteiner>
      <LinearGradient />
      <TimelineHeaderText>Исторические<br/> даты</TimelineHeaderText>
    </TimelineHeaderConteiner>
    
  )
}
