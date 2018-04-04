<template>
  <div>
    <canvas :id="canvasId + '_glyph'" class="sceneGlyph" :style="glyphInlineStyle"></canvas>
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
    props: ['canvasId', 'glyphObject'],
    computed: {
      glyphInlineStyle() {
        return 'top: ' + this.glyphObject.position.y + 'px; left: ' + this.glyphObject.position.x + 'px; z-index: 100;'
      }
    },
    methods: {
      drawGlyph(canvasContext, image) {
        image.onload = ()=> {
          canvasContext.drawImage(image, 0, 0);
          this.glyphObject.gylphData = this.canvasDrawGlyphCtx.getImageData(0, 0, this.canvasDrawGlyph.width, this.canvasDrawGlyph.height).data;
        }
      }
    },
    mounted: function() {
      let glyphImage = new Image();
      glyphImage.src = require('../assets/' + this.glyphObject.glyphImage);
      this.canvasDrawGlyph = document.getElementById(this.canvasId + '_glyph');
      this.canvasDrawGlyphCtx = this.canvasDrawGlyph.getContext('2d');
      this.canvasDrawGlyph.width = this.glyphObject.gifDimensions.width;
      this.canvasDrawGlyph.height = this.glyphObject.gifDimensions.height;
      this.drawGlyph(this.canvasDrawGlyphCtx, glyphImage);
    }
  }
</script>

<style lang="scss" scoped>
  canvas {
      opacity: .1;
      position: absolute;
    }
</style>