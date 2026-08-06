<div align="center">
# 📊 SALES INTELLIGENCE

### *Modern Sales Performance Dashboard*

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white)](https://www.chartjs.org/)
[![Responsive](https://img.shields.io/badge/Responsive-Yes-success?style=for-the-badge)]()
[![License](https://img.shields.io/badge/License-Educational-blue?style=for-the-badge)]()

Sebuah aplikasi web interaktif **Sales Performance Dashboard** modern berbasis client-side untuk menganalisis, memvisualisasikan, dan mengeksplorasi data penjualan dari berkas CSV secara real-time. Dashboard ini dilengkapi dengan visualisasi grafik interaktif, filter multi-kategori, kalkulasi KPI otomatis, serta fitur beralih mode tampilan (Dark Mode / Light Mode).

> 🎓 **Catatan Pelatihan:**  
> Proyek ini dikembangkan sebagai bagian dari tugas/hasil proyek dalam program pelatihan yang diselenggarakan oleh **[Hacktiv8 Indonesia](https://hacktiv8.com)** (@hacktiv8id).

</div>

# 📖 Tentang Proyek

**Sales Performance Dashboard** merupakan aplikasi analitik data penjualan berbasis *client-side* yang dibangun menggunakan **HTML, Tailwind CSS, JavaScript (ES6+), dan Chart.js**.

Website ini memungkinkan pengguna untuk:

- 📈 Menganalisis tren pendapatan bulanan dan performa tim penjualan
- 🎛️ Memfilter data penjualan secara dinamis dan real-time
- 📊 Memantau Key Performance Indicators (KPI) bisnis secara instan
- 🌓 Beralih antara Dark Mode dan Light Mode sesuai kenyamanan visual

Proyek ini dibuat sebagai media pembelajaran dalam menerapkan konsep **Data Visualization**, **DOM Manipulation**, **State Management**, **CSV Parsing**, dan **Responsive Web Design**.

---

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
```

---
## 📋 Format Data CSV (`200_sales_data.csv`)

Aplikasi ini membaca data dari berkas CSV dengan kolom wajib berikut:

| Nama Kolom | Tipe Data | Deskripsi |
| :--- | :--- | :--- |
| `Sale_Date` | Date (`YYYY-MM-DD`) | Tanggal transaksi penjualan |
| `Region` | String | Wilayah lokasi penjualan (misal: North, South, East, West) |
| `Product_Category` | String | Kategori produk (misal: Electronics, Clothing) |
| `Customer_Type` | String | Tipe pelanggan (misal: New, Returning) |
| `Sales_Channel` | String | Saluran penjualan (misal: Online, In-Store) |
| `Sales_Rep` | String | Nama representatif / agen penjualan |
| `Payment_Method` | String | Metode pembayaran (misal: Credit Card, PayPal) |
| `Sales_Amount` | Number | Total besaran nilai penjualan dalam desimal/angka |
| `Quantity_Sold` | Integer | Jumlah unit barang yang dibeli |
| `Discount` | Number | Besaran diskon dalam bentuk desimal (misal: `0.1` untuk 10%) |

---

## 💻 Cara Menjalankan Proyek

Aplikasi ini memuat berkas CSV secara lokal menggunakan API `fetch()`. Untuk menghindari masalah kebijakan keamanan browser (**CORS Error**), aplikasi **harus dijalankan melalui Local Web Server** dan tidak bisa langsung dibuka hanya dengan mengklik ganda file `index.html`.

### Opsi 1: Menggunakan VS Code Extension (Live Server)
1. Buka folder proyek di **Visual Studio Code**.
2. Instal ekstensi **Live Server** oleh *Ritwick Dey*.
3. Klik kanan pada file `index.html` dan pilih **Open with Live Server**.

### Opsi 2: Menggunakan Python Web Server
Jika Anda memiliki Python terinstal di komputer:
```bash
# Untuk Python 3.x
python -m http.server 8000
```
Buka browser dan akses halaman melalui `http://localhost:8000`.

### Opsi 3: Menggunakan Node.js (`npx serve` / `http-server`)
```bash
npx serve .
# ATAU
npx http-server .
```

---

## ⚙️ Penjelasan Fungsi Utama Kode

- **`parseCsv(text)` & `parseCsvLine(line)` (`script.js`)**:
  Fungsi kustom parser CSV yang mampu menangani *quoted string* (nilai kolom yang mengandung koma) tanpa ketergantungan library eksternal.
- **`renderKpis(rows)` (`script.js`)**:
  Mengkalkulasi nilai aggregate (Revenue, Transactions, Quantity, Discount) secara otomatis dari array data yang telah difilter.
- **`renderCharts(rows)` (`script.js`)**:
  Mengatur ulang (*destroy*) instansiasi Chart.js lama dan merender ulang seluruh grafik sesuai dengan data hasil filter yang aktif.
- **`applyTheme(theme)` (`script.js` & `style.css`)**:
  Mengubah class pada `body` (`theme-light` / `theme-dark`), memperbarui icon/label, serta menyesuaikan skema warna teks, grid, dan tooltip Chart.js secara otomatis.

---

## 🏫 Tentang Pelatihan & Hacktiv8

Proyek ini dibuat sebagai bentuk penyelesaian studi kasus/praktik proyek dari program pelatihan di **Hacktiv8 Indonesia**. Seluruh rancangan interface, logika pengolahan data, dan integrasi chart dipelajari serta dikembangkan selama mengikuti pelatihan.

---

## 📜 Lisensi

Proyek ini dibuat untuk tujuan edukasi, analisis data, dan portofolio pengembangan aplikasi web frontend. Silakan kembangkan dan kustomisasi sesuai kebutuhan Anda.
<div align="center">

### ⭐ Jangan lupa berikan Star jika proyek ini bermanfaat!

Created as part of **Hacktiv8 Indonesia** Training Program

</div>
