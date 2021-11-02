import { BrowserRouter, Redirect, Route, Switch, Link } from "react-router-dom";

import TopBar from "../Components/TopBar/TopBar";
import LoginView from "../Views/LoginView/LoginView";
import TestPage from "../Views/TestPage";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/">
          <TestPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
