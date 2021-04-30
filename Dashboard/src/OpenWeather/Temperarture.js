import {useEffect, useState} from 'react';
import {Alert, Modal} from "react-bootstrap";

import {getLocalTemperature} from "./api";
import {Widget} from '../Dashboard/Widget';
import {deleteWeatherWidget} from "../API/back";
import {UpdateTemperature} from "./Update";

const Temperature = ({location, timer, id}) => {
    const [err, setErr] = useState('')
    const [temp, setTemp] = useState(0.0)
    const update = async () => {
        try {
            const data = await getLocalTemperature(location);
            setTemp(data);
        } catch (e) {
            setErr("couldn't fetch temperature: " + e.message)
        }
    }

    useEffect(() => {
        (async () => update())()
    }, [])

    return (
        <Widget name={'Temperature in ' + location}
                updateWidget={update}
                timer={timer}
                deleteWidget={async () => {
                    await deleteWeatherWidget(id)
                    window.location.reload()
                }}
                configModal={<Modal.Body><UpdateTemperature id={id}/></Modal.Body>}>
            {(err && <Alert variant='danger'>{err}</Alert>)
            || temp.toString() + '°C'}
        </Widget>
    )
}
export default Temperature;