<template>
      <b-row cols="3" >
        <b-card 
        style="background-color:#D1ECF0"
        header="Total Cases"
        header-tag="header">
          <b-card-text>
          {{cases}}
          </b-card-text>
        </b-card>
          <b-card
        style="background-color:#F5C6CB"
        header="Total Deaths"
        header-tag="header">
          <b-card-text variant="success">
          {{deaths}}
          </b-card-text>
        </b-card>
        <b-card
        style="background-color:#D4EDDA"
        header="Recovered"
        header-tag="header">
          <b-card-text variant="success">
          {{recovered}}
          </b-card-text>
        </b-card>
      </b-row>
</template>

<script>
export default {
   props:{
     cases:Number,
     deaths:Number,
     recovered:Number
   },

    data(){
        return {
            
        }
    }
}
</script>