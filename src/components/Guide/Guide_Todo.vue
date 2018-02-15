<template>
  <section class="info-tiles box">
    <div class="tile-header container">
      <p class="has-text-grey-dark is-size-4">Todos</p>
      <hr class="navbar-divider half-size">
    </div>
    <div>
      After creating your first category, you can now add todos to that category. After clicking on the "Create todo"
      button, you will be presented with a form in which you will enter a task, a category and a time limit for that todo.
      When a todo is uncompleted by its time limit, it will be bumped to the top of the category and will be written in red.
      Upon completion, it will automatically be moved to the bottom of the list. In the event that there is too many completed
      todos and you wish to hide them, you can simply click on "Hide completed tasks".
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
