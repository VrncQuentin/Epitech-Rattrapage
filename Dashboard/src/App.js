import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {Container} from 'react-bootstrap';

import PrivateRoute from "./Dashboard/PrivateRoute";
import {AuthProvider} from "./Auth/context";

import Dashboard from "./Dashboard/Dashboard";
import Login from "./Auth/Login/Login"
import Signup from "./Auth/Login/Signup";
import About from "./Dashboard/About";

const App = () => {
    return (
            <Container className="d-flex align-items-center justify-content-center"
                       style={{minHeight: "100vh"}}>
                <div className="w-100" style={{maxWidth: "400px"}}>
                    <Router>
                        <AuthProvider>
                            <Switch>
                                <PrivateRoute exact path="/" component={Dashboard}/>
                                <Route path="/login" component={Login}/>
                                <Route path="/signup" component={Signup}/>
                                <Route path="/about.json" component={About}/>
                            </Switch>
                        </AuthProvider>
                    </Router>
                </div>
            </Container>
    );
}

export default App;
