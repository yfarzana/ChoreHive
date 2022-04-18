<template>
  <!-- Navbar -->
  <div id="nav">
    <h1 class="title">ChoreHive</h1>
    <div id="links">
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <router-link to="/">Home</router-link>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <div class="dropdown">
        <router-link to="/all_tasks" class="router-link">Tasks</router-link>
        <div class="dropdown-content">
          <router-link to="/all_tasks" class="dropdown-links"
            >All Tasks</router-link
          >
          <router-link to="/my_tasks" class="dropdown-links"
            >My Tasks</router-link
          >
          <router-link to="/" class="dropdown-links">Past Tasks</router-link>
        </div>
      </div>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <router-link to="/help">Help</router-link>
    </div>
    <div class="icon-links">
      <SearchIcon class="icons" />
      <router-link to="/notification"><BellIcon class="icons" /></router-link>
      <div class="dropdown">
        <router-link v-if="currentUser !== 'none'" to="/house_setup"
          ><UserIcon class="icons"
        /></router-link>
        <router-link v-if="currentUser === 'none'" to="/"
          ><UserIcon class="icons"
        /></router-link>
        <div class="dropdown-content">
          <div
            v-if="currentUser === 'none'"
            class="dropdown-links user-dropdown"
            @click="displaySignup = true"
          >
            Sign Up
          </div>
          <div
            v-if="currentUser === 'none'"
            class="dropdown-links user-dropdown"
            @click="displaySignin = true"
          >
            Sign In
          </div>
          <router-link
            v-if="currentUser !== 'none'"
            to="/house_setup"
            class="dropdown-links"
            >User Center</router-link
          >
          <div
            v-if="currentUser !== 'none'"
            to="/"
            class="dropdown-links user-dropdown"
            @click="logout"
          >
            Log Out
          </div>
        </div>
      </div>
    </div>
  </div>

  <div :class="displaySignup ? 'modal' : 'hide-modal'">
    <Signup @close="displaySignup = false" @save="saveUser" />
  </div>

  <div :class="displaySignin ? 'modal' : 'hide-modal'">
    <div class="modal-contents" style="width: 50%; padding: 2%">
      <h2 style="align-tiems: center">Sign In</h2>
      <div style="display: grid">
        <label>Name</label>
        <input type="text" v-model="name" id="loginUser" />
        <label>Password</label>
        <input type="password" v-model="password" id="loginPass" />
      </div>
      <div class="bottom" style="margin-top: 2%">
        <button class="post-btn" @click="signIn">Sign In</button>
        <button class="cancel-btn" @click="closeSignin">Cancel</button>
      </div>
    </div>
  </div>

  <router-view />
</template>

<script>
import { UserIcon } from "@heroicons/vue/solid";
import { BellIcon } from "@heroicons/vue/solid";
import { SearchIcon } from "@heroicons/vue/solid";

import Signup from "./views/Signup.vue";

export default {
  components: {
    UserIcon,
    BellIcon,
    SearchIcon,
    Signup,
  },
  data() {
    return {
      currentUser: "",
      displaySignup: false,
      displaySignin: false,
      name: "",
      password: "",
      users: [],
    };
  },
  methods: {
    /**
     * Check if name and password match with known users
     * Sets current user to given name if found; sends and alert otherwise
     */
    async signIn() {
      var found = false;
      var user = {};
      this.users.forEach((use) => {
        if (use.name === this.name && use.password === this.password) {
          found = true;
          user = use;
        }
      });

      if (found) {
        // Set current user
        const newCurrentUser = {
          userID: user.id,
          name: user.name,
          houseID: user.houseID,
        };

        const res = await fetch("http://localhost:5000/currentUser", {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(newCurrentUser),
        });

        const data = await res.json();

        this.displaySignin = false;
        window.location.reload();
      } else {
        alert("Sorry, name and password do not match");
      }
    },
    /**
     * Close sign in modal
     */
    closeSignin() {
      this.displaySignin = false;
    },
    /**
     * Reload the page
     */
    saveUser() {
      this.displaySignup = false;
      window.location.reload();
    },
    /**
     * Logs out user
     */
    async logout() {
      // Set current user to none
      const newCurrentUser = {
        userID: -1,
        name: "none",
        houseID: -1,
      };

      const res = await fetch("http://localhost:5000/currentUser", {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(newCurrentUser),
      });

      const data = await res.json();

      window.location.reload();
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
     * Fetches all users from backend JSON
     */
    async fetchUsers() {
      const res = await fetch("http://localhost:5000/users");
      const data = await res.json();

      return data;
    },
  },
  /**
   * Fetches information from backend
   */
  async created() {
    this.currentUser = await this.fetchCurrentUser();
    this.users = await this.fetchUsers();
  },
};
</script>

<style>
.user-dropdown {
  color: #d69e2e;
  font-weight: bold;
  text-decoration: none;
}

.check-box {
  width: 20px;
  height: 20px;
  cursor: pointer;
}
.hide-modal {
  display: none;
}
/* The Modal (background) */
.modal {
  display: block;
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}

.modal-contents {
  text-align: start;
  width: 90%;
  padding-left: 5%;
  background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 80%; /* Could be more or less, depending on screen size */
}

.swap-btn {
  background: grey;
  border-color: grey;
  width: 100px;
}

.disabled-swap-btn {
  background: lightgrey;
  border-color: lightgrey;
  width: 100px;
}

.post-btn {
  background: green;
  border-color: green;
  float: right;
}

.cancel-btn {
  background: red;
  border-color: red;
  float: left;
}

Button {
  height: 10%;
  font-size: 19px;
  font-family: monospace;
  text-align: center;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}

.title {
  float: left;
}
.text-style {
  display: flex;
  margin-bottom: 1%;
}

.drop-down {
  display: block;
  margin-bottom: 3%;
}

.bottom {
  margin-bottom: 5%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 32px;
  padding-bottom: 24px;
  height: 100px;
  border-bottom: double;
}

#links a {
  font-weight: bold;
  font-size: 20px;
  color: #2c3e50;
  text-decoration: none;
}

#nav a.router-link-exact-active {
  color: #d69e2e;
}

#links {
  margin-top: 12px;
  margin-left: 16px;
  float: left;
}

.list_view_task {
  text-align: left;
  margin: 8px;
}

.router-link {
  font-weight: bold;
  text-decoration: none;
}

/* The container <div> - needed to position the dropdown content */
.dropdown {
  position: relative;
  display: inline-block;
  cursor: pointer;
}

/* Dropdown Content (Hidden by Default) */
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f1f1f1;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  text-align: left;
}

/* Links inside the dropdown */
.dropdown-links {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

/* Change color of dropdown links on hover */
.dropdown-content a:hover {
  background-color: #ddd;
}

/* Show the dropdown menu on hover */
.dropdown:hover .dropdown-content {
  display: block;
}

.icon-links {
  margin-right: 2%;
  float: right;
}

.icons {
  width: 36px;
  height: 36px;
  color: #2c3e50;
  margin-top: 4px;
  margin-left: 24px;
}
</style>
