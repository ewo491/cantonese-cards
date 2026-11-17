// menu.js: sidebar menu + background themes, shared by every page.
// Add <script src="menu.js"></script> inside the <head> of each page.
(function () {
  // The themes. "color" is the swatch shown in the menu
  const THEMES = [
    { id: 'blush', name: 'Blush pink',   color: '#ffe3e6' },
    { id: 'sunny', name: 'Sunny yellow', color: '#fff3b0' },
    { id: 'sky',   name: 'Sky blue',     color: '#dff1ff' },
    { id: 'night', name: 'Night mode',   color: '#1f2233' },
  ];

  // Apply the saved theme straight away so the page doesn't flash the wrong colour
  let current = 'blush';
  try { current = localStorage.getItem('theme') || 'blush'; } catch (e) {}
  if (!THEMES.some(t => t.id === current)) current = 'blush';
  document.documentElement.dataset.theme = current;

  // Theme colours (the pages read --bg, --dots and --page-text) + menu styling
  const css = `
  :root[data-theme="sunny"] { --bg: #fff3b0; --dots: #ffe680; }
  :root[data-theme="sky"]   { --bg: #dff1ff; --dots: #bfe0f7; }
  :root[data-theme="night"] { --bg: #1f2233; --dots: #2a2f47; --page-text: #f6ecec; }

  body { padding-top: 3.8rem; }  /* room for the menu button */

  #menuBtn, #menuClose, .theme {
    font: inherit; color: #3b2a2a; background: #fff; cursor: pointer;
    border: 3px solid #3b2a2a; border-radius: 999px; box-shadow: 0 3px 0 #3b2a2a;
  }
  #menuBtn { position: fixed; top: .7rem; left: .7rem; z-index: 20; width: 46px; height: 46px;
             padding: 0; margin: 0; font-size: 1.4rem; line-height: 1; }
  #menuClose { width: 40px; height: 40px; padding: 0; float: right; }

  #scrim { position: fixed; inset: 0; z-index: 30; background: rgba(0,0,0,.4);
           opacity: 0; visibility: hidden; transition: opacity .2s, visibility .2s; }
  #drawer { position: fixed; top: 0; bottom: 0; left: 0; z-index: 40; width: min(280px, 82vw);
            padding: 1rem; overflow-y: auto; text-align: left;
            background: #fff; color: #3b2a2a; border-right: 3px solid #3b2a2a;
            transform: translateX(-105%); visibility: hidden;
            transition: transform .22s ease, visibility .22s; }
  body.menu-open #scrim { opacity: 1; visibility: visible; }
  body.menu-open #drawer { transform: none; visibility: visible; }

  #drawer h2 { margin: .3rem 0 1rem; font-size: 1.3rem; }
  #drawer h3 { margin: 1.5rem 0 .4rem; font-size: .95rem; opacity: .7; }
  .navlink { display: block; padding: .7rem 1rem; margin: .4rem 0; color: #3b2a2a; text-decoration: none;
             border: 3px solid #3b2a2a; border-radius: 14px; }
  .navlink[aria-current="page"] { background: #ffd66b; }
  .theme { display: flex; align-items: center; gap: .7rem; width: 100%; margin: .45rem 0;
           padding: .5rem .9rem; border-radius: 14px; text-align: left; }
  .theme[aria-pressed="true"] { background: #ffd66b; }
  .theme .sw { width: 1.4rem; height: 1.4rem; border-radius: 50%; border: 2px solid #3b2a2a; flex: none; }
  #menuBtn:focus-visible, #menuClose:focus-visible, .theme:focus-visible, .navlink:focus-visible
    { outline: 4px solid #ffd66b; outline-offset: 2px; }
  @media (prefers-reduced-motion: reduce) { #drawer, #scrim { transition: none; } }
  `;

  document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.textContent = css;
    document.head.append(style);

    const onVocab = /vocab\.html$/.test(location.pathname);

    document.body.insertAdjacentHTML('beforeend', `
      <button id="menuBtn" aria-label="Open menu" aria-expanded="false" aria-controls="drawer">☰</button>
      <div id="scrim"></div>
      <nav id="drawer" aria-label="Menu">
        <button id="menuClose" aria-label="Close menu">✕</button>
        <h2>Menu</h2>
        <a class="navlink" href="index.html"${onVocab ? '' : ' aria-current="page"'}>Flashcards</a>
        <a class="navlink" href="vocab.html"${onVocab ? ' aria-current="page"' : ''}>Vocab list</a>
        <h3>Background</h3>
        ${THEMES.map(t => `<button class="theme" data-id="${t.id}" aria-pressed="${t.id === current}">
          <span class="sw" style="background:${t.color}"></span>${t.name}</button>`).join('')}
      </nav>`);

    const btn = document.getElementById('menuBtn');

    // Open or close the drawer
    function setOpen(open) {
      document.body.classList.toggle('menu-open', open);
      btn.setAttribute('aria-expanded', open);
      (open ? document.getElementById('menuClose') : btn).focus();
    }
    btn.onclick = () => setOpen(true);
    document.getElementById('menuClose').onclick = () => setOpen(false);
    document.getElementById('scrim').onclick = () => setOpen(false);
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && document.body.classList.contains('menu-open')) setOpen(false);
    });

    // Choose a theme: apply it, remember it, highlight the chosen button
    document.querySelectorAll('.theme').forEach(b => {
      b.onclick = () => {
        document.documentElement.dataset.theme = b.dataset.id;
        try { localStorage.setItem('theme', b.dataset.id); } catch (e) {}
        document.querySelectorAll('.theme').forEach(x => x.setAttribute('aria-pressed', x === b));
      };
    });
  });
})();
