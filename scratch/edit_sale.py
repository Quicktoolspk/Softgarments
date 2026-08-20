import re

with open('collection.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update title & meta description
content = re.sub(r'<title>.*?</title>', '<title>Sale Collection — Softgarments | Best Online Clothing Brand in Pakistan</title>', content)
content = re.sub(r'<meta name="description" content="[^"]*">', '<meta name="description" content="Shop the Softgarments Sale Collection. Exclusive discounts on premium ready-to-wear, dresses, tops, kurtis, and more.">', content)

# 2. Update Nav links (desktop)
content = content.replace('<a href="collection.html" class="is-active">New Arrivals</a>', '<a href="collection.html">New Arrivals</a>')
content = content.replace('<a href="#">Sale</a>', '<a href="collection-Sale.html" class="is-active">Sale</a>')
# Update Nav links (mobile)
# The mobile panel has identical links but is inside #mobileNav

# 3. Update Hero Title and Tagline
content = re.sub(r'<h1 id="colTitle">.*?</h1>', '<h1 id="colTitle">Sale Collection</h1>', content)
content = re.sub(r'<p id="colTagline">.*?</p>', '<p id="colTagline">Exclusive discounts on premium ready-to-wear · Nationwide COD across Pakistan</p>', content)

# 4. Filter categories
old_filters = """<div class="col-filter-group">
                <h3>Category</h3>
                    <label class="col-filter-option"><input type="checkbox" name="cat" value="everyday" checked /> Everyday Wear</label>
                    <label class="col-filter-option"><input type="checkbox" name="cat" value="seasonal" checked /> Seasonal Edit</label>
                    <label class="col-filter-option"><input type="checkbox" name="cat" value="occasion" checked /> Occasion Styles</label>
            </div>"""

new_filters = """<div class="col-filter-group">
                <h3>Category</h3>
                    <label class="col-filter-option"><input type="checkbox" name="cat" value="everyday" checked /> Everyday Wear</label>
                    <label class="col-filter-option"><input type="checkbox" name="cat" value="casual" checked /> Casual Wear</label>
                    <label class="col-filter-option"><input type="checkbox" name="cat" value="formal" checked /> Formal Wear</label>
                    <label class="col-filter-option"><input type="checkbox" name="cat" value="festive" checked /> Festive Wear</label>
                    <label class="col-filter-option"><input type="checkbox" name="cat" value="coord" checked /> Co-ord Sets</label>
                    <label class="col-filter-option"><input type="checkbox" name="cat" value="dresses" checked /> Dresses</label>
                    <label class="col-filter-option"><input type="checkbox" name="cat" value="kurtis" checked /> Kurtis</label>
                    <label class="col-filter-option"><input type="checkbox" name="cat" value="tops" checked /> Shirts / Tops</label>
            </div>"""
content = content.replace(old_filters, new_filters)

# 5. JS scripts
content = content.replace('<script src="assets/collection-products.js"></script>', '<script src="assets/collection-sale-products.js"></script>')
content = content.replace('var C = window.SG_COLLECTION;', 'var C = window.SG_SALE_COLLECTION;')

# 6. Remove the hardcoded C.title, C.tagline, C.products block
script_pattern = r"(C\.title\s*=\s*'[^']*';\s*C\.tagline\s*=\s*'[^']*';\s*C\.products\s*=\s*\[.*?\];)"
content = re.sub(script_pattern, '', content, flags=re.DOTALL)

# 7. Update render function to use p.originalPrice instead of compareAt if present, and to use p.image directly if we don't find it in HTML
render_replace = """function productImageElement(name) {
            var source = Array.prototype.find.call(imageSources.querySelectorAll('img[data-sg-collection]'), function(img) {
                return img.getAttribute('data-sg-collection') === name;
            });
            return source ? source.cloneNode(true) : document.createElement('img');
        }"""
new_render_replace = """function productImageElement(p) {
            var img = document.createElement('img');
            img.src = p.image;
            return img;
        }"""
content = content.replace(render_replace, new_render_replace)
content = content.replace('var img = productImageElement(p.name);', 'var img = productImageElement(p);')

# activeCategories list initialization and reset
content = content.replace("var activeCategories = ['everyday', 'seasonal', 'occasion'];", "var activeCategories = ['everyday', 'casual', 'formal', 'festive', 'coord', 'dresses', 'kurtis', 'tops'];")
content = content.replace("activeCategories = ['everyday', 'seasonal', 'occasion'];", "activeCategories = ['everyday', 'casual', 'formal', 'festive', 'coord', 'dresses', 'kurtis', 'tops'];")

# price rendering in HTML to support discount badge and originalPrice
price_html_replace = """var priceHtml = formatPrice(p.price);
                if (p.compareAt) priceHtml += '<span class="was">' + formatPrice(p.compareAt) + '</span>';"""
new_price_html_replace = """var priceHtml = formatPrice(p.price);
                if (p.originalPrice) priceHtml += '<span class="was">' + formatPrice(p.originalPrice) + '</span>';
                else if (p.compareAt) priceHtml += '<span class="was">' + formatPrice(p.compareAt) + '</span>';"""
content = content.replace(price_html_replace, new_price_html_replace)

badge_replace = """<div class="col-card-wa"><span>View Product</span></div>"""
new_badge_replace = """<div class="col-card-wa"><span>View Product</span></div>' +
                    (p.badge ? '<div style="position: absolute; top: 10px; right: 10px; background: red; color: white; padding: 4px 8px; font-size: 10px; font-weight: bold; letter-spacing: 1px; text-transform: uppercase;">' + p.badge + '</div>' : '') +
                    (p.discount ? '<div style="position: absolute; top: 10px; left: 10px; background: #000; color: white; padding: 4px 8px; font-size: 10px; font-weight: bold;">-' + p.discount + '%</div>' : '') +
                    '"""
content = content.replace(badge_replace, new_badge_replace)


with open('collection-Sale.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Modification complete.")
