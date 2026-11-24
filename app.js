// ===== RsLive Go - app.js FULL - v4-pwa-secure + Anti-Preview + Option 2 =====

// --- 0. ANTI-PREVIEW LOCK - আগেরটার মতো ---
// CodeBeautify / Online HTML Viewer / অন্য সাইটে iframe দিয়ে চালালে সাথে সাথে ব্ল্যাংক
if (window.top !== window.self) {
  try { document.documentElement.innerHTML = ''; document.write(''); } catch(e){}
  throw new Error('Blocked');
}
(function(){
  var ref = document.referrer || '';
  if (ref.indexOf('codebeautify') !== -1 || ref.indexOf('html-viewer') !== -1 || ref.indexOf('htmlpreview') !== -1 || ref.indexOf('onlinehtmleditor') !== -1) {
    try { document.documentElement.innerHTML = ''; } catch(e){}
    throw new Error('Blocked');
  }
  // তোমার ডোমেইন ছাড়া অন্য কোথাও চলবে না - এখানে তোমার ডোমেইন বসাও
  var ALLOWED = ['localhost', '127.0.0.1', 'rslivego.com', 'www.rslivego.com'];
  var h = window.location.hostname || '';
  if (h !== '' && ALLOWED.indexOf(h) === -1) {
    try { document.documentElement.innerHTML = '<body style="background:#000;color:#fff;display:flex;align-items:center;justify-content:center;height:100vh;font-family:sans-serif">Blocked</body>'; } catch(e){}
    throw new Error('Blocked');
  }
})();

// --- 1. CONFIG ---
const CONFIG_VERSION = 'v4-pwa-secure';
const DEFAULT={siteName:'RsLive Go',tagline:'LIVE TV • BANGLADESH',telegram:'https://t.me/rslivetv',searchPh:'চ্যানেল খুঁজো...',statusText:'✅ মোট {count} টা চ্যানেল - RsLive Go',showLive:true,showTele:true,proxyUrl:'https://stream-through-spark.lovable.app/api/proxy?u=',notice:'',showNotice:false,featName:'',featUrl:'',showFeat:false,playlists:[]};
let saved=null; try{saved=JSON.parse(localStorage.getItem('rslive_config')||'null')}catch(e){}
if(!saved || saved.version !== CONFIG_VERSION || !saved.playlists){ saved=null; localStorage.removeItem('rslive_config'); }
const CFG={...DEFAULT,...(saved||{})}; if(saved&&saved.playlists) CFG.playlists=saved.playlists;
try{
document.getElementById('taglineEl').textContent=CFG.tagline;
document.getElementById('search').placeholder=CFG.searchPh;
document.getElementById('teleBtn').href=CFG.telegram;
if(!CFG.showLive) document.getElementById('livePill').style.display='none';
if(!CFG.showTele) document.getElementById('teleBtn').style.display='none';
if(CFG.showNotice&&CFG.notice){let n=document.getElementById('noticeBar');n.textContent=CFG.notice;n.style.display='block'}
if(CFG.showFeat&&CFG.featName){document.getElementById('featured').style.display='block';document.getElementById('featName').textContent=CFG.featName;window._f=CFG.featUrl;window._fn=CFG.featName}
}catch(e){}
function goHome(){ window.location.href = window.location.origin + '/?t=' + Date.now(); }
let all=[]; let cat="All";
let _catCache = null, _catCounts = {};
let visibleCount = 200;
let currentFiltered = [];
async function getPlaylistsFromSW(){
  try{ await navigator.serviceWorker.ready; let r = await fetch('/api/playlists'); let data = await r.json(); if(data && data.length) return data; }catch(e){}
  return CFG.playlists;
}
async function loadOne(p){let u=p.useProxy?CFG.proxyUrl+encodeURIComponent(p.url):p.url; try{let r=await fetch(u);let t=await r.text();return parse(t)}catch(e){return[]}}
function parse(t){let l=t.split("\n"),o=[],c=null;for(let x of l){x=x.trim();if(x.startsWith("#EXTINF")){let n=x.split(",").pop().trim();let lg=x.match(/tvg-logo="([^"]+)"/);let g=x.match(/group-title="([^"]+)"/);c={name:n,logo:lg?lg[1]:"",group:g?g[1]:"General"}}else if(x.startsWith("http")&&c){c.url=x;o.push(c);c=null}}return o}
async function loadAll(){
  CFG.playlists = await getPlaylistsFromSW();
  for(let p of CFG.playlists){let list=await loadOne(p);for(let ch of list){ch.source=p.name;if(!all.find(y=>y.url===ch.url))all.push(ch)}document.getElementById("status").innerHTML=`✅ মোট <b>${all.length}</b> টা চ্যানেল লোড হইছে...`;_catCache=null;renderCats();renderGrid();}document.getElementById("status").innerHTML=CFG.statusText.replace('{count}',`<b>${all.length}</b>`)}
