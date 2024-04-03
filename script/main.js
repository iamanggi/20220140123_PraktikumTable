
// Function to sort table by column
function sortColumn(columnIndex) {
    const table = document.querySelector('table');
    const table_rows = Array.from(document.querySelectorAll('tbody tr'));
    const sortAsc = table.querySelector(`th[data-index="${columnIndex}"]`).classList.contains('sorted-asc');

    // Toggle arrow icon
    const arrowIcon = table.querySelector(`th[data-index="${columnIndex}"] .icon-arrow`);
    arrowIcon.textContent = sortAsc ? '↓' : '↑';

    // Add or remove sorted class for visual indication
    const headers = document.querySelectorAll('th');
    headers.forEach(header => header.classList.remove('sorted-asc'));
    headers.forEach(header => header.classList.remove('sorted-desc'));
    table.querySelector(`th[data-index="${columnIndex}"]`).classList.toggle('sorted-asc', !sortAsc);
    table.querySelector(`th[data-index="${columnIndex}"]`).classList.toggle('sorted-desc', sortAsc);

    // Sort table rows
    table_rows.sort((a, b) => {
        let first_row, second_row;
        if (columnIndex === 4) { // Kolom 4 adalah tanggal pengaduan
            first_row = new Date(a.querySelectorAll('td')[columnIndex].textContent);
            second_row = new Date(b.querySelectorAll('td')[columnIndex].textContent);
        } else { // Kolom lainnya
            first_row = a.querySelectorAll('td')[columnIndex].textContent.toLowerCase();
            second_row = b.querySelectorAll('td')[columnIndex].textContent.toLowerCase();
        }

        return sortAsc ? (first_row > second_row ? 1 : -1) : (first_row > second_row ? -1 : 1);
    });

    // Append sorted rows to table
    table_rows.forEach(sorted_row => table.querySelector('tbody').appendChild(sorted_row));
}



// Menambahkan event listener pada setiap tombol "Hapus"
const deleteButtons = document.querySelectorAll('.fa-trash');

deleteButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Tampilkan pesan konfirmasi SweetAlert
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

                // Tampilkan pesan sukses
                Swal.fire(
                    'Deleted!',
                    'Data keluhan telah dihapus.',
                    'success'
                );
            }
        });
    });
});

function handleFormSubmit() {
    const pelapor = document.getElementById("pelapor").value;
    const deskripsi = document.getElementById("Deskripsi").value;
    const tanggal = document.getElementById("Tanggal_Pengaduan").value;
    const lokasi = document.getElementById("Lokasi").value;

    if (!pelapor || !deskripsi || !tanggal || !lokasi) {
        Swal.fire({
            icon: 'error',
            title: 'Data tidak lengkap',
            text: 'Harap isi semua field!',
        });
    } else {
        Swal.fire({
            icon: 'success',
            title: 'Data berhasil disimpan',
            showConfirmButton: false,
            timer: 1500
        });
    }
}

