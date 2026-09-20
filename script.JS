// Scroll progress bar
const progress = document.getElementById('progress');

function updateProgress() {
    const h = document.documentElement;
    const scrolled = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;

    if (progress) {
        progress.style.width = scrolled + '%';
    }
}

document.addEventListener('scroll', updateProgress);
updateProgress();


// Back to top
const backBtn = document.getElementById('backtotop');

if (backBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backBtn.classList.add('show');
        } else {
            backBtn.classList.remove('show');
        }
    });

    backBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}


// ==================================================
// Q&A FORM - FORMSPREE
// ==================================================

const QA_FORM_ENDPOINT = "https://formspree.io/f/mjykgrej";

const qaBtn = document.getElementById('qaBtn');
const qaOverlay = document.getElementById('qaOverlay');
const qaClose = document.getElementById('qaClose');
const qaForm = document.getElementById('qaForm');
const qaStatus = document.getElementById('qaStatus');
const qaSendBtn = document.getElementById('qaSendBtn');

function openQA() {
    if (qaOverlay) {
        qaOverlay.classList.add('open');
    }

    const qaName = document.getElementById('qaName');
    if (qaName) {
        qaName.focus();
    }
}

function closeQA() {
    if (qaOverlay) {
        qaOverlay.classList.remove('open');
    }

    if (qaStatus) {
        qaStatus.textContent = '';
        qaStatus.className = 'qa-status';
    }
}

if (qaBtn) {
    qaBtn.addEventListener('click', openQA);
}

if (qaClose) {
    qaClose.addEventListener('click', closeQA);
}

if (qaOverlay) {
    qaOverlay.addEventListener('click', (e) => {
        if (e.target === qaOverlay) {
            closeQA();
        }
    });
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeQA();
    }
});

if (qaForm) {
    qaForm.addEventListener('submit', async (e) => {

        e.preventDefault();

        const name = document.getElementById('qaName')?.value.trim();
        const query = document.getElementById('qaQuery')?.value.trim();

        if (!name || !query) {
            return;
        }

        if (qaSendBtn) {
            qaSendBtn.disabled = true;
            qaSendBtn.textContent = 'Sending...';
        }

        if (qaStatus) {
            qaStatus.textContent = '';
            qaStatus.className = 'qa-status';
        }

        try {

            console.log("Submitting to Formspree...");

            const res = await fetch(QA_FORM_ENDPOINT, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name,
        