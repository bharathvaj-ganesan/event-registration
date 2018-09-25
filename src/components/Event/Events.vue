<template>
	<v-container grid-list-sm>
		<v-layout row wrap justify-space-between>
			<v-flex xs12 sm6 md5 v-for="event in allEvents" :key="event.id" class="mb-2">
				<app-event-item 
					:name="event.name"
					:location="event.location"
					:description="event.description"
					:id="event.id"
					:timestamp="event.timestamp" />
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
import EventItem from '@/components/Shared/EventItem';
export default {
	name: 'Event',
	components: {
		appEventItem: EventItem
	},
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
