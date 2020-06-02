<template>
<div>
  <form @submit.prevent="addContact">
      <div class="name">
        <input type="text" v-model="contact.name" placeholder="Name">
      </div>
      <div class="phone">
          <input type="text" v-model="contact.phone" placeholder="Phone number">
        </div>
      <button :disabled="contact.phone == ''" class="submit">Add</button>
    </form>
</div>

</template>

<script>
import { mapState } from 'vuex';
import { contactsCollection } from '../main';

export default {
  data() {
    return {
      contact: {
        name: '',
        phone: '',
      },
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.user,
    }),
    contacts() {
      return this.$store.getters.loadedContacts();
    },
    loadedContact() {
      return this.$store.getters.loadedContact();
    },
  },
  methods: {
    addContact() {
      contactsCollection.add({
        createdOn: new Date(),
        name: this.contact.name,
        phone: this.contact.phone,
        userId: this.user.uid,
      }).then(() => {
        this.contact.name = '';
        this.contact.phone = '';
      }).catch((err) => {
        console.log(err);
      });
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
