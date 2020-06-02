<template>
  <div>
    <div v-if="error" class="error">{{error.meesage}}</div>
    <form @submit.prevent="handleRegister">
      <h1>Register</h1>
        <input type="email" v-model="email" placeholder="email">
        <div class="password">
          <input type="password" v-model="password" placeholder="password">
        </div>
        <div class="error" v-if="error">{{error.message}}</div>
        <button class="submit">Register</button>
    </form>
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
  methods: {
    handleRegister() {
      const { email } = this;
      const { password } = this;
      this.$store.dispatch('register', { email, password })
        .then(() => {
          this.$router.replace({ name: 'phonebook' });
        })
        .catch((err) => {
          this.error = err;
        });
    },
  },
  data() {
    return {
      email: '',
      password: '',
      error: '',
    };
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
