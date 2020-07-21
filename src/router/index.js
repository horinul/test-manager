import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Regist from '../components/Regist.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'

import UserInfo from '../components/UserInfo/UserInfo.vue'

import GoodInfo from '../components/goods/GoodInfo.vue'

import AddInfo from '../components/admin/AddInfo.vue'
import OutInfo from '../components/admin/OutInfo.vue'
import ClientList from '../components/admin/ClientList.vue'
import ClientAppli from '../components/admin/ClientAppli.vue'

import AppliOut from '../components/client/AppliOut.vue'
import AppliState from '../components/client/AppliState.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/regist',
        component: Regist
    },
    {
        path: '/home',
        component: Home,
        redirect: '/welcome',
        children: [{
                path: '/welcome',
                component: Welcome
            },
            {
                path: '/userInfo',
                component: UserInfo
            },
            {
                path: '/goodInfo',
                component: GoodInfo
            },
            {
                path: '/outInfo',
                component: OutInfo
            }, {
                path: '/clientList',
                component: ClientList
            },
            {
                path: '/clientAppli',
                component: ClientAppli
            },
            {
                path: '/appliOut',
                component: AppliOut
            },
            {
                path: '/appliState',
                component: AppliState
            }
        ]
    }
]

const router = new VueRouter({
    routes
})

// 避免重复选择控制台报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

export default router