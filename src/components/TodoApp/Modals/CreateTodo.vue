<template>
  <div class="modal" :class="{ 'is-active' : modalIsActive }">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Add a new todo</p>
        <button class="delete" aria-label="close" @click="addModalOff"></button>
      </header>
      <div class="modal-card-body" style="height:550px">
        <div class="field">
          <label class="label">Task to complete</label>
          <div class="control">
            <input v-model="taskToAdd" class="input" type="text" placeholder="Task">
          </div>
        </div>
        <div class="field">
          <CategoryDropdown :categories="allCategories" @setCategory="setCategory"></CategoryDropdown>
        </div>
        <div class="columns">
          <div class="column is-offset-3 is-6">
            <label class="label">Needs to be completed before</label>
            <DatePicker v-model="limitToAdd"></DatePicker>
          </div>
        </div>
      </div>
      <footer class="modal-card-foot">
        <button class="button is-success" @click="callParentMethodAddTodo">Add</button>
        <button class="button" @click="addModalOff">Cancel</button>
      </footer>
    </div>
    
  </div>
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
      modalIsActive: false,
      taskToAdd: '',
      limitToAdd: '',
      categoryId: '',
      categoryName: '',
    };
  },
  methods: {
    addModalOff() {
      this.taskToAdd = '';
      this.limitToAdd = '';
      this.categoryId = '';
      this.categoryName = '';
      this.$parent.addTodoModalOff();
    },
    callParentMethodAddTodo() {
      if (this.taskToAdd !== '' && this.limitToAdd !== '' && this.categoryId !== '' && this.categoryName !== '') {
        this.$parent.addNewTodo({
          task: this.taskToAdd,
          completeByTime: new Date(this.limitToAdd).getTime(),
          categoryId: this.categoryId,
          categoryName: this.categoryName,
        });
        this.addModalOff();
      } else {
        this.$parent.$parent.updateDBPopup('All fields are required', 'is-danger', 'Warning');
      }
    },
    setCategory(category) {
      this.categoryId = category.id;
      this.categoryName = category.name;
    },
  },
};
</script>
