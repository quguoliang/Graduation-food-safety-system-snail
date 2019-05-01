import Vue from 'vue'
import App from './App'
import cuCustom from './colorui/components/cu-custom.vue'
import cuSwiper from './colorui/components/curry-swiper.vue'
import cuBar from './colorui/components/curry-bar.vue'
import about from './pages/about/about'


Vue.component('cu-custom', cuCustom)
Vue.component('cu-swiper', cuSwiper)
Vue.component('cu-bar', cuBar)
Vue.component('about', about)


Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()