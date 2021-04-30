import {useState} from "react";
import {Alert} from "react-bootstrap";

import {getRepo} from "./api";
import {Widget} from "../Dashboard/Widget";

const UserRepo = ({token, asked, timer}) => {
    const [err, setErr] = useState('')
    const [repo, setRepo] = useState(null)
    const update = async () => {
        try {
            const data = await getRepo(token, asked);
            setRepo(data)
        } catch (e) {
            setErr("couldn't fetch repository: " + e.message)
        }
    }

    return (
        <Widget name={asked}
                updateWidget={update}
                timer={timer}
        >
            {
                (err && <Alert variant='danger'>{err}</Alert>)
                || (repo !== null ? repo : '')
            }
        </Widget>
    )
};

export default UserRepo;
