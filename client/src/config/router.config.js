import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/home'
import Pantheon from '../views/pantheon'
import Stats from '../views/stats'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home,
        },
        {
            path: '/pantheon',
            name: 'Pantheon',
            component: Pantheon,
        },
        {
            path: '/stats',
            name: 'Stats',
            component: Stats,
        },
    ],
})
