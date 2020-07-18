import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import Users from '../components/user/Users.vue'
import PersonMessage from '../components/personMessage/PersonMessage.vue'

Vue.use(VueRouter)

// 这一页一定一定不要用自带的格式化代码
const routes = [{
  path: '/',
  redirect: '/login'
},
{
  path: '/login',
  component: Login
},
{
  path: '/home',
  component: Home,
  redirect: '/welcome',
  children: [
    { path: '/welcome', component: Welcome },
    { path: '/users', component: Users },
    { path: '/personMessage', component: PersonMessage }
  ]
}
]

const router = new VueRouter({
  routes
})

export default router
