import styled, { createGlobalStyle } from 'styled-components';

export const LogoWrapper = styled.div`
  height: 1em;
  margin-left: 0.5rem;
`;

export const GlobalStyle = createGlobalStyle`
html,
body {
  padding: 0;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
}

a {
  color: inherit;
  text-decoration: none;
}

* {
  box-sizing: border-box;
}

`;

export const theme = {
  colors: {
    primary: '',
    secondary: '',
    greys: {
      white: '#FFFFFF',
      lighter: '#F2F2F2',
      light: '#CCCCCC',
      grey: '#8C8C8C',
      dark: '#666666',
      darker: '#333333',
    },
  },
};
