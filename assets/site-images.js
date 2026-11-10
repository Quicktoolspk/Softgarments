/**
 * ═══════════════════════════════════════════════════════════════
 *  SOFTGARMENTS — Site Images (sirf yahan se change karein)
 * ═══════════════════════════════════════════════════════════════
 */
window.SG_IMAGES = {
    brand: {
        logo: 'assets/logo.webp'
    },

    hero: {
        folder: 'assets/images/hero/',
        slides: [
            '01.webp',
            '02.webp',
            '03.webp',
            '04.webp',
            '05.webp'
        ],
        alts: [
            'Softgarments — hero look 1',
            'Softgarments — hero look 2',
            'Softgarments — hero look 3',
            'Softgarments — hero look 4',
            'Softgarments — hero look 5'
        ]
    },

    categories: {
        bras:       'assets/images/categories/bras.webp',
        panties:    'assets/images/categories/panties.webp',
        sets:       'assets/images/categories/sets.webp',
        nighties:   'assets/images/categories/nighties.webp',
        bodyshaper: 'assets/images/categories/bodyshaper.webp',
        lingerie:   'assets/images/categories/lingerie.webp'
    },

    products: [
        'assets/images/products/01-everyday-comfort-bra.webp',
        'assets/images/products/02-cotton-panty-pack.webp',
        'assets/images/products/03-bra-panty-set.webp',
        'assets/images/products/04-night-wear.webp'
    ],

    /* ── PROJECTS RING (above reviews) ──
       Folder: assets/images/projects/
       Each item: file, title, category, categoryLabel, alt
    */
    projects: {
        folder: 'assets/images/projects/',
        sliceCount: 72,
        brandText: 'We are Softgarments.',
        items: [
            { file: '01-everyday-comfort-bra.webp', title: 'Everyday Comfort Bra', category: 'bras', categoryLabel: 'Bras', alt: 'Everyday comfort bra' },
            { file: '02-cotton-panty-pack.webp', title: 'Cotton Panty Pack', category: 'panties', categoryLabel: 'Panties', alt: 'Cotton panty pack' },
            { file: '03-bra-panty-set.webp', title: 'Bra & Panty Set', category: 'sets', categoryLabel: 'Bra Sets', alt: 'Matching bra and panty set' },
            { file: '04-night-wear.webp', title: 'Silk Night Wear', category: 'nighties', categoryLabel: 'Nighties', alt: 'Silk night wear' },
            { file: 'bras.webp', title: 'Signature Bra Collection', category: 'bras', categoryLabel: 'Bras', alt: 'Bras collection' },
            { file: 'panties.webp', title: 'Everyday Panties', category: 'panties', categoryLabel: 'Panties', alt: 'Panties collection' },
            { file: 'sets.webp', title: 'Lace Bra Set', category: 'sets', categoryLabel: 'Bra Sets', alt: 'Bra sets collection' },
            { file: 'nighties.webp', title: 'Evening Nightie', category: 'nighties', categoryLabel: 'Nighties', alt: 'Nighties collection' },
            { file: 'bodyshaper.webp', title: 'Seamless Bodyshaper', category: 'bodyshaper', categoryLabel: 'Bodyshaper', alt: 'Bodyshaper collection' },
            { file: 'lingerie.webp', title: 'Delicate Lingerie', category: 'lingerie', categoryLabel: 'Lingerie', alt: 'Lingerie collection' },
            { file: 'hero-01.webp', title: 'Softgarments Look I', category: 'hero', categoryLabel: 'Featured', alt: 'Softgarments look 1' },
            { file: 'hero-02.webp', title: 'Softgarments Look II', category: 'hero', categoryLabel: 'Featured', alt: 'Softgarments look 2' },
            { file: 'hero-03.webp', title: 'Softgarments Look III', category: 'hero', categoryLabel: 'Featured', alt: 'Softgarments look 3' },
            { file: 'hero-04.webp', title: 'Softgarments Look IV', category: 'hero', categoryLabel: 'Featured', alt: 'Softgarments look 4' },
            { file: 'hero-05.webp', title: 'Softgarments Look V', category: 'hero', categoryLabel: 'Featured', alt: 'Softgarments look 5' }
        ],
        categories: [
            { id: 'bras', label: 'Bras', count: 12, angle: -128 },
            { id: 'panties', label: 'Panties', count: 10, angle: -158 },
            { id: 'sets', label: 'Bra Sets', count: 8, angle: 168 },
            { id: 'nighties', label: 'Nighties', count: 6, angle: 118 },
            { id: 'lingerie', label: 'Lingerie', count: 5, angle: 52 },
            { id: 'bodyshaper', label: 'Bodyshaper', count: 4, angle: 22 }
        ]
    },

    getHeroSlides: function() {
        var h = this.hero;
        return h.slides.map(function(file, i) {
            return {
                src: h.folder + file,
                alt: h.alts[i] || ('Softgarments hero ' + (i + 1))
            };
        });
    }
};

window.SG_applyImages = function() {
    var C = window.SG_IMAGES;
    if (!C) return;

    document.querySelectorAll('[data-sg-logo]').forEach(function(el) {
        el.src = C.brand.logo;
    });

    document.querySelectorAll('[data-sg-category]').forEach(function(el) {
        var key = el.getAttribute('data-sg-category');
        if (C.categories[key]) el.src = C.categories[key];
    });

    document.querySelectorAll('[data-sg-product]').forEach(function(el) {
        var i = parseInt(el.getAttribute('data-sg-product'), 10);
        if (!isNaN(i) && C.products[i]) el.src = C.products[i];
    });

    var slides = C.getHeroSlides();
    if (slides.length) {
        var frame = document.getElementById('heroFrame');
        if (frame) {
            var left = frame.querySelector('.hero-card--left');
            var center = frame.querySelector('.hero-card--center');
            var right = frame.querySelector('.hero-card--right');
            var last = slides.length - 1;
            if (left && slides[last]) {
                left.style.backgroundImage = "url('" + slides[last].src + "')";
                left.setAttribute('aria-label', slides[last].alt);
            }
            if (center && slides[0]) {
                center.style.backgroundImage = "url('" + slides[0].src + "')";
                center.setAttribute('aria-label', slides[0].alt);
            }
            if (right && slides[1]) {
                right.style.backgroundImage = "url('" + slides[1].src + "')";
                right.setAttribute('aria-label', slides[1].alt);
            }
        }
    }
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', window.SG_applyImages);
} else {
    window.SG_applyImages();
}
