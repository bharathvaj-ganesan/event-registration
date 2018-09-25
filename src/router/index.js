import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Profile from '@/components/Profile';
import Events from '@/components/Event/Events';
import Event from '@/components/Event/Event';
import OrganizeEvent from '@/components/Event/OrganizeEvent';
import Signin from '@/components/Authentication/Signin';
import Signup from '@/components/Authentication/Signup';

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: '/',
			name: 'Home',
			component: Home
		},
		{
			path: '/profile',
			name: 'Profile',
			component: Profile
		},
		{
			path: '/signin',
			name: 'Signin',
			component: Signin
		},
		{
			path: '/signup',
			name: 'Signup',
			component: Signup
		},
		{
			path: '/events',
			name: 'Events',
			component: Events
		},
		{
			path: '/events/organize',
			name: 'OrganizeEvent',
			component: OrganizeEvent
		},
		{
			path: '/events/:id',
			name: 'Event',
			props: true,
			component: Event
		}
	]
});
