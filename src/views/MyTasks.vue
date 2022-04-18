<template>
  <div class="my-task-view">
    <h2>My Tasks</h2>
    <input type="button" value="List View" @click="selectList" />
    <input type="button" value="Calendar View" @click="selectCalendar" />

    <div class="task-container">
      <div :class="displayCalender ? 'calendar-view' : 'hide-view'">
        <br />
        <EventCalendar
          :tasks="tasks"
          :currentUser="currentUser"
          :singleUser="true"
        />
      </div>
      <div :class="displayList ? 'list-view' : 'hide-view'">
        <MyTasks
          :categories="categories"
          :tasks="tasks"
          :currentUser="currentUser"
          :otherTasks="otherTasks"
          :allTasks="allTasks"
          :swapTasks="swapTasks"
          :comments="comments"
          :householdTasks="householdTasks"
        />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import MyTasks from "@/components/MyTasks.vue";
import EventCalendar from "@/components/EventCalendar.vue";

export default {
  name: "MyTasksView",
  components: {
    MyTasks,
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
     * Fetches tasks owned by current user from backend JSON
     */
    async fetchTasks() {
      const res = await fetch(
        "http://localhost:5000/tasks?owner=" + this.currentUser
      );
      const data = await res.json();

      return data;
    },
    /**
     * Fetches ALL tasks from backend JSON
     */
    async fetchAllTasks() {
      const res = await fetch("http://localhost:5000/tasks");
      const data = await res.json();

      return data;
    },
    /**
     * Fetches ALL tasks from this households from backend JSON
     */
    async fetchAllHouseholdTasks() {
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
        "http://localhost:5000/tasks?owner_ne=" +
          this.currentUser +
          "&houseID=" +
          this.currHouseID.toString()
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
  },
  /**
   * Fetches backend data
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
    this.allTasks = await this.fetchAllTasks();
    this.comments = await this.fetchComments();
    this.householdTasks = await this.fetchAllHouseholdTasks();
  },
  data() {
    return {
      householdTasks: [],
      tasks: [],
      categories: [],
      currentUser: "",
      otherTasks: [], //Tasks not owned by current user
      allTasks: [], //All tasks
      swapTasks: [], //Array of booleans used for checkboxes
      comments: [],
      displayCalender: false,
      displayList: true,
      currHouseID: -1,
    };
  },
};
</script>

<style scoped>
.my-task-view {
  text-align: left;
  margin: 8px;
}

.hide-view {
  display: none;
  margin: 8px;
}

.task-container {
  padding: 8px;
  border-radius: 4px;
  border-style: solid;
  border-width: 2px;
}
</style>