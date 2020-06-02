import Vue from 'vue';
import VueRouter from 'vue-router';
import * as firebase from 'firebase/app';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import 'firebase/auth';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    alias: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
  },
  {
    path: '/phonebook',
    name: 'phonebook',
    component: () => import('../views/PhoneBook.vue'),
    meta: { requiresAuth: true },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const isAuthenticated = firebase.auth().currentUser;
  if (requiresAuth && !isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router;
