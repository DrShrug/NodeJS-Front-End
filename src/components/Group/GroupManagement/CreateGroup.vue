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
          <input class="input" type="text" :placeholder="$t('labelname')" v-model="newGroupName">
          <span class="icon is-small is-left">
            <i class="fa fa-tags" aria-hidden="true"></i>
          </span>
        </p>
      </div>
      <div class="field">
        <label class="label">{{ $t('labeldesc') }}</label>
        <p class="control is-expanded has-icons-left">
          <input class="input" type="text" :placeholder="$t('labeldesc')" v-model="newGroupDesc">
          <span class="icon is-small is-left">
            <i class="fa fa-tags" aria-hidden="true"></i>
          </span>
        </p>
      </div>
    </section>
    <footer class="modal-card-foot">
      <button class="button is-success" @click="createNewGroup">{{ $t('btn_addGr') }}</button>
      <button class="button" @click="closeModal">{{ $t('cancel') }}</button>
    </footer>
  </modalComp>
</template>

<i18n>
{
  "en": {
    "modal_title": "Create a new group",
    "labelname": "Group name",
    "labeldesc": "Description",
    "btn_addGr": "Add group",
    "cancel": "Cancel"
  },
  "fr": {
    "modal_title": "Créer un nouveau groupe",
    "labelname": "Nom de groupe",
    "labeldesc": "Description",
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
      newGroupDesc: '',
    };
  },
  methods: {
    closeModal() {
      this.$modal.hide('createGroup');
    },
    createNewGroup() {
      if (this.newGroupName !== '' && this.newGroupDesc !== '') {
        this.$store.dispatch('createGroup', {
          groupName: this.newGroupName,
          description: this.newGroupDesc,
        }).then(() => {
          this.$notify({
            type: 'success',
            title: 'Success',
            text: 'Group has been created',
          });
          this.newGroupName = '';
          this.newGroupDesc = '';
          this.$socket.emit('groupChanges');
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

