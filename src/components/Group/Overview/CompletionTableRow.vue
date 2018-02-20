<template>
  <tr>
    <td>{{ categoryName }}</td>
    <td>{{ todo.task }}</td>
    <td>{{ completedOnTime }}</td>
    <td>{{ completedAt }}</td>
    <td>{{ limitToComplete }}</td>
  </tr>
</template>

<i18n>
{
  "en": {
    "ontime": "On time",
    "late": "Late",
    "m1": "January",
    "m2": "February",
    "m3": "March",
    "m4": "April",
    "m5": "May",
    "m6": "Juin",
    "m7": "July",
    "m8": "August",
    "m9": "September",
    "m10": "October",
    "m11": "November",
    "m12": "December"
  },
  "fr": {
    "ontime": "À temps",
    "late": "En retard",
    "m1": "Janvier",
    "m2": "Février",
    "m3": "Mars",
    "m4": "Avril",
    "m5": "Mai",
    "m6": "Juin",
    "m7": "Juillet",
    "m8": "Août",
    "m9": "Septembre",
    "m10": "Octobre",
    "m11": "Novembre",
    "m12": "Décembre"
  }
}
</i18n>

<script>
/* eslint no-underscore-dangle: 0 */

export default {
  props: ['todo'],
  computed: {
    categoryName() {
      return this.$store.getters.allCategories.filter(category =>
        category._id === this.todo._category)[0].categoryName;
    },
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
      const monthNames = [this.$t('m1'), this.$t('m2'), this.$t('m3'), this.$t('m4'), this.$t('m5'), this.$t('m6'), this.$t('m7'), this.$t('m8'), this.$t('m9'), this.$t('m10'), this.$t('m11'), this.$t('m12')];
      return monthNames[monthNum];
    },
  },
};
</script>
