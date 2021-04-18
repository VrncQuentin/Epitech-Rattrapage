import {useState} from 'react';
import {Alert} from "react-bootstrap";

import {getLocalTemperature} from "./API/OpenWeather";
import {Widget} from '../Dashboard/Widget';

const Temperature = ({location, timer}) => {
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

    return (
        <Widget name={'Temperature in ' + location}
                updateWidget={update}
                timer={timer}
        >
            {(err && <Alert variant='danger'>{err}</Alert>)
            || temp.toString() + '°C'}
        </Widget>
    )
}
export default Temperature;