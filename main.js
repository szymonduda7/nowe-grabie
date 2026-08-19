(function(){
  var items = Array.prototype.slice.call(document.querySelectorAll('.gallery-item'));
  if (items.length){
    var lightbox = document.getElementById('lightbox');
    var lbImg = document.getElementById('lightboxImg');
    var lbCounter = document.getElementById('lightboxCounter');
    var current = 0;

    function show(i){
      current = (i + items.length) % items.length;
      var img = items[current].querySelector('img');
      lbImg.src = img.src;
      lbImg.alt = img.alt;
      lbCounter.textContent = (current + 1) + ' / ' + items.length;
    }
    function openLightbox(i){
      show(i);
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    function closeLightbox(){
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    }
    items.forEach(function(el, i){
      el.addEventListener('click', function(){ openLightbox(i); });
    });
    document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
    document.getElementById('lightboxPrev').addEventListener('click', function(){ show(current - 1); });
    document.getElementById('lightboxNext').addEventListener('click', function(){ show(current + 1); });
    lightbox.addEventListener('click', function(e){ if (e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', function(e){
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') show(current - 1);
      if (e.key === 'ArrowRight') show(current + 1);
    });
  }
})();

(function(){
  var btn = document.getElementById('menuToggle');
  var menu = document.getElementById('mobileMenu');
  var backdrop = document.getElementById('menuBackdrop');
  var iconOpen = document.getElementById('iconMenuOpen');
  var iconClose = document.getElementById('iconMenuClose');
  if (!btn) return;

  function closeMenu(){
    menu.classList.remove('open');
    backdrop.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-label', 'Otwórz menu');
    iconOpen.style.display = '';
    iconClose.style.display = 'none';
  }
  function openMenu(){
    menu.classList.add('open');
    backdrop.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
    btn.setAttribute('aria-label', 'Zamknij menu');
    iconOpen.style.display = 'none';
    iconClose.style.display = '';
  }
  btn.addEventListener('click', function(){
    btn.getAttribute('aria-expanded') === 'true' ? closeMenu() : openMenu();
  });
  backdrop.addEventListener('click', closeMenu);
  menu.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', closeMenu); });
  document.addEventListener('keydown', function(e){ if (e.key === 'Escape') closeMenu(); });
  window.addEventListener('resize', function(){ if (window.innerWidth >= 768) closeMenu(); });
})();
