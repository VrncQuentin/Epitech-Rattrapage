import {useState} from "react";

import {getLocalWeather} from "./API/OpenWeather";
import {Widget} from '../Dashboard/Widget';
import {Alert} from "react-bootstrap";

const Weather = ({location, timer}) => {
    const [err, setErr] = useState('')
    const [weather, setWeather] = useState(null)
    const update = async () => {
        try {
            const data = await getLocalWeather(location);
            setWeather(data)
        } catch (e) {
            setErr("couldn't fetch weather: " + e.message)
        }
    }

    return (
        <Widget name={'Weather in ' + location}
                updateWidget={update}
                timer={timer}
        >
            {
                (err && <Alert variant='danger'>{err}</Alert>)
                || (weather === null ? "" : weather.weather + '\n')
                + (weather === null ? "" : weather.desc)
            }
        </Widget>
    )
};

export default Weather;