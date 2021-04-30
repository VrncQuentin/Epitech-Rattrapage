import React, {useEffect, useState} from 'react';
const publicIp = require("react-public-ip");

export default function About() {
    const [ip, setIp] = useState("")

    useEffect(() => {
        (async () => {
            try {
                const data = await publicIp.v4()
                setIp(data)
            } catch (e) {
                setIp("couldn't fetch ip: " + e.message)
            }
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
                        "name": "spacex_info",
                        "description": "Display info about SpaceX",
                        "params": [{"name": "info", "type": "string"}]
                    },
                    {
                        "name": "rocket_info",
                        "description": "Display info about a rocket from SpaceX",
                        "params": [{"name": "rocket", "type": "string"}]
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