import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import router from '@/router';

/* eslint-disable no-param-reassign */

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    projects: [],
    todos: [],
    userDetails: null,
    userLoggedIn: {
      name: null,
      email: null,
      token: '',
      isLoggedIn: false,
    },
  },
  actions: {
    userLogin({ commit }, { email, password }) {
      return axios({
        method: 'POST',
        url: `${process.env.API_URL}/users/login`,
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: {
          email,
          password,
        },
      }).then((res) => {
        commit('loginSuccess', {
          email: res.data.email,
          token: res.headers['x-auth'],
        });
        return res;
      });
    },
    userSignup({ commit }, { email, password }) {
      return axios({
        method: 'POST',
        url: `${process.env.API_URL}/users`,
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: {
          email,
          password,
        },
      }).then((res) => {
        commit('loginSuccess', {
          email: res.data.email,
          token: res.headers['x-auth'],
        });
      });
    },
    loadTodosFromAPI({ commit }) {
      return axios.get(`${process.env.API_URL}/todos`, {
        headers: {
          'x-auth': sessionStorage.getItem('token'),
        },
      }).then((response) => {
        commit('setTodoList', { todosData: response.data.todos });
        return response;
      }).catch((e) => {
        if (e.response.status === 401) {
          router.push({ name: 'Auth' });
        }
      });
    },
    loadProfileOverview({ commit }) {
      return axios.get(`${process.env.API_URL}/users/me`, {
        headers: {
          'x-auth': sessionStorage.getItem('token'),
        },
      }).then((user) => {
        commit('setUserDetails', { userData: user.data });
        return user.data;
      }).catch((e) => {
        if (e.response.status === 401) {
          router.push({ name: 'Auth' });
        }
      });
    },
    sendNewProject({ commit }, projectDetails) {
      commit('addProject', {
        project: projectDetails,
      });
    },
  },
  mutations: {
    setTodoList(state, { todosData }) {
      state.todos = todosData;
    },
    setUserDetails(state, { userData }) {
      state.userDetails = userData;
    },
    loginSuccess(state, userData) {
      sessionStorage.setItem('token', userData.token);
      state.userLoggedIn.name = 'To be implemented';
      state.userLoggedIn.email = userData.email;
      state.userLoggedIn.token = userData.token;
      state.userLoggedIn.isLoggedIn = true;
    },
    addProject(state, { project }) {
      state.projects.push({
        id: project.id,
        name: project.name,
        isCompleted: false,
      });
    },
  },
  getters: {
    openProjects: state => state.projects.filter(project => !project.isCompleted),
    isLoggedIn: state => state.userLoggedIn.isLoggedIn,
  },
});

export default store;
