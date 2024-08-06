<script>
	import { select, format, selectAll } from 'd3';
	import { axisBottom, axisLeft } from 'd3-axis';
	import { fade } from 'svelte/transition';
	export let width;
	export let height;
	export let margin;
	export let position;
	export let scale;
	export let formatting;
	let transform;
	let g;
	console.log(width - margin.left - margin.right)
	$: {
		select(g).selectAll('*').remove();
		let axis;
		switch(position) {
			case 'bottom':
				axis = axisBottom(scale).tickSizeOuter(0).ticks(5);
				transform = `translate(0, ${height - margin})`;
				break;
			case 'left':
				axis = axisLeft(scale)//.tickSizeOuter(0)
				.tickFormat(formatting)
				.tickSize(-width);
				transform = `translate(${margin}, 0)`;
                
		}
        select(g).call(axis).call(g => {
        g.select(".domain").remove();
        g.selectAll("line").attr("stroke", "#DEDEDE");
        g.selectAll(".domain").attr("stroke", "#DEDEDE");
    })
    .call(g => g.selectAll(".tick text")
    .style('font-size', '14px'))
		
	}
</script>

<g class='axis' bind:this={g} {transform} />