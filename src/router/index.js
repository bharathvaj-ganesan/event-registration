import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Dashboard from '@/components/Dashboard';
import Events from '@/components/Event/Events';
import Event from '@/components/Event/Event';
import OrganizeEvent from '@/components/Event/OrganizeEvent';
import Signin from '@/components/Authentication/Signin';
import Signup from '@/components/Authentication/Signup';
import AuthGuard from '@/router/authGuard';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      beforeEnter: AuthGuard,
      component: Dashboard
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
      beforeEnter: AuthGuard,
      component: OrganizeEvent
    },
    {
      path: '/events/:id',
      name: 'Event',
      props: true,
      component: Event
    },
    { path: '*', redirect: '/' }
  ]
});
