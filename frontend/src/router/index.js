import { createRouter, createWebHistory } from "vue-router";
import axios from 'axios';
import Register from "../components/Register.vue";
import Login from "../components/Login.vue";
import Dashboard from "../components/Dashboard.vue";
import AddTask from "../components/AddTask.vue";
import ViewTask from "../components/ViewTask.vue";
import UpdateTask from "../components/UpdateTask.vue";
import UpdateDetails from "../components/UpdateDetails.vue";

const routes = [
  {
    path: "/",
    name: "root",
    component: Register,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: { requiresAuth: true }, 
  },
  {
    path: "/add-task",
    name: "AddTask",
    component: AddTask,
  },
  {
    path: "/view-task",
    name: "ViewTask",
    component: ViewTask,
  },
  {
    path: "/update-task",
    name: "UpdateTask",
    component: UpdateTask,
  },
  {
    path: "/update-details",
    name: "UpdateDetails",
    component: UpdateDetails,
    props: (route) => ({
      taskDetails: {
        _id: route.query.taskId,
        taskName: "", 
        taskStatus: "",
        taskDescription: "",
        startDate: "",
        endDate: "",
      },
    }),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    axios.get('http://localhost:8081/session', { withCredentials: true })
      .then(response => {
        if (response.data.user) {
          next(); // User is authenticated, proceed to route
        } else {
          next('/login'); // User is not authenticated, redirect to login
        }
      })
      .catch((err) => {
        next('/login'); // Error checking session, redirect to login
      });
  } else {
    next(); // No authentication required, proceed to route
  }
});

export default router;

