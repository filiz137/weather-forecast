<template>
    <div class="forecast-container">
        <router-link to="/" class="goback">
            return home
        </router-link>
        <div class="city-card detail" v-bind:class="'city-card-bg__'+city.result.weather.icon">
            <div class="city-status">
                <div class="city-status__desc">
                    {{ city.result.weather.desc}}
                </div>
                <weather-icon :glyph="city.result.weather.icon" class="city-status__weather"></weather-icon>
                <city-icon :glyph="city.icon" class="city-status__cities"></city-icon>
            </div>
            <div class="city-info">
                <div class="city-name">
                    {{ city.name }}
                </div>
                <div class="city-date">
                    {{ city.result.weather.date | dateTime }}
                </div>
                <div class="city-weather">
                    <div class="city-weather__wind">
                        {{ city.result.weather.wind.speed }}
                        <sub>km/h</sub>
                    </div>
                    <div class="city-weather__temp">
                        {{ city.result.weather.temp }}
                        <sup>o</sup>
                    </div>
                    <div class="city-weather__humidity">
                        {{ city.result.weather.humidity }}%
                        <sub>humidity</sub>
                    </div>
                </div>
            </div>
        </div>
        <div class="forecast-detail">
            <div class="forecast-detail-list" v-for="item in filterLimit(city.result.weather.list, 7)">
                <div class="forecast-detail__time">
                    {{ item.dt | dateHour }}
                </div>
                <weather-icon :glyph="item.weather[0].icon" class="forecast-detail__weather"></weather-icon>
                <div class="forecast-detail__desc">
                    {{ item.weather[0].main }}
                </div>
                <div class="forecast-detail__wind">
                    {{ roundNumber(item.wind.speed) }} km/h
                </div>
                <div class="forecast-detail__temp">
                    {{ roundNumber(item.main.temp) }}
                    <sup>o</sup>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import json from '../data.js';
import cityIcon from './city-icon.vue';
import weatherIcon from './weather-icon.vue';
import moment from 'moment';

export default {
    name: 'Detail',
    extends: json,
    components: {
        cityIcon,
        weatherIcon,
    },
    data: function () {
        return {
            error: false,
            city: null,
                forecast: {
                city: {
                    name: null
                },
            }
        }
    },
    created() {
        this.forecastDetail();
    },
    watch: {
        '$route' (to, from) {},
    },
    methods: {
        forecastDetail: function () {

        var self = this;
        this.cities.forEach(function(data, index) {
            if (data.id == self.$route.params.id ) {
                self.city = data;
            }
        })

         var citiesUrl = this.openweathermapAPI + 'weather?id=' + this.$route.params.id + '&units=metric&appid=' + this.APPID;
              this.$http.get(citiesUrl).then(function (result) {
                  var result = result.body;
                  self.city.result.weather.icon = result.weather[0].icon;
                  self.city.result.weather.wind.speed = Math.round(result.wind.speed);
                  self.city.result.weather.wind.deg = result.wind.deg;
                  self.city.result.weather.humidity = result.main.humidity;
                  self.city.result.weather.temp = Math.round(result.main.temp);
                  self.city.result.weather.date = result.dt;
                  self.city.result.weather.desc = result.weather[0].description;
                  self.error = false;
            }, function (err) {
              this.error = true;
            });

            var forecastUrl = this.openweathermapAPI + 'forecast?id=' + this.$route.params.id + '&units=metric&appid=' + this.APPID;
            this.$http.get(forecastUrl).then(function (result) {
                self.city.result.weather.list = result.body.list;
                self.error = false;
            }, function (err) {
              this.error = true;
            });

        },
        filterLimit: function(arr, limit) {
            return arr.slice(0, limit);
        },
        roundNumber: function(val) {
            return Math.round(val);
        }
    },
    filters: {
        dateTime: function (value) {
            if (value) {
                return moment.unix(value).format('dddd | MMM DD | HH:mm');
            }
        },
        dateHour: function (value) {
            if (value) {
                return moment.unix(value).format('ddd | HH:mm');
            }
        }
    }
}
</script>
