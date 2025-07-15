<template>
  <div id="app">
      <router-view/>
  </div>
</template>

<script>
import Register from './components/Register'
import Login from './components/Login'

export default{
  name: 'App',
  component: {
    Register,
    Login,
    // Dashboard,
  }
}
</script>

<style scoped>

</style>
