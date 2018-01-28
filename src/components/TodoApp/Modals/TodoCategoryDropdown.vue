<template>
  <div class="dropdown fullwidth" :class="{ 'is-active': categoryDropdownActive }">
    <div class="dropdown-trigger fullwidth" @click="closeDropdown">
      <button class="button is-fullwidth" aria-haspopup="true" aria-controls="dropdown-menu">
        <span>{{ dropdownText }}</span>
        <span class="icon is-small">
          <i class="fa fa-angle-down" aria-hidden="true"></i>
        </span>
      </button>
    </div>
    <div class="dropdown-menu fullwidth" id="dropdown-menu" role="menu">
      <div class="dropdown-content fullwidth">
        <a :key="category._id" v-for="category in categories" class="dropdown-item" @click="selectedCategory(category._id, category.categoryName)">
          {{ category.categoryName }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['categories'],
  data() {
    return {
      categoryDropdownActive: false,
      dropdownText: 'Select a category',
    };
  },
  methods: {
    closeDropdown() {
      this.categoryDropdownActive = !this.categoryDropdownActive;
    },
    selectedCategory(id, name) {
      this.$emit('setCategory', {
        id,
        name,
      });
      this.closeDropdown();
      this.dropdownText = name;
    },
  },
};
</script>

<style scoped>
.fullwidth {
  width: 100%;
}
</style>
