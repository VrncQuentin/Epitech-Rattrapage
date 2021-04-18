import {Col, Container, Row} from "react-bootstrap";
import Sidebar from "./Sidebar";

const Dashboard = () => {
    return (
        <Container fluid>
            <Row>
                <Col xs={2} id="sidebar-wrapper">
                    <Sidebar/>
                </Col>
                <Col  xs={10} id="page-content-wrapper">
                    this is a test
                </Col>
        </Row></Container>
    );
};

export default  Dashboard