import { Global } from "@emotion/react";
import React from "react";
import ReactDOM from "react-dom/client";

import App from "~/App";
import { GlobalStyles } from "~/GlobalStyles";
import { Analytics } from "@vercel/analytics/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Analytics />
    <Global styles={GlobalStyles} />
    <App />
  </React.StrictMode>
);
