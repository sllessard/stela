<template>
<!-- Scene is hand drawn illustration stelaGlyph and stelaGlyphTrace are set in relation to scene-->
  <div>
    <img :src="sceneSrc" alt="Scene" class="scene">
    <div v-for="(glyph, key) in glyphs">
      <scene-glyph :canvasId="key" :glyphObject="glyph"></scene-glyph>
      <scene-glyph-trace :canvasId="key" :glyphObject="glyph"></scene-glyph-trace>
    </div>
  </div>
</template>

<script>
  import sceneGlyph from './StelaGlyph.vue';
  import sceneGlyphTrace from './StelaGlyphTrace.vue';
  export default {
    data() {
      return {
        glyphFound: false,
        glyphs: this.$store.state.currentScene.glyphs,
        sceneSrc: this.$store.state.currentScene.sceneImage
      }
    },
    components: {
      sceneGlyph,
      sceneGlyphTrace
    }
  }
</script>

<style lang="scss" scoped>
  canvas {
    position: absolute;
  }
</style>