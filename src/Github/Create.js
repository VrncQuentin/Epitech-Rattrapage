import {useRef} from "react";
import {useDbUser} from "../Dashboard/Context";
import {newGithubWidget} from "../API/back";
import {Button, Card, Form} from "react-bootstrap";

const unitToCoef = {
    "Seconds": 1,
    "Minutes": 60,
    "Hours": 60*60
}

export const CreateGithubWidget = () => {
    const repo = useRef()
    const timer = useRef()
    const timeUnit = useRef()
    const {dbUser} = useDbUser()
    const handleSubmit = async () => {
        try {
            await newGithubWidget(dbUser.id, {
                repo: repo.current.value,
                timer: timer.current.value * 1000 * unitToCoef[timeUnit.current.value]
            })
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <Card>
            <Card.Header>Information about a User</Card.Header>
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group id ='cg-param'>
                        <Form.Control ref={repo} placeholder='User' required/>
                    </Form.Group>
                    <Form.Group id ='cg-timer'>
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