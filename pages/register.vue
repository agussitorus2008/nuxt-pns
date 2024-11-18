<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
      <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h1 class="text-2xl font-semibold text-center mb-6">Daftar</h1>
        <form @submit.prevent="register">
          <!-- Username Input -->
          <div class="mb-4">
            <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              id="username"
              v-model="username"
              required
              class="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
  
          <!-- Email Input -->
          <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              v-model="email"
              required
              class="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
  
          <!-- Password Input -->
          <div class="mb-6">
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              v-model="password"
              required
              class="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
  
          <!-- Submit Button -->
          <button
            type="submit"
            class="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md"
          >
            Daftar
          </button>
        </form>
  
        <!-- Redirect to Login Link -->
        <p class="mt-4 text-center text-sm text-gray-600">
          Sudah punya akun? <nuxt-link to="/login" class="text-blue-500 hover:text-blue-600">Login disini</nuxt-link>
        </p>
  
        <!-- Error Message -->
        <p v-if="errorMessage" class="mt-4 text-center text-red-500">{{ errorMessage }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        email: '',
        password: '',
        errorMessage: '', // To display error messages
      };
    },
    methods: {
      async register() {
        try {
          // Send request to the backend using Axios
          const response = await this.$axios.post('/auth/register', {
            username: this.username,
            email: this.email,
            password: this.password,
          });
  
          // Save token in localStorage
          localStorage.setItem('token', response.data.token);
  
          // Redirect to login page after successful registration
          this.$router.push('/login');
        } catch (error) {
          // If registration failed, capture error and show message
          console.error('Registration failed:', error.response?.data?.message);
          this.errorMessage = error.response?.data?.message || 'Gagal mendaftar, coba lagi';
        }
      },
    },
  };
  </script>
  