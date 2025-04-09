<!-- src/App.vue -->
<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Vue.js 電話帳アプリ</a>
    </div>
  </nav>

  <router-view />

  <div class="toast-container position-fixed bottom-0 end-0 p-3">
    <div class="toast align-items-center text-white bg-success border-0" role="alert" aria-live="assertive"
      aria-atomic="true" ref="toast">
      <div class="d-flex">
        <div class="toast-body">
          {{ toastMessage }}
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'bootstrap'
import { provideToast } from './composables/useToast'

export default {
  data() {
    return {
      toastMessage: '',
      toast: null
    }
  },
  methods: {
    showToast(message) {
      this.toastMessage = message
      this.toast.show()
    }
  },
  mounted() {
    this.toast = new Toast(this.$refs.toast)
  },
  setup() {
    provideToast()
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.card {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.card-header {
  background-color: #f8f9fa;
}

.btn-primary {
  background-color: #3490dc;
  border-color: #3490dc;
}

.btn-secondary {
  background-color: #6c757d;
  border-color: #6c757d;
}

.btn-danger {
  background-color: #e3342f;
  border-color: #e3342f;
}

.table-hover tbody tr:hover {
  background-color: rgba(0, 123, 255, 0.1);
}
</style>
