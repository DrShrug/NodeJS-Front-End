<template>
  <section class="info-tiles box">
    <div class="tile-header container">
      <p class="has-text-grey-dark is-size-4">Group members management</p>
      <hr class="navbar-divider half-size">
    </div>
    <div>
      <p id="addmember" class="has-text-grey-dark is-size-5">Adding members</p>
      As the group's admin, you can easily add and remove members. To start, simply click on the
      bars on the top left of the page to open the side menu. From there, you can add members by searching for a user
      by their unique username (not by display name, neither by email). You can then select a user and add him by clicking
      the "Add User" button on the bottom. The group will then appear in that user's group list.
      <br><br>
      <p id="removemember" class="has-text-grey-dark is-size-5">Removing members</p>
      To remove members, simply open the side menu again and go to the remove member page. On that page, you will see a list of
      users that has access to the group. You can remove a member by simply clicking the X button on the user card.
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
