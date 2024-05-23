import { css } from "@emotion/react";

export const GlobalStyles = css`
  @font-face {
    font-family: "CentraNo2";
    src: url("/fonts/CentraNo2-Bold.ttf");
    font-style: normal;
    font-weight: 700;
    font-display: swap;
  }

  @font-face {
    font-family: "CentraNo2";
    src: url("/fonts/CentraNo2-Book.ttf");
    font-style: normal;
    font-weight: 400;
    font-display: swap;
  }

  @font-face {
    font-family: "CentraNo2";
    src: url("/fonts/CentraNo2-Medium.ttf");
    font-style: normal;
    font-weight: 500;
    font-display: swap;
  }

  * {
    box-sizing: border-box;
    font-family: CentraNo2, sans-serif;
  }

  html,
  body {
    height: 100%;
    width: 100%;
    outline: 0;
    margin: 0;
    padding: 0;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
`;
