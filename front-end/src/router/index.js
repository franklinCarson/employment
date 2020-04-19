import Vue from 'vue'
import axios from 'axios'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import InfoRequests from "../views/InfoRequests";
import PendingOpportunities from "../views/PendingOpportunities";
import Login from "../views/Login";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/info-requests',
    name: 'InfoRequests',
    component: InfoRequests
  },
  {
    path: '/pending-opportunities',
    name: 'PendingOpportunities',
    component: PendingOpportunities
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

// const router = new VueRouter({routes});

// This helps with routing for the admin facing site.
router.beforeEach(async (to, from, next) => {



  // If data isn't yet defined because of vue life cycle's, then request the user's data and wait until response.
  if(router.app.$data === undefined){
    try {
      let res = await axios.get('/api/users');
      router.app.$emit('logged-in', res.data);
    } catch (e) {
      // If user is not logged in and this is the admin domain.
      if(router.app.isAdminDomain){
        return next({
          path: '/login',
          query: { redirect: to.fullPath }
        })
      }
    }
  }

  if(to.name === 'Login' ){
    // If this isn't the admin domain route back to home.
    if (!router.app.isAdminDomain){
      return next("/")
    }

    // If we are trying to log in and we aren't logged in then send them to the login page. Else just send them to home,
    // because they are already logged in.
    if(!router.app.isAuthenticated){
      return next();
    }

    return next('/');
  }

    // // If the domain is admin and user is not logged in send to login.
    // if (router.app.isAdminDomain && !router.app.isAuthenticated) {
    //     return next({
    //       path: '/login',
    //       query: { redirect: to.fullPath }
    //     })
    // }

  // Else direct to route. If there is no user this will be what executes and it will mean that the app will behave as
  // public.
  return next();
});

export default router

