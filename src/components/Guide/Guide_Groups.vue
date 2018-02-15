<template>
  <section class="info-tiles box">
    <div class="tile-header container">
      <p class="has-text-grey-dark is-size-4">Groups</p>
      <hr class="navbar-divider half-size">
    </div>
    <div>
      Upon account creation, you will have no groups to select. From here, you can either create a group or
      get invited into one. You can then select one of the groups to be redirected to the group's shared
      todo list.
    </div>
  </section>
</template>

<style>
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
</style>
