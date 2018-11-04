<template>
	<v-container>
		<v-layout >
			<v-flex xs12 sm6 offset-sm3>
				<v-form ref="signinForm" v-model="signinValid" @submit.prevent="onSignin" lazy-validation>
					<v-container grid-list-md>
						<v-layout row wrap>
						<v-flex xs12>
							<v-text-field
							label="Email"
							type="email"
							:rules="formRules.emailRules"
							v-model="email"
							validate-on-blur
							box
							required
							></v-text-field>
						</v-flex>
						<v-flex xs12>
							<v-text-field
							label="Password"
							type= "password"
							autocomplete="off"
							:rules="formRules.passwordRules"
							v-model="password"
								@keyup.enter="onSignin"
							validate-on-blur
							box
							required
							></v-text-field>
						</v-flex>
						<v-flex xs12>
							<v-btn
							color="accent"
							dark
							block
							large
							type="submit"
							>Login</v-btn>
						</v-flex>
						</v-layout>
						<div class="caption text-xs-center">
						<p>Don’t have a Amber Signal account yet? <router-link :to="{ name: 'Signup' }" ><u class="blue--text">Sign up!</u></router-link></p>
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
      signinValid: true,
      email: '',
      password: '',
      formRules: {
        emailRules: [
          v => {
            return !!v || 'Can I have your Email ID?';
          },
          v =>
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
            'Ah! Invalid Email'
        ],
        passwordRules: [
          v => {
            return !!v || 'Could you give us a Password as well?';
          }
        ]
      }
    };
  },
  methods: {
    /**
     * Signin Handling function that validates form fields before dispatching the events
     */
    onSignin() {
      if (this.$refs.signinForm.validate()) {
        const { email, password } = this;
        const userDetails = {
          email,
          password
        };
        this.$store
          .dispatch('signinUser', userDetails)
          .then(() => {
            this.$store.dispatch('setNotification', {
              show: true,
              text: 'Successfully signedup',
              color: 'success'
            });
            this.clearForm();
            this.$router.push('/dashboard');
          })
          .catch(() => {
            this.$store.dispatch('setNotification', {
              show: true,
              text: 'Cannot login',
              color: 'failure'
            });
          });
      }
    },
    /**
     * Clears the form
     */
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
