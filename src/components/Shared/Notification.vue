<template>
  <v-snackbar
      :timeout="snackbarConfig.timeout"
      :color="snackbarConfig.color"
      v-model="showSnackbar"
      bottom
      left>
      {{ snackbarConfig.text }}
    </v-snackbar>
</template>

<script>
export default {
  name: 'SnackbarComponent',
  computed: {
    showSnackbar: {
      get() {
        return this.$store.state.notification.show;
      },
      set() {
        this.$store.dispatch('clearNotification');
      }
    },
    snackbarConfig() {
      return this.$store.state.notification || {};
    }
  }
};
</script>

<style>
</style>