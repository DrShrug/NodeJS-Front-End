<template>
  <table v-if="hasCompleted" class="table is-hoverable is-fullwidth">
    <thead>
      <tr>
        <th>{{ $t('table_category') }}</th>
        <th>{{ $t('table_task') }}</th>
        <th>{{ $t('table_status') }}</th>
        <th>{{ $t('table_at') }}</th>
        <th>{{ $t('table_by') }}</th>
      </tr>
    </thead>
    <tfoot>
      <tr>
        <th>{{ $t('table_category') }}</th>
        <th>{{ $t('table_task') }}</th>
        <th>{{ $t('table_status') }}</th>
        <th>{{ $t('table_at') }}</th>
        <th>{{ $t('table_by') }}</th>
      </tr>
    </tfoot>
    <tbody>
      <TableRow v-if="todo.isCompleted" :key="todo._id" v-for="todo in _.sortBy(data, ['completeByTime'])" :todo="todo"></TableRow>
    </tbody>
  </table>
  <div v-else>
    <p class="has-text-grey-dark is-size-3">{{ $t('table_empty') }}</p>
  </div>
</template>

<i18n>
{
  "en": {
    "table_category": "Category",
    "table_task": "Task",
    "table_status": "Completion status",
    "table_at": "Completed at",
    "table_by": "Needed to be done by",
    "table_empty": "No tasks has been completed yet"
  },
  "fr": {
    "table_category": "Catégorie",
    "table_task": "Tâche",
    "table_status": "État de la tâche",
    "table_at": "Complété à",
    "table_by": "Devait être complété avant",
    "table_empty": "Aucune tâche n'est complétée"
  }
}
</i18n>

<script>
import TableRow from './CompletionTableRow';

export default {
  components: {
    TableRow,
  },
  data() {
    return {
      data: this.$store.getters.allTodos,
    };
  },
  computed: {
    hasCompleted() {
      return this.data.filter(todo => todo.isCompleted).length > 0;
    },
  },
};
</script>

