export default function ({ redirect, route }) {
    if (process.client) {
      const token = localStorage.getItem('token');
  
      // Halaman yang tidak memerlukan autentikasi
      const publicPages = ['/login', '/register'];
  
      // Jika tidak ada token dan bukan halaman publik
      if (!token && !publicPages.includes(route.path)) {
        return redirect('/login');
      }
  
      // Jika ada token dan mencoba mengakses halaman login atau register, arahkan ke dashboard
      if (token && publicPages.includes(route.path)) {
        return redirect('/pegawai');
      }
    }
  }
  