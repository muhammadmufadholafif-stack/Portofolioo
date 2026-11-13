/**
 * ==========================================================================
 * PORTFOLIO SISWA SMK TKJ - LOGIKA UTAMA (JAVASCRIPT VANILLA)
 * ==========================================================================
 */

document.addEventListener("DOMContentLoaded", function () {
  initTheme();
  renderProfile();
  renderAbout();
  renderSkills();
  renderProjects();
  renderCertificates();
  renderContactAndFooter();
  initNavbar();
  initTypewriter();
  initProjectFilter();
  initModals();
  initScrollAnimations();
  init3DBackground();
  init3DTilt();
});

/* --------------------------------------------------------------------------
   0. HELPER: PENANGANAN GAMBAR RUSAK (IMAGE FALLBACK PLACEHOLDER)
   -------------------------------------------------------------------------- */
function handleImageError(imgElement, labelText) {
  const parent = imgElement.parentElement;
  if (!parent) return;

  const placeholder = document.createElement("div");
  placeholder.className = "img-placeholder";
  placeholder.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
      <circle cx="8.5" cy="8.5" r="1.5"></circle>
      <polyline points="21 15 16 10 5 21"></polyline>
    </svg>
    <span>${labelText || "Foto Belum Tersedia"}</span>
  `;

  parent.replaceChild(placeholder, imgElement);
}

/* --------------------------------------------------------------------------
   1. THEME TOGGLE (DARK / LIGHT MODE - DEFAULT DARK OBSIDIAN)
   -------------------------------------------------------------------------- */
function initTheme() {
  const themeToggleBtn = document.getElementById("theme-toggle");
  let savedTheme = "dark";

  try {
    const stored = localStorage.getItem("portfolio-theme");
    if (stored) {
      savedTheme = stored;
    }
  } catch (err) {
    console.warn("Akses localStorage dibatasi:", err);
  }

  applyTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", function () {
      const currentTheme = document.documentElement.getAttribute("data-theme") || "dark";
      const newTheme = currentTheme === "dark" ? "light" : "dark";
      applyTheme(newTheme);

      try {
        localStorage.setItem("portfolio-theme", newTheme);
      } catch (err) {
        console.warn("Gagal menyimpan ke localStorage:", err);
      }
    });
  }
}

function applyTheme(theme) {
  if (theme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
  }
}

/* --------------------------------------------------------------------------
   2. RENDER HERO & PROFILE
   -------------------------------------------------------------------------- */
function renderProfile() {
  const profile = portfolioData.profile;

  const brandName = document.getElementById("nav-brand-name");
  if (brandName) brandName.textContent = profile.panggilan;

  const statusText = document.getElementById("nav-status-text");
  if (statusText) statusText.textContent = profile.statusBadge || "Available for Projects";

  const badgeText = document.getElementById("hero-tagline-badge-text");
  if (badgeText && profile.taglineBadge) badgeText.textContent = profile.taglineBadge;

  const avatarImg = document.getElementById("hero-avatar");
  if (avatarImg) {
    avatarImg.src = profile.fotoProfil;
    avatarImg.alt = `Foto Profil ${profile.namaLengkap}`;
    avatarImg.addEventListener("error", function () {
      handleImageError(this, profile.panggilan);
    });
  }

  const heroName = document.getElementById("hero-name");
  if (heroName) {
    heroName.innerHTML = `Halo, Saya <span class="text-gradient">${profile.panggilan}</span>`;
  }

  const heroTagline = document.getElementById("hero-tagline");
  if (heroTagline) heroTagline.textContent = profile.tagline;

  const statsContainer = document.getElementById("hero-stats-container");
  if (statsContainer && profile.stats) {
    statsContainer.innerHTML = profile.stats.map(s => `
      <div class="stat-item">
        <span class="stat-label">${s.label}</span>
        <span class="stat-value">${s.value}</span>
      </div>
    `).join("");
  }
}

/* --------------------------------------------------------------------------
   3. TYPEWRITER EFFECT
   -------------------------------------------------------------------------- */
function initTypewriter() {
  const textElement = document.getElementById("typewriter-text");
  if (!textElement) return;

  const words = portfolioData.profile.rolesTypewriter || ["Network Engineer", "Full-Stack Web Developer"];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 95;

  function type() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      textElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 40;
    } else {
      textElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 85;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      typeSpeed = 1900;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typeSpeed = 350;
    }

    setTimeout(type, typeSpeed);
  }

  setTimeout(type, 500);
}

/* --------------------------------------------------------------------------
   4. RENDER TENTANG SAYA
   -------------------------------------------------------------------------- */
function renderAbout() {
  const profile = portfolioData.profile;

  const bioElem = document.getElementById("about-bio");
  if (bioElem) bioElem.textContent = profile.bioSingkat;

  const nameElem = document.getElementById("about-nama-lengkap");
  if (nameElem) nameElem.textContent = profile.namaLengkap;

  const sekolahElem = document.getElementById("about-sekolah");
  if (sekolahElem) sekolahElem.textContent = profile.sekolah;

  const jurusanElem = document.getElementById("about-jurusan");
  if (jurusanElem) jurusanElem.textContent = profile.jurusan;

  const cvBtn = document.getElementById("about-cv-btn");
  if (cvBtn) {
    cvBtn.href = profile.cvPath || "cv.pdf";
  }
}

/* --------------------------------------------------------------------------
   5. RENDER SKILLS
   -------------------------------------------------------------------------- */
function renderSkills() {
  const container = document.getElementById("skills-container");
  if (!container) return;

  container.innerHTML = "";

  portfolioData.skills.forEach(function (cat) {
    const card = document.createElement("div");
    card.className = "skill-category-card reveal-item";

    let itemsHtml = "";
    cat.daftar.forEach(function (item) {
      itemsHtml += `
        <div class="skill-item">
          <div class="skill-item-header">
            <span>${item.nama}</span>
            <span>${item.tingkat}%</span>
          </div>
          <div class="skill-bar-wrapper">
            <div class="skill-bar-fill" data-progress="${item.tingkat}"></div>
          </div>
        </div>
      `;
    });

    card.innerHTML = `
      <h3 class="skill-cat-title">${cat.kategori}</h3>
      <p class="skill-cat-desc">${cat.deskripsi}</p>
      <div class="skill-list">
        ${itemsHtml}
      </div>
    `;

    container.appendChild(card);
  });
}

/* --------------------------------------------------------------------------
   6. RENDER PROJECTS (DENGAN BADGE LIVE PRODUCTION)
   -------------------------------------------------------------------------- */
function renderProjects(filterCategory = "Semua") {
  const container = document.getElementById("projects-container");
  if (!container) return;

  container.innerHTML = "";

  const filtered = portfolioData.projects.filter(function (proj) {
    if (filterCategory === "Semua") return true;
    return proj.kategori.toLowerCase() === filterCategory.toLowerCase();
  });

  if (filtered.length === 0) {
    container.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 40px 0; font-family: var(--font-mono);">Tidak ada proyek di kategori ini.</p>`;
    return;
  }

  filtered.forEach(function (project) {
    const card = document.createElement("article");
    card.className = "project-card reveal-item";
    card.setAttribute("data-id", project.id);

    const isLive = project.linkDemo && project.linkDemo.trim() !== "";

    const badgesHtml = project.techStack
      .map(t => `<span class="tech-badge">${t}</span>`)
      .join("");

    card.innerHTML = `
      <div class="project-img-wrapper">
        <img class="project-img" src="${project.gambar}" alt="Screenshot ${project.judul}">
        ${isLive ? `<span class="project-live-indicator"><span class="pulse-dot"></span> Live</span>` : ""}
      </div>
      <div class="project-body">
        <span class="project-category-badge">${project.kategori}</span>
        <h3 class="project-title">${project.judul}</h3>
        <p class="project-desc">${project.deskripsiSingkat}</p>
        <div class="project-tech-badges">
          ${badgesHtml}
        </div>
        <div class="project-footer">
          <button type="button" class="btn btn-outline btn-sm open-project-btn" data-id="${project.id}">
            Detail Proyek
          </button>
          ${isLive ? `
            <a href="${project.linkDemo}" target="_blank" rel="noopener noreferrer" class="project-link-icon" onclick="event.stopPropagation();">
              <span>Buka Web</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
            </a>
          ` : ""}
        </div>
      </div>
    `;

    const img = card.querySelector(".project-img");
    img.addEventListener("error", function () {
      handleImageError(this, project.judul);
    });

    card.addEventListener("click", function () {
      openProjectModal(project.id);
    });

    container.appendChild(card);
  });
}

