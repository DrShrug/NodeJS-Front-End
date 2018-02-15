<template>
  <div id="group-manager">
    <Navbar />
    <div class="sidemenu-relative">
      <Sidemenu ref="sidemenu" class="sidemenu" />
      <div class="container box spacer is-shadowless">
        <!-- Hero -->
        <section class="hero is-info welcome is-small">
          <div class="hero-body">
            <h1 class="title">
              Group Overview
            </h1>
            <h2 class="subtitle">
              {{ $store.getters.getSelectedGroupObject.groupName }}
            </h2>
          </div>
        </section>

        <!-- Quick information overview -->
        <section class="info-tiles box">
          <div class="tile-header container">
            <p class="has-text-grey-dark is-size-4">Info</p>
            <hr class="navbar-divider half-size">
          </div>
        </section>

        <!-- Charts and graphs -->
        <div class="box">
          <div class="tile-header container">
            <p class="has-text-grey-dark is-size-4">More info</p>
            <hr class="navbar-divider half-size">
          </div>
        </div>

        <!-- Completion details -->
        <div class="box">
          <div class="tile-header container">
            <p class="has-text-grey-dark is-size-4">Lots of info</p>
            <hr class="navbar-divider half-size">
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar';
import Sidemenu from '@/components/Sidemenu';

export default {
  components: {
    Navbar,
    Sidemenu,
  },
  methods: {
    scroll() {
      document.getElementById('addMember').scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    },
  },
};
</script>


<style scoped>
  #group-manager {
    background-color: #F5F6F7;
  }
  .spacer {
    background-color: transparent;
  }
  .welcome-message-area {
    margin-bottom: 10px;
  }
  .icon-spacing {
    margin-right: 10px;
  }
  .info-tiles {
    margin: 1rem 0;
  }
  .info-tiles .subtitle {
    font-weight: 300;
  }
  .hero.welcome.is-info {
    background: #36D1DC;
    background: -webkit-linear-gradient(to right, #5B86E5, #36D1DC);
    background: linear-gradient(to right, #5B86E5, #36D1DC);
  }
  .tile-header {
    margin-bottom: 20px;
    width: 50%;
  }
  .sidemenu {
    position: absolute;
    top: 0;
    z-index: 10;
  }
</style>