<script>

import * as d3 from 'd3';
import Axis from './Axis.svelte';
export let data;
let width = window.innerWidth;
let height = 0;
//margin convention
const margin = {top: 50, right: 30, bottom: 30, left: 100};

//setup fillers, so it's easy to change x and y
const yValue = d => d.country;
const xValue = d => d.number;
//console.log(height)
$: chartHeight = width > 600? height/1.5: height/2
//$:chartWidth = width 

$: yScale = d3.scaleBand()
.domain(d3.map(data, yValue))
.range([margin.top, chartHeight - margin.bottom])
.paddingInner(0.15);

$: xScale = d3.scaleLinear()
.domain([0, d3.max(data, xValue)]).nice()
.range([margin.left, width - margin.right])
//console.log(xScale.domain())

/**
 * https://outbreak.info/situation-reports/epsilon?loc=USA&loc=USA_US-CA&selected=USA_US-CA
/situation-reports/pango=B.1.427&pango=B.1.429
BA.1 AND S:E484K
Omicron AND S:E484K
BA.1 AND S:E484k OR  BA.2 AND S:E84K OR...
*/
</script>

<style>
.wrapper {
    width: 100%;
    height:100%;
}
</style>

<div class="wrapper" bind:clientWidth={width} bind:clientHeight={height}>
    <svg width={width} height={chartHeight}>
        <Axis {width} height={chartHeight} margin={margin.bottom} scale={xScale} position='bottom' />
        <Axis {width} height={chartHeight} margin = {margin.left} scale={yScale} position='left' />
        {#each data as {country, number}}
        
        <rect
        x={xScale(0)}
        y={yScale(country)}
        height={yScale.bandwidth()}
        width={xScale(number) - xScale(0)}
        fill="steelblue"
        />
        {/each}
    </svg>
    
    </div>
   



