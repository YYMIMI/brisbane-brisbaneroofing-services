(function () {
  'use strict';
  if (window.PortfolioCaseCarousel) {
    window.PortfolioCaseCarousel.init(document);
    return;
  }
  const controllers = new Map();
  let nextId = 0;
  const tolerance = 2;
  const language = () => document.documentElement.lang.toLowerCase();
  const labels = () => language().startsWith('zh')
    ? /hant|tw|hk/.test(language())
      ? ['上一個案例', '下一個案例', '工程案例']
      : ['上一个案例', '下一个案例', '工程案例']
    : ['Previous project', 'Next project', 'Project gallery'];
  const frame = callback => window.requestAnimationFrame(callback);

  function initialise(track) {
    if (controllers.has(track)) return controllers.get(track);
    const shell = track.closest('[data-case-carousel-shell]');
    if (!shell) return null;
    if (!track.id) {
      do { nextId += 1; track.id = 'case-carousel-' + nextId; }
      while (document.getElementById(track.id) !== track);
    }
    const [previousLabel, nextLabel, galleryLabel] = labels();
    const controls = document.createElement('div');
    controls.setAttribute('data-case-carousel-controls', '');
    controls.hidden = true;
    const makeButton = (direction, label, arrow) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.setAttribute('data-case-carousel-direction', direction);
      button.setAttribute('aria-controls', track.id);
      button.setAttribute('aria-label', label);
      button.title = label;
      button.disabled = true;
      const icon = document.createElement('span');
      icon.setAttribute('aria-hidden', 'true');
      icon.textContent = arrow;
      button.append(icon);
      controls.append(button);
      return button;
    };
    const previous = makeButton('previous', previousLabel, '←');
    const next = makeButton('next', nextLabel, '→');
    shell.insertBefore(controls, track);
    if (!track.hasAttribute('tabindex')) track.setAttribute('tabindex', '0');
    if (!track.hasAttribute('aria-label') && !track.hasAttribute('aria-labelledby')) {
      track.setAttribute('aria-label', track.getAttribute('data-case-carousel-label') || galleryLabel);
    }
    if (!track.hasAttribute('role') && !/^(UL|OL)$/.test(track.tagName)) {
      track.setAttribute('role', 'region');
    }
    const cards = () => {
      const children = Array.from(track.children).filter(card => !card.hidden && !/^(SCRIPT|STYLE|TEMPLATE)$/.test(card.tagName) && card.getBoundingClientRect().width > 0);
      const marked = children.filter(card => card.hasAttribute('data-case-card'));
      return marked.length ? marked : children;
    };
    const maximum = () => Math.max(0, track.scrollWidth - track.clientWidth);
    const position = () => Math.min(maximum(), Math.max(0, track.scrollLeft));
    function update() {
      const max = maximum();
      const overflow = cards().length > 1 && max > tolerance;
      if (!overflow && controls.contains(document.activeElement)) track.focus({ preventScroll: true });
      controls.hidden = !overflow;
      previous.disabled = !overflow || position() <= tolerance;
      next.disabled = !overflow || position() >= max - tolerance;
    }
    let scheduled = false;
    function schedule() {
      if (scheduled) return;
      scheduled = true;
      frame(() => { scheduled = false; update(); });
    }
    function move(direction) {
      if ((direction < 0 ? previous : next).disabled) return;
      const current = position();
      const trackLeft = track.getBoundingClientRect().left + track.clientLeft;
      const padding = parseFloat(window.getComputedStyle(track).paddingLeft) || 0;
      const offsets = cards().map(card => card.getBoundingClientRect().left - trackLeft + current - padding);
      const target = direction > 0
        ? offsets.find(offset => offset > current + tolerance) ?? maximum()
        : offsets.slice().reverse().find(offset => offset < current - tolerance) ?? 0;
      track.scrollTo({
        left: Math.max(0, Math.min(maximum(), target)),
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
      });
      schedule();
    }
    const goPrevious = () => move(-1);
    const goNext = () => move(1);
    previous.addEventListener('click', goPrevious);
    next.addEventListener('click', goNext);
    track.addEventListener('scroll', schedule, { passive: true });
    let observer;
    if ('ResizeObserver' in window) {
      observer = new window.ResizeObserver(schedule);
      observer.observe(track);
      cards().forEach(card => observer.observe(card));
    }
    const controller = {
      refresh: update,
      destroy() {
        observer?.disconnect();
        previous.removeEventListener('click', goPrevious);
        next.removeEventListener('click', goNext);
        track.removeEventListener('scroll', schedule);
        controls.remove();
        controllers.delete(track);
      }
    };
    controllers.set(track, controller);
    update();
    return controller;
  }

  function init(root = document) {
    controllers.forEach((controller, track) => {
      if (!track.isConnected) controller.destroy();
    });
    if (root.matches?.('[data-case-carousel]')) initialise(root);
    root.querySelectorAll('[data-case-carousel]').forEach(initialise);
  }
  function refresh(root = document) {
    init(root);
    controllers.forEach(controller => controller.refresh());
  }
  window.PortfolioCaseCarousel = { init, refresh };
  window.addEventListener('resize', () => refresh(), { passive: true });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => init(), { once: true });
  else init();
})();
