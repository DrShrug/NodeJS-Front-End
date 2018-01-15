<template>
  <div>
    <!-- Adding a new todo modal -->
    <div class="modal" :class="{ 'is-active' : modalAddIsActive }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Add a new todo</p>
          <button class="delete" aria-label="close" @click="addModalOff"></button>
        </header>
        <div class="modal-card-body" style="height:480px">
          <label class="label">Task to complete</label>
          <input v-model="taskToAdd" class="input" type="text" placeholder="Task">
          <div class="columns">
            <div class="column is-3"></div>
            <div class="column is-6">
              <label class="label">Needs to be completed before</label>
              <DatePicker v-model="limitToAdd"></DatePicker>
            </div>
          </div>
        </div>
        <footer class="modal-card-foot">
          <button class="button is-success" @click="addNewTodo">Add</button>
          <button class="button" @click="addModalOff">Cancel</button>
        </footer>
      </div>
    </div>

    <!-- Deleting a todo modal -->
    <div class="modal" :class="{ 'is-active' : modalRemoveIsActive}">
      <div class="modal-background"></div>
      <div class="modal-content">
        <div class="box is-marginless top-rounded-border">
          <p class="has-text-grey-dark is-size-3">Confirmation</p>
          <hr class="navbar-divider half-size">
          <p class="has-text-grey-dark is-size-5">Are you sure you want to delete this?</p>
        </div>
        <footer class="modal-card-foot">
          <button class="button is-danger" @click="deleteConfirmed">Delete</button>
          <button class="button" @click="cancelDelete">Cancel</button>
        </footer>
      </div>
      <button class="modal-close is-large" aria-label="close" @click="cancelDelete"></button>
    </div>

    <!-- Small menu -->
    <div class="box top-rounded-border">
      <div class="field is-grouped">
        <p class="control is-expanded">
          <a class="button is-primary" @click="modalAddIsActive = true">Add new todo</a>
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
    <TodoItem @deleteTodo="deletionConfirmation" v-for="todo in todos" :wantCompletedFiltered="completedHidden" :todoObj="todo" class="is-marginless is-radiusless" :key="todo._id"></TodoItem>
    
    <!-- Footer -->
    <div class="boxSetMargin bottom-rounded-border">
      Nothing to see here
    </div>
  
  </div>
</template>

<script>
import axios from 'axios';
import TodoItem from '@/components/TodoApp/TodoItem';
import DatePicker from 'vuejs-datepicker';

export default {
  data() {
    return {
      todos: [],
      baseTodoURL: 'https://nodejs-vue-js-todo.herokuapp.com/todos',
      localDevURL: 'http://localhost:3000/todos',
      modalAddIsActive: false,
      modalRemoveIsActive: false,
      taskToAdd: '',
      limitToAdd: '',
      completedHidden: false,
      todoToDelete: null,
    };
  },
  components: {
    TodoItem,
    DatePicker,
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
    addModalOff() {
      this.modalAddIsActive = false;
      this.taskToAdd = '';
      this.limitToAdd = '';
    },
    deletionConfirmation(id) {
      this.todoToDelete = id;
      this.modalRemoveIsActive = true;
    },
    deleteConfirmed() {
      axios({
        method: 'DELETE',
        url: `https://nodejs-vue-js-todo.herokuapp.com/todos/${this.todoToDelete}`,
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        headers: {
          'x-auth': sessionStorage.getItem('token'),
        },
      }).then(() => {
        this.todoToDelete = null;
        this.modalRemoveIsActive = false;
        this.getAllTodos();
        this.$parent.updateDBPopup('Todo has been deleted', 'is-danger', 'Success');
      });
    },
    cancelDelete() {
      this.todoToDelete = null;
      this.modalRemoveIsActive = false;
    },
    getAllTodos() {
      this.todos = [];
      axios.get(this.baseTodoURL, {
        headers: {
          'x-auth': sessionStorage.getItem('token'),
        },
      }).then((response) => {
        for (let i = 0; i < response.data.todos.length; i += 1) {
          this.todos.push(response.data.todos[i]);
        }
      }).catch((e) => {
        if (e.response.status === 401) {
          this.$router.push('/');
        } else {
          this.$parent.updateDBPopup('You shouldn\'t be seeing this, please contact the developper',
          'is-danger', 'Warning');
        }
      });
    },

    addNewTodo() {
      if (this.taskToAdd !== '' && this.limitToAdd !== '') {
        this.modalAddIsActive = false;
        axios({
          method: 'POST',
          url: this.baseTodoURL,
          contentType: 'application/json; charset=utf-8',
          dataType: 'json',
          headers: {
            'x-auth': sessionStorage.getItem('token'),
          },
          data: {
            task: this.taskToAdd,
            completeByTime: new Date(this.limitToAdd).getTime(),
          },
        }).then(() => {
          this.$parent.updateDBPopup('Task has been added', 'is-success', 'Success');
          this.taskToAdd = '';
          this.limitToAdd = '';
          this.getAllTodos();
        }).catch(() => {
          // console.log(e);
        });
      } else {
        this.$parent.updateDBPopup('All fields are required', 'is-danger', 'Warning');
      }
    },
  },
};
</script>
<style>
.top-rounded-border {
  border-radius: 10px 10px 0 0
}

.bottom-rounded-border {
  border-radius: 0 0 10px 10px
}

.boxSetMargin {
  margin-top: 24px;
  background-color: white;
  -webkit-box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
          box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
  color: #4a4a4a;
  display: block;
  padding: 1.25rem;
}

.noborder {
  border: none;
}

.vdp-datepicker div input {
  -moz-appearance: none;
  -webkit-appearance: none;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  border: 1px solid transparent;
  border-radius: 3px;
  -webkit-box-shadow: none;
          box-shadow: none;
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: inline-flex;
  font-size: 1rem;
  height: 2.25em;
  -webkit-box-pack: start;
      -ms-flex-pack: start;
          justify-content: flex-start;
  line-height: 1.5;
  padding-bottom: calc(0.375em - 1px);
  padding-left: calc(0.625em - 1px);
  padding-right: calc(0.625em - 1px);
  padding-top: calc(0.375em - 1px);
  position: relative;
  vertical-align: top;
  background-color: white;
  border-color: #dbdbdb;
  color: #363636;
  -webkit-box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.1);
          box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.1);
  max-width: 100%;
  width: 100%;
  font-family: BlinkMacSystemFont, -apple-system, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
}
</style>
 
