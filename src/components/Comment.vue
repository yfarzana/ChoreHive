<template>
  <div class="comment">
    <h3>
      {{ comment }}
    </h3>
    <p style="margin-left: 15%">
      <b>-{{ owner }}</b>
    </p>
  </div>
</template>

<script>
export default {
  name: "Comment",
  props: { comment: String, owner: String },
};
</script>

<style scoped>
.comment {
  outline: auto;
  padding: 2%;
  margin-bottom: 2%;
  text-align: start;
  width: 100%;
}
</style>