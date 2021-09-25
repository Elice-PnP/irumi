import { BrowserRouter, Redirect, Route, Switch, Link } from "react-router-dom";

import TopBar from "../Components/TopBar/TopBar";

export default function Routes() {

  return (
    <div>
      <BrowserRouter>
        <TopBar/>
      </BrowserRouter>
    </div>  
  )
}
