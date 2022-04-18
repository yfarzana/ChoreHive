<template>
  <div class="list_view_task">
    <!-- Swap request -->
    <div :class="displaySwap ? 'modal' : 'hide-modal'">
      <SwapRequest
        @close="closeSwap"
        @save="saveSwap"
        :taskToSwap="currTask"
        :tasks="otherTasks"
        :currentUser="currentUser"
        :swapTasks="swapTasks"
      />
    </div>

    <!-- Make up request -->
    <div :class="displayMakeup ? 'modal' : 'hide-modal'">
      <MakeupRequest @close="closeMakeup" @save="saveMakeup" :task="currTask" />
    </div>

    <!-- ViewTask -->
    <div :class="displayTask ? 'modal' : 'hide-modal'">
      <ViewTask
        @close="closeTask"
        :task="currTask"
        :currentUser="currentUser"
        :taskID="currTaskID"
        :comments="filteredComments"
        @openSwap="openSwap"
        @openMakeup="openMakeup"
      />
    </div>
    <select name="sort" id="sort" class="sort-drop-down" @change="sortTasks">
      <option value="due-date">Sort by (Due Date)</option>
      <option value="difficulty">Sort by (Difficulty)</option>
      <option value="task">Sort by (Task Name)</option>
      <option value="assignee">Sort by (Assignee)</option>
    </select>
    <div :key="category.id" v-for="category in categories">
      <h2>{{ category.name }}</h2>
      <table>
        <!-- <tbody> -->
        <tr>
          <th>Task Title</th>
          <th>Difficulty Points</th>
          <th>Deadline</th>
          <th>Completed?</th>
          <th>Actions</th>
        </tr>
        <tr
          v-bind:key="task.id"
          v-for="task in filterTasks(category)"
          :id="task.id"
        >
          <td style="cursor: pointer" @click="openTask(task.id)">
            {{ task.name }}
          </td>
          <td
            style="cursor: pointer"
            @click="openTask(task.id)"
            class="center_align"
          >
            {{ task.difficulty }}
          </td>
          <td style="cursor: pointer" @click="openTask(task.id)">
            {{ task.due_date }}
          </td>
          <td class="center_align">
            <input
              type="checkbox"
              v-on:change="markCompleted"
              v-model="task.completed"
              :id="task.id"
              class="check-box"
            />
          </td>
          <td>
            <input
              type="button"
              value="Swap"
              style="margin-right: 6%; cursor: pointer"
              @click="openSwap(task.id)"
              :id="task.id"
            />
            <input
              type="button"
              value="Make Up"
              @click="openMakeup(task.id)"
              :id="task.id"
              style="cursor: pointer"
            />
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import SwapRequest from "../views/SwapRequest.vue";
import MakeupRequest from "../views/MakeupRequest.vue";
import ViewTask from "../views/ViewTask.vue";

export default {
  name: "MyTasks",
  components: {
    SwapRequest,
    MakeupRequest,
    ViewTask,
  },
  props: {
    categories: Array,
    tasks: Array,
    currentUser: String,
    otherTasks: Array,
    allTasks: Array,
    swapTasks: Array, //Array of booleans used for checkboxes
    comments: Array, //Array of ALL comments
    householdTasks: Array, //All tasks for this household
  },
  data() {
    return {
      displaySwap: false,
      displayMakeup: false,
      currTask: {},
      currTaskID: -1,
      displayTask: false,
      filteredComments: [], //Comments specific to a task
    };
  },
  methods: {
    // Opens Swap Request Modal
    openSwap(taskID) {
      this.taskToSwap = this.allTasks[taskID];
      this.displaySwap = !this.displaySwap;
    },
    // Closes Swap Request Modal
    closeSwap() {
      this.displaySwap = !this.displaySwap;
    },
    // Closes Swap Request Modal and reloads page
    saveSwap() {
      this.displaySwap = !this.displaySwap;
      window.location.reload();
    },
    // Opens Makeup Request Modal
    openMakeup(taskID) {
      this.currTask = this.allTasks[taskID];
      this.displayMakeup = !this.displayMakeup;
    },
    // Closes Makeup Request Modal
    closeMakeup() {
      this.displayMakeup = !this.displayMakeup;
    },
    // Closes Makeup Request Modal and reloads page
    saveMakeup() {
      this.displayMakeup = !this.displayMakeup;
      window.location.reload();
    },
    // Opens View Task Modal
    openTask(taskID) {
      this.currTaskID = taskID;
      this.currTask = this.allTasks[this.currTaskID];

      this.filteredComments = [];
      this.comments.forEach((comment) => {
        if (comment.taskID === this.currTaskID) {
          this.filteredComments.push(comment);
        }
      });

      this.displayTask = !this.displayTask;
    },
    // Closes View Task Modal
    closeTask() {
      this.displayTask = !this.displayTask;
    },
    /**
     * Sorts tasks by difficulty, task, owner, or due date
     */
    sortTasks(event) {
      // if (event.target.value == "difficulty") {
      //   this.tasks = this.tasks.sort((t1, t2) =>
      //     t1.difficulty < t2.difficulty ? -1 : 1
      //   );
      // } else if (event.target.value == "task") {
      //   this.tasks = this.tasks.sort((t1, t2) => (t1.name < t2.name ? -1 : 1));
      // } else if (event.target.value == "owner") {
      //   this.tasks = this.tasks.sort((t1, t2) =>
      //     t1.owner < t2.owner ? -1 : 1
      //   );
      // } else if (event.target.value == "due-date") {
      //   this.tasks = this.tasks.sort((t1, t2) =>
      //     t1.due_date < t2.due_date ? -1 : 1
      //   );
      // }
    },
    /**
     * Returns tasks that match the given category
     */
    filterTasks(category) {
      var filtered = [];
      this.tasks.forEach((task) => {
        if (task.category === category.name) {
          filtered.push(task);
        }
      });

      return filtered;
    },
    /**
     * Marks task as complete and sends a PUT request to update the backend JSON
     */
    async markCompleted(e) {
      console.log(e.target.id);
      if (!this.allTasks[e.target.id].completed) {
        this.allTasks[e.target.id].completed = true;
        this.allTasks[e.target.id].complete_date = this.dateToMMDD(new Date());
      } else {
        this.allTasks[e.target.id].completed = false;
        this.allTasks[e.target.id].complete_date = "Not completed";
      }

      const res = await fetch("http://localhost:5000/tasks/" + e.target.id, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(this.allTasks[e.target.id]),
      });

      var data = await res.json();
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
table {
  border-collapse: collapse;
  width: 100%;
}

td,
th {
  text-align: left;
  padding: 16px;
  width: 20%;
}

tr {
  background: #f4f4f4;
  padding-left: 16px;
  border-bottom: 1px #ccc dotted;
}

tr:last-child {
  border-bottom: none;
}

.add-task-button {
  background-color: beige; /* Green */
  color: black;
  padding: 8px 24px;
  text-align: center;
  font-size: 16px;
  float: right;
  font: verdana;
  margin: 16px 0;
}
.sort-drop-down {
  display: block;
  margin: 16px 0;
}
</style>