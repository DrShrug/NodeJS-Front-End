<template>
  <div class="modal">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div class="box is-marginless top-rounded-border">
        <p class="has-text-grey-dark is-size-3">Confirmation</p>
        <hr class="navbar-divider half-size">
        <p class="has-text-grey-dark is-size-5">Are you sure you want to delete this?</p>
        <p class="has-text-grey-dark is-size-5">Every task associated with this category will also be deleted.</p>
      </div>
      <footer class="modal-card-foot">
        <button class="button is-danger" @click="this.$parent.deleteCategory">Delete</button>
        <button class="button" @click="this.$parent.cancelCategoryDelete">Cancel</button>
      </footer>
    </div>
    <button class="modal-close is-large" aria-label="close" @click="this.$parent.cancelCategoryDelete"></button>
  </div>
</template>
