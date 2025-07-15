<template>
    <div>
        <TopNavBar  :username="username" @logout="logout" />
        <SideNavBar :username="username" @logout="logout"/> 
    <div class="container custom-content">
      <div class="row" style="margin: 8px;">
        <div class="col-lg-12">
          <h6>View Your Tasks</h6>
          <p style="font-size: 10px; font-weight: 400;">Home / Update-Details</p>
        </div>

        <div class="col-lg-12" style="margin: 10px 0 0 0">
          <form @submit.prevent="updateTask" class="custom-form">
            <div class="mb-3 custom-input">
              <label for="taskInput" class="form-label">Task Name</label>
              <input type="text" v-model="taskDetails.taskName" class="form-control" style="width: 300px;">
            </div>
            <div class="mb-3 custom-input">
              <label for="taskStatus" class="form-label">Status</label>
              <input type="text" v-model="taskDetails.taskStatus" class="form-control" style="width: 300px;">
            </div>
            <div class="form-group custom-input">
              <label for="description" class="form-label">Task Description</label><br>
              <textarea id="description" v-model="taskDetails.taskDescription" style="width: 400px;" required></textarea>
            </div><br>
            <div class="mb-3 custom-input">
              <label class="form-label">Start Date</label>
              <input type="date" v-model="taskDetails.startDate" class="form-control" style="width: 300px;">
            </div>
            <div class="mb-3 custom-input">
              <label class="form-label">End Date</label>
              <input type="date" v-model="taskDetails.endDate" class="form-control" style="width: 300px;">
            </div>
            <button type="submit" class="btn btn-primary custom-input">Submit</button>
          </form>
        </div>
      </div>
    </div>  
    </div>
</template>

<script>
import TopNavBar from "./TopNavBar";
import SideNavBar from "./SideNavBar";
import axios from "axios";

export default {
    name: "UpdateDetails",
    components:{
        TopNavBar,
        SideNavBar,
    },
    props: ['taskDetails'],
    data(){
        return{
        username: "",
        }
    },
    created(){
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
    updateTask() {
      axios.put(`http://localhost:8081/Taskdetails/${this.username}/${this.taskDetails._id}`, this.taskDetails, { withCredentials: true })
        .then(response => {
          console.log(response.data);
          this.$router.push('/view-task');
        })
        .catch(error => {
          console.error('Error updating task:', error);
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
    }
}
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