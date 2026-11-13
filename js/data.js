/**
 * DATA PORTFOLIO SISWA SMK TKJ - MUHAMMAD MUFADHOL AFIF (FANSKEY)
 * 
 * Semua data teks, profil, keahlian, proyek live production,
 * sertifikat, dan kontak resmi terpusat di file ini.
 */

const portfolioData = {
  // 1. Profil Pribadi & Hero Section
  profile: {
    namaLengkap: "Muhammad Mufadhol Afif",
    panggilan: "Afif",
    jurusan: "Teknik Komputer dan Jaringan (TKJ)",
    sekolah: "SMK Islam 1 Blitar",
    kelasAngkatan: "XII TKJ, Angkatan 2023",
    statusBadge: "Available for Hire & Projects",
    taglineBadge: "Network Engineer & Full-Stack Web Developer",
    tagline: "Siswa SMK jurusan Teknik Komputer & Jaringan (TKJ) yang aktif membangun aplikasi web skala produksi, integrasi cloud database, serta arsitektur jaringan MikroTik & Linux SysAdmin.",
    bioSingkat: "Halo! Saya Muhammad Mufadhol Afif (akrab dipanggil Afif / Fanskey), siswa aktif SMK Islam 1 Blitar jurusan Teknik Komputer dan Jaringan. Saya berfokus pada arsitektur infrastruktur jaringan (MikroTik RouterOS, Debian 12 Server, VLAN) sekaligus aktif mengembangkan berbagai aplikasi web modern skala produksi dan mobile application.",
    fotoProfil: "images/foto-profil.jpg",
    email: "muhammadmufadholafif@gmail.com",
    whatsapp: "6287739909391",
    sosialMedia: {
      github: "https://github.com/muhammadmufadholafif-stack",
      instagram: "https://instagram.com/fanskeyyy",
      linkedin: "" // Dikosongkan jika belum aktif
    },
    cvPath: "cv.pdf",
    rolesTypewriter: [
      "Muhammad Mufadhol Afif",
      "Network Engineer & SysAdmin",
      "Full-Stack Web Developer",
      "MikroTik & Debian 12 Specialist",
      "Flutter Mobile Developer",
      "Siswa SMK Islam 1 Blitar"
    ],
    stats: [
      { label: "PROJECTS DEPLOYED", value: "7+ Live Production" },
      { label: "ROUTING & NETWORK", value: "MikroTik & VLAN" },
      { label: "LINUX SYSADMIN", value: "Debian 12 Bookworm" },
      { label: "SEKOLAH & JURUSAN", value: "SMK Islam 1 Blitar (TKJ)" }
    ]
  },

  // 2. Data Keahlian (Skills)
  skills: [
    {
      kategori: "Networking & Jaringan Komputer",
      deskripsi: "Konfigurasi perangkat keras routing, manajemen bandwidth, dan segmentasi traffic jaringan.",
      daftar: [
        { nama: "MikroTik RouterOS & Winbox", tingkat: 88 },
        { nama: "VLAN (Virtual LAN) & Trunking", tingkat: 85 },
        { nama: "Dynamic Routing (OSPF)", tingkat: 78 },
        { nama: "Bandwidth Management (Queue Simple & Tree)", tingkat: 82 },
        { nama: "Hotspot Captive Portal & Web Proxy", tingkat: 80 }
      ]
    },
    {
      kategori: "Server & Linux SysAdmin",
      deskripsi: "Instalasi, konfigurasi service jaringan, dan manajemen server open-source berbasis Linux.",
      daftar: [
        { nama: "Debian 12 Server Administration", tingkat: 85 },
        { nama: "Database Server (MariaDB / MySQL)", tingkat: 82 },
        { nama: "Mail Server (Postfix & Dovecot)", tingkat: 75 },
        { nama: "Virtualization & Proxmox / VirtualBox", tingkat: 80 }
      ]
    },
    {
      kategori: "Web Development & Frontend",
      deskripsi: "Pengembangan antarmuka website modern, integrasi API, dan deployment ke cloud platform.",
      daftar: [
        { nama: "HTML5 Semantik & CSS3 Modern", tingkat: 92 },
        { nama: "JavaScript Vanilla & DOM API", tingkat: 88 },
        { nama: "Next.js & React Framework", tingkat: 78 },
        { nama: "Vercel Deployment & CI/CD", tingkat: 85 }
      ]
    },
    {
      kategori: "Mobile & Backend Services",
      deskripsi: "Pengembangan aplikasi seluler dan integrasi endpoint Google Apps Script / REST API.",
      daftar: [
        { nama: "Flutter & Dart (FansTrack)", tingkat: 80 },
        { nama: "Google Apps Script (GAS / API)", tingkat: 85 },
        { nama: "MIT App Inventor (Block Logic)", tingkat: 88 }
      ]
    }
  ],

  // 3. Data Proyek Nyata
  projects: [
    {
      id: "project-pemilos",
      judul: "Pemilos 2026-2027",
      kategori: "Web",
      deskripsiSingkat: "Platform e-voting digital resmi pemilihan Ketua dan Wakil Ketua OSIS SMK Islam 1 Blitar dengan rekapitulasi suara real-time.",
      deskripsiLengkap: "Sistem pemilihan digital (e-voting) kesiswaan yang dibangun untuk SMK Islam 1 Blitar. Memfasilitasi ratusan siswa dalam melakukan pemungutan suara secara cepat, rahasia, dan bebas kecurangan. Dilengkapi sistem verifikasi token pemilih, proteksi double-vote, serta dasbor rekapitulasi perolehan suara langsung secara real-time.",
      techStack: ["Next.js / Vanilla JS", "Cloud Database", "GAS API", "Vercel"],
      gambar: "images/project/pemilos.jpg",
      linkDemo: "https://pemilos-2026-2027.vercel.app/",
      linkGithub: "https://github.com/muhammadmufadholafif-stack"
    },
    {
      id: "project-osaki",
      judul: "OSAKI 25/26 - Portal OSIS",
      kategori: "Web",
      deskripsiSingkat: "Website resmi organisasi kesiswaan OSAKI SMK Islam 1 Blitar periode 2025/2026 dengan publikasi program kerja dan warta kegiatan.",
      deskripsiLengkap: "Portal web interaktif resmi organisasi kesiswaan (OSAKI) SMK Islam 1 Blitar periode masa bakti 2025/2026. Berfungsi sebagai etalase publikasi program kerja pengurus, profil masing-masing seksi bidang kesiswaan, berita kegiatan sekolah, dan dokumentasi agenda tahunan kesiswaan.",
      techStack: ["HTML5", "CSS3 Modern", "JavaScript", "Vercel Deploy"],
      gambar: "images/project/osaki.jpg",
      linkDemo: "https://osaki2526.vercel.app/",
      linkGithub: ""
    },
    {
      id: "project-pendaftaran-osis",
      judul: "Portal Pendaftaran OSIS Online",
      kategori: "Web",
      deskripsiSingkat: "Sistem registrasi digital calon pengurus OSIS online dengan verifikasi berkas dan dasbor seleksi admin.",
      deskripsiLengkap: "Platform formulir pendaftaran daring untuk seleksi calon anggota pengurus OSIS SMK Islam 1 Blitar. Menggantikan proses registrasi konvensional dengan pengisian biodata digital terstruktur, upload kelengkapan berkas kesiswaan, serta pengumuman hasil seleksi online.",
      techStack: ["HTML5", "CSS3 Modern", "JavaScript", "Vercel"],
      gambar: "images/project/pendaftaran-osis.jpg",
      linkDemo: "https://pendaftaran-osis.vercel.app/",
      linkGithub: ""
    },
    {
      id: "project-fansstore",
      judul: "FansStore E-Commerce",
      kategori: "Web",
      deskripsiSingkat: "Platform toko online modern dengan antarmuka responsif, katalog produk terstruktur, dan simulasi keranjang belanja.",
      deskripsiLengkap: "Website e-commerce toko online yang dibangun untuk transaksi produk modern. Memiliki fitur katalog produk dengan filter kategori dinamis, pencarian cepat, interaksi keranjang belanja (cart) responsif, dan checkout simulasi yang ramah pengguna.",
      techStack: ["Next.js", "React", "CSS Modules", "Vercel"],
      gambar: "images/project/fansstore.jpg",
      linkDemo: "https://fansstore.vercel.app/",
      linkGithub: ""
    },
    {
      id: "project-weather",
      judul: "Weather Fanskey - SkyScope Pro",
      kategori: "Web",
      deskripsiSingkat: "Aplikasi prakiraan cuaca real-time Indonesia dengan desain Glassmorphism modern untuk LKS Ma'arif.",
      deskripsiLengkap: "Aplikasi pemantau cuaca real-time di seluruh kota di Indonesia yang dirancang untuk ajang LKS Ma'arif 2026 di SMK Islam 1 Blitar. Mengintegrasikan API cuaca live, indikator kelembapan udara, kecepatan angin, suhu, serta antarmuka cyber glassmorphism yang bersih dan responsif.",
      techStack: ["Vanilla JS", "Weather API", "Glassmorphism", "Vercel"],
      gambar: "images/project/weather.jpg",
      linkDemo: "https://weather-fanskey.vercel.app/",
      linkGithub: ""
    },
    {
      id: "project-skripsi",
      judul: "Sistem Informasi Unisba",
      kategori: "Web",
      deskripsiSingkat: "Sistem informasi berbasis web yang dideploy di cloud Vercel untuk manajemen data dan keperluan akademik.",
      deskripsiLengkap: "Aplikasi web fungsional yang dirancang untuk kebutuhan akademik kampus Unisba. Menyajikan struktur informasi yang rapi, navigasi responsif di berbagai ukuran layar, serta performa akses data yang cepat melalui hosting cloud modern.",
      techStack: ["Web Application", "JavaScript", "Responsive UI", "Vercel"],
      gambar: "images/project/skripsi-unisba.jpg",
      linkDemo: "https://skripsi-unisba.vercel.app/",
      linkGithub: ""
    },
    {
      id: "project-fanstrack",
      judul: "FansTrack Mobile Application",
      kategori: "Mobile",
      deskripsiSingkat: "Aplikasi seluler pelacakan dan manajemen aktivitas/tugas dengan antarmuka modern berbasis Flutter.",
      deskripsiLengkap: "Aplikasi Android native/cross-platform yang dikembangkan menggunakan Flutter dan bahasa pemrograman Dart. Didesain untuk manajemen tracking aktivitas harian, pencatatan to-do list, dan pemantauan progres dengan antarmuka yang intuitif dan cepat.",
      techStack: ["Flutter", "Dart", "Android", "GitHub Open Source"],
      gambar: "images/project/fanstrack.jpg",
      linkDemo: "",
      linkGithub: "https://github.com/muhammadmufadholafif-stack/FansTrack"
    },
    {
      id: "project-ospf",
      judul: "Simulasi OSPF & VLAN Multi-Switch",
      kategori: "Networking",
      deskripsiSingkat: "Simulasi topologi jaringan kampus terpadu dengan dynamic routing OSPF dan segmentasi VLAN antar gedung.",
      deskripsiLengkap: "Perancangan dan pengujian infrastruktur jaringan berbasis MikroTik RouterOS yang menghubungkan beberapa segmen gedung sekolah. Menggunakan VLAN Trunking untuk mengisolasi lalu lintas data antar jurusan, serta protokol routing dinamis OSPF untuk jalur komunikasi cadangan otomatis (failover).",
      techStack: ["MikroTik RouterOS", "VLAN 802.1Q", "OSPF Routing", "Cisco Packet Tracer"],
      gambar: "images/project/topologi-jaringan.svg",
      linkDemo: "",
      linkGithub: "https://github.com/muhammadmufadholafif-stack"
    }
  ],

  // 4. Data Sertifikat & Prestasi
  certificates: [
    {
      judul: "MikroTik Certified Network Associate (MTCNA) Training",
      penerbit: "MikroTik Training Partner",
      tahun: "2024",
      deskripsi: "Pelatihan konfigurasi dasar router MikroTik, firewall, NAT, DHCP server, wireless dasar, dan routing statis."
    },
    {
      judul: "Juara 2 Lomba Kompetensi Siswa (LKS) IT Network System Administration",
      penerbit: "Tingkat Wilayah / Sekolah",
      tahun: "2024",
      deskripsi: "Kompetisi konfigurasi jaringan Linux Server, routing MikroTik, subnetting, dan keamanan sistem informasi."
    },
    {
      judul: "Sertifikat Pelatihan Pemrograman Web Modern",
      penerbit: "Dicoding Indonesia / Ma'arif IT",
      tahun: "2023",
      deskripsi: "Fundamental perancangan arsitektur antarmuka web dengan HTML5 semantik, CSS3 modern, dan manipulasi DOM JavaScript."
    }
  ]
};
