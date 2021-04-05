import {useEffect, useState} from "react";
import {getRepo} from "../../APIs/GitHub";
import {Card, CardContent, Typography} from "@material-ui/core";
import {Alert} from "react-bootstrap";

const UserRepo = ({token, asked}) => {
    const [err, setErr] = useState('')
    const [repo, setRepo] = useState(null)

    useEffect(() => {
        (async () => {
            try {
                const data = await getRepo(token, asked)
                setRepo(data)
            } catch {
                setErr('failure to load repo')
            }
        })();
    }, [token, asked])

    if (repo === null) {
        return (
            <Card><CardContent>
                <Typography variant="h5">Repository Information</Typography>
                {err && <Alert variant="danger">{err}</Alert>}
            </CardContent></Card>
        )
    }
    return (
        <Card><CardContent>
            <Typography variant="h5">Repository Information</Typography>
                {err && <Alert variant="danger">{err}</Alert>}
            <Typography variant="h6">{repo.name}</Typography>
            <Typography>{repo.body}</Typography>
        </CardContent></Card>
    )
}

export default UserRepo;