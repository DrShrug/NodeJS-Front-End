<template>
  <div>
    <section class="hero is-success is-fullheight">
      <div class="hero-body">
        <div class="container has-text-centered">
          <div class="column is-4 login-block animated fadeOut fadeIn">
            <div class="flag_box box">
              <img class="flag" src="./../../assets/usa.png" alt="English" @click="changeLanguage('en')">
              <img class="flag" src="./../../assets/france.png" alt="French" @click="changeLanguage('fr')">
            </div>
          </div>
          <div class="column is-4 login-block">
            <Login :class="{ 'is-hidden' : signupMode }" class="animated fadeOut fadeIn"></Login>
            <Signup :class="{ 'is-hidden' : !signupMode }" class="animated fadeOut fadeIn"></Signup>
            
            <p class="has-text-light">{{ $t('github') }}
            <a class="has-text-info" href="https://github.com/" target="_blank">[Github]</a></p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<i18n>
{
  "en": {
    "github": "Source code : "
  },
  "fr": {
    "github": "Code source : "
  }
}
</i18n>

<script>
import Login from '@/components/Auth/AuthLogin';
import Signup from '@/components/Auth/AuthSignup';

export default {
  components: {
    Login,
    Signup,
  },
  mounted() {
    if (this.$store.getters.isLoggedIn) {
      this.$router.push('/todo');
    }
  },
  data() {
    return {
      signupMode: false,
    };
  },
  methods: {
    switchModes() {
      this.signupMode = !this.signupMode;
    },
    changeLanguage(lang) {
      this.$store.dispatch('switchLanguage', lang);
    },
  },
};
</script>

<style scoped>
.flag {
  cursor: pointer;
}
.hero.is-success {
  background:#272733;
}
.flag_box {
  padding: 0 5px 0 5px;
}
input {
  font-weight: 300;
}
p.subtitle {
  padding-top: 1rem;
}
.login-block {
  margin: auto;
}

.animated {
  animation-duration: 1s;
  animation-fill-mode: both;
}
@keyframes fadeOut {
  from {opacity: 1;}
  to {opacity: 0;}
}
@keyframes fadeIn {
  from {opacity: 0;}
  to {opacity: 1;}
}

.fadeOut {
  animation-name: fadeOut;
}

.fadeIn {
  animation-name: fadeIn;
}
</style>
