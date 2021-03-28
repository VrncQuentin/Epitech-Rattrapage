import {useEffect, useState} from "react";
import {Card, CardContent, SvgIcon, Typography} from '@material-ui/core';
import AutorenewOutlinedIcon from '@material-ui/icons/AutorenewOutlined';

import {getLocalWeather} from "../../logic/OpenWeather";
import MistIcon from '../../asset/mist.svg';
import CloudyIcon from '../../asset/cloudy.svg';
import RainIcon from '../../asset/rain.svg';
import ExtremeIcon from '../../asset/storm.svg';
import SunIcon from '../../asset/sun.svg';

const weatherToIcon = {
    'mist': MistIcon,
    'Cloudy': CloudyIcon,
    'rain': RainIcon,
    'Extreme': ExtremeIcon,
    'Clear': SunIcon
}
const weatherKeys = Object.keys(weatherToIcon)

const getWeatherIcon = (weather) => {
    for (const elem of weatherKeys) {
        if (elem === weather) {
            return weatherToIcon[elem]
        }
    }
    return weatherToIcon['Clear']
}

const EmptyWeather = () => {
    return (
        <Card><AutorenewOutlinedIcon/></Card>
    )
}

const LoadedWeather = ({weather, icon}) => {
    console.log(weather, icon)
    return (
        <Card>
            <SvgIcon component={icon}/>
            <CardContent>
                <Typography>{JSON.stringify(weather.where)}</Typography>
            </CardContent>
        </Card>
    )
}

const Weather = ({location}) => {
    const [weather, setWeather] = useState(null)
    const [icon, setIcon] = useState("")

    useEffect(() => {
        (async () => {
            const data = await getLocalWeather(location);
            console.log(data) // Object { where: "Paris", weather: "Clear", temp: 8.07, desc: "clear sky" } - exactement ce que je veux
            console.log(data.weather)
            console.log(JSON.stringify(data.weather));
            const str = JSON.stringify(data.weather).replaceAll('"', '');
        setWeather(data); // Unhandled Rejection (InvalidCharacterError): String contains an invalid character
        console.log(data);
        setIcon(str);
//            setIcon(getWeatherIcon(JSON.stringify(data.weather).replaceAll('"', '')))
    })();
}, [location, weather])

if (weather === null) {
    return (<EmptyWeather/>)
} else {
    return (<LoadedWeather weather={weather} icon={icon}/>)
}
};

//
// const Weather = ({location}) => {
//     const [weather, setWeather] = useState(null)
//     const [icon, setIcon] = useState("")
//
//     useEffect(() => {
//         (async () => {
//             const data = await getLocalWeather(location);
//             console.log(data)
//             setWeather(JSON.stringify(data));
//             setIcon(getWeatherIcon(JSON.stringify(data.weather).replaceAll('"', '')))
//         })();
//     }, [location])
//
//     if (weather === null) {
//         return (<EmptyWeather/>)
//     } else {
//         return (<LoadedWeather weather={weather} icon={icon}/>)
//     }
// };

export default Weather;