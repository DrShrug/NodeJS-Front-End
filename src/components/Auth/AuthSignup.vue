<template>
  <div class="box biggerpaddingbox">
    <h3 class="title has-text-grey">Sign up</h3>
    <p class="subtitle has-text-grey">Start organising now</p>
    <hr>

    <form>
      <p class="has-text-danger" :class="{ 'is-hidden' : signupErrorHidden }">
        Error signing up
      </p>
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

      <div class="field">
        <div class="control">
          <input v-model="passwordConfirm" class="input is-medium" type="password" placeholder="Confirm your Password">
        </div>
      </div>

      <a @click="signup" :class="{ 'is-loading' : signingUp }" class="button is-block is-primary is-medium bottom-margin loginbtn">Sign up</a>
    </form>

    <hr>
    <div>
      <p class="has-text-grey">Already have an account?</p> 
      <a class="has-text-info" @click="switchMode">Sign in</a>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Login from '@/components/Auth/AuthLogin';

/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
/* "space-infix-ops": ["allow"] */

export default {
  components: {
    Login,
  },
  data() {
    return {
      email: '',
      password: '',
      passwordConfirm: '',
      userBaseURL: 'https://nodejs-vue-js-todo.herokuapp.com/users',
      signingUp: false,
      signupErrorHidden: true,
    };
  },
  methods: {
    switchMode() {
      this.$parent.switchModes();
    },
    signup() {
      if (this.password === this.passwordConfirm) {
        this.signingUp = true;
        axios({
          method: 'POST',
          url: `${this.userBaseURL}`,
          contentType: 'application/json; charset=utf-8',
          dataType: 'json',
          data: {
            email: this.email,
            password: this.password,
          },
        }).then((res) => {
          this.signingUp = false;
          this.signupErrorHidden = true;
          localStorage.setItem('token', res.headers['x-auth']);
          this.$router.push('/todo');
        }).catch((e) => {
          this.signingUp = false;
          this.signupErrorHidden = false;
          console.log(e);
        });
      } else {
        this.signupErrorHidden = false;
      }
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