import EventDetailsSlider from "./EventDetailsSlider/EventDetailsSlider";
import Line from "./Line/Line";
import TimelineHeader from "./TimelineHeader/TimelineHeader";
import TimePeriodSelector from "./TimePeriodSelector/TimePeriodSelector";
import styled from "styled-components";

const HistoricalEventsConteiner = styled.div`
  width: 90em;
  margin: 0 auto;
`;

export default function HistoricalEvents() {
  return (
    <HistoricalEventsConteiner>
      <TimelineHeader></TimelineHeader>
      <TimePeriodSelector></TimePeriodSelector>
      <EventDetailsSlider></EventDetailsSlider>
      <Line></Line>
      <Line></Line>
    </HistoricalEventsConteiner>
  )
}
