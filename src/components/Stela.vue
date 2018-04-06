<template>
<!-- 
Stela display and scenes:
  - <map> allows glyphs on Stela to be clickable
  - map > area coords are set in stela/stela_build.js
  - Clicking <area> @click sets currentScene in store
 -->
  <div>
    <div v-if="showStela">
      <img  usemap="#primary" 
            src="../assets/stela.jpg" />

      <map v-for="(scene, key) in stelaScenes" name="primary">
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
      /*Sets currentScene in store and displays scene*/
      glyphSelector(mapAreaClicked) {
        this.$store.state.onStela = false;
        this.$store.state.currentScene = mapAreaClicked;
      }
    }
  }
</script>

<style lang="scss">
  area {
    cursor: pointer;
  }
  
</style>