import { BrowserRouter, Redirect, Route, Switch, Link } from "react-router-dom";
import TopBar from "../Components/TopBar/TopBar";
import LoginView from "../Views/LoginView/LoginView";
import TestPage from "../Views/TestPage";
import NoteMainPage from "../Views/NoteMainView/NoteMainPage";
import GroupMainPage from "../Views/GroupMainView/GroupMainPage";
import GoalMainView from "../Views/GoalMainView/GoalMainView";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/notes">
          <NoteMainPage />
        </Route>
        <Route path="/groups">
          <GroupMainPage />
        </Route>
        <Route path="/">
          {/* goal main page */}
          <GoalMainView />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
