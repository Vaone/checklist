import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  *, 
  *::after, 
  *::before {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    font-size: 16px;
    font-weight: 500;
    line-height: 20px;
    letter-spacing: 0em;

    color: #000;
    background: #fff;
  }

  a {
    text-decoration: none
  }

  ul {
    list-style: none;
  }

  button {
    border: none;
  }

`
