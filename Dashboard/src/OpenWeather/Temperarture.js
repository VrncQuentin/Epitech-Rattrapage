import {useRef, useState} from 'react';
import {Alert, Button, Card, Form} from "react-bootstrap";

import {getLocalTemperature} from "./api";
import {Widget} from '../Dashboard/Widget';
import {newWeatherWidget} from "../API/back";
import {useDbUser} from "../Dashboard/Context";

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

export const CreateTemperature = () => {
    const city = useRef()
    const timer = useRef()
    const {dbUser} = useDbUser()
    const handleSubmit = async (ev) => {
        ev.preventDefault()
        try {
            await newWeatherWidget(dbUser.id, {
                param: city.current.value,
                timer: timer.current.value * 1000 * 60,
                weather: false,
            })
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <Card>
            <Card.Header>Temperature in city</Card.Header>
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group id ='ct-city'>
                        <Form.Control ref={city} placeholder='City' required/>
                    </Form.Group>
                    <Form.Group id ='ct-timer'>
                        <Form.Control ref={timer} placeholder='Timer in minutes' required/>
                    </Form.Group>
                    <Button type='submit'>Create</Button>
                </Form>
            </Card.Body>
        </Card>
    )
}