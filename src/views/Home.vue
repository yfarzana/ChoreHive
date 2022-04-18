<template>
  <div class="home">
    <div v-if="displayChart" class="home-container" style="padding: 60px">
      <h1 v-if="currHouseID === -1">Please Sign up or Sign in</h1>
      <HomeChart
        :usernames="usernames"
        :tasksByUser="tasksByUser"
        :backgroundColor="backgroundColor"
        :borderColor="borderColor"
      />
    </div>
    <div class="home-container all-task-view">
      <h1>Upcoming Tasks</h1>
      <table>
        <!-- Task rows -->
        <tr>
          <th>Task Title</th>
          <th>Difficulty Points</th>
          <th>Deadline</th>
          <th>Completed?</th>
        </tr>
        <tr
          v-bind:key="task.id"
          v-for="task in tasks"
          style="background-color: white"
        >
          <td>{{ task.name }}</td>
          <td class="center_align">{{ task.difficulty }}</td>
          <td>{{ task.due_date }}</td>
          <td class="center_align">
            <input
              type="checkbox"
              v-on:change="markCompleted"
              v-model="task.completed"
              :id="task.id"
              class="check-box"
            />
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HomeChart from "@/components/HomeChart.vue";

export default {
  name: "Home",
  components: {
    HomeChart,
  },
  methods: {
    /**
     * Marks task as complete and sends a PUT request to update the backend JSON
     */
    async markCompleted(e) {
      console.log(this.allDBTasks);
      if (!this.allDBTasks[e.target.id].completed) {
        this.allDBTasks[e.target.id].completed = true;
        this.allDBTasks[e.target.id].complete_date = this.dateToMMDD(
          new Date()
        );
      } else {
        this.allDBTasks[e.target.id].completed = false;
        this.allDBTasks[e.target.id].complete_date = "Not completed";
      }

      const res = await fetch("http://localhost:5000/tasks/" + e.target.id, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(this.allDBTasks[e.target.id]),
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
    /**
     * Returns an array, each index corresponding to the number of tasks owned by a user
     */
    getTasksByUser() {
      var taskArray = [];
      this.usernames.forEach((name) => {
        var count = 0;
        this.allTasks.forEach((task) => {
          if (name === task.owner) {
            count++;
          }
        });
        taskArray.push(count);
      });

      return taskArray;
    },
    /**
     * Creates random colors for chart sections
     */
    createColors() {
      var rgb = [];
      for (let index = 0; index < this.usernames.length; index++) {
        rgb.push([]);
      }
      for (let index = 0; index < 3; index++) {
        var alreadyUsed = [];
        while (alreadyUsed.length < this.usernames.length) {
          var random = Math.floor(Math.random() * 255);
          if (alreadyUsed.indexOf(random) === -1) {
            alreadyUsed.push(random);
          }
        }

        for (let i = 0; i < alreadyUsed.length; i++) {
          rgb[i].push(alreadyUsed[i]);
        }
      }

      return rgb;
    },
    /**
     * Creates background color
     */
    createBackgroundColor(rgb) {
      rgb.forEach((color) => {
        var background = "rgba(";
        background += color[0].toString() + ", ";
        background += color[1].toString() + ", ";
        background += color[2].toString() + ", ";
        background += "0.2)";

        this.backgroundColor.push(background);
      });
    },
    /**
     * Creates border color
     */
    createBorderColor(rgb) {
      rgb.forEach((color) => {
        var border = "rgba(";
        border += color[0].toString() + ", ";
        border += color[1].toString() + ", ";
        border += color[2].toString() + ", ";
        border += "1)";

        this.borderColor.push(border);
      });
    },
    /**
     * Fetches current user tasks from backend JSON
     */
    async fetchTasks() {
      const res = await fetch(
        "http://localhost:5000/tasks?owner=" + this.currentUser
      );
      const data = await res.json();

      return data;
    },
    /**
     * Fetches users from backend JSON
     */
    async fetchUsers() {
      const res = await fetch(
        "http://localhost:5000/users?houseID=" + this.currHouseID.toString()
      );
      const data = await res.json();

      var usernames = [];
      data.forEach((user) => {
        usernames.push(user.name);
      });

      return usernames;
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
     * Fetches all tasks from backend JSON
     */
    async fetchAllTasks() {
      const res = await fetch(
        "http://localhost:5000/tasks?houseID=" + this.currHouseID.toString()
      );
      const data = await res.json();

      return data;
    },
    /**
     * Fetches ALL tasks from backend JSON
     */
    async fetchDBTasks() {
      const res = await fetch("http://localhost:5000/tasks");
      const data = await res.json();

      return data;
    },
  },
  /**
   * Fetches information from backend
   */
  async created() {
    this.currentUser = await this.fetchCurrentUser();
    this.currHouseID = await this.fetchCurrentHouseID();
    this.tasks = await this.fetchTasks();
    this.usernames = await this.fetchUsers();
    this.allTasks = await this.fetchAllTasks();
    this.allDBTasks = await this.fetchDBTasks();

    this.tasksByUser = this.getTasksByUser();

    var rgb = this.createColors();
    this.createBackgroundColor(rgb);
    this.createBorderColor(rgb);

    this.displayChart = true;
  },
  data() {
    return {
      tasks: [],
      currentUser: "",
      usernames: [],
      allTasks: [],
      tasksByUser: [],
      backgroundColor: [],
      borderColor: [],
      displayChart: false,
      currHouseID: -1,
      allDBTasks: [],
    };
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
  font-size: 16px;
  float: right;
  margin: 16px 0;
}
.sort-drop-down {
  display: block;
  margin: 16px 0;
  font-size: 16px;
}

.all-task-view {
  text-align: left;
}

.hide-view {
  display: none;
}

.add-task-button {
  float: right;
}

.home {
  display: flex;
  flex-direction: column;
}

.home-container {
  margin: 8px 8px 8px 8px;
  padding: 8px 8px 8px 8px;
  border-radius: 12px;
  border-style: solid;
}
</style>