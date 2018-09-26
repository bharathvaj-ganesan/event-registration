<template>
	<v-container>
		<v-layout>
			<v-flex xs12 md8 offset-md2 v-if="event">
				<v-img
				:src="require('@/assets/event.jpg')"
				max-height="250"
				class="grey darken-4"
				elevation=0
				></v-img>
				<h2 class="display-1 mt-4 mb-4 accent--text">{{ event.name }}</h2>
				<hr/><br/>
				<p>{{ event.description }}</p>
				<div>
					<p>Location : <span class="font-weight-light.font-italic accent--text">{{ event.location }}</span></p>
					<p>Time : <span class="accent--text">{{ event.timestamp | date }}</span></p>
					<p>Participants : <span class="accent--text"> {{ event.participants.length }}  /  {{ event.maxParticipants }}</span></p>
					<template v-if="!isUserOrganizer">
						<v-btn color="green" dark v-if="!isUserOrganizer && !isUserRegistered" @click="onEventUserRegister">Register</v-btn>
						<v-btn color="red" dark v-if="isUserRegistered"  @click="onEventUserUnRegister">Un Register</v-btn>
					</template>
				</div>
				<template v-if="isUserOrganizer && event">
					<app-event-edit-dialog :event="event" />
				</template>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
import EventEditDialog from '@/components/Event/EventEdit';

export default {
	name: 'Event',
	components: {
		appEventEditDialog: EventEditDialog
	},
	props: ['id'],
	computed: {
		event() {
			return this.$store.getters.event(this.id);
		},
		user() {
			return this.$store.getters.user;
		},
		isUserOrganizer() {
			return this.user && this.user.organizedEvents.includes(this.id);
		},
		isUserRegistered() {
			if (this.isUserOrganizer) {
				return false;
			}
			return this.user && this.user.registeredEvents.includes(this.id);
		}
	},
	methods: {
		onEventUserRegister() {
			if (!this.user) {
				this.$router.push('/signin');
				return;
			}
			this.$store.dispatch('userRegisterEvent', {
				id: this.id,
				email: this.user.email
			});
		},
		onEventUserUnRegister() {
			if (!this.user) {
				this.$router.push('/signin');
				return;
			}
			this.$store.dispatch('userUnRegisterEvent', {
				id: this.id,
				email: this.user.email
			});
		}
	}
};
</script>

<style>
</style>
