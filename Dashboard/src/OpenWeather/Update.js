import {useRef} from "react";
import {updateWeatherWidget} from "../API/back";
import {Button, Card, Form} from "react-bootstrap";

const unitToCoef = {
    "Seconds": 1,
    "Minutes": 60,
    "Hours": 60*60
}

export const UpdateWeatherWidget = ({id, weather}) => {
    const city = useRef()
    const timer = useRef()
    const timeUnit = useRef()
    const handleSubmit = async () => {
        try {
            await updateWeatherWidget(id, {
                param: city.current.value,
                timer: timer.current.value * 1000 * unitToCoef[timeUnit.current.value],
                weather: weather,
            })
            window.location.reload()
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <Card>
            <Card.Header>{weather ? 'Weather' : 'Temperature'} in city</Card.Header>
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group id ='cw-param'>
                        <Form.Control ref={city} placeholder='City' required/>
                    </Form.Group>
                    <Form.Group id ='cw-timer'>
                        <Form.Control ref={timer} placeholder='Timer' required/>
                    </Form.Group>
                    <Form.Group id ='cg-time-unit'>
                        <Form.Control ref={timeUnit} as='select'>
                            <option>Seconds</option>
                            <option>Minutes</option>
                            <option>Hours</option>
                        </Form.Control>
                    </Form.Group>
                    <Button type='submit'>Update</Button>
                </Form>
            </Card.Body>
        </Card>
    )
}

export const UpdateWeather = ({id}) => (<UpdateWeatherWidget id={id} weather={true}/>)
export const UpdateTemperature = ({id}) => (<UpdateWeatherWidget id={id} weather={false}/>)