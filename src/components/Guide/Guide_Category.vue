<template>
  <section class="info-tiles box">
    <div class="tile-header container">
      <p class="has-text-grey-dark is-size-4">Categories</p>
      <hr class="navbar-divider half-size">
    </div>
    <div>
      When starting a new group, you will be presented with an empty todo list. To start, you must create a category as
      it a todo must be associated with a category. By clicking on the "Create category" button, you will be presented
      with a small form asking for a category name.
      <span class="has-text-danger">
        When deleting a category, you must consider the fact that by doing so will
        also delete every todo inside of that category and there is no way to recover deleted categories and todos.
      </span>
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
