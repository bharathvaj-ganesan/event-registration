<template>
	<v-container>
		<v-layout>
			<v-flex xs12>
				<h2 class="primary--text display-2">Organize an event</h2>
			</v-flex>
		</v-layout>
		<v-form v-model="organizeEventForm" @submit.prevent="onOrganizeEvent" ref="organizeEventForm" lazy-validation>
			<v-container grid-list-md>
				<v-layout row wrap>
					<v-flex xs12 sm6 offset-sm3>
						<v-text-field
						label="Event Name"
						:rules="organizeEventFormRules.nameRules"
						v-model="eventName"
						validate-on-blur
						box
						required
						></v-text-field>
					</v-flex>
					<v-flex xs12 sm6 offset-sm3>
						<v-textarea
						label="Description"
						:rules="organizeEventFormRules.descriptionRules"
						v-model="description"
						validate-on-blur
						box
						required
						auto-grow
						multi-line
						rows=8
						counter=300
						></v-textarea>
					</v-flex>
					<v-flex xs12 sm6 offset-sm3>
						<v-text-field
						label="Location"
						:rules="organizeEventFormRules.locationRules"
						v-model="location"
						validate-on-blur
						box
						required
						></v-text-field>
					</v-flex>
					<v-flex xs12 sm6 offset-sm3>
						<v-text-field
						label="Fee"
						:rules="organizeEventFormRules.feeRules"
						v-model="fees"
						validate-on-blur
						box
						required
						></v-text-field>
					</v-flex>
					<v-flex xs12 sm6 offset-sm3>
						<v-btn
							color="light-blue"
							class="white--text"
							block
							large
							type="submit"
							>Create Event</v-btn>
					</v-flex>
				</v-layout>
			</v-container>
		</v-form>
	</v-container>
</template>

<script>
import uniqueIdGenerator from '@/utils/uniqueIdGenerator';
export default {
	name: 'Organize',
	data() {
		return {
			organizeEventForm: false,
			eventName: '',
			location: '',
			description: '',
			fees: 0,
			organizeEventFormRules: {
				nameRules: [
					v => {
						return !!v || 'Name is required';
					},
					v => (v && v.length < 40) || 'Name must be less than 40 characters',
					v => /^[a-zA-Z ]+$/.test(v) || 'Name can contain only alphabets and white space'
				],
				descriptionRules: [
					v => {
						return !!v || 'Description is required';
					},
					v => (v && v.length < 300) || 'Description must be less than 300 characters',
					v => /^[a-zA-Z ]+$/.test(v) || 'Description can contain only alphabets and white space'
				],
				locationRules: [
					v => {
						return !!v || 'Location is required';
					},
					v => (v && v.length < 40) || 'Name must be less than 40 characters'
				],
				feeRules: [
					v => {
						return !!v || 'Fees is required';
					},
					v => (v && v < 2000) || 'Fees must be less than 2000 INR',
					v => (v && parseInt(v) > 0) || 'Fees cannot be in negative values'
				]
			}
		};
	},
	methods: {
		onOrganizeEvent() {
			if (this.$refs.organizeEventForm.validate()) {
				const { eventName: name, location, fees, description } = this;
				const eventData = {
					id: uniqueIdGenerator(),
					name,
					location,
					description,
					fees
				};
				this.$store.dispatch('organizeEvent', eventData);
				this.$router.push('/events');
			} else {
				return;
			}
		}
	}
};
</script>

<style>
</style>
