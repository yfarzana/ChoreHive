<template>
  <div>
    <div class="modal-contents">
      <h2>Swap Request</h2>
      <!-- Sort drop down -->
      <h3 class="text-style">Please Check Task(s) to Swap:</h3>
      <select name="sort" id="sort" class="drop-down" @change="sortTasks">
        <option value="difficulty">Sort by (Difficulty)</option>
        <option value="task">Sort by (Task Name)</option>
        <option value="owner">Sort by (Owner)</option>
        <option value="due-date">Sort by (Due Date)</option>
      </select>

      <!-- Checkbox list -->
      <div :key="task.id" v-for="(task, index) in tasks" class="list">
        <SwapRequestTask :task="task" :swapTasks="swapTasks" :index="index" />
      </div>

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
        <button value="Post Swap Request" class="post-btn" @click="onSubmit">
          Post Swap Request
        </button>
        <button value="Cancel" class="cancel-btn" @click="cancel">
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import SwapRequestTask from "../components/SwapRequestTask";

export default {
  name: "SwapRequest",
  components: { SwapRequestTask },
  props: {
    currentUser: String, // Name of user who is making swap request
    tasks: Array, //Tasks not owned by current user
    taskToSwap: Object, // Task that the current user owns and wants to swap
    swapTasks: Array, //Array of booleans used for checkboxes
  },
  data() {
    return {
      ok: false,
    };
  },
  methods: {
    /**
     * Sorts tasks by difficulty, task, owner, or due date
     */
    sortTasks(event) {
      if (event.target.value == "difficulty") {
        this.tasks = this.tasks.sort((t1, t2) =>
          t1.difficulty < t2.difficulty ? -1 : 1
        );
      } else if (event.target.value == "task") {
        this.tasks = this.tasks.sort((t1, t2) => (t1.name < t2.name ? -1 : 1));
      } else if (event.target.value == "owner") {
        this.tasks = this.tasks.sort((t1, t2) =>
          t1.owner < t2.owner ? -1 : 1
        );
      } else if (event.target.value == "due-date") {
        this.tasks = this.tasks.sort((t1, t2) =>
          t1.due_date < t2.due_date ? -1 : 1
        );
      }
    },
    /**
     * Handles posting task swap to backend JSON
     */
    async onSubmit(e) {
      e.preventDefault();

      var atLeastOne = false;
      this.swapTasks.forEach((swap) => {
        if (swap) {
          atLeastOne = true;
        }
      });

      if (!atLeastOne) {
        alert("Please select at least one task to swap");
      } else if (!this.ok) {
        alert("Please confirm that you accept the requirement of approval");
      } else {
        var data = {};
        var otherOwner = "";

        // Find which tasks need to be swapped and set current user as owner
        this.swapTasks.forEach(async (swap, i) => {
          if (swap) {
            console.log(i, this.tasks);
            otherOwner = this.tasks[i].owner;
            this.tasks[i].owner = this.currentUser;

            const res = await fetch(
              "http://localhost:5000/tasks/" + this.tasks[i].id,
              {
                method: "PUT",
                headers: {
                  "Content-type": "application/json",
                },
                body: JSON.stringify(this.tasks[i]),
              }
            );

            data = await res.json();
          }
        });

        // Assigns current task to other owner
        if (otherOwner) {
          this.taskToSwap.owner = otherOwner;

          const res = await fetch(
            "http://localhost:5000/tasks/" + this.taskToSwap.id,
            {
              method: "PUT",
              headers: {
                "Content-type": "application/json",
              },
              body: JSON.stringify(this.taskToSwap),
            }
          );

          data = await res.json();
        }

        this.$emit("save");
      }
    },
    /**
     * Used to close modal
     */
    cancel() {
      this.$emit("close");
    },
  },
};
</script>


<style scoped>
.list {
  display: flex;
}
</style>