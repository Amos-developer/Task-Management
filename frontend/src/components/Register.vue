<template>
<Dashboard />
<div class="py-1 py-md-2 custom-container">
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4 col-xxl-3">
        <div class="card border rounded-3" style="border: 2px solid red; margin-top: 20px;">
          <div class="card-body p-1 p-md-2 p-xl-3">
            <h2 class="fs-6 fw-bold text-center text-dark mb-2">TASK MANAGEMENT SYSTEM</h2>
            <form @submit.prevent="register">
              <div class="row gy-1 overflow-hidden">
                <div class="col-12">
                  <div class="form-floating mb-1">
                    <input type="text" class="form-control form-control-sm" v-model="fullname"  id="fullName" required>
                    <label for="fullName" class="form-label">Full Name</label>
                  </div>
                </div>
                <div class="col-12">
                  <div class="form-floating mb-1">
                    <input type="phone" maxlength="10" @input="validatePhone" class="form-control form-control-sm" v-model="phone" id="phone" required>
                    <label for="phone" class="form-label">Phone number</label>
                  </div>
                </div>
                <div class="col-12">
                  <div class="form-floating mb-1">
                    <input type="text" class="form-control form-control-sm" v-model="username" id="username" required>
                    <label for="username" class="form-label">Username</label>
                  </div>
                </div>
                <div class="col-12">
                  <div class="form-floating mb-1">
                    <input type="password" class="form-control form-control-sm" v-model="password" id="password" required>
                    <label for="password" class="form-label">Password</label>
                  </div>
                </div>
                <div class="col-12">
                  <div class="d-grid my-1">
                    <button class="btn btn-primary btn-sm" type="submit">Sign up</button>
                  </div>
                </div>
                <div class="col-12">
                  <p class="m-0 text-secondary text-center">Already have an account?<router-link to="/login" class="link-primary text-decoration-none">Sign In</router-link></p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      fullname: '',
      phone: '',
      username: '',
      password: ''
    };
  },
  methods: {
    register() {
      // Store the field data in the object called user
      const user = { 
        fullname: this.fullname,
        phone: this.phone,
        username: this.username,
        password: this.password
      };
      // Send data to server side using axios
      axios.post('http://localhost:8081/', user)
        .then(response => {
          alert("Registered successful...");
          this.$router.push('/login');
        })
        .catch(error => {
          console.error(error);
        });
    },
    validatePhone(e){
      const input = e.target.value.replace(/\D/g, ''); //Remove non digit characters
      this.phone = input.slice(0, 10); //Limit to 10 digits
    }
  }
};
</script>

<style scoped>
/* Add some styling here */
  .form-control-sm {
    padding: 0.25rem 0.5rem;
    font-size: 0.875rem;
  }

  .form-floating>.form-label {
    font-size: 0.875rem;
  }

  *{
    font-size: 12px;
  }

    body, html {
      height: 100%;
      margin: 0;
    }

  .custom-container{
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #EEEEEE;
  }
</style>
