import { z } from 'zod';

export const articleScheme = z.object({
	lang: z.string(),
	title: z.string(),
	id: z.string(),
	summary: z.string(),
	picture: z.nullable(
		z.object({
			img: z.string(),
			license: z.string()
		})
	)
});

export type Article = z.infer<typeof articleScheme>;
