<template>
  <div id="app">
    <router-view/>
    <notifications :max="3" :duration="1000" position="bottom right" />
    <createTodoModal />
    <createCategoryModal />
    <deleteTodoModal />
    <deleteCategoryModal />
  </div>
</template>

<script>
  import createTodoModal from '@/components/TodoApp/Modals/CreateTodo';
  import createCategoryModal from '@/components/TodoApp/Modals/CreateCategory';
  import deleteTodoModal from '@/components/TodoApp/Modals/DeleteTodo';
  import deleteCategoryModal from '@/components/TodoApp/Modals/DeleteCategory';
  import 'font-awesome/css/font-awesome.css';
  import './assets/bulma.sass';
  

  export default {
    name: 'app',
    components: {
      createTodoModal,
      createCategoryModal,
      deleteTodoModal,
      deleteCategoryModal,
    },
  };
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
