<script>
import { createEventDispatcher } from 'svelte';
export let colorScale;
export let innerWidth;
export let innerHeight
export let margin;
export let genderCheck;

const dispatch = createEventDispatcher();
const mouseLeave = ()=>{
    dispatch('mouseleave')
}
</script>
<style>
#colorLegend{
    cursor:pointer;
}
</style>

{#each colorScale.domain() as color, i}
<g on:mouseenter={() => dispatch('hovered', color)}
   on:mouseleave={mouseLeave} 
    id="colorLegend" 
    transform='translate({innerWidth + margin.right/6}, {innerHeight + i*15})'
    opacity = {genderCheck && genderCheck !== color? 0.2 : 1}>
<circle fill={colorScale(color)} r={5}/>
<text x={20} dy=".32em">{color}</text>
</g>
{/each}
