<template>
  <modalComp height="auto" name="createTodo">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ $t('modal_title') }}</p>
        <button class="delete" aria-label="close" @click="$modal.hide('createTodo')"></button>
      </header>
      <section class="modal-card-body setHeight">
        <div class="field">
          <label class="label has-text-centered">{{ $t('label_task') }}</label>
          <div class="control centeredForm">
            <input v-model="taskToAdd" class="input" type="text" :placeholder="$t('task_ph')">
          </div>
        </div>
        <div class="columns field">
          <div class="column is-offset-3 is-6">
            <label class="label has-text-centered">{{ $t('label_category') }}</label>
            <CategoryDropdown width="auto" :categories="allCategories" @setCategory="setCategory" />
          </div>
        </div>
        <div class="columns field">
          <div class="column is-offset-3 is-6">
            <label class="label has-text-centered">{{ $t('label_limit') }}</label>
            <DatePicker v-model="limitToAdd"></DatePicker>
          </div>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" @click="addTodo">{{ $t('add_btn') }}</button>
        <button class="button" @click="$modal.hide('createTodo')">{{ $t('cancel') }}</button>
      </footer>
  </modalComp>
</template>

<i18n>
{
  "en": {
    "modal_title": "Create a new todo",
    "task_ph": "Task",
    "label_task": "Task to complete",
    "label_category": "Set category",
    "label_limit": "Needs to be completed before",
    "add_btn": "Add todo",
    "cancel": "Cancel"
  },
  "fr": {
    "modal_title": "Ajouter une nouvelle tâche",
    "task_ph": "Tâche",
    "label_task": "Tâche à completer",
    "label_category": "Catégorie de la tâche",
    "label_limit": "À compléter avant",
    "add_btn": "Ajouter tâche",
    "cancel": "Annuler"
  }
}
</i18n>

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
      test: ['1'],
    };
  },
  methods: {
    add() {
      this.test.push('test');
    },
    addTodo() {
      if (this.taskToAdd !== '' && this.limitToAdd !== '' && this.categoryId !== '') {
        this.$store.dispatch('newTodo', {
          task: this.taskToAdd,
          completeByTime: this.limitToAdd.getTime(),
          categoryId: this.categoryId,
        }).then((res) => {
          this.$notify({
            type: 'success',
            title: 'Success',
            text: 'Todo has been added',
          });
          this.$modal.hide('createTodo');
          this.$socket.emit('todoChanges', {
            user: this.$store.getters.getUsername,
            action: `has created a new todo "${res.data.task}"`,
          });
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
    },
  },
};
</script>

<style>
.setHeight {
  min-height: 500px;
}
</style>
