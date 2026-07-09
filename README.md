# W3M Creator Academy: WaveWarz Voter Onboarding

This is a one-page MVP for helping complete beginners get ready to vote in the July 12 WaveWarz AI Music Tournament.

## How to run

Run `start-preview.ps1` from this folder. It starts the local server and opens the site in your default browser.

Example:

```powershell
.\start-preview.ps1
```

The preview URL is:

```text
http://127.0.0.1:4173/index.html
```

To stop the server, go back to the PowerShell window running the preview and press `Ctrl+C`.

The page loads editable wording from `content.json`, so opening `index.html` directly may not load content in some browsers.

## MVP goals

- Explain that voting is free.
- Reassure beginners that no crypto experience is needed.
- Explain that Phantom helps reduce botting and keeps the vote cleaner.
- Explain that a tiny amount of SOL may be needed for network activity.
- Help voters get ready before battle night.

## Editing copy

Edit `content.json` to change website wording, captions, button labels, FAQ text, section copy, and future URLs. The HTML is now only the page structure.

## Page sections

The HTML is one page for speed, but each course area has a clear section ID so it can later become its own page:

- `home`
- `why-wallet`
- `install-phantom`
- `create-wallet`
- `add-sol`
- `connect-wavewarz`
- `battle-night`
- `faq`

## Future expansion

This MVP can grow into a larger Creator Academy by moving each section into a reusable course module, then adding more courses under future folders such as `courses`, `resources`, `events`, and `creator-guides`.
