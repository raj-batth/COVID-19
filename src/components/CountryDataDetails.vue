<template>
    <div>
        <b-container fluid="sm md lg" v-if="loading" class="bv-example-row">
             <img :src="`${data.countryInfo.flag}`" :alt="`${this.$route.params.name}`" height="40" width="80" style="float:left" class="m-2">
             <h1 class="m-2">{{this.$route.params.name}}</h1>
            <case-death-recovered :cases = "data.cases" :deaths = "data.deaths" :recovered = "data.recovered" ></case-death-recovered>
             <b-row class="text-center">
                 <b-col><bar-chart v-if="loaded" :chart-data="datacollection" :options="chartOptions" class="my-5" style="max-width: 400px; float:left"></bar-chart> </b-col>
                 <b-col><bar-chart v-if="loaded" :chart-data="datacollectionD" :options="chartOptions" class="my-5" style="max-width: 400px; "></bar-chart> </b-col>
             </b-row>
             <b-row class="text-center">
                <b-col cols="12"><bar-chart v-if="loaded" :chart-data="datacollectionR" :options="chartOptions" class="my-5" style="max-width: 400px; float:center"></bar-chart></b-col>
             </b-row>
            <b-table
                :busy="isBusy"
                class="mx-auto"
                striped hover
                show-empty
                responsive = "sm"
                :items="items"
                :fields="fields"
                style="width:90%"
                :filter = "filter"
                head-variant="dark" 
                >
                <template v-slot:table-busy>
                    <div class="text-center text-danger my-2">
                        <b-spinner class="align-middle"></b-spinner>
                        <strong>Loading...</strong>
                    </div>
                </template>
                <template v-slot:cell(name)="item">
                <b-button size="sm" class="mr-1" >
                    {{item.item.name}}
                </b-button>
                </template>
            </b-table>
        </b-container>
    </div>
</template>
<script>
import axios from 'axios'
import CaseDeathRecovered from './CaseDeathRecovered'
import BarChart from '../charts/barcharts'
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
            datacollectionD:null,
            datacollectionR:null,
            chartOptions: null,
            loaded:false,
            isBusy: true,
            fields: [
                {
                    key: 'name',
                    sortable: true,
                    label:'Province'
                },
                {
                    key: 'totalCases',
                    sortable: true,
                    label:'Total Cases',
                    class:'text-right',
                },
               
                {
                    key: 'totalDeaths',
                    sortable: true,
                    label:'Total Deaths',
                    class:'text-right',
                   
                },
            ],
            items:[],
            filter:null,
        }
    },
    async mounted () {
        try {
            axios.get(`countries/${this.$route.params.name}`)
                .then((res)=>{
                this.data = res.data
                }).finally(()=>{this.loading = true})
                .catch(error=>{
                console.log(error)
            })
            axios.get(`historical/${this.$route.params.name}`)
                .then((res)=>{
                this.datacollection = {
                    labels: Object.keys(res.data.timeline.cases),
                    datasets: [
                    {
                        label: 'Total Cases',
                        borderColor: "#D1ECF0",
                        backgroundColor: "#117591",
                        data:Object.values(res.data.timeline.cases)
                    },
                    ]
                }

                this.datacollectionD = {
                    labels: Object.keys(res.data.timeline.deaths),
                    datasets: [
                    {
                        label: 'Total Deaths',
                        borderColor: "#F5C6CB",
                        backgroundColor: "#F66384",
                        data: Object.values(res.data.timeline.deaths)
                    },
                    ]
                }

                this.datacollectionR = {
                    labels: Object.keys(res.data.timeline.recovered),
                    datasets: [
                    {
                        label: 'Total Recovered',
                        borderColor: "#D4EDDA",
                        backgroundColor: "#6AB04A",
                        data: Object.values(res.data.timeline.recovered)
                    },
                    ]
                }
                }).finally(()=>{this.loaded = true})
                .catch(error=>{
                console.log(error)
            })
            if(this.$route.params.name == 'USA'){
                axios.get(`states`)
                    .then((res)=>{   
                    this.items = res.data.map(resultRow=>({
                    'name': resultRow.state ,
                    'totalCases' : resultRow.cases,
                    'totalDeaths'  : resultRow.deaths,
                    }))
                    }).finally(()=>{this.isBusy = false})
                    .catch(error=>{
                        console.log(error)
                })
            }
            else{
                axios.get(`jhucsse`)
                .then((res)=>{ 
                    const totalRows = res.data.length
                    for(var i = 0 ; i < totalRows; i++){
                        if(res.data[i].country  === this.$route.params.name && res.data[i].province !== 'Recovered' && res.data[i].province != '' && res.data[i].province != null){
                            this.items = this.items.concat([
                                {
                                    'name': res.data[i].province,
                                    'totalCases' : res.data[i].stats.confirmed,
                                    'totalDeaths' : res.data[i].stats.deaths ,
                                }])
                        }
                    }
                console.log(res.data)
                }).finally(()=>{this.isBusy = false})
                .catch(error=>{
                    console.log(error)
                })
            }
          
        } catch (e) {
        console.error(e)
        }
    }
}
</script>