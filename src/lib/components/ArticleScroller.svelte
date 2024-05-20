<script lang="ts">
	import { page } from '$app/stores';
	import { loadArticles } from '$lib/api/article';
	import type { Article } from '$lib/scheme/article';
	import { Bookmark, Icon, Share } from 'svelte-hero-icons';
	import ArticleMetadata from './ArticleMetadata.svelte';
	import { favourites } from '$lib/constants/svocal';
	import MainBg from './MainBg.svelte';

	export let articles: Article[];

	let focusedArticleIndex = 0
</script>

<div
	class="max-h-[100dvh] snap-y snap-mandatory overflow-y-scroll"
	on:scrollend={async (e) => {
		const { scrollHeight, scrollTop, clientHeight} = e.currentTarget

		const remainingHeight = scrollHeight - scrollTop - clientHeight;
		const remainingScreens = remainingHeight / clientHeight;

		focusedArticleIndex = scrollTop / clientHeight

		if (remainingScreens > 1) return;
		articles = [...articles, ...(await loadArticles(1))];
	}}
>
	{#each articles as article, index}
		<div
			class="relative flex h-[100dvh] w-full snap-center flex-col-reverse bg-cover bg-no-repeat"
			style="
				background-size: contain;
				background-position: center center;
				background-repeat: no-repeat;
			"
			style:--img-url={`url(${article.picture?.img})`}
		>
			{#if index === focusedArticleIndex}
				<MainBg img={article.picture?.img ?? ''} />
			{/if}
			<img
				src={article.picture?.img}
				alt={article.title}
				class="absolute inset-0 h-full w-full object-contain"
			/>

			<ArticleMetadata {article}>
				<div class="flex flex-col-reverse gap-2" slot="right">
					<button
						class="rounded-lg bg-white bg-opacity-50 p-1 shadow"
						on:click={() => {
							const shareUrl = `${$page.url.toString()}/${encodeURIComponent(article.id)}`;

							if (navigator.share) {
								try {
									return navigator.share({ title: 'Wikinsta', url: shareUrl });
								} catch (e) {
									return;
								}
							} else {
								navigator.clipboard.writeText(shareUrl);
							}
						}}
					>
						<Icon class="h-6 w-6" src={Share} />
					</button>
					<button
						class="rounded-lg bg-white bg-opacity-50 p-1 shadow"
						on:click={() => {
							const isFav = $favourites.includes(article.id);

							if (isFav) favourites.update((old) => old.filter((favId) => favId !== article.id));
							else favourites.update((old) => [...old, article.id]);
						}}
					>
						<Icon class="h-6 w-6" src={Bookmark} solid={$favourites.includes(article.id)} />
					</button>
				</div>
			</ArticleMetadata>
		</div>
	{/each}
</div>
