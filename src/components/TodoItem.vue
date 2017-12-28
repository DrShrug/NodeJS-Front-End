<template>
  <div class="box">
    <div class="columns">
      <div class="column is-2">
        <span class="icon is-pulled-left">
          <i class="fa fa-bars" aria-hidden="true"></i>
        </span>
      </div>

      <div class="column is-8">
        {{ todoObj.task }}
      </div>

      <div class="column is-2">
        <label class="checkbox is-pulled-right">Completed
          <input type="checkbox" v-model="todoObj.completed" @change="changeCompletionStatus">
        </label>
      </div>
    </div>
  </div>
  
</template>

<script>
import axios from 'axios';

/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */

export default {
  props: [
    'todoObj',
  ],
  data() {
    return {
      completed: this.todoObj.completed,
    };
  },
  methods: {
    changeCompletionStatus() {
      axios({
        method: 'PATCH',
        url: `https://nodejs-vue-js-todo.herokuapp.com/todos/${this.todoObj._id}`,
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        data: {
          completed: !this.completed,
        },
      }).then((res) => {
        if (res.status === 200) {
          this.$parent.$parent.updateDBPopup('Changes have been saved', 'is-success');
        } else {
          this.$parent.$parent.updateDBPopup('Something went wrong', 'is-danger');
        }
      });
    },
  },
};
</script>

<style>

</style>
