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
