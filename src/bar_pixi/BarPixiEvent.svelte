<script>
      import { onMount, onDestroy } from "svelte";
  import * as PIXI from 'pixi.js'
  import * as d3 from 'd3';
  import { SmoothGraphics } from "@pixi/graphics-smooth";
  import { createPopper } from '@popperjs/core';
  console.log(PIXI)
  let pixiApp;
  let el;
  //let graphic;
   let chartWidth = 700
  let chartHeight = 600;
  function generateGetBoundingClientRect(x = 0, y = 0) {
  return () => ({
    width: 0,
    height: 0,
    top: y,
    right: x,
    bottom: y,
    left: x,
  });
}

const virtualElement = {
  getBoundingClientRect: generateGetBoundingClientRect(),
};
//const tooltip = document.getElementById('tooltip')
let tooltip
console.log(tooltip)
//const instance = createPopper(virtualElement, tooltip);
  function renderPixiChart(){
    const series = [
          { label: 'Item 1', type: 'column', data: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15], style: { fillColor: 'dodgerblue' } },
          { label: 'Item 2', type: 'column', data: [2, 3, 4, 5, 6, 7, 8, 9, 9, 7, 6, 5], style: { fillColor: 'orangered' } },
          { label: 'Item 3', type: 'column', data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 9, 8], style: { fillColor: 'orange' } },
        ];
      
           // Draw the chart:
          //console.log(pixiApp.stage)
         // console.log(circle)
        //  var circle = new PIXI.Container()
          //var circle_ = new PIXI.Circle(0,0,0)
         // circle.stage.addChild(circle_)
          
           var line = new SmoothGraphics()
           line.beginFill('0xff0000')
           line.drawRect(0,0,100,40)
            line.endFill()
            line.alpha = 0
          
           //line.apha = 0
         pixiApp.stage.addChild(line)
        
           var circle = new SmoothGraphics()
           circle.beginFill('0x000000')
           circle.lineStyle(2, 0x000000, 1.0).drawCircle(0,0,2)
        circle.endFill()
        circle.alpha = 0
        pixiApp.stage.addChild(circle)
         // line.addChild(circle)
           series[0].data.forEach((d,i)=>{
            let graphic = new SmoothGraphics();
          // pixiApp.stage.interactive = true;
           graphic.beginFill('0x7A5200')
          // graphic.lineStyle(2, 0xff0000, 1)
           var bar = graphic.lineStyle(0.5, 0xff0000, 2.0).drawRect(30*i,40,40,40)
           graphic.endFill()
           bar.interactive = true
           bar.on('pointerover', (event) => {
            const ttip = d3.selectAll(".tooltip")
        .style("top", event.data.global.y + "px")
        .style("left", event.data.global.x + "px")
        .style("opacity", 1);
//             virtualElement.getBoundingClientRect = generateGetBoundingClientRect(event.data.global.x, event.data.global.y);
//   instance.update();
              // console.log(tooltip)
            //tooltip.setAttribute('data-show', '');
            console.log(event)
            console.log(event.data.global.x)
           
               console.log(d)
               
             
               line.alpha = 1
               line.position.set(30*i,240)
               
               line.height = 40

               circle.alpha = 1
               circle.position.set(35*i,250)
               
               //circle.height = 40
              
               console.log(line)
            //    line.lineStyle(2, 0xff0000, 1)
            //   line.moveTo(300, 300)
            //   line.lineTo(150, 150)
             // line.drawCircle(150,150,2)
            //  circle_.x = 150
            //  circle_.y = 150
            //  circle_.radius = 2
             // line.endFill()
              
              


  

           
        })
        bar.on('pointerout', (event) => {
            d3.selectAll(".tooltip")
            .style("opacity", 0);
            //line.destroy()
            line.alpha = 0
            circle.alpha = 0
            console.log(line)
            let num =  pixiApp.stage.children.length - 1
           // pixiApp.stage.removeChildAt(num)
        })
           pixiApp.stage.addChild(graphic)
           })
          
  }
  function setupChart(){
    pixiApp = new PIXI.Application({
			backgroundAlpha: 0,
			width: chartWidth,
			height: chartHeight,
		});
  console.log('hey')
  console.log(pixiApp)
  //el = d3.select('#chart')
  el.appendChild(pixiApp.view)
  renderPixiChart()
  }
  onMount(() => {
    setupChart();
  });
  //class='tooltip'
</script>
<style>
    #tooltip {
  display: none;
  background: #ffffff;
  color: #643045;
  font-weight: bold;
  padding: 5px 10px;
  font-size: 13px;
  border-radius: 4px;
}
#tooltip[data-show] {
  display: block;
}
.tooltip {
    position: fixed;
    z-index: 1000;
    background: #ffffffcf;
    opacity: 0;
    pointer-events: none;
}
.canvas-wrap{
    margin-left:10px
}
</style>
<div class="canvas-wrap" id='chart' bind:this={el}>
    <div class='tooltip'  role="tooltip" >
<div>Hey</div>
    </div>
</div>