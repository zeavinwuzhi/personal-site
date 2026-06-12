$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$dist = Join-Path $root "dist"
$server = Join-Path $dist "server"
$public = Join-Path $server "public"
$openai = Join-Path $dist ".openai"

if (Test-Path $dist) {
  Remove-Item -LiteralPath $dist -Recurse -Force
}

New-Item -ItemType Directory -Path $public -Force | Out-Null
New-Item -ItemType Directory -Path $openai -Force | Out-Null

Copy-Item -LiteralPath (Join-Path $root "index.html") -Destination (Join-Path $public "index.html")
Copy-Item -LiteralPath (Join-Path $root "styles.css") -Destination (Join-Path $public "styles.css")
Copy-Item -LiteralPath (Join-Path $root "_headers") -Destination (Join-Path $public "_headers")
Copy-Item -LiteralPath (Join-Path $root "_redirects") -Destination (Join-Path $public "_redirects")
Copy-Item -LiteralPath (Join-Path $root ".openai\\hosting.json") -Destination (Join-Path $openai "hosting.json")
Copy-Item -LiteralPath (Join-Path $root "worker\\index.js") -Destination (Join-Path $server "index.js")
