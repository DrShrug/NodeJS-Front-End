<template>
  <tr>
    <th>{{ todo.categoryName }}</th>
    <td>{{ todo.task }}</td>
    <td>{{ completedOnTime }}</td>
    <td>{{ completedAt }}</td>
    <td>{{ limitToComplete }}</td>
  </tr>
</template>

<script>
export default {
  props: ['todo'],
  computed: {
    completedAt() {
      const date = new Date(this.todo.completedAtTime);
      return `${date.getDate()} ${this.getMonthName(date.getMonth())} ${date.getFullYear()}`;
    },
    limitToComplete() {
      const date = new Date(this.todo.completeByTime);
      return `${date.getDate()} ${this.getMonthName(date.getMonth())} ${date.getFullYear()}`;
    },
    completedOnTime() {
      const isLate = this.todo.completeByTime > this.todo.completedAtTime;
      return (isLate && this.todo.isCompleted === true ? 'On time' : 'Late');
    },
  },
  methods: {
    getMonthName(monthNum) {
      const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      return monthNames[monthNum];
    },
  },
};
</script>
