import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()], // save to localStorage

  state: {
    todos: [],
    search: '',
    sortByDate: false,
    completed: false,
  },
  mutations: {
    addTodo(state, todo) {
      state.todos.push(todo)
    },

    deleteTodo(state, id) {
      state.todos = state.todos.filter(
        todo => todo.id !== id
      )
    },

    updateTodo(state, todo) {
      const currentTodo = state.todos.findIndex(
        item => item.id === todo.id
      )
      state.todos[currentTodo] = todo
    },

    completedTodo(state, id) {
      const currentTodo = state.todos.findIndex(
        item => item.id === id
      )
      state.todos[currentTodo].completed = !state.todos[currentTodo].completed
    },

    setSearchWord(state, word) {
      state.search = word
    },

    setSortDate(state, sort) {
      state.sortByDate = sort
    },

    setCompleted(state, completed) {
      state.completed = completed
    },
  },
  actions: {
    addTodo({commit}, todo) {
      commit('addTodo', todo)
    },

    deleteTodo({commit}, id) {
      commit('deleteTodo', id)
    },
    
    updateTodo({commit}, todo) {
      commit('updateTodo', todo)
    },
    
    completedTodo({commit}, id) {
      commit('completedTodo', id)
    },

    setSearchWord({commit}, word) {
      commit('setSearchWord', word)
    },

    setSortDate({commit}, sort) {
      commit('setSortDate', sort)
    },

    setCompleted({commit}, completed) {
      commit('setCompleted', completed)
    },
  },
  getters: {
    getAllTodosLength: state => state.todos.length,

    getTodos: state => {
      const searcTodos = state.todos.filter(todo => 
        todo.title.toLowerCase().includes(state.search.toLowerCase()))
      const sortTodosByDate = state.sortByDate ? searcTodos.sort((a, b) => a.date < b.date ? 1 : -1) : searcTodos.sort((a, b) => a.date > b.date ? 1 : -1)
      const completedTodos = state.completed ? sortTodosByDate.filter(todo => todo.completed === true) : sortTodosByDate.filter(todo => todo.completed === false)
      const result = completedTodos
      return result
      
    },

    getSearchWord: state => state.search,

    getSortByDate: state => state.sortByDate,
  }
})
