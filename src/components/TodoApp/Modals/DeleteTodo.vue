<template>
  <modalComp height="auto" name="deleteTodo" @before-open="beforeOpen">
    <header class="modal-card-head">
      <p class="modal-card-title">Confirmation</p>
      <button class="delete" aria-label="close" @click="$modal.hide('deleteTodo')"></button>
    </header>
    <section class="modal-card-body">
      <div class="field">
        <p class="has-text-grey-dark is-size-5">Are you sure you want to delete this?</p>
      </div>
    </section>
    <footer class="modal-card-foot">
      <button class="button is-danger" @click="deleteTodo">Delete</button>
      <button class="button" @click="$modal.hide('deleteTodo')">Cancel</button>
    </footer>
  </modalComp>
</template>

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

