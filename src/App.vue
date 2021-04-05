<template>
  <div id="app">
    <todo-list />
  </div>
</template>

<script>
import TodoList from './TodoList.vue'

export default {
  name: 'App',
  components: {
    TodoList
  }
}
</script>

<style>
#app {
  font-family: Arial, sans-serif;
}
</style>
