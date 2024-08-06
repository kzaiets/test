import * as d3 from 'd3'
import LineChart from './LineChart.svelte'
import longevityData from '../scatter_plot/Life_expectancy - Sheet1.csv'
console.log(longevityData)
//unpack objects
const removeComma = (str)=>{
    return typeof(str) === 'string'? +str.replace(',', '') : str
    }

const vars = ['females', 'males']

const data = [];
longevityData.forEach((d,i)=>{
const age = d['Exact age']
for (let gender of vars){
    const life_exp = d[`Life expectancy, ${gender}`]
    const survivors = d[`Number of survivors out of 100,000, ${gender}`]
    const death_prob = d[`Death probability, ${gender}`]
    const row = {
        age,
        life_exp,
        survivors: +removeComma(survivors),
        death_prob,
        gender
    }
    data.push(row)
}
})
console.log(data)

const chartData = d3.groups(data, d => d.gender) 

console.log(chartData[0][1])
/**
 * [{gender:female, survivors:[], life_exp:value, death_prob:value}]
 * 
 * Death probability, females: 0.005046
Death probability, males: 0.006081
Exact age: 0
Life expectancy, females: 81.28
Life expectancy, males: 76.23
Number of survivors out of 100,000, females: "100,000"
Number of survivors out of 100,000, males: "100,000"*/
// console.log(longevityData[0][`Number of survivors out of 100,000, ${vars[0]}`])
// const data = []
// for (let gender of vars){
// const column = {
//     gender,
//     values: []
//     // survivors: [],
//     // life_exp: [],
//     // death_prob: [],
//     // age:[]
// }
// longevityData.forEach(d =>{
//     const row = {}
// row.age = d['Exact age']
// row.survivors = removeComma(d[`Number of survivors out of 100,000, ${gender}`])
// row.life_exp = d[`Life expectancy, ${gender}`]
// row.death_prob = d[`Death probability, ${gender}`]

// column.values.push(row)
// })
// data.push(column)
// }
// let survivors = data[0].values.map(d => d.survivors)
// console.log(survivors)
// console.log(data)
//console.log(data[0]['survivors'])
const el = document.getElementById('line_chart_svelte')
console.log(el)
const lineChart = new LineChart({
    target: el,
    props:{
        data,
       chartData
    }
})
