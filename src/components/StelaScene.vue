<template>
<!-- Scene is hand drawn illustration stelaGlyph and stelaGlyphTrace are set in relation to scene-->
  <div>
    <loading-screen v-if="loading" id="loadingScreen"></loading-screen>
    <img :src="sceneSrc" alt="Scene" class="scene" id="sceneImage">
    <div v-for="(glyph, key) in glyphs">
      <scene-glyph :canvasId="key" :glyphObject="glyph"></scene-glyph>
      <scene-glyph-trace :canvasId="key" :glyphObject="glyph"></scene-glyph-trace>
    </div>
  </div>
</template>

<script>
  import loadingScreen from './LoadingScreen';
  import sceneGlyph from './StelaGlyph.vue';
  import sceneGlyphTrace from './StelaGlyphTrace.vue';
  export default {
    data() {
      return {
        glyphFound: false,
        glyphs: this.$store.state.currentScene.glyphs,
        loading: false,
        sceneSrc: this.$store.state.currentScene.sceneImage
      }
    },
    components: {
      sceneGlyph,
      sceneGlyphTrace,
      loadingScreen
    },
    mounted() {
      this.loading = true;
      let sceneImage = document.getElementById('sceneImage');
      let sceneWidth = sceneImage.width;
      let sceneHeight = sceneImage.height;
      let centerWidth = (sceneWidth / 2) - (window.innerWidth / 2);
      let centerHeight = (sceneHeight / 2) - (window.innerHeight / 2);

      sceneImage.onload = () => {
        setTimeout(()=>{
          this.loading = false;
        }, 1000);
      }
      window.scrollTo(centerWidth, centerHeight);
    }
  }
</script>

<style lang="scss" scoped>
  canvas {
    position: absolute;
  }
</style>