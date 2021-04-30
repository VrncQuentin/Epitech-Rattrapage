import {useEffect, useState} from "react";
import {deleteSpaceXWidget} from "../API/back";
import {Widget} from "../Dashboard/Widget";
import {getRocketInfo} from "./api";
import {Alert} from "react-bootstrap";

export const Rocket = ({type, timer, id}) => {
    const [err, setErr] = useState('')
    const [rocket, setRocket] = useState(null)
    const update = async () => {
        try {
            const data = await getRocketInfo(type)
            console.log(data)
            setRocket(data)
        } catch (e) {
            setErr("couldn't fetch rocket: " + e.message)
        }
    }

    useEffect(() => {
        (async () => update())()
    }, [])

    return (
        <Widget name={type}
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