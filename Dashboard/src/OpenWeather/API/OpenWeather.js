import requester from "../../common/requester";

// Using this API: https://openweathermap.org/api
const baseUrl = "https://api.openweathermap.org/data/2.5/weather"
const apiKey = "7873ecdffb493b2dfc17178590f9f7cb"//process.env.AKEY_OPENWEATHER

const fetchLocalWeather = (location) => {
    return new Promise((resolve, reject) => {
        requester.get(baseUrl, {
            params: {
                q: location,
                appid: apiKey,
                units: "metric",

            }
        }).then((res) => {
            resolve({
                where: res.data.name,
                weather: res.data.weather[0].main,
                temp: res.data.main.temp,
                desc: res.data.weather[0].description
            })
        }).catch((err) => {
            reject(err)
        })
    })
}

export const getLocalTemperature = (location) => {
    return new Promise((resolve, reject) => {
        fetchLocalWeather(location)
            .then(res => resolve(res.temp))
            .catch(err => reject(err))
    })
}

export const getLocalWeather = fetchLocalWeather;