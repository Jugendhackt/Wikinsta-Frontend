<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="wrapper">
	{#if data.data[0].picture}
		{@const article = data.data[0]}

		<img src={data.data[0].picture.img} alt={article.title} />
	{/if}
</div>

<style>
	.wrapper {
		position: relative;
		min-height: 100dvh;

		background: #ff00ff;
	}

	img {
		position: absolute;

		inset: 0;
		min-width: 100%;
		min-height: 100%;
		object-fit: cover;
	}
</style>
