import axios from 'axios';
const state = {
    data:{},
    error:{},
};

const mutations = {
    'SET_DATA' (state,data){
        state.data = data
        console.log("mutation")
    },
    'UPDATE_ERROR'(state, error){
        state.error = error
    }
};

const actions = {
    'GET_DATA'({commit}){
        return axios.get('all')
        .then((res)=>{
            commit('SET_DATA', res.data)
        })
        .catch(error=>{
            commit('UPDATE_ERROR',error)
        })
    }
}
const getters = {
    data: state =>{
        return state.data
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}