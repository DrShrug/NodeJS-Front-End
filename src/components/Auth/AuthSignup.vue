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
        <div class="control has-icons-left">
          <input v-model="email" class="input is-primary is-medium" type="email" placeholder="Your Email" autofocus="">
          <span class="icon is-small is-left">
            <i class="fa fa-envelope"></i>
          </span>
        </div>
      </div>

      <div class="field">
        <div class="control has-icons-left">
          <input v-model="password" class="input is-primary is-medium" type="password" placeholder="Your Password">
          <span class="icon is-small is-left">
            <i class="fa fa-lock"></i>
          </span>
        </div>
      </div>

      <div class="field">
        <div class="control has-icons-left">
          <input v-model="passwordConfirm" class="input is-primary is-medium" type="password" placeholder="Confirm your Password">
          <span class="icon is-small is-left">
            <i class="fa fa-lock"></i>
          </span>
        </div>
      </div>

      <a @click="signup" :class="{ 'is-loading' : signingUp }" class="button is-block is-primary is-medium bottom-margin signupbtn">Sign up</a>
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

export default {
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
          localStorage.setItem('email', res.data.email);
          this.$router.push('/todo');
        }).catch(() => {
          this.signingUp = false;
          this.signupErrorHidden = false;
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
.box {
  margin-top: 5rem;
}
input {
  font-weight: 300;
}
p.subtitle {
  padding-top: 1rem;
}
.bottom-margin {
  margin-bottom: 12px;
}
.biggerpaddingbox {
  padding:30px;
}
.signupbtn {
  border-radius: 5px;
}
</style>