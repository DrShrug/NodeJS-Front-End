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
export default {
  data() {
    return {
      email: '',
      password: '',
      passwordConfirm: '',
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
        this.$store.dispatch('userSignup', {
          email: this.email,
          password: this.password,
        }).then(() => {
          this.signingUp = false;
          this.signupErrorHidden = true;
          if (this.$store.getters.isLoggedIn) {
            this.$router.push('/todo');
          }
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