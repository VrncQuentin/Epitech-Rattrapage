import React, {useState} from "react";
import {Button, Card, Container, Nav} from "react-bootstrap";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import './Dashboard.css'
import {useAuth} from "../Auth/context";
import {useDbUser} from "./Context";
import * as back from "../API/back";
import {CreateTemperature, CreateWeather} from "../OpenWeather/Create";
import {CreateRocketInfo, CreateSpaceXInfo} from "../SpaceX/Create";
import {CreateGithubWidget} from "../Github/Create";

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

const Sidebar = () => {
    const {loginWithGithub, logout} = useAuth()
    const {dbUser} = useDbUser()
    const toggle = (value, setter) => {
        (async () => {
            try {
                await back.updateUser(dbUser.id, value)
                setter();
            } catch (e) {
                console.log(e)
            }
        })();
    }

    const [weatherUsed, setWeatherUsed] = useState(dbUser.weatherUsed)
    const [githubUsed, setGithubUsed] = useState(dbUser.githubUsed)
    const [spacexUsed, setSpacexUsed] = useState(dbUser.spacexUsed)

    console.log(dbUser)
    return (
        <>
            <Nav className="col-md-12 d-none d-md-block bg-light sidebar text-center">
                <h5>Services & Widgets</h5>
                <Service name='OpenWeather' used={weatherUsed} toggleUsed={() => toggle(
                    {weatherUsed: !weatherUsed},
                    () => setWeatherUsed(!weatherUsed))}
                >
                    <CreateWeather/>
                    <CreateTemperature/>
                </Service>
                <Service name='Github' used={githubUsed} toggleUsed={() => toggle(
                    {githubUsed: !githubUsed},
                    async () => {
                        if (dbUser.accessToken === 'NOT') {
                            try {
                                await loginWithGithub()
                                setGithubUsed(!githubUsed)
                            } catch (e) {
                                alert(e.message)
                            }
                        } else {
                            setGithubUsed(!githubUsed)
                        }
                    }
                )}>
                    <CreateGithubWidget/>
                </Service>
                <Service name='SpaceX' used={spacexUsed} toggleUsed={() => toggle(
                    {spacexUsed: !spacexUsed},
                    () => setSpacexUsed(!spacexUsed)
                )}>
                    <CreateSpaceXInfo/>
                    <CreateRocketInfo/>
                </Service>
                <br/>
                <Button className='align-content-center' onClick={logout}>Logout</Button>
            </Nav>
        </>
    );
};
export default Sidebar;