<template>
  <section class="info-tiles box">
    <div class="tile-header container">
      <p class="has-text-grey-dark is-size-4">{{ $t('header') }}</p>
      <hr class="navbar-divider half-size">
    </div>
    <div>
      {{ $t('message_pt1') }}{{ $t('message_pt2') }}{{ $t('message_pt3') }}{{ $t('message_pt4') }}{{ $t('message_pt5') }}
    </div>
  </section>
</template>

<i18n>
{
  "en": {
    "header": "Todos",
    "message_pt1": "After creating your first category, you can now add todos to that category. After clicking on the \"Create todo\" ",
    "message_pt2": "button, you will be presented with a form in which you will enter a task, a category and a time limit for that todo. ",
    "message_pt3": "When a todo is uncompleted by its time limit, it will be bumped to the top of the category and will be written in red. ",
    "message_pt4": "Upon completion, it will automatically be moved to the bottom of the list. In the event that there is too many completed ",
    "message_pt5": "todos and you wish to hide them, you can simply click on \"Hide completed tasks\"."
  },
  "fr": {
    "header": "Tâches",
    "message_pt1": "Suite à la création de la première catégorie, vous pouvez maintenant ajouter des tâches à cette catégorie.",
    "message_pt2": "Après d'avoir cliqué sur le bouton pour créer une tâche, vous serez présenté avec une fenêtre dans laquelle vous allez ",
    "message_pt3": "inscrire la tâche, la catégorie et la date limite. Quand une tâche est non-complété rendu à la date limite, elle va être ",
    "message_pt4": "poussé en haut de la liste, et quand elle est complété, elle va être repoussé en bas. Dans le cas oû il y a trop de tâches ",
    "message_pt5": "complétées, vous pouvez les cacher en cliquant sur \"Masquer les tâches complétées\""
  }
}
</i18n>

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
