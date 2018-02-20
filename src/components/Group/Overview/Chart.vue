<i18n>
{
  "en": {
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
/* eslint max-len: ["error", { "code": 200 }] */
import { Bar, mixins } from 'vue-chartjs';

export default {
  extends: Bar,
  props: ['chartData', 'type', 'title', 'color', 'options'],
  mixins: [mixins.reactiveProp],
  mounted() {
    if (this.type === 'completedAtMonth') {
      this.displayCompletedChart();
    } else if (this.type === 'completeByMonth') {
      this.displayDateLimitChart();
    }
  },
  methods: {
    displayCompletedChart() {
      const completedPerMonth = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      this.chartData.forEach((todo) => {
        if (todo.completedAtTime !== null) {
          const date = new Date(todo.completedAtTime);
          completedPerMonth[date.getMonth()] += 1;
        }
      });
      this.renderChart({
        labels: [this.$t('m1'), this.$t('m2'), this.$t('m3'), this.$t('m4'), this.$t('m5'), this.$t('m6'), this.$t('m7'), this.$t('m8'), this.$t('m9'), this.$t('m10'), this.$t('m11'), this.$t('m12')],
        datasets: [
          {
            label: this.title,
            backgroundColor: this.color,
            data: completedPerMonth,
          },
        ],
      }, this.options);
    },
    displayDateLimitChart() {
      const completedPerMonth = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      this.chartData.forEach((todo) => {
        const date = new Date(todo.completeByTime);
        completedPerMonth[date.getMonth()] += 1;
      });
      this.renderChart({
        labels: [this.$t('m1'), this.$t('m2'), this.$t('m3'), this.$t('m4'), this.$t('m5'), this.$t('m6'), this.$t('m7'), this.$t('m8'), this.$t('m9'), this.$t('m10'), this.$t('m11'), this.$t('m12')],
        datasets: [
          {
            label: this.title,
            backgroundColor: this.color,
            data: completedPerMonth,
          },
        ],
      }, this.options);
    },
  },
};
</script>
