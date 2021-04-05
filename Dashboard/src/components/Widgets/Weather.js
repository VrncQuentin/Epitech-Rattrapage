import {useEffect, useState} from "react";
import {Card, CardContent, Typography} from '@material-ui/core';

import {getLocalWeather} from "../../APIs/OpenWeather";

const Weather = ({location}) => {
    const [weather, setWeather] = useState(null)

    useEffect(() => {
        (async () => {
            const data = await getLocalWeather(location);
            setWeather(data);
    })();}, [location])

    return (
        <Card className='weather'><CardContent>
            <Typography variant="h5">Weather in {location}</Typography>
            <Typography>{weather === null ? "" : weather.weather}</Typography>
            <Typography>{weather === null ? "" : weather.desc}</Typography>
        </CardContent></Card>
    )
};

export default Weather;