/**
 * Softgarments — Product detail page
 * URL: product.html  OR  product.html?id=1
 */
(function() {
    function boot() {
        var C = window.SG_COLLECTION;
        if (!C || !C.products || !C.products.length) {
            C = window.SG_DEMO_COLLECTION;
        }
        if (!C || !C.products || !C.products.length) return;

        var params = new URLSearchParams(window.location.search);
        var productId = parseInt(params.get('id'), 10);
        if (!productId || isNaN(productId)) {
            productId = C.products[0].id;
        }

        var product = C.products.find(function(p) { return p.id === productId; });
        if (!product) product = C.products[0];

        var page = document.getElementById('pdPage');
        var notFound = document.getElementById('pdNotFound');
        if (notFound) notFound.hidden = true;
        if (page) page.hidden = false;

        var state = { qty: 1, selections: {} };

        var CATEGORY_DEFAULTS = {
            everyday: {
                description: "Premium everyday innerwear crafted for all-day comfort. Soft, breathable fabric with a flattering fit.",
                modelSize: "Medium — bust 34\"",
                pleaseNote: "Actual colour may vary slightly from photos. Gentle hand wash recommended.",
                deliveryInfo: "Nationwide Cash on Delivery. Delivery in 3–5 working days across Pakistan.",
                optionGroups: [
                    { key: "pack", label: "Pack", options: ["Single", "Pack of 3"], default: "Single" },
                    { key: "size", label: "Size", options: ["S", "M", "L", "XL"], default: "M" }
                ]
            },
            night: {
                description: "Relaxed night and lounge wear in soft, skin-friendly fabric. Perfect for restful sleep and lounging at home.",
                modelSize: "Medium",
                pleaseNote: "Actual colour may vary slightly from photos. Machine wash cold, gentle cycle.",
                deliveryInfo: "Nationwide Cash on Delivery. Delivery in 3–5 working days across Pakistan.",
                optionGroups: [
                    { key: "size", label: "Size", options: ["S", "M", "L", "XL"], default: "M" }
                ]
            },
            shape: {
                description: "Supportive shapewear designed for a smooth, confident silhouette under any outfit.",
                modelSize: "Medium",
                pleaseNote: "Actual colour may vary slightly from photos. Hand wash for best results.",
                deliveryInfo: "Nationwide Cash on Delivery. Delivery in 3–5 working days across Pakistan.",
                optionGroups: [
                    { key: "size", label: "Size", options: ["S", "M", "L", "XL"], default: "M" }
                ]
            },
            lingerie: {
                description: "Elegant lingerie piece with premium finish and comfortable fit.",
                modelSize: "Medium",
                pleaseNote: "Actual colour may vary slightly from photos.",
                deliveryInfo: "Nationwide Cash on Delivery. Delivery in 3–5 working days across Pakistan.",
                optionGroups: [
                    { key: "size", label: "Size", options: ["S", "M", "L", "XL"], default: "M" }
                ]
            }
        };

        function mergeProduct(p) {
            var cat = CATEGORY_DEFAULTS[p.category] || CATEGORY_DEFAULTS.everyday;
            return {
                id: p.id,
                name: p.name,
                price: p.price,
                compareAt: p.compareAt,
                category: p.category,
                image: p.image,
                images: p.images && p.images.length ? p.images : [p.image],
                optionGroups: p.optionGroups || cat.optionGroups,
                description: p.description || cat.description,
                modelSize: p.modelSize || cat.modelSize,
                pleaseNote: p.pleaseNote || cat.pleaseNote,
                deliveryInfo: p.deliveryInfo || cat.deliveryInfo
            };
        }

        var P = mergeProduct(product);
        var idx = C.products.indexOf(product);

        function formatPrice(n) {
            return 'Rs. ' + n.toLocaleString('en-PK');
        }

        function imageSrc(filename) {
            if (!filename) return '';
            if (filename.indexOf('/') > -1) return filename;
            return (C.imageFolder || 'assets/images/collection/') + filename;
        }

        function fallbackSrc() {
            return (C.imageFallbacks && C.imageFallbacks[idx]) ? C.imageFallbacks[idx] : 'assets/images/products/01-everyday-comfort-bra.jpg';
        }

        function initSelections() {
            P.optionGroups.forEach(function(g) {
                state.selections[g.key] = g.default || g.options[0];
            });
        }

        function buildWaMessage(buyNow) {
            var parts = ['Hi Softgarments!'];
            parts.push(buyNow ? 'I\'d like to buy now:' : 'I\'d like to order:');
            parts.push(P.name + ' (' + formatPrice(P.price) + ')');
            P.optionGroups.forEach(function(g) {
                parts.push(g.label + ': ' + state.selections[g.key]);
            });
            parts.push('Qty: ' + state.qty);
            return parts.join('\n');
        }

        function waUrl(buyNow) {
            return 'https://wa.me/' + C.whatsapp + '?text=' + encodeURIComponent(buildWaMessage(buyNow));
        }

        document.title = P.name + ' — Softgarments';
        var metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) metaDesc.content = P.description.slice(0, 155);

        var mainImg = document.getElementById('pdMainImg');
        var thumbsEl = document.getElementById('pdThumbs');
        var fb = fallbackSrc();

        function setMainImage(src) {
            mainImg.src = src;
            mainImg.alt = P.name;
            mainImg.onerror = function() {
                mainImg.onerror = null;
                mainImg.src = fb;
            };
        }

        var galleryImages = P.images.map(imageSrc);
        setMainImage(galleryImages[0]);

        var galleryEl = document.querySelector('.pd-gallery');
        if (galleryImages.length > 1) {
            thumbsEl.hidden = false;
            if (galleryEl) galleryEl.classList.remove('pd-gallery--single');
            thumbsEl.innerHTML = galleryImages.map(function(src, i) {
                return '<button type="button" class="pd-thumb' + (i === 0 ? ' is-active' : '') + '" data-idx="' + i + '" aria-label="View image ' + (i + 1) + '">' +
                    '<img src="' + src + '" alt="" loading="lazy" onerror="this.onerror=null;this.src=\'' + fb + '\'" />' +
                    '</button>';
            }).join('');
            thumbsEl.querySelectorAll('.pd-thumb').forEach(function(btn) {
                btn.addEventListener('click', function() {
                    var i = parseInt(btn.dataset.idx, 10);
                    setMainImage(galleryImages[i]);
                    thumbsEl.querySelectorAll('.pd-thumb').forEach(function(b) {
                        b.classList.toggle('is-active', b === btn);
                    });
                });
            });
        } else {
            thumbsEl.hidden = true;
            if (galleryEl) galleryEl.classList.add('pd-gallery--single');
        }

        document.getElementById('pdTitle').textContent = P.name;
        document.getElementById('pdCrumbName').textContent = P.name;

        var priceEl = document.getElementById('pdPrice');
        priceEl.innerHTML = formatPrice(P.price);
        if (P.compareAt) {
            priceEl.innerHTML += ' <span class="pd-price-was">' + formatPrice(P.compareAt) + '</span>';
        }

        var optionsEl = document.getElementById('pdOptions');
        initSelections();
        optionsEl.innerHTML = P.optionGroups.map(function(g) {
            return '<div class="pd-option-group">' +
                '<span class="pd-option-label">' + g.label + ':</span>' +
                '<div class="pd-option-btns" role="group" aria-label="' + g.label + '">' +
                g.options.map(function(opt) {
                    var active = state.selections[g.key] === opt;
                    return '<button type="button" class="pd-opt' + (active ? ' is-active' : '') + '" data-group="' + g.key + '" data-value="' + opt + '">' + opt + '</button>';
                }).join('') +
                '</div></div>';
        }).join('');

        var addCartBtn = document.getElementById('pdAddCart');
        var buyNowBtn = document.getElementById('pdBuyNow');
        function refreshWaLinks() {
            addCartBtn.href = waUrl(false);
            buyNowBtn.href = waUrl(true);
        }

        optionsEl.querySelectorAll('.pd-opt').forEach(function(btn) {
            btn.addEventListener('click', function() {
                var key = btn.dataset.group;
                state.selections[key] = btn.dataset.value;
                optionsEl.querySelectorAll('.pd-opt[data-group="' + key + '"]').forEach(function(b) {
                    b.classList.toggle('is-active', b === btn);
                });
                refreshWaLinks();
            });
        });

        var qtyVal = document.getElementById('pdQtyVal');
        document.getElementById('pdQtyMinus').addEventListener('click', function() {
            if (state.qty > 1) { state.qty--; qtyVal.textContent = state.qty; refreshWaLinks(); }
        });
        document.getElementById('pdQtyPlus').addEventListener('click', function() {
            if (state.qty < 99) { state.qty++; qtyVal.textContent = state.qty; refreshWaLinks(); }
        });

        refreshWaLinks();

        var accordionData = [
            { id: 'desc', title: 'Description', body: P.description },
            { id: 'model', title: 'Model Size', body: P.modelSize },
            { id: 'note', title: 'Please Note', body: P.pleaseNote },
            { id: 'delivery', title: 'Delivery Information', body: P.deliveryInfo }
        ];

        document.getElementById('pdAccordions').innerHTML = accordionData.map(function(item, i) {
            var open = i === 0;
            return '<div class="pd-acc' + (open ? ' is-open' : '') + '">' +
                '<button type="button" class="pd-acc-head" aria-expanded="' + open + '" aria-controls="pd-acc-' + item.id + '">' +
                '<span>' + item.title + '</span>' +
                '<svg class="pd-acc-icon" viewBox="0 0 24 24" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>' +
                '</button>' +
                '<div class="pd-acc-body" id="pd-acc-' + item.id + '"' + (open ? '' : ' hidden') + '>' +
                '<p>' + item.body + '</p></div></div>';
        }).join('');

        document.getElementById('pdAccordions').querySelectorAll('.pd-acc-head').forEach(function(btn) {
            btn.addEventListener('click', function() {
                var acc = btn.closest('.pd-acc');
                var body = acc.querySelector('.pd-acc-body');
                var open = acc.classList.toggle('is-open');
                btn.setAttribute('aria-expanded', open);
                body.hidden = !open;
            });
        });

        var sizeModal = document.getElementById('pdSizeModal');
        document.getElementById('pdSizeChartBtn').addEventListener('click', function() {
            sizeModal.classList.add('is-open');
            sizeModal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        });
        function closeSizeModal() {
            sizeModal.classList.remove('is-open');
            sizeModal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }
        document.getElementById('pdSizeModalClose').addEventListener('click', closeSizeModal);
        sizeModal.querySelector('.pd-modal-overlay').addEventListener('click', closeSizeModal);

        var related = C.products.filter(function(p) {
            return p.category === P.category && p.id !== P.id;
        }).slice(0, 4);

        if (related.length < 4) {
            var extras = C.products.filter(function(p) {
                return p.id !== P.id && related.indexOf(p) === -1;
            });
            related = related.concat(extras).slice(0, 4);
        }

        document.getElementById('pdRelatedGrid').innerHTML = related.map(function(p) {
            var pIdx = C.products.indexOf(p);
            var src = imageSrc(p.image);
            var fb2 = (C.imageFallbacks && C.imageFallbacks[pIdx]) ? C.imageFallbacks[pIdx] : fb;
            var priceHtml = formatPrice(p.price);
            if (p.compareAt) priceHtml += '<span class="was">' + formatPrice(p.compareAt) + '</span>';
            return '<a class="pd-rel-card" href="product.html?id=' + p.id + '">' +
                '<div class="pd-rel-img">' +
                '<img src="' + src + '" alt="' + p.name + '" loading="lazy" onerror="this.onerror=null;this.src=\'' + fb2 + '\'" />' +
                '</div>' +
                '<div class="pd-rel-name">' + p.name + '</div>' +
                '<div class="pd-rel-price">' + priceHtml + '</div></a>';
        }).join('');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot();
    }
})();
