import { Button } from '@material-ui/core';

function Connexion({setLoggedIn}) {
    return (
        <div className="connexion">
            <Button color="primary" onClick={() => setLoggedIn(true)}>Login</Button>
        </div>
    )
}

export default Connexion;