function initProjectFilter() {
  const filterButtons = document.querySelectorAll(".filter-btn");

  filterButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filterButtons.forEach(b => b.classList.remove("active"));
      this.classList.add("active");

      const category = this.getAttribute("data-category");
      renderProjects(category);
      initScrollAnimations();
      init3DTilt();
    });
  });
}

/* --------------------------------------------------------------------------
   7. MODAL DETAIL PROYEK
   -------------------------------------------------------------------------- */
function initModals() {
  const modal = document.getElementById("project-modal");
  const closeBtn = document.getElementById("project-modal-close");

  if (!modal) return;

  if (closeBtn) closeBtn.addEventListener("click", closeProjectModal);

  modal.addEventListener("click", function (e) {
    if (e.target === modal) closeProjectModal();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeProjectModal();
    }
  });
}

function openProjectModal(projectId) {
  const modal = document.getElementById("project-modal");
  const project = portfolioData.projects.find(p => p.id === projectId);
  if (!modal || !project) return;

  const imgElem = document.getElementById("modal-img");
  const titleElem = document.getElementById("modal-title");
  const descElem = document.getElementById("modal-desc");
  const tagsElem = document.getElementById("modal-tags");
  const actionsElem = document.getElementById("modal-actions");

  imgElem.src = project.gambar;
  imgElem.alt = `Screenshot ${project.judul}`;
  imgElem.onerror = function () {
    handleImageError(this, project.judul);
  };

  titleElem.textContent = project.judul;
  descElem.textContent = project.deskripsiLengkap || project.deskripsiSingkat;

  tagsElem.innerHTML = project.techStack
    .map(t => `<span class="tech-badge">${t}</span>`)
    .join("");

  let actionButtons = "";
  if (project.linkDemo && project.linkDemo.trim() !== "") {
    actionButtons += `
      <a href="${project.linkDemo}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
        <span>Buka Live Production</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
      </a>
    `;
  }
  if (project.linkGithub && project.linkGithub.trim() !== "") {
    actionButtons += `
      <a href="${project.linkGithub}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm">
        <span>Lihat Source Code</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
      </a>
    `;
  }

  actionsElem.innerHTML = actionButtons;

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeProjectModal() {
  const modal = document.getElementById("project-modal");
  if (!modal) return;
  modal.classList.remove("active");
  document.body.style.overflow = "";
}

/* --------------------------------------------------------------------------
   8. RENDER SERTIFIKAT & PRESTASI
   -------------------------------------------------------------------------- */
function renderCertificates() {
  const certSection = document.getElementById("sertifikat");
  const certNavLink = document.getElementById("nav-link-sertifikat");
  const container = document.getElementById("certificates-container");

  const certs = portfolioData.certificates;

  if (!certs || certs.length === 0) {
    if (certSection) certSection.style.display = "none";
    if (certNavLink) certNavLink.style.display = "none";
    return;
  }

  if (certSection) certSection.style.display = "block";
  if (certNavLink) certNavLink.style.display = "block";
  if (!container) return;

  container.innerHTML = "";

  certs.forEach(function (c) {
    const card = document.createElement("article");
    card.className = "cert-card reveal-item";

    card.innerHTML = `
      <div class="cert-header">
        <span class="cert-year">${c.tahun}</span>
      </div>
      <h3 class="cert-title">${c.judul}</h3>
      <div class="cert-issuer">${c.penerbit}</div>
      <p class="cert-desc">${c.deskripsi || ""}</p>
    `;

    container.appendChild(card);
  });
}

/* --------------------------------------------------------------------------
   9. RENDER KONTAK & FOOTER
   -------------------------------------------------------------------------- */
function renderContactAndFooter() {
  const profile = portfolioData.profile;

  const waBtn = document.getElementById("contact-wa-btn");
  if (waBtn) {
    const cleanWa = (profile.whatsapp || "").replace(/[^0-9]/g, "");
    const waText = encodeURIComponent(`Halo ${profile.panggilan}, saya melihat portofolio Anda dan tertarik berdiskusi proyek.`);
    waBtn.href = `https://api.whatsapp.com/send?phone=${cleanWa}&text=${waText}`;
  }

  const emailBtn = document.getElementById("contact-email-btn");
  if (emailBtn) {
    emailBtn.href = `mailto:${profile.email}?subject=Diskusi%20Project%20Portofolio`;
  }

  const renderSocialIcon = (id, link) => {
    const el = document.getElementById(id);
    if (el) {
      if (link && link.trim() !== "" && !link.includes("[username]")) {
        el.href = link;
        el.style.display = "inline-flex";
      } else {
        el.href = link || "#";
      }
    }
  };

  renderSocialIcon("social-github", profile.sosialMedia.github);
  renderSocialIcon("social-linkedin", profile.sosialMedia.linkedin);
  renderSocialIcon("social-instagram", profile.sosialMedia.instagram);

  const footerCopy = document.getElementById("footer-copyright");
  if (footerCopy) {
    const currentYear = new Date().getFullYear();
    footerCopy.textContent = `© ${currentYear} ${profile.namaLengkap} (${profile.panggilan}). All rights reserved.`;
  }
}

/* --------------------------------------------------------------------------
   10. NAVBAR: HAMBURGER & SCROLLSPY
   -------------------------------------------------------------------------- */
function initNavbar() {
  const hamburgerBtn = document.getElementById("hamburger-btn");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener("click", function () {
      hamburgerBtn.classList.toggle("active");
      navMenu.classList.toggle("active");
    });
  }

  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      if (hamburgerBtn && navMenu) {
        hamburgerBtn.classList.remove("active");
        navMenu.classList.remove("active");
      }
    });
  });

  const sections = document.querySelectorAll("section[id]");

  function onScroll() {
    const scrollPos = window.pageYOffset || document.documentElement.scrollTop;

    sections.forEach(function (section) {
      if (section.style.display === "none") return;

      const top = section.offsetTop - 100;
      const height = section.offsetHeight;
      const id = section.getAttribute("id");

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(function (link) {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", onScroll);
  onScroll();

  /* -- Bottom App Bar Scrollspy -- */
  const bottomTabLinks = document.querySelectorAll(".bottom-tab-link");

  function onScrollBottomBar() {
    if (bottomTabLinks.length === 0) return;
    const scrollPos = window.pageYOffset || document.documentElement.scrollTop;

    let currentId = "";
    sections.forEach(function (section) {
      if (section.style.display === "none") return;
      const top = section.offsetTop - 120;
      if (scrollPos >= top) {
        currentId = section.getAttribute("id");
      }
    });

    bottomTabLinks.forEach(function (link) {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + currentId) {
        link.classList.add("active");
      }
    });
  }

  bottomTabLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      bottomTabLinks.forEach(function (l) { l.classList.remove("active"); });
      link.classList.add("active");
    });
  });

  window.addEventListener("scroll", onScrollBottomBar);
  onScrollBottomBar();
}

