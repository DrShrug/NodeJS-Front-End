<template>
  <div>
    <Navbar />
    <div class="sidemenu-relative">
      <Sidemenu ref="sidemenu" class="sidemenu" />
      <div class="container box spacer is-shadowless sidemenu-relative">
        <nav class="breadcrumb" aria-label="breadcrumbs">
          <ul>
            <li>
              <a href="/todo">
                <span class="icon is-small">
                  <i class="fa fa-list-ul"></i>
                </span>
                <span>{{ $t('todo_app') }}</span>
              </a>
            </li>
            <li>
              <a href="/group/overview">
                <span class="icon is-small">
                  <i class="fa fa-users"></i>
                </span>
                <span>{{ $t('group') }}</span>
              </a>
            </li>
            <li class="is-active">
              <a href="#">
                <span class="icon is-small">
                  <i class="fa fa-user-plus"></i>
                </span>
                <span>{{ $t('add_members') }}</span>
              </a>
            </li>
          </ul>
        </nav>
        
        <section class="info-tiles box">
          <div class="tile-header container">
            <p class="has-text-grey-dark is-size-4">{{ $t('add_members') }}</p>
            <hr class="navbar-divider half-size">
          </div>
          <AddMember @setUserToAdd="setUser" />
          <button class="btn-spacing button is-success" @click="addUserToGroup">{{ $t('add_user') }}</button>
        </section>
      </div>
    </div>
  </div>
</template>

<i18n>
{
  "en": {
    "todo_app": "Todo App",
    "group": "Group",
    "add_members": "Add members",
    "add_user": "Add user"
  },
  "fr": {
    "todo_app": "Gestionnaire des tâches",
    "group": "Groupe",
    "add_members": "Ajout de membres",
    "add_user": "Ajouter utilisateur"
  }
}
</i18n>

<script>
import Navbar from '@/components/Navbar';
import Sidemenu from '@/components/Sidemenu';
import AddMember from '@/components/Group/MemberManagement/AddMember';
/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */

export default {
  components: {
    Navbar,
    Sidemenu,
    AddMember,
  },
  data: () => ({
    userSelected: null,
  }),
  methods: {
    setUser(user) {
      this.userSelected = user;
    },
    addUserToGroup() {
      this.$store.dispatch('addMemberToGroup', { memberId: this.userSelected._id }).then((res) => {
        this.userSelected = null;
        if (res.status !== 200) {
          this.$notify({
            type: 'error',
            title: 'Error',
            text: 'Error adding user to group',
          });
        } else {
          this.$notify({
            type: 'success',
            title: 'Success',
            text: `User "${JSON.parse(res.request.response).username}" has been added to the group`,
          });
          this.$socket.emit('groupChanges');
        }
      });
    },
  },
};
</script>

<style scoped>
  .spacer {
    background-color: transparent;
  }
  .info-tiles {
    margin: 1rem 0;
  }
  .info-tiles .subtitle {
    font-weight: 300;
  }
  .tile-header {
    margin-bottom: 20px;
    width: 50%;
  }
  .sidemenu {
    position: absolute;
    top: 0;
    z-index: 10;
  }
  .btn-spacing {
    margin-top: 20px;
  }
</style>
