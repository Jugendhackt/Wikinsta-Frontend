import { articleScheme, type Article } from '$lib/scheme/article';
import { z } from 'zod';

export async function loadArticles(amount: number, allowWithoutPic = false, private_base: Article[] = []) {
	const missingLength = amount - private_base.length;

	if (missingLength === 0) return private_base

	const unparsed = await fetch(`http://localhost:5000/random/${missingLength}`).then((r) => r.json());
	const parsed = [...private_base, ...z.array(articleScheme).parse(unparsed).filter(({ picture }) => allowWithoutPic || picture)];

	return loadArticles(amount, allowWithoutPic, parsed);
}

export async function loadArticleById(id: string) {
	const unparsed = await fetch(`http://localhost:5000/by_id/${id}`).then((r) => r.json());

	return articleScheme.parse(unparsed);
}