function getCats(){if(_catCache) return _catCache; let sources = [...new Set(CFG.playlists.map(p=>p.name))]; _catCache = ["All", ...sources, "Sports","News","Entertainment","Movies","Kids","Music","Bangladesh","India"]; return _catCache;}
function catIcon(c){ if(c==='All') return '🏠'; if(c==='Sports') return '🏆'; if(c==='News') return '📰'; if(c==='Entertainment') return '🎭'; if(c==='Movies') return '🎬'; if(c==='Kids') return '🧒'; if(c==='Music') return '🎵'; if(c==='Bangladesh') return '🇧🇩'; if(c==='India') return '🇮🇳'; return '📺'; }
function catCount(c){
  if(_catCounts[c]!==undefined && cat!=='All') return _catCounts[c];
  if(!all.length) return 0;
  let n=0;
  if(c==='All') n=all.length;
  else if(CFG.playlists.find(p=>p.name===c)) n=all.filter(x=>x.source===c).length;
  else if(c==='Sports') n=all.filter(x=>x.group.toLowerCase().includes('sport')||x.group.toLowerCase().includes('cricket')||x.group.toLowerCase().includes('football')).length;
  else if(c==='News') n=all.filter(x=>x.group.toLowerCase().includes('news')).length;
  else if(c==='Movies') n=all.filter(x=>x.group.toLowerCase().includes('movie')).length;
  else if(c==='Kids') n=all.filter(x=>x.group.toLowerCase().includes('kid')).length;
  else if(c==='Music') n=all.filter(x=>x.group.toLowerCase().includes('music')).length;
  else if(c==='Entertainment') n=all.filter(x=>x.group.toLowerCase().includes('entertainment')||x.group.toLowerCase().includes('general')).length;
  else if(c==='Bangladesh') n=all.filter(x=>x.name.toLowerCase().includes('bangla')||x.name.toLowerCase().includes('btv')||x.name.toLowerCase().includes('t sports')||x.name.toLowerCase().includes('somoy')||x.name.toLowerCase().includes('jamuna')).length;
  else if(c==='India') n=all.filter(x=>x.name.toLowerCase().includes('star')||x.name.toLowerCase().includes('sony')||x.name.toLowerCase().includes('zee')||x.name.toLowerCase().includes('colors')).length;
  else n=all.filter(x=>x.group.toLowerCase().includes(c.toLowerCase())).length;
  _catCounts[c]=n; return n;
}
function matchesCat(c,catName){
  if(catName==="All") return true;
  if(CFG.playlists.find(p=>p.name===catName)) return c.source===catName;
  if(catName==="Sports") return c.group.toLowerCase().includes("sport")||c.group.toLowerCase().includes("cricket")||c.group.toLowerCase().includes("football");
  if(catName==="News") return c.group.toLowerCase().includes("news");
  if(catName==="Movies") return c.group.toLowerCase().includes("movie");
  if(catName==="Kids") return c.group.toLowerCase().includes("kid");
  if(catName==="Music") return c.group.toLowerCase().includes("music");
  if(catName==="Entertainment") return c.group.toLowerCase().includes("entertainment")||c.group.toLowerCase().includes("general");
  if(catName==="Bangladesh") return c.name.toLowerCase().includes("bangla")||c.name.toLowerCase().includes("btv")||c.name.toLowerCase().includes("t sports")||c.name.toLowerCase().includes("somoy")||c.name.toLowerCase().includes("jamuna");
  if(catName==="India") return c.name.toLowerCase().includes("star")||c.name.toLowerCase().includes("sony")||c.name.toLowerCase().includes("zee")||c.name.toLowerCase().includes("colors");
  return c.group.toLowerCase().includes(catName.toLowerCase());
}
function renderCats(){
  let isDesktop = window.innerWidth >= 900;
  let catsEl = document.getElementById("cats");
  if(!catsEl) return;
  if(isDesktop){
    catsEl.innerHTML = `<div class="cat-title">✨ ক্যাটাগরি <span>${getCats().length} টা</span></div>` + getCats().map(c=>`<div class="cat ${c===cat?'active':''}" data-cat="${c}"><span class="cat-ico">${catIcon(c)}</span><span class="cat-name">${c}</span><span class="cat-count">${catCount(c)}</span></div>`).join("");
  } else {
    catsEl.innerHTML=getCats().map(c=>`<div class="cat ${c===cat?'active':''}" data-cat="${c}">${catIcon(c)} ${c} <span class="cat-count">${catCount(c)}</span></div>`).join("");
  }
  catsEl.querySelectorAll('.cat').forEach(el=>{ el.onclick = ()=> setCat(el.dataset.cat); });
}
function renderGrid(reset=true){
  if(reset) visibleCount = 200;
  let q=document.getElementById("search").value.toLowerCase();
  currentFiltered=[];
  for(let i=0;i<all.length;i++){ let c=all[i]; if(q && !c.name.toLowerCase().includes(q)) continue; if(!matchesCat(c,cat)) continue; currentFiltered.push(c); }
  let show = currentFiltered.slice(0, visibleCount);
  let html='';
  for(let i=0;i<show.length;i++){ let c=show[i]; html+=`<div class="card" onclick="openCh('${encodeURIComponent(c.url)}','${encodeURIComponent(c.name)}','${c.source}','${encodeURIComponent(c.group)}')"><img loading="lazy" src="${c.logo||'https://cdn-icons-png.flaticon.com/512/1179/1179069.png'}" onerror="this.src='https://cdn-icons-png.flaticon.com/512/1179/1179069.png'"><p>${c.name}</p><small>${c.group}</small></div>`; }
  document.getElementById("grid").innerHTML=html;
  let wrap=document.getElementById("loadMoreWrap");
  let btn=document.getElementById("loadMoreBtn");
  if(currentFiltered.length > visibleCount){ wrap.style.display='block'; btn.textContent = `আরো দেখো ↓  (${visibleCount}/${currentFiltered.length})`; }
  else { wrap.style.display='none'; }
  if(reset){ let sa=document.getElementById('scrollArea'); if(sa) sa.scrollTop=0; window.scrollTo({top:0}); }
}
function loadMore(){ visibleCount += 200; renderGrid(false); }
function setCat(c){
  if(cat===c) return;
  cat=c;
  document.querySelectorAll('#cats .cat').forEach(el=>{ el.classList.toggle('active', el.dataset.cat===c); });
  renderGrid(true);
}
function openCh(u,n,s,g){window.location.href=`player.html?url=${u}&name=${n}&src=${encodeURIComponent(s)}&group=${g}`}
let _searchT=null;
document.getElementById("search").addEventListener("input",()=>{ clearTimeout(_searchT); _searchT=setTimeout(()=>renderGrid(true), 80); });
let _rszT=null;
window.addEventListener("resize",()=>{ clearTimeout(_rszT); _rszT=setTimeout(renderCats, 150); });
loadAll();

