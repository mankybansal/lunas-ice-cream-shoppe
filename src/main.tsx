import React from "react";
import ReactDOM from "react-dom/client";

import { GlobalStyles } from "~/GlobalStyles.tsx";
import { Global } from "@emotion/react";
import App from "~/App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Global styles={GlobalStyles} />
    <App />
  </React.StrictMode>
);
