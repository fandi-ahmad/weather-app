<template>
    <div class="px-3 pt-5 d-flex justify-content-center flex-column">
        <div class="d-flex justify-content-between align-items-center gap-2 m-auto size">
            <input type="search" class="form-control" v-model="data.search" placeholder="type your country here...">
            <button class="btn btn-dark" @click="searchBtn">
                <i class="fa-solid fa-magnifying-glass"></i>
            </button>
        </div>

        <div class="mt-4 p-0 m-auto size" id="result" style="display: none;">
            <div class="weather-box w-100">
                <h3>{{ data.name }}, {{ data.country }}</h3>
                <div>
                    <span class="badge bg-hard-blue p-2">{{ data.temp }}°C</span>
                    <span class="badge bg-hard-blue p-2 ms-2">{{ data.desc }}</span>
                </div>
                <p class="mb-1">temperatur from <b>{{ data.tempMin }}&degC</b> to <b>{{ data.tempMax }}&degC</b></p>
                <div>
                    wind speed:
                    <b>{{ data.windSpeed }} m/s</b>
                </div>
                <div>
                    clouds:
                    <b>{{ data.clouds }} %</b>
                </div>
                <div>
                    geo coordinates:
                    <b>[{{ data.coordLat }}, {{ data.coordLon }}]</b>
                </div>
            </div>
        </div>

        <div class="mt-4" id="errMsg" style="display: none;">
            <p>ups, something wrong</p>
        </div>
    </div>
</template>

<script setup>
import { reactive, onMounted, ref } from 'vue';
import WeatherApp from '../api/WeatherApp.js'
import '../assets/css/style.css'

// data storage from api
const data = reactive({
    search: '',
    name: '',
    country: '',
    temp: '',
    desc: '',
    tempMin: '',
    tempMax: '',
    windSpeed: '',
    clouds: '',
    coordLat: '',
    coordLon: ''
})

// get the data
const getData = () => {
    WeatherApp.get(data.search)
    .then((res) => {
        let r = res.data
        data.name = r.name
        data.country = r.sys.country
        data.temp = r.main.temp
        data.desc = r.weather[0].description
        data.tempMin = r.main.temp_min
        data.tempMax = r.main.temp_max
        data.windSpeed = r.wind.speed
        data.clouds = r.clouds.all
        data.coordLat = r.coord.lat
        data.coordLon = r.coord.lon
        result.value.style.display = 'block'
        errMsg.value.style.display = 'none'
    }).catch((err) => {
        result.value.style.display = 'none'
        errMsg.value.style.display = 'block'
    });
}

// search button (click)
const searchBtn = () => {
    getData()
    data.search = ''
}

const result = ref(null)
const errMsg = ref(null)

onMounted(() => {
    result.value = document.getElementById('result')
    errMsg.value = document.getElementById('errMsg')
    const body = document.querySelector('body')
    body.classList.add('bg-sky')

    window.addEventListener('keydown', (event) => {
        if (event.code === 'Enter') {
            searchBtn()
        }
    });
})
</script>