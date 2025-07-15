<template>
  <div>
    <TopNavBar :username="username" @logout="logout" />
    <SideNavBar :username="username" @logout="logout" />

    <!-- Contents -->
    <div class="container custom-content">
      <!-- Heading row -->
      <div class="row" style="margin: 8px;">
        <div class="col-lg-12">
          <h6>Task Report</h6>
          <p style="font-size: 10px; font-weight: 400;">Home / Dashboard</p>
        </div>
      </div>
      <!-- End of Heading row -->

      <!-- Task Details -->
      <div class="row first-row">
        <div class="col-lg-6 custom-pending" style="width: 300px;">
          <h6>Pending</h6>
          <i class="fas fa-clock custom-icon-content"></i>
          <span class="icon-content">2</span>
        </div>
        <div class="col-lg-6 custom-inprogress" style="width: 300px;">
          <h6>In-progress</h6>
          <i class="fas fa-spinner custom-icon-content"></i>
          <span class="icon-content">3</span>
        </div>
      </div>

      <div class="row second-row">
        <div class="col-lg-6 custom-completed" style="width: 300px;">
          <h6>Complete</h6>
          <i class="fas fa-check-circle custom-icon-content"></i>
          <span class="icon-content">4</span>
        </div>
        <div class="col-lg-6 custom-cancelled" style="width: 300px;">
          <h6>Cancelled</h6>
          <i class="fas fa-times custom-icon-content"></i>
          <span class="icon-content">1</span>
        </div>
      </div>
      <!-- End of custom-content -->
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import TopNavBar from './TopNavBar.vue';
import SideNavBar from './SideNavBar.vue';

export default {
  name: "Dashboard",
  components: {
    TopNavBar,
    SideNavBar
  },
  data() {
    return {
      username: ''
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
  display: flex;
  justify-content: center;
  align-items: center;
  background: #eeeeee;
  height: 100%;
}

/* content container */
.custom-content {
  position: relative;
  margin-top: -30rem;
  left: 10%;
}

.custom-pending, .custom-inprogress {
  background: #FFFFFF;
  margin: 10px;
  padding: 30px 50px;
}

.custom-completed, .custom-cancelled {
  background: #FFFFFF;
  margin: 10px;
  padding: 30px 50px;
}

.first-row, .second-row {
  margin: 10px 0 0 0;
}

.custom-icon-content {
  font-size: 1.5rem;
}

.icon-content {
  font-size: 1.5rem;
  padding: 10px;
}
</style>
