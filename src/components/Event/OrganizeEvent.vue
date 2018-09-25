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
						<v-menu
							ref="dateMenu"
							:close-on-content-click="false"
							:nudge-right="40"
							:return-value.sync="date"
							lazy
							transition="scale-transition"
							offset-y
							full-width
							max-width="290px"
							min-width="290px"
						>
							<v-text-field
								slot="activator"
								v-model="date"
								:rules="organizeEventFormRules.dateRules"
								label="Choose a date"
								prepend-icon="event"
								readonly
								></v-text-field>
							<v-date-picker
							v-model="date"
							:allowed-dates="allowedEventDates"
							no-title
							scrollable
							>
							<v-spacer></v-spacer>
							<v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
							<v-btn flat color="primary" @click="$refs.dateMenu.save(date)">OK</v-btn>
						</v-date-picker>
					</v-menu>
					</v-flex>
					<v-flex xs12 sm6 offset-sm3>
						<v-menu
							ref="timeMenu"
							:close-on-content-click="false"
							:nudge-right="40"
							:return-value.sync="time"
							lazy
							transition="scale-transition"
							offset-y
							full-width
							max-width="290px"
							min-width="290px"
						>
							<v-text-field
							slot="activator"
							v-model="time"
							label="Choose event start time"
							:rules="organizeEventFormRules.timeRules"
							prepend-icon="access_time"
							readonly
							></v-text-field>
							<v-time-picker
							v-model="time"
							@change="$refs.timeMenu.save(time)"
							></v-time-picker>
						</v-menu>
					</v-flex>
					<v-flex xs12 sm6 offset-sm3>
						<v-btn
							color="accent"
							class="white--text"
							block
							large
							type="submit"
							>Organize Event</v-btn>
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
			date: null,
			time: null,
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
				],
				dateRules: [
					v => {
						return !!v || 'Date is required';
					}
				],
				timeRules: [
					v => {
						return !!v || 'Time is required';
					}
				]
			}
		};
	},
	computed: {
		timeStamp() {
			const date = new Date(this.date);
			if (typeof this.time === 'string') {
				let hours = this.time.match(/^(\d+)/)[1];
				const minutes = this.time.match(/:(\d+)/)[1];
				date.setHours(hours);
				date.setMinutes(minutes);
			} else {
				date.setHours(this.time.getHours());
				date.setMinutes(this.time.getMinutes());
			}
			return date.toISOString();
		}
	},
	methods: {
		onOrganizeEvent() {
			if (this.$refs.organizeEventForm.validate()) {
				const { eventName: name, location, fees, description, timeStamp } = this;
				const eventData = {
					id: uniqueIdGenerator(),
					name,
					location,
					description,
					fees,
					timeStamp
				};
				this.$store.dispatch('organizeEvent', eventData);
				this.$router.push('/events');
			} else {
				return;
			}
		},
		allowedEventDates(val) {
			const today = new Date();
			const selectedDate = new Date(val);
			if (selectedDate < today) {
				return false;
			}
			return true;
		}
	}
};
</script>

<style>
</style>
