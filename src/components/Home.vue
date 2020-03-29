<template>
  <div>
   <h1></h1>
    <b-container class="bv-example-row">
      <b-row cols="3" >
      <b-card 
      
      header="Total Cases"
      header-tag="header">
        <b-card-text style="background-color:black">
        {{getData.cases | number}}
        </b-card-text>
      </b-card>
        <b-card
      header="Total Deaths"
      header-tag="header">
        <b-card-text variant="success">
        {{getData.deaths | number}}
        </b-card-text>
      </b-card>
       <b-card
      header="Total Recoved"
      header-tag="header">
        <b-card-text variant="success">
        {{getData.recovered | number}}
        </b-card-text>
      </b-card>
      </b-row>
    </b-container>
  </div>
</template>

<script>

import {mapActions} from 'vuex';
export default {
  name: 'HelloWorld',
  data () {
    return {
     data:''
    }
  },
  computed: {
    getData(){
      return this.$store.getters.data
    }
  },
}
</script>
<style scoped>

</style>
