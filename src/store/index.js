import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		events: [
			{
				id: '1',
				name: 'Cyber Security',
				description: `As a member of IoT Nation NYC, you are invited with
				 special discounted admission to the 6th annual Cyber Security Summit: New York. 
				Join your distinguished peers & Global Cyber Thought Leaders 
				for a day of interactive learning.`,
				location: 'Chennai',
				duration: '2', // Hr
				fee: '700', // INR
				participants: ['2', '3'],
				organizer: '1',
				maxParticipants: 25
			},
			{
				id: '2',
				name: 'Meet for SPEED',
				description: `Come join us at Meet for SPEED event!
				Bring your laptop and we'll work together on optimizing our sites.
				You can benefit even if you can't edit your site right now - we will be happy to share the knowledge.
				`,
				location: 'Mumbai',
				duration: '4', // Hr
				fee: '600', // INR
				participants: ['1', '3'],
				organizer: '2',
				maxParticipants: 40
			},
			{
				id: '3',
				name: 'GeekNight 59th Edition',
				description: `This is a great chance to ask for help, meet like minded people, get career advice and find a mentor. 
				Feel free to come and just work or come with specific questions.`,
				location: 'Chennai',
				duration: '6', // Hr
				fee: '1200', // INR
				participants: ['1', '4'],
				organizer: '3',
				maxParticipants: 60
			},
			{
				id: '4',
				name: 'Information Security',
				description: `As a member of IoT Nation NYC, you are invited with
				 special discounted admission to the 6th annual Cyber Security Summit: New York. 
				Join your distinguished peers & Global Cyber Thought Leaders 
				for a day of interactive learning.`,
				location: 'Delhi',
				duration: '2', // Hr
				fee: '200', // INR
				participants: ['1', '3'],
				organizer: '2',
				maxParticipants: 50
			}
		],
		user: {
			id: '',
			registeredEvents: ['2'],
			organizedEvents: ['1']
		}
	},
	mutations: {
		organizeEvent(state, payload) {
			state.events.push(payload);
		}
	},
	actions: {
		organizeEvent({ commit }, payload) {
			commit('organizeEvent', payload);
		}
	},
	getters: {
		allEvents(state) {
			return state.events;
		},
		event(state) {
			return eventId => state.events.find(event => event.id === eventId);
		}
	}
});
