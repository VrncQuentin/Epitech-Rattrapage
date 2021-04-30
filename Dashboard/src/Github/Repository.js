import {useEffect, useState} from "react";
import {Alert} from "react-bootstrap";

import {getUser} from "./api";
import {Widget} from "../Dashboard/Widget";
import {deleteGithubWidget} from "../API/back";

const User = ({token, asked, timer, id}) => {
    const [err, setErr] = useState('')
    const [user, setUser] = useState(null)
    const update = async () => {
        try {
            const data = await getUser(token, asked);
            setUser(data)
        } catch (e) {
            setErr("couldn't fetch repository: " + e.message)
        }
    }

    useEffect(() => {
        (async () => update())()
    }, [])

    return (
        <Widget name={asked}
                updateWidget={update}
                timer={timer}
                deleteWidget={async () => {
                    await deleteGithubWidget(id)
                    window.location.reload()
                }}>
            {
                (err && <Alert variant='danger'>{err}</Alert>)
                || (user === null ? '' : (
                    <>
                        {user.bio}{<br/>}{<br/>}
                        Located in {user.location} & {user.hireable ? 'is' : "isn't"} hire-able{<br/>}
                        Following {user.following} | Followed by {user.followers}{<br/>}
                    </>
                ))
            }
        </Widget>
    )
};

export default User;
