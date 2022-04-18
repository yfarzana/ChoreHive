<template>
  <div class="modal-contents">
    <h2>Sign Up</h2>
    <div class="basic-info">
      <h3>Basic Information</h3>
      <div class="form-row">
        <div class="form-field">
          <label>First Name</label>
          <input type="text" v-model="firstName" />
        </div>
        <div class="form-field">
          <label>Last Name</label>
          <input type="text" v-model="lastName" />
        </div>
      </div>
      <div class="form-row">
        <div class="form-field">
          <label>Email</label>
          <input type="text" v-model="email" />
        </div>
      </div>
      <div class="form-row">
        <div class="form-field">
          <label>Password</label>
          <input type="password" v-model="password" id="password" />
          <div class="password-toggle">
            <input type="checkbox" @click="showPass" />Show Password
          </div>
        </div>
      </div>
      <div class="form-row">
        <div class="form-field">
          <label>Confirm Password</label>
          <input
            type="password"
            v-model="confirmPassword"
            id="confirmPassword"
          />
          <div class="password-toggle">
            <input type="checkbox" @click="showConfirmPass" />
            Show Password
          </div>
        </div>
      </div>
    </div>
    <div class="house-setup">
      <h3>House Setup</h3>
      <div class="form-row">
        <button value="Join-House" @click="joinHouse">Join House</button>
        <div class="form-field">
          <label>ID</label>
          <input type="number" v-model="joinHouseID" />
        </div>
      </div>
      <h4 class="or">or</h4>
      <div>
        <button value="Create-House" @click="createHouse">Create House</button>
        <div class="form-field">
          <label>Name</label>
          <input type="text" v-model="createHouseName" />
        </div>
      </div>
      <div class="form-field">
        <label>Routine Cycle Length</label>
        <select
          name="frequency"
          id="frequency"
          style="width: 100%"
          v-model="routineLength"
        >
          <option value="Weekly">Weekly</option>
          <option value="Bi-weekly">Bi-Weekly</option>
          <option value="Monthly">Monthly</option>
        </select>
      </div>
    </div>
    <!-- Bottom buttons -->
    <div class="bottom">
      <button value="Submit" class="post-btn" @click="onSubmit">Submit</button>
      <button value="Cancel" class="cancel-btn" @click="cancel">Cancel</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Signup",
  data() {
    return {
      //Binded to input
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      joinHouseID: 0,
      createHouseName: "",
      routineLength: "Weekly",

      //Verifies if house was created/joined
      joinedHouse: false,
      createdHouse: false,

      //Used for joining/creating a house
      houses: [],

      //Used for creating JSON for backend
      numUsers: -1,
      houseID: -1,
      houseName: "",
      routineCycleLength: "",
    };
  },
  methods: {
    /**
     * Checks to see if house is valid.
     * If valid, adds the user to house; else sends alert
     */
    joinHouse() {
      if (this.joinHouseID !== "") {
        console.log(this.joinHouseID);
        var valid = false;
        this.houses.forEach((house) => {
          if (house.id == this.joinHouseID) {
            valid = true;
            this.houseID = house.id;
            this.houseName = house.name;
            this.routineCycleLength = house.routineCycleLength;
          }
        });

        if (valid) {
          this.joinedHouse = true;
        } else {
          alert("Invalid House ID");
        }

        this.createdHouse = false;
      } else {
        alert("Please fill Join House ID section");
      }
    },
    /**
     * Creates a new house object if name is not already taken; else sends alert
     */
    createHouse() {
      if (this.createHouseName !== "") {
        var taken = false;
        this.houses.forEach((house) => {
          if (house.name === this.createHouseName) {
            taken = true;
          }
        });

        if (!taken) {
          this.houseID = this.houses.length;
          this.houseName = this.createHouseName;
          this.routineCycleLength = this.routineLength;

          this.createdHouse = true;
        } else {
          alert("Sorry, that house name is already taken");
          this.createdHouse = false;
        }

        this.joinedHouse = false;
      } else {
        alert("Please fill Create House Name section");
      }
    },
    /**
     * Toggle shwoing the password
     */
    showPass() {
      var pass = document.getElementById("password");
      if (pass.type === "password") {
        pass.type = "text";
      } else {
        pass.type = "password";
      }
    },
    /**
     * Toggle shwoing the confirmation password
     */
    showConfirmPass() {
      var pass = document.getElementById("confirmPassword");
      if (pass.type === "password") {
        pass.type = "text";
      } else {
        pass.type = "password";
      }
    },
    /**
     * Used to close modal without saving user
     */
    cancel() {
      this.$emit("close");
    },
    /**
     * Handles posting user to backend JSON
     */
    async onSubmit(e) {
      e.preventDefault();

      if (
        this.firstName === "" ||
        this.email === "" ||
        !this.email.includes("@") ||
        this.password === "" ||
        this.confirmPassword === "" ||
        (!this.joinedHouse && !this.createdHouse)
      ) {
        var text = "Please fill in the following section(s):\n\n";
        if (this.firstName === "") {
          text += "First name\n";
        }
        if (this.email === "" || !this.email.includes("@")) {
          text += "Email\n";
        }
        if (this.password === "") {
          text += "Password\n";
        }
        if (this.confirmPassword === "") {
          text += "Confirmation Password\n";
        }
        if (!this.joinedHouse && !this.createdHouse) {
          text += "House\n";
        }
        alert(text);
        return;
      } else if (this.password !== this.confirmPassword) {
        alert("Password does not match confirmation password");
        return;
      } else {
        var data;
        //Create house if they chose to
        if (this.createdHouse) {
          const newHouse = {
            id: this.houseID,
            name: this.houseName,
            routineCycleLength: this.routineCycleLength,
          };

          const res1 = await fetch("http://localhost:5000/houses", {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(newHouse),
          });

          data = await res1.json();
        }

        // Post new user
        var name = this.firstName;
        if (this.lastName !== "") {
          name += " " + this.lastName;
        }

        const newUser = {
          id: this.numUsers,
          name: name,
          email: this.email,
          password: this.password,
          houseID: this.houseID,
        };

        const res2 = await fetch("http://localhost:5000/users", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(newUser),
        });

        data = await res2.json();

        // Set current user as the new user
        const newCurrentUser = {
          userID: this.numUsers,
          name: name,
          houseID: this.houseID,
        };

        const res3 = await fetch("http://localhost:5000/currentUser", {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(newCurrentUser),
        });

        data = await res3.json();
      }

      this.$emit("save");
    },
    /**
     * Gets the total number of users in the backend
     */
    async fetchNumUsers() {
      const res = await fetch("http://localhost:5000/users");
      const data = await res.json();

      return data.length;
    },
    /**
     * Gets the houses in the backend
     */
    async fetchHouses() {
      const res = await fetch("http://localhost:5000/houses");
      const data = await res.json();

      return data;
    },
  },
  async created() {
    this.numUsers = await this.fetchNumUsers();
    this.houses = await this.fetchHouses();
  },
};
</script>


<style scoped>
.or {
  margin: 2%;
  text-align: center;
}

.password-toggle {
  align-items: center;
  display: flex;
}

.form-field {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 2px 4px 2px 4px;
}

.form-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
}

.house-setup button {
  color: black;
  margin-right: 8px;
}

.bottom {
  padding-top: 16px;
}
</style>