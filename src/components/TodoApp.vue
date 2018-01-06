<template>
  <div>
    <!-- Adding a new todo -->
    <div class="modal" :class="{ 'is-active' : modalIsActive}">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Add a new todo</p>
          <button class="delete" aria-label="close" @click="turnModalOff"></button>
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
          <button class="button" @click="turnModalOff">Cancel</button>
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
    
    <!-- Footer -->
    <div class="boxSetMargin bottom-rounded-border">
      Nothing to see here
    </div>
  
  </div>
</template>

<script>
import axios from 'axios';
import TodoItem from '@/components/TodoItem';
import DatePicker from 'vuejs-datepicker';

export default {
  data() {
    return {
      todos: [],
      baseTodoURL: 'https://nodejs-vue-js-todo.herokuapp.com/todos',
      localDevURL: 'http://localhost:3000/todos',
      modalIsActive: false,
      taskToAdd: '',
      limitToAdd: '',
      completedHidden: false,
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
    turnModalOff() {
      this.modalIsActive = false;
      this.taskToAdd = '';
      this.limitToAdd = '';
    },

    getAllTodos() {
      this.todos = [];
      axios.get(this.baseTodoURL, {
        headers: {
          'x-auth': localStorage.getItem('token'),
        },
      }).then((response) => {
        console.log(response);
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
        this.modalIsActive = false;
        axios({
          method: 'POST',
          url: this.baseTodoURL,
          contentType: 'application/json; charset=utf-8',
          dataType: 'json',
          headers: {
            'x-auth': localStorage.getItem('token'),
          },
          data: {
            task: this.taskToAdd,
            completedDateLimit: new Date(this.limitToAdd).getTime(),
          },
        }).then(() => {
          this.$parent.updateDBPopup('Task has been added', 'is-success', 'Success');
          this.taskToAdd = '';
          this.limitToAdd = '';
          this.getAllTodos();
        }).catch((e) => { console.log(e); });
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
  border-radius: 5px;
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
 
