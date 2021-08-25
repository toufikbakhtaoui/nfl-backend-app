import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/home'
import Pantheon from '../views/pantheon'

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
    ],
})
