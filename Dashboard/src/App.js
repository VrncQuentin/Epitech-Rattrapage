import {useState} from 'react';

import Connexion from './components/Login/Login';
import Dashboard from "./components/Dashboard";


const App = () => {
    const [user, setUser] = useState(null)
    return (
        <div className="app">
            {user === null ? <Connexion setUser={setUser}/> : <Dashboard user={user}/>}
        </div>
  );
}

export default App;
