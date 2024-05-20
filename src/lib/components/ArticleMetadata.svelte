<script lang="ts">
	import type { Article } from '$lib/scheme/article';

	export let article: Article;

	let minimized = true;
</script>

<div class="z-50 flex gap-2 px-2 py-3 w-full">
	<button
		class="max-h-[90dvh] overflow-y-auto rounded-lg bg-white bg-opacity-50 px-2 py-2 text-start shadow backdrop-blur-lg w-full"
		on:click={() => (minimized = !minimized)}
	>
		<h3>{article.title}</h3>
		<span class:line-clamp-3={minimized}>
			{#if article.summary}
				{article.summary} <br>
			{:else}
				<span class="text-gray-700 italic">
				Keine Beschreibung gefunden <br />
				</span>
			{/if}
			<span class="text-gray-700">
				Foto: {article.picture?.license}
			</span>
			<a
				class="text-blue-700 block"
				class:hidden={minimized}
				href={`https://de.wikipedia.org/wiki/${article.title}`}
			>
				Wikipedia
			</a>
		</span>
	</button>

	<slot name="right" />
</div>
