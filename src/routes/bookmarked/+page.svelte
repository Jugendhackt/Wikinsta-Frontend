<script>
	import BookmarkedPreview from '$lib/components/BookmarkedPreview.svelte';
	import { favourites } from '$lib/constants/svocal';
</script>

<ul class="flex flex-col gap-2 p-2">
	{#each $favourites as favId}
		<li><BookmarkedPreview id={favId} /></li>
	{:else}
		<li>Du hast noch keine Beiträge gespeichert</li>
	{/each}
</ul>
