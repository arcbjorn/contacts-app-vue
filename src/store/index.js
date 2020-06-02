/* eslint-disable no-unused-vars */
import Vue from 'vue';
import Vuex from 'vuex';
import * as firebase from 'firebase/app';
import 'firebase/auth';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loadedContacts: [{
      uid: '',
      name: 'Sam',
      phone: '012345678',
      createdAt: '2020-05-05',
    }],
    user: {
      id: '',
      email: '',
    },
  },
  mutations: {
    LOGOUT(state) {
      state.user = '';
    },
    SET_USER(state, user) {
      state.user = user;
    },
  },
  actions: {
    async register({ commit, state }, { email, password }) {
      try {
        await firebase.auth()
          .createUserWithEmailAndPassword(
            email, password,
          );
      } catch (err) {
        console.log(err);
      }
    },
    async login({ commit, state }, { email, password }) {
      try {
        await firebase.auth()
          .signInWithEmailAndPassword(
            email, password,
          );
      } catch (err) {
        console.log(err);
      }
    },
    async logout({ commit, state }) {
      try {
        await firebase.auth().signOut().then(() => {
          commit('LOGOUT');
        });
      } catch (err) {
        console.log(err);
      }
    },
    async checkUserStatus({ commit, state }) {
      try {
        await firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            commit('SET_USER', user);
          }
        });
      } catch (err) {
        console.log(err);
        this.$router.replace({ name: 'login' });
      }
    },
  },
  getters: {
    loadedContacts(state) {
      const userContacts = (userId) => state.loadedContacts.find((c) => c.userId === userId);
      const sortedUserContacts = userContacts.sort((a, b) => a.createdAt > b.createdAt);
      return sortedUserContacts;
    },
    loadedContact(getters) {
      return (contactId) => getters.loadedContacts.find((c) => c.id === contactId);
    },
  },
  modules: {
  },
});
