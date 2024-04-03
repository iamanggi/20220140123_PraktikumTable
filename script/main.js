// Function untuk mengurutkan tabel berdasarkan kolom
function sortColumn(columnIndex) {
    const table = document.querySelector('table'); // Mengambil tabel dari dokumen
    const table_rows = Array.from(document.querySelectorAll('tbody tr')); // Mengambil semua baris tabel
    const sortAsc = table.querySelector(`th[data-index="${columnIndex}"]`).classList.contains('sorted-asc'); // Menentukan arah pengurutan (asc/desc)

    // Mengubah ikon panah arah pengurutan
    const arrowIcon = table.querySelector(`th[data-index="${columnIndex}"] .icon-arrow`);
    arrowIcon.textContent = sortAsc ? '↓' : '↑';

    // Menambah atau menghapus kelas sorted untuk indikasi visual
    const headers = document.querySelectorAll('th');
    headers.forEach(header => header.classList.remove('sorted-asc')); // Menghapus kelas sorted-asc dari semua header
    headers.forEach(header => header.classList.remove('sorted-desc')); // Menghapus kelas sorted-desc dari semua header
    table.querySelector(`th[data-index="${columnIndex}"]`).classList.toggle('sorted-asc', !sortAsc); // Menambah atau menghapus kelas sorted-asc
    table.querySelector(`th[data-index="${columnIndex}"]`).classList.toggle('sorted-desc', sortAsc); // Menambah atau menghapus kelas sorted-desc

    // Mengurutkan baris tabel
    table_rows.sort((a, b) => {
        let first_row, second_row;
        if (columnIndex === 4) { // Jika kolom adalah tanggal pengaduan
            first_row = new Date(a.querySelectorAll('td')[columnIndex].textContent); // Mengambil nilai tanggal dari baris a
            second_row = new Date(b.querySelectorAll('td')[columnIndex].textContent); // Mengambil nilai tanggal dari baris b
        } else { // Jika kolom bukan tanggal pengaduan
            first_row = a.querySelectorAll('td')[columnIndex].textContent.toLowerCase(); // Mengambil nilai teks dari baris a
            second_row = b.querySelectorAll('td')[columnIndex].textContent.toLowerCase(); // Mengambil nilai teks dari baris b
        }

        // Mengembalikan nilai perbandingan untuk pengurutan
        return sortAsc ? (first_row > second_row ? 1 : -1) : (first_row > second_row ? -1 : 1);
    });

    // Menambahkan baris yang sudah diurutkan kembali ke tabel
    table_rows.forEach(sorted_row => table.querySelector('tbody').appendChild(sorted_row));
}

// Menambahkan event listener pada setiap tombol "Hapus"
const deleteButtons = document.querySelectorAll('.fa-trash'); // Mengambil semua tombol "Hapus"

deleteButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Menampilkan pesan konfirmasi SweetAlert
        Swal.fire({
            title: 'Apakah Anda yakin?',
            text: 'Data keluhan ini akan dihapus permanen.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, hapus!',
            cancelButtonText: 'Batal'
        }).then((result) => {
            // Jika pengguna menekan tombol "Ya", hapus baris tabel
            if (result.isConfirmed) {
                // Temukan elemen tr yang berisi tombol "Hapus" yang ditekan
                const row = button.closest('tr');
                
                // Hapus elemen tr dari DOM
                row.remove();

                // Menampilkan pesan sukses
                Swal.fire(
                    'Deleted!',
                    'Data keluhan telah dihapus.',
                    'success'
                );
            }
        });
    });
});

// Fungsi untuk menangani pengiriman formulir
function handleFormSubmit() {
    // Mendapatkan nilai dari input-form
    const pelapor = document.getElementById("pelapor").value;
    const deskripsi = document.getElementById("Deskripsi").value;
    const tanggal = document.getElementById("Tanggal_Pengaduan").value;
    const lokasi = document.getElementById("Lokasi").value;

    // Memeriksa apakah semua field telah diisi
    if (!pelapor || !deskripsi || !tanggal || !lokasi) {
        // Jika tidak, tampilkan pesan error
        Swal.fire({
            icon: 'error',
            title: 'Data tidak lengkap',
            text: 'Harap isi semua field!',
        });
    } else {
        // Jika ya, tampilkan pesan sukses
        Swal.fire({
            icon: 'success',
            title: 'Data berhasil disimpan',
            showConfirmButton: false,
            timer: 1500
        });
    }
}
