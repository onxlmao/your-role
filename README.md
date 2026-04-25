# 🎭 Apa Role Kamu di Facebook?

Web app iseng buat ngecek kamu itu role apa di dunia Facebook. Cukup masukin nama dan upload foto profil, terus nanti keluar radar chart dengan score buat tiap kategori role + meme yang sesuai. Seluruh proses analisis berjalan di sisi klien (client-side) — gambar kamu nggak dikirim ke server manapun.

## ✨ Fitur

- **9 Kategori Role** — sepuh, caboel, kroco, jomok, pedo, rasis, chef, klemer, artis
- **Radar Chart Interaktif** — Visualisasi score tiap role pake Recharts, bisa hover buat lihat detail
- **Deterministik per Gambar** — Gambar yang sama selalu menghasilkan score yang sama, jadi hasilnya konsisten
- **Meme Acak** — Tiap role punya 2 variant meme yang dipilih secara random
- **Loading Boongan** — Ada fake loading 2 detik biar dramatis
- **Responsive** — Layout adaptif, nyaman dipake di desktop maupun mobile
- **Client-Side Only** — Nggak ada backend, nggak ada data yang dikirim ke server

## 🛠️ Tech Stack

| Teknologi | Keterangan |
|-----------|------------|
| [Next.js 14](https://nextjs.org/) | React framework (App Router) |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe JavaScript |
| [Recharts](https://recharts.org/) | Library radar chart |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first CSS framework |
| [Lucide React](https://lucide.dev/) | Icon library |
| [Node.js 20](https://nodejs.org/) | Runtime environment |

## 📂 Struktur Project

```
your-role/
├── public/
│   └── meme/                  # 18 gambar meme (2 per role)
│       ├── puh.jpeg, puh2.jpeg
│       ├── bul.jpeg, bul2.jpeg
│       ├── co.jpeg, co2.jpeg
│       ├── mok.jpeg, mok2.jpeg
│       ├── pdf.jpeg, pdf2.jpeg
│       ├── rasis.jpeg, rasis2.jpeg
│       ├── chef.jpeg, chef2.jpeg
│       ├── klemer.jpeg, klemer2.jpeg
│       └── tis.jpeg, tis2.jpeg
├── src/
│   ├── app/
│   │   ├── globals.css        # Tailwind base + CSS variables (theme)
│   │   ├── layout.tsx         # Root layout dengan metadata
│   │   └── page.tsx           # Halaman utama (server component)
│   ├── components/
│   │   ├── radar.tsx          # Komponen utama: form, chart, hasil
│   │   └── ui/
│   │       ├── button.tsx     # Komponen button (shadcn-style)
│   │       └── input.tsx      # Komponen input (shadcn-style)
│   └── lib/
│       └── utils.ts           # Utility: cn() untuk merge class names
├── Dockerfile                 # Single-stage Docker build untuk deployment
├── next.config.js             # Konfigurasi Next.js
├── tailwind.config.js         # Konfigurasi Tailwind + custom theme
├── tsconfig.json              # Konfigurasi TypeScript
├── postcss.config.js          # PostCSS untuk Tailwind
└── package.json               # Dependencies & scripts
```

## 🧠 Cara Kerja (Algoritma)

Hasil "analisis" role ini sebenernya murni berdasarkan hash dari data gambar yang diupload, bukan AI atau machine learning. Berikut alurnya:

1. **Input** — User masukin nama dan upload foto profil
2. **FileReader** — Gambar dibaca sebagai Base64 string
3. **Splitting** — String Base64 dipecah jadi 9 bagian sama besar
4. **Hashing** — Tiap bagian dihitung hash-nya pake algoritma djb2, lalu di-modulo ke range 0–1000
5. **Offset** — Tiap value ditambah index-nya (`value + i`) biar ada variasi antar kategori
6. **Scoring** — 9 nilai tadi dijadikan score untuk masing-masing role
7. **Sorting** — Chart data di-sort descending untuk tentuin role dominan
8. **Random Pick** — Dari role paling tinggi, dipilih 1 dari 2 meme secara random
9. **Tampil** — Radar chart + meme + quote ditampilkan ke user

Karena hash-nya deterministik, **gambar yang sama akan selalu menghasilkan score yang sama**. Tapi meme-nya random, jadi bisa beda tiap coba.

## 🎭 9 Kategori Role

| Role | Keterangan |
|------|------------|
| **Sepuh** | Dewa leluhur. Jago gambar, ngedit, fps, ritim — semuanya. |
| **Caboel** | Komen caboel mulu ke gambar 2D. Gak bisa nahan hawa nafsu sama karakter kartun. |
| **Kroco** | Nobodi. Gak dikenal siapa-siapa. "Siapa yh?" |
| **Jomok** | Suka kirim stiker orang hitam. Mau femboy/yuri orang hitam = tetap jomok. |
| **Pedo** | ...bang sadar bang. |
| **Rasis** | "Saiba momoi." Suka ngomong n-word. |
| **Chef** | Penggoreng handal. Setiap ada drama langsung gass goreng, gak peduli faktanya. |
| **Klemer** | Waifunya musiman. Apa-apa di-klem. |
| **Artis** | Sejam posting langsung satu juta riek. Ikon. |

## 🚀 Setup Lokal

### Prasyarat

- Node.js 18+ (direkomendasikan 20)
- npm 9+

### Langkah-Langkah

```bash
# 1. Clone repo
git clone https://github.com/onxlmao/your-role.git
cd your-role

# 2. Install dependencies
npm install

# 3. Jalankan development server
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

### Build Production

```bash
# Build
npm run build

# Jalankan production server
npx next start -p 3000
```

## 🐳 Deployment ke Hugging Face Spaces

### Opsi 1: Docker Space

1. Buat **Docker Space** baru di [huggingface.co/new-space](https://huggingface.co/new-space)
2. Pilih **Docker** sebagai SDK
3. Set **Visibility** ke Public
4. Di tab **Settings**, tambahkan repo GitHub ini sebagai **Git Repository**
5. HF Spaces otomatis akan build dan deploy

### Opsi 2: Manual Deploy

```bash
# Build Docker image
docker build -t your-role .

# Jalankan container
docker run -p 7860:7860 your-role
```

Buka [http://localhost:7860](http://localhost:7860).

### Konfigurasi Port

Aplikasi ini defaultnya jalan di **port 7860** — ini port standar yang dipake Hugging Face Spaces. Kalau deploy di platform lain, sesuaikan port-nya via environment variable `PORT` atau langsung ubah di command.

## 🐛 Bug Fix History

Proyek ini awalnya di-build pake Vite dan punya beberapa bug yang sudah diperbaiki sebelum di-migrasi ke Next.js:

1. **Sort Mutation** — `[...chartData].sort()` mengubah state React langsung. Diperbaiki dengan membuat shallow copy sebelum sort.
2. **Text/Image Mismatch** — `getRandomElementFromArray()` dipanggil 2x terpisah untuk text dan image, jadi text dan image bisa nggak cocok. Diperbaiki dengan pick satu elemen dulu, baru ambil text dan image-nya.
3. **Memory Leak** — `URL.createObjectURL()` dipanggil berkali-kali tanpa `revokeObjectURL()`. Diperbaiki dengan cleanup di `useEffect`, upload handler, dan reset function.
4. **ChartConfig Key** — Key `desktop` di chartConfig nggak match sama `<Radar name="score">`. Diperbaiki ke `score`.
5. **File Upload Crash** — `event.target.files[0]` bisa undefined kalau user cancel dialog. Diperbaiki dengan null check dan early return.
6. **Preinstall Script** — Ada obfuscated `preinstall.js` yang jalanin eval code pakai `require()` di ESM context. Dihapus total.

## ⚠️ Disclaimer

> **Jangan pernah memasukkan data sensitif ke web mencurigakan kayak web ini.**

Ini proyek iseng. Seluruh "analisis" berjalan di browser kamu — gambar nggak pernah dikirim ke server manapun. Tapi tetap, hati-hati sama data pribadi.

## 📝 License

MIT — Silakan fork, modify, dan deploy sendiri.

## 🙏 Credits

- [Next.js](https://nextjs.org/) — Framework
- [Recharts](https://recharts.org/) — Radar chart
- [Tailwind CSS](https://tailwindcss.com/) — Styling
- [Lucide](https://lucide.dev/) — Icons
- Meme-meme dari komunitas Facebook Indonesia
