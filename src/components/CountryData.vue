<template>
<div  class="mx-auto" >
    <b-form-group class="m-1">
    <b-input-group style="width:40%;float:right;margin-right:50px;">
        <b-form-input
        v-model="filter"
        type="search"
        id="filterInput"
        placeholder="Type to Search"
        ></b-form-input>
    </b-input-group>
    </b-form-group>
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
    <b-button size="sm" class="mr-1" :to="`/country/${item.item.name}`">
        {{item.item.name}}
    </b-button>
    </template>
</b-table>
</div>
</template>
<script>
import axios from 'axios'
export default {
    data(){
        return{
            isBusy: true,
            fields: [
                {
                    key: 'name',
                    sortable: true,
                    label:'Country'
                },
                {
                    key: 'totalCases',
                    sortable: true,
                    label:'Total Cases',
                    class:'text-right',
                },
                {
                    key: 'newCases',
                    sortable: true,
                    label:'New Cases',
                    class:'text-right',
                    variant: 'warning'

                },
                {
                    key: 'totalDeaths',
                    sortable: true,
                    label:'Total Deaths',
                    class:'text-right',
                   
                },
                {
                    key: 'todayDeaths',
                    sortable: true,
                    label:'New Deaths',
                    class:'text-right',
                    variant: 'danger'
                },
                {
                    key: 'totalRecovered',
                    sortable: true,
                    label:'Total Recovered',
                    class:'text-right'
                },
                {
                    key: 'active',
                    sortable: true,
                    label:'Active Cases',
                    class:'text-right'
                },
                {
                    key: 'critical',
                    sortable: true,
                    label:'Critical Cases',
                    class:'text-right'
                }
            ],
            items:[],
            filter:null,
        }
    },
    methods:{
      getCountriesData(){
            return axios.get('https://corona.lmao.ninja/v2/countries')
            .then((res)=>{
               this.items = res.data.map(resultRow=>({
                'name': resultRow.country.toLocaleString() ,
                'totalCases' : resultRow.cases,
                'newCases' : resultRow.todayCases,
                'totalDeaths'  : resultRow.deaths,
                'todayDeaths'  : resultRow.todayDeaths,
                'totalRecovered'  : resultRow.recovered,
                'active'  : resultRow.active,
                'critical'  : resultRow.critical
               }))

               console.log(res.data)
            }).finally(()=>{this.isBusy = false})
            .catch(error=>{
                console.log(error)
            })
        },
    },
    mounted(){
        this.getCountriesData()
    }

}
</script>