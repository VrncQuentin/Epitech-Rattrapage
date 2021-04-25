import {Alert, Col, Container, Row} from "react-bootstrap";
import Sidebar from "./Sidebar";
import {useDbUser} from "./Context";
import Weather from "../OpenWeather/Weather";
import Temperature from "../OpenWeather/Temperarture";

const dispatchWeatherWidgets = (e) => {
    if (e.weather) {
        return <Weather location={e.param} timer={e.timer}/>
    } else {
        return <Temperature location={e.param} timer={e.timer}/>
    }
}

const Dashboard = () => {
    const {dbUser, dbUserErr} = useDbUser()
    return (
        <Container fluid><Row>
            <Col xs={2} id="sidebar-wrapper">
                <Sidebar/>
            </Col>
            <Col  xs={10} id="page-content-wrapper">
                <Row className='bg-primary justify-content-center'>
                    <h1 className=''>Dashboard</h1><br/>
                </Row>
                <Row className='justify-content-center'>
                    {(dbUserErr && <Alert variant='danger'>{dbUserErr}</Alert>)
                    || dbUser.weather.map(dispatchWeatherWidgets)}
                </Row>
            </Col>
        </Row></Container>
    );
};

export default  Dashboard