<template>
    <nav class="navbar has-shadow" role="navigation" aria-label="dropdown navigation">
    <div class="container is-fluid">

      <div class="navbar-brand">
        <a class="navbar-item" href="/todo">
          <img src="../../static/favicon.png" alt="Bulma: a modern CSS framework based on Flexbox">
          Task Manager
        </a>

        <div class="navbar-burger burger" data-target="menu">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div class="navbar-menu" id="menu">
        <div class="navbar-start">
          <a class="navbar-item">
            Switch group
          </a>
        </div>

        <div class="navbar-end">
          <a class="navbar-item" href="https://github.com/" target="_blank">
            <span class="icon">
              <i class="fa fa-lg fa-github"></i>
            </span>
          </a>
          <a class="navbar-item" href="/test">
            Testing ground
          </a>
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">
              Account
            </a>
            <div class="navbar-dropdown is-right">
              <div class="navbar-item">
                Signed in as<br>
                {{ $store.getters.getEmail }}
              </div>
              <hr class="navbar-divider">
              <a class="navbar-item" href="/account/overview">
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
export default {
  methods: {
    logout() {
      this.$store.dispatch('userLogout').then(() => {
        this.$router.push('/');
      });
    },
  },
};
</script>
