import { articleScheme } from '$lib/scheme/article';
import { z } from 'zod';

export async function loadArticles(amount: number) {
	const unparsed = await fetch(`http://localhost:5000/random/${amount}`).then((r) => r.json());

	return z.array(articleScheme).parse(unparsed);
}

export async function loadArticleById(id: string) {
	const unparsed = await fetch(`http://localhost:5000/by_id/${id}`).then((r) => r.json());

	return articleScheme.parse(unparsed);
}
