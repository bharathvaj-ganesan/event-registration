<template>
	<v-container grid-list-sm>
		<v-layout row wrap justify-space-between>
			<v-flex xs12 sm6 md5 v-for="event in allEvents" :key="event.id" class="mb-2">
				<v-card>
					<v-img
					class="white--text"
					height="200px"
					:src="require('@/assets/event.jpg')"
					>
					<v-container fill-height fluid>
						<v-layout fill-height>
						<v-flex xs12 align-end flexbox>
							<span class="headline">{{event.name}}</span>
						</v-flex>
						</v-layout>
					</v-container>
					</v-img>
					<v-card-title>
					<div class="text-truncate">
						<span class="grey--text">{{event.location}}</span><br>
						<span>{{event.description}}</span>
					</div>
					</v-card-title>
					<v-card-actions>
						<v-btn flat light color="primary" :to="`/events/${event.id}`">
							Explore
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
export default {
	name: 'Event',
	data() {
		return {};
	},
	computed: {
		allEvents() {
			return this.$store.getters.allEvents;
		}
	},
	methods: {}
};
</script>

<style>
</style>
