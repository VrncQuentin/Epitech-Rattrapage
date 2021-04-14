import requester from "./requester";

const baseUrl = "http://0.0.0.0:3000/user/"

export const newUser = (user) => {
    return new Promise(((resolve, reject) => {
        requester.post(baseUrl + user)
            .then(res => {
                resolve(res)
            })
            .catch(e => reject(e))
    }))
}

export const getUser = (user) => {
    return new Promise(((resolve, reject) => {
        requester.get(baseUrl + user)
            .then(res => {
                resolve(res)
            })
            .catch(e => reject(e))
    }))
}

export const updateUser = (user, value) => {
    return new Promise(((resolve, reject) => {
        requester.post(baseUrl +'update/' + user, value)
            .then(res => {
                resolve(res)
            })
            .catch(e => reject(e))
    }))
}