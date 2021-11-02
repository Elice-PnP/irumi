import { BrowserRouter, Redirect, Route, Switch, Link } from "react-router-dom";

import TopBar from "../Components/TopBar/TopBar";
import GoalMainView from "../Views/GoalMainView/GoalMainView";

export default function Routes() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/Goal">
            <GoalMainView />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}
