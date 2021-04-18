import {useEffect, useState} from "react";
import {Col, Container, Row} from "react-bootstrap";
import Sidebar from "./Sidebar";
import * as back from "../API/back";
import {useAuth} from "../Auth/context";


const Dashboard = () => {
    const [dbUser, setDBUser] = useState();
    const {user} = useAuth()

    useEffect(() => {
        (async () => {
            try {
                const data = await back.getUser(user.uid)
                setDBUser(data.data)
            } catch (e) {
                console.log('failure to find user: ' + e.message)
                try {
                    const data = await back.newUser(user.uid)
                    setDBUser(data.data)
                } catch (e) {
                    console.log('failure to create user: ' + e.message)
                }
            }
        })()
    }, [user.uid, setDBUser])

    return (
        <Container fluid>
            <Row>
                <Col xs={2} id="sidebar-wrapper">
                    <Sidebar/>
                </Col>
                <Col  xs={10} id="page-content-wrapper">
                    {dbUser === null ? 'hello world' : user}
                </Col>
        </Row></Container>
    );
};

export default  Dashboard