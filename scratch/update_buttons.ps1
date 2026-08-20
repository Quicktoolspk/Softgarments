$files = Get-ChildItem -Filter *.html

foreach ($file in $files) {
    if ($file.Name -eq "dosapage.html") { continue }
    
    $content = [System.IO.File]::ReadAllText($file.FullName, [System.Text.Encoding]::UTF8)
    
    # 1. Replace Checkout Products button
    $content = $content -replace 'href="#products"', 'href="collection-Sale.html"'
    
    # 2. Replace View All Products button
    $content = $content -replace '<a href="#" class="btn btn-outline">View All Products</a>', '<a href="collection-Sale.html" class="btn btn-outline">View All Products</a>'
    
    [System.IO.File]::WriteAllText($file.FullName, $content, [System.Text.Encoding]::UTF8)
}

Write-Host "Updated #products and # View All Products buttons across all HTML files."
