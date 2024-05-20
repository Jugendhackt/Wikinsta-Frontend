<script lang="ts">
	export let img: string;
</script>

<div style:--url={`url(${img})`} />

<style>
	div {
		--size: 128px;

		position: fixed;
		inset: calc(-1 * var(--size));
		z-index: -50;

		width: calc(100% + var(--size) * 2);
		height: calc(100% + var(--size) * 2);

		background-image: var(--url);
		background-size: cover;
		background-position: center center;

		filter: blur(calc(var(--size) / 2));
	}
</style>
