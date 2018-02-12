<template>
  <modalComp height="auto" name="createGroup">
    <header class="modal-card-head">
      <p class="modal-card-title">{{ $t('modal_title') }}</p>
      <button class="delete" aria-label="close" @click="closeModal"></button>
    </header>
    <section class="modal-card-body">
      <div class="field">
        <label class="label">{{ $t('labelname') }}</label>
        <p class="control is-expanded has-icons-left">
          <input class="input" type="text" placeholder="Name" v-model="newGroupName">
          <span class="icon is-small is-left">
            <i class="fa fa-tags" aria-hidden="true"></i>
          </span>
        </p>
      </div>
    </section>
    <footer class="modal-card-foot">
      <button class="button is-success" @click="createNewCategory">{{ $t('btn_addGr') }}</button>
      <button class="button" @click="closeModal">{{ $t('cancel') }}</button>
    </footer>
  </modalComp>
</template>

<i18n>
{
  "en": {
    "modal_title": "Create a new group",
    "labelname": "Group name",
    "btn_addGr": "Add group",
    "cancel": "Cancel"
  },
  "fr": {
    "modal_title": "Créer un nouveau groupe",
    "labelname": "Nom de groupe",
    "btn_addGr": "Ajouter groupe",
    "cancel": "Annuler"
  }
}
</i18n>

<script>
export default {
  data() {
    return {
      newGroupName: '',
    };
  },
  methods: {
    closeModal() {
      this.$modal.hide('createGroup');
    },
    createNewCategory() {
      if (this.newGroupName !== '') {
        this.$store.dispatch('createGroup', { groupName: this.newGroupName }).then(() => {
          this.$notify({
            type: 'success',
            title: 'Success',
            text: 'Group has been created',
          });
          this.$store.dispatch('getGroups');
          this.$modal.hide('createGroup');
        }).catch(() => {
          this.$notify({
            type: 'error',
            title: 'Error',
            text: 'Group already exists',
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

