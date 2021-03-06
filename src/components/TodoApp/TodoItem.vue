<template>
  <div class="box smooth-in" :class="{ 'is-hidden' : checkConditionsToHide }">
    <div class="columns center-content">

      <div class="column is-1">
        <button class="button" @click="openDesc">
          <span class="icon is-pulled-left">
            <i class="fa fa-info" aria-hidden="true"></i>
          </span>
        </button>
        
      </div>

      <div class="column is-6" @click="editMode = true">
        <p v-if="!editMode" :class="{ 'has-text-danger':checkIfLate, 'overline':todoObj.isCompleted }">{{ taskText }}</p> 
        <input type="text" class="input" :class="{ 'has-text-danger' : checkIfLate }" v-model="taskText" v-else @keyup.enter="sendChangesToServer" @blur="sendChangesToServer">
      </div>

      <div class="column is-2">
        <div class="field has-addons">
          <div class="control">
            <span class="icon is-pulled-left">
              <i class="fa fa-lg fa-calendar icon-fix" aria-hidden="true"></i>
            </span>
          </div>
          <div class="control">
            <DatePicker v-model="datePickerAcceptedData" v-on:selected="setNewDateLimit"></DatePicker>
          </div>
        </div>
      </div>
      <div class="column is-2">
        <label class="checkbox is-pulled-right"> {{ $t('cb_completed') }}
          <input type="checkbox" v-model="todoObj.isCompleted" @change="sendChangesToServer">
        </label>
      </div>
      <div class="column is-1">
        <span class="icon" @click="deleteTodo()">
          <i class="fa fa-trash-o" aria-hidden="true"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<i18n>
{
  "en": {
    "cb_completed": "Completed"
  },
  "fr": {
    "cb_completed": "Complété"
  }
}
</i18n>

<script>
import DatePicker from 'vuejs-datepicker';

/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */

export default {
  components: {
    DatePicker,
  },
  props: ['todoObj'],
  data() {
    return {
      editMode: false,
      taskText: this.todoObj.task,
      completeBeforeDate: this.todoObj.completeByTime,
    };
  },
  watch: {
    todoObj() {
      this.taskText = this.todoObj.task;
      this.completeBeforeDate = this.todoObj.completeByTime;
    },
  },
  computed: { // Most unused but keeping for future change's sake
    hideCompleted() {
      return this.$store.getters.hideCompleted;
    },
    checkIfLate() {
      return (this.completeBeforeDate < new Date().getTime() && !this.todoObj.isCompleted);
    },
    checkConditionsToHide() {
      return (this.hideCompleted && this.todoObj.isCompleted);
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
    openDesc() {
      this.$modal.show('description', { desc: this.todoObj.description });
    },
    setNewDateLimit(newTime) {
      this.todoObj.completeByTime = newTime;
      this.completeBeforeDate = newTime.getTime();
      this.sendChangesToServer();
    },
    sendChangesToServer() {
      this.$store.dispatch('modifyTodo', {
        todoId: this.todoObj._id,
        task: this.taskText,
        isCompleted: this.todoObj.isCompleted,
        completeByTime: this.completeBeforeDate,
      }).then((res) => {
        this.editMode = false;
        if (res.status === 200) {
          this.$notify({
            type: 'success',
            title: 'Success',
            text: 'Todo has been modified',
          });
          this.$socket.emit('todoChanges', {
            user: this.$store.getters.getUsername,
            action: 'has modified a todo',
          });
        } else {
          this.$notify({
            type: 'error',
            title: 'Error',
            text: 'There was an error saving your changes',
          });
        }
      });
    },
    deleteTodo() {
      this.$modal.show('deleteTodo', { toDelete: this.todoObj._id });
    },
  },
};
</script>

<style>
.icon-fix {
  margin: 10px 5px 0 0;
}
.center-content {
  display: flex;
  align-items: center;
}
.icon:hover {
  cursor: pointer;
}
.overline {
  text-decoration: line-through;
}
</style>
