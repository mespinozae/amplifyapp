import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { getUser } from "./api/users";
import Login from "./components/login/Login";

import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <Router>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Router>,
  document.getElementById("root")
);
