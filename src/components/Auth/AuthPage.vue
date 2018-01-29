<template>
  <div>
    <section class="hero is-success is-fullheight">
      <div class="hero-body">
        <div class="container has-text-centered">
          <div class="column is-4 login-block">
            <Login :class="{ 'is-hidden' : signupMode }" class="animated fadeOut fadeIn"></Login>
            <Signup :class="{ 'is-hidden' : !signupMode }" class="animated fadeOut fadeIn"></Signup>
            
            <p class="has-text-light">Source code : 
            <a class="has-text-info" href="https://github.com/" target="_blank">[Github]</a></p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Login from '@/components/Auth/AuthLogin';
import Signup from '@/components/Auth/AuthSignup';

export default {
  components: {
    Login,
    Signup,
  },
  mounted() {
    if (sessionStorage.getItem('token') !== null) {
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
  },
};
</script>

<style scoped>
.hero.is-success {
  background:#272733;
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
