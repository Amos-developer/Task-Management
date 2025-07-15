<template>
  <div class="py-1 py-md-2 custom-container" style="height: 100vh;">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4 col-xxl-3">
          <div class="card border border-light-subtle rounded-3 shadow-sm">
            <div class="card-body p-1 p-md-2 p-xl-3">
              <h2 class="fs-6 fw-normal text-center text-secondary mb-2">Enter your details to login</h2>
              <form @submit.prevent="Login">
                <div class="row gy-1 overflow-hidden">
                  <div class="col-12">
                    <div class="form-floating mb-1">
                      <input type="text" class="form-control form-control-sm" v-model="username" id="username" required />
                      <label for="username" class="form-label">Username</label>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="form-floating mb-1">
                      <input type="password" class="form-control form-control-sm" v-model="password" id="password" required />
                      <label for="password" class="form-label">Password</label>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="d-grid my-1">
                     <button class="btn btn-primary btn-sm w-100" type="submit">Log In</button>
                    </div>
                  </div>
                  <div class="col-12">
                    <p class="m-0 text-secondary text-center">Don't have an account? <router-link to="/register" class="link-primary text-decoration-none">Sign up</router-link></p>
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
  name: "Login",
  data(){
    return {
    username: '',
    password: '',
    }
  },
  methods: {
    Login(){
      // Get the data and store them in object
      const userData = {
        username : this.username, 
        password : this.password
      };

      axios.post('http://localhost:8081/login', userData, {withCredentials: true})
      .then((response)=>{
        console.log(response.data.message);
        if(response.status === 200){
          alert("Login successfully....");
          this.$router.push('/dashboard');
        }else{
          window.alert('Login Failed');
          this.$router.push('/login');
        }
      })
      .catch((error)=>{
        this.error = error.response.data.message;
        console.log("Error during login "+ error);
        if (error.response && error.response.data && error.response.data.message) {
            alert(error.response.data.message);
        } else {
            alert('Login failed');
        }
      });
    }
  }
};
</script>

<style scoped>
/* Add your custom styles here */
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
