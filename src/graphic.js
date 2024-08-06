//import { format } from 'path/posix';

import { selectAll } from 'd3';

const d3 = require('d3');
//const axios = require('axios');
export let trying = () => {
    console.log('working')
}
const formatFunc = number => d3.format(".3s")(number)
console.log(formatFunc(2000000))
console.log(d3.format(".3s"))

function logginge() {
    console.log('e')
    return function loggingf(str) {
        console.log(str)
    }
}
console.log(logginge()('f'))
const margin = { left: 20, top: 20, right: 20, bottom: 20 }
let data_array = [1, 2, 3, 4, 5]




// console.log(width.split('p'))
// svg
// .selectAll('circle')
// .data(data_array)
// .enter()
// .append('circle')
// .attr('fill', 'black')
// .attr('r',10)
// .attr('cx', d => xScale(d))
// .attr('cy', 10)
//
//Practice updating


const render = () => {
    const width = window.innerWidth
    const height = width / 2
    console.log(width)
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    d3.selectAll('svg').remove()
    const svg = d3.select('body').append('svg').style('width', width).style('height', height)
    console.log(data_array)
    const xScale = d3.scaleLinear()
        .domain([0, d3.max(data_array, d => d)])
        .range([margin.left, width - margin.right])
    const yScale = d3.scaleBand()
        .domain(data_array)
        .range([innerHeight - margin.bottom, margin.top])
        .padding(0.5)
    const t = svg.transition()
        .duration(750);

    let group = svg.selectAll('g')
        //Practice constancy
        .data(data_array, d => d)
        // .enter()
        // let groupSelection = group
        .join(
            //'rect'
            enter => enter.append('g')

            .append('rect')
            .attr('y', d => yScale(d))
            .attr('fill', 'black')
            .attr('width', d => xScale(d))
            .attr('height', yScale.bandwidth)
            .on('click', () => console.log('hey you')),
            update =>
            update

            .call(update => update.transition()
                .select('rect')
                .attr('y', d => yScale(d))
                .attr('height', yScale.bandwidth))

            ,
            exit =>
            // console.log(exit)
            exit
            .call(exit => exit.transition()
                // .duration(2700)
                //.attr('fill', 'red')
                .select('rect')
                .attr("width", 0)
                //  .select('g')
                // .remove()
            )
            .call(exit => exit.transition()
                .remove()
            )
            // .remove()

        )
        //console.log(groupSelection)
        // groupSelection
        // .join(
        //   //'rect'
        //   enter => enter.select('rect')
        //   .attr('fill', 'black')
        // .attr('width', d =>  xScale(d))
        // .attr('height', yScale.bandwidth)
        // .attr('y', d => yScale(d)),
        //   update => 
        //     update
        //   .call(update => update.transition()
        //   .attr('y', d => yScale(d))
        //   .attr('height', yScale.bandwidth))
        //   ,
        //   exit => 
        //    // console.log(exit)
        //     exit
        //   .call(exit => exit.transition()
        //             //.attr('fill', 'red')
        //             .attr("width", 0)

    //            .remove()
    //            )

    // )


}
render()
setTimeout(() => {
    data_array.splice(0, 1)
    console.log(data_array)
    console.log('popped');
    render()
}, 2000)



//Nested elements

//destructuring

const aria = { first_name: "Aria", house: "Stark", talent: "fighting" }
const { first_name } = aria
console.log(first_name)
const hero_tale = ({ first_name, house }) => {
    console.log(`This is ${first_name} from house ${house}`)
}
hero_tale(aria)

//responsiveness
//RENDER CHART ON RESIZE
window.addEventListener('resize', render)
    // function smartResizeListener(cb) {
    //   let resizeTimer;
    //   window.addEventListener("resize", () => {
    //     clearTimeout(resizeTimer);
    //     resizeTimer = window.setTimeout(cb, 250);
    //   });
    // }
    // smartResizeListener(() => {
    //   render()
    //   console.log(window.innerWidth, 'hhhh')
    // })


//transform regular json to nested

//use stratify

//tree visualization

//Graphics to do: 
//vertical & horizontal bar charts 
//scatterplot 
//line chart 
//area chart 
//area+line
//bar+trend line 
//tree 
//treemap
//us map
//circles map
//heatmap 
//world map
//circlesin rectangles