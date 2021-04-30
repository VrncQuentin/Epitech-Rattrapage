import {Alert, Col, Container, Row} from "react-bootstrap";
import Sidebar from "./Sidebar";
import {useDbUser} from "./Context";
import Weather from "../OpenWeather/Weather";
import Temperature from "../OpenWeather/Temperarture";
import {Rocket} from "../SpaceX/Rocket";
import {SpaceX} from "../SpaceX/SpaceX";
import UserRepo from "../Github/Repository";

const dispatchWeatherWidgets = (e) => {
    if (e.weather) {
        return <Weather location={e.param} timer={e.timer} id={e.id}/>
    } else {
        return <Temperature location={e.param} timer={e.timer} id={e.id}/>
    }
}

const dispatchSpaceXWidget = (e) => {
    if (e.rocketId !== null) {
        return <Rocket type={e.rocketId} timer={e.timer} id={e.id}/>
    } else if (e.desiredInfo !== null) {
        return <SpaceX asked={e.desiredInfo} timer={e.timer} id={e.id}/>
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
                    || <>
                        {dbUser.weather.map(dispatchWeatherWidgets)}
                        {dbUser.spacex.map(dispatchSpaceXWidget)}
                        {dbUser.github.map((e) => (<UserRepo token={dbUser.accessToken}
                                                             asked={e.repo}
                                                             timer={e.timer}
                                                             id={e.id}
                        />))}
                    </>
                    }
                </Row>
            </Col>
        </Row></Container>
    );
};

export default  Dashboard