// ---- Copy to clipboard for contact pills ----
const toast = document.getElementById('toast');
let toastTimer = null;

function showToast(message){
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 1800);
}

document.querySelectorAll('.contact-pill').forEach(pill => {
  pill.addEventListener('click', async () => {
    const value = pill.getAttribute('data-copy');
    try{
      await navigator.clipboard.writeText(value);
      showToast('Copied: ' + value);
    }catch(err){
      showToast('Copy failed — please copy manually');
    }
  });
});

// ---- QR code generation + toggle ----
const qrToggle = document.getElementById('qrToggle');
const qrPanel = document.getElementById('qrPanel');
let qrGenerated = false;

qrToggle.addEventListener('click', () => {
  const isOpen = qrPanel.classList.toggle('open');
  qrToggle.setAttribute('aria-expanded', isOpen);
  qrToggle.textContent = isOpen ? 'Hide QR Code' : 'Show QR Code';

  if(isOpen && !qrGenerated){
    new QRCode(document.getElementById('qrcode'), {
      text: window.location.href,
      width: 150,
      height: 150,
      colorDark: '#0a0e14',
      colorLight: '#ffffff',
      correctLevel: QRCode.CorrectLevel.M
    });
    qrGenerated = true;
  }
});
