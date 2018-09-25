<template>
	<h2 v-if="event">{{event.name}}</h2>
</template>

<script>
export default {
	name: 'Event',
	props: ['id'],
	computed: {
		event() {
			return this.$store.getters.event(this.id);
		}
	}
};
</script>

<style>
</style>
