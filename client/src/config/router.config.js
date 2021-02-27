import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/home'
import Fame from '../views/fame'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home,
        },
        {
            path: '/fame',
            name: 'Fame',
            component: Fame,
        },
    ],
})
