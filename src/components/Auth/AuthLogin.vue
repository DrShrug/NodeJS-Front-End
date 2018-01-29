<template>
  <div class="box biggerpaddingbox">
    <h3 class="title has-text-grey">Login</h3>
    <p class="subtitle has-text-grey">Please login to proceed.</p>
    <hr>

    <form>
      <p class="has-text-danger" :class="{ 'is-hidden' : loginErrorHidden }">Authentification failed</p>

      <div class="field">
        <div class="control has-icons-left">
          <input v-on:keyup.enter="login" v-model="email" class="input is-primary is-medium" type="email" placeholder="Your Email" autofocus="">
          <span class="icon is-small is-left">
            <i class="fa fa-envelope"></i>
          </span>
        </div>
      </div>

      <div class="field">
        <div class="control has-icons-left">
          <input v-on:keyup.enter="login" v-model="password" class="input is-primary is-medium" type="password" placeholder="Your Password">
          <span class="icon is-small is-left">
            <i class="fa fa-lock"></i>
          </span>
        </div>
      </div>

      <a @click="login" :class="{ 'is-loading' : loggingIn }" class="button is-block is-primary is-medium bottom-margin loginbtn">Login</a>
    </form>
    <hr>

    <div>
      <p class="has-text-grey">Don't have an account?</p> 
      <a class="has-text-info" @click="switchMode">Sign Up</a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      loggingIn: false,
      loginErrorHidden: true,
    };
  },
  methods: {
    switchMode() {
      this.$parent.switchModes();
    },
    login() {
      this.loggingIn = true;
      this.$store.dispatch('userLogin', {
        email: this.email,
        password: this.password,
      }).then(() => {
        this.loggingIn = false;
        this.loginErrorHidden = true;
        if (this.$store.getters.isLoggedIn) {
          this.$router.push('/todo');
        }
      }).catch(() => {
        this.loggingIn = false;
        this.loginErrorHidden = false;
      });
    },
  },
};
</script>

<style>
.hero.is-success {
  background:#272733;
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
.login-block {
  margin: auto;
}
.biggerpaddingbox {
  padding:30px;
}
.loginbtn {
  border-radius: 5px;
}
</style>