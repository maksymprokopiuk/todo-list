<template>
  <form @submit.prevent="onSubmit">
    <b-field>
      <b-input class="add-input" placeholder="Add todo" maxlength="50" type="text" v-model="title"></b-input>
      <p class="control">
        <b-button type="is-info" native-type='submit'>
          {{currentTodoUpdate.title ? 'Edit' : 'Create'}}
        </b-button>
      </p>
    </b-field>
  </form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { v4 as uuidv4 } from 'uuid'

  export default {
    name: 'AddTodo',

    data() {
      return {
        title: '',
      }
    },

    props: {
      currentTodoUpdate: {
        type: Object,
        default: () => {}
      },
    },

    computed: {
      ...mapGetters(['getTodos'])
    },

    methods: {
      ...mapActions(['addTodo', 'updateTodo']),

      onSubmit() {
        if (!this.currentTodoUpdate.title) {
          if (this.title.trim()) {
            const newTodo = {
              id: uuidv4(),
              title: this.title,
              date: Date.now(),
              completed: false
            }
            this.addTodo(newTodo)
            this.title = ''
          }
        } else {
          if (this.title.trim()) {
            const editedTodo = {
              id: this.currentTodoUpdate.id,
              title: this.title,
              date: this.currentTodoUpdate.date,
              completed: this.currentTodoUpdate.completed
            }
            this.updateTodo(editedTodo)
            this.title = ''
          }
        }
      }
    },

    watch: {
      currentTodoUpdate(newValue) {
        this.title = newValue.title
      }
    },
  }
</script>

<style scoped>
.add-input {
  width: 100%;
}
</style>