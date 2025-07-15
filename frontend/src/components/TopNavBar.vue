<template>
  <div class="container-fluid custom-container">
    <!-- Topbar Start -->
    <nav class="navbar navbar-expand-md custom-nav-bg">
      <!-- Brand -->
      <a class="navbar-brand custom-nav-brand" href="#">TASK MANAGEMENT SYSTEM</a>

      <!-- Toggler/collapsibe Button -->
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Navbar links -->
      <div class="collapse navbar-collapse custom-dropdown" id="collapsibleNavbar">
        <ul class="navbar-nav custom-nav-item">
          <!-- Dropdown -->
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbardrop" data-bs-toggle="dropdown">{{ username }}</a>
            <div class="dropdown-menu custom-dropdown-name">
              <a href="#" class="dropdown-item custom-session-name">{{ username }}</a>
              <a class="dropdown-item custom-nav-link" href="#" @click="logout">
                <i class="fas fa-sign-out-alt icon"></i> Logout
              </a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  </div>
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
</style>
