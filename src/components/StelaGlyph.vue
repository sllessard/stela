<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        canvasDrawGlyph: '',
        canvasDrawGlyphCtx: ''

      }
    },
    methods: {
      drawGlyph(canvasContext, image) {
        image.onload = ()=> {
          canvasContext.drawImage(image, 0, 0);
        this.$store.state.currentGlyphData = this.canvasDrawGlyphCtx.getImageData(0, 0, this.canvasDrawGlyph.width, this.canvasDrawGlyph.height).data;
        }
      }
    },
    mounted: function() {
      let glyphImage = new Image();
      glyphImage.src = require('../assets/glyph-river.gif');
      this.canvasDrawGlyph = document.getElementById('glyph_river')
      this.canvasDrawGlyphCtx = this.canvasDrawGlyph.getContext('2d');
      this.canvasDrawGlyph.width = 1799;
      this.canvasDrawGlyph.height = 604;
      this.drawGlyph(this.canvasDrawGlyphCtx, glyphImage);
    }
  }
</script>

<style lang="scss">
  
</style>