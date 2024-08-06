<script>
    import { onMount, onDestroy } from "svelte";
  import * as PIXI from 'pixi.js'
  import * as d3 from 'd3';
  import { SmoothGraphics } from "@pixi/graphics-smooth";
  console.log(PIXI)
  let pixiApp;
  let el;
  
  //let svg
 // let graphic;
   let chartWidth = 654
  let chartHeight = 340.5;
  export let data;
  let thisVar = d => d['confirmed_numIncrease']
  let xValue = d => d.date


  const margin = {top: 30, right: 30, bottom: 30, left: 30};
  const  yScale = d3.scaleLinear()
.domain([0, d3.max(data, thisVar)])
.range([chartHeight , 0])
//.paddingInner(0.15);
let max = d3.max(data, thisVar)
console.log(d3.max(data, thisVar))
let range = d3.extent(data, d => new Date(d.date));
//console.log(range)
const xScale = d3.scaleBand()
.range([0, chartWidth])
//new Date(2015, 0, 2), new Date(2015, 0, 8), 2
.domain(d3.timeDay.range(range[0], d3.timeDay.offset(range[1], 1)))//.nice()
//range[0], d3.timeDay.offset(range[1], 1)
console.log(xScale(new Date('2020-01-21T22:00:00.000Z')))
console.log('dd')
const  roll_line = d3.line()
        .x(d => xScale(new Date(d.date)))
        .y(d => yScale(d['confirmed_rolling']));
//console.log(d3.timeDay.range(range[0], d3.timeDay.offset(range[1], 1)))
  function renderPixiChart (){
    const series = [
          { label: 'Item 1', type: 'column', data: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15], style: { fillColor: 'dodgerblue' } },
          { label: 'Item 2', type: 'column', data: [2, 3, 4, 5, 6, 7, 8, 9, 9, 7, 6, 5], style: { fillColor: 'orangered' } },
          { label: 'Item 3', type: 'column', data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 9, 8], style: { fillColor: 'orange' } },
        ];
       
       
      
           // Draw the chart:
//            graphic = new PIXI.Graphics()
//           // graphic.lineStyle(0.5, 0xff00ff, 1, 1)
//           graphic.beginFill('0xffffff')
//           let line =   graphic.lineStyle({ width: 1,
//         color: 0x000000,
//         alignment: 0.5,
//         alpha: 1
//        ,native:true
// })
// console.log(line)
//           let square =  graphic.drawRect(20, 20, 80, 80)
//           console.log(square)
//            // graphic.endFill();
// 		//graphic.alpha = 0;
//             //d.graphic = graphic
//             pixiApp.stage.addChild(graphic)
//            // var stage = new PIXI.Stage(0xFFFFFF);
// pixiApp.stage.interactive = true;
  var line = new SmoothGraphics()
           line.beginFill('0x000000')
           line.drawRect(0,0,xScale.bandwidth()*2,40)
            line.endFill()
            line.alpha = 0
            pixiApp.stage.addChild(line)

            var circle = new SmoothGraphics()
           circle.beginFill('0x000000',1)
           circle.lineStyle(2, 0x000000, 1.0).drawCircle(0,0,xScale.bandwidth()*4)
        circle.endFill()
        circle.alpha = 0
        pixiApp.stage.addChild(circle)
      
