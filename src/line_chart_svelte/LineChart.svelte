<script>
import * as d3 from 'd3';
import Axis from './Axis.svelte';
import Dropdown from './Dropdown.svelte'
import ColorLegend from './ColorLegend.svelte'
export let data;
export let chartData;


let width = window.innerWidth;
let height = 0;

//margin convention
const margin = {top: 50, right: 100, bottom: 30, left: 50};

//dynamic chart width and height
$: chartHeight = width > 600? height/1.5: height/2
$: chartWidth = width - margin.left - margin.right

const items = [
    {value:'survivors', label:'Number of survivors out of 100k'},
    {value:'life_exp', label:'Life expectancy in years'},
    {value:'death_prob', label:'Death probability'}]

//allows to axes formatting via selected value for axes
const formats = 
    {survivors:i => i !== 0? d3.format(".2s")(i) : i,
    life_exp:i => i,
    death_prob:i => d3.format(".0%")(i)}


//setup fillers, so it's easy to change x and y
//let yValue = 'survivors';
let xValue = 'age';
const colorValue = 'gender';

//setting up initial value on dropdown menue
let selected = items[0].value

//setting up scales
$: xScale = d3.scaleLinear()
.domain(d3.extent(data, d => d[xValue])).nice()
.range([margin.left, width - margin.right])


$: yScale = d3.scaleLinear()
.domain(d3.extent(data, d => d[selected])).nice()
.range([chartHeight - margin.bottom, margin.top])

const colorScale = d3.scaleOrdinal()
.domain(data.map(d => d[colorValue]))
.range(['#E6842A', '#8E6C8A'])

//setting up init value, so the lines and legend are fully visible
let genderCheck = ''

const handleHover = (e) => {
    console.log(e.detail)
    genderCheck=e.detail
}

const handleMouseLeave = () =>{
    genderCheck = ''
}
// opacity = {genderCheck && genderCheck !== color? 0.2 : 1} 
</script>
<style>
    .wrapper {
        width: 100%;
        height:100%;
    }
    </style>
    

<Dropdown bind:selected={selected} {items} {margin}/>
<div class="wrapper" bind:clientWidth={width} bind:clientHeight={height}>

    <svg id="svg" width={width} height={chartHeight}>
        <Axis {width} height={chartHeight} margin={margin.bottom} scale={xScale} position='bottom'/>
        <Axis width={chartWidth} height={chartHeight} margin={margin.left} scale={yScale} position='left' formatting={formats[selected]}/>
        {#each chartData as d}
        <path 
        on:mouseenter="{()=> genderCheck = d[0]}"
        on:mouseleave={handleMouseLeave}
        fill="none"
        stroke={colorScale(d[0])}
        stroke-width={5}
        stroke-linecap='round'
        opacity = {genderCheck && genderCheck !== d[0]? 0.2 : 1} 
        d={d3.line()
            .curve(d3.curveMonotoneX)
               .x(d => xScale(d[xValue]))
               .y(d => yScale(d[selected]))
               (d[1])}/>
       {/each}
       <ColorLegend on:hovered={handleHover} 
        on:mouseleave={handleMouseLeave}
       {colorScale} innerWidth={chartWidth + margin.left} innerHeight={chartHeight/2} {margin} {genderCheck}/>
    </svg>
</div>
