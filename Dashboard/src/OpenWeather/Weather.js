import {useEffect, useState} from "react";

import {getLocalWeather} from "./api";
import {Widget} from '../Dashboard/Widget';
import {Alert, } from "react-bootstrap";
import {deleteWeatherWidget} from "../API/back";

const Weather = ({location, timer, id}) => {
    const [err, setErr] = useState('')
    const [weather, setWeather] = useState()
    const update = async () => {
        try {
            const data = await getLocalWeather(location);
            setWeather(data)
        } catch (e) {
            setErr("couldn't fetch weather: " + e.message)
        }
    }

    useEffect(() => {
        (async () => update())()
    }, [])

    return (
        <Widget name={'Weather in ' + location}
                updateWidget={update}
                timer={timer}
                deleteWidget={async () => {
                    await deleteWeatherWidget(id)
                    window.location.reload()
                }}
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