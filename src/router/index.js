import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import CountryData from '@/components/CountryData'
import CountryDataDetails from '@/components/CountryDataDetails'

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
    },
    {
      path:'/country/:name',
      name:'CountryDataDetails',
      component:CountryDataDetails
    }
  ],
  mode: 'history',
})
