# ---------------------------------------------------------------------------
# Espressly - temporary art-direction asset fetcher
#
# Downloads placeholder photography from the Corretto reference theme into an
# organised `public/images` tree. Every asset is referenced exclusively through
# `src/config/images.ts`, so replacing a file (or dropping a new one in) never
# requires touching a component.
#
#   powershell -ExecutionPolicy Bypass -File scripts/fetch-reference-assets.ps1
# ---------------------------------------------------------------------------

$ErrorActionPreference = 'Stop'
$base = 'https://corretto.qodeinteractive.com/wp-content/uploads/2018/04/'
$root = Join-Path (Split-Path $PSScriptRoot -Parent) 'public\images'

$map = [ordered]@{
  # hero
  'hero/hero-espresso-pour.jpg'   = 'home-1-slider-image-1.jpg'
  'hero/hero-latte-art.jpg'       = 'home-1-slider-image-2.jpg'
  'hero/hero-cafe-bar.jpg'        = 'home-1-slider-image-3.jpg'

  # brand storytelling / dark full-bleed bands
  'editorial/editorial-beans.jpg'      = 'h1-bacground-img-1.jpg'
  'editorial/editorial-pour-over.jpg'  = 'h1-bacground-img-2.jpg'
  'editorial/editorial-pastry.jpg'     = 'new-new-h1-bacground-img-3.jpg'
  'editorial/editorial-texture.jpg'    = 'p2-background-img-1.jpg'

  # menu
  'menu/menu-hero.jpg'     = 'menu-background-img.jpg'
  'menu/menu-heading.jpg'  = 'menu-title.jpg'

  # services
  'services/service-01.jpg' = 'h2-box-background1.jpg'
  'services/service-02.jpg' = 'h2-box-background2.jpg'
  'services/service-03.jpg' = 'h2-box-background3.jpg'
  'services/service-04.jpg' = 'h2-box-background4.jpg'
  'services/service-wide-a.jpg' = 'what-img-1.jpg'
  'services/service-wide-b.jpg' = 'what-img-2.jpg'
  'services/service-wide-c.jpg' = 'what-img-3.jpg'
  'services/service-heading.jpg' = 'what-title.jpg'

  # about
  'about/about-origin.jpg'    = 'p2-parallax-img-1.jpg'
  'about/about-roasting.jpg'  = 'p2-img-2.jpg'
  'about/about-barista.jpg'   = 'p2-img-3.jpg'
  'about/about-heading.jpg'   = 'p2-title-img-1.jpg'

  # products
  'products/product-01.png' = 'product-img-1.png'
  'products/product-02.jpg' = 'product-img-2.jpg'
  'products/product-03.png' = 'product-img-3.png'
  'products/product-04.jpg' = 'product-img-4.jpg'
  'products/product-05.png' = 'product-img-5.png'
  'products/product-06.jpg' = 'product-img-6.jpg'
  'products/product-07.png' = 'product-img-7.png'
  'products/product-08.png' = 'product-img-8.png'
  'products/product-09.jpg' = 'product-img-9.jpg'
  'products/product-10.png' = 'product-img-10.png'
  'products/shop-heading.jpg' = 'shop-list-title-img-1.jpg'

  # blog
  'blog/article-01.jpg' = 'blog-1-img-1.jpg'
  'blog/article-02.jpg' = 'blog-1-img-2.jpg'
  'blog/article-03.jpg' = 'blog-1-img-3.jpg'
  'blog/blog-heading.jpg' = 'main-title-img.jpg'

  # gallery / lifestyle
  'lifestyle/lifestyle-01.jpg' = 'port-1-img-1.jpg'
  'lifestyle/lifestyle-02.jpg' = 'port-1-img-2.jpg'
  'lifestyle/lifestyle-03.jpg' = 'port-1-img-3.jpg'
  'lifestyle/lifestyle-04.jpg' = 'port-1-img-4.jpg'
  'lifestyle/lifestyle-05.jpg' = 'port-1-img-5.jpg'
  'lifestyle/lifestyle-06.jpg' = 'port-1-img-6.jpg'
  'lifestyle/lifestyle-07.jpg' = 'port-1-img-7.jpg'
  'lifestyle/lifestyle-08.jpg' = 'port-1-img-8.jpg'

  # contact
  'contact/contact-heading.jpg' = 'p3-title-img-1.jpg'
}

foreach ($entry in $map.GetEnumerator()) {
  $dest = Join-Path $root $entry.Key
  $dir = Split-Path $dest -Parent
  if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Force -Path $dir | Out-Null }
  if (Test-Path $dest) { Write-Host "skip  $($entry.Key)"; continue }
  try {
    Invoke-WebRequest -Uri ($base + $entry.Value) -OutFile $dest -UseBasicParsing -TimeoutSec 90
    Write-Host "ok    $($entry.Key)"
  } catch {
    Write-Warning "failed $($entry.Value): $($_.Exception.Message)"
  }
}

Write-Host ''
Write-Host 'Reference assets complete.'