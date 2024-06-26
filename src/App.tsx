import { ThemeProvider, createGlobalStyle } from "styled-components";
import Router from "./Router";
import { ReactQueryDevtools } from "react-query/devtools";
import { lightTheme, darkTheme } from "./theme";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "./atoms";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@300;400&display=swap');
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, menu, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  main, menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, main, menu, nav, section {
    display: block;
  }
  /* HTML5 hidden-attribute fix for newer browsers */
  *[hidden] {
      display: none;
  }
  * {
    box-sizing: border-box;
  }
  body {
    line-height: 1;
    font-family: 'Source Sans 3', sans-serif;
    background-color: ${props => props.theme.bgColor};
    color: ${props => props.theme.textColor};
  }
  menu, ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
`

function App() {
  const isDark = useRecoilValue(isDarkAtom);
  //두개의 컴포넌트 반환하는 방법(하나의 Element만 리턴해야함)
  //1. <div><GlobalStyle/><Router/></div> : 이렇게 하면 쓸모없는 부모 div가 생김
  //2. <><GlobalStyle/><Router/></> Fragment: 일종의 유령 컴포넌트, 부모 없이 서로 붙어 있는 것들을 리턴할 수 있음 
  return (
    <> 
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      {/* <button onClick={toggleDark}>토글버튼</button> */}
      <GlobalStyle/>
      <Router/>
      <ReactQueryDevtools initialIsOpen={true} />
      </ThemeProvider>
    </>
  )
}

export default App;