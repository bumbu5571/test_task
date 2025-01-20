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
    --border-opacity2: rgba(66, 86, 122, .7);
    --arrow-view: rgba(66, 86, 122, 1);
    --arrow-hidden: rgba(66, 86, 122, .5);
    --arrow-swiper: rgba(56, 119, 238, 1);
  }

  * {
    box-sizing: border-box;
    font-family: "PT Sans", serif;
    }

  body {
    margin: 0;
    padding: 0;
  }

  .swiper_hidden {
    visibility: hidden;
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

  .color_arrow_view {
    color: var(--arrow-view);
  }

  .color_arrow_hidden {
    color: var(--arrow-hidden);
  }
  .color_arrow_swiper {
    color: var(--arrow-swiper);
  }

  .color_border_view {
    border: 1px solid var(--border-opacity2);
  }

  .color_border_hidden {
    border: 1px solid var(--arrow-hidden);
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
