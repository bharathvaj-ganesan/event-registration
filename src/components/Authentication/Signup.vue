<template>
	<v-container>
		<v-layout>
			<v-flex xs12 sm6 offset-sm3>
				<v-form ref="signupForm" v-model="signupValid" @submit.prevent="onSignup" lazy-validation>
					<v-container grid-list-md>
					<v-layout row wrap>
						<v-flex xs12>
							<v-text-field
								label="Email"
								type="email"
								:rules="signupRules.emailRules"
								v-model="email"
								validate-on-blur
								 autocomplete="off"
								box
								required
							></v-text-field>
						</v-flex>
						<v-flex xs12>
							<v-text-field
							label="Password"
							type= "password"
							:rules="signupRules.passwordRules"
							v-model="password"
							validate-on-blur
							 autocomplete="off"
							box
							required
							></v-text-field>
						</v-flex>
						<v-btn
						color="accent"
						dark
						block
						large
						type="submit"
						>Sign Up</v-btn>
					</v-layout>
					<div class="caption text-xs-center">
						<p>Already have an account? <router-link to="/signin" class="blue--text"><u>Log in!</u></router-link></p>
					</div>
					</v-container>
				</v-form>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
export default {
	data() {
		return {
			signupValid: true,
			email: '',
			password: '',
			signupRules: {
				nameRules: [
					v => {
						return !!v || 'Name is required';
					},
					v => (v && v.length < 20) || 'Name must be less than 20 characters',
					v => /^[a-zA-Z ]+$/.test(v) || 'Name can contain only alphabets and white space'
				],
				emailRules: [
					v => {
						return !!v || 'E-mail is required';
					},
					v => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
				],
				passwordRules: [
					v => !!v || 'Password is required',
					v => (v && v.length >= 8) || 'Password must contain atleast 8 characters',
					v => /^[a-zA-Z0-9]+$/.test(v) || 'Password can contain only alphabets and numbers'
				]
			}
		};
	},
	computed: {
		validEmail() {
			return !this.userEmailValid;
		}
	},
	methods: {
		onSignup() {
			if (this.$refs.signupForm.validate()) {
				const { email, password } = this;
				const userDetails = {
					email,
					password
				};
				this.$store
					.dispatch('signupUser', userDetails)
					.then(result => {
						this.$store.dispatch('setNotification', {
							show: true,
							text: 'Successfully signedup',
							color: 'success'
						});
						this.clearForm();
						this.$router.push('/signin');
					})
					.catch(err => {
						this.$store.dispatch('setNotification', {
							show: true,
							text: 'Cannot sign up',
							color: 'failure'
						});
					});
			}
		},
		clearForm() {
			this.email = '';
			this.password = '';
		}
	},
	created() {
		if (this.$store.getters.user) {
			this.$router.push('/dashboard');
		}
	}
};
</script>

<style>
</style>
