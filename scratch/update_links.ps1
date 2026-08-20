$files = Get-ChildItem -Filter *.html

foreach ($file in $files) {
    if ($file.Name -eq "dosapage.html") { continue } # Skip access denied
    
    $content = [System.IO.File]::ReadAllText($file.FullName, [System.Text.Encoding]::UTF8)
    
    # 1. Update NAV bar links
    # Standard static links
    $content = $content -replace '<a href="#">Sale</a>', '<a href="collection-Sale.html">Sale</a>'
    
    # Dynamic JS replacements (collection-RTW, collection-fabrics)
    $content = $content -replace '''<a href="sale\.html">Sale</a>''', '''<a href="collection-Sale.html">Sale</a>'''
    
    # 2. Add to Footer
    # We want to add it under the "Shop" column. Let's look for a known anchor to append it.
    # In some pages it's `<li><a href="collection-fabrics.html">Fabrics</a></li>`
    # In other pages it's `<li><a href="main.page.html#shape">Occasion Styles</a></li>`
    
    # We can use Regex to match the Shop footer col:
    # (?s)<div class="footer-col">\s*<h5>Shop</h5>\s*<ul>.*?</ul>
    
    # Instead of complex regex, let's just append before </ul> in the first footer-col.
    # We'll use a Regex match evaluator to only replace the first occurrence of </ul> after <h5>Shop</h5>
    
    $pattern = '(?s)(<div class="footer-col">\s*<h5>Shop</h5>\s*<ul>.*?)(\s*</ul>)'
    if ($content -notmatch '<li><a href="collection-Sale.html">Sale</a></li>') {
        $content = [regex]::Replace($content, $pattern, '${1}<li><a href="collection-Sale.html">Sale</a></li>${2}', 1)
    }

    [System.IO.File]::WriteAllText($file.FullName, $content, [System.Text.Encoding]::UTF8)
}

Write-Host "Updated all HTML files."
