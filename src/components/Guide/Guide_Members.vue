<template>
  <section class="info-tiles box">
    <div class="tile-header container">
      <p class="has-text-grey-dark is-size-4">{{ $t('header') }}</p>
      <hr class="navbar-divider half-size">
    </div>
    <div>
      <p id="addmember" class="has-text-grey-dark is-size-5">{{ $t('header_add') }}</p>
      {{ $t('add_message_pt1') }}{{ $t('add_message_pt2') }}{{ $t('add_message_pt3') }}{{ $t('add_message_pt4') }}
      <br><br>
      <p id="removemember" class="has-text-grey-dark is-size-5">{{ $t('header_remove') }}</p>
      {{ $t('remove_message_pt1') }}{{ $t('remove_message_pt2') }}
    </div>
  </section>
</template>

<i18n>
{
  "en": {
    "header": "Group members management",
    "header_add": "Adding members",
    "add_message_pt1": "As the group's admin, you can easily add and remove members. To start, simply click on the ",
    "add_message_pt2": "bars on the top left of the page to open the side menu. From there, you can add members by searching for a user ",
    "add_message_pt3": "by their unique username (not by display name, neither by email). You can then select a user and add him by clicking ",
    "add_message_pt4": "the \"Add User\" button on the bottom. The group will then appear in that user's group list. ",
    "header_remove": "Removing members",
    "remove_message_pt1": "To remove members, simply open the side menu again and go to the remove member page. On that page, you will see a list of ",
    "remove_message_pt2": "users that has access to the group. You can remove a member by simply clicking the X button on the user card."
  },
  "fr": {
    "header": "Gestion des membres du groupe",
    "header_add": "Ajouter des membres",
    "add_message_pt1": "En tant qu'administrateur du groupe, vous pouvez ajouter et retirer des membres du groupe. Commencez par cliquer sur les ",
    "add_message_pt2": "barres dans le coin en haut à gauche pour ouvrir le menu. D'içi, vous pouvez ajouter des membres en cherchant par leur nom ",
    "add_message_pt3": "d'utilisateur (pas leur courriel, ni leur nom d'affichage). Vous pouvez selectionner un utilisateur et l'ajouter en lui ",
    "add_message_pt4": "cliquant dessus et après cliquer sur \"Ajouter utilisateur\" ",
    "header_remove": "Retirer des membres",
    "remove_message_pt1": "Pour retirer des membres du groupe, ouvrez le menu encore et allez dans la section pour retirer des utilisateurs. Sur cette ",
    "remove_message_pt2": "page, vous verez les membres du groupe. Simplement cliquez sur le X pour retirer quelqu'un du groupe."
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
