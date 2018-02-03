<template>
  <div class="box biggerpaddingbox">
    <h3 class="title has-text-grey">{{ $t('signup') }}</h3>
    <p class="subtitle has-text-grey">{{ $t('signup_message') }}</p>
    <hr>

    <form>
      <p class="has-text-danger" :class="{ 'is-hidden' : signupErrorHidden }">{{ $t('signup_error') }}</p>
      <div class="field">
        <div class="control has-icons-left">
          <input v-model="email" class="input is-primary is-medium" type="email" :placeholder="$t('email_placeholder')" autofocus="">
          <span class="icon is-small is-left">
            <i class="fa fa-envelope"></i>
          </span>
        </div>
      </div>

      <div class="field">
        <div class="control has-icons-left">
          <input v-model="username" class="input is-primary is-medium" :placeholder="$t('username_placeholder')">
          <span class="icon is-small is-left">
            <i class="fa fa-user"></i>
          </span>
        </div>
      </div>

      <div class="field">
        <div class="control has-icons-left">
          <input v-model="displayName" class="input is-primary is-medium" :placeholder="$t('display_placeholder')">
          <span class="icon is-small is-left">
            <i class="fa fa-id-card"></i>
          </span>
        </div>
      </div>

      <div class="field">
        <div class="control has-icons-left">
          <input v-model="password" class="input is-primary is-medium" type="password" :placeholder="$t('pwd_placeholder')">
          <span class="icon is-small is-left">
            <i class="fa fa-lock"></i>
          </span>
        </div>
      </div>

      <div class="field">
        <div class="control has-icons-left">
          <input v-model="passwordConfirm" class="input is-primary is-medium" type="password" :placeholder="$t('confirmPwd_placeholder')">
          <span class="icon is-small is-left">
            <i class="fa fa-lock"></i>
          </span>
        </div>
      </div>

      <a @click="signup" :class="{ 'is-loading' : signingUp }" class="button is-block is-primary is-medium bottom-margin signupbtn">{{ $t('signup') }}</a>
    </form>

    <hr>
    <div>
      <p class="has-text-grey">{{ $t('login_question') }}</p> 
      <a class="has-text-info" @click="switchMode">{{ $t('signin') }}</a>
    </div>
  </div>
</template>

<i18n>
{
  "en": {
    "signup": "Signup",
    "signup_message": "Start organising now",
    "signup_error": "Error while signing up",
    "email_placeholder": "Email",
    "display_placeholder": "Display name",
    "username_placeholder": "Username",
    "pwd_placeholder": "Password",
    "confirmPwd_placeholder": "Confirm password",
    "login_question": "Already have an account?",
    "signin": "Signin"
  },
  "fr": {
    "signup": "S'inscrire",
    "signup_message": "Commencez dès maintenant",
    "signup_error": "Erreur lors de l'inscription",
    "email_placeholder": "Adresse courriel",
    "display_placeholder": "Nom d'affichage",
    "username_placeholder": "Nom d'utilisateur",
    "pwd_placeholder": "Mot de passe",
    "confirmPwd_placeholder": "Confirmer mot de passe",
    "login_question": "Avez-vous déjà un compte?",
    "signin": "S'authentifier"
  }
}
</i18n>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      displayName: '',
      username: '',
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
          username: this.username,
          displayName: this.displayName,
        }).then(() => {
          this.signingUp = false;
          this.signupErrorHidden = true;
          if (this.$store.getters.isLoggedIn) {
            this.$router.push('/todo');
          }
        }).catch((e) => {
          console.log(e);
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