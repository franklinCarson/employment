import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import InfoRequests from "../views/InfoRequests";
import PendingOpportunities from "../views/PendingOpportunities";
import Login from "../views/Login";

Vue.use(VueRouter)

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
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

// const router = new VueRouter({
//   mode: 'history',
//   base: process.env.BASE_URL,
//   routes
// })

// export default router
//
// import Vue from 'vue'
// import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
//
// const USER_PUBLIC = "public";
//
// Vue.use(VueRouter)
//
// const routes = [
//   {
//     path: '/',
//     name: 'Home',
//     component: Home,
//     // Users who can access these routes.
//     access: [
//       USER_PUBLIC
//     ]
//   }
// ];

// const router = new VueRouter({
//   mode: 'history',
//   base: process.env.BASE_URL,
//   routes
// });
//
// router.beforeEach(async (to, from, next) => {
//   const isPub = to.matched.some(record => record.access.contains(USER_PUBLIC));
//   if(isPub){
//     return next();
//   }
//
//   // Check Auth if browser refresh or first visit.
//   if (router.app.$data === undefined){
//     console.log("Checking if logged in ...");
//   }
//
//   // if (router.app.isAuthenticated){
//   //
//   // }
//
//   return next({
//     path: '/login',
//     query: { redirect: to.fullPath }
//   })
// });
//
// export default router

