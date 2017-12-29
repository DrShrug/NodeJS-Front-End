<template>
  <div class="box" :class="{ 'is-hidden' : checkConditionsToHide }">
    <div class="columns">

      <div class="column is-2">
        <span class="icon is-pulled-left">
          <i class="fa fa-bars" aria-hidden="true"></i>
        </span>
      </div>

      <div class="column is-8" @click="editMode = true">
        <p v-if="!editMode">{{ taskText }}</p>
        <input type="text" class="input" v-model="taskText" v-else @keyup.enter="sendTaskChange" @blur="sendTaskChange">
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
    'wantCompletedFiltered',
  ],
  data() {
    return {
      baseURL: `https://nodejs-vue-js-todo.herokuapp.com/todos/${this.todoObj._id}`,
      completed: this.todoObj.completed,
      editMode: false,
      taskText: this.todoObj.task,
    };
  },
  computed: {
    checkConditionsToHide() {
      return (this.wantCompletedFiltered && this.completed);
    },
  },
  methods: {
    changeCompletionStatus() {
      axios({
        method: 'PATCH',
        url: this.baseURL,
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        data: {
          completed: !this.completed,
        },
      }).then((res) => {
        if (res.status === 200) {
          this.completed = !this.completed;
          this.$parent.$parent.updateDBPopup('Task has been completed', 'is-success');
        } else {
          this.$parent.$parent.updateDBPopup('Something went wrong', 'is-danger');
        }
      });
    },

    sendTaskChange() {
      axios({
        method: 'PATCH',
        url: this.baseURL,
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        data: {
          task: this.taskText,
          completed: this.completed,
        },
      }).then((res) => {
        this.editMode = false;
        if (res.status === 200) {
          this.$parent.$parent.updateDBPopup('Task have been changed', 'is-success');
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
