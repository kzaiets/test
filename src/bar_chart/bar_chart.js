import * as d3 from "d3"; 
import {dataHandling} from './data_handling'
const dummy_data = [{country:'Japan', number:62}, {country:'Uruguya', number:61}, {country:'Hong Kong', number:47}, {country:'Puerto Rico', number:45}, {country:'France', number:30}, {country:'Italy', number:28}, {country:'Spain', number:28}]
//
const createChart = (el, data)=>{
//set up parameters
const width = window.innerWidth < 600 ? window.innerWidth / 1  : window.innerWidth / 1.5 ;
const height = width > 300 ? 350 : width / 1.2;
//margin convention
const margin = {top: 50, right: 30, bottom: 30, left: 100};

//setup fillers, so it's easy to change x and y
const yValue = d => d.country;
const xValue = d => d.number;
const titleText ='Number of centenarians per 1,000 people'

const wrap = (text, width) => {
    text.each(function() {
      var text = d3.select(this),
          words = text.text().split(/\s+/).reverse(),
          word,
          line = [],
          lineNumber = 0,
          lineHeight = 1.1, // ems
          y = text.attr("y"),
          dy = parseFloat(text.attr("dy")),
          tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em")
      while (word = words.pop()) {
        line.push(word)
        tspan.text(line.join(" "))
        if (tspan.node().getComputedTextLength() > width) {
          line.pop()
          tspan.text(line.join(" "))
          line = [word]
          tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", `${++lineNumber * lineHeight + dy}em`).text(word)
        }
      }
    })
  }
//setting up scale from where the bars stem
const yScale = d3.scaleBand()
.domain(d3.range(data.length))
.range([margin.top, height - margin.bottom])
.paddingInner(0.15);

//setting up the value scale
const xScale = d3.scaleLinear()
.domain([0, d3.max(data, xValue)]).nice()
.range([margin.left, width - margin.right])

//setting up axes
const yAxis = g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(
        d3.axisLeft(yScale)
        .tickFormat(i => data[i].country)   
        )
    .call(g => {
        g.select(".domain").remove();
        g.selectAll("line").attr("stroke", "#DEDEDE");
        g.selectAll(".domain").attr("stroke", "#DEDEDE");
    })
    //optional
    .call(g => g.selectAll(".tick text")
        .style('font-size', '14px'))

    const xAxis = g => g
    .attr("transform", `translate(0,${margin.top})`)
    .call(
        d3.axisBottom(xScale)
        .ticks(5)
        .tickSize(height - margin.top - margin.bottom)
 //     .tickFormat((i) => data[i].IncomeName + " countries")       
        )
    // .call(g => {
    //     g.select(".domain").remove();
    //     g.selectAll("line").attr("stroke", "#DEDEDE");
    //     g.selectAll(".domain").attr("stroke", "#DEDEDE");
    // })
    .call(g => g.select(".domain")
        .remove())
    .call(g => g.selectAll(".tick:not(:first-of-type) line")
        .attr("stroke-opacity", 0.5)
        .attr("stroke", "#7c7c7c")
       // .attr("stroke-dasharray", "2,2")
       )
    .call(g => g.selectAll(".tick text")
    .style('font-size', '14px'))

//setting up svg
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
//rendering rects
    svg.append("g")
    .selectAll("rect")
    .data(data)
    .join("rect")
    .attr('x', xScale(0))
    .attr("y", (d, i) => yScale(i))
    .attr('height', yScale.bandwidth())
    .attr('width', d => xScale(xValue(d)) - xScale(0))
    .attr('fill', 'steelblue')

      
 //rendering number on a bar  
      svg.append("g")
      .attr("fill", "white")
      .attr("text-anchor", "end")
      .attr("font-family", "sans-serif")
      .attr("font-size", 12)
    .selectAll("text")
    .data(data)
    .join("text")
      .attr("x", d => xScale(xValue(d)))
      .attr("y", (d, i) => yScale(i) + yScale.bandwidth() / 2)
      .attr("dy", "0.35em")
      .attr("dx", -4)
      .text(d => xValue(d))
    .call(text => text.filter(d => xScale(xValue(d)) - xScale(0) < 20) // short bars
      .attr("dx", +4)
      .attr("fill", "black")
      .attr("text-anchor", "start"));
      
}




const renderChart = ()=>{
const data =  dummy_data
console.log(data)
const element = document.getElementById('bar_chart')
createChart(element, data)
window.addEventListener("resize", () => {
    createChart(element, data)
    });
}
renderChart()
