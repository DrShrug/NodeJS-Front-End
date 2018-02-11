<template>
  <div class="flex-container">
    <MemberCard class="flex-item" :user="user" :key="user._id" v-for="user in $store.getters.getUsersInGroup"/>
  </div>
</template>

<script>
import MemberCard from '@/components/Group/MemberCard';

export default {
  components: {
    MemberCard,
  },
};
</script>

<style lang="scss">
.flex-container {
  display: flex;
  flex-wrap: wrap;
  .flex-item {
    margin: 5px;
    height: 100px;
    width: 30%;
  }
}
</style>
