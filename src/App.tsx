import HistoricalEvents from "./components/HistoricalEvents/HistoricalEvents";
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
 *  {
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
