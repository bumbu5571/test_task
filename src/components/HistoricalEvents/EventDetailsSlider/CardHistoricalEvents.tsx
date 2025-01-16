import { historicalEventsData } from "src/lib/data";
import styled from "styled-components";

const StyledCardHistoricalEvents = styled.div`
  width: 320px;
  height: 135px;
  margin: 0 160px 104px 80px ;
`;

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
  color: var(--contrastText)
`;

export default function CardHistoricalEvents() {
const des = historicalEventsData[0][0];

  return (
    <StyledCardHistoricalEvents>
      <StyledCardHeader>{des.date}</StyledCardHeader>
      <StyledTextHeader>{des.description}</StyledTextHeader>
    </StyledCardHistoricalEvents>
  )
}
