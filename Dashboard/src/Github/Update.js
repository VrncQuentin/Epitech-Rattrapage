import {useRef} from "react";
import {updateGithubWidget} from "../API/back";
import {Button, Card, Form} from "react-bootstrap";

const unitToCoef = {
    "Seconds": 1,
    "Minutes": 60,
    "Hours": 60*60
}

export const UpdateGithubWidget = ({id}) => {
    const repo = useRef()
    const timer = useRef()
    const timeUnit = useRef()
    const handleSubmit = async () => {
        try {
            await updateGithubWidget(id, {
                repo: repo.current.value,
                timer: timer.current.value * 1000 * unitToCoef[timeUnit.current.value]
            })
            window.location.reload()
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <Card>
            <Card.Header>Information about a User</Card.Header>
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group id ='ug-param'>
                        <Form.Control ref={repo} placeholder='User' required/>
                    </Form.Group>
                    <Form.Group id ='ug-timer'>
                        <Form.Control ref={timer} placeholder='Timer' required/>
                    </Form.Group>
                    <Form.Group id ='ug-time-unit'>
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