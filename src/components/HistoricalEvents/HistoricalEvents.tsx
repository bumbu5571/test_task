import EventDetailsSlider from "./EventDetailsSlider/EventDetailsSlider";
import Line from "./Line/Line";
import TimelineHeader from "./TimelineHeader/TimelineHeader";
import TimePeriodSelector from "./TimePeriodSelector/TimePeriodSelector";

export default function HistoricalEvents() {
  return (
    <>
      <TimelineHeader></TimelineHeader>
      <TimePeriodSelector></TimePeriodSelector>
      <EventDetailsSlider></EventDetailsSlider>
      <Line></Line>
      <Line></Line>
    </>
  )
}
