import {useRef} from "react";
import {useDbUser} from "../Dashboard/Context";
import {newSpaceXWidget} from "../API/back";
import {Button, Card, Form} from "react-bootstrap";

const unitToCoef = {
    "Seconds": 1,
    "Minutes": 60,
    "Hours": 60*60
}

export const CreateSpaceXWidget = ({widgetMaker, title, children}) => {
    const select = useRef()
    const timer = useRef()
    const timeUnit = useRef()
    const {dbUser} = useDbUser()
    const handleSubmit = async () => {
        try {
            await newSpaceXWidget(dbUser.id, widgetMaker(select.current.value, timer.current.value * 1000 * unitToCoef[timeUnit.current.value]))
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

const riSelectToQueryParam = {
    'Falcon 1': 'falcon1',
    'Falcon 9': 'falcon9',
    'Falcon Heavy': 'falcon_heavy'
}

export const CreateRocketInfo = () => (
    <CreateSpaceXWidget title='Information about a Rocket model' widgetMaker={(value, timer) => {
        return ({
            rocketId: riSelectToQueryParam[value],
            timer: timer
        })
    }}>
        <option>Falcon 1</option>
        <option>Falcon 9</option>
        <option>Falcon Heavy</option>
    </CreateSpaceXWidget>
)

export const CreateSpaceXInfo = () => (
    <CreateSpaceXWidget rocketinfo={false} title='A fact about SpaceX' widgetMaker={(value, timer) => {
        return ({
            desiredInfo: value,
            timer: timer
        })
    }}>
        <option>When was it created?</option>
        <option>By who was it founded?</option>
        <option>How many employees does it have?</option>
    </CreateSpaceXWidget>
)
