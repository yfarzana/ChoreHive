<template>
  <section class="user_area pt-2">
    <div class="row">
      <div class="col-lg-6 offset-lg-3 col-sm-6 offset-sm-3">
        <h2>USER CENTER</h2>

        <div class="border user_position border-dark border-3 p-2 vh-100">
          <div class="user_menu">
            <nav class="nav flex-column border">
              <router-link class="nav-link text-dark border" to="#"
                >Account</router-link
              >
              <router-link class="nav-link text-dark border" to="/house_setup"
                >House Setup</router-link
              >
              <router-link class="nav-link text-dark active" to="#"
                >Notification</router-link
              >
              <router-link class="nav-link text-dark" to="#">Type</router-link>
              <router-link class="nav-link text-dark" to="#"
                >Frequency</router-link
              >
            </nav>
          </div>
          <div class="user_form">
            <h3>Notification Type</h3>

            <input type="checkbox" id="1" value="" />
            <label for="1"> Roommate Swap Request</label><br />

            <input type="checkbox" id="2" value="" />
            <label class="pt-2" for="2"> Roommate Make Up Request</label><br />

            <input type="checkbox" id="3" value="" />
            <label class="pt-2" for="3"> Task Deadline</label><br />

            <input type="checkbox" id="4" value="" />
            <label class="pt-2" for="4"> Routine Cycle End</label><br />

            <input type="checkbox" id="5" value="" />
            <label class="pt-2" for="5"> House Set Up Change</label><br />

            <!--  -->
            <h3 class="pt-5">Notification Time</h3>
            <select name="" id="" class="col-12">
              <option value="">Notification Frequency</option>
              <option value="">ASAP</option>
              <option value="">Daily</option>
              <option value="">Twice Weekly</option>
              <option value="">Weekly</option>
              <option value="">Custom</option>
            </select>
            <!--  -->
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "UserNotification",
};
</script>

<style scoped>
.user_area {
  text-align: left !important;
}
input {
  margin-right: 5px;
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
.shado {
  box-shadow: 2px 3px #000;
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