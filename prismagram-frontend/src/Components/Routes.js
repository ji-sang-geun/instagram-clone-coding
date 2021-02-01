/* Router Component는 어떤 Router들을 보여줄지 다루는 Component */

// React import
import React from "react";
// PropTypes import
import PropTypes from "prop-types";
// Route, Switch import
import { Redirect, Route, Switch } from  "react-router-dom";
import Feed from "../Routes/Feed";
import Auth from "../Routes/Auth";
import Explore from "../Routes/Explore";
import Search from "../Routes/Search";
import Profile from "../Routes/Profile";
import Notifications from "../Routes/Notifications";
import Message from "../Routes/Message";

// Switch === 하나의 Route만 랜더링 해줌
// 만약 isLoggedIn이 있으면, 여기에 뭔가 있음
// 유일하게 가질 라우터는 Route가 될 거고, exact path는 /, Component는 Feed
const LoggedInRoutes = () => (
    
    // explore, notification, see the image 등 모든 것이 앞에 오고, 뒤에는 profile component가 와야 함
    // why? : profile이 중간에 있을 경우, explore로 가는 사람, edit-profile로 가는 사람도 항상 profile을 받게 되면서 explore로 갈 수 없음
    <Switch>
        <Route exact path = "/" component = {Feed} />
        <Route path = "/search" component = {Search} /> 
        <Route path = "/message" component = {Message} />
        <Route path = "/explore" component = {Explore} />
        <Route path = "/notifications" component = {Notifications} />
        <Route path = "/:username" component = {Profile} />
        <Redirect from = "*" to = "/" />
    </Switch>
);

// 유일하게 가질 라우터는 Route가 될 거고, exact path는 /, Component는 Auth
const LoggedOutRoutes = () => ( 
    <Switch>
        <Route exact path = "/" component = {Auth} />
        <Redirect from = "*" to = "/" />
    </Switch>
);

// 라우터를 만들기 위한 것
// 이 라우터는 하나의 prop을 가짐. prop === isLoggedIn
// 만약 isLoggedIn이 true가 되면, LoggedInRoutes가, false가 되면, LoggedOutRoutes가 실행됨
const AppRouter = ({isLoggedIn}) => (
    isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes /> 
);

AppRouter.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired
};

export default AppRouter;
