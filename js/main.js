document.addEventListener('DOMContentLoaded',function(){
  // year
  const y = new Date().getFullYear();
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = y;

  // nav toggle
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  navToggle && navToggle.addEventListener('click', function(){
    const expanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', String(!expanded));
    nav && nav.classList.toggle('open');
  });

  // simple smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){
      const href = this.getAttribute('href');
      if(href.length>1){
        e.preventDefault();
        const el = document.querySelector(href);
        if(el) el.scrollIntoView({behavior:'smooth',block:'start'});
        // close mobile nav if open
        if(nav && nav.classList.contains('open')){
          nav.classList.remove('open');
          if(navToggle) navToggle.setAttribute('aria-expanded','false');
        }
      }
    })
  });

  // contact form (mock submit)
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      const data = new FormData(form);
      const name = data.get('name')?.toString().trim();
      const email = data.get('email')?.toString().trim();
      const message = data.get('message')?.toString().trim();
      if(!name || !email || !message){
        status.textContent = 'Please complete required fields.';
        return;
      }
      status.textContent = 'Sending...';
      // simulate network
      setTimeout(()=>{
        status.textContent = 'Thanks — your message has been received.';
        form.reset();
      },900);
    })
  }
});
