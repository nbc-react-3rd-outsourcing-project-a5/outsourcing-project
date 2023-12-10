import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';
import 'fonts.css';

const GlobalStyle = createGlobalStyle`
    ${reset}
    body {
        font-family: 'Pretendard', sans-serif;
        background-color: #EFEFEF;
    }
    *{
        box-sizing: border-box;
    }
    a {
        text-decoration: unset;
        color: #111;
    }
`;

export default GlobalStyle;
