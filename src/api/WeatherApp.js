import Api from './Main.js'

const baseURL = import.meta.env

export default {
    get(city) {
        return Api(baseURL).get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=1fe5f03e8b679377cbc41601289edfdd&units=metric`)
    }
}