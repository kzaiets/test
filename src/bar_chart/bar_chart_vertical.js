import * as d3 from "d3"; 

const dummy_data = [{country:'Japan', number:62}, {country:'Uruguya', number:61}, {country:'Hong Kong', number:47}, {country:'Puerto Rico', number:45}, {country:'France', number:30}, {country:'Italy', number:28}, {country:'Spain', number:28}]

const createChart = (el,data) =>{
//set up parameters
const width = window.innerWidth < 600 ? window.innerWidth / 1  : window.innerWidth / 1.5 ;
const height = width > 300 ? 450 : width / 1.2;
//margin convention
const margin = {top: 50, right: 30, bottom: 50, left: 100};

//setup fillers, so it's easy to change x and y
const yValue = d => d.number;
const xValue = d => d.country;
const titleText ='Number of centenarians per 1,000 people'

//function for wrapping x tick text 
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
const xScale = d3.scaleBand()
.domain(d3.range(data.length))
.range([margin.left, width - margin.right])
.paddingInner(0.15);

//setting up the value scale
const yScale = d3.scaleLinear()
.domain([0, d3.max(data, yValue)])//.nice()
.range([height - margin.bottom, margin.top])
//setting up axes
const xAxis = g => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(
        d3.axisBottom(xScale)
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

    const yAxis = g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(
        d3.axisLeft(yScale)
        .ticks(5)
 //     .tickFormat((i) => data[i].IncomeName + " countries")       
        )
    .call(g => {
        g.select(".domain").remove();
        g.selectAll("line").attr("stroke", "#DEDEDE");
        g.selectAll(".domain").attr("stroke", "#DEDEDE");
    })
    .call(g => g.selectAll(".tick text")
    .style('font-size', '14px'))

//setting up svg
const parentEl = d3.select(el)

const svg = parentEl
.append("svg")
    .attr("width", width)
    .attr("height", height);

    svg.append('text')
    .attr('class', 'title')
    .attr('y', margin.top/2)
    .attr('x', width/2)
    .attr('text-anchor', 'middle')
    .attr('font-size', 20)
    .call(wrap, width)
    .text(titleText);

//rendering rects
    svg.append("g")
    .selectAll("rect")
    .data(data)
    .join("rect")
    .attr('x', (d, i) => xScale(i))
    .attr("y", d => yScale(yValue(d)))
    .attr('width', xScale.bandwidth())
    .attr('height', d => yScale(0) - yScale(yValue(d)))
    .attr('fill', 'steelblue')

//rendering axes
    const gy = svg
      .append("g")
      .call(yAxis);

    const gx = svg
      .append("g")
      .call(xAxis)
      //optional wrapping tick text
      .selectAll(".tick text")
      .call(wrap, xScale.bandwidth())

}
const renderChart = ()=>{
    const data =  dummy_data
    console.log(data)
    const element = document.getElementById('bar_chart_vertical')
    createChart(element, data)
    }
    renderChart()