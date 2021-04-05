import {useRef, useState} from 'react';
import {Link,useHistory} from 'react-router-dom';
import {Form, Card, Button, Alert} from 'react-bootstrap';
import GitHubIcon from '@material-ui/icons/GitHub';

import {useAuth} from "../../Auth/context";

export default function Login() {
    const emailRef = useRef()
    const passRef = useRef()
    const {loginWithEmailAndPassword, loginWithGithub} = useAuth()
    const [loading, setLoading] = useState(false)
    const [err, setErr] = useState('')
    const history = useHistory()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            await loginWithEmailAndPassword(emailRef.current.value, passRef.current.value)
            history.push('/')
        } catch (e) {
            setErr('Failed to log in: ' + e.message)
        }
        setLoading(false)
    }
    const handleClick = async () => {
        try {
            setLoading(true)
            await loginWithGithub()
            history.push('/')
        } catch (e) {
            setErr('Failed to log in' + e.message)
        }
        setLoading(false)
    }

    return (
        <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Log in</h2>
                {err && <Alert variant="danger">{err}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" ref={emailRef} required/>
                    </Form.Group>
                    <Form.Group id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" ref={passRef} required/>
                    </Form.Group>
                    <Button className="w-100" type="submit" disabled={loading}>Log in</Button>
                </Form>
            </Card.Body>
            <div className="text-center mb-2"><h4>or use</h4></div>
            <Button className="w-100" onClick={handleClick}><GitHubIcon/></Button>
            <div className="w-100 text-center mt-2">
                Don't have an account ? <Link to="/signup">Sign up</Link>
            </div>
        </Card>
    )
}