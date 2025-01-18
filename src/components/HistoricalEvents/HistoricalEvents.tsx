import { useState } from "react";
import EventDetailsSlider from "./EventDetailsSlider/EventDetailsSlider";
import Line from "./Line/Line";
import TimelineHeader from "./TimelineHeader/TimelineHeader";
import TimePeriodSelector from "./TimePeriodSelector/TimePeriodSelector";
import styled from "styled-components";
import { historicalEventsData } from "@/lib/data";
import { HistoricalEventsArray } from "@/lib/types";

const StyledHistoricalEvents = styled.div`
  width: 90em;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  overflow: hidden;
  border-left: 1px solid var(--border-opacity);
  border-right: 1px solid var(--border-opacity);
`;

export default function HistoricalEvents() {
  const sortByEvent = (array: HistoricalEventsArray): HistoricalEventsArray => {
    const newArray = [...array]
    return newArray.sort((a, b) => a.date - b.date)
  };
  const [activeEvents, setActiveEvents] = useState<number>(0)
  const [events, setEvents] = useState<HistoricalEventsArray>(sortByEvent(historicalEventsData[activeEvents]))
  const numEvents: number = historicalEventsData.length;
  
  const startEvents: number = events[0].date;
  const endEvents: number = events[events.length - 1].date;

  return (
    <StyledHistoricalEvents>
      <TimelineHeader />
      <TimePeriodSelector numEvents={numEvents} startEvents={startEvents} endEvents={endEvents} />
      <EventDetailsSlider
        events={events}
        setEvents={setEvents}
        activeEvents={activeEvents}
        setActiveEvents={setActiveEvents}
        sortByEvent={sortByEvent}/>
      <Line />
      <Line rotate={90} />
    </StyledHistoricalEvents>
  )
}
