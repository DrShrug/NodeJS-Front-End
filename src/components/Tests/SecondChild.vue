<template>
  <div class="box">
    <div :key="todo._id" v-for="todo in todos">
      {{todo.task}} - {{todo.categoryName}}
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      id: null,
      name: '',
    };
  },
  computed: mapState([
    'todos',
  ]),
  mounted() {
    this.$store.dispatch('loadTodosFromAPI').then(() => {
      alert('mounted');
    });
  },
  methods: {
  },
};
</script>
