<template>
  <div class="dropdown" :class="{ 'is-active': categoryDropdownActive }">
    <div class="dropdown-trigger" @click="closeDropdown">
      <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
        <span>{{ dropdownText }}</span>
        <span class="icon is-small">
          <i class="fa fa-angle-down" aria-hidden="true"></i>
        </span>
      </button>
    </div>
    <div class="dropdown-menu" id="dropdown-menu" role="menu">
      <div class="dropdown-content">
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
