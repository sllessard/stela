<template>
<!-- 
Stela display and scenes:
  - <map> allows glyphs on Stela to be clickable
  - map > area coords are set in stela/stela_build.js
  - Clicking <area> @click sets currentScene in store
 -->
  <div>
    <div class="nav-icons">
      <span @click="goBack" v-if="!showStela">
        <i class="fas fa-arrow-left">
        </i>
      </span>
      <!-- <i class="fas fa-undo"></i> -->
    </div>
    <div v-if="showStela">
      <img  class="stela"
            usemap="#primary" 
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
      },
      goBack() {
        this.$store.state.onStela = true;
        window.scrollTo(0,0);
      }
    }
  }
</script>

<style lang="scss">
  area {
    cursor: pointer;
  }

  .nav-icons {
    display: flex;
    justify-content: center;
    position: fixed;
    top: 60px;
    left: 0;
    width: 100%;
    z-index: 6000;

    svg {
      cursor: pointer;
      path {
        fill: white;
      }
    }
  }

  .stela {
    display: block;
    margin: auto;
  }
  
</style>