<template>
    <canvas id="river_trace" @mousedown="startTrace" style="z-index: 100;"></canvas>
</template>

<script>
  export default {
    data() {
      return{
        canvasTrace: '',
        canvasTraceCtx: '',
        mouse: {x: 0, y: 0}
      }
    },
    computed: {
      glyphData() {
        return this.$store.state.currentGlyphData;
      }
    },
    methods:{
      glyphArea() {
        let opaquePixels = 0;
        for(let i = 0, dataLength = this.glyphData.length; i < dataLength; i+=4) {
          if (this.glyphData[i] > 0) {
            opaquePixels++;
          }
        }
        return opaquePixels;
      },
      checkBoundaries(userPathData) {
        //Check if user path exited glyph
        let opaquePixels = 0;
        for(let i = 0, il = userPathData.length; i < il; i+=4) {
          if (userPathData[i] > 0) {
            if (this.glyphData[i] > 0) {
             opaquePixels++;
            } else {
              alert('Failed: Path outside glyph');
              break;
            }
          }
        }
        this.checkFill(opaquePixels);
      },
      checkFill(userPath) {
        let glyphRatioArea = this.glyphArea()/85;

        if(userPath < glyphRatioArea || userPath > (2 * glyphRatioArea) ) {
          alert('Failed: Path Incomplete')
        } else {
          alert('Passed: Path complete and inside glyph')
        }
      },
      clearCanvas() {
        this.canvasTraceCtx.clearRect(0, 0, this.canvasTrace.width, this.canvasTrace.height);
      },
      stopTrace() {
        this.canvasTrace.removeEventListener('mousemove', this.draw, false);
        let userPathData = this.canvasTraceCtx.getImageData(0, 0, this.canvasTrace.width, this.canvasTrace.height).data;
        /*let glyphImageData = (this.canvasDrawGlyphCtx.getImageData(0, 0, this.canvasTrace.width, this.canvasTrace.height).data);*/
        this.clearCanvas();
        this.checkBoundaries(userPathData);
      },
      startTrace() {
        this.canvasTraceCtx.beginPath();
        this.canvasTraceCtx.moveTo(this.mouse.x, this.mouse.y);
        this.canvasTrace.addEventListener('mousemove', this.draw, false);
        this.canvasTrace.addEventListener('mouseup', this.stopTrace, false);
      },
      draw() {
        this.canvasTraceCtx.lineTo(this.mouse.x, this.mouse.y);
        this.canvasTraceCtx.stroke();
      },
    },
    mounted: function() {
      this.canvasTrace = document.getElementById('river_trace');
      this.canvasTraceCtx = this.canvasTrace.getContext('2d');
      this.canvasTrace.width = 1799;
      this.canvasTrace.height = 604;
      this.canvasTraceCtx.lineWidth = 1;
      this.canvasTraceCtx.lineJoin = 'round';
      this.canvasTraceCtx.lineCap = 'round';
      this.canvasTraceCtx.strokeStyle = 'rgba(255, 200, 100, 1)';



      this.canvasTrace.addEventListener('mousemove', (e)=> {
        this.mouse.x = e.pageX - this.canvasTrace.offsetLeft;
        this.mouse.y = e.pageY - this.canvasTrace.offsetTop;
      }, false);
    }

  }
  
</script>

<style lang="scss" scoped>
  
</style>