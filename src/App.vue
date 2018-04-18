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
  data() {
    return {
      viewportWidth: document.getElementById('app').clientWidth,
      viewportHeight: document.getElementById('app').clientHeight,
      scrollTo: {x: 0, y: 0},
      scrollHorizontal: 0,
      scrollVertical: 0
    }
  },
  components: {
    stelaStone
  },
  computed: {
    scrollThreshold() {
      return this.viewportWidth * 0.10;
    }
  },
  methods: {
    mousePosition(e) {
      let horizontalMousePosition = e.clientX;
      let verticalMousePosition = e.clientY;

      clearInterval(this.interval);

      if(horizontalMousePosition + this.scrollThreshold >= this.viewportWidth){
        this.scrollHorizontal = 1;
      } else if (horizontalMousePosition - this.scrollThreshold <= 0){
       this.scrollHorizontal = -1;
      } else {
        this.scrollHorizontal = 0;
      }

      if(verticalMousePosition + this.scrollThreshold >= this.viewportHeight){
        this.scrollVertical = 1;
      } else if (verticalMousePosition - this.scrollThreshold <= 0){
        this.scrollVertical = -1;
      } else {
        this.scrollVertical = 0;
      }
      this.scrollHandler(this.scrollHorizontal, this.scrollVertical);

    },
    scrollHandler(x, y) {
      this.interval = setInterval(()=>{
        window.scrollBy(x, y);
      }, 2);
    }
},
mounted() {
  window.addEventListener('mousemove', this.mousePosition);
  window.addEventListener('mouseout', ()=>{
    clearInterval(this.interval);
  });
  window.addEventListener('resize', ()=>{
    this.viewportWidth = document.getElementById('app').clientWidth;
    this.viewportHeight = document.getElementById('app').clientHeight;
  });

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
