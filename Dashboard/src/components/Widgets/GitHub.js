import {useEffect, useState} from "react";
import {getRepo} from "../../logic/GitHub";
import {Card, CardContent, Typography} from "@material-ui/core";

const UserRepo = ({token, asked}) => {
    const [repo, setRepo] = useState(null)

    useEffect(() => {
        (async () => {
            const data = await getRepo(token, asked)
            setRepo(data)
        })();
    }, [token, asked])

    if (repo === null) {
        return (
            <Card><CardContent>
                <Typography variant="h5">Repository Information</Typography>
            </CardContent></Card>
        )
    }
    return (
        <Card><CardContent>
            <Typography variant="h5">Repository Information</Typography>
            <Typography variant="h6">{repo.name}</Typography>
            <Typography>{repo.body}</Typography>
        </CardContent></Card>
    )
}

export default UserRepo;