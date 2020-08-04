import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
// import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={IndexPage} exact></Route>
        <Route path="/login" component={LoginPage} exact></Route>
        <Route path="/dashboard" component={DashboardPage} exact></Route>
        {/* <Route path="/register" component={RegisterPage} exact></Route>  */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
