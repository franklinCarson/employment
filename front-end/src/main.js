import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

const USER_PUBLIC = "public";

new Vue({
  router,
  vuetify,
  render: h => h(App),
  data: () => ({
    user: {
      role: USER_PUBLIC,
    }
  }),
  computed: {
    isAuthenticated: function () {
      return this.user.role !== USER_PUBLIC
    }
  }
}).$mount('#app');
