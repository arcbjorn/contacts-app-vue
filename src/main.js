/* eslint-disable import/prefer-default-export */
import Vue from 'vue';
import axios from 'axios';
import firebase from 'firebase/app';
import 'firebase/firestore';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.prototype.$axios = axios;
Vue.config.productionTip = false;

const firebaseConfig = {
  apiKey: 'AIzaSyDZEOX8cVIMLJmDe9O6kimRFerw82A1M7g',
  authDomain: 'contacts-vue-app.firebaseapp.com',
  databaseURL: 'https://contacts-vue-app.firebaseio.com',
  projectId: 'contacts-vue-app',
  storageBucket: 'contacts-vue-app.appspot.com',
  messagingSenderId: '423214145509',
  appId: '1:423214145509:web:f41dd855910fb2d444d90c',
};

firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
// firebase collections
export const contactsCollection = db.collection('contacts');


let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount('#app');
  }
});
