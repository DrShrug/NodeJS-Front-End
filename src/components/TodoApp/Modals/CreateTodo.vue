<template>
  <modalComp height="auto" name="createTodo" :adaptive="true" :scrollable="true">
      <header class="modal-card-head">
        <p class="modal-card-title">Add a new todo</p>
        <button class="delete" aria-label="close" @click="$modal.hide('createTodo')"></button>
      </header>
      <section class="modal-card-body setHeight">
        <div class="field">
          <label class="label has-text-centered">Task to complete</label>
          <div class="control centeredForm">
            <input v-model="taskToAdd" class="input" type="text" placeholder="Task">
          </div>
        </div>
        <div class="columns field">
          <div class="column is-offset-3 is-6">
            <label class="label has-text-centered">Task category</label>
            <CategoryDropdown width="auto" :categories="allCategories" @setCategory="setCategory" />
          </div>
        </div>
        <div class="columns field">
          <div class="column is-offset-3 is-6">
            <label class="label has-text-centered">Needs to be completed before</label>
            <DatePicker v-model="limitToAdd"></DatePicker>
          </div>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" @click="addTodo">Add</button>
        <button class="button" @click="$modal.hide('createTodo')">Cancel</button>
      </footer>
  </modalComp>
</template>

<script>
import DatePicker from 'vuejs-datepicker';
import CategoryDropdown from '@/components/TodoApp/Modals/TodoCategoryDropdown';

export default {
  components: { DatePicker, CategoryDropdown },
  computed: {
    allCategories() {
      return this.$store.getters.allCategories;
    },
  },
  data() {
    return {
      taskToAdd: '',
      limitToAdd: '',
      categoryId: '',
      categoryName: '',
      test: ['1'],
    };
  },
  methods: {
    add() {
      this.test.push('test');
    },
    addTodo() {
      if (this.taskToAdd !== '' && this.limitToAdd !== '' && this.categoryId !== '' && this.categoryName !== '') {
        this.$store.dispatch('newTodo', {
          task: this.taskToAdd,
          completeByTime: this.limitToAdd.getTime(),
          categoryId: this.categoryId,
          categoryName: this.categoryName,
        }).then(() => {
          this.$notify({
            type: 'success',
            title: 'Success',
            text: 'Todo has been added',
          });
          this.$modal.hide('createTodo');
        }).catch(() => {
          this.$notify({
            type: 'error',
            title: 'Error',
            text: 'Category already exists',
          });
        });
      } else {
        this.$notify({
          type: 'error',
          title: 'Error',
          text: 'All fields must be filled',
        });
      }
    },
    setCategory(category) {
      this.categoryId = category.id;
      this.categoryName = category.name;
    },
  },
};
</script>

<style>
.setHeight {
  min-height: 500px;
}
</style>
