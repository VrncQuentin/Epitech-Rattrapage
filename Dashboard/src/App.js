import React from 'react';

import Connexion from './components/Login';
import Dashboard from "./components/Dashboard";


function App() {
    const [loggedIn, setLoggedIn] = React.useState(false)
    return (
        <div className="app">
            {loggedIn ? <Dashboard/> : <Connexion setLoggedIn={setLoggedIn}/>}
        </div>
  );
}

export default App;
