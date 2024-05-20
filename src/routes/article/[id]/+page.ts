import { loadArticleById, loadArticles } from '$lib/api/article';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	return {
		data: [await loadArticleById(params.id), ...(await loadArticles(1))]
	};
};
