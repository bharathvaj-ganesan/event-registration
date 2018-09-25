<template>
	<v-container>
		<v-layout justify-space-around row wrap>
			<v-flex xs12>
				<v-img :src="require('@/assets/event.jpg')" aspect-ratio="3"></v-img>
			</v-flex>
			<v-flex xs12>
				<v-layout row wrap justify-space-around class="mt-2">
					<v-flex xs12 sm6 class="text-sm-right">
						<v-btn large  to="/events" class="primary" dark>Explore Events
						</v-btn>
					</v-flex>
					<v-flex xs12 sm6 class="text-sm-left">
						<v-btn large  to="/events/organize" class="primary" dark>Organize
						</v-btn>
					</v-flex>
				</v-layout>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
export default {};
</script>

<style>
</style>
