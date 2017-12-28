<template>
  <div>
    <TodoItem v-for="todo in todos" :todoObj="todo" class="is-marginless is-radiusless" :key="todo._id"></TodoItem>
  </div>
</template>

<script>
import axios from 'axios';
import TodoItem from '@/components/TodoItem';

export default {
  data() {
    return {
      todos: [],
      baseTodoURL: 'https://nodejs-vue-js-todo.herokuapp.com/todos',
    };
  },
  components: {
    TodoItem,
  },
  created() {
    this.getAllTodos();
  },
  methods: {
    getAllTodos() {
      this.todos = [];
      axios.get(this.baseTodoURL).then((response) => {
        for (let i = 0; i < response.data.todos.length; i += 1) {
          this.todos.push(response.data.todos[i]);
        }
      });
    },
  },
};
</script>

