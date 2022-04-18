<template>
  <section class="notification_area pt-2">
    <div class="row">
      <div class="offset-lg-3 col-lg-6">
        <h2>NOTIFICATION CENTER</h2>
        <ul class="nav">
          <li class="border border-dark border-1 active">
            <router-link class="noti_nav nav-link" to="#"> All</router-link>
          </li>
          <li class="border border-dark border-1 border_none">
            <router-link class="noti_nav nav-link" to="#">
              Actions Needed</router-link
            >
          </li>
          <li class="border border-dark border-1">
            <router-link class="noti_nav nav-link" to="#">
              Messages</router-link
            >
          </li>
        </ul>
        <div class="border border-dark border-3 p-4 vh-100">
          <div class="notification">
            <div class="d-flex justify-content-between">
              <p class="p-0 m-0 notification-text">
                Steven wants t swap Clean Mirror and Wipe Table With You.
              </p>
              <div class="pull-right shado">
                <button>Comment</button> <button>Approve</button>
              </div>
            </div>
            <hr class="hr" />
          </div>
          <div class="notification">
            <div class="d-flex justify-content-between">
              <p class="p-0 m-0 notification-text">
                Phillip requests to make up Sweep Floor.
              </p>
              <div class="pull-right shado">
                <button>Comment</button> <button>Approve</button>
              </div>
            </div>
            <hr class="hr" />
          </div>
          <div class="notification">
            <div class="d-flex justify-content-between">
              <p class="p-0 m-0 notification-text">
                Your task Vaccum Floor is due soon!
              </p>
              <div class="pull-right shado">
                <button>Go To Task</button> <button>Dismiss</button>
              </div>
            </div>
            <hr class="hr" />
          </div>
          <div class="notification">
            <div class="d-flex justify-content-between">
              <p class="p-0 m-0 notification-text">
                Phillip and Steven has approved your request to make up Clean
                Shower.
              </p>
              <div class="pull-right shado">
                <button>Dismiss</button>
              </div>
            </div>
            <hr class="hr" />
          </div>
          <div class="notification">
            <div class="d-flex justify-content-between">
              <p class="p-0 m-0 notification-text">
                Your task Clean Shower is due soon!
              </p>
              <div class="pull-right shado">
                <button>Go To Task</button> <button>Dismiss</button>
              </div>
            </div>
            <hr class="hr" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Notification",
};
</script>

<style scoped>
.notification-text {
  width: 72%;
  text-align: start;
}

Button {
  height: unset;
  color: unset;
  font-family: unset;
  font-size: unset;
}

.header_area a {
  font-weight: bold !important;
}
.chorehive {
  font-size: 30px;
}
.hr {
  border: 1px solid black !important;
}

.shado button {
  padding: 0px 5px !important;
}
.notification {
  font-size: 18px;
}
.notification button {
  font-size: 14px;
}
/* notification */
.noti_nav {
  padding: 0px 10px 0px 10px !important;
  color: black;
}

.border_none {
  border-left: 0px !important;
  border-right: 0px !important;
}
.active {
  background-color: #8bb3e8;
}
.user_position {
  position: relative;
}
.user_menu {
  position: absolute;
  left: -120px !important;
  top: -1px !important;
  font-size: 16px !important;
  color: black !important;
}
.border {
  border: 1px solid #000 !important;
}
.nav-link {
  padding: 2px 15px 2px 8px !important;
}
.user_name {
  padding-top: 5px !important;
  position: relative;
}
.user_name label {
  position: absolute;
  top: -7px !important;
  background-color: white;
  left: 10px !important;
}

div#nav {
  text-align: center;
}
</style>