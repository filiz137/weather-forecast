'use strict';



var forecast = new Vue({
    el: '#main',
    data: {
        APPID: 'b712b9a9b0785a9842d7c7ba49f37a5f',
        openweathermapAPI: 'http://api.openweathermap.org/data/2.5/',
        weather: [],
        forecast: [],
        cities: [ 
            {
                id: 2643743,
                name: 'London',
                icon: 'assets/img/city-icon/london.svg'
            },
            {
                id: 2968815,
                name: 'Paris',
                icon: 'assets/img/city-icon/paris.svg'
            },
            {
                id: 2950159,
                name: 'Berlin',
                icon: 'assets/img/city-icon/berlin.svg'
            },
            {
                id: 3169069,
                name: 'Rome',
                icon: 'assets/img/city-icon/rome.svg'
            },
            {
                id: 2759794,
                name: 'Amsterdam',
                icon: 'assets/img/city-icon/amsterdam.svg'
            }
        ],
        forecastDetail: false
    },
    methods: {
        forecastCity: function() {
            var citiesId = this.cities.map( function (obj) {
                return obj.id;
            });
            // var cityId = citiesId.forEach( function (elm) {
            //     console.log(elm)
            // });
 
            var citiesUrl = this.openweathermapAPI + 'group?id=' + citiesId.join() + '&units=metric&appid=' + this.APPID;
            
            var forecastUrl = this.openweathermapAPI + 'forecast?id=' + citiesId[0] + '&units=metric&appid=' + this.APPID;
            
            this.$http.get(citiesUrl).then(function (result) {
                this.weather = result.body.list;
            }, function (err) {
                console.log('error!')
            });

            this.$http.get(forecastUrl).then(function (result) {
                this.forecast = result.body.list;
            }, function (err) {
                console.log('error!')
            });
        }
    },
    filters: {}
});
forecast.forecastCity();


