import React, {useEffect, useState} from 'react';
const publicIp = require("react-public-ip");

export default function About() {
    const [ip, setIp] = useState("")

    useEffect(() => {
        (async () => {
            const data = await publicIp.v4()
            setIp(data)
        })();
    }, [])

    return (
        <div style={{maxWidth: "800px"}}>{`{
    "client": {
        "host": "${ip}"
    },
    "server": {
        "current_time": ${Date.now()},
        "services": [
            {
                "name": "weather",
                "widgets": [
                    {
                        "name": "city_temperature",
                        "description": "Display the temperature for a city",
                        "params": [{"name": "city", "type": "string"}]
                    },
                    {
                        "name": "city_weather",
                        "description": "Display the weather for a city",
                        "params": [{"name": "city", "type": "string"}]
                    }
                ]
            },
            {
                "name": "spacex",
                "widgets": [
                    {
                        "name": "next_flight",
                        "description": "Display info about the next SpaceX's flight",
                        "params": []
                    },
                    {
                        "name": "latest_flight",
                        "description": "Display info about the latest SpaceX's flight",
                        "params": []
                    }
                ]
            },
            {
                "name": "github",
                "widgets": [
                    {
                        "name": "get_repo",
                        "description": "Display info about the repo",
                        "params": [{"name": "repo", "type": "string"}]
                    }
                ]
            }
        ]
    }
}`}</div>
    )
}