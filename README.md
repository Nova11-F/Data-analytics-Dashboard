# 📊 Sales Performance Dashboard (Sales Intelligence)

Sebuah aplikasi web interaktif **Sales Performance Dashboard** modern berbasis client-side untuk menganalisis, memvisualisasikan, dan mengeksplorasi data penjualan dari berkas CSV secara real-time. Dashboard ini dilengkapi dengan visualisasi grafik interaktif, filter multi-kategori, kalkulasi KPI otomatis, serta fitur beralih mode tampilan (Dark Mode / Light Mode).

> 🎓 **Catatan Pelatihan:**  
> Proyek ini dikembangkan sebagai bagian dari tugas/hasil proyek dalam program pelatihan yang diselenggarakan oleh **[Hacktiv8 Indonesia](https://hacktiv8.com)** (@hacktiv8id).

---

## 🚀 Fitur Utama

- **📈 Visualisasi Data Interaktif**:
  - **Sales Trend**: Grafik garis tren pendapatan bulanan.
  - **Revenue per Region**: Bar chart pendapatan berdasarkan wilayah.
  - **Revenue per Category**: Bar chart pendapatan berdasarkan kategori produk.
  - **Sales per Sales Rep**: Bar chart performa penjualan per representatif penjualan.
  - **Customer Type, Payment Method, & Sales Channel**: Doughnut chart untuk distribusi tipe pelanggan, metode pembayaran, dan saluran penjualan.
  - **Discount vs Sales**: Scatter plot untuk menganalisis korelasi diskon terhadap total penjualan.
  - **Quantity Sold per Category**: Bar chart volume unit produk yang terjual.
  - **Top 10 Highest Sales Table**: Tabel 10 transaksi teratas berdasarkan pendapatan.

- **🎛️ Filter Dinamis & Real-time**:
  - Filter data berdasarkan **Region**, **Product Category**, **Customer Type**, dan **Sales Channel**.
  - Opsi dropdown terisi otomatis (*auto-populated*) berdasarkan data unik dari CSV.
  - Fitur **Reset Filter** untuk mengembalikan tampilan ke seluruh data secara cepat.

- **📊 KPI (Key Performance Indicators) Panel**:
  - Total Revenue (Total Pendapatan dalam Mata Uang USD).
  - Total Transactions (Total Transaksi).
  - Total Quantity Sold (Total Unit Terjual).
  - Average Discount (Rata-rata Diskon dalam Persentase).

- **🌓 Dukungan Tema (Dark / Light Mode)**:
  - Beralih antara mode gelap (*Dark Mode*) dan mode terang (*Light Mode*) dengan transisi halus.
  - Memori tema tersimpan otomatis di `localStorage` browser.
  - Warna grafik dan komponen UI menyesuaikan otomatis sesuai tema aktif.

- **📱 Tampilan Responsif & Modern**:
  - Menggunakan **Tailwind CSS** untuk layout responsif (mobile, tablet, desktop).
  - Navigasi filter terintegrasi dengan efek *sticky header* dan *glassmorphism backdrop blur*.

---

## 🛠️ Teknologi yang Digunakan

- **HTML5**: Struktur halaman web semantik.
- **CSS3 / Variable CSS**: Styling custom, skema tema dinamis, serta efek visual.
- **Tailwind CSS (via CDN)**: Utility-first CSS framework untuk tata letak dan desain responsif.
- **JavaScript (ES6+)**: Logika parsing CSV, manipulasi DOM, manajemen state filter, dan pengolahan data.
- **Chart.js (v4.4.3 via CDN)**: Library chart/visualisasi data interaktif.

---

## 📁 Struktur Proyek

```text
.
├── index.html          # Struktur UI utama dashboard
├── style.css           # Styling kustom, variabel CSS tema light/dark, & penyesuaian CSS
├── script.js          # Logika parsing CSV, penanganan state/filter, & integrasi Chart.js
└── 200_sales_data.csv  # Sumber data penjualan CSV (harus berada di direktori yang sama)
