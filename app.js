// KICK-OUT LOCK - Open হবে না, সরাসরি বের করে দিবে
(function(){
  function kick(){
    try{ window.top.location.href = 'about:blank'; }catch(e){}
    try{ window.parent.location.href = 'about:blank'; }catch(e){}
    try{ window.location.href = 'about:blank'; }catch(e){}
    try{ window.location.replace('about:blank'); }catch(e){}
    try{ window.close(); }catch(e){}
    document.documentElement.innerHTML = '';
    setInterval(function(){
      try{ window.top.location.href = 'about:blank'; }catch(e){}
      try{ window.location.href = 'about:blank'; }catch(e){}
      document.documentElement.innerHTML = '';
    }, 100);
  }
  var h = window.location.hostname || '';
  var p = window.location.protocol || '';
  if(p === 'blob:' || p === 'data:' || p === 'file:' || p === 'about:' || h === '' || h === 'null'){ kick(); throw new Error('Blocked'); }
  if(h !== 'rslivego.pages.dev' && h !== 'www.rslivego.pages.dev' && h !== 'localhost' && h !== '127.0.0.1'){ kick(); throw new Error('Blocked'); }
  if(window.top !== window.self){ kick(); throw new Error('Blocked'); }
})();

// --- UI বানানো ---
document.getElementById('app').innerHTML = `
<style>
*{margin:0;padding:0;box-sizing:border-box;-webkit-user-select:none;user-select:none}
html,body{height:100%;overflow:hidden;overflow-x:hidden;width:100%;max-width:100%;overscroll-behavior-x:none}
body{background:#07070f;color:#fff;font-family:'Hind Siliguri',sans-serif;display:flex;flex-direction:column;touch-action:pan-y}
#app{display:flex;flex-direction:column;flex:1;min-height:0;overflow-x:hidden}
.sticky{flex-shrink:0;z-index:100;overflow-x:hidden;max-width:100vw}
header{background:rgba(10,10,20,.92);backdrop-filter:blur(16px);padding:14px 12px;border-bottom:1px solid rgba(255,255,255,.08);position:relative;overflow:hidden}
.top-row{display:flex;flex-direction:column;position:relative;z-index:2}
.header-top{display:flex;align-items:center;justify-content:space-between}
.search-wrap{position:relative;margin-top:12px}
.logo{display:flex;align-items:center;gap:10px;cursor:pointer}
.logo .play-ico{width:36px;height:36px;border-radius:11px;background:linear-gradient(135deg,#22d3ee,#a78bfa,#ff5d8f);display:flex;align-items:center;justify-content:center;font-size:15px;box-shadow:0 5px 18px rgba(167,139,250,.55), inset 0 1px 0 rgba(255,255,255,.45);animation:logoFloat 3s ease-in-out infinite}
@keyframes logoFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-2px)}}
.logo-text .name{font-family:'Poppins',sans-serif;font-size:21px;font-weight:900;line-height:1;color:#fff}
/* ✅ FIX - আগে এখানে animation ছিল না, তাই Color আটকে থাকতো */
.logo-text .name i{font-style:normal;background:linear-gradient(90deg,#22d3ee,#a78bfa,#ff5d8f,#fb923c,#22d3ee);background-size:300% auto;-webkit-background-clip:text;background-clip:text;color:transparent;-webkit-text-fill-color:transparent;animation:shineFlow 3s linear infinite}
@keyframes shineFlow{0%{background-position:0% center}100%{background-position:300% center}}
.logo-text .tag{font-size:8.5px;letter-spacing:3px;color:#9a9ab5;font-weight:700;margin-top:2px}
.live-pill{display:flex;align-items:center;gap:6px;background:rgba(255,45,85,.14);border:1px solid rgba(255,45,85,.35);color:#ff6b81;font-size:10px;font-weight:800;padding:5px 9px;border-radius:20px}
.live-pill i{width:7px;height:7px;background:#ff2d55;border-radius:50%;box-shadow:0 0 0 0 rgba(255,45,85,.7);animation:pulseDot 1.4s infinite}
@keyframes pulseDot{0%{box-shadow:0 0 0 0 rgba(255,45,85,.7)}70%{box-shadow:0 0 0 7px rgba(255,45,85,0)}100%{box-shadow:0 0 0 0 rgba(255,45,85,0)}}
/* ✅ FIX - Header এর পিছনের Color Glow এখন ঘুরবে, আটকে থাকবে না */
header::before{content:"";position:absolute;top:-50px;left:-20px;width:200px;height:110px;background:radial-gradient(circle,rgba(34,211,238,.35),transparent 70%);filter:blur(10px);pointer-events:none;animation:glowMove 4s ease-in-out infinite alternate}
header::after{content:"";position:absolute;top:-50px;right:-20px;width:200px;height:110px;background:radial-gradient(circle,rgba(167,139,250,.35),transparent 70%);filter:blur(10px);pointer-events:none;animation:glowMove2 4s ease-in-out infinite alternate}
@keyframes glowMove{0%{transform:translateX(0) scale(1);opacity:.6}100%{transform:translateX(50px) scale(1.2);opacity:1}}
@keyframes glowMove2{0%{transform:translateX(0) scale(1.2);opacity:1}100%{transform:translateX(-50px) scale(1);opacity:.6}}
.search-wrap .s-ico{position:absolute;left:14px;top:50%;transform:translateY(-50%);font-size:15px}
#search{width:100%;padding:12px 14px 12px 40px;border-radius:14px;border:1px solid rgba(255,255,255,.12);background:#1d1d2e;color:#fff;font-size:13.5px;font-family:'Hind Siliguri',sans-serif;outline:none;user-select:text;-webkit-user-select:text}
#cats{display:flex;gap:7px;overflow-x:auto;overflow-y:hidden;padding:12px 12px;white-space:nowrap;scrollbar-width:none;background:#07070f;border-bottom:1px solid rgba(255,255,255,.08);flex-shrink:0}
#cats::-webkit-scrollbar{display:none}
.cat{padding:8px 12px;border-radius:20px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.09);font-size:12px;font-weight:600;cursor:pointer;flex-shrink:0;display:inline-flex;align-items:center;gap:5px}
.cat .cat-count{font-size:10.5px;background:rgba(255,255,255,.12);padding:2px 7px;border-radius:20px}
.cat.active{background:#2a2a3a;border:1px solid rgba(255,255,255,.28)}
#scrollArea{flex:1;overflow-y:auto;overflow-x:hidden;padding-bottom:90px;max-width:100vw}
#grid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;padding:10px 12px}
.card{background:#15151f;border:1px solid #262633;border-radius:12px;padding:8px 4px;text-align:center;cursor:pointer;aspect-ratio:1/1;display:flex;flex-direction:column;align-items:center;justify-content:center;overflow:hidden;min-width:0}
.card img{width:44px;height:44px;object-fit:contain;background:#fff;border-radius:8px;padding:3px}
.card p{font-size:10.5px;margin-top:6px;line-height:1.3;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;min-height:26px;word-break:break-word}
.card small{font-size:8.5px;color:#22d3ee}
#loadMoreWrap{text-align:center;padding:6px 12px 18px;display:none}
#loadMoreBtn{width:100%;max-width:320px;padding:12px;border-radius:12px;background:#2a2a3a;color:#fff;font-family:'Hind Siliguri',sans-serif;font-size:13.5px;font-weight:700;cursor:pointer;border:1px solid rgba(255,255,255,.2)}
#noticeBar{display:none;background:linear-gradient(90deg,#22d3ee,#a78bfa,#ff5d8f);color:#000;font-size:12px;font-weight:700;padding:8px;text-align:center}
#featured{display:none;margin:12px 12px 0;background:#221a3a;border:1px solid #a78bfa;border-radius:12px;padding:12px;cursor:pointer}
#status{position:fixed;bottom:0;left:0;right:0;background:rgba(10,10,20,.92);padding:10px;text-align:center;font-size:11.5px;color:#c8c8dd;border-top:1px solid rgba(255,255,255,.08);z-index:200}
#status b{background:linear-gradient(90deg,#22d3ee,#a78bfa,#ff5d8f,#22d3ee);background-size:300% auto;-webkit-background-clip:text;background-clip:text;color:transparent;animation:shineFlow 3s linear infinite}
.tele{position:fixed;right:14px;bottom:110px;width:52px;height:52px;border-radius:50%;background:linear-gradient(135deg,#2AABEE,#229ED9);display:flex;align-items:center;justify-content:center;z-index:999;box-shadow:0 8px 25px rgba(42,171,238,.6)}
.tele svg{width:26px;height:26px;fill:#fff}
.tele::before{content:'';position:absolute;width:100%;height:100%;border-radius:50%;background:#2AABEE;z-index:-1;animation:telePulse 2s infinite}
@keyframes telePulse{0%{transform:scale(1);opacity:.7}100%{transform:scale(1.7);opacity:0}}
#installBar{display:none;position:fixed;left:10px;right:10px;bottom:36px;z-index:998;background:#1a1a2e;border:1px solid rgba(167,139,250,.45);border-radius:100px;padding:4px 4px 4px 8px;align-items:center;gap:6px}
#installBar .ib-ico{width:24px;height:24px;border-radius:50%;background:linear-gradient(135deg,#22d3ee,#a78bfa,#ff5d8f);display:flex;align-items:center;justify-content:center;font-size:11px}
#installBar .ib-txt{flex:1;text-align:center}
#installBar .ib-txt b{font-size:12px;display:block}
#installBar .ib-txt span{font-size:10px;color:#b8b8d0;display:block}
#installBar .ib-btn{background:linear-gradient(90deg,#22d3ee,#a78bfa,#ff5d8f);color:#fff;border:none;padding:7px 11px;border-radius:100px;font-weight:800;font-size:11px}
#installBar .ib-close{width:20px;height:20px;border-radius:50%;background:rgba(255,255,255,.12);display:flex;align-items:center;justify-content:center;font-size:10px;cursor:pointer}
.desktop-wrap{display:flex;flex-direction:column;flex:1;min-height:0;overflow-x:hidden}
#mainCol{flex:1;min-height:0;display:flex;flex-direction:column;overflow-x:hidden}
@media(min-width:900px){
body{display:block;overflow-y:auto}
#app{display:block}
.sticky{position:sticky;top:0}
header{max-width:1440px;margin:0 auto;padding:16px 24px}
.top-row{flex-direction:row;align-items:center;gap:20px}
.search-wrap{flex:1;margin-top:0;max-width:720px;margin-left:auto}
.desktop-wrap{flex-direction:row;max-width:1440px;margin:0 auto;gap:18px;padding:16px 24px 40px}
#mainCol{order:1}
#cats{order:2;flex-direction:column;overflow-x:hidden;width:260px;position:sticky;top:120px;max-height:calc(100vh - 160px);padding:0 0 20px;white-space:normal;border:none;background:transparent}
.cat{width:100%;padding:11px 12px;font-size:13.5px}
#scrollArea{overflow:visible}
#grid{grid-template-columns:repeat(5,1fr);gap:12px;padding:14px 0}
.card{border-radius:16px;padding:14px 8px}
.card img{width:60px;height:60px;border-radius:12px;padding:6px}
.card p{font-size:12px}
}
@media(min-width:1300px){ #grid{grid-template-columns:repeat(6,1fr)} }
</style>
<div id="noticeBar"></div>
<div class="sticky"><header><div class="top-row"><div class="header-top"><div class="logo" onclick="goHome()"><div class="play-ico">▶</div><div class="logo-text"><div class="name">RsLive <i>Go</i></div><div class="tag" id="taglineEl">LIVE TV • BANGLADESH</div></div></div><div class="live-pill" id="livePill"><i></i> LIVE</div></div><div class="search-wrap"><span class="s-ico">🔍</span><input id="search" placeholder="চ্যানেল খুঁজো..." autocomplete="off"></div></div></header></div>
<div class="desktop-wrap"><div id="cats"></div><div id="mainCol"><div id="scrollArea"><div id="featured"><div style="font-size:11px;color:#ff5d8f;font-weight:800">⭐ FEATURED LIVE</div><b id="featName"></b><br><span style="font-size:11px;color:#22d3ee">এখনই দেখো →</span></div><div id="grid"><div style="grid-column:1/-1;text-align:center;padding:40px;color:#aaa">⏳ চ্যানেল লোড হচ্ছে...</div></div><div id="loadMoreWrap"><button id="loadMoreBtn" onclick="loadMore()">আরো দেখো ↓</button></div></div></div></div>
<div id="status">Loading...</div>
<a class="tele" id="teleBtn" href="https://t.me/RsLiveGo" target="_blank"><svg viewBox="0 0 24 24"><path d="M9.04 15.31l-.38 5.32c.54 0 .78-.23 1.06-.5l2.55-2.44 5.28 3.87c.97.53 1.66.25 1.92-.9L24 3.6c.1-.9-.32-1.38-1.1-1.12L1.5 10.2c-.9.35-.88 1.45.14 1.72l5.48 1.71 12.66-8.04c.6-.36 1.14-.17.7.23L9.04 15.31z"/></svg></a>
<div id="installBar"><div class="ib-ico">📲</div><div class="ib-txt"><b>RsLive Go অ্যাপ নাও</b><span>১ ক্লিকেই ফোনে সেভ হবে ✨</span></div><button class="ib-btn" id="installBtn">ইন্সটল করো</button><span class="ib-close" id="closeInstall">✕</span></div>
`;

