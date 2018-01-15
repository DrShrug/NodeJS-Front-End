<template>
  <table v-if="hasCompleted" class="table is-hoverable is-fullwidth">
    <thead>
      <tr>
        <th>Position</th>
        <th>Task</th>
        <th>Completion status</th>
        <th>Completed at</th>
        <th>Needed to be done by</th>
      </tr>
    </thead>
    <tfoot>
      <tr>
        <th>Position</th>
        <th>Task</th>
        <th>Completion status</th>
        <th>Completed at</th>
        <th>Needed to be done by</th>
      </tr>
    </tfoot>
    <tbody>
      <TableRow v-if="todo.isCompleted" :key="todo._id" v-for="(todo, index) in data" :todo="todo" :pos="index"></TableRow>
    </tbody>
  </table>
</template>

<script>
import TableRow from './CompletionTableRow';

export default {
  components: {
    TableRow,
  },
  props: ['data'],
  computed: {
    hasCompleted() {
      return this.data.length > 0;
    },
  },
};
</script>

