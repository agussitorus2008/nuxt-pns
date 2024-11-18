<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-96">
      <h2 class="text-xl font-bold mb-6">Edit Pegawai</h2>
      <form @submit.prevent="submitForm">
        <div class="mb-4">
          <label for="nip" class="block text-sm font-medium text-gray-700">NIP</label>
          <input 
            type="text" 
            id="nip" 
            v-model="form.nip" 
            required
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div class="mb-4">
          <label for="nama" class="block text-sm font-medium text-gray-700">Nama</label>
          <input 
            type="text" 
            id="nama" 
            v-model="form.nama" 
            required
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div class="mb-4">
          <label for="tempat_lahir" class="block text-sm font-medium text-gray-700">Tempat Lahir</label>
          <input 
            type="text" 
            id="tempat_lahir" 
            v-model="form.tempat_lahir" 
            required
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div class="mb-4">
          <label for="alamat" class="block text-sm font-medium text-gray-700">Alamat</label>
          <input 
            type="text" 
            id="alamat" 
            v-model="form.alamat" 
            required
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div class="mb-4">
          <label for="tanggal_lahir" class="block text-sm font-medium text-gray-700">Tanggal Lahir</label>
          <input 
            type="date" 
            id="tanggal_lahir" 
            v-model="form.tanggal_lahir" 
            required
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div class="mb-4">
          <label for="jenis_kelamin" class="block text-sm font-medium text-gray-700">Jenis Kelamin</label>
          <input 
            type="text" 
            id="jenis_kelamin" 
            v-model="form.jenis_kelamin" 
            required
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div class="mb-4">
          <label for="golongan" class="block text-sm font-medium text-gray-700">Golongan</label>
          <input 
            type="text" 
            id="golongan" 
            v-model="form.golongan" 
            required
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div class="mb-4">
          <label for="eselon" class="block text-sm font-medium text-gray-700">Eselon</label>
          <input 
            type="text" 
            id="eselon" 
            v-model="form.eselon" 
            required
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div class="mb-4">
          <label for="jabatan" class="block text-sm font-medium text-gray-700">Jabatan</label>
          <input 
            type="text" 
            id="jabatan" 
            v-model="form.jabatan" 
            required
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div class="mb-4">
          <label for="agama" class="block text-sm font-medium text-gray-700">Agama</label>
          <input 
            type="text" 
            id="agama" 
            v-model="form.agama" 
            required
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div class="mb-4">
          <label for="no_hp" class="block text-sm font-medium text-gray-700">No HP</label>
          <input 
            type="text" 
            id="no_hp" 
            v-model="form.no_hp" 
            required
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div class="mb-4">
          <label for="npwp" class="block text-sm font-medium text-gray-700">NPWP</label>
          <input 
            type="text" 
            id="npwp" 
            v-model="form.npwp" 
            required
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div class="mb-4">
          <label for="unit_kerja_id" class="block text-sm font-medium text-gray-700">Unit Kerja</label>
          <select
            id="unit_kerja_id"
            v-model="form.unit_kerja_id"
            required
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
          >
            <option disabled value="">Pilih Unit Kerja</option>
            <option 
              v-for="unit in units" 
              :key="unit.id" 
              :value="unit.id"
            >
              {{ unit.nama_unit_kerja }}
            </option>
          </select>
        </div>

        <div class="mb-4">
          <label for="user_id" class="block text-sm font-medium text-gray-700">Username</label>
          <select
            id="user_id"
            v-model="form.user_id"
            required
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
          >
            <option disabled value="">Pilih User</option>
            <option 
              v-for="user in users" 
              :key="user.id" 
              :value="user.id"
            >
              {{ user.username }}
            </option>
          </select>
        </div>

        <div class="flex justify-end space-x-2">
          <nuxt-link to="/pegawai">
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
        nip: '',            
        nama: '',           
        tempat_lahir: '',   
        tanggal_lahir: '',  
        jenis_kelamin: '',  
        alamat: '',         
        golongan: '',       
        eselon: '',         
        jabatan: '',        
        agama: '',          
        no_hp: '',          
        unit_kerja_id: '',  
        image: '',
        user_id: '',          
      },
      errorMessage: '', 
      users: [],
      units: [],
    };
  },

  async created() {
    const id = this.$route.params.id; 
    if (id) {
      await this.fetchpegawai(id);  // Fetch the existing pegawai data for editing
    }
    await this.fetchUsers();
    await this.fetchUnits(); // Make sure data for users and units is fetched
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

    async fetchpegawai(id) {
      try {
        const token = this.getAuthToken();
        if (!token) return;

        const response = await this.$axios.get(`/pegawai/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        this.form = response.data; // Populate the form with existing pegawai data
      } catch (error) {
        this.errorMessage = 'Error fetching pegawai data: ' + (error.response?.data?.message || error.message);
        console.error('Error fetching pegawai:', error);
      }
    },

    async fetchUsers() {
      try {
        const token = this.getAuthToken();
        if (!token) return;

        const response = await this.$axios.get('/auth/user', {
          headers: { Authorization: `Bearer ${token}` }
        });

        this.users = response.data || []; // Store users data
      } catch (error) {
        this.errorMessage = 'Error fetching users: ' + (error.response?.data?.message || error.message);
        console.error('Error fetching users:', error);
      }
    },

    async fetchUnits() {
      try {
        const token = this.getAuthToken();
        if (!token) return;

        const response = await this.$axios.get('/unitkerja', {
          headers: { Authorization: `Bearer ${token}` }
        });

        this.units = response.data || []; // Store unit data
      } catch (error) {
        this.errorMessage = 'Error fetching units: ' + (error.response?.data?.message || error.message);
        console.error('Error fetching units:', error);
      }
    },

    async submitForm() {
      try {
        const token = this.getAuthToken();
        if (!token) return;

        const id = this.$route.params.id;
        let response;

        if (id) {
          // Update existing pegawai if an ID is present
          response = await this.$axios.put(`/pegawai/${id}`, this.form, {
            headers: { Authorization: `Bearer ${token}` }
          });
        } else {
          // Add new pegawai if no ID
          response = await this.$axios.post('/pegawai', this.form, {
            headers: { Authorization: `Bearer ${token}` }
          });
        }

        this.$router.push('/pegawai');
      } catch (error) {
        console.error('Error submitting form:', error);
        this.errorMessage = 'Terjadi kesalahan saat mengirimkan data. Silakan coba lagi.';
      }
    }
  }
};
</script>
