<template>
  <div>
    <!-- Adding a new todo modal -->
    <AddTodoModal :class="{ 'is-active':addTodoModalActive }" :categories="categories" />

    <!-- Deleting a todo modal -->
    <DeleteTodoModal :class="{ 'is-active':removeTodoModalActive }" />

    <!-- Creating a new category modal -->
    <AddCategoryModal :class="{ 'is-active':modalCreateCategoryActive }" />

    <!-- Deleting a category modal -->
    <DeleteCategoryModal :class="{ 'is-active':modalDeleteCategoryActive }" />

    <!-- Small menu -->
    <div class="box top-rounded-border">
      <div class="field is-grouped">
        <p class="control">
          <a class="button is-primary" @click="addTodoModalActive = true">Add new todo</a>
        </p>
        <p class="control is-expanded">
          <a class="button is-primary" @click="modalCreateCategoryActive = true">Add new category</a>
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
    <TodoCategory @deleteCategory="confirmCategoryDeletion" @deleteTodo="deletionConfirmation" :wantCompletedFiltered="completedHidden" :key="category._id" v-for="category in categories" :category="category" :todos="todos.filter(todo => todo.categoryName === category.categoryName)"></TodoCategory>
    
    <!-- Footer -->
    <div class="boxSetMargin bottom-rounded-border">
      Nothing to see here
    </div>
  
  </div>
</template>

<script>
import axios from 'axios';
import TodoCategory from '@/components/TodoApp/TodoCategory';
import AddCategoryModal from '@/components/TodoApp/Modals/CreateCategory';
import AddTodoModal from '@/components/TodoApp/Modals/CreateTodo';
import DeleteTodoModal from '@/components/TodoApp/Modals/DeleteTodo';
import DeleteCategoryModal from '@/components/TodoApp/Modals/DeleteCategory';


export default {
  components: {
    TodoCategory,
    AddCategoryModal,
    AddTodoModal,
    DeleteTodoModal,
    DeleteCategoryModal,
  },
  data() {
    return {
      todos: [],
      baseTodoURL: 'https://nodejs-vue-js-todo.herokuapp.com/todos',
      addTodoModalActive: false,
      removeTodoModalActive: false,
      modalCreateCategoryActive: false,
      modalDeleteCategoryActive: false,
      completedHidden: false,
      todoToDelete: null,
      categoryToDelete: null,
      categories: [],
    };
  },
  created() {
    this.getAllTodos();
    this.getAllCategories();
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
    addTodoModalOff() {
      this.addTodoModalActive = false;
    },
    deletionConfirmation(id) {
      this.todoToDelete = id;
      this.removeTodoModalActive = true;
    },
    cancelDelete() {
      this.todoToDelete = null;
      this.removeTodoModalActive = false;
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
        this.removeTodoModalActive = false;
        this.getAllTodos();
        this.$parent.updateDBPopup('Todo has been deleted', 'is-success', 'Success');
      });
    },
    confirmCategoryDeletion(id) {
      this.categoryToDelete = id;
      this.modalDeleteCategoryActive = true;
    },
    cancelCategoryDelete() {
      this.categoryToDelete = null;
      this.modalDeleteCategoryActive = false;
    },
    deleteCategory() {
      axios({
        method: 'DELETE',
        url: `https://nodejs-vue-js-todo.herokuapp.com/categories/${this.categoryToDelete}`,
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        headers: {
          'x-auth': sessionStorage.getItem('token'),
        },
      }).then(() => {
        this.categoryToDelete = null;
        this.modalDeleteCategoryActive = false;
        this.getAllCategories();
        this.getAllTodos();
        this.$parent.updateDBPopup('Category has been deleted', 'is-danger', 'Success');
      });
    },
    closeCategoryModal() {
      this.modalCreateCategoryActive = false;
      this.newCategoryName = '';
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

    addNewTodo(todo) {
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
          task: todo.task,
          completeByTime: todo.completeByTime,
          _category: todo.categoryId,
          categoryName: todo.categoryName,
        },
      }).then(() => {
        this.$parent.updateDBPopup('Task has been added', 'is-success', 'Success');
        this.taskToAdd = '';
        this.limitToAdd = '';
        this.getAllTodos();
      }).catch(() => {
        // console.log(e);
      });
    },
    getAllCategories() {
      this.categories = [];
      axios.get('https://nodejs-vue-js-todo.herokuapp.com/categories', {
        headers: {
          'x-auth': sessionStorage.getItem('token'),
        },
      }).then((response) => {
        response.data.categories.forEach(category => this.categories.push(category));
      }).catch((e) => {
        if (e.response.status === 401) {
          this.$router.push('/');
        } else {
          this.$parent.updateDBPopup('Things ain\'t working', 'is-danger', 'Warning');
        }
      });
    },
    createNewCategory(name) {
      axios({
        method: 'POST',
        url: 'https://nodejs-vue-js-todo.herokuapp.com/categories',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        headers: {
          'x-auth': sessionStorage.getItem('token'),
        },
        data: {
          categoryName: name,
        },
      }).then(() => {
        this.$parent.updateDBPopup('Category has been created', 'is-success', 'Success');
        this.modalCreateCategoryActive = false;
        this.getAllCategories();
      });
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
 