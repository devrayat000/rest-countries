<script lang="ts">
	type T = $$Generic;
	export let label: string, value: T;
</script>

{#if !!value}
	<p class="my-0">
		<span class="font-extrabold">{label}:</span>
		{value}
	</p>
{/if}
