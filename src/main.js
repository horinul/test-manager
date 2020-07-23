import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import qs from 'qs'

// 导入全局样式表
import './assets/css/global.css'

import axios from 'axios'
import md5 from 'js-md5';
Vue.prototype.$http = axios
Vue.prototype.$md5 = md5;
Vue.prototype.$qs = qs;
// natapp接口前缀
Vue.prototype.api = 'http://pjmxkh.natappfree.cc/kyaru/'

Vue.prototype.personInfo = {
    userName: 'sd',
    userSex: '',
    isManager: '',
    userTel: '',
    company: '',
    userAccount: '',
    userId: ''
}
Vue.prototype.openLoading = function() {
    const loading = this.$loading({ // 声明一个loading对象
        lock: true, // 是否锁屏
        text: '正在加载...', // 加载动画的文字
        spinner: 'el-icon-loading', // 引入的loading图标
        background: 'rgba(0, 0, 0, 0.3)', // 背景颜色
        target: '.sub-main', // 需要遮罩的区域
        body: true,
        customClass: 'mask' // 遮罩层新增类名
    })
    setTimeout(function() { // 设定定时器，超时5S后自动关闭遮罩层，避免请求失败时，遮罩层一直存在的问题

        loading.close(); // 关闭遮罩层
    }, 10000)
    return loading;
}

axios.defaults.baseURL = 'http://127.0.0.1:8888'

Vue.config.productionTip = false





new Vue({
    router,
    render: h => h(App)
}).$mount('#app')