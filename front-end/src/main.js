import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;


new Vue({
  router,
  vuetify,
  data: () => ({
    user: {
      username: ''
    }
  }),
  methods: {
    handleLoggedIn: function (user) {
      this.user = user;
    },
    handleLoggedOut: function () {
      // When a user is logged out we wipe the data and set the username to '' for the isAuthenticated method.
      this.user = { username: '' };
    }
  },
  computed: {
    isAuthenticated: function () {
      // Returns true if the user is set.
      return this.user.username !== '' && this.isAdminDomain;
    },
    isAdminDomain: function () {
      // Return true if the domain is admin.*
      return window.location.host.split(".")[0] === "admin"
    }
  },
  render: function (createElement) {
    const context = {
      on: {
        'logged-in': this.handleLoggedIn,
        'logged-out': this.handleLoggedOut
      },
      props: {
        user: this.user
      }
    };

    return createElement(App, context)
  },
  created: function () {
    this.$on('logged-in', this.handleLoggedIn);
  }
}).$mount('#app');
