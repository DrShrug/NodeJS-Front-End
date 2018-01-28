<template>
  <modalComp height="auto" name="createCategory">
    <header class="modal-card-head">
      <p class="modal-card-title">Create a new category</p>
      <button class="delete" aria-label="close" @click="closeModal"></button>
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
      <button class="button is-success" @click="createNewCategory">Add Category</button>
      <button class="button" @click="closeModal">Cancel</button>
    </footer>
  </modalComp>
</template>

<script>
export default {
  data() {
    return {
      newCategoryName: '',
    };
  },
  methods: {
    closeModal() {
      this.$modal.hide('createCategory');
    },
    createNewCategory() {
      if (this.newCategoryName !== '') {
        this.$store.dispatch('newCategory', { categoryName: this.newCategoryName }).then(() => {
          this.$notify({
            type: 'success',
            title: 'Success',
            text: 'Category has been created',
          });
          this.$modal.hide('createCategory');
        }).catch(() => {
          this.$notify({
            type: 'error',
            title: 'Error',
            text: 'Category already exists',
          });
        });
      } else {
        this.$notify({
          type: 'error',
          title: 'Error',
          text: 'All fields must be filled',
        });
      }
    },
  },
};
</script>

