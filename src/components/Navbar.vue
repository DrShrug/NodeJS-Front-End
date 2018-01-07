<template>
    <nav class="navbar has-shadow" role="navigation" aria-label="dropdown navigation">
    <div class="container is-fluid">

      <div class="navbar-brand">
        <div class="navbar-item">
            <img src="../assets/todologo.png" alt="Bulma: a modern CSS framework based on Flexbox">
            Todo
        </div>

        <div class="navbar-burger burger" data-target="menu">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div class="navbar-menu" id="menu">
        <div class="navbar-start">
          <!-- Left side -->
        </div>

        <div class="navbar-end">
          <a class="navbar-item" href="https://github.com/">
            <span class="icon">
              <i class="fa fa-lg fa-github"></i>
            </span>
          </a>
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">
              Account
            </a>
            <div class="navbar-dropdown is-right">
              <div class="navbar-item">
                Signed in as<br>
                {{ userEmail }}
              </div>
              <hr class="navbar-divider">
              <a class="navbar-item">
                Overview
              </a>
              <a class="navbar-item">
                Settings
              </a>
              <hr class="navbar-divider">
              <a class="navbar-item" @click="logout">
                Logout
              </a>
            </div>
          </div>
        </div>
      </div>

    </div>
  </nav>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      userEmail: localStorage.getItem('email'),
      userBaseURL: 'https://nodejs-vue-js-todo.herokuapp.com/users',
    };
  },
  methods: {
    logout() {
      axios.delete(`${this.userBaseURL}/me/logout`, {
        headers: {
          'x-auth': localStorage.getItem('token'),
        },
      }).then(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        this.$router.push('/');
        // console.log(res.headers['x-auth']);
      });
    },
  },
};
</script>
