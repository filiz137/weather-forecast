'use strict';



var forecast = new Vue({
    el: '#main',
    data: {
        APPID: 'b712b9a9b0785a9842d7c7ba49f37a5f',
        openweathermapAPI: 'http://api.openweathermap.org/data/2.5/',
        weather: [],
        cities: []
    },
    methods: {
        forecastCity: function() {
            var url = this.openweathermapAPI + 'group?id=2643743,2968815,6356055,3169069,2759794&units=metric&appid=' + this.APPID;
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


