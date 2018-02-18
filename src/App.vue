<template>
  <div id="app">
    <router-view/>
    <notifications :max="3" :duration="1000" position="bottom right" />
    <createTodoModal />
    <createCategoryModal />
    <createGroupModal />
    <deleteTodoModal />
    <deleteCategoryModal />
    <deleteGroupModal v-if="$store.getters.getSelectedGroupObject" />
  </div>
</template>

<script>
  /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
  /* eslint max-len: 0 */

  import createTodoModal from '@/components/TodoApp/Modals/CreateTodo';
  import createCategoryModal from '@/components/TodoApp/Modals/CreateCategory';
  import createGroupModal from '@/components/Group/CreateGroup';
  import deleteTodoModal from '@/components/TodoApp/Modals/DeleteTodo';
  import deleteCategoryModal from '@/components/TodoApp/Modals/DeleteCategory';
  import deleteGroupModal from '@/components/Group/DeleteGroupModal';
  import 'font-awesome/css/font-awesome.css';
  import './assets/bulma.sass';
  

  export default {
    name: 'app',
    components: {
      createTodoModal,
      createCategoryModal,
      createGroupModal,
      deleteTodoModal,
      deleteCategoryModal,
      deleteGroupModal,
    },
    sockets: {
      // If user is kicked from group while browsing, redirect to group list
      kickedUser({ memberId, groupId }) {
        if (this.$store.getters.getSelectedGroupObject._id === groupId && this.$store.getters.getSelfId === memberId) {
          this.$router.push('/groups');
          this.$notify({
            type: 'error',
            title: 'Error',
            text: 'You have been removed from the group',
          });
        }
      },

      // Called when a group has been deleted
      groupDeleted(group) {
        if (group._id === this.$store.getters.getSelectedGroupObject._id) {
          this.$router.push('/groups');
          this.$notify({
            type: 'error',
            title: 'Error',
            text: 'The currently selected group has been deleted',
          });
        }
      },
  
    },
  };
</script>

<style>
html, body, #app, #page, #main-container {
  height: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.sidemenu-relative {
  position: relative;
}
</style>
