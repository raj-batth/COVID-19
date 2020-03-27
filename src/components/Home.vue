<template>
  <div>
   <h1>Hello</h1>
   {{data}}
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'HelloWorld',
  data () {
    return {
     data:''
    }
  },
  methods:{
    getAllCases(){
      axios.get('https://corona.lmao.ninja/all')
      .then((res)=>{
       this.data = res.data
      })
      .catch(error=>{
        console.error('Notworking')
      })
    }
  },
  created(){
    this.getAllCases();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
