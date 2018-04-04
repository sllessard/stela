<template>
  <div>
    <div v-if="showStela">
      <img  usemap="#primary" 
            src="../assets/stela.jpg" />

      <map v-for="(scene, key) in this.$store.state.scenes" name="primary">
        <area @click="glyphSelector(scene)" 
              shape="rect" 
              :coords="scene.mapAreaCoords" 
              :alt="key">
      </map>
    </div>
    <stela-scene v-if="!showStela"></stela-scene>
  </div>
</template>

<script>
  import stelaScene from './StelaScene.vue';
  export default {
    computed: {
      stelaScenes() {
        return this.$store.state.scenes;
      },
      showStela(){
        return this.$store.state.onStela;
      }
    },
    components: {
      stelaScene
    },
    methods: {
      glyphSelector(mapAreaClicked) {
        this.$store.state.onStela = false;
        this.$store.state.currentScene = mapAreaClicked;
      }
    }
  }
</script>

<style lang="scss" scoped>
  area {
    cursor: pointer;
  }
  
</style>