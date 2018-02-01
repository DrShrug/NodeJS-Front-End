<template>
  <div class="box biggerpaddingbox">
    <h3 class="title has-text-grey">{{ $t('login') }}</h3>
    <p class="subtitle has-text-grey">{{ $t('login_proceed') }}</p>
    <hr>

    <form>
      <p class="has-text-danger" :class="{ 'is-hidden' : loginErrorHidden }">{{ $t('auth_failed') }}</p>

      <div class="field">
        <div class="control has-icons-left">
          <input v-on:keyup.enter="login" v-model="email" class="input is-primary is-medium" type="email" :placeholder="$t('email_placeholder')" autofocus="">
          <span class="icon is-small is-left">
            <i class="fa fa-envelope"></i>
          </span>
        </div>
      </div>

      <div class="field">
        <div class="control has-icons-left">
          <input v-on:keyup.enter="login" v-model="password" class="input is-primary is-medium" type="password" :placeholder="$t('password_placeholder')">
          <span class="icon is-small is-left">
            <i class="fa fa-lock"></i>
          </span>
        </div>
      </div>

      <a @click="login" :class="{ 'is-loading' : loggingIn }" class="button is-block is-primary is-medium bottom-margin loginbtn">{{ $t('login') }}</a>
    </form>
    <hr>

    <div>
      <p class="has-text-grey">{{ $t('signup_question') }}</p> 
      <a class="has-text-info" @click="switchMode">{{ $t('signup_message') }}</a>
    </div>
  </div>
</template>

<i18n>
{
  "en": {
    "login": "Login",
    "login_proceed": "Please login to proceed",
    "auth_failed": "Authentification failed",
    "email_placeholder": "Email",
    "password_placeholder": "Password",
    "signup_question": "Don't have an account?",
    "signup_message": "Sign up"
  },
  "fr": {
    "login": "S'authentifier",
    "login_proceed": "Veuillez vous connecter",
    "auth_failed": "Échec d'authentification",
    "email_placeholder": "Adresse courriel",
    "password_placeholder": "Mot de passe",
    "signup_question": "N'avez pas encore de compte?",
    "signup_message": "S'inscire"
  }
}
</i18n>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      loggingIn: false,
      loginErrorHidden: true,
      emailPlaceholder: this.$t('test'),
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