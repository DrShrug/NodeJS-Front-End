<template>
  <modalComp height="auto" name="deleteGroup">
    <header class="modal-card-head">
      <p class="modal-card-title">{{ $t('modal_title') }}</p>
      <button class="delete" aria-label="close" @click="closeModal"></button>
    </header>
    <section class="modal-card-body">
      <div class="field has-text-centered">
        <p class="has-text-danger is-size-4">{{ $t('modal_header') }}</p>
        <p class="has-text-grey is-size-6">
          {{ $t('modal_bodymessage1') }} {{ $t('modal_bodymessage2') }}
        </p>
        <code>{{ $store.getters.getSelectedGroupObject.groupName}}</code>
      </div>
      <div class="field">
        <label class="label">{{ $t('label_group') }}</label>
        <p class="control is-expanded has-icons-left">
          <input class="input" type="text" placeholder="Name" v-model="groupName">
          <span class="icon is-small is-left">
            <i class="fa fa-tags" aria-hidden="true"></i>
          </span>
        </p>
      </div>
    </section>
    <footer class="modal-card-foot">
      <button class="button is-success" 
        @click="confirmGroupDelete"
        :disabled="groupName !== $store.getters.getSelectedGroupObject.groupName">{{ $t('delete') }}</button>
      <button class="button" @click="closeModal">{{ $t('cancel') }}</button>
    </footer>
  </modalComp>
</template>

<i18n>
{
  "en": {
    "modal_title": "Delete Group",
    "modal_header": "WARNING",
    "modal_bodymessage1": "This action cannot be undone. All categories and todos associated with This group will also be deleted.",
    "modal_bodymessage2": "Retype the group's name to and confirm the deletion",
    "label_group": "Group name",
    "delete": "Delete",
    "cancel": "Cancel"
  },
  "fr": {
    "modal_title": "Suppression",
    "modal_header": "ATTENTION",
    "modal_bodymessage1": "Cette action ne peut pas être défaite. Toutes catégories et tâches associées à ce groupe vont aussi être supprimé.",
    "modal_bodymessage2": "Veuillez ressaisir le nom du groupe et confirmez la suppression",
    "label_group": "Nom du groupe",
    "delete": "Supprimer",
    "cancel": "Annuler"
  }
}
</i18n>

<script>
export default {
  data() {
    return {
      groupName: '',
    };
  },
  methods: {
    closeModal() {
      this.$modal.hide('deleteGroup');
    },
    confirmGroupDelete() {
      this.$store.dispatch('deleteGroup', { groupId: this.$store.getters.getSelectedGroup }).then((res) => {
        this.$notify({
          type: 'success',
          title: 'Success',
          text: 'Group has been deleted',
        });
        this.$modal.hide('deleteGroup');
        this.$router.push('/groups');
        this.$socket.emit('groupDeleted', res.data.group);
      }).catch(() => {
        this.$notify({
          type: 'error',
          title: 'Error',
          text: 'You do not have permission to delete the group',
        });
      });
    },
  },
};
</script>