import {useRef} from "react";
import {useDbUser} from "../Dashboard/Context";
import {newWeatherWidget} from "../API/back";
import {Button, Card, Form} from "react-bootstrap";

const unitToCoef = {
    "Seconds": 1,
    "Minutes": 60,
    "Hours": 60*60
}

export const CreateWeatherWidget = ({weather}) => {
    const city = useRef()
    const timer = useRef()
    const timeUnit = useRef()
    const {dbUser} = useDbUser()
    const handleSubmit = async () => {
        try {
            await newWeatherWidget(dbUser.id, {
                param: city.current.value,
                timer: timer.current.value * 1000 * unitToCoef[timeUnit.current.value],
                weather: weather,
            })
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
                    <Button type='submit'>Create</Button>
                </Form>
            </Card.Body>
        </Card>
    )
}

export const CreateWeather = () => (<CreateWeatherWidget weather={true}/>)
export const CreateTemperature = () => (<CreateWeatherWidget weather={false}/>)