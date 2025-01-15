import EventDetailsSlider from "./EventDetailsSlider/EventDetailsSlider";
import Line from "./Line/Line";
import TimelineHeader from "./TimelineHeader/TimelineHeader";
import TimePeriodSelector from "./TimePeriodSelector/TimePeriodSelector";
import styled from "styled-components";

const HistoricalEventsConteiner = styled.div`
  width: 90em;
  margin: 0 auto;
  position: relative;
`;

export default function HistoricalEvents() {
  return (
    <HistoricalEventsConteiner>
      <TimelineHeader />
      <TimePeriodSelector />
      <EventDetailsSlider />
      <Line />
      <Line rotate={90} />
    </HistoricalEventsConteiner>
  )
}
