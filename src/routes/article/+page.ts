import type { Article } from '$lib/scheme/article';
import type { PageLoad } from './$types';

export const load: PageLoad = () => {
	return {
		data: [
			{
				lang: 'de',
				title: 'Jugendhackt',
				id: 'super id',
				summary:
					'lorem ipsum lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsum',
				picture: {
					img: 'https://picsum.photos/200/300',
					license: 'MIT'
				}
			}
		] satisfies Article[] as Article[]
	};
};
