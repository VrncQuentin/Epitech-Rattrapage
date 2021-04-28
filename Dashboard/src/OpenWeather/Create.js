import {useRef} from "react";
import {useDbUser} from "../Dashboard/Context";
import {newWeatherWidget} from "../API/back";
import {Button, Card, Form} from "react-bootstrap";

export const CreateWeatherWidget = ({weather}) => {
    const city = useRef()
    const timer = useRef()
    const {dbUser} = useDbUser()
    const handleSubmit = async () => {
        try {
            await newWeatherWidget(dbUser.id, {
                param: city.current.value,
                timer: timer.current.value * 1000 * 60,
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