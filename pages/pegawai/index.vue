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
    <h1 class="text-3xl font-bold mb-6">Daftar Pegawai</h1>

    <!-- Button to open create form -->
    <nuxt-link to="/pegawai/create">
      <button class="bg-green-500 text-white px-4 py-2 rounded mb-6">Tambah Data Pegawai</button>
    </nuxt-link>
    <button @click="generatePDF" class="bg-blue-500 text-white px-4 py-2 rounded mb-6">
      Cetak PDF
    </button>

    <!-- Search bar with unit kerja filter -->
    <div class="flex items-center mb-6 space-x-4">
      <!-- Input pencarian -->
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Cari berdasarkan nama atau NIP"
        class="border border-gray-300 rounded px-4 py-2 flex-grow"
      />
      
      <!-- Dropdown unit kerja -->
      <select
        v-model="selectedUnitKerja"
        @change="fetchPegawai"
        class="border border-gray-300 rounded px-4 py-2"
      >
        <option value="">Semua Unit Kerja</option>
        <option
          v-for="unit in unitKerjaOptions"
          :key="unit.id"
          :value="unit.id"
        >
          {{ unit.nama_unit_kerja }}
        </option>
      </select>
      
      <!-- Tombol pencarian -->
      <button
        @click="fetchPegawai"
        class="bg-green-500 text-white px-4 py-2 rounded"
      >
        Cari
      </button>
    </div>

    <!-- Table to display pegawai or users -->
    <table class="min-w-full bg-white border border-gray-200 rounded-md shadow-md">
      <thead class="bg-gray-100">
        <tr>
          <th class="px-4 py-2 text-left font-semibold text-gray-700">No</th>
          <th class="px-4 py-2 text-left font-semibold text-gray-700">NIP</th>
          <th class="px-4 py-2 text-left font-semibold text-gray-700">Nama</th>
          <th class="px-4 py-2 text-left font-semibold text-gray-700">Jabatan</th>
          <th class="px-4 py-2 text-left font-semibold text-gray-700">Unit Kerja</th>
          <th class="px-4 py-2 text-left font-semibold text-gray-700">Username</th>
          <th class="px-4 py-2 text-left font-semibold text-gray-700">Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in combinedData" :key="item.id">
          <td class="px-4 py-2 border">{{ index + 1 }}</td>
          <td class="px-4 py-2 border">{{ item.nip || '-' }}</td>
          <td class="px-4 py-2 border">{{ item.nama || '-' }}</td>
          <td class="px-4 py-2 border">{{ item.jabatan || '-' }}</td>
          <td class="px-4 py-2 border">{{ item.unit_kerja?.nama_unit_kerja || '-' }}</td>
          <td class="px-4 py-2 border">{{ item.user?.username || '-' }}</td>
          <td class="px-4 py-2 border">
            <button @click="goToShowPage(item.id)" class="bg-green-500 text-white px-4 py-1 rounded mr-2">Show</button>
            <button @click="goToEditPage(item.id)" class="bg-yellow-500 text-white px-4 py-1 rounded mr-2">Edit</button>
            <button @click="deleteItem(item.id)" class="bg-red-500 text-white px-4 py-1 rounded">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination Controls -->
    <div class="flex justify-between mt-4">
      <button 
        :disabled="currentPage === 1"
        @click="changePage(currentPage - 1)"
        class="bg-gray-500 text-white px-4 py-2 rounded"
      >
        Previous
      </button>
      <span class="text-gray-700">Page {{ currentPage }} of {{ totalPages }}</span>
      <button 
        :disabled="currentPage === totalPages"
        @click="changePage(currentPage + 1)"
        class="bg-gray-500 text-white px-4 py-2 rounded"
      >
        Next
      </button>
    </div>

    <!-- Error message if any -->
    <div v-if="errorMessage" class="text-red-500 mt-4">
      {{ errorMessage }}
    </div>
    </div>
  </div>
  
</template>


