<template>
  <section>
    <b-field label="Find a name">
        <b-autocomplete
          v-model="username"
          placeholder="Find by username"
          :keep-first="false"
          :open-on-focus="true"
          :data="userFormat"
          field="username"
          @select="option => selected = option">

          <template slot-scope="props">
            <div class="media">
              <div class="media-left">
                <div class="image is-48x48">
                  <img src="https://pbs.twimg.com/profile_images/819272484256174085/-Er2nVOp_400x400.jpg">
                </div>
              </div>
              <div class="media-content">
                <span class="is-size-5">{{ props.option.username }}</span>
                <small class="has-text-grey">{{ props.option.displayName }}</small>
                <br>
                <small>
                  {{ props.option.email }}
                </small>
              </div>
            </div>
          </template>
        </b-autocomplete>
    </b-field>
  </section>
</template>

<script>
/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
export default {
  data() {
    return {
      username: '',
      selected: null,
    };
  },
  watch: {
    selected() {
      if (this.selected !== null) {
        this.$emit('setUserToAdd', this.selected);
      }
    },
  },
  mounted() {
    this.$store.dispatch('loadUsersFromAPI').then((res) => {
      if (res.status !== 200) {
        this.$notify({
          type: 'error',
          title: 'Error',
          text: 'Error while fetching users',
        });
      }
    });
  },
  computed: {
    userFormat() {
      return this.$store.getters.getUsersNotInGroup.filter(option =>
        option.username
          .toString()
          .toLowerCase()
          .indexOf(this.username.toLowerCase()) >= 0,
      );
    },
  },
};
</script>
