<script>
/* eslint max-len: ["error", { "code": 200 }] */
import { Bar, mixins } from 'vue-chartjs';

export default {
  extends: Bar,
  props: ['tododata', 'type', 'title', 'color', 'options'],
  mixins: [mixins.reactiveProp],
  data() {
    return {
      //
    };
  },
  watch: {
    tododata() {
      if (this.type === 'completedAtMonth') {
        this.displayCompletedChart();
      } else if (this.type === 'completeByMonth') {
        this.displayDateLimitChart();
      }
    },
  },
  methods: {
    displayCompletedChart() {
      const completedPerMonth = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      this.tododata.forEach((todo) => {
        if (todo.completedAtTime !== null) {
          const date = new Date(todo.completedAtTime);
          completedPerMonth[date.getMonth()] += 1;
        }
      });
      this.renderChart({
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
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
      this.tododata.forEach((todo) => {
        const date = new Date(todo.completeByTime);
        completedPerMonth[date.getMonth()] += 1;
      });
      this.renderChart({
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
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
