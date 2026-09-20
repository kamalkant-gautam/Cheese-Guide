  // Scroll progress bar
  const progress = document.getElementById('progress');
  function updateProgress(){
    const h = document.documentElement;
    const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
    progress.style.width = scrolled + '%';
  }
  document.addEventListener('scroll', updateProgress);
  updateProgress();

  // Back to top
  const backBtn = document.getElementById('backtotop');
  window.addEventListener('scroll', () => {
    if(window.scrollY > 500){ backBtn.classList.add('show'); }
    else{ backBtn.classList.remove('show'); }
  });
  backBtn.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

  // Q&A modal
  // ⚠️ SETUP REQUIRED: replace YOUR_FORM_ID below with your own Formspree endpoint.
  // 1. Go to https://formspree.io and sign up free (no credit card).
  // 2. Create a new form — it will give you an endpoint like
  //    https://formspree.io/f/abcdwxyz
  // 3. Paste that full URL in place of the placeholder below.
  // Every submission is then emailed straight to your inbox and saved in your
  // private Formspree dashboard — no one else can see or access it.
  const QA_FORM_ENDPOINT = "https://formspree.io/f/mjykgrej";

  const qaBtn = document.getElementById('qaBtn');
  const qaOverlay = document.getElementById('qaOverlay');
  const qaClose = document.getElementById('qaClose');
  const qaForm = document.getElementById('qaForm');
  const qaStatus = document.getElementById('qaStatus');
  const qaSendBtn = document.getElementById('qaSendBtn');

  function openQA(){ qaOverlay.classList.add('open'); document.getElementById('qaName').focus(); }
  function closeQA(){ qaOverlay.classList.remove('open'); qaStatus.textContent=''; qaStatus.className='qa-status'; }

  qaBtn.addEventListener('click', openQA);
  qaClose.addEventListener('click', closeQA);
  qaOverlay.addEventListener('click', (e) => { if(e.target === qaOverlay) closeQA(); });
  document.addEventListener('keydown', (e) => { if(e.key === 'Escape') closeQA(); });

  qaForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('qaName').value.trim();
    const query = document.getElementById('qaQuery').value.trim();
    if(!name || !query) return;

    qaSendBtn.disabled = true;
    qaSendBtn.textContent = 'Sending...';
    qaStatus.textContent = '';
    qaStatus.className = 'qa-status';

    try{
      if(QA_FORM_ENDPOINT.includes('YOUR_FORM_ID')){
        throw new Error('not-configured');
      }
      const res = await fetch(QA_FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, query, page: 'Cheese Guide' })
      });
      if(!res.ok) throw new Error('send-failed');
      qaStatus.textContent = 'Thanks — your query has been sent.';
      qaStatus.classList.add('ok');
      qaForm.reset();
      setTimeout(closeQA, 1600);
    } catch(err){
      // Fallback: open a pre-filled email so nothing gets lost even before setup
      const subject = encodeURIComponent('Cheese Guide — Query from ' + name);
      const body = encodeURIComponent(query + '\n\n— ' + name);
      qaStatus.textContent = 'Could not submit online — opening your email app instead.';
      qaStatus.classList.add('err');
      window.location.href = `mailto:?subject=${subject}&body=${body}`;
    } finally {
      qaSendBtn.disabled = false;
      qaSendBtn.textContent = 'Send';
    }
  });

  // Glossary collapse/expand
  const glossaryToggle = document.getElementById('glossaryToggle');
  const glossaryBody = document.getElementById('glossaryBody');
  glossaryToggle.addEventListener('click', () => {
    const open = glossaryToggle.getAttribute('aria-expanded') === 'true';
    if(open){
      glossaryBody.style.maxHeight = '0px';
      glossaryToggle.setAttribute('aria-expanded', 'false');
      glossaryToggle.querySelector('span').textContent = 'Expand';
    } else {
      glossaryBody.style.maxHeight = glossaryBody.scrollHeight + 'px';
      glossaryToggle.setAttribute('aria-expanded', 'true');
      glossaryToggle.querySelector('span').textContent = 'Collapse';
    }
  });

  // Filters
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.cheese-card');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      cards.forEach(card => {
        if(f === 'all' || card.dataset.cat === f){
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
