import {useState, useEffect} from 'react';
import {Card, CardContent, Typography} from "@material-ui/core";
import WhatshotIcon from '@material-ui/icons/Whatshot';

import {getLocalTemperature} from "../../APIs/OpenWeather";


const Temperature = ({location}) => {
    const [temp, setTemp] = useState(0.0)

    useEffect(() => {
        (async () => {
            const data = await getLocalTemperature(location);
            setTemp(data);
        })();
    }, [location]);

    return (
        <Card className="temperature"><CardContent>
            <Typography variant="h5">Temperature</Typography><WhatshotIcon/>
            <Typography>{location}</Typography>
            <Typography>{temp}°C</Typography>
        </CardContent></Card>
    )
}

export default Temperature;