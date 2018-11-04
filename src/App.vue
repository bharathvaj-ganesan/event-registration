<template>
  <v-app>
    <v-navigation-drawer app v-model="sideNav"  class="hidden-sm-and-up">
      <v-list>
        <v-list-tile v-for="item in menuItems" :key="item.title" 
          :to="item.link">
          <v-list-tile-action>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            {{ item.title}}
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app dark class="primary">
      <v-toolbar-side-icon
      class="hidden-sm-and-up"
      @click.stop="sideNav = !sideNav"></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" class="pointer"><span class="white--text">Eventr</span></router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat  v-for="item in menuItems" :key="item.title"
          :to="item.link">
          <v-icon>{{item.icon}}</v-icon>
            {{item.title}}
        </v-btn>
        <v-btn flat v-if="user" @click="onLogout">
            <v-icon left dark>exit_to_app</v-icon>Logout
          </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <main>
      <v-content>
        <v-container fluid>
          <router-view></router-view>
        </v-container>
      </v-content>
      <app-notification/>
      </main>
    <v-footer app></v-footer>
  </v-app>
</template>

<script>
import Notification from '@/components/Shared/Notification';
export default {
  name: 'App',
  components: {
    appNotification: Notification
  },
  data() {
    return {
      sideNav: false
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    menuItems() {
      if (this.user) {
        return [
          {
            icon: 'dashboard',
            title: 'Dashboard',
            link: '/dashboard'
          },
          {
            icon: 'event',
            title: 'Explore',
            link: '/events'
          },
          {
            icon: 'room',
            title: 'Organize',
            link: '/events/organize'
          }
        ];
      }
      return [
        {
          icon: 'face',
          title: 'Sign up',
          link: '/signup'
        },
        {
          icon: 'lock_open',
          title: 'Sign in',
          link: '/signin'
        }
      ];
    }
  },
  created() {
    if (this.$store.getters.user) {
      this.$router.push('/dashboard');
    }
  },
  methods: {
    onLogout() {
      this.$store.dispatch('logoutUser');
      this.$store.dispatch('clearNotification');
      this.$router.push('/');
    }
  }
};
</script>
<style>
.pointer {
  cursor: pointer;
}
</style>

