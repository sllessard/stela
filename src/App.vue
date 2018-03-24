<template>
  <div id="app">
    <stela-stone>
    </stela-stone>
  </div>
</template>

<script>
import stelaStone  from './components/Stela.vue';
export default {
  name: 'app',
  components: {
    stelaStone
  }
}
</script>

<style lang="scss">
  body {
    margin: 0;
    padding: 0;
  }
</style>
