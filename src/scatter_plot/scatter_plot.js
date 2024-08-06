import * as d3 from "d3"; 
import {DataHandling} from './data_handling'

 
const createChart = (el, data) => {

//set up parameters
const width = window.innerWidth < 600 ? window.innerWidth / 1  : window.innerWidth / 1 ;
const height = width > 300 ? 350 : width / 1.2;
console.log(width, height)
//margin convention
const margin = {top: 50, right: 50, bottom: 30, left: 50};

//setup fillers, so it's easy to change x and y
const yValue = d => d.survivors;
const xValue = d => d.age;
const colorValue = d => d.gender
const titleText ='Number of survivors from 100,000 per age'
console.log(d3.extent(data, xValue))
//setting up the scale
const xScale = d3.scaleLinear()
.domain(d3.extent(data, xValue)).nice()
.range([margin.left, width - margin.right])

const yScale = d3.scaleLinear()
.domain(d3.extent(data, yValue))//.nice()
.range([height - margin.bottom, margin.top])

//setting up color scale
const colorScale = d3.scaleOrdinal()
.domain(['females', 'males'])
//or domain(data.map(colorValue))
.range(['#E6842A', '#8E6C8A'])

console.log(xScale(100))
//setting up axes
const yAxis = g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(
        d3.axisLeft(yScale)
        .tickFormat(i => i !== 0? d3.format(".2s")(i) : i))
    .call(g => {
        g.select(".domain").remove();
        g.selectAll("line").attr("stroke", "#DEDEDE");
        g.selectAll(".domain").attr("stroke", "#DEDEDE");
    })
    //optional
    .call(g => g.selectAll(".tick text")
        .style('font-size', '14px')
        .attr('fill', '#636363'))

    const xAxis = g => g
    .attr("transform", `translate(0,${margin.top})`)
    .call(
        d3.axisBottom(xScale)
        .ticks(5)
        .tickSize(height - margin.top - margin.bottom))
        .call(g => {g.select(".domain").remove()})
        
    .call(g => g.selectAll(".tick line")
        .attr("stroke-opacity", 0.5)
        .attr("stroke", "#7c7c7c")
       // .attr("stroke-dasharray", "2,2")
       )
    .call(g => g.selectAll(".tick text")
    .style('font-size', '14px')
    .attr('fill', '#636363'))

    const parentEl = d3.select(el)
    parentEl.selectAll("svg")
        .remove();
    
    const svg = parentEl
    .append("svg")
        .attr("width", width)
        .attr("height", height);
    
        svg.append('text')
        .attr('class', 'title')
        .attr('y', margin.top/2)
       .attr('x', width/2)
        .attr('text-align','center')
        .attr('text-anchor', 'middle')
        .attr('font-size', 20)
        .text(titleText)
        //.call(wrap, width)
    
    //rendering axes
    const gy = svg
    .append("g")
    .call(yAxis);
    
    const gx = svg
    .append("g")
    .call(xAxis);

//appending circles
svg.append("g")
.selectAll("circle")
.data(data)
.join("circle")
//   .filter(d => d.body_mass_g)
  .attr("cx", d => xScale(xValue(d)))
  .attr("cy", d => yScale(yValue(d)))
  .attr("r", 4)
  .attr('fill', d => colorScale(colorValue(d)))
console.log(colorScale.domain())
svg.append('g')
.selectAll('text')
.data(colorScale.domain())
.join('text')
.attr('x', xScale(38))
.attr('y', (d,i) => yScale(100000 - i*12000))
.text(d => d)
.attr('fill', "#636363")
}
const renderChart = () => {
    const data_ = DataHandling()
    console.log(data_)
    
    
     const cleaned_data = []
     data_.forEach(d => {
         const age = d.age
         for (const [key, value] of Object.entries(d.survivors)) {
         const survivors = value;
         const row = {
             age,
             survivors,
             gender: key
         }
         cleaned_data.push(row)
    }
     })
     console.log(cleaned_data)

     const el = document.getElementById('scatter_plot')
     createChart(el, cleaned_data)
}
renderChart()