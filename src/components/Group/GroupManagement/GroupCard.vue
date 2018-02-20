<template>
  <div class="box groupbox">
    <div>
      <p class="has-text-grey has-text-left">
        <span class="is-size-4 has-text-grey">{{ group.groupName }}</span> 
      </p>
    </div>
    <hr class="group-hr" />
    <div>
      <p class="has-text-grey has-text-left">
        {{ group.description }}
      </p>
    </div>
    <hr class="group-hr" />
    <div>
      <p class="has-text-grey has-text-right">
        <span class="icon">
          <i class="fa fa-user" aria-hidden="true"></i>
        </span>
        {{ group.members.length }} {{ $t('members') }}
      </p>
    </div>
  </div>
</template>

<i18n>
{
  "en": {
    "members": "members(s)"
  },
  "fr": {
    "members": "membre(s)"
  }
}
</i18n>

<script>
export default {
  props: ['group'],
};
</script>

<style>
.groupbox {
  transition: all .2s ease-in-out;
  cursor: pointer;
}
.groupbox:hover {
  transform: scale(1.1);
}
.group-hr {
  background-color: #dbdbdb;
  border: none;
  height: 1px;
  margin: 0.5rem 0;
}
</style>
