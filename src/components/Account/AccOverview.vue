<template>
  <div id="profile-overview">
    <MessagePopup :propsHide="popupHide"
                  :propsMessage="popupMessage"
                  :propsClass="popupType"
                  :propsHeader="popupHeader">
    </MessagePopup>

    <Navbar></Navbar>
    <div class="container spacer">
      <section class="hero is-info welcome is-small">
        <div class="hero-body">
          <div class="container">
            <h1 class="title">
              Welcome back
            </h1>
            <h2 class="subtitle">
              {{getEmail}}
            </h2>
          </div>
        </div>
      </section>
      
      <!-- <section class="info-tiles">
        <div class="tile is-ancestor has-text-centered">
          <div class="tile is-parent">
            <article class="tile is-child box">
              <div class="level-item has-text-centered">
                <div>
                  <span class="icon is-large icon-spacing">
                    <i class="fa fa-3x fa-check" aria-hidden="true"></i>
                  </span>
                </div>
                <div>
                  <p class="heading">Completed</p>
                  <p class="title">{{countCompletedTasks}}</p>
                </div>
              </div>
            </article>
          </div>
          <div class="tile is-parent">
            <article class="tile is-child box">
              <div class="level-item has-text-centered">
                <div class="is-pulled-left">
                  <span class="icon is-large icon-spacing">
                    <i class="fa fa-3x fa-tasks" aria-hidden="true"></i>
                  </span>
                </div>
                <div class="">
                  <p class="heading">Uncompleted</p>
                  <p class="title">{{countUncompletedTasks}}</p>
                </div>
              </div>
            </article>
          </div>
          <div class="tile is-parent">
            <article class="tile is-child box">
              <div class="level-item has-text-centered">
                <div>
                  <span class="icon is-large icon-spacing">
                    <i class="fa fa-3x fa-clock-o" aria-hidden="true"></i>
                  </span>
                </div>
                <div>
                  <p class="heading">Late</p>
                  <p class="title">{{countLateTasks}}</p>
                </div>
              </div>
            </article>
          </div>
          <div class="tile is-parent">
            <article class="tile is-child box">
              <div class="level-item has-text-centered">
                <div>
                  <span class="icon is-large icon-spacing">
                    <i class="fa fa-3x fa-list-ul" aria-hidden="true"></i>
                  </span>
                </div>
                <div>
                  <p class="heading">Total</p>
                  <p class="title">{{ userTodos.length }}</p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section> -->

      <section class="info-tiles">
        <nav class="level box">
          <div class="level-item has-text-centered">
            <span class="icon is-large icon-spacing">
              <i class="fa fa-3x fa-check" aria-hidden="true"></i>
            </span>
            <div>
              <p class="heading">Completed</p>
              <p class="title">{{countCompletedTasks}}</p>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <span class="icon is-large icon-spacing">
              <i class="fa fa-3x fa-tasks" aria-hidden="true"></i>
            </span>
            <div>
              <p class="heading">Uncompleted</p>
              <p class="title">{{countUncompletedTasks}}</p>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <span class="icon is-large icon-spacing">
              <i class="fa fa-3x fa-clock-o" aria-hidden="true"></i>
            </span>
            <div>
              <p class="heading">Late</p>
              <p class="title">{{countLateTasks}}</p>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <span class="icon is-large icon-spacing">
              <i class="fa fa-3x fa-list-ul" aria-hidden="true"></i>
            </span>
            <div>
              <p class="heading">Total</p>
              <p class="title">{{ userTodos.length }}</p>
            </div>
          </div>
        </nav>
      </section>
      <div class="box">
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
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Navbar from './../Navbar';
import MessagePopup from './../MessagePopup';
import Chart from './Chart';

export default {
  components: {
    Navbar,
    MessagePopup,
    Chart,
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
      return this.userTodos.filter(todo => todo.completed).length;
    },
    countLateTasks() {
      return this.userTodos.filter(todo =>
      todo.completedDateLimit < new Date().getTime()
      && !todo.completed).length;
    },
    countUncompletedTasks() {
      return this.userTodos.length - this.userTodos.filter(todo => todo.completed).length;
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
    margin-top: 50px;
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
</style>
