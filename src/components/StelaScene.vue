<template>
  <div>
    <div v-for="glyph in glyphs">
      <scene-glyph>
        <canvas id="glyph_river"></canvas>
      </scene-glyph>
      <scene-glyph-trace></scene-glyph-trace>
    </div>
  </div>
</template>

<script>
  import sceneGlyph from './StelaGlyph.vue';
  import sceneGlyphTrace from './StelaGlyphTrace.vue'
  export default {
    data() {
      return {
        glyphFound: false,
        glyphs: ['river_glyph'],
      }
    },
    computed: {

    },
    methods: {

    },
  components: {
    sceneGlyph,
    sceneGlyphTrace
  }
  }
  
</script>

<style lang="scss" scoped>
  canvas {
    border: 1px solid black;
    left: 0;
    position: absolute;
    top: 0;
  }
  
</style>