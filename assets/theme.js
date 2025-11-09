// light/dark with persistence + prefers-color-scheme
(function(){
  const KEY = 'lr-theme';
  const root = document.documentElement;
  function apply(t){ t==='dark' ? root.setAttribute('data-theme','dark') : root.removeAttribute('data-theme'); }
  function current(){
    const saved = localStorage.getItem(KEY);
    if(saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  function toggle(){
    const next = current()==='dark' ? 'light' : 'dark';
    localStorage.setItem(KEY,next); apply(next);
  }
  // expose
  window.__lrToggleTheme = toggle;
  // init
  apply(current());
})();
