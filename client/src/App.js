import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import UserForm from "./components/UserForm";
import ViewUsers from "./components/ViewUsers";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact={true} component={UserForm}></Route>
        <Route path="/view" exact={true} component={ViewUsers}></Route>
      </Switch>
    </Router>
  );
}

export default App;
