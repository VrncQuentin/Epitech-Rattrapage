import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {Container} from 'react-bootstrap';

import PrivateRoute from "./components/PrivateRoute";
import {AuthProvider} from "./Auth/context";

import Dashboard from "./components/Dashboard";
import Login from "./components/Login/Login"
import Signup from "./components/Login/Signup";
import About from "./components/About";

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
