<template>
  <div class="modal-contents">
    <div class="exit-btn" @click="cancel">&times;</div>
    <h2 style="text-transform: uppercase; margin-bottom: 0%">
      {{ task.name }}
    </h2>
    <p style="margin-top: 0.5%">{{ task.description }}</p>
    <button
      @click="openSwap(task.id)"
      v-if="task.owner === currentUser"
      class="swap-btn"
    >
      Swap
    </button>
    <button
      @click="openMakeup(task.id)"
      v-if="task.owner === currentUser"
      class="swap-btn"
    >
      Make Up
    </button>
    <button
      @click="openSwap(task.id)"
      v-if="task.owner !== currentUser"
      class="disabled-swap-btn"
      disabled
    >
      Swap
    </button>
    <button
      @click="openMakeup(task.id)"
      v-if="task.owner !== currentUser"
      class="disabled-swap-btn"
      disabled
    >
      Make Up
    </button>

    <!-- Details -->
    <h3 style="margin-left: 5%">Details</h3>
    <div class="details">
      <p>Category: {{ task.category }}</p>
      <p>Assigned to: {{ task.owner }}</p>
      <div>
        Difficulty Points:
        <div class="difficulty">{{ task.difficulty }}</div>
      </div>
      <p>Frequency: {{ task.frequency }}</p>
      <p>Time Sensitive: {{ task.sensitive }}</p>
      <p>Deadline: {{ task.due_date }}</p>
      <p v-if="task.complete_date === 'not completed'">Completed:</p>
      <p v-if="task.complete_date !== 'not completed'">
        Completed: {{ task.complete_date }}
      </p>
    </div>

    <!-- Comments -->
    <vue-collapsible-panel-group accordion>
      <vue-collapsible-panel :expanded="false">
        <template #title> Comments </template>
        <template #content>
          <div :key="comment.id" v-for="comment in comments">
            <Comment :comment="comment.content" :owner="comment.owner" />
          </div>
          <p v-if="expanded" class="comment-text-container">
            <textarea
              type="text"
              id="commentText"
              v-model="commentText"
              name="commentText"
              class="comment-text"
            >
            </textarea>
          </p>
          <div class="btn-container">
            <button v-if="!expanded" class="comment-btn" @click="expandComment">
              Post a Comment
            </button>
            <button v-if="expanded" class="cancel-btn" @click="cancelComment">
              CANCEL
            </button>
            <button v-if="expanded" class="post-btn" @click="postComment">
              POST
            </button>
          </div>
        </template>
      </vue-collapsible-panel>
    </vue-collapsible-panel-group>
    <p v-if="expandedNoComment" class="comment-text-container">
      <textarea
        type="text"
        id="commentText"
        v-model="commentText"
        name="commentText"
        class="comment-text"
      >
      </textarea>
    </p>
    <div
      class="btn-container"
      style="margin-top: 2%"
      v-if="comments.length == 0"
    >
      <button
        v-if="!expandedNoComment"
        class="comment-btn"
        @click="expandWhenNoComments"
      >
        Post a Comment
      </button>
      <button
        v-if="expandedNoComment"
        class="cancel-btn"
        @click="cancelComment"
      >
        CANCEL
      </button>
      <button v-if="expandedNoComment" class="post-btn" @click="postComment">
        POST
      </button>
    </div>
  </div>
</template>

<script>
import {
  VueCollapsiblePanelGroup,
  VueCollapsiblePanel,
} from "@dafcoe/vue-collapsible-panel";
import Comment from "../components/Comment";

export default {
  name: "ViewTask",
  props: {
    // Current task
    task: Object,
    //  Name of user who is viewing the task
    currentUser: String,
    //  Comments associated with task
    comments: Array,
    //  Unique ID of task
    taskID: Number,
  },
  data() {
    return {
      expanded: false,
      commentText: "",
      expandedNoComment: false,
    };
  },
  components: {
    VueCollapsiblePanelGroup,
    VueCollapsiblePanel,
    Comment,
  },
  methods: {
    /**
     * Expands comment text box when there are no previous comments
     */
    expandWhenNoComments() {
      this.expandedNoComment = true;
    },
    /**
     * Expands comment text box
     */
    expandComment() {
      this.expanded = true;
    },
    /**
     * Closes comment text box
     */
    cancelComment() {
      this.expanded = false;
      this.expandedNoComment = false;
    },
    /**
     * Handles posting comment to backend JSON
     */
    async postComment() {
      if (!this.commentText) {
        alert("Please fill out the description");
        return;
      } else {
        const totalCommentsRes = await fetch("http://localhost:5000/comments");
        const totalComments = await totalCommentsRes.json();

        const newComment = {
          taskID: this.taskID,
          id: totalComments.length,
          owner: this.currentUser,
          content: this.commentText,
        };

        const res = await fetch(
          "http://localhost:5000/comments?taskID=" + this.taskID,
          {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(newComment),
          }
        );

        const data = await res.json();
        window.location.reload();
      }
    },
    /**
     * Used to close modal
     */
    cancel() {
      this.$emit("close");
    },
    /**
     * Opens Swap request modal
     */
    openSwap(taskID) {
      this.$emit("close");
      this.$emit("openSwap", taskID);
    },
    /**
     * Opens Makeup request modal
     */
    openMakeup(taskID) {
      this.$emit("close");
      this.$emit("openMakeup", taskID);
    },
  },
};
</script>

<style scoped>
.exit-btn {
  float: right;
  width: 70px;
  text-align: center;
  background: red;
  color: white;
  border-radius: 13px;
  cursor: pointer;
  font-size: 36px;
  border: currentColor;
  outline: auto;
}

.details {
  outline: auto;
  padding: 2%;
  margin-bottom: 2%;
}

.comment-btn {
  width: 20%;
  background: grey;
  border-color: grey;
}

.btn-container {
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.cancel-btn {
  margin-right: 15%;
}

.comment-text-container {
  text-align: center;
}

.comment-text {
  width: 80%;
  height: 150px;
  font-size: 16px;
}

.difficulty {
  /* background: yellow; */
  border-radius: 9px;
  /* border: 1px solid black !important; */
  width: max-content;
  display: inline;
  font-weight: 600;
}
</style>