<template>
<div id="top-header" >
  <div id="profile" v-if="loggedIn">
    <p>{{this.userEmail}}</p>
    <button @click="handleSignOut">Sign Out</button>
  </div>
  <div id="nav">
    <router-link class="navlink" to="/about">About</router-link>
    <span v-if="loggedIn">
    <router-link class="navlink" to="/phonebook">Phonebook</router-link>
    </span>
    <div id="public" v-if="!loggedIn">
      <router-link class="navlink" to="/login">Login</router-link>
      <router-link class="navlink" to="/register">Register</router-link>
    </div>
  </div>
</div>

</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      userId: (state) => state.user.id,
      userEmail: (state) => state.user.email,
      username: (state) => state.user.username,
    }),
  },
  created() {
    this.$store.dispatch('checkUserStatus')
      .then(() => {
        this.loggedIn = !!this.userEmail;
      })
      .catch((err) => {
        this.error = err;
      });
  },
  data() {
    return {
      loggedIn: false,
    };
  },
  methods: {
    handleSignOut() {
      this.$store.dispatch('logout')
        .then(() => {
          this.$router.replace({ name: 'login' });
        })
        .catch((err) => {
          this.error = err;
        });
    },
  },
};
</script>

<style lang="scss" scoped>

#top-header {
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-around;
  padding: 5vh;
  margin-bottom: 5vh;
  border-bottom: 2px solid #000;
  border-color: #000;

  #profile {
    align-self: center;
  }

  #nav {
    display: flex;
    align-self: center;
    a {
      display: block;
      padding: 1rem;
      margin: 1rem;
      font-weight: bold;
      text-decoration: none;
      color: #000;

      &.router-link-exact-active {
        background-color: #42b983;
      }
    }
    .navlink:hover {
        background-color: #42b983;
      }
  }

  #public {
    display: flex;
  }
}

button {
  border-radius: 0;
  border: 0;
  cursor: pointer;
  width: 80px;
  height: 40px;
}

button:hover {
  background-color: #42b983;
}

</style>
