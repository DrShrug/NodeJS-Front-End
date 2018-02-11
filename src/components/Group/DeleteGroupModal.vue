<template>
  <modalComp height="auto" name="deleteGroup">
    <header class="modal-card-head">
      <p class="modal-card-title">Delete Group</p>
      <button class="delete" aria-label="close" @click="closeModal"></button>
    </header>
    <section class="modal-card-body">
      <div class="field has-text-centered">
        <p class="has-text-danger is-size-4">WARNING</p>
        <p class="has-text-grey is-size-6">
          This action cannot be undone. All categories and todos associated with This
          group will also be deleted. Retype the group's name to and confirm the deletion
        </p>
        <code>{{ $store.getters.getSelectedGroupObject.groupName}}</code>
      </div>
      <div class="field">
        <label class="label">Group name</label>
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
        :disabled="groupName !== $store.getters.getSelectedGroupObject.groupName">Delete</button>
      <button class="button" @click="closeModal">Cancel</button>
    </footer>
  </modalComp>
</template>

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
      this.$store.dispatch('deleteGroup', { groupId: this.$store.getters.getSelectedGroup }).then(() => {
        this.$notify({
          type: 'success',
          title: 'Success',
          text: 'Group has been deleted',
        });
        this.$modal.hide('deleteGroup');
        this.$router.push('/groups');
      });
    },
  },
};
</script>
