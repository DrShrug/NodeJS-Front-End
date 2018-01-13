<template>
  <tr>
    <th>{{ pos }}</th>
    <td>{{ todo.task }}</td>
    <td>{{ completedOnTime }}</td>
    <td>{{ completedAt }}</td>
    <td>{{ limitToComplete }}</td>
  </tr>
</template>

<script>
export default {
  props: ['todo', 'pos'],
  computed: {
    completedAt() {
      const date = new Date(this.todo.completedTime);
      return `${date.getDate()} ${this.getMonthName(date.getMonth())} ${date.getFullYear()}`;
    },
    limitToComplete() {
      const date = new Date(this.todo.completedDateLimit);
      return `${date.getDate()} ${this.getMonthName(date.getMonth())} ${date.getFullYear()}`;
    },
    completedOnTime() {
      const isLate = this.todo.completedDateLimit > this.todo.completedTime;
      return (isLate && this.todo.completed === true ? 'On time' : 'Late');
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
