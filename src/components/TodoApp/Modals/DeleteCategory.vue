<template>
  <modalComp height="auto" name="deleteCategory" @before-open="beforeOpen">
    <header class="modal-card-head">
      <p class="modal-card-title">{{ $t('modal_title') }}</p>
      <button class="delete" aria-label="close" @click="$modal.hide('deleteCategory')"></button>
    </header>
    <section class="modal-card-body">
      <div class="field">
        <p class="has-text-grey-dark is-size-5">{{ $t('message_top') }}</p>
        <p class="has-text-grey-dark is-size-5">{{ $t('message_bottom') }}</p>
      </div>
    </section>
      <footer class="modal-card-foot">
        <button class="button is-danger" @click="deleteCategory">{{ $t('btn_delete') }}</button>
        <button class="button" @click="$modal.hide('deleteCategory')">{{ $t('cancel') }}</button>
      </footer>
  </modalComp>
</template>

<i18n>
{
  "en": {
    "modal_title": "Confirmation",
    "message_top": "Are you sure you want to delete this?",
    "message_bottom": "Every task associated with this category will be deleted",
    "btn_delete": "Delete",
    "cancel": "Cancel"
  },
  "fr": {
    "modal_title": "Confirmation",
    "message_top": "Êtes-vous sûr de vouloir supprimer cette catégorie",
    "message_bottom": "Toutes tâches associées avec cette catégorie seront aussi supprimé",
    "btn_delete": "Supprimer",
    "cancel": "Annuler"
  }
}
</i18n>

<script>
export default {
  data() {
    return {
      idToDelete: null,
    };
  },
  methods: {
    beforeOpen(event) {
      this.idToDelete = event.params.idToDelete;
    },
    deleteCategory() {
      this.$store.dispatch('deleteCategory', this.idToDelete).then((res) => {
        this.$notify({
          type: 'success',
          title: 'Success',
          text: 'Category has been deleted',
        });
        this.$modal.hide('deleteCategory');
        console.log(res.data);
        this.$socket.emit('categoryChanges', {
          user: this.$store.getters.getUsername,
          action: `has deleted a category "${res.data.category.categoryName}"`,
        });
      }).catch(() => {
        this.$notify({
          type: 'error',
          title: 'Error',
          text: 'There was an error trying to delete this category',
        });
      });
    },
  },
};
</script>
