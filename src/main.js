'use strict';

import './assets/scss/main.scss';

import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import moment from 'moment';

import json from './data.js';
import Home from './components/home.vue';
import Detail from './components/detail.vue';

Vue.config.productionTip = false;

Vue.use(VueResource);
Vue.use(VueRouter);

const routes = [
    { path: '', component: Home },
    { path: '/detail/:id', component: Detail }
];

const router = new VueRouter({
    // mode: 'history',
    routes
});

var forecast = new json({
    router,
    el: '#main',
    data: {}
});
