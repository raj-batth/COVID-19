<template>
  <div>
   <h1></h1>
    <b-container class="bv-example-row">
      <case-death-recovered :cases = "getData.cases" :deaths = "getData.deaths" :recovered = "getData.recovered" ></case-death-recovered>
      <div class="small my-5">
        <line-chart :chart-data="datacollection" :options="chartOptions"></line-chart>
      </div>
    </b-container>
  </div>
</template>

<script>

import {mapActions} from 'vuex';
import LineChart from '../charts/charts'
import axios from 'axios'
import CaseDeathRecovered from './CaseDeathRecovered'
export default {
  components: {
      LineChart,
      CaseDeathRecovered
    },
  data () {
    return {
     data:'',
     datacollection: null,
     chartOptions: null,
     loaded:false,
    }
  },
  computed: {
    getData(){
      return this.$store.getters.data
    }
  },
  mounted () {
    
    try {
      axios.get('historical/all')
        .then((res)=>{
          this.datacollection = {
            labels: Object.keys(res.data.cases),
            datasets: [
              {
                label: 'Total Cases',
                borderColor: "#05CBE1",
                pointBackgroundColor: "#257590",
                pointBorderColor: "#257590",
                borderWidth: 1,
                backgroundColor: "#D1ECF0",
                data:Object.values(res.data.cases)
              },
              {
                label: 'Total Deaths',
                backgroundColor: '#F5C6CB',
                pointBackgroundColor: "red",
                borderWidth: 1,
                pointBorderColor: "red",
                backgroundColor: "#F5C6CB",
                data: Object.values(res.data.deaths)
              },
            ],
            chartOptions: {
              responsive: true,
              maintainAspectRatio: true
            }

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
<style scoped>

</style>
