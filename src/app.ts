import { defineComponent } from 'vue';
import { ref } from 'vue';
import Card, { CardProps } from './card';

export default defineComponent({
	setup() {
		const d: CardProps[] = [];
		const cards = ref(d);
		return { cards };
	},
	components: {
		Card
	},
	mounted() {
		// fetch data from https://people.canonical.com/~anthonydillon/wp-json/wp/v2/posts.json

		fetch('https://people.canonical.com/~anthonydillon/wp-json/wp/v2/posts.json')
			.then(response => response.json())
			.then(data => {
				this.cards = Array.isArray(data) ? data.map(mapDataItem) : [];
			});
	},
	template: /*html*/ `
		<div class="row">
			<Card v-for="card in cards" :data="card"></Card>
		</div>
	`
});

function mapDataItem(item: any): CardProps {
	return {
		id: item.id,
		title: item.title?.rendered,
		category: Array.isArray(item.topic) && item.topic.length > 0 ? findTopicName(item.topic[0], item) : findTopicName(item.categories[0], item),
		link: item.link,
		image: item['featured_media'],
		authorName: item._embedded.author[0].name,
		authorLink: item._embedded.author[0].link,
		date: new Date(item.date)
	};
}

function findTopicName(id: number, object: any) {
	let topic = '';
	object._embedded['wp:term'].forEach((term: any) => {
		term.forEach((item: any) => {
			if (item.id === id) {
				topic = item.name;
			}
		});
	});
	return topic;
}
