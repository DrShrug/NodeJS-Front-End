<template>
  <div class="modal">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Create a new category</p>
        <button class="delete" aria-label="close" @click="this.$parent.closeCategoryModal"></button>
      </header>
      <section class="modal-card-body">
        <div class="field">
          <label class="label">Category Name</label>
          <p class="control is-expanded has-icons-left">
            <input class="input" type="text" placeholder="Name" v-model="newCategoryName">
            <span class="icon is-small is-left">
              <i class="fa fa-tags" aria-hidden="true"></i>
            </span>
          </p>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" @click="sendNewCategoryName">Add Category</button>
        <button class="button" @click="this.$parent.closeCategoryModal">Cancel</button>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newCategoryName: '',
    };
  },
  methods: {
    sendNewCategoryName() {
      if (this.newCategoryName !== '') {
        this.$parent.createNewCategory(this.newCategoryName);
      } else {
        this.$parent.$parent.updateDBPopup('All fields are required', 'is-danger', 'Warning');
      }
    },
  },
};
</script>

