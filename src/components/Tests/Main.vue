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
        <button class="button is-success" >Add Category</button>
        <button class="button" @click="closeModal">Cancel</button>
      </footer>
  </modalComp>
</template>

<script>
export default {
  name: 'Testing',
  data() {
    return {
      newCategoryName: '',
    };
  },
  methods: {
    closeModal() {
      this.$modal.hide('createCategory');
    },
  },
};
</script>
