import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import UserForm from "./components/UserForm";
import ViewUsers from "./components/ViewUsers";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <UserForm />
        </Route>
        <Route path="/view">
          <ViewUsers />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
