<template>
    <div>
        <b-container fluid="sm md lg" v-if="loading" class="bv-example-row">
             <img :src="`${data.countryInfo.flag}`" :alt="`${this.$route.params.name}`" height="40" width="80" style="float:left" class="m-2">
             <h1 class="m-2">{{this.$route.params.name}}</h1>
            <case-death-recovered :cases = "data.cases" :deaths = "data.deaths" :recovered = "data.recovered" ></case-death-recovered>
            <bar-chart v-if="loaded" :chart-data="datacollection" :options="chartOptions" class="my-5"></bar-chart>
        </b-container>
    </div>
</template>
<script>
import axios from 'axios'
import CaseDeathRecovered from './CaseDeathRecovered'
import BarChart from '../charts/charts'
export default {
    components:{
        BarChart,
        CaseDeathRecovered,
    },
    data(){
        return{
            data:null,
            loading:false,
            datacollection: null,
            chartOptions: null,
            loaded:false
        }
    },
    async mounted () {
        try {
            axios.get(`https://corona.lmao.ninja/countries/${this.$route.params.name}`)
                .then((res)=>{
                this.data = res.data
                }).finally(()=>{this.loading = true})
                .catch(error=>{
                console.log(error)
            })
            axios.get(`https://corona.lmao.ninja/v2/historical/${this.$route.params.name}`)
                .then((res)=>{
                this.datacollection = {
                    labels: Object.keys(res.data.timeline.cases),
                    datasets: [
                    {
                        label: 'Total Cases',
                        backgroundColor: 'transparent',
                        borderColor: "#D1ECF0",
                        pointBackgroundColor: "#117591",
                        data:Object.values(res.data.timeline.cases)
                    },
                    {
                        label: 'Total Deaths',
                        backgroundColor: 'transparent',
                        borderColor: "#F5C6CB",
                        pointBackgroundColor: "#F66384",
                        data: Object.values(res.data.timeline.deaths)
                    },
                    {
                        label: 'Total Deaths',
                        backgroundColor: 'transparent',
                        borderColor: "#D4EDDA",
                        pointBackgroundColor: "#185e50",
                        data: Object.values(res.data.timeline.recovered)
                    },
                    ]

                }
                }).finally(()=>{this.loaded = true})
                .catch(error=>{
                console.log(error)
            })
        } catch (e) {
        console.error(e)
        }
    }
}
</script>