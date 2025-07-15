<template>
  <nav class="navbar bg-light custom-vertical-nav">
    <!-- Links -->
    <ul class="navbar-nav custom-ul">
      <li class="nav-item">
        <i class="fas fa-dashboard icon"></i>
        <router-link to="/dashboard" class="nav-link custom-nav-link">Dashboard</router-link>
      </li>
      <li class="nav-item custom-nav-side-link">
        <i class="fas fa-plus icon"></i>
        <router-link to="/add-task" class="nav-link custom-nav-link" id="first-link">Add Task</router-link>
      </li>
      <li class="nav-item custom-nav-side-link">
        <i class="fas fa-eye icon"></i>
        <router-link to="/view-task" class="nav-link custom-nav-link" id="second-link">View Task</router-link>
      </li>
      <li class="nav-item custom-nav-side-link">
        <i class="fas fa-edit icon"></i>
        <router-link to="/update-task" class="nav-link custom-nav-link" id="third-link">Update Task</router-link>
      </li>
      <li class="nav-item custom-logout">
        <i class="fas fa-sign-out-alt icon"></i>
        <a class="nav-link custom-nav-link" href="#" @click="logout" id="fourth-link">Log Out</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    username: {
      type: String,
      required: true
    }
  },
  methods: {
    logout() {
        this.$emit('logout');
    }
  }
}
</script>

<style scoped>

body,
html {
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

.custom-nav-bg {
  z-index: 20;
  background-color: #ffffff;
  border-bottom: 2px solid #444242;
  position: fixed;
  top: 0;
  width: 100%;
  height: auto;
}

.custom-nav-brand {
  font-size: 16px;
  font-weight: 600;
}

.custom-vertical-nav {
  position: fixed;
  background: #ffffff;
  left: 0;
  top: 45px;
  width: 180px;
  height: 360px;
}

.icon,
.custom-nav-link {
  display: inline-block;
  padding: 2px;
}

.icon{
  text-align: center;
}

.custom-ul {
  margin-top: -7rem;
  width: 100%;
}

.nav-item:hover {
  background: #eeeeee;
}

.custom-logout {
  margin: 10rem 0 0 0;
}

.custom-dropdown {
  display: flex;
  justify-content: right;
  text-align: right;
}

.custom-session-name {
  border-bottom: 2px solid #eeeeee;
}

.custom-nav-item {
  border: 1px solid #eeeeee;
  margin-right: 5rem;
}

/* Side container */
.custom-content{
  position: relative;
  margin-top: 2rem;
  left: 10%;
}

.custom-pending, .custom-inprogress{
  background: #FFFFFF;
  /* box-shadow: 10px 10px 20px 20px #f3e4e4; */
  margin: 10px;
  padding: 30px 50px;
}

.custom-completed, .custom-cancelled{
  background: #FFFFFF;
  /* box-shadow: 10px 10px 20px 20px #fdf6f6; */
  margin: 10px;
  padding: 30px 50px;
}

.first-row, .second-row{
  margin: 10px 0 0 0;
}

.custom-nav-side-link{
  margin: 10px 0 0 20px;
}

.custom-nav-side-link:hover{
  background: blue;
  color: #FFFFFF;
}

.custom-logout:hover{
  background: blue;
  color: #FFFFFF;
}

.custom-icon-content{
  font-size: 1.5rem;
}

.icon-content{
  font-size: 1.5rem;
  padding: 10px;
}

#first-link:hover{
  color: #FFFFFF;
}

#second-link:hover{
  color: #FFFFFF;
}

#third-link:hover{
  color: #FFFFFF;
}

#fourth-link:hover{
  color: #FFFFFF;
}

</style>

