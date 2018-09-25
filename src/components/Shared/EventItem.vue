<template>
	<v-card>
		<v-img
		class="white--text"
		height="200px"
		:src="require('@/assets/event.jpg')"
		>
		<v-container fill-height fluid>
			<v-layout fill-height>
			<v-flex xs12 align-end flexbox>
				<span class="headline">{{name}}</span>
			</v-flex>
			</v-layout>
		</v-container>
		</v-img>
		<v-card-title>
		<div class="text-truncate">
			<span class="grey--text">{{location}}</span><br>
			<span>{{description}}</span>
			<p class="accent--text">{{timestamp | date}}</p>
		</div>
		</v-card-title>
		<v-card-actions>
			<v-spacer></v-spacer>
			<v-btn flat light color="primary" :to="`/events/${id}`" >
				View More
			</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
export default {
	props: ['name', 'location', 'description', 'id', 'timestamp']
};
</script>

<style>
</style>
