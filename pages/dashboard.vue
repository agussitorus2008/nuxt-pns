<template>
  <div>
    <nav class="bg-blue-400 text-white p-4">
      <div class="max-w-7xl mx-auto flex items-center justify-between">
        <!-- Home Link -->
        <div class="text-xl font-semibold">
          <router-link to="/dashboard" class="text-white hover:text-gray-300">Dashboard</router-link>
        </div>
        <!-- Navigation Links & Dropdown -->
        <div class="flex items-center space-x-4">
          <!-- Dropdown for Pegawai and Unit Kerja -->
          <div class="relative">
            <button class="hover:bg-blue-700 p-2 rounded-md">
              Menu
            </button>
            <div class="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg hidden group-hover:block">
              <router-link to="/pegawai" class="block px-4 py-2 text-sm hover:bg-blue-700 hover:text-white">Pegawai</router-link>
              <router-link to="/unit-kerja" class="block px-4 py-2 text-sm hover:bg-blue-700 hover:text-white">Unit Kerja</router-link>
            </div>
          </div>
          <!-- Logout Button -->
          <button @click="logout" class="hover:bg-red-600 p-2 rounded-md">Logout</button>
        </div>
      </div>
    </nav>

    <!-- Welcome Message -->

    <div class="max-w-4xl mx-auto sm:px-6 lg:px-8 flex items-center justify-center min-h-screen">
      <h2 class="text-2xl leading-7 font-semibold">
        Welcome to your Nuxt Application
      </h2>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',  // For storing the username or greeting message
    };
  },
  mounted() {
    // Get the username from localStorage or Vuex store (if available)
    const user = localStorage.getItem('username'); // Assuming username is stored here
    if (user) {
      this.username = user;
    } else {
      this.username = 'Pengguna';  // Default value if username is not found
    }
  },
  methods: {
    // Logout method with token in headers
    async logout() {
      console.log('Logging out...');
      const token = localStorage.getItem('token');

      if (!token) {
        console.log('Token tidak ditemukan, silakan login');
        this.$router.push('/login');
        return;
      }

      try {
        const response = await this.$axios.post('auth/logout', {}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log('Logout successful:', response);
        localStorage.removeItem('token');
        console.log('Token removed from localStorage');
        this.$router.push('/login');
      } catch (error) {
        console.error('Error during logout:', error);
        this.errorMessage = 'Terjadi kesalahan saat logout. Silakan coba lagi.';
      }
    },
  },
};
</script>

<style scoped>
/* Styling for the dropdown menu */
.relative:hover .hidden {
  display: block;
}

/* Add z-index to ensure dropdown is on top */
.relative {
  position: relative;
  z-index: 10;
}

.relative .hidden {
  z-index: 20;
}
</style>

