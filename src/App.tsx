import HistoricalEvents from "./components/HistoricalEvents/HistoricalEvents";
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    --contrastText: #42567A;
    --gradient-first: #3877EE;
    --gradient-second: #EF5DA8;
    --date-start: #5d5deb;
    --date-end: #ec5fad;
    --border-opacity: rgba(66, 86, 122, .1);
    --arrow: rgba(56, 119, 238, .5);
  }

  * {
    box-sizing: border-box;
    font-family: "PT Sans", serif;
    }

  body {
    margin: 0;
    padding: 0;
  }

  .swiper {
  width: 100%;
  height: 100%;
  margin: 0 80px 0 80px;
  }

  .swiper-slide {
    height: 135px;
    display: flex;
    flex-direction: column;
    justify-content: start;
  }

  .hidden {
    opacity: 0;
    pointer-events: none;
  }
`

export default function App() {
  return (
    <>
      <GlobalStyle />
      <HistoricalEvents />
    </>
  )
}
