<template>
  <div>
    <!-- Adding a new todo -->
    <div class="modal" :class="{ 'is-active' : modalIsActive}">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Add a new todo</p>
          <button class="delete" aria-label="close" @click="modalIsActive = false"></button>
        </header>
        <section class="modal-card-body">
          <label class="label">Task to complete</label>
          <input v-model="taskToAdd" class="input" type="text" placeholder="Task">
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" @click="addNewTodo">Add</button>
          <button class="button" @click="modalIsActive = false">Cancel</button>
        </footer>
      </div>
    </div>

    <!-- Small menu -->
    <div class="box top-rounded-border">
      <div class="field is-grouped">
        <p class="control is-expanded">
          <a class="button is-primary" @click="modalIsActive = true">Add new todo</a>
        </p>
        <p class="control">
          <a class="button noborder">
            <a class="has-text-centered" @click="completedHidden = !completedHidden">
              {{ toggleMessage }}
            </a>
          </a>
        </p>
      </div>
    </div>

    <!-- Todos -->
    <TodoItem v-for="todo in todos" :wantCompletedFiltered="completedHidden" :todoObj="todo" class="is-marginless is-radiusless" :key="todo._id"></TodoItem>
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
      modalIsActive: false,
      taskToAdd: '',
      completedHidden: false,
    };
  },
  components: {
    TodoItem,
  },
  created() {
    this.getAllTodos();
  },
  computed: {
    toggleMessage() {
      if (!this.completedHidden) {
        return 'Hide completed tasks';
      }
      return 'Show completed tasks';
    },
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

    addNewTodo() {
      this.modalIsActive = false;
      axios({
        method: 'POST',
        url: this.baseTodoURL,
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: {
          task: this.taskToAdd,
        },
      }).then(() => {
        this.taskToAdd = '';
        this.getAllTodos();
      });
    },
  },
};
</script>
<style>
.top-rounded-border {
  border-radius: 10px 10px 0 0
}

.noborder {
  border: none;
}
</style>
 
