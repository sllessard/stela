<template>
  <div id="app" @mousemove="mousePosition">
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
  },
  methods: {
    mousePosition(e) {
      let viewportWidth = document.getElementById('app').clientWidth;
      let viewportHeight = document.getElementById('app').clientHeight;

      if(e.clientX + 60 >= viewportWidth){
        window.scrollBy({
          left: 25, 
          top: 0,
          behavior: 'smooth'});
      } else if (e.clientX - 60 <= 0){
          window.scrollBy({
          left: -25, 
          top: 0,
          behavior: 'smooth'});
      }

      if(e.clientY + 60 >= viewportHeight){
        window.scrollBy({
          left: 0, 
          top: 25,
          behavior: 'smooth'});
      } else if (e.clientY - 60 <= 0){
          window.scrollBy({
          left: 0, 
          top: -25,
          behavior: 'smooth'});
      }
    }
  }
}
</script>

<style lang="scss">
  html {
    height: 100%;
  }
  body {
    height: 100%;
    margin: 0;
    padding: 0;
  }

  #app {
    height: 100%;
    width: 100%;
  }
</style>
