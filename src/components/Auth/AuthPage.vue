<template>
  <div>
    <section class="hero is-success is-fullheight">
      <div class="hero-body">
        <div class="container has-text-centered">
          <div class="column is-3 login-block">
            <Login :class="{ 'is-hidden' : signupMode }"></Login>
            <Signup :class="{ 'is-hidden' : !signupMode }"></Signup>
            
            <p class="has-text-light">Source code : <a class="has-text-info">[Github]</a></p>
          </div>
        </div>
      </div>
    </section>
  </div>
  
</template>

<script>
import Login from '@/components/Auth/AuthLogin';
import Signup from '@/components/Auth/AuthSignup';

/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
/* "space-infix-ops": ["allow"] */

export default {
  components: {
    Login,
    Signup,
  },
  data() {
    return {
      email: '',
      password: '',
      loggingIn: false,
      loginErrorHidden: true,
      signupMode: false,
    };
  },
  methods: {
    switchModes() {
      this.signupMode = !this.signupMode;
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
