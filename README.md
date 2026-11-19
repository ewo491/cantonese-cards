# 廣東話 Cantonese Flashcards

A small, cute flashcard site for learning Cantonese vocabulary. Upload a CSV of words and study them on your phone, including offline on the commute. No accounts, no tracking, no server: everything runs in your browser.

**Live site:** https://ewo491.github.io/cantonese-cards/

## Features

- **Flashcards** with jyutping, Chinese characters and English
- **Both directions:** Jyutping → English, or English → Jyutping + characters
- **Tone colours and lines:** each jyutping syllable is coloured and given a pitch-contour line, so you can see the tone as well as read it
- **Categories:** tag words (e.g. Basics, Food & Drink) and study one, several or all of them
- **Got it / Again:** mark words you know so they drop out of the round; "Again" sends a card to the back of the queue
- **Shuffle**
- **Pronunciation:** a 🔊 button reads the characters aloud using your device's Cantonese voice
- **Vocab list:** a separate page listing every word, with search, category filter and tap-to-hear
- **Themes:** blush pink, sunny yellow, sky blue and night mode
- **Works offline** once it has been opened with a connection

## Using it

1. Open the site and tap **Choose CSV**.
2. Pick your vocab file. The deck is saved on your device, so you only need to do this once (or when you update your words).
3. Tap the card (or **Flip**) to reveal the other side. Use **Back / Next**, **Again / Got it**, and the menu (☰) to switch pages or theme.

There's nothing to install and nothing to update: new versions of the site arrive automatically.

### CSV format

Four columns, with a header row:

```
jyutping,characters,english,category
nei5 hou2,你好,hello,Basics
gaa3 fe1,咖啡,coffee,Food & Drink
```

- Save as **UTF-8** (in Excel: "CSV UTF-8"), or the characters will be garbled.
- The category column is optional. Words without one show as "Uncategorised".
- If a field contains a comma, wrap it in double quotes, e.g. `"hello, hi"`.

## Offline use

A service worker (`sw.js`) saves the pages on your device after your first visit.

1. Open the site once while online, then reload it once.
2. Load your CSV (and open the Flashcards page so the deck is saved).
3. After that it opens without signal.

Notes:

- After an update, the new version appears on your **second** visit, because the old copy is shown while the new one downloads.
- On iPhone, Safari can clear a site's saved data if it isn't visited for about a week. Use **Share → Add to Home Screen** and open it from there, and keep your CSV handy.
- Speech needs a Cantonese voice installed on your device. On iPhone, download it under Settings → Accessibility → Spoken Content → Voices → Cantonese. The voice is text-to-speech, so it can occasionally pick the wrong reading for a character.

## Files

| File | What it does |
|---|---|
| `index.html` | The flashcard page |
| `vocab.html` | The vocab list page |
| `menu.js` | Sidebar menu and themes, shared by both pages |
| `sw.js` | Service worker for offline use |

Your deck, progress and theme are stored in your browser's `localStorage`. They stay on your device and are never uploaded anywhere. Progress and the deck are per device and per browser.

## For the site owner: updating the site

Edit the files, then:

```bash
git add .
git commit -m "describe your change"
git push
```

GitHub Pages rebuilds in a minute or two. If you add a new file that should work offline, add it to the `FILES` list in `sw.js` and bump the `CACHE` name (e.g. `canto-v3`) so devices refresh their saved copy.

## For developers: running locally

It's plain HTML, CSS and JavaScript, with no build step. Open `index.html` in a browser. The service worker only runs from `https://` (or `localhost`), so offline mode needs the hosted site or a local server such as `python3 -m http.server`.

## Notes

- The jyutping and translations were written by hand and may contain mistakes. Check against a dictionary such as [words.hk](https://words.hk) or [CantoDict](https://www.cantonese.sheik.co.uk/) when in doubt.
- All drawings are inline SVG, and the fonts are your device's own system fonts, so there are no external requests.
