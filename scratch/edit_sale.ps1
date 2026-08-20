$content = [System.IO.File]::ReadAllText('collection.html', [System.Text.Encoding]::UTF8)

# 1. Update title & meta description
$content = $content -replace '<title>.*?</title>', '<title>Sale Collection — Softgarments | Best Online Clothing Brand in Pakistan</title>'
$content = $content -replace '<meta name="description" content="[^"]*">', '<meta name="description" content="Shop the Softgarments Sale Collection. Exclusive discounts on premium ready-to-wear, dresses, tops, kurtis, and more.">'

# 2. Update Nav links (desktop)
$content = $content -replace '<a href="collection\.html" class="is-active">New Arrivals</a>', '<a href="collection.html">New Arrivals</a>'
$content = $content -replace '<a href="#">Sale</a>', '<a href="collection-Sale.html" class="is-active">Sale</a>'
# And inside the mobile panel
$content = $content -replace '<a href="collection\.html" class="is-active">New Arrivals</a>', '<a href="collection.html">New Arrivals</a>'
$content = $content -replace '<a href="#">Sale</a>', '<a href="collection-Sale.html" class="is-active">Sale</a>'

# 3. Update Hero Title and Tagline
$content = $content -replace '<h1 id="colTitle">.*?</h1>', '<h1 id="colTitle">Sale Collection</h1>'
$content = $content -replace '<p id="colTagline">.*?</p>', '<p id="colTagline">Exclusive discounts on premium ready-to-wear · Nationwide COD across Pakistan</p>'

# 4. Filter categories
$oldFilters = @"
<div class="col-filter-group">
                <h3>Category</h3>
                    <label class="col-filter-option"><input type="checkbox" name="cat" value="everyday" checked /> Everyday Wear</label>
                    <label class="col-filter-option"><input type="checkbox" name="cat" value="seasonal" checked /> Seasonal Edit</label>
                    <label class="col-filter-option"><input type="checkbox" name="cat" value="occasion" checked /> Occasion Styles</label>
            </div>
"@

$newFilters = @"
<div class="col-filter-group">
                <h3>Category</h3>
                    <label class="col-filter-option"><input type="checkbox" name="cat" value="everyday" checked /> Everyday Wear</label>
                    <label class="col-filter-option"><input type="checkbox" name="cat" value="casual" checked /> Casual Wear</label>
                    <label class="col-filter-option"><input type="checkbox" name="cat" value="formal" checked /> Formal Wear</label>
                    <label class="col-filter-option"><input type="checkbox" name="cat" value="festive" checked /> Festive Wear</label>
                    <label class="col-filter-option"><input type="checkbox" name="cat" value="coord" checked /> Co-ord Sets</label>
                    <label class="col-filter-option"><input type="checkbox" name="cat" value="dresses" checked /> Dresses</label>
                    <label class="col-filter-option"><input type="checkbox" name="cat" value="kurtis" checked /> Kurtis</label>
                    <label class="col-filter-option"><input type="checkbox" name="cat" value="tops" checked /> Shirts / Tops</label>
            </div>
"@

$content = $content.Replace($oldFilters, $newFilters)

# 5. JS scripts
$content = $content.Replace('<script src="assets/collection-products.js"></script>', '<script src="assets/collection-sale-products.js"></script>')
$content = $content.Replace('var C = window.SG_COLLECTION;', 'var C = window.SG_SALE_COLLECTION;')

# 6. Remove the hardcoded C.title, C.tagline, C.products block
$pattern = 'C\.title\s*=\s*''[^'']*'';\s*C\.tagline\s*=\s*''[^'']*'';\s*C\.products\s*=\s*\[[\s\S]*?\];'
$content = $content -replace $pattern, ''

# 7. Update render function
$renderReplace = @"
function productImageElement(name) {
            var source = Array.prototype.find.call(imageSources.querySelectorAll('img[data-sg-collection]'), function(img) {
                return img.getAttribute('data-sg-collection') === name;
            });
            return source ? source.cloneNode(true) : document.createElement('img');
        }
"@
$newRenderReplace = @"
function productImageElement(p) {
            var img = document.createElement('img');
            img.src = p.image;
            return img;
        }
"@
$content = $content.Replace($renderReplace, $newRenderReplace)
$content = $content.Replace('var img = productImageElement(p.name);', 'var img = productImageElement(p);')

# activeCategories list initialization and reset
$content = $content.Replace("var activeCategories = ['everyday', 'seasonal', 'occasion'];", "var activeCategories = ['everyday', 'casual', 'formal', 'festive', 'coord', 'dresses', 'kurtis', 'tops'];")
$content = $content.Replace("activeCategories = ['everyday', 'seasonal', 'occasion'];", "activeCategories = ['everyday', 'casual', 'formal', 'festive', 'coord', 'dresses', 'kurtis', 'tops'];")

# price rendering in HTML to support discount badge and originalPrice
$priceHtmlReplace = @"
var priceHtml = formatPrice(p.price);
                if (p.compareAt) priceHtml += '<span class="was">' + formatPrice(p.compareAt) + '</span>';
"@
$newPriceHtmlReplace = @"
var priceHtml = formatPrice(p.price);
                if (p.originalPrice) priceHtml += '<span class="was">' + formatPrice(p.originalPrice) + '</span>';
                else if (p.compareAt) priceHtml += '<span class="was">' + formatPrice(p.compareAt) + '</span>';
"@
$content = $content.Replace($priceHtmlReplace, $newPriceHtmlReplace)

$badgeReplace = '<div class="col-card-wa"><span>View Product</span></div>'
$newBadgeReplace = @"
<div class="col-card-wa"><span>View Product</span></div>' +
                    (p.badge ? '<div style="position: absolute; top: 12px; right: 12px; background: #e32636; color: white; padding: 4px 10px; font-size: 10px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase;">' + p.badge + '</div>' : '') +
                    (p.discount ? '<div style="position: absolute; top: 12px; left: 12px; background: #000; color: white; padding: 4px 10px; font-size: 10px; font-weight: 700;">-' + p.discount + '%</div>' : '') +
                    '
"@
$content = $content.Replace($badgeReplace, $newBadgeReplace)

[System.IO.File]::WriteAllText('collection-Sale.html', $content, [System.Text.Encoding]::UTF8)
