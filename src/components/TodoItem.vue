<template>
  <div class="box" :class="{ 'is-hidden' : checkConditionsToHide }">
    <div class="columns">

      <div class="column is-2">
        <span class="icon is-pulled-left">
          <i class="fa fa-bars" aria-hidden="true"></i>
        </span>
      </div>

      <div class="column is-6" @click="editMode = true">
        <p v-if="!editMode">{{ taskText }}</p>
        <input type="text" class="input" v-model="taskText" v-else @keyup.enter="sendTaskChange" @blur="sendTaskChange">
      </div>

      <div class="column is-2">
        <!-- <span class="icon is-pulled-left">
          <i class="fa fa-calendar" aria-hidden="true"></i>
        </span>
        <DatePicker v-model="datePickerAcceptedData" v-on:selected="sendDateLimitChange"></DatePicker> -->
        <div class="field has-addons">
          <div class="control">
            <span class="icon is-pulled-left">
              <i class="fa fa-lg fa-calendar icon-fix" aria-hidden="true"></i>
            </span>
          </div>
          <div class="control">
              <DatePicker v-model="datePickerAcceptedData" v-on:selected="sendDateLimitChange"></DatePicker>
          </div>
        </div>
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
import DatePicker from 'vuejs-datepicker';

/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */

export default {
  components: {
    DatePicker,
  },
  props: [
    'todoObj',
    'wantCompletedFiltered',
  ],
  watch: {
    completeBeforeDate(val) {
      this.sendDateLimitChange(new Date(val).getTime());
    },
  },
  data() {
    return {
      baseURL: `https://nodejs-vue-js-todo.herokuapp.com/todos/${this.todoObj._id}`,
      completed: this.todoObj.completed,
      editMode: false,
      taskText: this.todoObj.task,
      completeBeforeDate: this.todoObj.completedDateLimit, // completedDateLimit
    };
  },
  computed: {
    checkConditionsToHide() {
      return (this.wantCompletedFiltered && this.completed);
    },
    ISOToReadable() {
      const date = new Date(this.completeBeforeDate);
      return `${date.getFullYear()} - ${date.getMonth() + 1} - ${date.getDate()}`;
    },
    EpochToUTC() {
      const date = new Date(this.completeBeforeDate);
      return new Date(date).getTime();
    },
    datePickerAcceptedData() {
      const date = new Date(this.completeBeforeDate);
      return date;
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
          this.$parent.$parent.updateDBPopup('Task has been completed', 'is-success', 'Success');
        } else {
          this.$parent.$parent.updateDBPopup('Something went wrong', 'is-danger', 'Success');
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
          this.$parent.$parent.updateDBPopup('Task have been changed', 'is-success', 'Success');
        } else {
          this.$parent.$parent.updateDBPopup('Something went wrong', 'is-danger', 'Success');
        }
      });
    },

    sendDateLimitChange(newDate) {
      axios({
        method: 'PATCH',
        url: this.baseURL,
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        data: {
          task: this.taskText,
          completed: this.completed,
          completedDateLimit: new Date(newDate).getTime(),
        },
      }).then((res) => {
        if (res.status === 200) {
          this.$parent.$parent.updateDBPopup('Limit has been changed', 'is-success', 'Success');
        } else {
          this.$parent.$parent.updateDBPopup('Something went wrong', 'is-danger', 'Success');
        }
      });
    },
  },
};
</script>

<style>
.icon-fix {
  margin: 10px 5px 0 0;
}
</style>
