import type { PageLoad } from './$types';
import { loadArticles } from '$lib/api/article';

export const load: PageLoad = async () => ({ data: await loadArticles(3) });
