import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import AllTasksView from '../views/AllTasks.vue'
import MyTasksView from '../views/MyTasks.vue'
import SwapRequest from '../views/SwapRequest.vue'
import MakeupRequest from '../views/MakeupRequest.vue'
import AddTask from '../views/AddTask.vue'
import ViewTask from '../views/ViewTask.vue'
import Help from '../views/Help.vue'
import User from '../views/User.vue'
import Notification from '../views/Notification.vue'
import UserNotification from '../views/UserNotification.vue'
import Signup from "../views/Signup.vue";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/all_tasks',
    name: 'All Tasks',
    component: AllTasksView
  },
  {
    path: '/my_tasks',
    name: 'My Tasks',
    component: MyTasksView
  },
  {
    path: '/test',
    name: 'Test',
    component: Signup
  },
  {
    path: '/help',
    name: 'Help',
    component: Help
  },
  {
    path: '/house_setup',
    name: 'User',
    component: User
  },
  {
    path: '/notification',
    name: 'Notification',
    component: Notification
  },
  {
    path: '/userNotification',
    name: 'UserNotification',
    component: UserNotification
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
