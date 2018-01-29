<template>
  <div class="box is-borderless boxMarginFix">
    <p class="has-text-grey-dark is-size-4 has-text-left">
      <span class="categoryName is-unselectable" @click="switchVisibility">
        {{category.categoryName}}
        <span class="icon">
          <i class="fa" aria-hidden="true" :class="hiddenOrEmpty ? 'fa-caret-down' : 'fa-caret-up'"></i>
        </span>
      </span>
      
      <a class="delete is-pulled-right" @click="deleteCategory"></a>
    </p>
    <div :class="{ 'is-hidden':hiddenOrEmpty }">
      <hr class="navbar-divider">
      <div class="column is-11 is-offset-1">
        <TodoItem v-for="todo in _.sortBy(todos, ['isCompleted', 'completeByTime'])" :todoObj="todo" class="is-marginless is-radiusless" :key="todo._id"></TodoItem>
      </div>
    </div>
  </div>
</template>

<script>
import TodoItem from '@/components/TodoApp/TodoItem';

export default {
  /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
  props: ['todos', 'category'],
  components: { TodoItem },
  data() {
    return {
      hideCategoryTodos: false,
    };
  },
  computed: {
    hiddenOrEmpty() {
      return this.hideCategoryTodos || this.todos.length === 0;
    },
  },
  methods: {
    switchVisibility() {
      this.hideCategoryTodos = !this.hideCategoryTodos;
    },
    deleteCategory() {
      this.$modal.show('deleteCategory', { idToDelete: this.category._id });
    },
  },
};
</script>

<style>
.boxMarginFix {
  margin-top: 0;
}
.categoryName {
  cursor: pointer;
}
</style>