/* --------------------------------------------------------------------------
   11. ANIMASI SCROLL INTERSECTION OBSERVER
   -------------------------------------------------------------------------- */
function initScrollAnimations() {
  if (!("IntersectionObserver" in window)) {
    document.querySelectorAll(".reveal-item").forEach(el => el.classList.add("revealed"));
    document.querySelectorAll(".skill-bar-fill").forEach(bar => {
      bar.style.width = bar.getAttribute("data-progress") + "%";
    });
    return;
  }

  const observer = new IntersectionObserver(function (entries, obs) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");

        const skillBars = entry.target.querySelectorAll(".skill-bar-fill");
        skillBars.forEach(function (bar) {
          const progress = bar.getAttribute("data-progress") || "0";
          bar.style.width = progress + "%";
        });

        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });

  document.querySelectorAll(".reveal-item").forEach(function (el) {
    observer.observe(el);
  });
}


/* --------------------------------------------------------------------------
   12. ANIMASI 3D INTERAKTIF: CYBER NETWORK & DATA PACKETS CANVAS
   (100% Vanilla JS, 3D Perspective Projection, 60 FPS, Hemat Baterai)
   -------------------------------------------------------------------------- */
function init3DBackground() {
  const canvas = document.getElementById("bg-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  let width = 0;
  let height = 0;
  let cx = 0;
  let cy = 0;
  let dpr = 1;

  // Cek preferensi aksesibilitas
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Konfigurasi Partikel 3D
  const isMobile = window.innerWidth < 768;
  const NODE_COUNT = isMobile ? 36 : 64;
  const MAX_CONNECT_DIST = isMobile ? 140 : 190;
  const FOV = 400; // Field of view untuk proyeksi perspektif 3D
  const SPHERE_RADIUS = isMobile ? 260 : 420;

  // Rotasi kamera & Damping
  let rotX = 0.2;
  let rotY = 0.3;
  let targetRotX = 0.2;
  let targetRotY = 0.3;
  const autoRotSpeedX = prefersReducedMotion ? 0 : 0.0006;
  const autoRotSpeedY = prefersReducedMotion ? 0 : 0.0016;

  // Array simpul jaringan 3D
  const nodes = [];

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
    cx = width / 2;
    cy = height / 2;
  }

  window.addEventListener("resize", resize);
  resize();

  // Inisialisasi node-node partikel dalam bola 3D
  for (let i = 0; i < NODE_COUNT; i++) {
    // Distribusi bola Fibonacci / spherical uniform
    const u = Math.random();
    const v = Math.random();
    const theta = u * 2.0 * Math.PI;
    const phi = Math.acos(2.0 * v - 1.0);
    const r = Math.cbrt(Math.random()) * SPHERE_RADIUS;

    const x = r * Math.sin(phi) * Math.cos(theta);
    const y = r * Math.sin(phi) * Math.sin(theta);
    const z = r * Math.cos(phi);

    // Kecepatan melayang halus
    const vx = (Math.random() - 0.5) * 0.35;
    const vy = (Math.random() - 0.5) * 0.35;
    const vz = (Math.random() - 0.5) * 0.35;

    // Warna: cyan, indigo, atau emerald
    const colorType = Math.random();
    let baseColor = "6, 182, 212"; // Cyan
    if (colorType < 0.35) {
      baseColor = "99, 102, 241"; // Indigo
    } else if (colorType > 0.85) {
      baseColor = "16, 185, 129"; // Emerald
    }

    nodes.push({
      x, y, z,
      vx, vy, vz,
      baseR: 1.6 + Math.random() * 2.2,
      color: baseColor,
      // Projected coordinates (akan diisi di loop render)
      px: 0, py: 0, pz: 0, scale: 0, alpha: 0
    });
  }

  // Paket data simulasi yang meluncur di kabel jaringan
  const packets = [];
  const PACKET_COUNT = isMobile ? 3 : 7;
  for (let i = 0; i < PACKET_COUNT; i++) {
    packets.push({
      fromIndex: Math.floor(Math.random() * NODE_COUNT),
      toIndex: Math.floor(Math.random() * NODE_COUNT),
      progress: Math.random(),
      speed: 0.006 + Math.random() * 0.009
    });
  }

  // Interaksi Mouse / Touch
  function onPointerMove(e) {
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const normX = (clientX / width) * 2 - 1;
    const normY = (clientY / height) * 2 - 1;

    targetRotY = normX * 0.55;
    targetRotX = -normY * 0.45;
  }

  window.addEventListener("mousemove", onPointerMove, { passive: true });
  window.addEventListener("touchmove", onPointerMove, { passive: true });

  // Siklus hidup tab: pause saat tab tidak aktif untuk menghemat daya
  let isRunning = true;
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      isRunning = false;
    } else {
      isRunning = true;
      lastTime = performance.now();
      requestAnimationFrame(renderLoop);
    }
  });

  let lastTime = performance.now();

  function renderLoop(time) {
    if (!isRunning) return;

    // Smooth camera rotation damping
    rotX += (targetRotX - rotX) * 0.05 + autoRotSpeedX;
    rotY += (targetRotY - rotY) * 0.05 + autoRotSpeedY;

    ctx.clearRect(0, 0, width, height);

    const cosX = Math.cos(rotX);
    const sinX = Math.sin(rotX);
    const cosY = Math.cos(rotY);
    const sinY = Math.sin(rotY);

    // 1. Update posisi fisik partikel & Transformasi 3D
    for (let i = 0; i < NODE_COUNT; i++) {
      const n = nodes[i];

      // Partikel melayang perlahan
      n.x += n.vx;
      n.y += n.vy;
      n.z += n.vz;

      // Pantulan jika melewati batas ruang bola
      const distSq = n.x * n.x + n.y * n.y + n.z * n.z;
      if (distSq > SPHERE_RADIUS * SPHERE_RADIUS) {
        n.vx *= -1;
        n.vy *= -1;
        n.vz *= -1;
      }

      // Rotasi 3D: Pertama sumbu Y, lalu sumbu X
      const x1 = n.x * cosY - n.z * sinY;
      const z1 = n.z * cosY + n.x * sinY;

      const y2 = n.y * cosX - z1 * sinX;
      const z2 = z1 * cosX + n.y * sinX;

      // Proyeksi Perspektif 3D
      // Jarak Z digeser agar selalu berada di depan kamera (Z > 0)
      const depth = z2 + SPHERE_RADIUS + 100;
      const scale = depth > 0 ? FOV / (FOV + depth) : 0;

      n.px = x1 * scale + cx;
      n.py = y2 * scale + cy;
      n.pz = z2;
      n.scale = Math.max(0.1, scale);
      n.alpha = Math.min(1, Math.max(0.1, scale * 1.5));
    }

    // 2. Gambar Garis Koneksi Antar Node (Topology Mesh)
    const isDark = document.documentElement.classList.contains("dark");
    const lineBaseAlpha = isDark ? 0.32 : 0.2;

    for (let i = 0; i < NODE_COUNT; i++) {
      const a = nodes[i];
      for (let j = i + 1; j < NODE_COUNT; j++) {
        const b = nodes[j];

        // Hitung jarak 3D Euclidean
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dz = a.z - b.z;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < MAX_CONNECT_DIST) {
          const proximityAlpha = (1 - dist / MAX_CONNECT_DIST) * lineBaseAlpha * ((a.alpha + b.alpha) / 2);

          ctx.beginPath();
          ctx.moveTo(a.px, a.py);
          ctx.lineTo(b.px, b.py);
          ctx.strokeStyle = `rgba(${a.color}, ${proximityAlpha})`;
          ctx.lineWidth = Math.max(0.6, (a.scale + b.scale) * 1.2);
          ctx.stroke();
        }
      }
    }

    // 3. Gambar Paket Data yang Meluncur (Network Traffic Simulation)
    for (let p = 0; p < packets.length; p++) {
      const pkt = packets[p];
      pkt.progress += pkt.speed;

      if (pkt.progress >= 1) {
        pkt.progress = 0;
        pkt.fromIndex = pkt.toIndex;
        // Cari tetangga terdekat
        let bestTarget = Math.floor(Math.random() * NODE_COUNT);
        let bestDist = Infinity;
        const fromNode = nodes[pkt.fromIndex];

        for (let k = 0; k < 6; k++) {
          const candidate = Math.floor(Math.random() * NODE_COUNT);
          if (candidate !== pkt.fromIndex) {
            const dx = fromNode.x - nodes[candidate].x;
            const dy = fromNode.y - nodes[candidate].y;
            const dz = fromNode.z - nodes[candidate].z;
            const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
            if (d < bestDist && d < MAX_CONNECT_DIST) {
              bestDist = d;
              bestTarget = candidate;
            }
          }
        }
        pkt.toIndex = bestTarget;
      }

      const nodeA = nodes[pkt.fromIndex];
      const nodeB = nodes[pkt.toIndex];

      const pktX = nodeA.px + (nodeB.px - nodeA.px) * pkt.progress;
      const pktY = nodeA.py + (nodeB.py - nodeA.py) * pkt.progress;
      const pktAlpha = (nodeA.alpha + nodeB.alpha) * 0.5;

      ctx.beginPath();
      ctx.arc(pktX, pktY, Math.max(1.8, 3.2 * nodeA.scale), 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${pktAlpha * 0.95})`;
      ctx.shadowColor = `rgba(${nodeA.color}, 0.8)`;
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0; // Reset shadow untuk efisiensi render
    }

    // 4. Urutkan simpul berdasarkan kedalaman Z (Painter's Algorithm)
    nodes.sort((a, b) => a.pz - b.pz);

    // 5. Gambar Titik Simpul (Glowing Nodes)
    for (let i = 0; i < NODE_COUNT; i++) {
      const n = nodes[i];
      const radius = Math.max(1.2, n.baseR * n.scale * 2.2);

      // Core point
      ctx.beginPath();
      ctx.arc(n.px, n.py, radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${n.color}, ${n.alpha * 0.85})`;
      ctx.fill();

      // Outer glow jika titik berada dekat kamera
      if (n.scale > 0.6) {
        ctx.beginPath();
        ctx.arc(n.px, n.py, radius * 2.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${n.color}, ${n.alpha * 0.18})`;
        ctx.fill();
      }
    }

    requestAnimationFrame(renderLoop);
  }

  requestAnimationFrame(renderLoop);
}

/* --------------------------------------------------------------------------
   13. INTERAKTIF 3D CARD TILT & SPECULAR SHEEN
   (Vanilla CSS 3D Perspective, Smooth Spring Easing)
   -------------------------------------------------------------------------- */
function init3DTilt() {
  const cards = document.querySelectorAll(
    ".cyber-terminal-card, .project-card, .about-card, .contact-card, .hero-stat-item"
  );

  cards.forEach(function (card) {
    // Tambahkan lapisan kilau jika belum ada
    if (!card.querySelector(".card-sheen")) {
      const sheen = document.createElement("div");
      sheen.className = "card-sheen";
      card.appendChild(sheen);
      card.classList.add("has-sheen");
    }

    const sheen = card.querySelector(".card-sheen");

    function handleMove(e) {
      const rect = card.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;

      const x = clientX - rect.left;
      const y = clientY - rect.top;

      // Normalisasi -1 ke +1
      const normX = (x / rect.width) * 2 - 1;
      const normY = (y / rect.height) * 2 - 1;

      // Sudut miring maksimal 10 derajat
      const maxTilt = 10;
      const tiltX = -normY * maxTilt;
      const tiltY = normX * maxTilt;

      card.style.transform = `perspective(900px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) translateZ(8px)`;

      if (sheen) {
        sheen.style.opacity = "1";
        sheen.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 0.22), transparent 60%)`;
      }
    }

    function handleLeave() {
      card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0)";
      if (sheen) {
        sheen.style.opacity = "0";
      }
    }

    card.addEventListener("mousemove", handleMove);
    card.addEventListener("mouseleave", handleLeave);

    // Dukungan interaksi touch untuk HP
    card.addEventListener("touchstart", function (e) {
      handleMove(e);
    }, { passive: true });

    card.addEventListener("touchend", function () {
      setTimeout(handleLeave, 250);
    });
  });
}
