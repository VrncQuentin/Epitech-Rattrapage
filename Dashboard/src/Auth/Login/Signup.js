import {useRef, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {Form, Card, Button, Alert} from 'react-bootstrap';
import GitHubIcon from '@material-ui/icons/GitHub';

import {useAuth} from "../context";

export default function Signup() {
    const emailRef = useRef()
    const passRef = useRef()
    const passConfRef = useRef()
    const {signupWithEmailAndPassword, signupWithGithub, user} = useAuth()
    const [loading, setLoading] = useState(false)
    const [err, setErr] = useState('')
    const history = useHistory()

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (passRef.current.value !== passConfRef.current.value) {
            return setErr('Passwords do not match')
        }
        try {
            setLoading(true)
            await signupWithEmailAndPassword(emailRef.current.value, passRef.current.value)
            history.push('/')
        } catch (e) {
            setErr('Failed to create account: ' + e.message)
        }
        setLoading(false)
    }

    const handleClick = async () => {
        try {
            setLoading(true)
            await signupWithGithub()
            history.push('/')
        } catch (e) {
            setErr('Failed to create account: ' + e.message)
        }
        setLoading(false)
    }

    return (
        <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Sign up</h2>
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
                    <Form.Group id="password-confirmation">
                        <Form.Label>Password Confirmation</Form.Label>
                        <Form.Control type="password" ref={passConfRef} required/>
                    </Form.Group>
                    <Button className="w-100" type="submit" disabled={loading}>Sign up</Button>
                </Form>
            </Card.Body>
            <div className="text-center mb-2"><h4>or use</h4></div>
            <Button className="w-100" onClick={handleClick}><GitHubIcon/></Button>
            <div className="w-100 text-center mt-2">
                Already have an account ? <Link to="/login">Log in</Link>
            </div>
        </Card>
    )
}