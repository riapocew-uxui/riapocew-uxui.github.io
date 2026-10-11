const modal=document.querySelector('.lightbox');
let opener;
for(const button of document.querySelectorAll('[data-zoom]'))button.addEventListener('click',()=>{
 opener=button;const img=modal.querySelector('img');img.src=button.dataset.zoom;img.alt=button.dataset.caption;
 modal.querySelector('p').textContent=button.dataset.caption;modal.showModal();modal.scrollTop=0;document.body.style.overflow='hidden';
});
function closeModal(){modal.close();}
modal.querySelector('button').addEventListener('click',closeModal);
modal.addEventListener('click',event=>{if(event.target===modal){const r=modal.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)closeModal();}});
modal.addEventListener('close',()=>{document.body.style.overflow='';if(opener)opener.focus();});
let toastTimer;
function toast(message){const el=document.getElementById('toast');el.textContent=message;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),2600);}
for(const button of document.querySelectorAll('[data-copy]'))button.addEventListener('click',async()=>{
 try{await navigator.clipboard.writeText(button.dataset.copy);toast('Почта скопирована');}catch{toast('Почта: '+button.dataset.copy);}
});
// Direct section links also reveal their optional details.
function revealSection(hash){if(!hash||hash.length<2)return;const section=document.getElementById(hash.slice(1));const detail=section?.querySelector('details');if(detail)detail.open=true;}
document.querySelectorAll('.case-aside a').forEach(a=>a.addEventListener('click',()=>revealSection(a.hash)));
window.addEventListener('hashchange',()=>revealSection(location.hash));
revealSection(location.hash);

// Theme preference is shared by the homepage and every case study.
const themeButton=document.querySelector('.theme-toggle');
function applyTheme(theme){
 document.documentElement.dataset.theme=theme;
 const dark=theme==='dark';
 themeButton.setAttribute('aria-pressed',String(dark));
 themeButton.setAttribute('aria-label',dark?'Включить светлую тему':'Включить тёмную тему');
 themeButton.querySelector('.theme-label').textContent=dark?'Светлая тема':'Тёмная тема';
 document.querySelector('meta[name="theme-color"]').content=dark?'#19191d':'#f6f5f1';
}
if(themeButton){
 applyTheme(document.documentElement.dataset.theme||'light');
 themeButton.addEventListener('click',()=>{const theme=document.documentElement.dataset.theme==='dark'?'light':'dark';applyTheme(theme);try{localStorage.setItem('portfolio-theme',theme)}catch{}});
 window.addEventListener('storage',event=>{if(event.key==='portfolio-theme')applyTheme(event.newValue==='dark'?'dark':'light')});
}
