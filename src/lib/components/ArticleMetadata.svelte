<script lang="ts">
	import type { Article } from '$lib/scheme/article';

	export let article: Article;
</script>

<div class="z-50 flex gap-2 px-2 py-3">
	<div class="rounded-lg bg-white bg-opacity-50 px-2 py-2 shadow">
		<h3>{article.title}</h3>
		<span class="line-clamp-3">{article.summary}</span>
	</div>

	<slot name="right" />
</div>
