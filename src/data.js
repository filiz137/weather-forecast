import Vue from 'vue';

var json = Vue.extend({
    data: function () {
        return {
            APPID: 'b712b9a9b0785a9842d7c7ba49f37a5f',
            openweathermapAPI: 'http://api.openweathermap.org/data/2.5/',
            weather: [],
            forecast: [],
            cities: [
                {
                    id: 2643743,
                    name: 'London',
                    icon: 'london.svg',
                    result: {
                        weather: {
                            icon: '',
                            temp: 0,
                            humidity: 0,
                            desc: null,
                            wind: {
                                speed: 0,
                                deg: 0,
                            },
                            date: 0,
                            list: [],
                        },
                    }
                },
                {
                    id: 2968815,
                    name: 'Paris',
                    icon: 'paris.svg',
                    result: {
                        weather: {
                            icon: '',
                            temp: 0,
                            humidity: 0,
                            desc: null,
                            wind: {
                                speed: 0,
                                deg: 0,
                            },
                            date: 0,
                            list: [],
                        },
                    }
                },
                {
                    id: 2950159,
                    name: 'Berlin',
                    icon: 'berlin.svg',
                    result: {
                        weather: {
                            icon: '',
                            temp: 0,
                            humidity: 0,
                            desc: null,
                            wind: {
                                speed: 0,
                                deg: 0,
                            },
                            date: 0,
                            list: [],
                        },
                    }
                },
                {
                    id: 3169069,
                    name: 'Rome',
                    icon: 'rome.svg',
                    result: {
                        weather: {
                            icon: '',
                            temp: 0,
                            humidity: 0,
                            desc: null,
                            wind: {
                                speed: 0,
                                deg: 0,
                            },
                            date: 0,
                            list: [],
                        },
                    }
                },
                {
                    id: 2759794,
                    name: 'Amsterdam',
                    icon: 'amsterdam.svg',
                    result: {
                        weather: {
                            icon: '',
                            temp: 0,
                            humidity: 0,
                            desc: null,
                            wind: {
                                speed: 0,
                                deg: 0,
                            },
                            date: 0,
                            list: [],
                        },
                    }
                }
            ],
              detail: false
        };
    }
});

module.exports = json;
