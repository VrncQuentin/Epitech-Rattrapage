import {useState, useEffect} from 'react';
import {getLocalTemperature} from "../API/OpenWeather";
import {Widget} from '../../common/Widget';
import {Alert} from "react-bootstrap";
//
// const Temperature = ({location, timer}) => {
//     const [err, setErr] = useState('')
//     const [temp, setTemp] = useState(0.0)
//     const [_, setTime] = useState(Date.now())
//
//     useEffect(() => {
//         (async () => {
//             const data = await getLocalTemperature(location);
//             setTemp(data);
//         })();
//
//         const interval = setInterval(() => setTime(Date.now()), timer);
//         return () => clearInterval(interval)
//
//     }, [location, timer, setErr])
//
//     return (
//         <Widget name={'Temperature in ' + location}>
//             {(err && <Alert variant='danger'>{err}</Alert>)
//             || temp.toString() + '°C'}
//         </Widget>
//     )
// }

const Temperature = ({location, timer}) => {
    const [err, setErr] = useState('')
    const [temp, setTemp] = useState(0.0)
    const update = async () => {
        console.log('hello')
        try {
            const data = await getLocalTemperature(location);
            setTemp(data);
        } catch (e) {
            setErr("couldn't fetch temperature: " + e.message)
        }
    }

    return (
        <Widget name={'Temperature in ' + location}
                updateWidget={update}
                timer={timer}
        >
            {(err && <Alert variant='danger'>{err}</Alert>)
            || temp.toString() + '°C'}
        </Widget>
    )
}
export default Temperature;