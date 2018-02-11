<template>
  <div class="outline">
    <div class="media card-fix">
      <div class="media-left">
        <div class="image is-64x64">
          <img src="https://cdn.discordapp.com/attachments/230447861043560448/412321950040326155/doot_transparent.png">
        </div>
      </div>
      <div class="media-content">
        <span class="is-size-5">{{ user.username }}</span>
        <small class="has-text-grey">{{ user.username }}</small>
        <br>
        <small>
          {{ user.username }}
        </small>
      </div>
      <div class="media-right" :class="{ 'is-hidden':user._id === $store.getters.getSelectedGroupObject._owner }">
        <button class="delete" @click="removeUser" />
      </div>
    </div>
  </div>
</template>

<script>
/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
export default {
  props: ['user'],
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
