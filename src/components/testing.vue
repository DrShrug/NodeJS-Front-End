<template>
  <div>
    <input type="text" v-model="catName">
    <input type="button" @click="createCategory()">
    {{categories}}
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      catName: '',
      categories: [],
    };
  },
  mounted() {
    this.getCategories();
  },
  methods: {
    createCategory() {
      axios({
        method: 'POST',
        url: 'https://nodejs-vue-js-todo.herokuapp.com/categories',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        headers: {
          'x-auth': sessionStorage.getItem('token'),
        },
        data: {
          categoryName: this.catName,
        },
      }).then(() => {
        this.getCategories();
      }).catch(() => {
        // console.log(e);
      });
    },
    getCategories() {
      this.categories = [];
      axios.get('https://nodejs-vue-js-todo.herokuapp.com/categories', {
        headers: {
          'x-auth': sessionStorage.getItem('token'),
        },
      }).then((response) => {
        response.data.categories.forEach(category => this.categories.push(category));
      }).catch((e) => {
        if (e.response.status === 401) {
          this.$router.push('/');
        } else {
          this.$parent.updateDBPopup('Things no work', 'is-danger', 'Warning');
        }
      });
    },
  },
};
</script>
