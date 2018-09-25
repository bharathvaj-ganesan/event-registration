<template>
	<v-container>
		<v-layout justify-space-between >
			<v-flex xs12 sm5>
				<p class="display-1 accent--text">Registered Events</p>
				<v-layout row wrap justify-space-between>
					<v-flex xs12  v-for="event in registeredEvents" :key="event.id" class="mb-2">
						<app-event-item 
							:name="event.name"
							:location="event.location"
							:description="event.description"
							:id="event.id"
							:timestamp="event.timestamp" />
					</v-flex>
				</v-layout>
			</v-flex>
			<v-flex xs12 sm5>
				<p class="display-1 accent--text">Organized Events</p>
				<v-layout row wrap justify-space-between>
					<v-flex xs12  v-for="event in userOrganizedEvents" :key="event.id" class="mb-2">
						<app-event-item 
							:name="event.name"
							:location="event.location"
							:description="event.description"
							:id="event.id"
							:timestamp="event.timestamp" />
					</v-flex>
				</v-layout>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
import EventItem from '@/components/Shared/EventItem';
export default {
	name: 'dashboard',
	components: {
		appEventItem: EventItem
	},
	data() {
		return {};
	},
	computed: {
		registeredEvents() {
			return this.$store.getters.userRegisteredEvents;
		},
		userOrganizedEvents() {
			return this.$store.getters.userOrganizedEvents;
		}
	},
	methods: {}
};
</script>

<style>
</style>
