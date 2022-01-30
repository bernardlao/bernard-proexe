import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import App from "./App";
import store from "./shared/redux/store";

const colors = {
  primary: "#027FFF",
  grey: "#CDCDCD",
  red: "#FF3B3B",
  blue: "#48A5FC",
  green: "#06C270",
  orange: "#FF8800",
  yellow: "#FFCC00",
  teal: "#00CFDE",
  purple: "#6600CC",
  white: "#FFFFFF",
  lightPurple: "#DBC5F1",
  lightBlue: "#C1DCF6",
  blueGrey: "#91B7DB",
  darkGrey: "#A9A9A9",
  darkerGrey: "#595959",
  black: "#000000",
};

export const theme = () => {
  return {
    colors,
  };
};

const GlobalStyle = createGlobalStyle`
  html, body {
    background: #FAFDFF;
  }

  #root {
    display: grid;
  }
  
  *, *::before, *::after {
    font-family: 'Roboto', sans-serif;
    box-sizing: border-box !important;
  }


  h1, h2, h3, h4, h5, h6 {
    font-weight: bold;
    font-family: 'Raleway', sans-serif;
  }
`;
const matTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#027FFF",
      light: "#1f8fff",
    },
  },
});

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter basename="/">
      <MuiThemeProvider theme={matTheme}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <App />
        </ThemeProvider>
      </MuiThemeProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
