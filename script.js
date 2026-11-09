const programs = [
  { title: "Bimbel Offline dan Online", description: "Kelas untuk siswa SD, SMP, dan SMA dengan metode belajar yang menyenangkan.", icon: "▣", color: "#177853", tint: "#eaf4e5" },
  { title: "Privat 1 Guru 1 Siswa", description: "Privat khusus untuk membantu meningkatkan prestasi siswa di sekolah.", icon: "♙", color: "#a66b2b", tint: "#f8f0df" },
  { title: "Tes Kemampuan Akademik", description: "Raih kesempatan masuk sekolah atau PTN impian melalui jalur prestasi.", icon: "◎", color: "#6b6aa2", tint: "#efedf8" },
  { title: "Bimbel Persiapan UTBK", description: "Persiapkan diri menghadapi tes UTBK dan raih kampus impianmu.", icon: "✦", color: "#3d79a2", tint: "#e8f2f7" },
  { title: "Lolos Kedokteran", description: "Strategi dan latihan soal untuk masuk Fakultas Kedokteran impianmu.", icon: "＋", color: "#bd6b60", tint: "#f8ece8" },
  { title: "Lolos Sekolah Kedinasan", description: "Persiapan lengkap untuk ujian masuk STAN, IPDN, dan sekolah kedinasan lainnya.", icon: "⌂", color: "#35765c", tint: "#eaf3e9" },
  { title: "CPNS", description: "Latihan soal dan materi lengkap untuk lulus seleksi CPNS.", icon: "▤", color: "#5376a0", tint: "#eaf0f7" },
  { title: "Lolos AKPOL", description: "Bimbingan tes akademik, psikotes, dan fisik untuk masuk AKPOL.", icon: "✧", color: "#a26e41", tint: "#f7f0e5" },
  { title: "Lolos AKMIL", description: "Persiapan khusus untuk tes seleksi masuk AKMIL.", icon: "⬡", color: "#3c7b64", tint: "#eaf3ec" },
  { title: "Lolos TNI-POLRI", description: "Persiapan khusus untuk tes seleksi Bintara dan Tamtama TNI-POLRI.", icon: "⬟", color: "#867346", tint: "#f4f1e4" },
  { title: "Psikotes", description: "Pelajari psikotes secara intensif untuk persiapan berbagai kebutuhan.", icon: "◉", color: "#7c6ba2", tint: "#f0edf8" },
  { title: "Frontend Web Developer", description: "Private, offline & online class. Tersedia kelas Beginner dan Pro.", icon: "⌘", color: "#347b91", tint: "#e7f2f4" },
  { title: "Backend Web Developer", description: "Private, offline & online class. Tersedia kelas Beginner dan Pro.", icon: "⌁", color: "#53749c", tint: "#eaf0f7" },
  { title: "Fullstack Web Developer", description: "Private, offline & online class. Tersedia kelas Beginner dan Pro.", icon: "⌘", color: "#667c48", tint: "#eef3e4" },
  { title: "Mobile App Developer", description: "Private, offline & online class untuk belajar membuat aplikasi mobile.", icon: "▯", color: "#7c67a0", tint: "#f0edf7" },
  { title: "Microsoft Office", description: "Kelas Word, Excel & PowerPoint dari tingkat Basic hingga Advanced.", icon: "▦", color: "#47789a", tint: "#eaf2f6" },
  { title: "Tryout", description: "Simulasi UTBK, CPNS, Kedinasan, dan berbagai jenis tes lainnya.", icon: "✓", color: "#558153", tint: "#edf4e6" },
];

const programGrid = document.querySelector("#program-grid");

if (programGrid) {
  programGrid.innerHTML = programs.map((program) => `
    <a class="program-card" id="program-${program.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}" href="#konsultasi" style="--icon-color:${program.color};--icon-bg:${program.tint}">
      <span class="program-icon" aria-hidden="true">${program.icon}</span>
      <span class="card-arrow" aria-hidden="true">↗</span>
      <h3>${program.title}</h3>
      <p>${program.description}</p>
    </a>
  `).join("");
}

const menuToggle = document.querySelector(".menu-toggle");
const navigationMenu = document.querySelector(".navigation-menu");
const programToggle = document.querySelector(".program-toggle");
const programMenu = document.querySelector(".nav-dropdown");
const navigationLinks = document.querySelectorAll(".nav-links > .nav-link, .nav-program-wrap > .nav-link");

if (menuToggle && navigationMenu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    navigationMenu.classList.toggle("is-open", !isOpen);
  });

  navigationMenu.addEventListener("click", (event) => {
    if (event.target instanceof Element && event.target.closest("a")) {
      menuToggle.setAttribute("aria-expanded", "false");
      navigationMenu.classList.remove("is-open");
      if (programToggle && programMenu) {
        programToggle.setAttribute("aria-expanded", "false");
        programMenu.classList.remove("is-open");
      }
    }
  });
}

if (programToggle && programMenu) {
  programToggle.addEventListener("click", () => {
    const isOpen = programToggle.getAttribute("aria-expanded") === "true";
    programToggle.setAttribute("aria-expanded", String(!isOpen));
    programMenu.classList.toggle("is-open", !isOpen);
  });

  document.addEventListener("click", (event) => {
    if (event.target instanceof Node && !programMenu.parentElement.contains(event.target)) {
      programToggle.setAttribute("aria-expanded", "false");
      programMenu.classList.remove("is-open");
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      programToggle.setAttribute("aria-expanded", "false");
      programMenu.classList.remove("is-open");
      programToggle.focus();
    }
  });
}

const navigationSections = ["beranda", "program", "tentang", "kelas", "kontak"]
  .map((id) => document.getElementById(id))
  .filter((section) => section instanceof HTMLElement);

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    const visibleSections = entries
      .filter((entry) => entry.isIntersecting)
      .sort((first, second) => second.intersectionRatio - first.intersectionRatio);
    if (!visibleSections.length) return;

    const activeSection = visibleSections[0].target.id;
    const activeLink = activeSection === "program" ? "#program" : `#${activeSection}`;
    navigationLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === activeLink);
    });
  }, { rootMargin: "-20% 0px -65% 0px", threshold: [0, 0.1, 0.5] });

  navigationSections.forEach((section) => sectionObserver.observe(section));
}
