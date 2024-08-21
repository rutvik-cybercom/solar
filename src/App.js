import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../src/component/common/footer/Footer";
import Home from "../src/pages/homePage/Home";
import Login from "../src/pages/Login";
import Signup from "../src/pages/Signup";
import SolarDesign from "../src/pages/SolarDesign"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import PrivacyPolicy from "./component/common/privacy_policy";
import Map from "./pages/Map";
import TermsAndConditions from "./component/common/term_condition";
import { ToastMessage } from "./component/common/ToastMsg";
import ErrorNotFound from "./pages/404Page";
import ForgetPassword from "./pages/ForgetPassword/ForgetPassword";
import Passwordrecovery from "./pages/ForgetPassword/PasswordRecovery/Passwordrecovery";

function App() {
  // let pathList = ["/"];
  const userToken = localStorage.getItem("userToken");
  const isAuthenticated = userToken && userToken !== "undefined";

  return (
    <Router>
      <ToastMessage />
      {/* <Header pathList={pathList} /> */}
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/signup">
          {userToken && userToken !== "undefined" ? (
            <Redirect to="/" />
          ) : (
            <Signup />
          )}
        </Route>
        <Route path="/terms_condition">
          <TermsAndConditions />
        </Route>
        <Route path="/privacy_policy">
          <PrivacyPolicy />
        </Route>
         <Route path="/login">
          {isAuthenticated ? <Redirect to="/" /> : <Login />}
        </Route>
        <Route path="/solar_design">
          <SolarDesign />
        </Route>
        <Route path="/forgetpassword">
          <ForgetPassword />
        </Route>
        <Route path="/passwordrecovery">
          <Passwordrecovery />
        </Route>
        <Route path="/map">
          <Map />
        </Route>
        <Route path="*">
          <ErrorNotFound />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;