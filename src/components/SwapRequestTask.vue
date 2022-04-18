<template>
  <div>
    <input type="checkbox" :id="index" v-model="swapTasks[index]" />
    <label :for="index"
      >{{ task.name }} - {{ task.difficulty }} - {{ task.due_date }} ({{
        task.owner
      }})</label
    >
  </div>
</template>

<script>
export default {
  name: "SwapRequestTask",
  props: {
    task: Object,
    swapTasks: Array,
    index: Number,
  },
};
</script>

<style scoped>
</style>