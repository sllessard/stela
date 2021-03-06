<template>
<!-- 
Canvas for trace mechanic:
  - Positioned over scene where glyphs exist
-->
    <canvas :id="canvasId + '_trace'" 
            @mousedown="startTrace" 
            @mouseup="stopTrace"
            :style="glyphInlineStyle">
    </canvas>
</template>

<script>
  import canvasConfig from '../stela/config.js';
  export default {
    data() {
      return{
        canvasTrace: '',
        canvasTraceCtx: '',
        mouse: {x: 0, y: 0},
        alertMessage: '',
        glyphInlineStyle: `top: ${this.glyphObject.position.y}px; left: ${this.glyphObject.position.x}px; z-index: 100;` 
      }
    },
    props: ['canvasId', 'glyphObject'],
    computed: {
      glyphData() {
        //Gets this glyph objects image data set in StelaGlyph.vue
        return this.glyphObject.gylphData;
      }
    },
    methods:{
      canvasOpaquePixels() {
        //Counts canvas opaque pixels. Starts at 3 to track 'a' of rgba
        let opaquePixels = 0;
        for(let i = 3, dataLength = this.glyphData.length; i < dataLength; i+=4) {
          if (this.glyphData[i] > 0) {
            opaquePixels++;
          }
        }
        return opaquePixels;
      },
      checkBoundaries(userPathData) {
        //Check if user path exited glyph by comparing opaque pixels of two canvases
        let opaquePixels = 0;
        for(let i = 3, il = userPathData.length; i < il; i+=4) {
          if (userPathData[i] > 0) {
            if (this.glyphData[i] > 0) {
             opaquePixels++;
            } else {
              this.alertMessage += ' Outside of boundary.';
              break;
            }
          }
        }
        this.checkFill(opaquePixels);
      },
      checkFill(userPath) {
        //Compare number of opaque pixels between two canvases to determine if user has satisfactorily traced 
        let glyphRatioArea = this.canvasOpaquePixels()/85;
        if(userPath < glyphRatioArea || userPath > (2 * glyphRatioArea) ) {
          this.alertMessage += ' Path Incomplete.';
          console.log(`${this.alertMessage}`);
        } else {
          this.alertMessage += 'Path complete and inside boundary';
          console.log(`${this.alertMessage}`);
        }
      },
      clearCanvas() {
        //Removes the users tracing
        this.canvasTraceCtx.clearRect(0, 0, this.canvasTrace.width, this.canvasTrace.height);
      },
      stopTrace() {
        //Stops drawing on canvas
        this.canvasTrace.removeEventListener('mousemove', this.draw, false);
        let userPathData = this.canvasTraceCtx.getImageData(0, 0, this.canvasTrace.width, this.canvasTrace.height).data;
        this.clearCanvas();
        this.checkBoundaries(userPathData);
      },
      startTrace() {
        //Start drawing on canvas
        this.alertMessage = '';
        this.canvasTraceCtx.beginPath();
        this.canvasTraceCtx.moveTo(this.mouse.x, this.mouse.y);
        this.canvasTrace.addEventListener('mousemove', this.draw, false);
      },
      draw() {
        this.canvasTraceCtx.lineTo(this.mouse.x, this.mouse.y);
        this.canvasTraceCtx.stroke();
      },
    },
    mounted: function() {
      //Set up canvas for drawing
      this.canvasTrace = document.getElementById(this.canvasId + '_trace');
      this.canvasTraceCtx = this.canvasTrace.getContext('2d');
      this.canvasTrace.width = this.glyphObject.gifDimensions.width;
      this.canvasTrace.height = this.glyphObject.gifDimensions.height;
      this.canvasTraceCtx.lineWidth = canvasConfig.stelaLineWidth;
      this.canvasTraceCtx.lineJoin = canvasConfig.stelaLineJoin;
      this.canvasTraceCtx.lineCap = canvasConfig.stelaLineCap;
      this.canvasTraceCtx.strokeStyle = canvasConfig.stelaStrokeStyle;

      this.canvasTrace.addEventListener('mousemove', (e)=> {
        this.mouse.x = e.pageX - this.canvasTrace.offsetLeft;
        this.mouse.y = e.pageY - this.canvasTrace.offsetTop;
      }, false);
    }

  }
  
</script>

<style lang="scss" scoped>
  canvas {
    position: absolute;
  }
</style>