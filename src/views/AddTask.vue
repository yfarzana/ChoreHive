<template>
  <div class="modal-contents">
    <h2>POST TASK</h2>
    <h3 class="text-style">ENTER FIELDS</h3>

    <form>
      <!-- Title -->
      <p>
        <label class="text-style" for="title">Title</label>
        <input
          type="text"
          id="title"
          v-model="title"
          name="title"
          class="title-box input-margin"
        />
      </p>

      <!-- Description -->
      <p>
        <label class="text-style" for="description">Description</label>
        <textarea
          type="text"
          id="description"
          v-model="description"
          name="description"
          class="description-box input-margin"
        >
        </textarea>
      </p>

      <!-- Deadline -->
      <p>
        <label class="text-style" for="deadline">Deadline</label>
        <input
          type="date"
          :value="dateToYYYYMMDD(date)"
          @input="date = $event.target.valueAsDate"
          name="deadline"
          id="deadline"
          class="input-margin"
        />
      </p>

      <!-- Difficulty points -->
      <p>
        <label class="text-style" for="difficulty">Difficulty Points</label>
        <select
          name="difficulty"
          id="difficulty"
          class="drop-down title-box input-margin"
          v-model="difficulty"
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </p>

      <!-- Category -->
      <p>
        <label class="text-style" for="category">Category</label>
        <input
          type="text"
          list="category"
          class="drop-down title-box input-margin"
          @blur="saveCategory"
        />
        <datalist id="category">
          <div :key="cat.id" v-for="cat in categories">
            <option>{{ cat.name }}</option>
          </div>
        </datalist>
      </p>

      <!-- Bottom of card -->
      <div style="text-align: center">
        <div class="bottom-content" style="margin-right: 6%">Recurring</div>
        <input
          type="checkbox"
          class="bottom-content"
          style="margin-right: 53%"
          name="recurring"
          v-model="recurring"
        />
        <div class="bottom-content" style="margin-right: 6%">
          Time Sensitive?
        </div>
        <input
          type="checkbox"
          class="bottom-content"
          name="timeSensitive"
          v-model="timeSensitive"
          :class="!recurring ? 'bottom' : ''"
        />
      </div>
      <div
        style="margin-bottom: 5%; width: 100%"
        class="bottom-content"
        v-if="recurring"
      >
        <input
          type="radio"
          id="Daily"
          name="frequency"
          value="Daily"
          class="radio-items"
          v-model="frequency"
        />
        <label for="Daily" class="radio-items">Daily</label><br />
        <input
          type="radio"
          id="Twice a Week"
          name="frequency"
          value="Twice a Week"
          class="radio-items"
          v-model="frequency"
        />
        <label for="Twice a Week" class="radio-items">Twice a Week</label><br />
        <input
          type="radio"
          id="Weekly"
          name="frequency"
          value="Weekly"
          class="radio-items"
          v-model="frequency"
        />
        <label for="Weekly" class="radio-items">Weekly</label><br />
        <input
          type="radio"
          id="Bi-weekly"
          name="frequency"
          value="Bi-weekly"
          class="radio-items"
          v-model="frequency"
        />
        <label for="Bi-weekly" class="radio-items">Bi-weekly</label><br />
        <input
          type="radio"
          id="Monthly"
          name="frequency"
          value="Monthly"
          class="radio-items"
          v-model="frequency"
        />
        <label for="Monthly" class="radio-items">Monthly</label>
      </div>

      <div style="padding-bottom: 10%; margin-top: 10%">
        <button type="submit" value="Cancel" class="cancel-btn" @click="cancel">
          Cancel
        </button>
        <!-- <input type="submit" value="Save"> -->
        <button
          type="submit"
          value="Post Task"
          class="post-btn"
          @click="onSubmit"
        >
          Post Task
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "AddTask",
  props: {
    currentUser: String,
    numTasks: Number, // Number of tasks for the whole household
    categories: Array,
    currHouseID: Number,
  },
  data() {
    return {
      title: "",
      description: "",
      difficulty: 1,
      date: new Date(),
      category: "",
      recurring: false,
      frequency: "",
      timeSensitive: false,
    };
  },
  methods: {
    /**
     * Binds category input textbox to category variable
     */
    saveCategory(e) {
      e.preventDefault();

      this.category = e.target.value;
    },
    /**
     * Used to close modal without saving task
     */
    cancel() {
      this.$emit("close");
    },
    /**
     * Handles posting task to backend JSON
     */
    async onSubmit(e) {
      e.preventDefault();

      if (
        this.title === "" ||
        this.description === "" ||
        this.category === "" ||
        (this.recurring && this.frequency === "")
      ) {
        var text = "Please fill in the following section(s):\n\n";
        if (this.title === "") {
          text += "Title\n";
        }
        if (this.description === "") {
          text += "Description\n";
        }
        if (this.category === "") {
          text += "Category\n";
        }
        if (this.recurring && this.frequency === "") {
          text += "Recurring\n";
        }
        alert(text);
        return;
      } else {
        // Post new task
        var isSensitive = "No";
        if (this.timeSensitive) {
          isSensitive = "Yes";
        }

        console.log(this.numTasks);
        const newTask = {
          name: this.title.charAt(0).toUpperCase() + this.title.slice(1),
          difficulty: this.difficulty,
          due_date: this.dateToMMDD(this.date),
          owner: this.currentUser,
          id: this.numTasks,
          description:
            this.description.charAt(0).toUpperCase() +
            this.description.slice(1),
          category:
            this.category.charAt(0).toUpperCase() + this.category.slice(1),
          frequency: this.frequency,
          sensitive: isSensitive,
          complete_date: "Not completed",
          completed: false,
          houseID: this.currHouseID,
        };

        const res = await fetch("http://localhost:5000/tasks", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(newTask),
        });

        const data = await res.json();

        // Post category if it is new
        var exists = false;
        for (let index = 0; index < this.categories.length; index++) {
          if (this.category === this.categories[index].name) {
            exists = true;
            break;
          }
        }

        if (!exists) {
          const newCategory = {
            id: this.categories.length,
            name: this.category,
          };

          const res = await fetch("http://localhost:5000/categories", {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(newCategory),
          });

          const data = await res.json();
        }

        this.$emit("saveAdd");
      }
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
.title-box {
  width: 100%;
}

.description-box {
  height: 150px;
  width: 100%;
}

.bottom-content {
  display: inline;
  float: left;
}

.radio-items {
  float: left;
}

.input-margin {
  margin-bottom: 2%;
}
</style>