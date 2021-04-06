<template>
  <div class="todo-item box">
    <div class="first-span" v-bind:class='{done: completed}'>
      <input v-bind='{checked: completed}' type="checkbox" v-on:change=completedTodo(id)>
      
      <div class="todo-item__title">{{title}}</div>
      <div class="todo-item__date">{{parsedDate}}</div>
    
      <b-button class="btn" @click="$emit('edit-todo', currentTodo)" icon-right="pencil-outline" />
      <b-button class="btn" @click='delTodo(id)' type="is-danger" icon-right="delete" />
    
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    name: 'TodoItem',

    data() {
      return {
        // parsedDate: this.date,
        parsedDate: this.parseDate(this.date),
        currentTodo: {
          id: this.id,
          title: this.title,
          date: this.date,
          completed: this.completed
        }
      }
    },

    props: {
      id: {
        type: String,
        default: 'no id'
      },
      title: {
        type: String,
        default: 'no string'
      },
      date: {
        type: [String, Number],
        default: 'no date'
      },
      completed: {
        type: Boolean,
        default: false
      }
    },

    methods: {
      ...mapActions(['deleteTodo', 'completedTodo']),

      delTodo(id) {
        this.deleteTodo(id)
      },

      parseDate(date) {
        const year = new Date(date).getFullYear()
        const month = (new Date(date).getMonth()+1) < 10 ? `0${new Date(date).getMonth()+1}` : new Date(date).getMonth()+1
        const day = (new Date(date).getDate()) < 10 ? `0${new Date(date).getDate()}` : new Date(date).getDate()
        const hours = new Date(date).getHours()
        const minutes = (new Date(date).getMinutes()) < 10 ? `0${new Date(date).getMinutes()}` : new Date(date).getMinutes()
        const seconds = (new Date(date).getSeconds()) < 10 ? `0${new Date(date).getSeconds()}` : new Date(date).getSeconds()
        const d = `${year}.${month}.${day} ${hours}:${minutes}:${seconds}`
        return d
      }
    },
  }
</script>

<style scoped>
.done {
  text-decoration: line-through;
}

.todo-item {
  display: flex;
  margin: 0 0 10px 0;
}

.first-span {
  width: 100%;
  height: 40px;
  display: flex;
}

input {
  display: block;
  width: 30px;
  height: 30px;
  margin: auto 0px;
}

.todo-item__title {
  width: 70%;
  margin: auto 0 auto 5px;
  white-space: nowrap;
  overflow: hidden;
  padding: 5px;
  /* border: 1px solid #000; */
}

.todo-item__date {
  width: 15%;
  /* border: 1px solid red; */
  margin: auto 0;
  text-align: center;
  font-size: 13px;
}

.btn {
  display: block;
  margin: 0 0 0 5px;
}

.todo-item:hover .btn {
  display: block;
}
</style>