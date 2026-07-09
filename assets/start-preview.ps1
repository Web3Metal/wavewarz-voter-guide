$ErrorActionPreference = "Stop"

$python = "C:\Users\shawn\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe"
$port = 4173
$url = "http://127.0.0.1:$port/index.html"

if (-not (Test-Path -LiteralPath $python)) {
  Write-Host "Bundled Python was not found at:"
  Write-Host $python
  Write-Host ""
  Write-Host "Open this project in Codex once, then try again."
  Read-Host "Press Enter to close"
  exit 1
}

Set-Location -LiteralPath $PSScriptRoot

Write-Host "Starting W3M Creator Academy preview..."
Write-Host "URL: $url"
Write-Host ""
Write-Host "Keep this window open while previewing."
Write-Host "Press Ctrl+C in this window to stop the server."
Write-Host ""

Start-Process $url
& $python -m http.server $port
