import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
	plugins: [
		createPersistedState({
			key: 'as_tmp'
		})
	],
	state: {
		events: [
			{
				id: 'axLltn',
				name: 'Cyber Security',
				description: `As a member of IoT Nation NYC, you are invited with
				 special discounted admission to the 6th annual Cyber Security Summit: New York. 
				Join your distinguished peers & Global Cyber Thought Leaders 
				for a day of interactive learning.`,
				location: 'Chennai',
				duration: '2', // Hr
				fee: '700', // INR
				participants: ['user2@gmail.com', 'user3@gmail.com'],
				organizer: 'user1@gmail.com',
				maxParticipants: 25,
				timestamp: '2018-09-25T16:08:26.879Z'
			},
			{
				id: 'fQYzEH',
				name: 'Meet for SPEED',
				description: `Come join us at Meet for SPEED event!
				Bring your laptop and we'll work together on optimizing our sites.
				You can benefit even if you can't edit your site right now - we will be happy to share the knowledge.
				`,
				location: 'Mumbai',
				duration: '4', // Hr
				fee: '600', // INR
				participants: ['user4@gmail.com', 'user3@gmail.com'],
				organizer: 'user2@gmail.com',
				maxParticipants: 40,
				timestamp: '2018-10-25T16:08:26.879Z'
			},
			{
				id: 'l9yYQv',
				name: 'GeekNight 59th Edition',
				description: `This is a great chance to ask for help, meet like minded people, get career advice and find a mentor. 
				Feel free to come and just work or come with specific questions.`,
				location: 'Chennai',
				duration: '6', // Hr
				fee: '1200', // INR
				participants: ['user1@gmail.com', 'user4@gmail.com'],
				organizer: 'user3@gmail.com',
				maxParticipants: 60,
				timestamp: '2018-11-25T16:08:26.879Z'
			},
			{
				id: 'mj54Jk',
				name: 'Information Security',
				description: `As a member of IoT Nation NYC, you are invited with
				 special discounted admission to the 6th annual Cyber Security Summit: New York. 
				Join your distinguished peers & Global Cyber Thought Leaders 
				for a day of interactive learning.`,
				location: 'Delhi',
				duration: '2', // Hr
				fee: '200', // INR
				participants: ['user1@gmail.com', 'user3@gmail.com'],
				organizer: 'user2@gmail.com',
				maxParticipants: 50,
				timestamp: '2018-10-29T16:08:26.879Z'
			}
		],
		users: [
			{
				email: 'user1@gmail.com',
				password: 'tobekeptsecret',
				registeredEvents: ['mj54Jk', 'l9yYQv'],
				organizedEvents: ['axLltn']
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
		},
		userRegisterEvent(state, payload) {
			const { id, email } = payload;
			state.user.registeredEvents.push(id);
			state.events.find(event => event.id === id).participants.push(email);
		},
		userUnRegisterEvent(state, payload) {
			const { id, email } = payload;
			const eventIndex = state.user.registeredEvents.indexOf(id);
			state.user.registeredEvents.splice(eventIndex, 1);
			const event = state.events.find(event => event.id === id);
			const userIndex = event.participants.indexOf(email);
			event.participants.splice(userIndex, 1);
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
		clearNotification({ commit }) {
			commit('setNotification', {
				show: false
			});
		},
		logoutUser({ commit }) {
			commit('setUser', null);
		},
		userRegisterEvent({ commit }, payload) {
			commit('userRegisterEvent', payload);
		},
		userUnRegisterEvent({ commit, getters, dispatch }, payload) {
			const event = getters.event(payload.id);
			if (event.participants + 1 > event.maxParticipants) {
				dispatch('setNotification', {
					show: true,
					text: 'Maximum participants reached',
					color: 'failure'
				});
				return;
			}
			commit('userUnRegisterEvent', payload);
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
		},
		userRegisteredEvents(state) {
			const { user, events } = state;
			const registeredEvents = [];
			if (!user) {
				return [];
			}
			user.registeredEvents.forEach(eventId => {
				registeredEvents.push(events.find(event => eventId === event.id));
			});
			return registeredEvents;
		},
		userOrganizedEvents(state) {
			const { user, events } = state;
			const organizedEvents = [];
			if (!user) {
				return [];
			}
			user.organizedEvents.forEach(eventId => {
				organizedEvents.push(events.find(event => eventId === event.id));
			});
			return organizedEvents;
		}
	}
});
