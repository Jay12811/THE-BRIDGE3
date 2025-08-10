const banner = document.getElementById('banner');
const yearEl = document.getElementById('year'); if (yearEl) yearEl.textContent = new Date().getFullYear();
function showBanner(text){ banner.textContent = text; banner.hidden = false; window.scrollTo({top:0,behavior:'smooth'}); setTimeout(()=>{banner.hidden=true; banner.textContent='';},6000);}
async function sendEmail(to, subject, payload){
  const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(to)}`, {
    method:'POST', headers:{'Content-Type':'application/json','Accept':'application/json'},
    body: JSON.stringify({_subject:subject,_captcha:'false', ...payload})
  }); if(!res.ok) throw new Error('Network response was not ok'); return await res.json();
}
document.querySelectorAll('[data-open-register]').forEach(btn=>{ btn.addEventListener('click',()=>{
  document.querySelector('#register').scrollIntoView({behavior:'smooth'});
  const t = btn.getAttribute('data-open-register');
  const sel = document.querySelector('#regForm select[name="event"]'); if (sel) sel.value = t;
});});
const regForm = document.getElementById('regForm'); if(regForm){ regForm.addEventListener('submit', async (e)=>{
  e.preventDefault(); const fd = new FormData(regForm);
  const data = { name: fd.get('name'), email: fd.get('email'), phone: fd.get('phone')||'', event: fd.get('event'), notes: fd.get('notes')||'' };
  const subject = `Event Registration: ${data.event}`;
  try{ await sendEmail('jayavantkamesh@gmail.com', subject, data);
    showBanner('✅ Registration successful! We’ll contact you soon.');
    setTimeout(()=>alert('Thanks! Your registration was sent.'),100);
    regForm.reset();
  }catch(err){
    const body = [`Name: ${data.name}`, `Email: ${data.email}`, `Phone: ${data.phone}`, `Event: ${data.event}`, `Notes: ${data.notes}`].join('\n');
    window.location.href = `mailto:events@thebridgeiyf.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }
});}
const contactForm = document.getElementById('contactForm'); if(contactForm){ contactForm.addEventListener('submit', async (e)=>{
  e.preventDefault(); const fd = new FormData(contactForm);
  const name = fd.get('name'); const email = fd.get('email'); const message = fd.get('message'); const subject = `Website enquiry from ${name}`;
  try{ await sendEmail('thebridgeiyf@gmail.com', subject, {name,email,message});
    showBanner('✅ Message sent! We’ll reply soon.'); setTimeout(()=>alert('Thanks! Your message was sent.'),100);
    contactForm.reset();
  }catch(err){
    const body = [message,'',`From: ${email}`].join('\n');
    window.location.href = `mailto:hello@thebridgeiyf.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }
});}