<script>
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default {
  data() {
    return {
      pegawai: [], // Data pegawai
      users: [], // Data users
      searchQuery: '', // Query pencarian
      selectedUnitKerja: '', // ID unit kerja yang dipilih
      unitKerjaOptions: [], // Daftar unit kerja
      currentPage: 1,  // Halaman saat ini
      perPage: 3,  // Jumlah data per halaman
      totalPages: 1,  // Jumlah total halaman
      errorMessage: '' // Pesan error
    };
  },
  async mounted() {
    await this.fetchUnitKerjaOptions(); // Fetch daftar unit kerja
    await this.fetchPegawai(); // Fetch data pegawai
  },
  computed: {
    // Gabungkan pegawai dan users menjadi satu array
    combinedData() {
      return [...this.pegawai, ...this.users];
    }
  },
  methods: {
    // Ambil token dari localStorage
    getAuthToken() {
      const token = localStorage.getItem('token');
      if (!token) {
        this.errorMessage = 'Token tidak ditemukan, silakan login';
        return null;
      }
      return token;
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

    // Navigasi ke halaman detail pegawai
    goToShowPage(id) {
      this.$router.push(`/pegawai/show/${id}`);
    },

    // Navigasi ke halaman edit pegawai
    goToEditPage(id) {
      this.$router.push(`/pegawai/edit/${id}`);
    },

    // Fetch data pegawai dengan pencarian dan filter
    async fetchPegawai() {
      try {
        const token = this.getAuthToken();
        if (!token) return;

        const params = {
          search: this.searchQuery || undefined,
          unit_kerja_id: this.selectedUnitKerja || undefined,
          limit: this.perPage,  // Menambahkan limit pada request
          page: this.currentPage,  // Menambahkan halaman saat ini
        };

        const response = await this.$axios.get('/pegawai?export=true', {
          params,
          headers: { Authorization: `Bearer ${token}` }
        });

        this.pegawai = response.data.data || [];
        this.totalPages = response.data.last_page;  // Update jumlah halaman total
      } catch (error) {
        this.errorMessage = 'Error fetching pegawai: ' + (error.response?.data?.message || error.message);
        console.error('Error fetching pegawai:', error);
      }
    },

    // Fetch daftar unit kerja untuk dropdown filter
    async fetchUnitKerjaOptions() {
      try {
        const token = this.getAuthToken();
        if (!token) return;

        const response = await this.$axios.get('/unitkerja', {
          headers: { Authorization: `Bearer ${token}` }
        });

        this.unitKerjaOptions = response.data || [];
      } catch (error) {
        this.errorMessage = 'Error fetching unit kerja: ' + (error.response?.data?.message || error.message);
        console.error('Error fetching unit kerja:', error);
      }
    },

    // Fetch data users
    async fetchUsers() {
      try {
        const token = this.getAuthToken();
        if (!token) return;

        const response = await this.$axios.get('/auth/user', {
          headers: { Authorization: `Bearer ${token}` }
        });

        this.users = response.data || [];
      } catch (error) {
        this.errorMessage = 'Error fetching users: ' + (error.response?.data?.message || error.message);
        console.error('Error fetching users:', error);
      }
    },

    

    // Menghapus data pegawai dari API
    async deletePegawai(id) {
      try {
        const token = this.getAuthToken();
        if (!token) return;

        await this.$axios.delete(`/pegawai/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        this.fetchPegawai();
      } catch (error) {
        this.errorMessage = 'Error deleting pegawai: ' + (error.response?.data?.message || error.message);
        console.error('Error deleting pegawai:', error);
      }
    },

    async generatePDF() {
    const token = this.getAuthToken(); // Mendapatkan token autentikasi
    if (!token) {
        alert("Token tidak ditemukan. Harap login kembali.");
        return;
    }

    const pdf = new jsPDF();

    // Menyusun header tabel
    const columns = ['No', 'NIP', 'Nama', 'Jabatan', 'Unit Kerja', 'Username'];
    const rows = [];

    // Menambahkan data pegawai ke dalam baris tabel
    this.pegawai.forEach((pegawai, index) => {
        rows.push([
            index + 1,
            pegawai.nip || '-',
            pegawai.nama || '-',
            pegawai.tempat_lahir || '-',
            pegawai.jabatan || '-',
            pegawai.unit_kerja?.nama_unit_kerja || '-',
            pegawai.user?.username || '-'
        ]);
    });

    // Menambahkan tabel ke dalam PDF
    pdf.autoTable({
        head: [columns],
        body: rows,
        startY: 20, // Menentukan posisi Y awal untuk tabel
        theme: 'grid', // Tema tabel (grid untuk garis tepi)
        headStyles: {
            fillColor: [255, 255, 255], // Warna latar belakang header
            textColor: [0, 0, 0], // Warna teks header
            fontStyle: 'bold' // Gaya font untuk header
        },
        bodyStyles: {
            textColor: [0, 0, 0] // Warna teks untuk body tabel
        }
    });

    // Menyimpan PDF dengan nama 'pegawai.pdf'
    pdf.save('pegawai.pdf');
},






    // Menghapus data user jika perlu
    async deleteUser(id) {
      try {
        const token = this.getAuthToken();
        if (!token) return;

        await this.$axios.delete(`/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        this.fetchUsers();
      } catch (error) {
        this.errorMessage = 'Error deleting user: ' + (error.response?.data?.message || error.message);
        console.error('Error deleting user:', error);
      }
    },

    async changePage(page) {
      if (page < 1 || page > this.totalPages) return;
      this.currentPage = page;
      await this.fetchPegawai();  // Ambil data berdasarkan halaman yang dipilih
    },

    // Menghapus data (pegawai atau user)
    async deleteItem(id) {
      if (this.pegawai.find(p => p.id === id)) {
        await this.deletePegawai(id);
      } else {
        await this.deleteUser(id);
      }
    }
  }
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