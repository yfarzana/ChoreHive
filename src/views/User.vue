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
              <router-link class="nav-link text-dark border active" to="#"
                >House Setup</router-link
              >
              <router-link class="nav-link text-dark" to="#">Name</router-link>
              <router-link class="nav-link text-dark" to="#"
                >Routine</router-link
              >
              <router-link class="nav-link text-dark" to="#"
                >Roommates</router-link
              >

              <br />
              <router-link
                class="nav-link text-dark border"
                to="/userNotification"
                >Notification</router-link
              >
            </nav>
          </div>

          <div class="user_form">
            <!--  -->
            <div class="user_name">
              <label for="">&nbsp;Name&nbsp;</label>
              <input type="text" class="col-lg-12 col-sm-12" />
            </div>
            <br />
            <select name="" id="" class="col-lg-12 col-sm-12">
              <option value="">Routine Cycle Length</option>
              <option value="">Weekly</option>
              <option value="">Bi-Weekly</option>
              <option value="">Monthly</option>
              <option value="">Custom</option>
            </select>
            <!--  -->
            <br />
            <div class="user_add pt-3">
              <div>
                <i class="fas fa-user-circle fa-2x pr-3" aria-hidden="true"></i>
                <i class="fas fa-user-circle fa-2x pr-3" aria-hidden="true"></i>
                <i class="fas fa-user-circle fa-2x" aria-hidden="true"></i>
                <br />
                <i class="fas fa-user-plus fa-2x pt-3" aria-hidden="true"></i>
              </div>
              <div class="d-flex justify-content-between">
                <p class="mt-3">
                  <span class="text-danger">*</span> An invitation will be send
                  to the specified user
                </p>
                <div class="pull-right shado">
                  <button>Submit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "User",
};
</script>

<style scoped>
.user_area {
  text-align: left !important;
}
Button {
  height: unset;
  color: unset;
  font-family: unset;
  font-size: unset;
}
.pr-3 {
  padding-right: 10px;
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