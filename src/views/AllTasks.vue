<template>
  <div class="all-task-view">
    <h2>All Tasks</h2>
    <input type="button" value="List View" @click="selectList" />
    <input type="button" value="Calendar View" @click="selectCalendar" />
    <div class="task-container">
      <div :class="displayCalender ? 'calendar-view' : 'hide-view'">
        <EventCalendar
          :tasks="tasks"
          :currentUser="currentUser"
          :singleUser="false"
        />
      </div>
      <div :class="displayList ? 'list-view' : 'hide-view'">
        <AllTasks
          :categories="categories"
          :tasks="tasks"
          :currentUser="currentUser"
          :otherTasks="otherTasks"
          :swapTasks="swapTasks"
          :comments="comments"
          :currHouseID="currHouseID"
          :numTasks="numTasks"
          :allTasks="allTasks"
        />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import AllTasks from "@/components/AllTasks.vue";
import EventCalendar from "@/components/EventCalendar.vue";
import AddTask from "../views/AddTask.vue";

export default {
  name: "AllTasksView",
  components: {
    AddTask,
    AllTasks,
    EventCalendar,
  },
  methods: {
    selectCalendar() {
      this.displayCalender = true;
      this.displayList = false;
    },
    selectList() {
      this.displayList = true;
      this.displayCalender = false;
    },
    /**
     * Fetches category list from backend JSON
     */
    async fetchCategories() {
      const res = await fetch("http://localhost:5000/categories");
      const data = await res.json();

      return data;
    },
    /**
     * Fetches tasks from backend JSON
     */
    async fetchTasks() {
      const res = await fetch(
        "http://localhost:5000/tasks?houseID=" + this.currHouseID.toString()
      );
      const data = await res.json();

      return data;
    },
    /**
     * Fetches tasks not owned by current user from backend JSON
     */
    async fetchOtherTasks() {
      const res = await fetch(
        "http://localhost:5000/tasks?owner_ne=" + this.currentUser
      );
      const data = await res.json();

      return data;
    },
    /**
     * Fetches comments from backend JSON
     */
    async fetchComments() {
      const res = await fetch("http://localhost:5000/comments");
      const data = await res.json();
      return data;
    },
    /**
     * Fetches current user from backend JSON
     */
    async fetchCurrentUser() {
      const res = await fetch("http://localhost:5000/currentUser");
      const data = await res.json();
      return data.name;
    },
    /**
     * Fetches current house ID from backend JSON
     */
    async fetchCurrentHouseID() {
      const res = await fetch("http://localhost:5000/currentUser");
      const data = await res.json();
      return data.houseID;
    },
    /**
     * Fetches numTasks from backend JSON
     */
    async fetchNumTasks() {
      const res = await fetch("http://localhost:5000/tasks");
      const data = await res.json();

      return data.length;
    },
    /**
     * Fetches ALL tasks from backend JSON
     */
    async fetchAllTasks() {
      const res = await fetch("http://localhost:5000/tasks");
      const data = await res.json();

      return data;
    },
  },
  /**
   * Fetches categories and tasks
   */
  async created() {
    this.currentUser = await this.fetchCurrentUser();
    this.currHouseID = await this.fetchCurrentHouseID();
    this.categories = await this.fetchCategories();
    this.tasks = await this.fetchTasks();
    this.otherTasks = await this.fetchOtherTasks();
    for (let index = 0; index < this.otherTasks.length; index++) {
      this.swapTasks.push(false);
    }
    this.comments = await this.fetchComments();
    this.numTasks = await this.fetchNumTasks();
    this.allTasks = await this.fetchAllTasks();
  },
  data() {
    return {
      tasks: [],
      categories: [],
      displayCalender: false,
      displayList: true,
      currentUser: "",
      otherTasks: [], //Tasks not owned by current user
      swapTasks: [], //Array of booleans used for checkboxes
      comments: [],
      currHouseID: -1,
      numTasks: 0,
      allTasks: [],
    };
  },
};
</script>

<style scoped>
.all-task-view {
  text-align: left;
  margin: 8px;
}

.hide-view {
  display: none;
}

.add-task-button {
  float: right;
}
.task-container {
  padding: 8px;
  border-radius: 4px;
  border-style: solid;
  border-width: 2px;
}
</style>