const CONFIG_VERSION='v4-pwa-secure';
const DEFAULT={siteName:'RsLive Go',tagline:'LIVE TV • BANGLADESH',telegram:'https://t.me/RsLiveGo',searchPh:'চ্যানেল খুঁজো...',statusText:'✅ মোট {count} টা চ্যানেল - RsLive Go',showLive:true,showTele:true,proxyUrl:'https://stream-through-spark.lovable.app/api/proxy?u=',notice:'',showNotice:false,featName:'',featUrl:'',showFeat:false,playlists:[]};
let saved=null; try{saved=JSON.parse(localStorage.getItem('rslive_config')||'null')}catch(e){}
if(!saved || saved.version!==CONFIG_VERSION || !saved.playlists){ saved=null; localStorage.removeItem('rslive_config'); }
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
function goHome(){ window.location.href=window.location.origin+'/?t='+Date.now(); }
let all=[]; let cat="All"; let _catCache=null; let visibleCount=200; let currentFiltered=[];
async function getPlaylistsFromSW(){ try{ await navigator.serviceWorker.ready; let r=await fetch('/api/playlists'); let data=await r.json(); if(data&&data.length) return data; }catch(e){} return CFG.playlists; }
async function loadOne(p){let u=p.useProxy?CFG.proxyUrl+encodeURIComponent(p.url):p.url; try{let r=await fetch(u);let t=await r.text();return parse(t)}catch(e){return[]}}
function parse(t){let l=t.split("\n"),o=[],c=null;for(let x of l){x=x.trim();if(x.startsWith("#EXTINF")){let n=x.split(",").pop().trim();let lg=x.match(/tvg-logo="([^"]+)"/);let g=x.match(/group-title="([^"]+)"/);c={name:n,logo:lg?lg[1]:"",group:g?g[1]:"General"}}else if(x.startsWith("http")&&c){c.url=x;o.push(c);c=null}}return o}
async function loadAll(){
  CFG.playlists=await getPlaylistsFromSW();
  for(let p of CFG.playlists){let list=await loadOne(p);for(let ch of list){ch.source=p.name;if(!all.find(y=>y.url===ch.url))all.push(ch)}document.getElementById("status").innerHTML=`✅ মোট <b>${all.length}</b> টা চ্যানেল লোড হইছে...`;_catCache=null;renderCats();renderGrid();}document.getElementById("status").innerHTML=CFG.statusText.replace('{count}',`<b>${all.length}</b>`)}
