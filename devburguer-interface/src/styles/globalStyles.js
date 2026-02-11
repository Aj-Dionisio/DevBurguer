import { createGlobalStyle } from "styled-components"; /*importando somnente o createGlobalSytele do styled components*/

const globalStyles = createGlobalStyle`

    *{
        margin:0;
        padding:0;
        box-sizing: border-box;
        outline:none;

    }

    button{
        cursor: pointer;
    }

`;

export default globalStyles;