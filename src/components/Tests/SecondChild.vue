<template>
  <div class="box">
    <div :key="todo._id" v-for="todo in todos">
      {{todo.task}} - {{todo.categoryName}}
    </div>
  </div>
</template>

<script>
/* eslint no-undef: 0 */
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
    this.$store.dispatch('loadTodosFromAPI').then((data) => {
      console.log('Todos', data);
    }).catch(err => console.log(err));
    this.$store.dispatch('loadProfileOverview').then(res => console.log('Profile', res));
  },
  methods: {
  },
};
</script>
