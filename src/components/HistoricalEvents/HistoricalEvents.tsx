import { useState } from "react";
import EventDetailsSlider from "./EventDetailsSlider/EventDetailsSlider";
import Line from "./Line/Line";
import TimelineHeader from "./TimelineHeader/TimelineHeader";
import TimePeriodSelector from "./TimePeriodSelector/TimePeriodSelector";
import styled from "styled-components";
import { historicalEventsData } from "src/lib/data";
import { HistoricalEventsArray } from "src/lib/types";

const StyledHistoricalEvents = styled.div`
  width: 90em;
  margin: 0 auto;
  position: relative;
`;

export default function HistoricalEvents() {
  const sortByEvent = (array: HistoricalEventsArray) => {
    const newArray = [...array]
    return newArray.sort((a, b) => a.date - b.date)
  };

  const [events, setEvents] = useState<HistoricalEventsArray>(sortByEvent(historicalEventsData[0]))
  const numEvents: number = historicalEventsData.length;
  
  const startEvents: number = events[0].date;
  const endEvents: number = events[events.length - 1].date;
  

  return (
    <StyledHistoricalEvents>
      <TimelineHeader />
      <TimePeriodSelector numEvents={numEvents} startEvents={startEvents} endEvents={endEvents} />
      <EventDetailsSlider />
      <Line />
      <Line rotate={90} />
    </StyledHistoricalEvents>
  )
}
