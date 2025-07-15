<template>
  <div>
    <TopNavBar :username="username" @logout="logout" />
    <SideNavBar :username="username" @logout="logout" />
    <div class="container custom-content">
      <div class="row" style="margin: 8px;">
        <div class="col-lg-12">
          <h6>Add Your Task</h6>
          <p style="font-size: 10px; font-weight: 400;">Home / Add-Task</p>
        </div>

        <div class="col-lg-12" style="margin: 10px 0 0 0">
          <form @submit.prevent="insertTasks" class="custom-form">
            <div class="mb-3 custom-input">
              <label for="taskInput" class="form-label">Task Name</label>
              <input type="text" v-model="taskName" class="form-control" style="width: 300px;">
            </div>
            <div class="mb-3 custom-input">
              <label for="taskStatus" class="form-label">Status</label>
              <input type="text" v-model="taskStatus" class="form-control" style="width: 300px;">
            </div>
            <div class="form-group custom-input">
              <label for="description" class="form-label">Task Description</label><br>
              <textarea id="description" v-model="taskDescription" style="width: 400px;" required></textarea>
            </div><br>
            <div class="mb-3 custom-input">
              <label class="form-label">Start Date</label>
              <input type="date" v-model="startDate" class="form-control" style="width: 300px;">
            </div>
            <div class="mb-3 custom-input">
              <label class="form-label">End Date</label>
              <input type="date" v-model="endDate" class="form-control" style="width: 300px;">
            </div>
            <button type="submit" class="btn btn-primary custom-input">Submit</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import TopNavBar from './TopNavBar.vue';
import SideNavBar from './SideNavBar.vue';

axios.defaults.withCredentials = true;

export default {
  name: "AddTask",
  components: {
    TopNavBar,
    SideNavBar
  },
  data() {
    return {
      username: '',
      taskName: '',
      taskStatus: '',
      taskDescription: '',  
      startDate: '',
      endDate: ''
    };
  },
  created() {
    this.getSession();
  },
  methods: {
    getSession() {
      axios.get('http://localhost:8081/session')
        .then(response => {
          if (response.data.user) {
            this.username = response.data.user;
          } else {
            this.$router.push('/login');
          }
        })
        .catch(error => {
          console.error('Error fetching session:', error);
          this.$router.push('/login');
        });
    },
    logout() {
      axios.post('http://localhost:8081/logout')
        .then(() => {
          this.$router.push('/login');
        })
        .catch(error => {
          console.error('Error during logout:', error);
        });
    },
    insertTasks() {
      const task = {
        taskName: this.taskName,
        taskStatus: this.taskStatus,
        taskDescription: this.taskDescription,
        startDate: this.startDate,
        endDate: this.endDate
      };

      axios.post("http://localhost:8081/Task", task)
        .then((response) => {        
          if(response.status === 200){
            alert("Details saved successfully");
            this.taskName = '';
            this.taskStatus = '';
            this.taskDescription = '';
            this.startDate = '';
            this.endDate = '';
            this.$router.push("/view-task");
          } else {
            alert("Details not saved successfully");
            this.$router.push("/add-task");
          }
        }).catch((err) => {
          console.log(err.message);
          this.$router.push("/add-task");
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

.custom-input {
  display: inline-block;
  margin: 5px;
}

.custom-form {
  background: #FFFFFF;
  border-radius: 8px;
  margin: 10px 0 0 -5px;
}

.custom-form button {
  padding: 3px 30px;
  margin: 0 0 5px 515px;
}
</style>
