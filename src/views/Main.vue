<template>
    <div class="container pt-5">
        <div class="d-flex justify-content-between w-50 gap-2">
            <input type="search" class="form-control" v-model="data.search" placeholder="type your country here...">
            <button class="btn btn-primary" @click="searchBtn">search</button>
        </div>

        <div class="container mt-4 d-none" id="result">
            <h3>{{ data.name }}, {{ data.country }}</h3>
            <div>
                <span class="badge text-bg-primary">{{ data.temp }}°C</span>
                <span class="badge text-bg-primary ms-2">{{ data.desc }}</span>
            </div>
            <p class="mb-2">temperatur from {{ data.tempMin }}°C to {{ data.tempMax }}°C</p>
            <b>wind speed: {{ data.windSpeed }}</b> <br>
            <b>clouds: {{ data.clouds }}</b> <br>
            <b>gei coordinates: {{ data.coordLat }}, {{ data.coordLon }}</b>
        </div>
    </div>
</template>

<script setup>
import { reactive, onMounted, ref } from 'vue';
import WeatherApp from '../api/WeatherApp.js'

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
        result.value.classList.remove('d-none')
    }).catch((err) => {
        alert('Something wrong!')
    });
}

// search button (click)
const searchBtn = () => {
    getData()
    data.search = ''
}

const result = ref(null)

onMounted(() => {
    result.value = document.getElementById('result')
})
</script>