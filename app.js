// KICK-OUT LOCK
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
.logo-text .name i{font-style:normal;background:linear-gradient(90deg,#22d3ee,#a78bfa,#ff5d8f,#fb923c,#22d3ee);background-size:300% auto;-webkit-background-clip:text;background-clip:text;color:transparent;-webkit-text-fill-color:transparent;animation:shineFlow 3s linear infinite}
@keyframes shineFlow{0%{background-position:0% center}100%{background-position:300% center}}
.logo-text .tag{font-size:8.5px;letter-spacing:3px;color:#9a9ab5;font-weight:700;margin-top:2px}
.live-pill{display:flex;align-items:center;gap:6px;background:rgba(255,45,85,.14);border:1px solid rgba(255,45,85,.35);color:#ff6b81;font-size:10px;font-weight:800;padding:5px 9px;border-radius:20px}
.live-pill i{width:7px;height:7px;background:#ff2d55;border-radius:50%;box-shadow:0 0 0 0 rgba(255,45,85,.7);animation:pulseDot 1.4s infinite}
@keyframes pulseDot{0%{box-shadow:0 0 0 0 rgba(255,45,85,.7)}70%{box-shadow:0 0 0 7px rgba(255,45,85,0)}100%{box-shadow:0 0 0 0 rgba(255,45,85,0)}}
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
#grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;padding:10px 12px}
.card{background:#15151f;border:1px solid #262633;border-radius:16px;padding:14px 6px 12px;text-align:center;cursor:pointer;display:flex;flex-direction:column;align-items:center;justify-content:center;overflow:hidden;min-width:0;min-height:152px}
.card img{width:68px;height:68px;object-fit:contain;background:#fff;border-radius:12px;padding:6px}
.card p{font-size:12px;font-weight:700;margin-top:9px;line-height:1.35;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;min-height:30px;word-break:break-word}
.card small{font-size:9.5px;color:#22d3ee;margin-top:2px}
#grid.sports-mode{grid-template-columns:1fr!important;gap:12px!important;padding:12px!important}
.sports-yt-card{position:relative;background:linear-gradient(180deg,#141421,#0d0d17);border:1px solid rgba(255,255,255,.10);border-radius:18px;overflow:hidden;cursor:pointer;width:100%;box-shadow:0 8px 24px rgba(0,0,0,.35);transition:.2s}
.sports-yt-card:active{transform:scale(.98)}
.sports-yt-card::before{content:"";position:absolute;top:0;left:0;right:0;height:3px;background:var(--sport-grad, linear-gradient(90deg,#22d3ee,#a78bfa,#ff5d8f));opacity:.9}
.sports-yt-card.cricket{--sport-grad:linear-gradient(90deg,#22c55e,#a3e635,#22c55e)}
.sports-yt-card.football{--sport-grad:linear-gradient(90deg,#22d3ee,#3b82f6,#22d3ee)}
.sports-yt-card.basketball{--sport-grad:linear-gradient(90deg,#f97316,#fb923c,#f97316)}
.sports-yt-card.hockey{--sport-grad:linear-gradient(90deg,#60a5fa,#38bdf8,#60a5fa)}
.sports-yt-card.tennis{--sport-grad:linear-gradient(90deg,#facc15,#a3e635,#facc15)}
.sports-yt-card.wwe{--sport-grad:linear-gradient(90deg,#ff2d55,#ff5d8f,#ff2d55)}
.sports-top{padding:11px 12px 0;text-align:center}
.sport-badge{display:inline-flex;align-items:center;gap:7px;padding:5px 12px 5px 6px;border-radius:100px;margin-bottom:6px;border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.06)}
.sport-badge .sport-ico-wrap{width:26px;height:26px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;background:var(--sport-bg,#22d3ee);box-shadow:0 3px 10px rgba(0,0,0,.4)}
.sport-badge .sport-ico-wrap svg{width:15px;height:15px;fill:#fff}
.sport-badge .sport-label{font-size:10.5px;font-weight:800;letter-spacing:1.2px;color:#fff;text-transform:uppercase}
.sport-badge.cricket .sport-ico-wrap{background:linear-gradient(135deg,#22c55e,#16a34a)}
.sport-badge.football .sport-ico-wrap{background:linear-gradient(135deg,#22d3ee,#2563eb)}
.sport-badge.basketball .sport-ico-wrap{background:linear-gradient(135deg,#f97316,#ea580c)}
.sport-badge.hockey .sport-ico-wrap{background:linear-gradient(135deg,#60a5fa,#2563eb)}
.sport-badge.tennis .sport-ico-wrap{background:linear-gradient(135deg,#eab308,#65a30d)}
.sport-badge.wwe .sport-ico-wrap{background:linear-gradient(135deg,#ff2d55,#e11d48)}
.sports-top .league{font-size:9.5px;font-weight:700;letter-spacing:.5px;color:#9ca3af;text-transform:uppercase;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.sports-teams{display:grid;grid-template-columns:1fr 78px 1fr;align-items:center;gap:4px;padding:6px 12px 8px}
.sports-teams .team{display:flex;flex-direction:column;align-items:center;gap:5px;min-width:0;text-align:center}
.sports-teams .team img{width:50px;height:50px;border-radius:14px;background:#fff;padding:4px;object-fit:contain;box-shadow:0 4px 14px rgba(0,0,0,.4)}
.sports-teams .team-name{font-size:12.5px;font-weight:700;color:#fff;line-height:1.2;word-break:break-word;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;min-height:28px}
.sports-teams .vs-wrap{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:5px}
.sports-teams .vs-wrap .badge-live{background:linear-gradient(90deg,#ff2d55,#ff5d8f);color:#fff;font-size:9px;font-weight:900;letter-spacing:1px;padding:5px 12px;border-radius:20px;display:flex;align-items:center;gap:5px;white-space:nowrap;animation:liveGlow 1.8s ease-in-out infinite}
.sports-teams .vs-wrap .badge-live i{width:6px;height:6px;background:#fff;border-radius:50%;animation:liveDot 1.2s infinite}
@keyframes liveGlow{0%,100%{box-shadow:0 0 0 0 rgba(255,45,85,.45)}50%{box-shadow:0 0 12px 2px rgba(255,45,85,.35)}}
@keyframes liveDot{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(.7)}}
.sports-teams .vs-wrap .badge-up{background:rgba(249,115,22,.18);border:1px solid rgba(249,115,22,.45);color:#fdba74;font-size:8.5px;font-weight:800;padding:4px 10px;border-radius:20px;white-space:nowrap}
.sports-teams .vs-wrap .vs-txt{font-size:20px;font-weight:900;font-style:italic;color:#fff;text-shadow:0 2px 10px rgba(167,139,250,.5)}
.sports-bottom{display:flex;align-items:center;justify-content:center;padding:8px 12px;border-top:1px solid rgba(255,255,255,.07);gap:8px;background:rgba(255,255,255,.02)}
.sports-bottom .date{font-size:11.5px;color:#9ca3af;display:flex;align-items:center;gap:6px;white-space:nowrap}
#upModal{position:fixed;inset:0;background:rgba(0,0,0,.72);backdrop-filter:blur(4px);z-index:2000;display:none;align-items:center;justify-content:center;padding:20px}
#upModal.show{display:flex}
.up-sheet{width:100%;max-width:420px;background:#111118;border-radius:22px;border:1px solid rgba(255,255,255,.15);padding:10px 16px 22px;animation:upPop .22s ease;position:relative;box-shadow:0 20px 60px rgba(0,0,0,.6)}
@keyframes upPop{from{transform:scale(.92);opacity:0}to{transform:scale(1);opacity:1}}
.up-close{position:absolute;right:14px;top:14px;width:30px;height:30px;border-radius:50%;background:rgba(255,255,255,.12);display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:13px;z-index:2}
.up-teams{display:grid;grid-template-columns:1fr 60px 1fr;align-items:center;gap:6px;padding:8px 0 12px;text-align:center}
.up-teams img{width:54px;height:54px;background:#fff;border-radius:12px;padding:4px;object-fit:contain;margin:0 auto}
.up-teams .up-name{font-size:13px;font-weight:700;margin-top:6px;line-height:1.2;min-height:30px}
.up-vs{font-size:18px;font-weight:900;font-style:italic;color:#cbd5e1}
.up-count{font-size:22px;font-weight:900;text-align:center;color:#fb923c;letter-spacing:1px}
.up-start{font-size:12px;color:#9ca3af;text-align:center;margin-top:4px}
.up-notify{width:100%;margin-top:16px;padding:13px;border:none;border-radius:14px;background:linear-gradient(90deg,#22d3ee,#a78bfa,#ff5d8f);color:#fff;font-size:14px;font-weight:800;cursor:pointer}
.up-notify.done{background:rgba(31,157,85,.35);border:1px solid rgba(31,157,85,.5);color:#d1fae5}
.up-note{font-size:11px;color:#888;text-align:center;margin-top:10px;line-height:1.5}
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
#grid.sports-mode{grid-template-columns:repeat(2,1fr)!important;gap:12px!important}
.card{border-radius:16px;padding:18px 10px;min-height:170px}
.card img{width:88px;height:88px;border-radius:14px;padding:8px}
.card p{font-size:13px}
}
@media(min-width:1300px){ #grid{grid-template-columns:repeat(6,1fr)} #grid.sports-mode{grid-template-columns:repeat(2,1fr)!important} }
</style>
<div id="noticeBar"></div>
<div class="sticky"><header><div class="top-row"><div class="header-top"><div class="logo" onclick="goHome()"><div class="play-ico">▶</div><div class="logo-text"><div class="name">RsLive <i>Go</i></div><div class="tag" id="taglineEl">LIVE TV • BANGLADESH</div></div></div><div class="live-pill" id="livePill"><i></i> LIVE</div></div><div class="search-wrap"><span class="s-ico">🔍</span><input id="search" placeholder="চ্যানেল খুঁজো..." autocomplete="off"></div></div></header></div>
<div class="desktop-wrap"><div id="cats"></div><div id="mainCol"><div id="scrollArea"><div id="featured"><div style="font-size:11px;color:#ff5d8f;font-weight:800">⭐ FEATURED LIVE</div><b id="featName"></b><br><span style="font-size:11px;color:#22d3ee">এখনই দেখো →</span></div><div id="grid"><div style="grid-column:1/-1;text-align:center;padding:40px;color:#aaa">⏳ চ্যানেল লোড হচ্ছে...</div></div><div id="loadMoreWrap"><button id="loadMoreBtn" onclick="loadMore()">আরো দেখো ↓</button></div></div></div></div>
<div id="status">Loading...</div>
<a class="tele" id="teleBtn" href="https://t.me/RsLiveGo" target="_blank"><svg viewBox="0 0 24 24"><path d="M9.04 15.31l-.38 5.32c.54 0 .78-.23 1.06-.5l2.55-2.44 5.28 3.87c.97.53 1.66.25 1.92-.9L24 3.6c.1-.9-.32-1.38-1.1-1.12L1.5 10.2c-.9.35-.88 1.45.14 1.72l5.48 1.71 12.66-8.04c.6-.36 1.14-.17.7.23L9.04 15.31z"/></svg></a>
<div id="installBar"><div class="ib-ico">📲</div><div class="ib-txt"><b>RsLive Go অ্যাপ নাও</b><span>১ ক্লিকেই ফোনে সেভ হবে ✨</span></div><button class="ib-btn" id="installBtn">ইন্সটল করো</button><span class="ib-close" id="closeInstall">✕</span></div>
<div id="upModal" onclick="if(event.target.id==='upModal') closeUpModal()"><div class="up-sheet"><div class="up-close" onclick="closeUpModal()">✕</div><div id="upModalContent"></div></div></div>
`;
const CONFIG_VERSION='v4-pwa-secure';
const DEFAULT={siteName:'RsLive Go',tagline:'LIVE TV • BANGLADESH',telegram:'https://t.me/RsLiveGo',searchPh:'চ্যানেল খুঁজো...',statusText:'✅ মোট {count} টা চ্যানেল - RsLive Go',showLive:true,showTele:true,proxyUrl:'https://stream-through-spark.lovable.app/api/proxy?u=',notice:'',showNotice:false,featName:'',featUrl:'',showFeat:false,playlists:[
  {name:'Tapmad', url:'https://raw.githubusercontent.com/sm-monirulislam/Tapmad_Auto_Update_Playlist/refs/heads/main/tapmad_sm.m3u', useProxy:false},
  {name:'AynaOTT', url:'https://raw.githubusercontent.com/sm-monirulislam/AynaOTT_Auto_Update_Playlist/refs/heads/main/aynaott.m3u', useProxy:false},
  {name:'JagoBD', url:'https://raw.githubusercontent.com/sm-monirulislam/jago_bd_auto_update_playlist-/refs/heads/main/jago_bd_main.m3u', useProxy:false},
  {name:'Bangladesh', url:'https://iptv-org.github.io/iptv/countries/bd.m3u', useProxy:false}
]};
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
  if(!CFG.playlists || !CFG.playlists.length){ CFG.playlists = DEFAULT.playlists; }
  for(let p of CFG.playlists){let list=await loadOne(p);for(let ch of list){ch.source=p.name;if(!all.find(y=>y.url===ch.url))all.push(ch)}document.getElementById("status").innerHTML=`✅ মোট <b>${all.length}</b> টা চ্যানেল লোড হইছে...`;_catCache=null;renderCats();renderGrid();}document.getElementById("status").innerHTML=CFG.statusText.replace('{count}',`<b>${all.length}</b>`)}
function getCats(){if(_catCache) return _catCache; let sources=[...new Set(CFG.playlists.map(p=>p.name))]; _catCache=["All","🏆 Live Sports",...sources,"Sports","News","Entertainment","Movies","Kids","Music","Bangladesh","India"]; return _catCache;}
function catIcon(c){ if(c==='All') return '🏠'; if(c==='🏆 Live Sports') return '🏆'; if(c==='Sports') return '🏆'; if(c==='News') return '📰'; if(c==='Entertainment') return '🎭'; if(c==='Movies') return '🎬'; if(c==='Kids') return '🧒'; if(c==='Music') return '🎵'; if(c==='Bangladesh') return '🇧🇩'; if(c==='India') return '🇮🇳'; return '📺'; }
function catCount(c){
  if(c==='🏆 Live Sports') return sportsData.length;
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
  if(catName==="🏆 Live Sports") return false;
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
  if(cat==="🏆 Live Sports"){ renderSportsGrid(); return; }
  document.getElementById("grid").classList.remove("sports-mode");
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
function openCh(u,n,s,g){ window.location.href=`player.html?url=${u}&name=${n}&src=${encodeURIComponent(s)}&group=${g}&t=${Date.now()}` }
let _searchT=null; document.getElementById("search").addEventListener("input",()=>{ clearTimeout(_searchT); _searchT=setTimeout(()=>renderGrid(true),80); });
let _rszT=null; window.addEventListener("resize",()=>{ clearTimeout(_rszT); _rszT=setTimeout(renderCats,150); });
let sportsData = [];
async function loadSports(){
  try{
    let r = await fetch('https://raw.githubusercontent.com/sm-monirulislam/Upcoming-and-Live-Sports-Data/main/Sports_data.json?t='+Date.now());
    let j = await r.json();
    sportsData = j.matches || [];
    _catCache = null; renderCats();
    if(cat === "🏆 Live Sports") renderGrid(true);
    checkNotifyMatches();
  }catch(e){ console.log('Sports load fail', e); }
}
function parseStartTime(info, m){
  let s = info.startTime || info.start_time || info.startDate || info.date || info.time || m.startTime || m.start_time || m.date || '';
  if(!s) return null;
  s = String(s).trim();
  let dm = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})(?:\s+(\d{1,2}):(\d{2})(?::(\d{2}))?\s*(AM|PM|am|pm)?)?/);
  if(dm){
    let dd=parseInt(dm[1]), mo=parseInt(dm[2])-1, yy=parseInt(dm[3]);
    let hh=dm[4]?parseInt(dm[4]):0, mm=dm[5]?parseInt(dm[5]):0, ss=dm[6]?parseInt(dm[6]):0;
    let ap=(dm[7]||'').toUpperCase(); if(ap==='PM'&&hh<12) hh+=12; if(ap==='AM'&&hh===12) hh=0;
    return new Date(yy,mo,dd,hh,mm,ss).getTime();
  }
  let t = Date.parse(s);
  if(!isNaN(t)) return t;
  return null;
}
function formatCountdown(ms){
  if(ms<=0) return 'Starting...';
  let sec=Math.floor(ms/1000); let d=Math.floor(sec/86400); sec%=86400; let h=Math.floor(sec/3600); sec%=3600; let m=Math.floor(sec/60); let s=sec%60;
  let pad=n=>String(n).padStart(2,'0');
  if(d>0) return d+'d '+pad(h)+'h '+pad(m)+'m';
  return pad(h)+':'+pad(m)+':'+pad(s);
}
// ===== BEST ICON - Premium SVG, Emoji না =====
const SPORT_SVG = {
  cricket: `<svg viewBox="0 0 24 24"><path d="M20.6 3.4c-1.4-1.4-3.6-1.4-5 0L6 13l-2.6 5.2c-.4.8 0 1.8.8 2.2.8.4 1.8 0 2.2-.8L11.6 17l9.6-9.6c1.4-1.4 1.4-3.6-.6-4zM9.5 15.5l-2 2c-.3.3-.8.3-1.1 0s-.3-.8 0-1.1l2-2c.3-.3.8-.3 1.1 0s.3.8 0 1.1z"/></svg>`,
  football: `<svg viewBox="0 0 24 24"><path d="M12 1.8l4.6 3.3 1.8 5.4-3.3 4.6-1.1 6.1-2 1-2-1-1.1-6.1-3.3-4.6 1.8-5.4L12 1.8zM12 8l1.8 1.3-.7 2.1H10.9L10.2 9.3 12 8z"/></svg>`,
  basketball: `<svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 2.2c1.2 2.6 1.8 5.5 1.9 8.8H10.1c.1-3.3.7-6.2 1.9-8.8zM9.5 4.5c-2.1.8-3.8 2.3-4.8 4.3 1.5.9 3.1 1.4 4.9 1.5-.1-2.1-.1-4-.1-5.8zm5 0c0 1.8 0 3.7-.1 5.8 1.8-.1 3.4-.6 4.9-1.5-1-2-2.7-3.5-4.8-4.3zM4.2 12c0-1 .2-2 .5-2.9 1.7 1 3.6 1.6 5.5 1.7v3.2c-2.2-.1-4.3-.7-6-2zm15.6 0c-1.7 1.3-3.8 1.9-6 2v-3.2c1.9-.1 3.8-.7 5.5-1.7.3.9.5 1.9.5 2.9zm-6 4c-.1 2.5-.7 4.8-1.8 6.8-2.1-.8-3.8-2.3-4.8-4.3 1.5-.9 3.1-1.4 4.9-1.5.6 0 1.1-.6 1.7-1zm2 0c.6.1 1.1.6 1.7 1 1.5.9 3.1 1.4 4.9 1.5-1 2-2.7 3.5-4.8 4.3-1.1-2-1.7-4.3-1.8-6.8z"/></svg>`,
  hockey: `<svg viewBox="0 0 24 24"><path d="M4 2h2.5v14.5c0 1.4 1.1 2.5 2.5 2.5h8.5c1 0 1.8.8 1.8 1.8s-.8 1.8-1.8 1.8H9c-2.8 0-5-2.2-5-5V2zm14.5 4.5c1.4 0 2.5 1.1 2.5 2.5s-1.1 2.5-2.5 2.5-2.5-1.1-2.5-2.5 1.1-2.5 2.5-2.5z"/></svg>`,
  tennis: `<svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm-5.5 3.5c1.8 1 3 3.2 3 6.5s-1.2 5.5-3 6.5A8 8 0 0 1 6 4a8 8 0 0 1 .5 1.5zm11 0A8 8 0 0 1 18 12a8 8 0 0 1-.5 6.5c-1.8-1-3-3.2-3-6.5s1.2-5.5 3-6.5z"/></svg>`,
  wwe: `<svg viewBox="0 0 24 24"><path d="M12 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm-5 6c-1.7 0-3 1.3-3 3 0 1.2.7 2.2 1.7 2.7L4 19c-.2 1 .5 2 1.5 2.2 1 .2 2-.5 2.2-1.5l1.2-4.8c.3.1.7.1 1.1.1h4c.4 0 .8 0 1.1-.1l1.2 4.8c.2 1 1.2 1.7 2.2 1.5 1-.2 1.7-1.2 1.5-2.2l-1.7-5.3c1-.5 1.7-1.5 1.7-2.7 0-1.7-1.3-3-3-3H7z"/></svg>`,
  baseball: `<svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm-4 4c1.2 1.8 1.8 4.2 1.8 6s-.6 4.2-1.8 6A8 8 0 0 1 6 12a8 8 0 0 1 2-6zm8 0A8 8 0 0 1 18 12a8 8 0 0 1-2 6c-1.2-1.8-1.8-4.2-1.8-6s.6-4.2 1.8-6z"/></svg>`,
  trophy: `<svg viewBox="0 0 24 24"><path d="M19 5h-2V3H7v2H5a2 2 0 0 0-2 2c0 2.6 1.9 4.7 4.4 5 .4.1.8.2 1.1.2.3 1.6 1.1 3 2.2 4H8.5A2.5 2.5 0 0 0 6 18.5 2.5 2.5 0 0 0 8.5 21h7A2.5 2.5 0 0 0 18 18.5 2.5 2.5 0 0 0 15.5 16h-2.2c1.1-1 1.9-2.4 2.2-4 .3 0 .7-.1 1.1-.2C19.1 11.7 21 9.6 21 7a2 2 0 0 0-2-2zM5 8a3 3 0 0 1 2-2.8V10c-1.2-.3-2-1.4-2-2zm14 0c0 .6-.8 1.7-2 2V5.2a3 3 0 0 1 2 2.8zM12 18h-1.5a.5.5 0 0 1-.5.5A.5.5 0 0 1 9.5 18H12z"/></svg>`
};
function getSportIcon(m){
  let info = m.eventInfo || {};
  let txt = ((m.event_name||'') + ' ' + (info.league||'') + ' ' + (info.tournament||'') + ' ' + (info.teamA||'') + ' ' + (info.teamB||'') + ' ' + (info.category||'') + ' ' + (info.sport||'')).toLowerCase();
  if(txt.includes('cricket') || txt.includes('ipl') || txt.includes('bpl') || txt.includes('bbl') || txt.includes('psl') || txt.includes('t20') || txt.includes('odi') || txt.includes('asia cup')) return { svg: SPORT_SVG.cricket, label:'Cricket', cls:'cricket' };
  if(txt.includes('football') || txt.includes('soccer') || txt.includes('premier league') || txt.includes('la liga') || txt.includes('serie a') || txt.includes('bundesliga') || txt.includes('ligue 1') || txt.includes('champions league') || txt.includes('fifa') || txt.includes('epl')) return { svg: SPORT_SVG.football, label:'Football', cls:'football' };
  if(txt.includes('basketball') || txt.includes('nba') || txt.includes('wnba') || txt.includes('euroleague') || txt.includes('magic') || txt.includes('pistons') || txt.includes('celtics') || txt.includes('lakers') || txt.includes('warriors')) return { svg: SPORT_SVG.basketball, label:'Basketball', cls:'basketball' };
  if(txt.includes('hockey') || txt.includes('nhl') || txt.includes('ice hockey') || txt.includes('oilers') || txt.includes('golden knights') || txt.includes('bruins') || txt.includes('maple leafs')) return { svg: SPORT_SVG.hockey, label:'Hockey', cls:'hockey' };
  if(txt.includes('tennis') || txt.includes('atp') || txt.includes('wta') || txt.includes('wimbledon') || txt.includes('grand slam')) return { svg: SPORT_SVG.tennis, label:'Tennis', cls:'tennis' };
  if(txt.includes('wwe') || txt.includes('wrestling') || txt.includes('raw') || txt.includes('smackdown') || txt.includes('nxt') || txt.includes('aew') || txt.includes('ufc') || txt.includes('mma') || txt.includes('boxing') || txt.includes('kabaddi')) return { svg: SPORT_SVG.wwe, label: txt.includes('ufc')||txt.includes('mma') ? 'UFC / MMA' : txt.includes('wwe')||txt.includes('nxt') ? 'WWE' : 'Wrestling', cls:'wwe' };
  if(txt.includes('baseball') || txt.includes('mlb')) return { svg: SPORT_SVG.baseball, label:'Baseball', cls:'football' };
  if(txt.includes('golf') || txt.includes('pga')) return { svg: SPORT_SVG.tennis, label:'Golf', cls:'tennis' };
  if(txt.includes('formula') || txt.includes('f1 ') || txt.includes('motogp') || txt.includes('nascar')) return { svg: SPORT_SVG.trophy, label:'Racing', cls:'football' };
  if(txt.includes('badminton')) return { svg: SPORT_SVG.tennis, label:'Badminton', cls:'tennis' };
  if(txt.includes('volleyball')) return { svg: SPORT_SVG.football, label:'Volleyball', cls:'football' };
  if(txt.includes('nfl') || txt.includes('american football')) return { svg: SPORT_SVG.football, label:'NFL', cls:'football' };
  return { svg: SPORT_SVG.trophy, label:'Live Sports', cls:'football' };
}
function renderSportsGrid(){
  let gridEl = document.getElementById("grid");
  gridEl.classList.add("sports-mode");
  let live = sportsData.filter(m => (m.status||'').toUpperCase() === 'LIVE');
  let up = sportsData.filter(m => (m.status||'').toUpperCase() !== 'LIVE');
  let html = '';
  if(!sportsData.length) html = `<div style="grid-column:1/-1;text-align:center;padding:40px;color:#aaa">Loading sports matches...</div>`;
  [...live, ...up].forEach((m) => {
    let isLive = (m.status||'').toUpperCase() === 'LIVE';
    let info = m.eventInfo || {};
    let sIdx = sportsData.indexOf(m);
    let ts = !isLive ? parseStartTime(info, m) : null;
    let league = m.event_name || info.league || info.tournament || 'LIVE SPORTS';
    let dateStr = '';
    if(ts) dateStr = new Date(ts).toLocaleString('en-GB',{day:'2-digit',month:'2-digit',year:'numeric',hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:true}).toUpperCase();
    else if(info.startTime) dateStr = info.startTime;
    let sp = getSportIcon(m);
    html += `<div class="sports-yt-card ${sp.cls}" onclick="openMatch(${sIdx})"><div class="sports-top"><div class="sport-badge ${sp.cls}"><span class="sport-ico-wrap">${sp.svg}</span><span class="sport-label">${sp.label}</span></div><div class="league">${league}</div></div><div class="sports-teams"><div class="team"><img src="${info.teamAFlag||''}" onerror="this.style.display='none'"><div class="team-name">${info.teamA||''}</div></div><div class="vs-wrap">${isLive ? `<div class="badge-live"><i></i> LIVE</div>` : `<div class="badge-up">🕐 UPCOMING</div>`}<div class="vs-txt">VS</div></div><div class="team"><img src="${info.teamBFlag||''}" onerror="this.style.display='none'"><div class="team-name">${info.teamB||''}</div></div></div><div class="sports-bottom"><div class="date">🕐 ${dateStr || ''}</div></div></div>`;
  });
  gridEl.innerHTML = html;
  document.getElementById("loadMoreWrap").style.display = 'none';
}
let _upTimer=null; let _upCurrentIdx=-1;
function closeUpModal(){ let m=document.getElementById('upModal'); if(m) m.classList.remove('show'); if(_upTimer){clearInterval(_upTimer);_upTimer=null;} _upCurrentIdx=-1; }
function getNotifyList(){ try{ return JSON.parse(localStorage.getItem('rslive_notify')||'[]'); }catch(e){ return []; } }
function isNotified(name){ return getNotifyList().includes(name); }
async function setNotify(idx){
  let m=sportsData[idx]; if(!m) return;
  let info=m.eventInfo||{}; let name=info.teamA+' Vs '+info.teamB;
  if('Notification' in window && Notification.permission==='default'){ try{ await Notification.requestPermission(); }catch(e){} }
  let list=getNotifyList();
  if(list.includes(name)){ list=list.filter(x=>x!==name); localStorage.setItem('rslive_notify',JSON.stringify(list)); }
  else { list.push(name); localStorage.setItem('rslive_notify',JSON.stringify(list)); }
  showUpModal(idx);
  let btn=document.getElementById('upNotifyBtn');
  if(btn){ let on=isNotified(name); btn.textContent=on?'✅ Notify On - Tap to Off':'🔔 Notify Me'; btn.classList.toggle('done',on); }
}
function showUpModal(idx){
  let m=sportsData[idx]; if(!m) return;
  _upCurrentIdx=idx;
  let info=m.eventInfo||{}; let name=info.teamA+' Vs '+info.teamB;
  let league=m.event_name||info.league||'LIVE SPORTS';
  let ts=parseStartTime(info,m);
  let dateStr=ts?new Date(ts).toLocaleString('en-GB',{day:'2-digit',month:'2-digit',year:'numeric',hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:true}).toUpperCase():(info.startTime||'');
  let on=isNotified(name);
  document.getElementById('upModalContent').innerHTML=`<div style="text-align:center"><span style="background:#f97316;color:#fff;font-size:11px;font-weight:800;padding:5px 14px;border-radius:20px">🕐 UPCOMING • NOT STARTED YET</span></div><div style="text-align:center;font-size:11px;color:#9ca3af;margin-top:10px">${league}</div><div class="up-teams"><div><img src="${info.teamAFlag||''}" onerror="this.style.display='none'"><div class="up-name">${info.teamA||''}</div></div><div class="up-vs">VS</div><div><img src="${info.teamBFlag||''}" onerror="this.style.display='none'"><div class="up-name">${info.teamB||''}</div></div></div><div style="text-align:center;font-size:12px;color:#aaa">⏳ Match starts in</div><div class="up-count" id="upCount">${ts?formatCountdown(ts-Date.now()):'Soon'}</div><div class="up-start">🕐 ${dateStr}</div><button class="up-notify ${on?'done':''}" id="upNotifyBtn" onclick="setNotify(${idx})">${on?'✅ Notify On - Tap to Off':'🔔 Notify Me'}</button><div class="up-note">Match has not started yet.<br>Video will play automatically when it goes LIVE.<br>Tap Notify Me, we will alert you.</div>`;
  document.getElementById('upModal').classList.add('show');
  if(_upTimer) clearInterval(_upTimer);
  if(ts){
    _upTimer=setInterval(()=>{
      let el=document.getElementById('upCount'); if(!el){ clearInterval(_upTimer); return; }
      let diff=ts-Date.now();
      if(diff<=0){ el.textContent='Starting...'; clearInterval(_upTimer); setTimeout(()=>{ closeUpModal(); loadSports(); },1500); return; }
      el.textContent=formatCountdown(diff);
    },1000);
  }
}
function checkNotifyMatches(){
  let list=getNotifyList(); if(!list.length) return;
  sportsData.forEach(m=>{
    let info=m.eventInfo||{}; let name=info.teamA+' Vs '+info.teamB;
    if(list.includes(name) && (m.status||'').toUpperCase()==='LIVE'){
      if('Notification' in window && Notification.permission==='granted'){
        try{ new Notification('RsLive Go - Match Started!',{body:name+' is now LIVE. Tap to watch.'}); }catch(e){}
      }
    }
  });
}
// ===== LIVE SPORTS - Link না থাকলেও Player এ যাবে, Player নিজে Playlist থেকে খুঁজবে =====
function openMatch(idx){
  let m = sportsData[idx];
  if(!m) return;
  let isLive = (m.status||'').toUpperCase() === 'LIVE';
  if(!isLive){ showUpModal(idx); return; }
  let info = m.eventInfo || {};
  let name = info.teamA + ' Vs ' + info.teamB;
  let streams = m.streams || [];
  try{ localStorage.setItem('rslive_sports_match', JSON.stringify({ name: name, event_name: m.event_name||'', streams: streams, savedAt: Date.now() })); }catch(e){}
  let firstUrl = streams.length ? (streams[0].stream_url || streams[0].url || '') : '';
  let link = `player.html?url=${encodeURIComponent(firstUrl)}&name=${encodeURIComponent(name)}&src=Events&group=Events&fs=1&live=1&t=${Date.now()}`;
  if(streams.length && streams[0].kid && streams[0].key) link += `&kid=${streams[0].kid}&key=${streams[0].key}`;
  window.location.href = link;
}
loadAll();
loadSports();
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
