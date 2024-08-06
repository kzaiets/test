<script>
export let items;
export let selected;
export let margin;
</script>
<style>
#items{

}
</style>
<select bind:value={selected} id='items' transform= 'translate({margin.left},0)'>
<!-- value={selected}-->

{#each items as item}
<option value={item.value}>{item.label}</option>
{/each}
</select>