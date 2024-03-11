import { defineComponent } from 'vue';

export interface CardProps {
	id: string;
	title: string;
	category: string;
	link: string;
	image?: string;
	authorName: string;
	authorLink: string;
	date: Date;
}

const monthNames = ["January", "February", "March", "April", "May", "June",
	"July", "August", "September", "October", "November", "December"
];

export default defineComponent({
	props: {
		data: {
			type: Object as () => CardProps,
		}
	},
	setup(props) {

	},
	methods: {
		monthName(month: number): string {
			return monthNames[month];
		}
	},
	template: /*html*/ `

		<div class="col-4">
			<div class="p-card--highlighted">
				<div class="p-card__content">
					<p class="p-text--small-caps">{{ data.category }}</p>
					<hr class="u-sv1">
					<img class="p-card__image" alt="" height="185" width="330" :src="data.image">
					<h4>
						<a :href="data.link" class="is-accent">{{ data.title }}</a>
					</h4>
					<p class="u-no-padding--bottom"><i>
						By <a :href="data.authorLink" class="is-accent">{{ data.authorName}}</a>
						on {{ data.date.getDate() }} {{ monthName(data.date.getMonth()) }} {{ data.date.getFullYear() }}
						</i>
					</p>
					<hr class="u-sv1">
					<p class="u-no-padding--bottom">
						Article
					</p>
				</div>
			</div>
		</div>

	`
});