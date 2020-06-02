<template>
  <div id="app">
    <top-header></top-header>
    <router-view/>
  </div>
</template>

<script>
import TopHeader from './components/Top-Header.vue';

export default {
  components: { 'top-header': TopHeader },
};
</script>

<style lang="scss">
#app {
  font-family: Montserrat, monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

</style>
