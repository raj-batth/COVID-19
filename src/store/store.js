import Vue from 'vue';
import Vuex from 'vuex';
import overalldata from './overalldata'

Vue.use(Vuex);

export default new Vuex.Store({
    modules:{
        overalldata,
    }
})