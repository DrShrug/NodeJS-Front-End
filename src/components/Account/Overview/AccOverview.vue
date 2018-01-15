<template>
  <div id="profile-overview">
    <MessagePopup :propsHide="popupHide"
                  :propsMessage="popupMessage"
                  :propsClass="popupType"
                  :propsHeader="popupHeader">
    </MessagePopup>

    <Navbar></Navbar>
    <div class="container box spacer is-shadowless">

      <!-- Hero -->
      <section class="hero is-info welcome is-small">
        <div class="hero-body">
          <h1 class="title">
            Welcome back
          </h1>
          <h2 class="subtitle">
            {{ getEmail }}
          </h2>
        </div>
      </section>
      <!-- Quick information overview -->
      <section class="info-tiles box">
        <div class="tile-header container">
          <p class="has-text-grey-dark is-size-4">Quick Overview</p>
          <hr class="navbar-divider half-size">
        </div>
        <nav class="level">
          <TileItem :type="'Completed'" :data="countCompletedTasks" :icon="'fa-check'"></TileItem>
          <TileItem :type="'Uncompleted'" :data="countUncompletedTasks" :icon="'fa-tasks'"></TileItem>
          <TileItem :type="'Overdue'" :data="countLateTasks" :icon="'fa-clock-o'"></TileItem>
          <TileItem :type="'Total'" :data="userTodos.length" :icon="'fa-list-ul'"></TileItem>
        </nav>
      </section>

      <!-- Charts and graphs -->
      <div class="box">
        <div class="tile-header container">
          <p class="has-text-grey-dark is-size-4">Chart Info</p>
          <hr class="navbar-divider half-size">
        </div>
        <div class="columns">
          <div class="column is-5">
            <Chart :tododata="userTodos" 
              :type="'completedAtMonth'" 
              :title="'Completed by month'" 
              :color="'#4c90ff'">
            </Chart>
          </div>
          <div class="column is-5 is-offset-2">
            <Chart :tododata="userTodos"
              :type="'completeByMonth'"
              :title="'To be completed by month'"
              :color="'#f87979'">
            </Chart>
          </div>
        </div>
      </div>

      <!-- Completion details -->
      <div class="box">
        <div class="tile-header container">
          <p class="has-text-grey-dark is-size-4">Completed Tasks Info</p>
          <hr class="navbar-divider half-size">
        </div>
        <CompletionTable :data="userTodos"></CompletionTable>
      </div>

    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Navbar from '@/components/Navbar';
import MessagePopup from '@/components/MessagePopup';
import Chart from '@/components/Account/Chart';
import TileItem from '@/components/Account/Overview/InfoTilesItem';
import CompletionTable from '@/components/Account/Overview/CompletionTable';

export default {
  components: {
    Navbar,
    MessagePopup,
    Chart,
    TileItem,
    CompletionTable,
  },
  mounted() {
    this.getUser();
  },
  data() {
    return {
      userBaseURL: 'https://nodejs-vue-js-todo.herokuapp.com/users',
      connectedUser: null,
      userTodos: [],
      popupHide: true,
      popupType: '',
      popupMessage: '',
      popupHeader: '',
    };
  },
  computed: {
    getEmail() {
      return sessionStorage.getItem('email');
    },
    countCompletedTasks() {
      return this.userTodos.filter(todo => todo.isCompleted).length;
    },
    countLateTasks() {
      return this.userTodos.filter(todo =>
      todo.completeByTime < new Date().getTime()
      && !todo.isCompleted).length;
    },
    countUncompletedTasks() {
      return this.userTodos.length - this.userTodos.filter(todo => todo.isCompleted).length;
    },
  },
  methods: {
    getUser() {
      axios.get(`${this.userBaseURL}/me`, {
        headers: {
          'x-auth': sessionStorage.getItem('token'),
        },
      }).then((user) => {
        this.connectedUser = {
          email: user.data.email,
          // More will be added to the User model
        };
        this.userTodos = user.data.todoList.todos;
      }).catch((e) => {
        if (e.response.status === 401) {
          this.$router.push('/');
        }
      });
    },
  },
};
</script>

<style>
  #profile-overview {
    background-color: #F5F6F7;
  }
  .spacer {
    background-color: transparent;
  }
  .welcome-message-area {
    margin-bottom: 10px;
  }
  .icon-spacing {
    margin-right: 10px;
  }
  .info-tiles {
    margin: 1rem 0;
  }
  .info-tiles .subtitle {
    font-weight: 300;
  }
  .hero.welcome.is-info {
    background: #36D1DC;
    background: -webkit-linear-gradient(to right, #5B86E5, #36D1DC);
    background: linear-gradient(to right, #5B86E5, #36D1DC);
  }
  .tile-header {
    margin-bottom: 20px;
    width: 50%;
  }
</style>
