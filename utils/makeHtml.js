/**
 * Generate a decorated result
 * @param {string} highlightedCode - Result from Shiki
 * @param {string} username - Used for window title
 * @return {string} Code snippet inside a MacOS-like window
 */
export const makeHtml = (highlightedCode, username) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono&display=swap" rel="stylesheet">
    <style>
      * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
      }

      body {
        padding: 2rem;
      }

      .container {
        background-color: #efefef;
        padding: 2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto;
        min-width: 0;
        max-width: 960px;
      }

      .window {
        position: relative;
        background-color: #292929;
        border: 1px solid #696969;
        border-radius: 0.5rem;
        overflow: hidden;
        box-shadow: 0 0.75rem 2rem 0.25rem rgba(0, 0, 0, 0.5);
        width: 100%;
      }

      .titlebar {
        display: flex;
        align-items: center;
        height: 2rem;
      }

      .title {
        display: block;
        flex: 1;
        font-family: sans-serif;
        color: #f3f3ed;
        font-weight: 500;
        text-align: center;
        margin-left: -5rem;
      }

      .buttons {
        display: flex;
        gap: 0.5rem;
        padding-left: 0.5rem;
        align-items: center;
        width: 5rem;
      }

      .close,
      .max,
      .min {
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
      }

      .close {
        background-color: #ff605c;
      }
      .max {
        background-color: #ffbd44;
      }
      .min {
        background-color: #00ca4e;
      }

      #output {
        width: 100%;
      }

      .shiki {
        border-top: 1px solid #696969;
        width: 100%;
        padding: 0.25rem 1rem 0.5rem 3.5rem;
        font-size: 1.125rem;
        word-wrap: break-word;
        white-space: pre-wrap;
      }

      code {
        counter-reset: step;
        counter-increment: step 0;
        font-family: "JetBrains Mono", monospace;
      }

      code .line {
        position: relative;
        line-height: 1.4em;
      }

      code .line::before {
        position: absolute;
        left: -2.5rem;
        content: counter(step);
        counter-increment: step;
        display: inline-block;
        text-align: right;
        color: rgba(115, 138, 148, 0.8);
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="window">
        <div class="titlebar">
          <div class="buttons">
            <div class="close"></div>
            <div class="max"></div>
            <div class="min"></div>
          </div>
          <span class="title">Code - @${username}</span>
        </div>
        <div id="output">${highlightedCode}</div>
      </div>
    </div>
  </body>
</html>
`;
