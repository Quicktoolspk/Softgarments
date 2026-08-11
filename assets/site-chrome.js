/* Softgarments — shared header, announcement bar, mobile menu */
(function () {
    var siteHeader = document.getElementById('siteHeader');
    if (siteHeader) {
        function updateHeaderScroll() {
            siteHeader.classList.toggle('is-scrolled', window.scrollY > 20);
        }
        window.addEventListener('scroll', updateHeaderScroll, { passive: true });
        updateHeaderScroll();

        var toggle = document.querySelector('.menu-toggle');
        var mobilePanel = document.getElementById('mobileNav');
        var mobileLinks = document.querySelectorAll('.nav-mobile-links a, .nav-mobile-cta a');

        function setMenuOpen(open) {
            siteHeader.classList.toggle('menu-open', open);
            if (toggle) {
                toggle.setAttribute('aria-expanded', open);
                toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
            }
            if (mobilePanel) mobilePanel.setAttribute('aria-hidden', !open);
            document.body.classList.toggle('nav-locked', open);
        }

        if (toggle) toggle.addEventListener('click', function () {
            setMenuOpen(!siteHeader.classList.contains('menu-open'));
        });
        if (mobilePanel) mobilePanel.addEventListener('click', function (e) {
            if (e.target === mobilePanel) setMenuOpen(false);
        });
        mobileLinks.forEach(function (link) {
            link.addEventListener('click', function () { setMenuOpen(false); });
        });
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && siteHeader.classList.contains('menu-open')) setMenuOpen(false);
        });
        window.addEventListener('resize', function () {
            if (window.innerWidth > 900 && siteHeader.classList.contains('menu-open')) setMenuOpen(false);
        });
    }

    var bar = document.querySelector('.gh-ann');
    if (bar) {
        var msgs = [].slice.call(bar.querySelectorAll('.gh-ann-msg'));
        var i = 0, timer = null;
        function go(n) {
            i = (n + msgs.length) % msgs.length;
            msgs.forEach(function (m, k) { m.classList.toggle('is-on', k === i); });
        }
        function start() { clearInterval(timer); timer = setInterval(function () { go(i + 1); }, 4500); }
        var prev = bar.querySelector('.gh-ann-prev');
        var next = bar.querySelector('.gh-ann-next');
        if (prev) prev.addEventListener('click', function () { go(i - 1); start(); });
        if (next) next.addEventListener('click', function () { go(i + 1); start(); });
        start();
        window.addEventListener('scroll', function () {
            document.body.classList.toggle('ann-hidden', window.scrollY > 40);
        }, { passive: true });
    }
})();
