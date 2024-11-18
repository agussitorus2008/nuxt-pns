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
    <div class="container mx-auto p-4">
      <h1 class="text-3xl font-bold mb-6">Daftar Unit Kerja</h1>

      <!-- Button to open create form -->
      <nuxt-link to="/unit-kerja/create">
        <button class="bg-green-500 text-white px-4 py-2 rounded mb-6">Tambah Unit Kerja</button>
      </nuxt-link>

      <!-- Table to display unit kerja -->
      <table class="min-w-full bg-white border border-gray-200 rounded-md shadow-md">
        <thead>
          <tr>
            <th class="px-4 py-2 border">No</th>
            <th class="px-4 py-2 border">Nama Unit Kerja</th>
            <th class="px-4 py-2 border">Alamat</th>
            <th class="px-4 py-2 border">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(unit, index) in unitKerja" :key="unit.id">
            <td class="px-4 py-2 border">{{ index + 1 }}</td>
            <td class="px-4 py-2 border">{{ unit.nama_unit_kerja }}</td>
            <td class="px-4 py-2 border">{{ unit.alamat_unit_kerja }}</td>
            <td class="px-4 py-2 border">
              <button @click="goToEditPage(unit.id)" class="bg-yellow-500 text-white px-4 py-1 rounded mr-2">Edit</button>
              <button @click="deleteUnit(unit.id)" class="bg-red-500 text-white px-4 py-1 rounded">
                Hapus
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

</template>

<script>
export default {
  data() {
    return {
      unitKerja: [],
      errorMessage: ''
    };
  },
  async mounted() {
    await this.fetchUnitKerja();
  },
  methods: {
    // Helper function to get the token from localStorage
    getAuthToken() {
      const token = localStorage.getItem('token');
      if (!token) {
        this.errorMessage = 'Token tidak ditemukan, silakan login';
        return null;
      }
      return token;
    },

    goToEditPage(unitId) {
      // Navigasi programatik ke halaman edit dengan unit.id
      this.$router.push(`/unit-kerja/edit/${unitId}`);
    },
    // Fetch unit kerja from the API
    async fetchUnitKerja() {
      try {
        const token = this.getAuthToken();
        if (!token) return; // If no token, stop here

        const response = await this.$axios.get('/unitkerja', {
          headers: { Authorization: `Bearer ${token}` }
        });

        this.unitKerja = response.data;
      } catch (error) {
        this.errorMessage = 'Error fetching unit kerja: ' + (error.response?.data?.message || error.message);
        console.error('Error fetching unit kerja:', error);
      }
    },

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
    

    // Delete unit kerja from the API
    async deleteUnit(id) {
      try {
        const token = this.getAuthToken();
        if (!token) return; // If no token, stop here

        await this.$axios.delete(`/unitkerja/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        this.fetchUnitKerja(); // Refresh after deletion
      } catch (error) {
        this.errorMessage = 'Error deleting unit kerja: ' + (error.response?.data?.message || error.message);
        console.error('Error deleting unit kerja:', error);
      }
    }
  }
};
</script>

<style scoped>
.error-message {
  color: red;
  margin-top: 10px;
}
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

