import {useRef} from "react";
import {useDbUser} from "../Dashboard/Context";
import {newWeatherWidget} from "../API/back";
import {Button, Card, Form} from "react-bootstrap";

export const CreateSpaceXWidget = ({title, children}) => {
    const select = useRef()
    const timer = useRef()
    const {dbUser} = useDbUser()
    const handleSubmit = async () => {
        try {
            //TODO: update
            await newWeatherWidget(dbUser.id, {})
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <Card>
            <Card.Header>{title}</Card.Header>
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group id ='sw-param'>
                        <Form.Control ref={select} as='select'>
                            {children}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group id ='sw-timer'>
                        <Form.Control ref={timer} placeholder='Timer in minutes' required/>
                    </Form.Group>
                    <Button type='submit'>Create</Button>
                </Form>
            </Card.Body>
        </Card>
    )
}

export const CreateRocketInfo = () => (
    <CreateSpaceXWidget title='Information about a Rocket model'>
        <option>Falcon 1</option>
        <option>Falcon 9</option>
        <option>Falcon Heavy</option>
    </CreateSpaceXWidget>
)

export const CreateSpaceXInfo = () => (
    <CreateSpaceXWidget title='A fact about SpaceX'>
        <option>When was it created?</option>
        <option>By who was it founded?</option>
        <option>How many employees does it have?</option>
    </CreateSpaceXWidget>
)
