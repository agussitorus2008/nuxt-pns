<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
      <div class="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 class="text-xl font-bold mb-6">Tambah Unit Kerja</h2>
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
            <button type="submit" class="bg-green-500 text-white px-4 py-2 rounded">
              Tambah
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
    methods: {

      
      // Method to retrieve token from localStorage
      getAuthToken() {
        const token = localStorage.getItem('token');  // Retrieve token from localStorage
        if (!token) {
          console.log('Token tidak ditemukan, silakan login');
          this.errorMessage = 'Token tidak ditemukan, silakan login';
          this.$router.push('/login'); // Redirect to login page if token is missing
          return null; // Return null if token is not found
        }
        return token; // Return the token if found
      },
  
      // Submit form method to add unit kerja
      async submitForm() {
        try {
          // Ambil token otentikasi
          const token = this.getAuthToken();

          // Jika token tidak ada, hentikan proses
          if (!token) return;

          // Lakukan request untuk menambahkan unit kerja
          const response = await this.$axios.post('/unitkerja', this.form, {
            headers: { Authorization: `Bearer ${token}` }
          });

          // Jika berhasil, arahkan ke halaman unit kerja
          this.$router.push('/unit-kerja');
        } catch (error) {
          // Tangani error jika ada
          console.error('Error adding unit kerja:', error);
          this.errorMessage = 'Terjadi kesalahan saat menambahkan unit kerja. Silakan coba lagi.';
        }
      }



    }
  };
  </script>
  
  
  