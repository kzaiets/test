<script>
	import { select, selectAll } from 'd3-selection';
	import { axisBottom, axisLeft } from 'd3-axis';
	export let width;
	export let height;
	export let margin;
	export let position;
	export let scale;
	let transform;
	let g;
	$: {
		select(g).selectAll('*').remove();
		let axis;
		switch(position) {
			case 'bottom':
				axis = axisBottom(scale).tickSizeOuter(0).ticks(5);
				transform = `translate(0, ${height - margin})`;
				break;
			case 'left':
				axis = axisLeft(scale).tickSizeOuter(0);
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