<template>
  <modalComp height="auto" name="deleteTodo" @before-open="beforeOpen">
    <header class="modal-card-head">
      <p class="modal-card-title">{{ $t('modal_title') }}</p>
      <button class="delete" aria-label="close" @click="$modal.hide('deleteTodo')"></button>
    </header>
    <section class="modal-card-body">
      <div class="field">
        <p class="has-text-grey-dark is-size-5">{{ $t('confirmation_msg') }}</p>
      </div>
    </section>
    <footer class="modal-card-foot">
      <button class="button is-danger" @click="deleteTodo">{{ $t('btn_delete') }}</button>
      <button class="button" @click="$modal.hide('deleteTodo')">{{ $t('cancel') }}</button>
    </footer>
  </modalComp>
</template>

<i18n>
{
  "en": {
    "modal_title": "Confirmation",
    "confirmation_msg": "Are you sure you want to delete this?",
    "btn_delete": "Delete",
    "cancel": "Cancel"
  },
  "fr": {
    "modal_title": "Confirmation",
    "confirmation_msg": "Êtes-vous sûr de vouloir supprimer cette tâche?",
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
      this.idToDelete = event.params.toDelete;
    },
    deleteTodo() {
      this.$store.dispatch('deleteTodo', this.idToDelete).then(() => {
        this.$notify({
          type: 'success',
          title: 'Success',
          text: 'Todo has been deleted',
        });
        this.$modal.hide('deleteTodo');
        this.$socket.emit('todoChanges');
      }).catch(() => {
        this.$notify({
          type: 'error',
          title: 'Error',
          text: 'There was an error trying to delete this todo',
        });
      });
    },
  },
};
</script>

