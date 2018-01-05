<template>
  <div>
    <section class="hero is-success is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="column is-3 login-block">
          <div class="box biggerpaddingbox">

            <h3 class="title has-text-grey">Login</h3>
            <p class="subtitle has-text-grey">Please login to proceed.</p>
            <hr>

            <form>
              <p class="has-text-danger" :class="{ 'is-hidden' : loginErrorHidden }">Authentification failed</p>

              <div class="field">
                <div class="control">
                  <input v-model="email" class="input is-medium" type="email" placeholder="Your Email" autofocus="">
                </div>
              </div>

              <div class="field">
                <div class="control">
                  <input v-model="password" class="input is-medium" type="password" placeholder="Your Password">
                </div>
              </div>
              <a @click="login" :class="{ 'is-loading' : loggingIn }" class="button is-block is-primary is-medium bottom-margin loginbtn">Login</a>
            </form>
            <hr>

            <div>
              <p class="has-text-grey">Don't have an account?</p> <a href="/" class="has-text-info">Sign Up</a>
            </div>
          </div>
          
          <p class="has-text-light">Source code : <a class="has-text-info" href="/">[Github]</a></p>
        </div>
      </div>
    </div>
</section>
    <button @click="logout">Logout</button> -->
  </div>
  
</template>

<script>
import axios from 'axios';
import Navbar from '@/components/Navbar';

/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
/* "space-infix-ops": ["allow"] */

export default {
  components: {
    Navbar,
  },
  data() {
    return {
      email: '',
      password: '',
      userBaseURL: 'https://nodejs-vue-js-todo.herokuapp.com/users',
      loggingIn: false,
      loginErrorHidden: true,
    };
  },
  methods: {
    login() {
      this.loggingIn = true;
      axios({
        method: 'POST',
        url: `${this.userBaseURL}/login`,
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: {
          email: this.email,
          password: this.password,
        },
      }).then((res) => {
        this.loggingIn = false;
        this.loginErrorHidden = true;
        localStorage.setItem('token', res.headers['x-auth']);
        console.log(res.headers['x-auth']);
        this.$router.push('/todo');
      }).catch((e) => {
        this.loggingIn = false;
        this.loginErrorHidden = false;
        console.log(e);
      });
    },
    logout() {
      axios.delete(`${this.userBaseURL}/me/logout`, {
        headers: {
          'x-auth': localStorage.getItem('token'),
        },
      }).then((res) => {
        localStorage.setItem('token', res.headers['x-auth']);
        console.log(res.headers['x-auth']);
      });
    },
  },
};
</script>

<style>
.hero.is-success {
  background:#272733;
}
.hero .nav, .hero.is-success .nav {
  -webkit-box-shadow: none;
  box-shadow: none;
}
.box {
  margin-top: 5rem;
}

input {
  font-weight: 300;
}

p.subtitle {
  padding-top: 1rem;
}
.navNoDisplacement {
  position: absolute;
  width: 100%;
}
.bottom-margin {
  margin-bottom: 12px;
}
.login-block {
  margin: auto;
}
.biggerpaddingbox {
  padding:30px;
}
.loginbtn {
  border-radius: 5px;
}
.login-form {
  width: 90%;
  margin: auto;
}
</style>
