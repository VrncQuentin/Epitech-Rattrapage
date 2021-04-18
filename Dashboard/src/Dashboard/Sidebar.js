import React, {useState} from "react";
import {Button, Card, Container, Nav, Row} from "react-bootstrap";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import {CreateWeather} from "../OpenWeather/Weather";
import {CreateTemperature} from "../OpenWeather/Temperarture";
import './Dashboard.css'

const Service = ({name, used, toggleUsed, children}) => {
    return (
        <Nav.Item><Container fluid>
            <Card>
                <Card.Header>{name}</Card.Header>
                <BootstrapSwitchButton checked={used} onChange={toggleUsed}/>
            </Card>
            {used && children}
        </Container></Nav.Item>
    )
}

const Sidebar = (disconnect) => {
    const [used, setUsed] = useState(false)
    const [used2, setUsed2] = useState(false)

    return (
        <>
            <Nav className="col-md-12 d-none d-md-block bg-light sidebar text-center">
                <h5>Services & Widgets</h5>
                <Service name='OpenWeather' used={used} toggleUsed={() => setUsed(!used)}>
                    <CreateWeather/>
                    <CreateTemperature/>
                </Service>
                <Service name='OpenWeather' used={used2} toggleUsed={() => setUsed2(!used2)}>
                    <CreateWeather/>
                    <CreateTemperature/>
                </Service>
                <br/>
                <Button className='align-content-center' onClick={disconnect}>Logout</Button>
            </Nav>
        </>
    );
};
export default Sidebar;