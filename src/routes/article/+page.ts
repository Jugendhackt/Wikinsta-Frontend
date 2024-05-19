import { articleScheme } from '$lib/scheme/article';
import { z } from 'zod';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const unparsed = await fetch('http://localhost:5000/random/1')
		.then((r) => r.json());


	const parsed = z.array(articleScheme).parse(unparsed)

	return {
		data: parsed
	};
};
