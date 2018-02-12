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
                <span>Todo App</span>
              </a>
            </li>
            <li>
              <a href="/group/overview">
                <span class="icon is-small">
                  <i class="fa fa-users"></i>
                </span>
                <span>Group</span>
              </a>
            </li>
            <li class="is-active">
              <a href="#">
                <span class="icon is-small">
                  <i class="fa fa-user-plus"></i>
                </span>
                <span>Remove Members</span>
              </a>
            </li>
          </ul>
        </nav>
        
        <section class="info-tiles box">
          <div class="tile-header container">
            <p class="has-text-grey-dark is-size-4">Remove Members</p>
            <p class="has-text-grey is-size-6">{{ $store.getters.getSelectedGroupObject.groupName }}</p>
            <hr class="navbar-divider half-size">
          </div>
          <RemoveMember />
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar';
import Sidemenu from '@/components/Sidemenu';
import RemoveMember from '@/components/Group/RemoveMember';
/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */

export default {
  components: {
    Navbar,
    Sidemenu,
    RemoveMember,
  },
  data: () => ({
    userSelected: null,
  }),
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
            text: `User ${JSON.parse(res.request.response).username} has been added to the group`,
          });
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
