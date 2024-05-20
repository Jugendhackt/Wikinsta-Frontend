<script lang="ts">
	import type { PageData } from './$types';
	import ArticleScroller from '$lib/components/ArticleScroller.svelte';

	export let data: PageData;

	let articles = data.data;
</script>

<ArticleScroller {articles} />
