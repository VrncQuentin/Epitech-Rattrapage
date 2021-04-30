
//doc: https://docs.spacexdata.com/#07a29989-38e3-47fb-9f64-c132b5842ff0
import requester from "../API/requester";

const baseUrl = "https://api.spacexdata.com/v3/"

export const getRocketInfo = (rocket) => {
    return new Promise((resolve, reject) => {
        requester.get(baseUrl + 'rockets/' + rocket)
            .then(r => resolve(r))
            .catch(e => reject(e))
    })
}

export const getInfo = (about) => {
    return new Promise((resolve, reject) => {
        requester.get(baseUrl + 'info/')
            .then(r => resolve(r[about]))
            .catch(e => reject(e))
    })
}