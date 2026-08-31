/**
 * Softgarments Blog — Main JavaScript
 * Handles blog post data, rendering, and category filtering
 */

(function() {

    // ─── BLOG DATA ──────────────────────────────────────────────
    const blogPosts = [{
        id: 1,
        title: "Summer Fashion Trends 2026",
        category: "Fashion",
        date: "August 25, 2026",
        image: "https://picsum.photos/seed/summer-trends/600/400",
        description: "Discover the latest summer fashion trends and stylish clothing ideas for 2026.",
        url: "blog/posts/summer-fashion-trends-2026.html"
    }, {
        id: 2,
        title: "How to Choose the Right Fabric",
        category: "Fabric",
        date: "August 20, 2026",
        image: "https://picsum.photos/seed/fabric-choice/600/400",
        description: "Learn about different fabrics and how to choose the right material for comfortable and quality clothing.",
        url: "#"
    }, {
        id: 3,
        title: "What Makes a Quality Garment?",
        category: "Garments",
        date: "August 15, 2026",
        image: "https://picsum.photos/seed/quality-garment/600/400",
        description: "Discover the important factors that make a garment comfortable, durable and high quality.",
        url: "#"
    }, {
        id: 4,
        title: "Top Style Trends for 2026",
        category: "Trends",
        date: "August 10, 2026",
        image: "https://picsum.photos/seed/style-trends/600/400",
        description: "Explore the top style trends that are shaping the fashion industry in 2026.",
        url: "#"
    }, {
        id: 5,
        title: "Everyday Style Guide",
        category: "Style",
        date: "August 5, 2026",
        image: "https://picsum.photos/seed/everyday-style/600/400",
        description: "Simple tips to elevate your everyday style with comfortable and versatile clothing.",
        url: "#"
    }, {
        id: 6,
        title: "Sustainable Fabric Choices",
        category: "Fabric",
        date: "July 30, 2026",
        image: "https://picsum.photos/seed/sustainable-fabric/600/400",
        description: "Learn about eco-friendly fabric options and how to make sustainable fashion choices.",
        url: "#"
    }];

    // ─── DOM REFS ───────────────────────────────────────────────
    var grid = document.getElementById('blogGrid');
    var filterBtns = document.querySelectorAll('.filter-btn');
    var currentFilter = 'all';

    // ─── RENDER CARDS ───────────────────────────────────────────
    function renderPosts(category) {

        var filtered = category === 'all'
            ? blogPosts
            : blogPosts.filter(function(post) {
                return post.category === category;
            });

        if (filtered.length === 0) {
            grid.innerHTML =
                '<div class="no-posts">' +
                '<h2>No articles found</h2>' +
                '<p>There are no posts in this category yet.</p>' +
                '</div>';
            return;
        }

        var html = '';
        for (var i = 0; i < filtered.length; i++) {
            var post = filtered[i];
            html +=
                '<article class="blog-card show" style="animation-delay: ' + (i * 0.08) + 's">' +
                '<img class="blog-card-image" src="' + post.image + '" alt="' + post.title + '" loading="lazy" onerror="this.src=\'https://picsum.photos/seed/fallback-' + post.id + '/600/400\'">' +
                '<div class="blog-card-content">' +
                '<span class="blog-card-category">' + post.category + '</span>' +
                '<h3><a href="' + post.url + '">' + post.title + '</a></h3>' +
                '<p>' + post.description + '</p>' +
                '<div class="blog-card-footer">' +
                '<span class="blog-card-date">' + post.date + '</span>' +
                '<a href="' + post.url + '" class="read-more">Read More</a>' +
                '</div>' +
                '</div>' +
                '</article>';
        }

        grid.innerHTML = html;
    }

    // ─── FILTER HANDLER ──────────────────────────────────────────
    function setFilter(category) {
        currentFilter = category;

        for (var i = 0; i < filterBtns.length; i++) {
            var btn = filterBtns[i];
            if (btn.dataset.filter === category) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        }

        renderPosts(category);
    }

    // ─── EVENT LISTENERS ────────────────────────────────────────
    for (var i = 0; i < filterBtns.length; i++) {
        (function(index) {
            filterBtns[index].addEventListener('click', function() {
                var filter = this.dataset.filter;
                setFilter(filter);
            });
        })(i);
    }

    // ─── INITIAL LOAD ────────────────────────────────────────────
    setFilter('all');

})();