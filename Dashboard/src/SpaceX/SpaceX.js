import {deleteSpaceXWidget} from "../API/back";
import {useEffect, useState} from "react";
import {Alert} from "react-bootstrap";
import {Widget} from "../Dashboard/Widget";
import {getInfo} from "./api";

export const SpaceX = ({asked, timer, id}) => {
    const [err, setErr] = useState('')
    const [info, setInfo] = useState(null)
    const update = async () => {
        try {
            const data = await getInfo(asked)
            console.log(data)
            setInfo(data)
        } catch (e) {
            setErr("couldn't fetch info: " + e.message)
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
                    await deleteSpaceXWidget(id)
                    window.location.reload()
                }}>
            {
                (err && <Alert variant='danger'>{err}</Alert>)
            }
        </Widget>
    )
}