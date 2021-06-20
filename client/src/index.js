import React from "react";
import ReactDOM from "react-dom";
import { Provider as StoreProvider } from "react-redux";
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import { BrowserRouter, Switch } from "react-router-dom";
import * as serviceWorker from "serviceWorker";

import store from "store";
import theme from "theme";
import Routes from "Routes";

const App = () => {
  return (
    <StoreProvider store={store}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Switch>
            <Routes />
          </Switch>
        </BrowserRouter>
      </MuiThemeProvider>
    </StoreProvider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
