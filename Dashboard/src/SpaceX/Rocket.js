import {useEffect, useState} from "react";
import {deleteSpaceXWidget} from "../API/back";
import {Widget} from "../Dashboard/Widget";
import {getRocketInfo} from "./api";
import {Alert} from "react-bootstrap";

const queryParamToName = {
    'falcon1': 'Falcon 1',
    'falcon9': 'Falcon 9'
}

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
        <Widget name={queryParamToName[type]}
                updateWidget={update}
                timer={timer}
                deleteWidget={async () => {
                    await deleteSpaceXWidget(id)
                    window.location.reload()
                }}>
            {
                (err && <Alert variant='danger'>{err}</Alert>)
                || (rocket !== null && <>
                    The {queryParamToName[type]} is currently {rocket.active ? 'active' : 'inactive'}{<br/>}
                    It mesures {rocket.height.meters} meters, with {rocket.stages} stage, and weighs {rocket.mass.kg}.{<br/>}
                    Its playload can be:{<br/>}
                    {rocket.payload_weights.map((w) => <>{'- ' + w.name + ': ' + w.kg + 'kg'}{<br/>}</>)}
                    It costs {rocket.cost_per_launch}$ to launch.
                </>)

            }
        </Widget>
    )
}