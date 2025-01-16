import styled from "styled-components";

const StyledTimelineHeader = styled.header`
  position: absolute;
  display: flex;
  gap: 78px;
  align-items: center;
  align-self: start;
  margin-top: 177px;
`;

const StyledHeaderGradient = styled.div`
  height: 120px;
  width: 5px;
  background: linear-gradient(
    var(--gradient-first),
    var(--gradient-second)
  );
`

const StyledHeaderText = styled.div`
  font-size: 56px;
  font-weight: 700;
  line-height: 67.2px;
  color: var(--contrastText);
`;

export default function TimelineHeader() {
  
  return (
    <StyledTimelineHeader>
      <StyledHeaderGradient />
      <StyledHeaderText>Исторические<br/> даты</StyledHeaderText>
    </StyledTimelineHeader>
    
  )
}
