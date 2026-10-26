document.documentElement.classList.add('js');
document.querySelectorAll('.bib-toggle').forEach(button => button.addEventListener('click', () => {
  const citation = document.getElementById(button.getAttribute('aria-controls'));
  const expanded = button.getAttribute('aria-expanded') !== 'true';
  citation.hidden = !expanded;
  button.setAttribute('aria-expanded', String(expanded));
}));
document.querySelectorAll('.copy-citation').forEach(button => button.addEventListener('click', async () => {
  const code = button.parentElement.querySelector('code');
  const label = button.getAttribute('aria-label');
  try {
    await navigator.clipboard.writeText(code.textContent);
    button.textContent = 'Copied';
    button.setAttribute('aria-label', 'Citation copied to clipboard');
    document.querySelector('#copy-status').textContent = 'Citation copied to clipboard.';
  } catch {
    const range = document.createRange();
    range.selectNodeContents(code);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    button.textContent = 'Selected';
    button.setAttribute('aria-label', 'Citation selected. Press Command C or Control C to copy.');
    document.querySelector('#copy-status').textContent = 'Citation selected. Press Command C or Control C to copy.';
  }
  window.setTimeout(() => { button.textContent = 'Copy'; button.setAttribute('aria-label', label); document.querySelector('#copy-status').textContent = ''; }, 2200);
}));
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#site-nav');
function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation');
  navigation.classList.remove('is-open');
}
menuButton.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(expanded));
  menuButton.setAttribute('aria-label', expanded ? 'Close navigation' : 'Open navigation');
  navigation.classList.toggle('is-open', expanded);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuButton.focus();
  }
});
window.matchMedia('(min-width:761px)').addEventListener('change', closeMenu);
