'use strict';



var forecast = new Vue({
    el: '#main',
    data: {
        APPID: 'b712b9a9b0785a9842d7c7ba49f37a5f',
        openweathermapAPI: 'http://api.openweathermap.org/data/2.5/',
        weather: [],
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
                id: 6356055,
                name: 'Barcelona',
                icon: 'assets/img/city-icon/barcelona.svg'
            },
            {
                id: 3169069,
                name: 'Rome',
                icon: 'assets/img/city-icon/roma.svg'
            },
            {
                id: 2759794,
                name: 'Amsterdam',
                icon: 'assets/img/city-icon/amsterdam.svg'
            }
        ]
    },
    methods: {
        forecastCity: function() {
            var citiesId = this.cities.map( function (obj) {
                return obj.id;
            });
            var url = this.openweathermapAPI + 'group?id=' + citiesId.join() + '&units=metric&appid=' + this.APPID;
            this.$http.get(url).then(result => {

                // get body data
                this.weather = result.body.list;

            }, result => {
                console.log('error!')
            });
        }
    },
    filters: {}
});
forecast.forecastCity();


