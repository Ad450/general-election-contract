import { ColorModeScript } from "@chakra-ui/react";
import * as React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <ColorModeScript />
      <App />
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById("root")
);
