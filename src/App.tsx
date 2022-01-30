import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import PageNotFound from "./components/PageNotFound";
import UserForm from "./components/UserForm";
import { ROUTES } from "./shared/constants/routes";

const App = () => {
  return (
    <Switch>
      <Route exact path={ROUTES.BASE} render={() => <Redirect to={ROUTES.DASHBOARD} />} />
      <Route exact path={ROUTES.DASHBOARD} component={Dashboard} />
      <Route exact path={ROUTES.NEW_USER} component={UserForm} />
      <Route path={ROUTES.EDIT_USER.path} component={UserForm} />
      <Route component={PageNotFound}/>
    </Switch>
  );
};

export default App;
