<template>
  <div class="outline">
    <div class="media card-fix">
      <div class="media-left">
        <div class="image is-64x64">
          <img src="https://png.icons8.com/ultraviolet/2x/person-male.png">
        </div>
      </div>
      <div class="media-content">
        <span class="is-size-5">{{ user.username }}</span>
        <small class="has-text-grey">{{ user.displayName }}</small>
        <br>
        <small>
          {{ user.email }}
        </small>
      </div>
      <div class="media-right" :class="{ 'is-hidden':isOwnerOrSelf }">
        <button class="delete" @click="removeUser" />
      </div>
    </div>
  </div>
</template>

<script>
/* eslint no-underscore-dangle: 0 */
export default {
  props: ['user'],
  computed: {
    isOwnerOrSelf() {
      return this.user._id === this.$store.getters.getSelectedGroupObject._owner
      || this.user._id === this.$store.getters.getSelfId;
    },
  },
  methods: {
    removeUser() {
      this.$store.dispatch('removeMemberFromGroup', { memberId: this.user._id }).then((res) => {
        if (res.status !== 200) {
          this.$notify({
            type: 'error',
            title: 'Error',
            text: 'Error while fetching users',
          });
        } else {
          this.$notify({
            type: 'success',
            title: 'Success',
            text: `User ${JSON.parse(res.request.response).username} has been removed`,
          });
          this.$socket.emit('kickedUser', {
            memberId: this.user._id,
            groupId: this.$store.getters.getSelectedGroupObject._id,
          });
        }
      });
    },
  },
};
</script>


<style scoped>
.card-fix {
  padding: 10px;
}
.outline {
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
  color: #4a4a4a;
}
</style>
