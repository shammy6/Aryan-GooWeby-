document.addEventListener('DOMContentLoaded', () => {
    // hamburger toggles mobile menu
    document.querySelectorAll('#hamburger').forEach(btn => {
        btn.addEventListener('click', () => {
            const menu = document.getElementById('mobileMenu');
            if (!menu) return;
            menu.classList.toggle('hidden');
        });
    });

    // Combined fade-in observer: add both 'visible' (site) and 'show' (about2) classes
    const obs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('visible', 'show');
                obs.unobserve(e.target);
            }
        });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    document.querySelectorAll('.fade-in').forEach(el => obs.observe(el));

    // close mobile menu when clicking mobile links
    document.querySelectorAll('#mobileMenu a').forEach(a => {
        a.addEventListener('click', () => {
            const menu = document.getElementById('mobileMenu');
            if (!menu) return;
            menu.classList.add('hidden');
        });
    });

    // Projects JSON loader (if projectsGrid exists)
    const projectsGrid = document.getElementById('projectsGrid');
    if (projectsGrid) {
        fetch('projects.json')
            .then(r => r.json())
            .then(data => {
                data.forEach(p => {
                    const a = document.createElement('a');
                    a.href = p.link || '#';
                    a.target = '_blank';
                    a.rel = 'noreferrer';
                    a.className = 'block project-card';

                    a.innerHTML = `
          <h3 class="text-xl font-semibold mb-1 text-purple-300">${escapeHtml(p.title)}</h3>
          <p class="text-sm text-gray-400 mb-2">${escapeHtml(p.category || '')}</p>
          <p class="text-gray-300">${escapeHtml(p.desc || '')}</p>
        `;

                    projectsGrid.appendChild(a);
                });
            })
            .catch(err => {
                console.error('Failed to load projects.json', err);
                projectsGrid.innerHTML = `<div class="text-gray-400">Failed to load projects (check projects.json)</div>`;
            });
    }

    // small helper to escape strings
    function escapeHtml(s) { return String(s).replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m])); }
});
