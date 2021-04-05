import {useEffect, useState} from "react";

import {getLatestFlight, getNextFlight} from "../../APIs/SpaceX";
import {Card, CardContent, CardHeader, Typography} from "@material-ui/core";

const FlightInfo = ({name, action}) => {
    const [info, setInfo] = useState(null)

    useEffect(() => {
        (async () => {
            const data = await action();
            setInfo(data)
        })();
    }, [action])

    if (info === null) {
        return (<Card className="flight-info"><CardHeader>{name}</CardHeader></Card>)
    }
    return (
        <Card className="flight-info">
            <CardContent>
                <Typography variant="h5">{name}</Typography>
                <Typography variant="h6">{info.id} - {info.name}, n°{info.nb}</Typography>
                <Typography>Flying with {info.rocket_name} {info.rocket_type}</Typography>
            </CardContent>
        </Card>
    )
};

export const LatestLaunch = () => (<FlightInfo name="Latest Launch" action={getLatestFlight}/>)
export const NextLaunch = () => (<FlightInfo name="Next Launch" action={getNextFlight}/>)