// ===== OPTION 2 : View-Source / DevTools খুললেই Blank =====
(function(){
  function kill(){
    try{ document.documentElement.innerHTML = ''; document.write(''); document.close(); }catch(e){}
    try{ document.body.innerHTML = '<div style="background:#000;color:#fff;height:100vh;display:flex;align-items:center;justify-content:center;font-family:sans-serif">Blocked</div>'; }catch(e){}
    setTimeout(()=>{ try{ window.location.href='about:blank'; }catch(e){} }, 300);
  }
  if(window.location.href.indexOf('view-source:') !== -1 || document.URL.indexOf('view-source:') !== -1){ kill(); return; }
  document.addEventListener('contextmenu', e=>{ e.preventDefault(); return false; });
  document.addEventListener('copy', e=>{ e.preventDefault(); return false; });
  document.addEventListener('cut', e=>{ e.preventDefault(); return false; });
  document.addEventListener('dragstart', e=>{ e.preventDefault(); return false; });
  document.addEventListener('selectstart', e=>{ if(e.target.id!=='search') e.preventDefault(); });
  document.addEventListener('keydown', e=>{
    let k = (e.key||'').toUpperCase();
    if(e.key==='F12' || (e.ctrlKey && ['U','S','P','C','A'].includes(k)) || (e.ctrlKey && e.shiftKey && ['I','J','C','K'].includes(k)) || (e.metaKey && ['U','S','I'].includes(k))){
      e.preventDefault(); e.stopPropagation(); kill(); return false;
    }
    if((e.ctrlKey && e.shiftKey && ['I','J','C'].includes(k))){ kill(); }
  }, true);
  var isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
  var isInIframe = (window.top !== window.self);
  if(!isMobile && !isInIframe && window.innerWidth>768){
    setInterval(()=>{
      let w = window.outerWidth - window.innerWidth > 200;
      let h = window.outerHeight - window.innerHeight > 200;
      if(w || h) kill();
    }, 600);
    setInterval(()=>{
      let start = Date.now();
      debugger;
      if(Date.now() - start > 100) kill();
    }, 800);
  }
  // 0.5s পরেও iframe এ থাকলে ব্ল্যাংক - Online Viewer গুলা iframe এ চালায়
  setTimeout(()=>{ if(window.top !== window.self) kill(); }, 500);
})();

// --- PWA Install ---
if('serviceWorker' in navigator){ navigator.serviceWorker.register('/sw.js').catch(()=>{}); }
let deferredPrompt = null;
window.addEventListener('beforeinstallprompt', (e)=>{ e.preventDefault(); deferredPrompt = e; if(!window.matchMedia('(display-mode: standalone)').matches){ let bar = document.getElementById('installBar'); if(bar && !localStorage.getItem('rslive_install_closed')){ bar.style.display = 'flex'; } } });
document.getElementById('installBtn')?.addEventListener('click', async ()=>{ if(!deferredPrompt){ alert('ব্রাউজারের Menu (⋮) -> Add to Home Screen এ চাপ দাও'); return; } deferredPrompt.prompt(); let choice = await deferredPrompt.userChoice; if(choice.outcome === 'accepted'){ document.getElementById('installBar').style.display = 'none'; } deferredPrompt = null; });
document.getElementById('closeInstall')?.addEventListener('click', ()=>{ document.getElementById('installBar').style.display = 'none'; localStorage.setItem('rslive_install_closed','1'); });
window.addEventListener('appinstalled', ()=>{ document.getElementById('installBar').style.display = 'none'; });
