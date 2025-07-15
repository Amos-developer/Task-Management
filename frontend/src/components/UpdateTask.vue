<template>
  <div>
    <TopNavBar :username="username" @logout="logout"/>
    <SideNavBar :username="username" @logout="logout"/>
    <div class="container custom-content">
      <div class="row" style="margin: 8px;">
        <div class="col-lg-12">
          <h6>View Your Tasks</h6>
          <p style="font-size: 10px; font-weight: 400;">Home / Update-Task</p>
        </div>
        <div class="col-lg-12 table-responsive custom-table" style="margin: 10px 0 0 0;">
          <table class="table table-bordered" style="margin: 8px 0 0 -8px;">
            <thead class="text-center">
              <tr>
                <th>Task Name</th>
                <th>Task Status</th>
                <th>Task Description</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user_alias in User" :key="user_alias._id">
                <td>{{ user_alias.taskName }}</td>
                <td>{{ user_alias.taskStatus }}</td>
                <td>{{ user_alias.taskDescription }}</td>
                <td>{{ user_alias.startDate }}</td>
                <td>{{ user_alias.endDate }}</td>
                <td>
                  <!-- <button @click="updateTask(user_alias._id)" class="btn btn-success btn-edit">
                    <i class="fas fa-edit"></i>
                  </button> -->
                  <router-link :to="{ path: '/update-details', query: { taskId: user_alias._id }}">
                      <button class="btn btn-success btn-edit">
                      <i class="fas fa-edit"></i>
                      </button>
                  </router-link>

                  <button class="btn btn-danger btn-delete" @click="deleteTask(user_alias._id)">
                    <i class="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import TopNavBar from './TopNavBar.vue';
import SideNavBar from './SideNavBar.vue';

export default {
  name: "ViewTask",
  components: {
    TopNavBar,
    SideNavBar
  },
  data() {
    return {
      username: '',
      User: [] // Array to hold data from the database
    };
  },
  created() {
    this.getSession();
  },
  methods: {
    getSession() {
      axios.get('http://localhost:8081/session', { withCredentials: true })
        .then(response => {
          if (response.data.user) {
            this.username = response.data.user;
            this.getTasksForUser(this.username);
          } else {
            this.$router.push('/login');
          }
        })
        .catch(error => {
          console.error('Error fetching session:', error);
          this.$router.push('/login');
        });
    },
    getTasksForUser(username) {
      axios.get('http://localhost:8081/Taskdetails/${username}', { withCredentials: true })
        .then(response => {
          console.log(username);
          this.User = response.data;
        })
        .catch(error => {
          console.error('Error fetching user tasks:', error);
        });
    },
    updateTask(taskId){
      axios.get(`http://localhost:8081/Taskdetails/task/${taskId}`, { withCredentials: true })
        .then(response => {
          const taskDetails = response.data;
          console.log(response.data);
          this.$router.push({ name: 'UpdateDetails', params: { taskDetails } });
        })
        .catch(error => {
          console.error('Error fetching task details:', error);
        });
    },
    deleteTask(taskId) {
      axios.delete(`http://localhost:8081/Taskdetails/${taskId}`, { withCredentials: true })
        .then(response => {
          console.log(response.data);
          // Refresh the task list
          this.getTasksForUser();

        })
        .catch(error => {
          alert("Error during delete Task...")
          console.error('Error deleting task:', error);
          this.getTasksForUser();
        });
    },
    logout() {
      axios.post('http://localhost:8081/logout', {}, { withCredentials: true })
        .then(() => {
          this.$router.push('/login');
        })
        .catch(error => {
          console.error('Error during logout:', error);
        });
    }
  }
};
</script>

<style scoped>
body, html {
  height: 100%;
  margin: 0;
}
.custom-container {
  position: relative;
  min-height: 100vh;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #EEEEEE;
}

.custom-content {
  position: relative;
  margin-top: -30rem;
  left: 10%;
}

.btn-edit, .btn-delete {
  display: inline-block;
  margin: 2px;
}
</style>
