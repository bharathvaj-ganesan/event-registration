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
		users: [
			{
				email: 'bharathvaj1995@gmail.com',
				password: 'tobekeptsecret',
				registeredEvents: [],
				organizedEvents: []
			}
		],
		user: null,
		notification: {
			show: false,
			text: '',
			color: 'info',
			mode: '',
			timeout: 0
		}
	},
	mutations: {
		organizeEvent(state, payload) {
			state.events.push(payload);
		},
		signupUser(state, payload) {
			state.users.push(payload);
		},
		setUser(state, payload) {
			state.user = payload;
		},
		setNotification(state, payload) {
			state.notification = {
				show: payload.show,
				text: payload.text || '',
				color: payload.color || '',
				timeout: payload.timeout || 3000
			};
		}
	},
	actions: {
		organizeEvent({ commit }, payload) {
			commit('organizeEvent', payload);
		},
		signupUser({ commit }, payload) {
			// Set default values and faking async
			payload['registeredEvents'] = [];
			payload['organizedEvents'] = [];
			commit('signupUser', payload);
			return Promise.resolve({
				...payload
			});
		},
		signinUser({ getters, commit }, payload) {
			const { email, password } = payload;
			const user = getters.findUser(email, password);
			if (user) {
				commit('setUser', {
					...user
				});
				return Promise.resolve({
					...user
				});
			}
			return Promise.reject();
		},
		setNotification({ commit }, payload) {
			commit('setNotification', payload);
		},
		logoutUser({ commit }) {
			commit('setUser', null);
		}
	},
	getters: {
		allEvents(state) {
			return state.events;
		},
		event(state) {
			return eventId => state.events.find(event => event.id === eventId);
		},
		users(state) {
			return state.users;
		},
		findUser(state) {
			return (email, password) => state.users.find(user => user.email === email && user.password === password);
		},
		user(state) {
			return state.user;
		}
	}
});
