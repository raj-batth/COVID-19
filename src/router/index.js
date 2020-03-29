import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import CountryData from '@/components/CountryData'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path:'/countriesdata',
      name:'CountryData',
      component:CountryData
    }
  ],
  mode: 'history',
})
