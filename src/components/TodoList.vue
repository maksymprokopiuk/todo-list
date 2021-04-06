<template>
  <div class="container">
    <section class="section">
      <div class="columns is-mobile">
        <div class="column is-half is-offset-one-quarter">
          <header>
            <div><h1 class="title">Todo App {{getTodos.length}}</h1></div>
            <add-todo
              :currentTodoUpdate='currentTodoUpdate'
              v-on:changed-todo="changedTodo"
            />
          </header>

          <b-input class="search-input" placeholder="Search..."
            v-model="searchWord"
            v-on:input.native='isSearch'
            type="search"
            icon="magnify">
          </b-input>
          <div>

            <div class="buttons">
              <b-button @click=isSort>Sort by date {{!sort ? '↓' : '↑'}}</b-button>
              <b-button @click=isCompleted>{{!completed ? 'Switch to completed tasks' : 'Switch to uncompleted tasks'}}</b-button>
            </div>
          
          <ul>
            <li
              v-for="item of getTodosList"
              :key="item.id"
            >
              <todo-item
                :id='item.id'
                :title='item.title'
                :date='item.date'
                :completed='item.completed'
                v-on:edit-todo='editTodo'
              />
            </li>
          </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import TodoItem from '@/components/TodoItem'
  import AddTodo from '@/components/AddTodo'

  export default {
    name: 'TodoList',

    components: {
      TodoItem,
      AddTodo,
    },

    data() {
      return {
        // todosList: [],
        currentTodoUpdate: {},
        searchWord: '',
        sort: '',
        completed: '',
      }
    },

    computed: {
      ...mapGetters(['getTodos', 'getCompletedTodos', 'getSearchWord', 'getSortByDate']),

      getTodosList() {
        return this.getTodos
      }
    },

    methods: {
      ...mapActions(['setSearchWord', 'setSortDate', 'setCompleted']),

      editTodo(currentTodoUpdate) {
        this.currentTodoUpdate = currentTodoUpdate
      },

      changedTodo(changedTodo) {
        console.log('changedTodo', changedTodo)
      },

      isSearch() {
        this.setSearchWord(this.searchWord)
      },

      isSort() {
        this.sort = !this.sort
        this.setSortDate(this.sort)
      },

      isCompleted() {
        this.completed = !this.completed
        this.setCompleted(this.completed)
      },
    },

    mounted () {
      if (this.getSearchWord) {
        this.searchWord = this.getSearchWord
      }
      this.sort = this.getSortByDate
    },
  }
</script>

<style scoped>
.container {
  border: 1px solid green;
}
.section {
  border: 1px solid red;
}
header {
  display: flex;
  justify-content: space-between;
}
.search-input {
  margin: 10px 0;
}
</style>