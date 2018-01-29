<template>
  <modalComp height="auto" name="deleteCategory" @before-open="beforeOpen">
    <header class="modal-card-head">
      <p class="modal-card-title">Confirmation</p>
      <button class="delete" aria-label="close" @click="$modal.hide('deleteCategory')"></button>
    </header>
    <section class="modal-card-body">
      <div class="field">
        <p class="has-text-grey-dark is-size-5">Are you sure you want to delete this?</p>
        <p class="has-text-grey-dark is-size-5">Every task associated with this category will also be deleted.</p>
      </div>
    </section>
      <footer class="modal-card-foot">
        <button class="button is-danger" @click="deleteCategory">Delete</button>
        <button class="button" @click="$modal.hide('deleteCategory')">Cancel</button>
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
      this.idToDelete = event.params.idToDelete;
    },
    deleteCategory() {
      this.$store.dispatch('deleteCategory', this.idToDelete).then(() => {
        this.$notify({
          type: 'success',
          title: 'Success',
          text: 'Category has been deleted',
        });
        this.$modal.hide('deleteCategory');
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
