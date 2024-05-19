import { z } from 'zod';

export const articleScheme = z.object({
	id: z.string(),
	lang: z.string(),
	picture: z.nullable(
		z.object({
			img: z.string(),
			license: z.string()
		})
	),
	summary: z.string(),
	title: z.string(),
	uuid: z.string()
});

export type Article = z.infer<typeof articleScheme>;