// var roll_av_line = new SmoothGraphics()
// line.beginFill('0x000000')


        data.forEach((d,i) => {
           // if(d.thisVar % 2 ==0){
              //  console.log(d.thisVar)
              let graphic = new PIXI.Graphics();
              if(d.confirmed_numIncrease > d.confirmed_rolling){
               graphic.hitArea = new PIXI.Rectangle(xScale(new Date(d.date)), yScale(d.confirmed_numIncrease)-220, xScale.bandwidth(), (yScale(0)- (yScale(d.confirmed_numIncrease)-220)))
              } else{
                graphic.hitArea = new PIXI.Rectangle(xScale(new Date(d.date)), yScale(d.confirmed_rolling)-220, xScale.bandwidth(), (yScale(0)- (yScale(d.confirmed_rolling)-220)))
              }
             // graphic.hitArea = new PIXI.Rectangle(xScale(new Date(d.date)), yScale(d.confirmed_numIncrease), xScale.bandwidth(), (yScale(0)- yScale(d.confirmed_numIncrease)))
          // pixiApp.stage.interactive = true;
           graphic.beginFill('0x507ea3', 0.55)
           console.log('hey')
           var bar = graphic.lineStyle(0.9, 0x507ea3, 0, 0.5).drawRect(xScale(new Date(d.date)), yScale(d.confirmed_numIncrease), xScale.bandwidth(), yScale(0)- yScale(d.confirmed_numIncrease))
           //graphic.scale.x = 0.8
          // console.log(xScale(new Date(d.date)), yScale(d.confirmed_numIncrease), xScale.bandwidth(), yScale(0)- yScale(d.confirmed_numIncrease))
           graphic.endFill();
           bar.interactive = true
           bar.on('pointerover', (event) => {
               console.log(d)
               const ttip = d3.selectAll(".tooltip")
        .style("top", yScale(d.confirmed_rolling) + "px")
        .style("left", (event.data.global.x + xScale.bandwidth()*8) + "px")
        .style("opacity", 1);

        ttip.select(".country-name").text(d.name);
     ttip.select(".date").text(d3.timeFormat("%d %b %Y")(new Date(d.date)));
      ttip
        .select(".count")
        .text(`${d3.format(",.1f")(d.confirmed_numIncrease)}`);
//https://andersen-lab.com/secrets/code/
                line.alpha = 1
               line.position.set(xScale(new Date(d.date)), yScale(d.confirmed_rolling))
               line.height = yScale(0)- yScale(d.confirmed_rolling)

               circle.alpha = 1
               var circ_x = xScale(new Date(d.date)) + xScale.bandwidth()/2
              // console.log(circ_x)
               circle.position.set(circ_x, yScale(d.confirmed_rolling))
               
              
            })
            bar.on('pointerout', (event) => {
            d3.selectAll(".tooltip")
            .style("opacity", 0);
            //line.destroy()
            line.alpha = 0
            circle.alpha = 0
           // console.log(line)
           // let num =  pixiApp.stage.children.length - 1
           // pixiApp.stage.removeChildAt(num)
        })
           
           pixiApp.stage.addChild(graphic)
         
           //  var bar =  graphic.drawRect(xScale(new Date(d.date)), yScale(d.confirmed_numIncrease), xScale.bandwidth(), yScale(0)- yScale(d.confirmed_numIncrease))
            // var bar =  new PIXI.Rectangle(xScale(new Date(d.date)), yScale(d.confirmed_numIncrease), xScale.bandwidth(), yScale(0)- yScale(d.confirmed_numIncrease))
            // bar.drawRect(xScale(new Date(d.date)), yScale(d.confirmed_numIncrease), xScale.bandwidth(), yScale(0)- yScale(d.confirmed_numIncrease))
        //   bar.buttonMode = true;
        //    bar.interactive = true;
       // graphic.beginFill('0x7A5200')

         // bar.mouseover = function(event) {console.log(event)} 
          // bar.on('pointerover', (event) => console.log(event))
//             graphic.lineStyle({ width: 1,
//         color: 0x000000,
//         alignment: 0.5,
//         alpha: 0.5
//        // ,native:true
// })
            
		//graphic.alpha = 0;
            //d.graphic = graphic
           
            //}
         //  graphic.addChild(bar);
        })
       
       // pixiApp.stage.addChild(graphic)
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
  //pixiApp.renderer.resolution = window.devicePixelRatio
  //console.log(pixiApp.stage.scale.x = 0.8)
  //pixiApp.stage.scale.y = 0.8
  renderPixiChart()
  }
  onMount(() => {
    setupChart();
    console.log(el)
  });
  //bind:this={el}
    </script>
<style>
    .tooltip {
    position: fixed;
    z-index: 1000;
    background: #ffffffcf;
    opacity: 0;
    pointer-events: none;
}
.floating{
position:absolute;
}
</style>
<div class="canvas-wrap floating" id='chart' bind:this={el}>
    <div class='tooltip'  role="tooltip" >
        <h6 class="country-name m-0"></h6>
        <p class="date m-0"></p>
        <p class="count m-0"></p>
        <b class="count-avg m-0"></b>
    
    </div>
</div>
<svg class='floating' id='svg' width={chartWidth} height={chartHeight} pointer-events="none">
<path
fill="none"
stroke="black"
stroke-width={2.5}
d={roll_line(data)}
/>
</svg>