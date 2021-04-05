<template>
  <div>
    <todo-item />
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import TodoItem from '@/components/TodoItem'

  export default {
    name: 'TodoList',

    components: {
      TodoItem,
    },

    computed: {
      ...mapGetters(['getTodoList'])
    },
  }
</script>

<style scoped>

</style>