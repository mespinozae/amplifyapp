import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./login/Login";
import Register from "./register/Register";
import Validation from "./validation/Validation";

//import Login from "./components/login/Login";

const App = (props) => {
  return (
    <>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/validation" component={Validation} />
        <Route path="*" component={Login} />
      </Switch>
    </>
  );
};

export default App;
