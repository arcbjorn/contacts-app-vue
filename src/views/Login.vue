<template>
  <div>
    <h1>Sign in</h1>
    <form @submit.prevent="handleLogin">
      <div class="login">
        <input type="email" v-model="email" placeholder="login">
      </div>
      <div class="password">
          <input type="password" v-model="password" placeholder="password">
        </div>
      <button class="submit">Login</button>
    </form>
    <div class="error" v-if="error">{{error.message}}</div>
    <span>
      Don't have an account? Click here to
      <router-link to="/register"> register</router-link>.
    </span>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      userId: (state) => state.user.id,
    }),
  },
  data() {
    return {
      email: '',
      password: '',
      error: '',
    };
  },
  methods: {
    handleLogin() {
      const { email } = this;
      const { password } = this;
      this.$store.dispatch('login', { email, password })
        .then(() => {
          this.$router.replace({ name: 'phonebook' });
        })
        .catch((err) => {
          this.error = err;
        });
    },
  },
};
</script>

<style lang="scss" scoped>

.error {
  color: darkred;
  font-size: 18px;
}
input {
  width: 400px;
  padding: 1rem;
  margin: .5rem;
  font-size: 21px;
}
button {
  width: 200px;
  height: 50px;
  font-size: 100%;
  margin: 1rem;
}

</style>
