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

const newWidget = (which, userId, widget) => {
    return new Promise((resolve, reject) => {
        requester.post(widgetUrl + which + '/' + userId, {
            ...widget,
            user: {
                connect: {id: userId}
            }
        })
            .then(res => resolve(res))
            .catch(e => reject(e))
    })
}

const updateWidget = (which, id, value) => {
    return new Promise((resolve, reject) => {
        requester.post(widgetUrl + which + '/' + id, value)
            .then(res => resolve(res))
            .catch(e => reject(e))
    })
}

const deleteWidget = (which, id) => {
    return new Promise((resolve, reject) => {
        requester.delete(widgetUrl + which + '/' + id)
            .then(res => resolve(res))
            .catch(e => reject(e))
    })
}

export const newWeatherWidget = (userId, widget) => newWidget('weather', userId, widget)
export const updateWeatherWidget = (id, widget) => updateWidget('weather', id, widget)
export const deleteWeatherWidget = (id) => deleteWidget('weather', id)

export const newGithubWidget = (userId, widget) => newWidget('github', userId, widget)
export const updateGithubWidget = (id, widget) => updateWidget('github', id, widget)
export const deleteGithubWidget = (id) => deleteWidget('github', id)

export const newSpaceXWidget = (userId, widget) => newWidget('spacex', userId, widget)
export const updateSpaceXWidget = (id, widget) => updateWidget('spacex', id, widget)
export const deleteSpaceXWidget = (id) => deleteWidget('spacex', id)
