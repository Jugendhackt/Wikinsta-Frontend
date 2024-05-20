<script lang="ts">
	import { loadArticleById } from '$lib/api/article';
	import { favourites } from '$lib/constants/svocal';
	import { Bookmark, Icon } from 'svelte-hero-icons';

	export let id: string;
</script>

{#await loadArticleById(id) then article}
	<a
		href={`/article/${id}`}
		class="block rounded-lg px-2 py-6 shadow"
		style:--img-url={article.picture?.img
			? `url(${article.picture?.img})`
			: 'linear-gradient(90deg, rgba(137,134,191,1) 0%, rgba(119,144,199,1) 22%, rgba(0,212,255,1) 100%)'}
		style="background: var(--img-url) ; background-position: center center; background-repeat: no-repeat;"
	>
		<div class="flex items-center justify-between">
			<h3>{article.title}</h3>
			<button
				class="p-3"
				on:click={() => {
					favourites.update((old) => old.filter((favId) => favId !== article.id));
				}}
			>
				<Icon class="h-6 w-6" src={Bookmark} solid={$favourites.includes(article.id)} />
			</button>
		</div>
	</a>
{/await}
