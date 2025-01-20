import { useEffect, useState } from "react";
import styled from "styled-components";

const StyledEventsDate = styled.div`
  position: absolute;
  top:  480px;
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
  ${({$position}) => ($position === "start" ? "--date-start" : "--date-end" )}
  );
`;

type TypeStyledDate = {
  $position: "start" | "end";
};

type TypeEventsDate = {
  dateStartEvents: number;
  dateEndEvents: number;
};

export default function EventsDate({dateStartEvents, dateEndEvents}: TypeEventsDate) {

  const [dateStart, setDateStart] = useState<number>(dateStartEvents);
  const [dateEnd, setDateEnd] = useState<number>(dateEndEvents);

  useEffect(() => {

    let timeRef: NodeJS.Timeout | null = null;

    const updateValue = () => {

        if (dateStartEvents > dateStart) {
        setTimeout(() => setDateStart((prev) => prev + 1), 30);
      }
      else if(dateStartEvents < dateStart) {
        setTimeout(() => setDateStart((prev) => prev - 1), 30);
      }


      if (dateEndEvents > dateEnd) {
        setTimeout(() => setDateEnd((prev) => prev + 1), 30);
      }
      else if(dateEndEvents < dateEnd) {
        setTimeout(() => setDateEnd((prev) => prev - 1), 30);
      }
     
      if (timeRef) {
        clearTimeout(timeRef);
      }
    }

    updateValue();

    return () => {
      if (timeRef) clearTimeout(timeRef);
    }
  },[dateStartEvents, dateEndEvents, dateStart, dateEnd])

  return (
    <StyledEventsDate>
          <StyledDate $position={"start"} className="start_date" >{dateStart}</StyledDate>
          <StyledDate $position={"end"} className="end_date">{dateEnd}</StyledDate>
    </StyledEventsDate>
  )
}
