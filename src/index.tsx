import React from "react";
import ReactDOM from "react-dom/client";
import * as Router from "react-router-dom";
import App from "./App";
import "regenerator-runtime";
import "config/configureMobX";
import "styles/index.scss";

document.body.innerHTML = '<div id="root"></div>';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router.BrowserRouter>
      <App />
    </Router.BrowserRouter>
  </React.StrictMode>,
);

if (module.hot) {
  module.hot.accept();
}
