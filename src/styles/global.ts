import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}


:focus {
    outline: 0;
    box-shadow: 0 0 0 2 ${props => props.theme['green-500']};
}

body {
    background-color: ${props => props.theme['gray-900']};
    color: ${props => props.theme['gray-300']} ;
}

border-style, input-security, textarea, button {
    font-family: 'Baloo 2', sans-serif;
    font-weight: 400;
    font-size: 1rem;
}

`