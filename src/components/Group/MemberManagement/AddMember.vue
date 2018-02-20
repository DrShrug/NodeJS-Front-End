<template>
  <section>
    <b-field :label="$t('search_label')">
        <b-autocomplete
          v-model="username"
          :placeholder="$t('search_placeholder')"
          :keep-first="false"
          :open-on-focus="true"
          :data="userFormat"
          field="username"
          @select="option => selected = option">

          <template slot-scope="props">
            <div class="media">
              <div class="media-left">
                <div class="image is-48x48">
                  <img src="https://png.icons8.com/ultraviolet/2x/person-male.png">
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

<i18n>
{
  "en": {
    "search_label": "Find a user by their username",
    "search_placeholder": "Search by username"
  },
  "fr": {
    "search_label": "Trouver un utilisateur par son nom d'utilisateur",
    "search_placeholder": "Recherche par nom d'utilisateur"
  }
}
</i18n>

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
