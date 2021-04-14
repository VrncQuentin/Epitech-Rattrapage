import {useEffect, useState} from "react";
import {Typography} from '@material-ui/core';
import {Modal} from 'react-bootstrap';

import {getLocalWeather} from "../API/OpenWeather";
import {Widget} from '../../common/Widget';

const Weather = ({location}) => {
    const [weather, setWeather] = useState(null)

    useEffect(() => {
        (async () => {
            const data = await getLocalWeather(location);
            setWeather(data);
    })();}, [location])

    const config = (
        <Modal.Body>
            hello world
        </Modal.Body>
    )

    // return (
    //     <Card className='weather'><CardContent>
    //         <Typography variant="h5">OpenWeather in {location}</Typography>
    //         <Typography>{weather === null ? "" : weather.weather}</Typography>
    //         <Typography>{weather === null ? "" : weather.desc}</Typography>
    //     </CardContent></Card>
    // )
    return (
        <Widget name={'OpenWeather in ' + location} configModal={config}>
            <Typography>{weather === null ? "" : weather.weather}</Typography>
            <Typography>{weather === null ? "" : weather.desc}</Typography>
        </Widget>
    )
};

export default Weather;