<template>
  <section class="about_area pt-2 h-100">
    <div class="row">
      <div class="offset-lg-3 col-lg-6 border border-dark border-3 p-4">
        <div class="about_us">
          <h3>About Us</h3>
          <p>
            As we go through our busy lives, it is very easy to forget to manage
            our households. We often procrastinate on the cleanliness of our
            environment since we prioritize the other important responsibilities
            in our lives. This procrastination affects our lifestyle, degrades
            our motivation, and can even affect our health. You might not even
            realize how much a tidy house can affect our mental health and make
            us more or less productive. It becomes more difficult to manage
            these chores if many people are sharing the same house and same
            common spaces. It often can lead to arguments and misunderstanding
            as well. This issue can be serious whether you live with your family
            or roommates. We become less motivated to remember and accomplish
            these chores especially if we are living alone. This can cause lots
            of unnecessary mental and emotional burdens. <br />
            <br />
            The necessary conversations to begin to deal with these burdens can
            often be difficult in nature. This illustrates the need for our
            proposed application, ChoreHive. No longer does an individual have
            to tackle these conversations to improve their quality of life
            alone. Let ChoreHive help start, maintain, and finish these
            difficult conversations.
          </p>
        </div>
        <!-- <hr class="hr" />
        <div class="about_setup">
          <h3>Setup Guide</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati
            itaque facere pariatur placeat porro harum blanditiis beatae tenetur
            sed nesciunt ex, quae veritatis reprehenderit doloremque. Nihil
            perferendis aut vel accusantium!
          </p>
        </div> -->
        <div class="about_video">
          <h3>Video Guide</h3>
          <!-- <iframe
            id="videoPlayer"
            src="../assets/low_fidelity_walkthrough.mp4"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe> -->
          <video src="../assets/low_fidelity_walkthrough.mp4" controls></video>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Help",
};
</script>

<style scoped>
iframe#videoPlayer {
  width: 90%;
  height: 400px;
}

.about_area {
  text-align: left !important;
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