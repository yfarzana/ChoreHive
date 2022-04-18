<template>
  <div>
    <div class="modal-contents">
      <h2>Make-up Request</h2>
      <h4 class="text-style">When would you like to make-up the task by?</h4>
      <!-- Datepicker -->
      <input
        type="date"
        :value="dateToYYYYMMDD(date)"
        @input="date = $event.target.valueAsDate"
      />

      <!-- Approval agreement -->
      <h4 class="text-style">
        Your request will require approval from your roommates, is that OK?
      </h4>
      <div style="display: flex">
        <input type="checkbox" id="ok-checkbox" v-model="ok" />
        <label for="ok-checkbox" class="bottom">OK</label>
      </div>

      <!-- Bottom buttons -->
      <div class="bottom">
        <button @click="onSubmit" value="Post Make-Up Request" class="post-btn">
          Post Make-Up Request
        </button>
        <button @click="cancel" value="Cancel" class="cancel-btn">
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MakeupRequest",
  props: {
    task: Object, // Current task
  },
  data() {
    return {
      ok: false,
      date: new Date(),
    };
  },
  methods: {
    /**
     * Handles updating date of task in backend JSON
     */
    async onSubmit(e) {
      e.preventDefault();

      if (!this.ok) {
        alert("Please confirm that you accept the requirement of approval");
      } else {
        this.task.due_date = this.dateToMMDD(this.date);
        const res = await fetch("http://localhost:5000/tasks/" + this.task.id, {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(this.task),
        });
        const data = await res.json();

        this.$emit("save");
      }
    },
    /**
     * Used to close modal
     */
    cancel() {
      this.$emit("close");
    },
    /**
     * Converts date to YYYYMMDD format
     */
    dateToYYYYMMDD(d) {
      return d && new Date(d.getTime()).toISOString().split("T")[0];
    },
    /**
     * Converts date to MM/DD format
     */
    dateToMMDD(d) {
      var dateArray = this.dateToYYYYMMDD(d).toString().split("-");
      return dateArray[1] + "/" + dateArray[2];
    },
  },
};
</script>

<style scoped>
</style>