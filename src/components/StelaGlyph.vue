<template>
<!-- 
Hidden glyphs that will not be displayed. 
Gylphs are used for comparison to users tracing of in scene glyph.
-->
  <div>
    <canvas :id="canvasId + '_glyph'" class="sceneGlyph" :style="glyphInlineStyle"></canvas>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        canvasDrawGlyph: '',
        canvasDrawGlyphCtx: '',
        glyphInlineStyle: `top: ${this.glyphObject.position.y}px; left: ${this.glyphObject.position.x}px; z-index: 50;` 
      }
    },
    props: ['canvasId', 'glyphObject'],
    methods: {
      /*Creates glyph image on canvas and adds canvas image data to appropriate object*/
      drawGlyph(canvasContext, image) {
        image.onload = ()=> {
          canvasContext.drawImage(image, 0, 0);
          this.glyphObject.gylphData = this.canvasDrawGlyphCtx.getImageData(0, 0, this.canvasDrawGlyph.width, this.canvasDrawGlyph.height).data;
        }
      }
    },
    mounted: function() {
      /*Set up canvas for drawGlyph method*/
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