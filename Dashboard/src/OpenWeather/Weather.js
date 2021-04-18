import {useRef, useState} from "react";

import {getLocalWeather} from "./api";
import {Widget} from '../Dashboard/Widget';
import {Alert, Button, Card, Form} from "react-bootstrap";

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

export const CreateWeather = ({updateUser}) => {
    const city = useRef()
    const timer = useRef()
    const handleSubmit = () => {}

    return (
        <Card>
            <Card.Header>Weather in city</Card.Header>
            <Card.Body>
                <Form>
                    <Form.Group id ='cw-city'>
                        <Form.Control ref={city} placeholder='City' required/>
                    </Form.Group>
                    <Form.Group id ='cw-timer'>
                        <Form.Control ref={timer} placeholder='Timer in minutes' required/>
                    </Form.Group>
                    <Button type='submit'>Create</Button>
                </Form>
            </Card.Body>
        </Card>
    )
}