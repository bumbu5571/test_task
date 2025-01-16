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
  }

  * {
    box-sizing: border-box;
    font-family: "PT Sans", serif;
    }

  body {
    margin: 0;
    padding: 0;
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
