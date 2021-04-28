import requester from "./requester";

const baseUrl = "http://0.0.0.0:3000/"
const userUrl = baseUrl + 'user/'
const widgetUrl = baseUrl + 'widget/'

export const newUser = (user, accessToken) => {
    return new Promise((resolve, reject) => {
        requester.post(userUrl + 'create/' + user + '/' + accessToken)
            .then(res => {
                resolve(res)
            })
            .catch(e => reject(e))
    })
}

export const getUser = (user) => {
    return new Promise((resolve, reject) => {
        requester.get(userUrl + user)
            .then(res => {
                resolve(res)
            })
            .catch(e => reject(e))
    })
}

export const updateUser = (user, value) => {
    return new Promise((resolve, reject) => {
        requester.post(userUrl +'update/' + user, value)
            .then(res => {
                resolve(res)
            })
            .catch(e => reject(e))
    })
}

export const newWeatherWidget = (userId, widget) => {
    return new Promise((resolve, reject) => {
        requester.post(widgetUrl + 'weather/' + userId, {
            ...widget,
            user: {
                connect: {id: userId}
            }
        })
            .then(res => resolve(res))
            .catch(e => reject(e))
    })
}

export const deleteWeatherWidget = (id) => {
    return new Promise((resolve, reject) => {
        requester.delete(widgetUrl + 'weather/' + id)
            .then(res => resolve(res))
            .catch(e => reject(e))
    })
}
