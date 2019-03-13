<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  created(){
    alert("asd")
    console.log('process')
    console.log(process)
    console.log(cordovaHTTP)
  }
}
</script>

<style>
</style>
