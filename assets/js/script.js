'use strict';



var forecast = new Vue({
    el: '#main',
    data: {
        APPID: 'b712b9a9b0785a9842d7c7ba49f37a5f',
        openweathermapAPI: 'http://api.openweathermap.org/data/2.5/',
        main: {
            temp: null
        },
        name: null
    },
    methods: {
        forecastCity: function() {
            var url = this.openweathermapAPI + 'weather?q=London,uk&appid=' + this.APPID;
            this.$http.get(url).then(result => {

                // get body data
                this.weather = result.body;

            }, result => {
                console.log('error!')
            });
        }
    },
    filters: {}
});
forecast.forecastCity();


