<template>
  <div>
    <section class="hero is-success is-fullheight">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h2 class="crossed_out">
            <span class="grouplist_header">{{ $t('your_groups') }}</span>
          </h2>
          <div class="column is-4" style="margin:auto">
            <Group :key="group._id" v-for="group in $store.getters.getGroups" :group="group" @click.native="selectGroup(group)" />
          </div>
          <hr class="group-hr">
          <input type="button" :value="$t('create_group')" class="button is-success" @click="$modal.show('createGroup')">
          <input type="button" :value="$t('logout')" class="button is-danger" @click="logout">
        </div>
      </div>
    </section>
  </div>
</template>

<i18n>
{
  "en": {
    "your_groups": "Your groups",
    "create_group": "Create group",
    "logout": "Logout"
  },
  "fr": {
    "your_groups": "Vos groupes",
    "create_group": "Créer un groupe",
    "logout": "Déconnexion"
  }
}
</i18n>

<script>
/* eslint no-underscore-dangle: 0 */
import Group from '@/components/Group/Group';

export default {
  components: {
    Group,
  },
  data() {
    return {
      data: this.$store.getters.getGroups,
    };
  },
  mounted() {
    this.$store.dispatch('removeGroupSelection');
    this.$store.dispatch('getGroups').then((res) => {
      if (res.status !== 200) {
        this.$router.push('/');
      }
    });
  },
  sockets: {
    groupChanges() {
      this.$store.dispatch('getGroups');
    },
  },
  methods: {
    selectGroup(group) {
      this.$store.dispatch('setGroup', { groupId: group }).then(() => {
        if (this.$store.getters.getSelectedGroup) {
          this.$router.push('/todo');
        }
      });
    },
    logout() {
      this.$store.dispatch('userLogout').then(() => {
        this.$router.push('/');
      });
    },
  },
};
</script>


<style>
.crossed_out {
  width:100%;
  text-align:center;
  border-bottom: 1px solid #dbdbdb;
  line-height:0.1em;
  margin:10px 0 20px;
}
.grouplist_header {
  padding: 0 10px;
  background: #272733;
}
.hero.is-success {
  background:#272733;
}
</style>
