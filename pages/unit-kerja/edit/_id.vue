<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
      <div class="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 class="text-xl font-bold mb-6">Edit Unit Kerja</h2>
        <form @submit.prevent="submitForm">
          <div class="mb-4">
            <label for="nama_unit_kerja" class="block text-sm font-medium text-gray-700">Nama Unit Kerja</label>
            <input 
              type="text" 
              id="nama_unit_kerja" 
              v-model="form.nama_unit_kerja" 
              required
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>
  
          <div class="mb-4">
            <label for="alamat_unit_kerja" class="block text-sm font-medium text-gray-700">Alamat Unit Kerja</label>
            <input 
              type="text" 
              id="alamat_unit_kerja" 
              v-model="form.alamat_unit_kerja" 
              required
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>
  
          <div class="flex justify-end space-x-2">
            <nuxt-link to="/unit-kerja">
              <button type="button" class="bg-gray-500 text-white px-4 py-2 rounded">
                Batal
              </button>
            </nuxt-link>
            <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        form: {
          nama_unit_kerja: '',
          alamat_unit_kerja: ''
        },
        errorMessage: '' // To store error message if any
      };
    },
    async created() {
      const unitId = this.$route.params.id; // Get the ID from the route parameters
      if (unitId) {
        await this.fetchUnitKerja(unitId); // Fetch data for the specific unit kerja
      }
    },
    methods: {
      // Method to retrieve token from localStorage
      getAuthToken() {
        const token = localStorage.getItem('token'); // Retrieve token from localStorage
        if (!token) {
          console.log('Token tidak ditemukan, silakan login');
          this.errorMessage = 'Token tidak ditemukan, silakan login';
          this.$router.push('/login'); // Redirect to login page if token is missing
          return null; // Return null if token is not found
        }
        return token; // Return the token if found
      },
  
      // Fetch the unit kerja data by ID for editing
      async fetchUnitKerja(unitId) {
        try {
          const token = this.getAuthToken();
          if (!token) return;
  
          const response = await this.$axios.get(`/unitkerja/${unitId}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          
          // Populate the form with the fetched data
          this.form.nama_unit_kerja = response.data.nama_unit_kerja;
          this.form.alamat_unit_kerja = response.data.alamat_unit_kerja;
        } catch (error) {
          console.error('Error fetching unit kerja:', error);
          this.errorMessage = 'Terjadi kesalahan saat mengambil data unit kerja. Silakan coba lagi.';
        }
      },
  
      // Submit form method to update the unit kerja
      async submitForm() {
        try {
          const token = this.getAuthToken();
          if (!token) return;
  
          const unitId = this.$route.params.id; // Get the ID from the route parameters
  
          // Check if it's an edit or a new creation
          const method = unitId ? 'put' : 'post'; // Use PUT for update
          const url = unitId ? `/unitkerja/${unitId}` : '/unitkerja';
  
          const response = await this.$axios[method](url, this.form, {
            headers: { Authorization: `Bearer ${token}` }
          });
  
          // Redirect after successful submission
          this.$router.push('/unit-kerja');
        } catch (error) {
          console.error('Error submitting form:', error);
          this.errorMessage = 'Terjadi kesalahan saat menyimpan data unit kerja. Silakan coba lagi.';
        }
      }
    }
  };
  </script>
  