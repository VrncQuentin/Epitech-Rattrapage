import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

import GuestRoute from "./Dashboard/GuestRoute";
import PrivateRoute from "./Dashboard/PrivateRoute";
import {AuthProvider} from "./Auth/context";

import Dashboard from "./Dashboard/D";
import './Dashboard/Sidebar.css';

import Login from "./Auth/Login/Login"
import Signup from "./Auth/Login/Signup";
import About from "./Dashboard/About";

const App = () => {
    return (
        <Router>
            <AuthProvider>
                <Switch>
                    <PrivateRoute exact path="/" component={Dashboard}/>
                    <GuestRoute path="/login" component={Login}/>
                    <GuestRoute path="/signup" component={Signup}/>
                    <Route path="/about.json" component={About}/>
                </Switch>
            </AuthProvider>
        </Router>
    );
}

export default App;
