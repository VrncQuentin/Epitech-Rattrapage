import {useState} from "react";
import {Button, Card, CardContent, Divider, TextField} from "@material-ui/core";
import GitHubIcon from '@material-ui/icons/GitHub';

import {auth, github} from '../../logic/firebase';

const ConnexionForm = ({setUser, what, authMethod}) => {
    const [email, setMail] = useState("")
    const [password, setPassword] = useState("")

    const emailPasswordLogin = () => {
        if (email === "" && password === "") {
            setUser({tkt:0})
            return;
        } // TODO: Remove
        authMethod(email, password)
            .then((r) => {
                console.log(r) //TODO: remove
                setUser({
                    user: r.user,
                    token: r.credential.accessToken
                })
            })
            .catch((e) => {
                alert(e.message);
                console.log(e)
            });
    }

    const oauthLogin = () => {
        auth.signInWithPopup(github)
            .then((r) => {
                console.log(r) // TODO: remove
                setUser({
                    user: r.user,
                    token: r.credential.accessToken
                })
            })
            .catch((e) => alert(e.message));
    }

    return (
        <Card><CardContent className="form">
            <form noValidate onSubmit={emailPasswordLogin}>
                <TextField required
                           label="email"
                           placeholder="hello@world.com"
                           onChange={(e) => setMail(e.target.value)}
                /><br/>
                <TextField required
                           label="password"
                           placeholder="password"
                           type="password"
                           onChange={(e) => setPassword(e.target.value)}
                /><br/>
                <Button variant="contained" type="submit">{what}</Button>
            </form>
            <Divider/>
            or use
            <Button variant="contained" onClick={oauthLogin}>
                <GitHubIcon />
            </Button>
        </CardContent></Card>
    );
}

export default ConnexionForm;