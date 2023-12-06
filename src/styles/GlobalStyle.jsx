import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';
import 'fonts.css';

const GlobalStyle = createGlobalStyle`
    ${reset}
    body {
        font-family: 'Pretendard', sans-serif;
    }
    *{
        box-sizing: border-box;
    }
`;

export default GlobalStyle;
