<template>
  <div id="app">
     <app-header>
    </app-header>
    <router-view/>
  </div>
</template>

<script>
import Header from './components/Header'
export default {
  name: 'App',
  components:{
    appHeader:Header
  },
  created(){
    this.$store.dispatch('GET_DATA')
  }
}
</script>

<style>
 @import "assets/styles.css";
</style>
