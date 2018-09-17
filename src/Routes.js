import React from "react";
import { Route, Switch } from "react-router-dom";
import AppliedRoute from "./components/AppliedRoute";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Features from "./containers/Features";
import Signup from "./containers/Signup"
import NotFound from "./containers/NotFound";
import Boards from "./containers/Boards";
import Board from "./containers/Board";
import Plans from "./containers/Plans";
import Plan from "./containers/Plan";
import Demo from "./containers/Demo";
import ContactUs from "./containers/ContactUs";

export default ({ childProps }) =>
  <Switch>
    <AppliedRoute path="/" exact component={Home} props={childProps} />
    <AppliedRoute path="/Login" exact component={Login} props={childProps} />
    <AppliedRoute path="/Features" exact component={Features} props={childProps} />
    <AppliedRoute path="/Signup" exact component={Signup} props={childProps} />
    <AppliedRoute path="/boards" exact component={Boards} props={childProps} />
    <AppliedRoute path="/board/:id" exact component={Board} props={childProps} />
    <AppliedRoute path="/plans" exact component={Plans} props={childProps} />
    <AppliedRoute path="/plan/:id" exact component={Plan} props={childProps} />
      <AppliedRoute path="/demo" exact component={Demo} props={childProps} />
      <AppliedRoute path="/contactus" exact component={ContactUs} props={childProps} />


    { /* Finally, catch all unmatched routes */ }
    <Route component={NotFound} />
  </Switch>;
