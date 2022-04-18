<template>
  <div class="text-center section">
      <div :class="singleUser ? 'hide' : 'user-ref'"> 
          <div v-for='user in users' :key='user'>
              <div class="user-display">
                <div :class="'circle '+ userColorArray.get(user)"/>
                    <div>&nbsp;&nbsp;&nbsp;{{user}}</div>
              </div>
          </div>
      </div>
    <Calendar :attributes="attributes" is-expanded @dayclick='dayClicked'/>
    <hr class="solid">
    <div
        v-if='selectedDay'
        class='selected-day'>
        <h3>{{ selectedDay.date.toDateString() }}</h3>
            <div class="user-ref">
                <div
                    v-for='attr in selectedDay.attributes'
                    :key='attr.key'>
                    <div :class="'card ' + userColorArray.get(attr.customData.owner)">
                        {{ attr.customData.owner }}: {{ attr.customData.description }}
                    </div>
                </div>
            </div>
    </div>
  </div>
</template>

<script>
import {Calendar} from 'v-calendar';
export default {
    name: "EventCalendar",
    components: {
        Calendar
    },
    props: { tasks: Array, currentUser: String, singleUser: Boolean },
    data() {
        return {
            selectedDay: null, // Add state to store selected day
            users: null,
            userColorArray: null,
        };
    },
    computed: {

        attributes() {
            this.users = this.getUsers();
            this.userColorArray = this.generateColor(this.users);
            
            return this.tasks.map(t => ({
                key: `tasks.${t.id}`,
                dot: this.userColorArray.get(t.owner),
                dates: this.convertToDate(t.due_date),
                customData: t,
            }));
        },
    },
    methods: {
        generateColor(users) {
            var colorArray = ['red', 'blue', 'purple', 'yellow', 'green', 'orange']

            var color = new Map();
            for (var i = 0; i < users.length; i++) {
                color.set(users[i], colorArray[i]);
            }
            return color;
        },
        getUsers() {
            var userArray = new Array();
            this.tasks.forEach(t => {
                if (!userArray.includes(t.owner)) {
                    userArray.push(t.owner);
                }
            });
            return userArray;
        },
        convertToDate(date) {
            var date_array = String(date).split("/");
            var year = new Date().getFullYear();
            var month = parseInt(date_array[0]) - 1;
            var day = parseInt(date_array[1]);
            
            return new Date(year, month, day);
        },
        dayClicked(day) {
            this.selectedDay = day;
        },
    },
};
</script>

<style>
.vc-day {
    padding: 0 5px 3px 5px;
    text-align: left;
    height: 40px;
    background-color: white;
}
.weekday-1 {
      background-color: #eff8ff;
}
.weekday-7 {
      background-color: #eff8ff;
}
.vc-header {
    background-color: #f1f5f8;
    padding: 10px 0;
}

.vc-day:not(.on-right) {
      border-right: 1px solid #b8c2cc;
}

.vc-day:not(.on-bottom) {
    border-bottom: 1px solid #b8c2cc;
}

.vc-weeks {
    z-index: 0;
    padding: 0px  !important;;
}

.vc-weekday {
    background-color: #f8fafc;
    border-bottom: 1px solid #eaeaea;
    border-top: 1px solid #eaeaea;
    padding: 5px 0;
}

.circle {
  margin-top: 5px;
  margin-right: -8px;
  height: 10px;
  width: 10px;
  border-radius: 50%;
}

.red {
  background-color: #f56565;
}

.blue {
  background-color: #4299e1;
}
.purple {
  background-color: #9f7aea;
}
.yellow {
  background-color: #ecc94b;
}
.green {
  background-color:  #48bb78; 
}
.orange {
  background-color: #ed8936;
}

.user-ref {
    display: flex;
    align-content: center;
    justify-content: center;
}

.user-display {
    display: flex;
    margin: 0 8px;
}

.selected-day {
    justify-content: center;
    text-align: center;
}

.card {
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  border-radius: 5px; /* 5px rounded corners */
  padding: 16px;
  margin: 8px;
  height: 75px;
}

hr.solid {
  border-top: 3px solid #bbb;
}

.hide {
    display: none;
}

</style>