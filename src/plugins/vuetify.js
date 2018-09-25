import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

import colors from 'vuetify/es5/util/colors';

Vue.use(Vuetify, {
	iconfont: 'md',
	theme: {
		primary: colors.purple.darken1, // #E53935
		secondary: colors.purple.lighten4, // #FFCDD2
		accent: colors.deepPurple.base // #3F51B5
	}
});
