<script lang="ts">
	import { page } from '$app/stores';
	import ArticleMetadata from '$lib/components/ArticleMetadata.svelte';
	import type { PageData } from './$types';
	import { Bookmark, Icon, Share } from 'svelte-hero-icons';
	import { favourites } from '$lib/constants/svocal';

	export let data: PageData;

	$: article = data.data[0];
</script>

<div class="wrapper" style:--img-url={`url(${article.picture?.img})`}>
	<ArticleMetadata {article}>
		<div class="flex flex-col-reverse gap-2" slot="right">
			<button
				class="rounded-lg bg-white bg-opacity-50 p-1 shadow"
				on:click={() => {
					const shareUrl = `${$page.url.toString()}/${encodeURIComponent(article.id)}`;

					if (navigator.share) {
						try {
							navigator.share({ title: 'Wikinsta', url: shareUrl });
							return;
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
					favourites.update((old) => [...old, article.id]);
				}}
			>
				<Icon class="h-6 w-6" src={Bookmark} />
			</button>
		</div>
	</ArticleMetadata>
</div>

<style>
	.wrapper {
		position: absolute;

		background: var(--img-url);

		background-repeat: no-repeat;
		background-size: cover;
		background-position: center center;

		height: 100dvh;
		width: 100%;

		display: flex;
		flex-direction: column-reverse;
	}
</style>
