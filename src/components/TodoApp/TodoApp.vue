<template>
  <div>
    <!-- Small menu -->
    <div class="box top-rounded-border">
      <div class="field is-grouped">
        <p class="control">
          <input type="button" class="button is-primary" 
            :disabled="$store.getters.allCategories.length <= 0" 
            @click="$modal.show('createTodo')" :value="$t('btn_addTodo')" />
        </p>
        <p class="control is-expanded">
          <input type="button" class="button is-primary" @click="$modal.show('createCategory')" :value="$t('btn_addCat')" />
        </p>
        <p class="control">
          <a class="button noborder">
            <a class="has-text-centered" @click="$store.dispatch('switchCompletedVisiblity')">
              {{ toggleMessage }}
            </a>
          </a>
        </p>
        <p class="control">
          <button class="button" @click="reloadData()" :class="{ 'is-disabled is-loading':reloadDataInProgress }">
            <span class="icon">
              <i class="fa fa-refresh" aria-hidden="true"></i>
            </span>
          </button>
        </p>
      </div>
    </div>
    <!-- Todos -->
    <TodoCategory :key="category._id" v-for="category in allCategories" 
                  :category="category" 
                  :todos="allTodos.filter(todo => todo._category === category._id)" />
    
    <!-- Footer -->
    <div class="boxSetMargin bottom-rounded-border">
      Nothing to see here
    </div>
  
  </div>
</template>

<i18n>
{
  "en": {
    "btn_addTodo": "Add todo",
    "btn_addCat": "Add category"
  },
  "fr": {
    "btn_addTodo": "Ajouter une tâche",
    "btn_addCat": "Ajouter une catégorie"
  }
}
</i18n>

<script>
import TodoCategory from '@/components/TodoApp/TodoCategory';

export default {
  components: {
    TodoCategory,
  },
  data() {
    return {
      completedHidden: false,
      reloadDataInProgress: false,
    };
  },
  created() {
    this.$store.dispatch('loadCategoriesFromAPI');
    this.$store.dispatch('loadTodosFromAPI');
  },
  computed: {
    allTodos() {
      return this.$store.getters.allTodos;
    },
    completedVisibility() {
      return this.$store.getters.hideCompleted;
    },
    allCategories() {
      return this.$store.getters.allCategories;
    },
    toggleMessage() {
      if (!this.completedVisibility) {
        return 'Hide completed tasks';
      }
      return 'Show completed tasks';
    },
  },
  methods: {
    reloadData() {
      this.reloadDataInProgress = true;
      this.$store.dispatch('loadCategoriesFromAPI').then(() => {
        this.$store.dispatch('loadTodosFromAPI').then(() => {
          this.reloadDataInProgress = false;
        });
      });
    },
    getAllTodos() {
      this.$store.dispatch('loadTodosFromAPI').catch((e) => {
        if (e.response.status === 401) {
          this.$router.push('/');
        } else {
          this.$notify({
            type: 'error',
            title: 'Error',
            text: 'Something went wrong when fetching data',
          });
        }
      });
    },
    addNewTodo(todo) {
      this.modalAddIsActive = false;
      this.$store.dispatch('newTodo', todo)
      .then(() => {
        this.taskToAdd = '';
        this.limitToAdd = '';
        this.$notify({
          type: 'success',
          title: 'Success',
          text: 'Todo has been added',
        });
      }).catch(() => {
        // console.log(e);
      });
    },
    getAllCategories() {
      this.$store.dispatch('loadCategoriesFromAPI').catch((e) => {
        if (e.response.status === 401) {
          this.$router.push('/');
        } else {
          this.$notify({
            type: 'error',
            title: 'Error',
            text: 'Something went wrong when fetching data',
          });
        }
      });
    },
  },
};
</script>

<style>
.top-rounded-border {
  border-radius: 10px 10px 0 0
}

.bottom-rounded-border {
  border-radius: 0 0 10px 10px
}

.boxSetMargin {
  margin-top: 24px;
  background-color: white;
  -webkit-box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
          box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
  color: #4a4a4a;
  display: block;
  padding: 1.25rem;
}

.noborder {
  border: none;
}

.vdp-datepicker div input {
  -moz-appearance: none;
  -webkit-appearance: none;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  border: 1px solid transparent;
  border-radius: 3px;
  -webkit-box-shadow: none;
          box-shadow: none;
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: inline-flex;
  font-size: 1rem;
  height: 2.25em;
  -webkit-box-pack: start;
      -ms-flex-pack: start;
          justify-content: flex-start;
  line-height: 1.5;
  padding-bottom: calc(0.375em - 1px);
  padding-left: calc(0.625em - 1px);
  padding-right: calc(0.625em - 1px);
  padding-top: calc(0.375em - 1px);
  position: relative;
  vertical-align: top;
  background-color: white;
  border-color: #dbdbdb;
  color: #363636;
  -webkit-box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.1);
          box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.1);
  max-width: 100%;
  width: 100%;
  font-family: BlinkMacSystemFont, -apple-system, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
}
</style>
 
