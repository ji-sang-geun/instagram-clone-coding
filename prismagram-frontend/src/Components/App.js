import React from "react";
import { gql } from "apollo-boost";
import styled ,{ ThemeProvider } from "styled-components";
import { HashRouter as Router } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GlobalStyles from "../Styles/GlobalStyles";
import Theme from "../Styles/Theme";
import Routes from "./Routes";
import Footer from "./Footer";
import Header from "./Header";

/* 
여기에 query를 적음
만약 @client가 없으면, react-apollo가 query를 api로 보내려 하기 때문에, 있어야 함 

이 방법이 타 방법보다 좋음 
분리하려면 app.js가 들어있는 폴더 안에 AppQueries라고 만들어서 넣으면 됨
짧으니까 여기에 둠
*/

const QUERY = gql`
  {
    isLoggedIn @client
  }
`;

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: ${props => props.theme.maxWidth};
  width: 100%;
`;

export default () => {
  // data는 isLoggedIn을 가지고 있음
  const { data: {isLoggedIn} } = useQuery(QUERY);

  return (
    // theme을 찾을 수 있게 theme={Theme}을 함
    // GlobalStyles는 ThemeProvider 안에 속함. 따라서 theme은 잘 됨
    <ThemeProvider theme={Theme}>
      <>
      <GlobalStyles />
      <Router>
        <>
        {isLoggedIn && <Header />} 
        <Wrapper>
          <Routes isLoggedIn={isLoggedIn} />
          <Footer />
        </ Wrapper>
        </>
      </Router>
      <ToastContainer position={toast.POSITION.BOTTOM_LEFT} />
      </>
    </ThemeProvider>
  );  
}