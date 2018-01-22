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
  },
  actions: {
    loadTodosFromAPI({ commit }) {
      axios.get('https://nodejs-vue-js-todo.herokuapp.com/todos', {
        headers: {
          'x-auth': sessionStorage.getItem('token'),
        },
      }).then((response) => {
        commit('setTodoList', { todosData: response.data.todos });
      }).catch((e) => {
        if (e.response.status === 401) {
          router.push({ name: 'Auth' });
        }
      });
    },
    loadProjects({ commit }) {
      commit('setProjectList', {
        list: [
          {
            id: 0,
            name: 'Project 1',
            isCompleted: false,
          },
          {
            id: 1,
            name: 'Project 2',
            isCompleted: true,
          },
        ],
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
    setProjectList(state, { list }) {
      state.projects = list;
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
  },
});

export default store;
