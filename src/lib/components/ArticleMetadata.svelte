<script lang="ts">
	import type { Article } from '$lib/scheme/article';

	export let article: Article;

	let minimized = true;
</script>

<div class="z-50 flex gap-2 px-2 py-3">
	<button
		class="max-h-full overflow-y-auto rounded-lg bg-white bg-opacity-50 px-2 py-2 text-start shadow backdrop-blur-lg"
		on:click={() => (minimized = !minimized)}
	>
		<h3>{article.title}</h3>
		<span class:line-clamp-3={minimized}>
			{article.summary}
		</span>
	</button>

	<slot name="right" />
</div>
