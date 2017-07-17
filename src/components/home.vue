<template>
        <div class="city-container">
            <div class="city-card" v-for="item in cities" v-bind:class="['city-card-bg__'+item.result.weather.icon, {'loading': loading}]">
                <router-link v-bind:to="'/detail/' + item.id" class="city-status">
                    <div class="city-status__desc">
                        {{ item.result.weather.desc}}
                    </div>
                    <weather-icon :glyph="item.result.weather.icon" class="city-status__weather"></weather-icon>
                    <city-icon :glyph="item.icon" class="city-status__cities"></city-icon>
                </router-link>
                <router-link v-bind:to="'/detail/' + item.id" class="city-info">
                    <div class="city-name">
                        {{ item.name }}
                    </div>
                    <div class="city-date">
                        {{ item.result.weather.date | dateTime }}
                    </div>
                    <div class="city-weather">
                        <div class="city-weather__wind">
                            {{ item.result.weather.wind.speed }}
                            <sub>km/h</sub>
                        </div>
                        <div class="city-weather__temp">
                            {{ item.result.weather.temp }}
                            <sup>o</sup>
                        </div>
                        <div class="city-weather__humidity">
                            {{ item.result.weather.humidity }}%
                            <sub>humidity</sub>
                        </div>
                    </div>
                </router-link>
            </div>
            <div class="error" v-bind:class="{'warn': error}">
                Something went wrong in our API
            </div>
        </div>
</template>

<script>

import json from '../data.js';
import cityIcon from './city-icon.vue';
import weatherIcon from './weather-icon.vue';
import moment from 'moment';


export default {
    name: 'Home',
    extends: json,
    created() {
        this.forecastCity()
    },
    data: function () {
        return {
            error: false,
            loading: true
      }
    },
    watch: {
         '$route' (to, from) {},
    },
    components: {
        cityIcon,
        weatherIcon,
    },
    methods: {
        forecastCity: function() {

            var citiesId = this.cities.map( function (i) {
                return i.id;
            });

            var citiesUrl = this.openweathermapAPI + 'group?id=' + citiesId.join() + '&units=metric&appid=' + this.APPID;
            this.$http.get(citiesUrl).then(function (result) {
                var result = result.body.list;
                var self = this;
                result.forEach(function(i){
                    self.cities.forEach(function(data) {
                        if (data.id === i.id) {
                            data.result.weather.icon = i.weather[0].icon;
                            data.result.weather.wind.speed = Math.round(i.wind.speed);
                            data.result.weather.wind.deg = i.wind.deg;
                            data.result.weather.humidity = i.main.humidity;
                            data.result.weather.temp = Math.round(i.main.temp);
                            data.result.weather.date = i.dt;
                            data.result.weather.desc = i.weather[0].description;
                            self.loading = false;
                            self.error = false;
                        }
                    })
                })
            }, function (err) {
                this.error = true;
            });
        },
    },
    filters: {
        dateTime: function (value) {
            if (value) {
                return moment.unix(value).format('dddd | MMM DD | HH:mm');
            }
        }
    }
}
</script>
