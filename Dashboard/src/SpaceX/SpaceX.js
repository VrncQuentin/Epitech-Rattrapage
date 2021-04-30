import {deleteSpaceXWidget} from "../API/back";
import {useEffect, useState} from "react";
import {Alert} from "react-bootstrap";
import {Widget} from "../Dashboard/Widget";
import {getInfo} from "./api";

const queryParamToQuestion = {
    'founded': 'When was it created?',
    'founder': 'By who was it founded?',
    'employees': 'How many employees does it have?',
    'vehicles': 'How many rocket does it have?'
}

const queryParamToAnswer = {
    'founded': (v) => 'SpaceX was found in ' + v,
    'founder': (v) => 'SpaceX was founded by ' + v,
    'employees': (v) => 'SpaceX has ' + v + 'employees',
    'vehicles': (v) => 'SpaceX has ' + v + ' rockets'
}

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

    console.log(info)
    return (
        <Widget name={queryParamToQuestion[asked]}
                updateWidget={update}
                timer={timer}
                deleteWidget={async () => {
                    await deleteSpaceXWidget(id)
                    window.location.reload()
                }}>
            {(err && <Alert variant='danger'>{err}</Alert>) || queryParamToAnswer[asked](info)}
        </Widget>
    )
}