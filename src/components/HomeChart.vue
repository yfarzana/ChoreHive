<template>
  <div style="display: flex; align-items: center; justify-content: center">
    <canvas id="homeChart" width="500" height="500"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js/auto";

export default {
  name: "HomeChart",
  props: {
    usernames: Array,
    tasksByUser: Array,
    backgroundColor: Array,
    borderColor: Array,
  },
  mounted() {
    this.createChart();
  },
  methods: {
    /**
     * Creates chart
     */
    createChart() {
      var ctx = document.getElementById("homeChart").getContext("2d");
      var myChart = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: this.usernames,
          datasets: [
            {
              label: "# of Votes",
              data: this.tasksByUser,
              backgroundColor: this.backgroundColor,
              borderColor: this.borderColor,
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: false,
          plugins: {
            legend: {
              position: "bottom",
            },
            title: {
              display: true,
              text: "Task Completion Breakdown",
            },
          },
        },
      });
    },
  },
};
</script>

<style scoped>
</style>