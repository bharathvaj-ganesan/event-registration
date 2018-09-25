<template>
  <v-snackbar
      :timeout="snackbarConfig.timeout"
      :color="snackbarConfig.color"
      :value="showSnackbar"
      bottom
      left>
      {{ snackbarConfig.text }}
    </v-snackbar>
</template>

<script>
export default {
	name: 'SnackbarComponent',
	computed: {
		showSnackbar() {
			return this.$store.state.notification.show;
		},
		snackbarConfig() {
			return this.$store.state.notification || {};
		}
	}
};
</script>

<style>
</style>