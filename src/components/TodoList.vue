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
              v-for="item of getTodosListPagination"
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
          <b-pagination
            :total="total"
            v-model="current"
            :range-before="rangeBefore"
            :range-after="rangeAfter"
            :order="order"
            :size="size"
            :simple="isSimple"
            :rounded="isRounded"
            :per-page="perPage"
            :icon-prev="prevIcon"
            :icon-next="nextIcon"
            aria-next-label="Next page"
            aria-previous-label="Previous page"
            aria-page-label="Page"
            aria-current-label="Current page">
          </b-pagination>
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
        currentTodoUpdate: {},
        searchWord: '',
        sort: '',
        completed: '',
        // pagination
        total: null,
        current: 1,
        perPage: 10,
        rangeBefore: 3,
        rangeAfter: 1,
        order: '',
        size: '',
        isSimple: false,
        isRounded: false,
        prevIcon: 'chevron-left',
        nextIcon: 'chevron-right'
      }
    },

    computed: {
      ...mapGetters(['getTodos', 'getCompletedTodos', 'getSearchWord', 'getSortByDate']),

      // pagination
      getTodosListPagination() {
        return this.getTodos.slice(
          this.current * this.perPage - this.perPage,
          this.current * this.perPage
        );
      },

      getTotalItems() {
        return this.getTodos.length;
      },
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

    // pagination
    watch: {
      getTotalItems() {
        this.total = this.getTotalItems;
      },
    },

    mounted () {
      if (this.getSearchWord) {
        this.searchWord = this.getSearchWord
      }
      this.sort = this.getSortByDate
      // pagination
      this.total = this.getTotalItems;
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