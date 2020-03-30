<template>
  <div>
   <h1></h1>
    <b-container class="bv-example-row">
      <b-row cols="3" >
      <b-card 
      style="background-color:#D1ECF0"
      header="Total Cases"
      header-tag="header">
        <b-card-text>
        {{getData.cases}}
        </b-card-text>
      </b-card>
        <b-card
      style="background-color:#F5C6CB"
      header="Total Deaths"
      header-tag="header">
        <b-card-text variant="success">
        {{getData.deaths}}
        </b-card-text>
      </b-card>
       <b-card
      style="background-color:#D4EDDA"
      header="Recoved"
      header-tag="header">
        <b-card-text variant="success">
        {{getData.recovered}}
        </b-card-text>
      </b-card>
      </b-row>

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
export default {
  components: {
      LineChart
    },
  data () {
    return {
     data:'',
     datacollection: null,
     chartOptions: null,
     loaded:false
    }
  },
  computed: {
    getData(){
      return this.$store.getters.data
    }
  },
  async mounted () {
    try {
      axios.get('https://corona.lmao.ninja/v2/historical/all')
        .then((res)=>{
          this.datacollection = {
            labels: Object.keys(res.data.cases),
            datasets: [
              {
                label: 'Total Cases',
                backgroundColor: '#D1ECF0',
                data:Object.values(res.data.cases)
              },
              {
                label: 'Total Deaths',
                backgroundColor: '#F5C6CB',
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