function getCats(){if(_catCache) return _catCache; let sources=[...new Set(CFG.playlists.map(p=>p.name))]; _catCache=["All",...sources,"Sports","News","Entertainment","Movies","Kids","Music","Bangladesh","India"]; return _catCache;}
function catIcon(c){ if(c==='All') return '🏠'; if(c==='Sports') return '🏆'; if(c==='News') return '📰'; if(c==='Entertainment') return '🎭'; if(c==='Movies') return '🎬'; if(c==='Kids') return '🧒'; if(c==='Music') return '🎵'; if(c==='Bangladesh') return '🇧🇩'; if(c==='India') return '🇮🇳'; return '📺'; }
function catCount(c){
  if(!all.length) return 0; let n=0;
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
  return n;
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
  let isDesktop=window.innerWidth>=900; let catsEl=document.getElementById("cats"); if(!catsEl) return;
  if(isDesktop){ catsEl.innerHTML=`<div style="font-family:Poppins;font-size:13px;font-weight:800;padding:2px 6px 12px">✨ ক্যাটাগরি <span style="font-size:11px;background:#2a2a3a;padding:4px 10px;border-radius:20px;float:right">${getCats().length} টা</span></div>`+getCats().map(c=>`<div class="cat ${c===cat?'active':''}" data-cat="${c}">${catIcon(c)} ${c} <span class="cat-count">${catCount(c)}</span></div>`).join(""); }
  else { catsEl.innerHTML=getCats().map(c=>`<div class="cat ${c===cat?'active':''}" data-cat="${c}">${catIcon(c)} ${c} <span class="cat-count">${catCount(c)}</span></div>`).join(""); }
  catsEl.querySelectorAll('.cat').forEach(el=>{ el.onclick=()=>setCat(el.dataset.cat); });
}
function renderGrid(reset=true){
  if(reset) visibleCount=200;
  let q=document.getElementById("search").value.toLowerCase(); currentFiltered=[];
  for(let i=0;i<all.length;i++){ let c=all[i]; if(q && !c.name.toLowerCase().includes(q)) continue; if(!matchesCat(c,cat)) continue; currentFiltered.push(c); }
  let show=currentFiltered.slice(0,visibleCount); let html='';
  for(let i=0;i<show.length;i++){ let c=show[i]; html+=`<div class="card" onclick="openCh('${encodeURIComponent(c.url)}','${encodeURIComponent(c.name)}','${c.source}','${encodeURIComponent(c.group)}')"><img loading="lazy" src="${c.logo||'https://cdn-icons-png.flaticon.com/512/1179/1179069.png'}" onerror="this.src='https://cdn-icons-png.flaticon.com/512/1179/1179069.png'"><p>${c.name}</p><small>${c.group}</small></div>`; }
  document.getElementById("grid").innerHTML=html;
  let wrap=document.getElementById("loadMoreWrap"); let btn=document.getElementById("loadMoreBtn");
  if(currentFiltered.length>visibleCount){ wrap.style.display='block'; btn.textContent=`আরো দেখো ↓  (${visibleCount}/${currentFiltered.length})`; } else { wrap.style.display='none'; }
  if(reset){ let sa=document.getElementById('scrollArea'); if(sa) sa.scrollTop=0; window.scrollTo({top:0}); }
}
function loadMore(){ visibleCount+=200; renderGrid(false); }
function setCat(c){ if(cat===c) return; cat=c; document.querySelectorAll('#cats .cat').forEach(el=>{ el.classList.toggle('active', el.dataset.cat===c); }); renderGrid(true); }
function openCh(u,n,s,g){ window.location.href=`player.html?url=${u}&name=${n}&src=${encodeURIComponent(s)}&group=${g}` }
let _searchT=null; document.getElementById("search").addEventListener("input",()=>{ clearTimeout(_searchT); _searchT=setTimeout(()=>renderGrid(true),80); });
let _rszT=null; window.addEventListener("resize",()=>{ clearTimeout(_rszT); _rszT=setTimeout(renderCats,150); });
loadAll();
(function(){
  function kill(){ try{ document.documentElement.innerHTML=''; }catch(e){} }
  document.addEventListener('contextmenu',e=>{ e.preventDefault(); return false; });
  document.addEventListener('copy',e=>{ e.preventDefault(); return false; });
  document.addEventListener('keydown',e=>{
    let k=(e.key||'').toUpperCase();
    if(e.key==='F12' || (e.ctrlKey && ['U','S','P','C','A'].includes(k)) || (e.ctrlKey && e.shiftKey && ['I','J','C','K'].includes(k))){ e.preventDefault(); kill(); return false; }
  },true);
  var isMobile=/Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
  if(!isMobile && window.innerWidth>768){
    setInterval(()=>{ let w=window.outerWidth-window.innerWidth>200; let h=window.outerHeight-window.innerHeight>200; if(w||h) kill(); },600);
  }
})();
if('serviceWorker' in navigator){ navigator.serviceWorker.register('/sw.js').catch(()=>{}); }
let deferredPrompt=null;
window.addEventListener('beforeinstallprompt',(e)=>{ e.preventDefault(); deferredPrompt=e; if(!window.matchMedia('(display-mode: standalone)').matches){ let bar=document.getElementById('installBar'); if(bar && !localStorage.getItem('rslive_install_closed')){ bar.style.display='flex'; } } });
document.getElementById('installBtn')?.addEventListener('click',async()=>{ if(!deferredPrompt){ alert('ব্রাউজারের Menu (⋮) -> Add to Home Screen এ চাপ দাও'); return; } deferredPrompt.prompt(); let choice=await deferredPrompt.userChoice; if(choice.outcome==='accepted'){ document.getElementById('installBar').style.display='none'; } deferredPrompt=null; });
document.getElementById('closeInstall')?.addEventListener('click',()=>{ document.getElementById('installBar').style.display='none'; localStorage.setItem('rslive_install_closed','1'); });
window.addEventListener('appinstalled',()=>{ document.getElementById('installBar').style.display='none'; });
