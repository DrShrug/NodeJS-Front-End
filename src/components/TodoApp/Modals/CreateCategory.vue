<template>
  <modalComp height="auto" name="createCategory">
    <header class="modal-card-head">
      <p class="modal-card-title">{{ $t('modal_title') }}</p>
      <button class="delete" aria-label="close" @click="closeModal"></button>
    </header>
    <section class="modal-card-body">
      <div class="field">
        <label class="label">{{ $t('labelname') }}</label>
        <p class="control is-expanded has-icons-left">
          <input class="input" type="text" placeholder="Name" v-model="newCategoryName">
          <span class="icon is-small is-left">
            <i class="fa fa-tags" aria-hidden="true"></i>
          </span>
        </p>
      </div>
    </section>
    <footer class="modal-card-foot">
      <button class="button is-success" @click="createNewCategory">{{ $t('btn_addCat') }}</button>
      <button class="button" @click="closeModal">{{ $t('cancel') }}</button>
    </footer>
  </modalComp>
</template>

<i18n>
{
  "en": {
    "modal_title": "Create a new category",
    "labelname": "Category name",
    "btn_addCat": "Add category",
    "cancel": "Cancel"
  },
  "fr": {
    "modal_title": "Créer une nouvelle catégorie",
    "labelname": "Nom de catégorie",
    "btn_addCat": "Ajouter catégorie",
    "cancel": "Annuler"
  }
}
</i18n>

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
        this.$store.dispatch('newCategory', { categoryName: this.newCategoryName }).then((res) => {
          this.$notify({
            type: 'success',
            title: 'Success',
            text: 'Category has been created',
          });
          this.newCategoryName = '';
          this.$modal.hide('createCategory');
          this.$socket.emit('categoryChanges', {
            user: this.$store.getters.getUsername,
            action: `has created a category "${res.data.categoryName}"`,
          });
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

