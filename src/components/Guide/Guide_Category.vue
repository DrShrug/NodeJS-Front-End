<template>
  <section class="info-tiles box">
    <div class="tile-header container">
      <p class="has-text-grey-dark is-size-4">{{ $t('header') }}</p>
      <hr class="navbar-divider half-size">
    </div>
    <div>
     {{ $t('message_pt1') }}{{ $t('message_pt2') }}{{ $t('message_pt3') }}
      <span class="has-text-danger">
        {{ $t('danger_pt1') }}{{ $t('danger_pt2') }}
      </span>
    </div>
  </section>
</template>

<i18n>
{
  "en": {
    "header": "Categories",
    "message_pt1": "When starting a new group, you will be presented with an empty todo list. To start, you must create a category as ",
    "message_pt2": "it a todo must be associated with a category. By clicking on the \"Create category\" button, you will be presented ",
    "message_pt3": "with a small form asking for a category name.",
    "danger_pt1": "When deleting a category, you must consider the fact that by doing so will ",
    "danger_pt2": "also delete every todo inside of that category and there is no way to recover deleted categories and todos."
  },
  "fr": {
    "header": "Catégories",
    "message_pt1": "Suite à la création d'un nouveau groupe, vous serez présenté avec une liste de tâches vide. Pour commencer, vous devez créer ",
    "message_pt2": "une nouvelle catégorie car toutes les tâches doivent être dans une catégorie. En cliquant sur le bouton pour créer une catégorie, ",
    "message_pt3": "vous serez présenté avec une fenêtre où vous devez inscrire le nom de la catégorie.",
    "danger_pt1": "Quand vous supprimmez une catégorie, vous devez prendre en compte que toutes les tâches associées avec cette catégorie seront ",
    "danger_pt2": "aussi supprimées avec aucune façon de les récupérer."
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
