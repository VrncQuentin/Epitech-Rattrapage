import requester from "./requester";

//doc: https://docs.spacexdata.com/#07a29989-38e3-47fb-9f64-c132b5842ff0
const baseUrl = "https://api.spacexdata.com/v3/launches/"

const fetchFlightInfo = (route) => {
    return new Promise((resolve, reject) => {
        requester.get(baseUrl + route)
            .then(res => {
                console.log(res)
                resolve({
                    id: res.data.mission_id[0],
                    name: res.data.mission_name,
                    nb: res.data.flight_number,
                    rocket_name: res.data.rocket.rocket_namec,
                    rocket_type: res.data.rocket.rocket_type
                }
            )})
            .catch(err => reject(err))
    })
}

export const getLatestFlight = () => fetchFlightInfo("latest")

export const getNextFlight = () => fetchFlightInfo("next")