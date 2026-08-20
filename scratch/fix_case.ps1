$files = Get-ChildItem -File -Recurse -Include *.html,*.js

foreach ($file in $files) {
    if ($file.Name -eq "dosapage.html") { continue }
    
    $content = [System.IO.File]::ReadAllText($file.FullName, [System.Text.Encoding]::UTF8)
    
    if ($content -match 'collection-Sale\.html') {
        $content = $content -replace 'collection-Sale\.html', 'collection-sale.html'
        [System.IO.File]::WriteAllText($file.FullName, $content, [System.Text.Encoding]::UTF8)
    }
}

Write-Host "Updated all collection-Sale.html references to collection-sale.html"
