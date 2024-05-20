<script lang="ts">
	import { page } from '$app/stores';
	import { loadArticles } from '$lib/api/article';
	import type { Article } from '$lib/scheme/article';
	import { Bookmark, Icon, Share } from 'svelte-hero-icons';
	import ArticleMetadata from './ArticleMetadata.svelte';
	import { favourites } from '$lib/constants/svocal';

	export let articles: Article[];
</script>

<div
	class="max-h-[100dvh] snap-y snap-mandatory overflow-y-scroll"
	on:scrollend={async (e) => {
		const element = e.currentTarget;

		const remainingHeight = element.scrollHeight - element.scrollTop - element.clientHeight;
		const remainingScreens = remainingHeight / element.clientHeight;
		if (remainingScreens > 1) return;
		articles = [...articles, ...(await loadArticles(1))];
	}}
>
	{#each articles as article}
		<div
			class="relative flex h-[100dvh] w-full snap-center flex-col-reverse bg-cover bg-no-repeat"
			style="
				background: var(--img-url);
				background-position: center center;
				background-repeat: no-repeat;
			"
			style:--img-url={`url(${article.picture?.img})`}
		>
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
