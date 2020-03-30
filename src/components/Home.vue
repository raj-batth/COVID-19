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
        {{getData.cases | number}}
        </b-card-text>
      </b-card>
        <b-card
      style="background-color:#F8D7DA"
      header="Total Deaths"
      header-tag="header">
        <b-card-text variant="success">
        {{getData.deaths | number}}
        </b-card-text>
      </b-card>
       <b-card
      style="background-color:#D4EDDA"
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
