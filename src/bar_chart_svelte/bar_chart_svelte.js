import BarChart from './BarChart.svelte'
const dummy_data = [{country:'Japan', number:62}, {country:'Uruguya', number:61}, {country:'Hong Kong', number:47}, {country:'Puerto Rico', number:45}, {country:'France', number:30}, {country:'Italy', number:28}, {country:'Spain', number:28}]

const barChart = new BarChart({
    target: document.getElementById('bar_chart_svelte'),
    props:{
        data:dummy_data
    }
})