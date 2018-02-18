<template>
  <section class="info-tiles box">
    <div class="tile-header container">
      <p class="has-text-grey-dark is-size-4">{{ $t('header') }}</p>
      <hr class="navbar-divider half-size">
    </div>
    <div>
      {{ $t('message_pt1') }}{{ $t('message_pt2') }}
    </div>
  </section>
</template>

<i18n>
{
  "en": {
    "header": "Groups",
    "message_pt1": "Upon account creation, you will have no groups to select. From here, you can either create a group or get invited into one. ",
    "message_pt2": "You can then select one of the groups to be redirected to the group's shared todo list."
  },
  "fr": {
    "header": "Groupes",
    "message_pt1": "Suite à la création du compte, vous n'aurez aucun groupe. Vous devez donc soit en créer un, ou se faire inviter dans un. ",
    "message_pt2": "En selectionnant un groupe, vous serez redirigé vers la liste des tâches de ce groupe."
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
