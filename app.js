/* RsLive Go - v38 FINAL PREMIUM DARK - Header No Icon + No Recent + No Cat Chips + Dark Settings */
(function(){
  const isDesktop = window.innerWidth > 768 && !/Android|iPhone|iPad|Mobile/i.test(navigator.userAgent);
  if(!isDesktop) return;
  try{ if(window.top !== window.self) location.replace("about:blank"); }catch(e){}
  document.addEventListener('keydown',e=>{
    if(e.key==='F12'||(e.ctrlKey&&e.key.toUpperCase()==='U')||(e.ctrlKey&&e.shiftKey&&['I','J','C'].includes(e.key.toUpperCase()))){e.preventDefault();location.replace("about:blank");}
  },true);
})();

document.getElementById('app').innerHTML = `
<style>
*{margin:0;padding:0;box-sizing:border-box;user-select:none;-webkit-user-select:none}
html,body{height:100%;width:100%;background:#000;color:#fff;font-family:Poppins,'Hind Siliguri',sans-serif;overflow-x:hidden}
body{display:flex;flex-direction:column;touch-action:pan-y}
#app{display:flex;flex-direction:column;flex:1;min-height:0}
.sticky{flex-shrink:0;z-index:100}
/* HEADER - NO ICON, TEXT FROM CORNER */
header{background:#000;border-bottom:1px solid #ffffff14;padding:12px 14px 10px}
.header-top{display:flex;align-items:center;gap:10px;min-height:42px}
.logo{display:flex;align-items:center;cursor:pointer;padding-left:2px}
.logo-text .name{font-size:23px;font-weight:900;line-height:1;letter-spacing:.3px;white-space:nowrap}
.logo-text .name i{font-style:normal;color:#fff}
.logo-text .tag{font-size:9px;letter-spacing:2.5px;color:#9a9ab5;font-weight:600;margin-top:4px;white-space:nowrap}
.top-actions{margin-left:auto;display:flex;gap:8px}
.icon-btn{width:40px;height:40px;border-radius:50%;border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.07);color:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer}
.icon-btn:active{transform:scale(.9)}
.icon-btn svg{width:19px;height:19px;fill:none;stroke:#fff;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}
.icon-btn.active{background:#fff}.icon-btn.active svg{stroke:#000}
#searchWrap{display:none;margin-top:10px;position:relative}
#searchWrap.open{display:flex}
#search{width:100%;padding:11px 12px 11px 32px;border-radius:99px;border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.07);color:#fff;font-size:13px;outline:none;user-select:text;-webkit-user-select:text}
#searchWrap .s-ico{position:absolute;left:11px;top:50%;transform:translateY(-50%);font-size:12px;opacity:.7}
.desktop-wrap{display:flex;flex-direction:column;flex:1;min-height:0}
#mainCol{flex:1;min-height:0;display:flex;flex-direction:column}
#scrollArea{flex:1;overflow-y:auto;padding-bottom:82px}
#matchesSection{display:none;padding:8px 10px 2px}
.matches-head{display:flex;justify-content:space-between;margin-bottom:7px}
.matches-head strong{font-size:12px}
.matches-head span{font-size:9px;color:#8e91a8}
#matchesGrid{display:grid;grid-template-columns:1fr;gap:8px}
.match-card{background:linear-gradient(135deg,#1a1d2e,#10121d);border:1px solid #ffffff1f;border-radius:14px;padding:6px 11px 9px;cursor:pointer}
.match-top{display:flex;justify-content:space-between;margin-bottom:6px}
.sport-badge{display:flex;gap:5px;font-size:10.5px;font-weight:800;max-width:72%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.match-badge{display:inline-flex;gap:5px;border-radius:99px;padding:4px 10px;font-size:8.5px;font-weight:800;flex-shrink:0}
.match-badge.live{background:rgba(255,255,255,.08);color:#fff;border:1px solid rgba(255,255,255,.2)}
.match-badge.upcoming{background:rgba(255,255,255,.06);color:#C8CBD6;border:1px solid rgba(255,255,255,.15)}
.match-badge.soon{background:rgba(255,255,255,.08);color:#fff;border:1px solid rgba(255,255,255,.2)}
.match-badge.today{background:rgba(255,255,255,.06);color:#C8CBD6;border:1px solid rgba(255,255,255,.15)}
.match-badge.tomorrow{background:rgba(255,255,255,.06);color:#C8CBD6;border:1px solid rgba(255,255,255,.15)}
.match-teams{display:flex;justify-content:center;gap:16px}
.match-team{flex:0 1 115px;display:flex;flex-direction:column;gap:5px;align-items:center;text-align:center}
.match-team img,.team-fallback{width:42px;height:42px;object-fit:contain;border-radius:50%;background:#fff;padding:4px;border:2px solid rgba(255,255,255,.25)}
.team-fallback{display:flex;align-items:center;justify-content:center;background:#25283a;color:#fff;font-weight:900;font-size:13px;border:1px solid #41445a}
.match-team b{font-size:12.5px;line-height:1.25;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.match-vs{padding-top:10px}.match-vs .vs-txt{font-size:11px;font-weight:900;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.15);padding:4px 8px;border-radius:99px}
.match-bottom{display:flex;justify-content:space-between;gap:8px;margin-top:8px;padding-top:7px;border-top:1px solid #ffffff14}
.match-time{font-size:9.5px;color:#c9cce0}
.match-action{border:0;border-radius:20px;padding:6px 11px;font-size:9px;font-weight:900;color:#000;background:#fff;cursor:pointer}
.match-countdown{color:#fff;font-size:11px;font-weight:700;text-align:right;white-space:nowrap}
.match-countdown small{display:block;font-size:7.5px;color:#b8bccf;letter-spacing:1.5px}
#grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;padding:12px 10px}
.card{background:#1c1c22;border:1px solid rgba(255,255,255,.08);border-radius:10px;cursor:pointer;display:flex;align-items:center;gap:10px;min-height:92px;padding:12px 10px;position:relative;transition:.18s}
.card:active{transform:scale(.97)}
.card.pressing{transform:scale(.94);border-color:#fff;box-shadow:0 0 0 3px rgba(255,255,255,.15)}
.card img{width:58px;height:58px;min-width:58px;object-fit:contain;background:#fff;border-radius:6px;padding:4px}
.card .c-txt{flex:1;min-width:0;display:flex;justify-content:center}
.card p{font-size:14px;line-height:1.35;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;word-break:break-word;font-weight:600}
body.view-list #grid{grid-template-columns:1fr !important;gap:8px}
body.view-list .card{min-height:72px;padding:10px 12px;justify-content:flex-start}
body.view-list .card img{width:48px;height:48px;min-width:48px}
body.view-list .card .c-txt{justify-content:flex-start}
body.view-list .card p{font-size:15px}
body.view-compact #grid{grid-template-columns:repeat(3,minmax(0,1fr)) !important;gap:8px}
body.view-compact .card{min-height:82px;padding:8px 6px;flex-direction:column;gap:6px;text-align:center}
body.view-compact .card img{width:40px;height:40px;min-width:40px}
body.view-compact .card p{font-size:11px;text-align:center;-webkit-line-clamp:1}
.fav-pop{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:38px;pointer-events:none;animation:popFav .6s ease forwards;z-index:5}
@keyframes popFav{0%{transform:scale(.3);opacity:0}30%{transform:scale(1.25);opacity:1}100%{transform:scale(1.1) translateY(-8px);opacity:0}}
.cat-box{background:#1c1c22 !important;border:1px solid rgba(255,255,255,.08) !important;border-radius:10px !important;min-height:96px !important;width:100% !important;display:flex !important;align-items:center !important;justify-content:space-between !important;gap:8px !important;padding:12px !important;cursor:pointer}
.cat-box:active{transform:scale(.97);border-color:#fff}
.cat-box .cat-name{font-size:15px !important;line-height:1.35 !important;font-weight:600 !important;flex:1;min-width:0;white-space:normal !important;display:-webkit-box !important;-webkit-line-clamp:2 !important;-webkit-box-orient:vertical !important;overflow:hidden !important;word-break:break-word !important;overflow-wrap:anywhere !important}
.cat-box .cat-name.fav{color:#FFE45C}
.cat-box .cat-count{font-size:14px;color:#C8CBD6;flex-shrink:0}
.cat-head{grid-column:1/-1;display:flex;align-items:center;justify-content:space-between}
.cat-head b{font-size:17px;font-weight:900}
.cat-head .back-btn{display:inline-flex;align-items:center;gap:6px;border:0;cursor:pointer;padding:7px 12px 7px 7px;border-radius:99px;font-weight:700;font-size:13px;color:#E8E8EE;background:#1E1E2E;border:1px solid rgba(255,255,255,.14)}
.cat-head .back-btn:active{transform:scale(.94)}
.cat-head .back-btn svg{width:16px;height:16px;fill:none;stroke:#fff;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round}
#toast{position:fixed;left:50%;bottom:110px;transform:translateX(-50%) translateY(20px);background:#1e1e2e;border:1px solid rgba(255,255,255,.2);padding:11px 18px;border-radius:99px;font-size:13px;font-weight:700;z-index:9999;opacity:0;pointer-events:none;transition:.25s;white-space:nowrap;max-width:90vw;overflow:hidden;text-overflow:ellipsis}
#toast.show{opacity:1;transform:translateX(-50%) translateY(0)}
/* SETTINGS - DARK PREMIUM ONLY, NO BRIGHT COLOR */
#settingsOverlay{display:none;position:fixed;inset:0;background:#0e0e12;z-index:2000;flex-direction:column;overflow-y:auto}
#settingsOverlay.open{display:flex}
.set-head{display:flex;align-items:center;gap:14px;padding:16px;position:sticky;top:0;background:#0e0e12;z-index:2;border-bottom:1px solid rgba(255,255,255,.08)}
.set-head button{width:38px;height:38px;border-radius:50%;border:0;background:#1c1c22;color:#fff;font-size:20px;cursor:pointer}
.set-head h2{font-size:21px;font-weight:800;letter-spacing:.2px}
.set-body{padding:14px 14px 30px;display:flex;flex-direction:column;gap:12px}
.set-card{background:#17171d;border:1px solid rgba(255,255,255,.07);border-radius:16px;padding:16px}
.set-card b{font-size:15px;display:block}
.set-card span{font-size:12px;color:#9a9ab5;display:block;line-height:1.5;margin-top:3px}
.set-input{width:100%;padding:12px;border-radius:12px;border:1px solid rgba(255,255,255,.12);background:#0e0e12;color:#fff;font-size:13px;outline:none;margin:8px 0;user-select:text;-webkit-user-select:text}
.set-input:focus{border-color:#fff}
.set-btn{width:100%;padding:12px;border:0;border-radius:12px;background:#fff;color:#000;font-weight:800;font-size:13px;cursor:pointer;margin-top:6px}
.set-btn:active{transform:scale(.98)}
.set-btn.ghost{background:#22222a;border:1px solid rgba(255,255,255,.12);color:#fff}
.set-row{display:flex;align-items:center;gap:14px;background:#17171d;border:1px solid rgba(255,255,255,.07);border-radius:16px;padding:16px;cursor:pointer}
.set-row:active{background:#1f1f26}
.set-row .ico{width:36px;height:36px;border-radius:12px;background:#22222a;display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0;border:1px solid rgba(255,255,255,.08)}
.set-row span{flex:1;font-size:15px;font-weight:600}
.set-row small{color:#9a9ab5;font-size:11.5px;display:block;font-weight:400;margin-top:2px}
.toggle{width:52px;height:30px;border-radius:99px;background:#33333d;position:relative;flex-shrink:0;transition:.2s;cursor:pointer;border:1px solid rgba(255,255,255,.1)}
.toggle:after{content:"";position:absolute;top:2px;left:2px;width:24px;height:24px;border-radius:50%;background:#8e8e9a;transition:.2s}
.toggle.on{background:#fff}.toggle.on:after{left:24px;background:#000}
.pl-item{display:flex;align-items:center;gap:10px;background:#0e0e12;border:1px solid rgba(255,255,255,.07);border-radius:12px;padding:11px;margin-top:8px}
.pl-item b{flex:1;min-width:0;font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin:0}
.pl-item button{border:0;padding:7px 11px;border-radius:99px;font-size:11px;font-weight:800;cursor:pointer}
.pl-item .del{background:#2a2a2a;color:#ff6b6b;border:1px solid rgba(255,255,255,.1)}.pl-item .tag{background:#22222a;color:#C8CBD6}
.qual-row{display:flex;gap:8px;margin-top:10px}
.qual-btn{flex:1;padding:11px;border-radius:12px;border:1px solid rgba(255,255,255,.12);background:#0e0e12;color:#C8CBD6;font-weight:700;font-size:12px;cursor:pointer}
.qual-btn.active{background:#fff;color:#000;border-color:#fff}
.set-row2{display:flex;gap:8px}.set-row2 .set-btn{flex:1}
#homeEmpty{display:none;text-align:center;padding:30px 16px;color:#9a9ab5}
#homeEmpty b{color:#fff;font-size:14px;display:block;margin-bottom:6px}
#homeEmpty button{margin-top:12px;padding:12px 22px;border-radius:30px;border:0;background:#fff;color:#000;font-weight:800;font-size:14px;cursor:pointer}
#loadMoreWrap{text-align:center;padding:6px 12px 18px;display:none}
#loadMoreBtn{width:100%;max-width:320px;padding:12px;border-radius:12px;background:#2a2a3a;color:#fff;font-size:13px;font-weight:700;border:1px solid #ffffff33}
#noticeBar{display:none;background:#fff;color:#000;font-size:12px;font-weight:700;padding:8px;text-align:center}
#featured{display:none;margin:12px;background:#17171d;border:1px solid rgba(255,255,255,.12);border-radius:12px;padding:12px;cursor:pointer}
#bottomNav{position:fixed;bottom:0;left:0;right:0;z-index:500;background:rgba(0,0,0,.92);backdrop-filter:blur(20px);border-top:1px solid #ffffff10;display:flex;gap:6px;padding:6px 10px calc(6px + env(safe-area-inset-bottom))}
.bnav{flex:1;display:flex;flex-direction:column;align-items:center;gap:2px;padding:6px 2px 5px;border-radius:12px;cursor:pointer;border:1px solid transparent;background:transparent;color:#7a7a8e;min-height:46px}
.bnav .b-ico svg{width:19px;height:19px;fill:none;stroke:currentColor;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}
.bnav .b-txt{font-size:11px;font-weight:600}
.bnav.active{color:#fff;background:rgba(255,255,255,.08);border-color:rgba(255,255,255,.15)}
.tele{position:fixed;right:14px;bottom:108px;width:46px;height:46px;border-radius:50%;background:#1c1c22;display:flex;align-items:center;justify-content:center;z-index:999;border:1px solid rgba(255,255,255,.2)}
.tele svg{width:23px;height:23px;fill:#fff}
#installBar{display:none;position:fixed;left:10px;right:10px;bottom:70px;z-index:998;background:#17171d;border:1px solid rgba(255,255,255,.15);border-radius:100px;padding:7px;align-items:center;gap:6px}
#installBar .ib-txt{flex:1;text-align:center}#installBar .ib-txt b{font-size:12px;display:block}#installBar .ib-txt span{font-size:10px;color:#b8b8d0}
#installBar button{background:#fff;color:#000;border:0;padding:7px 11px;border-radius:100px;font-weight:800;font-size:11px}
@media(min-width:900px){body{display:block;overflow-y:auto}#app{display:block}.sticky{position:sticky;top:0}header{max-width:1440px;margin:auto}.desktop-wrap{flex-direction:row;max-width:1440px;margin:auto;gap:18px;padding:16px 24px 40px}#mainCol{order:1}#scrollArea{overflow:visible}#grid{grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;padding:14px 0}#matchesGrid{grid-template-columns:repeat(2,1fr)}#bottomNav{max-width:480px;left:50%;transform:translateX(-50%);border-radius:16px 16px 0 0}}
</style>
<div id="noticeBar"></div>
<div class="sticky"><header><div class="header-top"><div class="logo" onclick="switchTab('events')"><div class="logo-text"><div class="name">RsLive <i>Go</i></div><div class="tag" id="taglineEl">LIVE TV • BANGLADESH</div></div></div><div class="top-actions"><button class="icon-btn" id="viewBtn" title="Change View"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg></button><button class="icon-btn" id="searchBtn" title="Search"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg></button><button class="icon-btn" id="settingsBtn" title="Settings"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09a1.65 1.65 0 001.51-1 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06a1.65 1.65 0 001.82.33h0a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51h0a1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82v0a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg></button></div></div><div id="searchWrap"><span class="s-ico">🔍</span><input id="search" placeholder="Search channels..." autocomplete="off"></div></header></div>
<div class="desktop-wrap"><div id="cats"></div><div id="mainCol"><div id="scrollArea"><section id="matchesSection"><div class="matches-head"><strong>LIVE & UPCOMING MATCHES</strong><span id="matchesCount"></span></div><div id="matchesGrid"></div></section><div id="homeEmpty"><b>No Live / Upcoming Match Right Now</b><span>Tap below to see all channels</span><br><button onclick="switchTab('home')">All TV</button></div><div id="featured"><div style="font-size:11px;color:#fff;font-weight:800">FEATURED LIVE</div><b id="featName"></b><br><span style="font-size:11px;color:#C8CBD6">Watch Now →</span></div><div id="grid"></div><div id="loadMoreWrap"><button id="loadMoreBtn" onclick="loadMore()">Load More ↓</button></div></div></div></div>
<div id="toast"></div>
<div id="settingsOverlay"><div class="set-head"><button id="settingsBackBtn">←</button><h2>Settings</h2></div><div class="set-body">
<div class="set-card"><b>➕ Add New Playlist</b><span>নিজের M3U Playlist যোগ করো - সবার উপরে, প্রথম অপশন</span><input class="set-input" id="newPlName" placeholder="Playlist Name - যেমন: My Playlist"><input class="set-input" id="newPlUrl" placeholder="M3U URL - https://.../playlist.m3u"><button class="set-btn" id="addPlBtn">+ Add Playlist</button></div>
<div class="set-row" id="networkStreamRow"><div class="ico">🔗</div><span>Network Stream<small>Paste any M3U / M3U8 / MP4 link & play</small></span><span style="flex:none;color:#9a9ab5;font-size:18px">›</span></div>
<div id="networkStreamBox" style="display:none"><div class="set-card"><b>▶️ Play Any Link Direct</b><span>যেকোনো লিংক পেস্ট করে সরাসরি চালাও - Add করা লাগবে না</span><input class="set-input" id="directUrl" placeholder="https://.../channel.m3u8  বা  .m3u"><input class="set-input" id="directName" placeholder="Channel Name (Optional)"><button class="set-btn" id="playDirectBtn">▶️ Play Now</button></div></div>
<div class="set-row"><div class="ico">📺</div><span>TV Mode<small>TV এর মতো বড় কার্ড, শুধু TV চ্যানেল</small></span><button class="toggle" id="tvModeToggle"></button></div>
<div class="set-row"><div class="ico">🏆</div><span>Events Mode<small>Live & Upcoming Matches দেখাবে</small></span><button class="toggle" id="eventsModeToggle"></button></div>
<div class="set-card"><b>📋 My Playlists</b><span>শুধু তুমি যা Add করছো - এগুলাই Delete করতে পারবা</span><div id="myPlList"></div></div>
<div class="set-card"><b>🎞️ Default Quality</b><span>Player এ ডিফল্ট কোয়ালিটি</span><div class="qual-row"><button class="qual-btn" data-q="auto">Auto</button><button class="qual-btn" data-q="hd">HD</button><button class="qual-btn" data-q="sd">SD</button></div></div>
<div class="set-card"><b>⭐ Favorites</b><span>চ্যানেলে লং প্রেস করলে Favorites হবে</span><div class="set-row2"><button class="set-btn ghost" id="clearFavBtn">Clear Favorites</button><button class="set-btn ghost" id="clearCacheBtn">Clear Cache</button></div></div>
<div class="set-row" id="checkUpdateRow"><div class="ico">↻</div><span>Check for Update<small>নতুন ভার্সন আছে কিনা চেক করো</small></span></div>
<div class="set-row" id="teleRow"><div class="ico">✈</div><span>Telegram<small>নতুন লিংক, আপডেট পেতে জয়েন করো</small></span></div>
<div class="set-row" id="aboutRow"><div class="ico">i</div><span>About<small>RsLive Go v38 • Made in Bangladesh 🇧🇩</small></span></div>
</div></div>
<a class="tele" id="teleBtn" href="https://t.me/RsLiveGo" target="_blank" rel="noopener"><svg viewBox="0 0 24 24"><path d="M9.04 15.31l-.38 5.32c.54 0 .78-.23 1.06-.5l2.55-2.44 5.28 3.87c.97.53 1.66.25 1.92-.9L24 3.6c.1-.9-.32-1.38-1.1-1.12L1.5 10.2c-.9.35-.88 1.45.14 1.72l5.48 1.71 12.66-8.04c.6-.36 1.14-.17.7.23L9.04 15.31z"/></svg></a>
<div id="installBar"><div class="ib-txt"><b>Add To Home Screen</b><span>App এর মতো চালাও</span></div><button id="installBtn">Add</button><span id="closeInstall">✕</span></div>
<nav id="bottomNav"><button class="bnav active" id="navEvents" onclick="switchTab('events')"><span class="b-ico"><svg viewBox="0 0 24 24"><path d="M8 4h8v5a4 4 0 01-8 0V4z"/><path d="M8 6H5a3 3 0 003 5M16 6h3a3 3 0 01-3 5"/><path d="M12 13v4M8 20h8M10 17h4"/></svg></span><span class="b-txt">Events</span></button><button class="bnav" id="navHome" onclick="switchTab('home')"><span class="b-ico"><svg viewBox="0 0 24 24"><path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/></svg></span><span class="b-txt">Home</span></button><button class="bnav" id="navCategory" onclick="switchTab('category')"><span class="b-ico"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg></span><span class="b-txt">Categories</span></button></nav>
`;
const DEFAULT={siteName:'RsLive Go',tagline:'LIVE TV • BANGLADESH',telegram:'https://t.me/RsLiveGo',searchPh:'Search channels...',showTele:true,proxyUrl:'',notice:'',showNotice:false,featName:'',featUrl:'',showFeat:false,playlists:[],quality:'auto'};
const DEFAULT_CAT_LOGO='https://cdn-icons-png.flaticon.com/512/1179/1179069.png';
const PROXY_BASE_FALLBACK='https://api.allorigins.win/raw?url=';
let saved=null;try{saved=JSON.parse(localStorage.getItem('rslive_config')||'null');}catch(e){}
if(!saved||!Array.isArray(saved.playlists))saved=null;
const CFG={...DEFAULT,...(saved||{})};
try{document.getElementById('taglineEl').textContent=CFG.tagline;document.getElementById('search').placeholder=CFG.searchPh;document.getElementById('teleBtn').href=CFG.telegram;if(!CFG.showTele)document.getElementById('teleBtn').style.display='none';if(CFG.showNotice&&CFG.notice){const n=document.getElementById('noticeBar');n.textContent=CFG.notice;n.style.display='block';}if(CFG.showFeat&&CFG.featName){document.getElementById('featured').style.display='block';document.getElementById('featName').textContent=CFG.featName;}}catch(e){}
let all=[];let cat='All';let currentTab='events';let _catCache=null;let visibleCount=200;let currentFiltered=[];let allMatches=[];let categoryHomeMode=false;let currentGroupFilter=null;
let currentView=localStorage.getItem('rslive_view')||'grid';
let tvMode=localStorage.getItem('rslive_tv_mode')==='1';
let eventsMode=localStorage.getItem('rslive_events_mode')!=='0';
const MATCH_INDEX_URL='/data/matches/index.json';
function getSearchQ(){return (document.getElementById('search')?.value||'').trim().toLowerCase();}
let _toastT=null;
function showToast(m){const t=document.getElementById('toast');if(!t)return;t.textContent=m;t.classList.add('show');clearTimeout(_toastT);_toastT=setTimeout(()=>t.classList.remove('show'),1800);}
function applyView(){document.body.classList.remove('view-grid','view-list','view-compact');document.body.classList.add('view-'+currentView);localStorage.setItem('rslive_view',currentView);}
function applyModes(){document.getElementById('tvModeToggle')?.classList.toggle('on',tvMode);document.getElementById('eventsModeToggle')?.classList.toggle('on',eventsMode);const ev=document.getElementById('navEvents');if(ev)ev.style.display=eventsMode?'flex':'none';if(tvMode)document.body.classList.add('view-list');else applyView();}
function getFav(){try{return JSON.parse(localStorage.getItem('rslive_fav')||'[]');}catch(e){return [];}}
function isFav(u){return getFav().some(x=>x.url===u);}
function toggleFav(ch){try{let f=getFav();if(f.some(x=>x.url===ch.url))f=f.filter(x=>x.url!==ch.url);else f.unshift({url:ch.url,name:ch.name,logo:ch.logo||'',source:ch.source||'',group:ch.group||''});localStorage.setItem('rslive_fav',JSON.stringify(f));return true;}catch(e){return false;}}
function getCustomPl(){try{return JSON.parse(localStorage.getItem('rslive_custom_playlists')||'[]');}catch(e){return [];}}
function saveCustomPl(l){localStorage.setItem('rslive_custom_playlists',JSON.stringify(l));}
function switchTab(tab){
  if(tab==='events'&&!eventsMode){showToast('Events Mode OFF - Settings থেকে ON করো');tab='home';}
  currentTab=tab;categoryHomeMode=(tab==='category');if(tab!=='category')currentGroupFilter=null;
  document.getElementById('search').value='';document.querySelectorAll('.bnav').forEach(b=>b.classList.remove('active'));
  const btn=tab==='events'?document.getElementById('navEvents'):tab==='home'?document.getElementById('navHome'):document.getElementById('navCategory');
  if(btn)btn.classList.add('active');if(tab==='home')cat='All';renderGrid(true);renderMatches();
  const sa=document.getElementById('scrollArea');if(sa)sa.scrollTop=0;window.scrollTo({top:0});
}
function normName(s){return String(s||'').toLowerCase().trim().replace(/\s+/g,' ');}
function cleanGroupName(g){return String(g||'General').trim()||'General';}
function isGenericGroup(g){const n=normName(g);return !n||['general','all','undefined','live tv','tv'].includes(n);}
function isProxyOn(n){const p=CFG.playlists.find(x=>normName(x.name)===normName(n));return !!(p?.useProxy);}
function unwrapMatchFile(d){if(!d||typeof d!=='object')return[];if(Array.isArray(d.matches))return d.matches;if(d.match)return Array.isArray(d.match)?d.match:[d.match];if(Array.isArray(d.liveSports))return d.liveSports;if(d.name||d.event_name||d.title)return[d];return[];}
function normalizeMatch(r){if(!r||typeof r!=='object')return null;const m={...r};m.name=String(m.name||m.event_name||m.title||'').trim();const st=Array.isArray(m.streams)?m.streams:[];const f=st.find(x=>x&&(x.url||x.stream_url||x.src));m.url=String(m.url||(f&&(f.url||f.stream_url||f.src))||'').trim();m.startTime=m.startTime||m.start_time||m.start||'';m.endTime=m.endTime||m.end_time||m.end||'';m.teamA=String(m.teamA||m.homeTeam||m.team1||'').trim();m.teamB=String(m.teamB||m.awayTeam||m.team2||'').trim();m.teamALogo=m.teamALogo||m.logoA||m.homeLogo||m.teamAFlag||'';m.teamBLogo=m.teamBLogo||m.logoB||m.awayLogo||m.teamBFlag||'';if(!m.teamA||!m.teamB){const p=m.name.split(/\s+(?:vs\.?|v\.?|versus)\s+/i);if(p.length>=2){if(!m.teamA)m.teamA=p[0].trim();if(!m.teamB)m.teamB=p.slice(1).join(' vs ').trim();}}if(!m.name)return null;return m;}
function getMatchState(m){const now=Date.now();const s=Date.parse(m.startTime||'');const e=Date.parse(m.endTime||'');if(Number.isFinite(e)&&e>0&&now>=e)return 'expired';if(Number.isFinite(s)&&s>0&&now<s)return 'upcoming';return 'live';}
function getBadgeInfo(m,state){if(state==='live')return{txt:'LIVE',cls:'live'};const t=Date.parse(m.startTime||'');if(!Number.isFinite(t))return{txt:'UPCOMING',cls:'upcoming'};const diff=t-Date.now();const now=new Date();const st=new Date(t);if(diff<=3600000&&diff>=0)return{txt:'STARTING SOON',cls:'soon'};if(now.toDateString()===st.toDateString())return{txt:'TODAY',cls:'today'};const tm=new Date(now);tm.setDate(now.getDate()+1);if(tm.toDateString()===st.toDateString())return{txt:'TOMORROW',cls:'tomorrow'};return{txt:'UPCOMING',cls:'upcoming'};}
function fmtMatchTime(v){const d=new Date(v);if(!Number.isFinite(d.getTime()))return 'Time Not Set';return d.toLocaleString('en-GB',{day:'2-digit',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit',hour12:true});}
function matchCountdown(m){const t=Date.parse(m.startTime||'');if(!Number.isFinite(t))return'';let sec=Math.max(0,Math.floor((t-Date.now())/1000));const d=Math.floor(sec/86400);sec%=86400;const h=Math.floor(sec/3600);sec%=3600;const mi=Math.floor(sec/60);sec%=60;return((d?d+'d ':'')+String(h).padStart(2,'0')+':'+String(mi).padStart(2,'0')+':'+String(sec).padStart(2,'0'));}
function getSportInfo(m){const t=String((m.matchType||'')+' '+(m.category||'')+' '+(m.name||'')).toLowerCase();if(t.includes('football')||t.includes('soccer'))return{ico:'⚽',label:'Football'};if(t.includes('tennis'))return{ico:'🎾',label:'Tennis'};if(t.includes('basketball'))return{ico:'🏀',label:'Basketball'};if(t.includes('hockey'))return{ico:'🏑',label:'Hockey'};return{ico:'🏏',label:'Cricket'};}
function teamNode(name,logo){const w=document.createElement('div');w.className='match-team';const ln=name||'Team';let el;if(logo){const img=document.createElement('img');img.src=logo;img.alt=ln;img.loading='lazy';img.onerror=function(){this.remove();const fb=document.createElement('div');fb.className='team-fallback';fb.textContent=ln.trim().slice(0,2).toUpperCase();w.appendChild(fb);};el=img;}else{el=document.createElement('div');el.className='team-fallback';el.textContent=ln.trim().slice(0,2).toUpperCase();}const lb=document.createElement('b');lb.textContent=ln;w.append(el,lb);return w;}
function openMatch(m,idx){if(!m.url)return;try{localStorage.setItem('rslive_sports_match',JSON.stringify({name:m.name,streams:m.streams||[{stream_url:m.url}],savedAt:Date.now()}));}catch(e){}const p=new URLSearchParams({url:m.url,name:m.name,src:'Live Sports',group:m.matchType||m.category||'Sports',serial:String((idx||0)+1),fs:'1'});location.href='player.html?'+p.toString();}
function openCh(u,n,s,g,serial){const params=new URLSearchParams({url:u,name:n,src:s,group:g,serial:String(serial||1),fs:'1',quality:CFG.quality||'auto'});location.href='player.html?'+params.toString();}
let matchesLoading=false,matchesFailed=false,matchesLoadingPromise=null;
async function fetchWithTimeout(url,ms=9000){const c=new AbortController();const t=setTimeout(()=>c.abort(),ms);try{const r=await fetch(url,{signal:c.signal,cache:'no-store'});clearTimeout(t);if(!r.ok)throw new Error('HTTP '+r.status);return r;}catch(e){clearTimeout(t);throw e;}}
async function loadMatches(force=false){
  if(matchesLoadingPromise&&!force)return matchesLoadingPromise;
  matchesLoadingPromise=(async()=>{
    matchesLoading=true;matchesFailed=false;renderMatches();
    try{const ir=await fetchWithTimeout(MATCH_INDEX_URL+'?t='+Date.now(),9000);const id=await ir.json();if(!Array.isArray(id.files))throw new Error('No files');const files=id.files.filter(f=>typeof f==='string'&&/^[a-zA-Z0-9_-]+\.json$/.test(f));const res=await Promise.all(files.map(async file=>{try{const r=await fetchWithTimeout('/data/matches/'+encodeURIComponent(file)+'?t='+Date.now(),9000);const d=await r.json();return unwrapMatchFile(d).map(normalizeMatch).filter(Boolean);}catch(e){return [];}}));allMatches=res.flat();matchesLoading=false;renderMatches();}
    catch(e){matchesLoading=false;if(!allMatches.length)matchesFailed=true;renderMatches();}
    matchesLoadingPromise=null;
  })();return matchesLoadingPromise;
}
function renderMatches(){
  const sec=document.getElementById('matchesSection');const grid=document.getElementById('matchesGrid');const he=document.getElementById('homeEmpty');if(!sec||!grid)return;
  const q=getSearchQ();const vis=allMatches.map(normalizeMatch).filter(Boolean).filter(m=>getMatchState(m)!=='expired').filter(m=>!q||m.name.toLowerCase().includes(q));
  vis.sort((a,b)=>{const sa=getMatchState(a),sb=getMatchState(b);if(sa!==sb)return sa==='live'?-1:1;return((Date.parse(a.startTime||'')||0)-(Date.parse(b.startTime||'')||0));});
  const show=(currentTab==='events'||!!q)&&eventsMode;sec.style.display=(show&&vis.length)?'block':'none';
  if(he)he.style.display=(currentTab==='events'&&!q&&vis.length===0&&!matchesLoading&&eventsMode)?'block':'none';
  const cnt=document.getElementById('matchesCount');if(cnt)cnt.textContent=vis.length?vis.length+' Matches':'';
  if(matchesLoading&&!vis.length){sec.style.display=show?'block':'none';grid.innerHTML='<div style="padding:20px;text-align:center;color:#9a9ab5">Loading matches...</div>';return;}
  grid.replaceChildren();
  vis.forEach((m,idx)=>{
    const state=getMatchState(m);const card=document.createElement('article');card.className='match-card';card.addEventListener('click',()=>{if(state==='live'&&m.url)openMatch(m,idx);});
    const top=document.createElement('div');top.className='match-top';const sp=getSportInfo(m);let tt=m.matchType||m.category||'LIVE SPORTS';tt=tt.replace(/cricket\s*\|\s*/i,'').replace(/football\s*\|\s*/i,'');
    const se=document.createElement('span');se.className='sport-badge';se.innerHTML=`<span>${sp.ico}</span>${sp.label} | <span style="color:#c7cadb">${tt}</span>`;
    const bi=getBadgeInfo(m,state);const badge=document.createElement('span');badge.className='match-badge '+bi.cls;badge.textContent=bi.txt;top.append(se,badge);
    const teams=document.createElement('div');teams.className='match-teams';teams.append(teamNode(m.teamA||m.name,m.teamALogo),(()=>{const v=document.createElement('div');v.className='match-vs';v.innerHTML='<span class="vs-txt">VS</span>';return v;})(),teamNode(m.teamB||'',m.teamBLogo));
    const bot=document.createElement('div');bot.className='match-bottom';const tm=document.createElement('div');tm.className='match-time';tm.textContent='Start: '+fmtMatchTime(m.startTime);
    if(state==='live'){const b=document.createElement('button');b.className='match-action';b.textContent='Watch Live';b.disabled=!m.url;if(!b.disabled)b.addEventListener('click',e=>{e.stopPropagation();openMatch(m,idx);});bot.append(tm,b);}
    else{const cd=document.createElement('div');cd.className='match-countdown';cd.innerHTML=`<small>STARTS IN</small>${matchCountdown(m)}`;bot.append(tm,cd);}
    card.append(top,teams,bot);grid.appendChild(card);
  });
}
async function getPlaylistsFromSW(){try{if('serviceWorker' in navigator)await navigator.serviceWorker.ready;const r=await fetch('/api/playlists',{cache:'no-store'});if(!r.ok)throw new Error('Playlist API');const d=await r.json();if(Array.isArray(d)&&d.length)return d;}catch(e){}return Array.isArray(CFG.playlists)?CFG.playlists:[];}
async function loadOne(p){if(!p||!p.url)return[];const tf=async(u)=>{const r=await fetch(u);if(!r.ok)throw new Error('HTTP '+r.status);return parse(await r.text());};const up=isProxyOn(p.name);try{let u=p.url;if(up&&CFG.proxyUrl)u=CFG.proxyUrl+encodeURIComponent(p.url);const l=await tf(u);if(l.length)return l;throw new Error('Empty');}catch(e1){try{return await tf((CFG.proxyUrl||PROXY_BASE_FALLBACK)+encodeURIComponent(p.url));}catch(e2){return [];}}}
function parse(t){const lines=t.split(/\r?\n/);const out=[];let ch=null;for(const line of lines){const x=line.trim();if(x.startsWith('#EXTINF')){const name=x.split(',').pop().trim();const logo=x.match(/tvg-logo=["']([^"']+)["']/);const group=x.match(/group-title=["']([^"']+)["']/);ch={name,logo:logo?logo[1]:'',group:group?group[1]:'General'};}else if(/^https?:\/\//i.test(x)&&ch){ch.url=x;out.push(ch);ch=null;}}return out;}
async function loadAll(){
  localStorage.removeItem('rslive_recent');
  loadMatches();
  let base=await getPlaylistsFromSW();let custom=getCustomPl();CFG.playlists=[...base,...custom];
  for(const p of CFG.playlists){
    const list=await loadOne(p);
    for(const ch of list){ch.source=p.name||'TV';const ex=all.find(y=>y.url===ch.url);if(!ex)all.push(ch);else{if(isGenericGroup(ex.group)&&!isGenericGroup(ch.group))ex.group=ch.group;if(!ex.logo&&ch.logo)ex.logo=ch.logo;}}
    _catCache=null;renderGrid();renderMatches();
  }
  renderGrid();renderMatches();switchTab(eventsMode?'events':'home');
}
function getGroupCounts(){const map=new Map();all.forEach(c=>{const g=cleanGroupName(c.group);const k=normName(g);if(!map.has(k))map.set(k,{name:g,count:0});map.get(k).count++;});return [...map.values()].sort((a,b)=>b.count-a.count);}
function getCats(){if(_catCache)return _catCache;const seen=new Set();const out=[];CFG.playlists.forEach(p=>{if(p.name){const k=normName(p.name);if(!seen.has(k)){seen.add(k);out.push(p.name.trim());}}});_catCache=['All',...out.filter(c=>normName(c)!=='all')];return _catCache;}
function matchesCat(c,category){return normName(category)==='all'?true:normName(c.source)===normName(category);}
function makeCatCard(name,count,isFavFlag,onClick){
  const box=document.createElement('div');box.className='cat-box';
  const n=document.createElement('span');n.className='cat-name'+(isFavFlag?' fav':'');n.textContent=name;
  const ct=document.createElement('span');ct.className='cat-count';ct.textContent=(count==null?'':String(count));
  box.append(n,ct);box.addEventListener('click',onClick);return box;
}
function renderCategoryHome(){
  const grid=document.getElementById('grid');grid.style.display='grid';grid.style.gridTemplateColumns='repeat(2,minmax(0,1fr))';grid.replaceChildren();
  const fav=getFav();const groups=getGroupCounts();
  // NO CHIPS HERE - Categories এর উপরের লিস্ট বাদ
  grid.appendChild(makeCatCard('All channels',all.length,false,()=>{currentGroupFilter=null;categoryHomeMode=false;cat='All';switchTab('home');}));
  grid.appendChild(makeCatCard('Favorites',fav.length||'',true,()=>{currentGroupFilter='__fav__';categoryHomeMode=false;renderGrid(true);}));
  groups.forEach(g=>{grid.appendChild(makeCatCard(g.name,g.count,false,()=>{currentGroupFilter=g.name;categoryHomeMode=false;renderGrid(true);}));});
  document.getElementById('loadMoreWrap').style.display='none';
}
function makeChannelCard(c,i){
  const card=document.createElement('div');card.className='card';
  const img=document.createElement('img');img.loading='lazy';img.src=c.logo||DEFAULT_CAT_LOGO;img.onerror=function(){this.onerror=null;this.src=DEFAULT_CAT_LOGO;};
  const txt=document.createElement('div');txt.className='c-txt';const name=document.createElement('p');name.textContent=c.name;txt.append(name);card.append(img,txt);
  let pressTimer=null,longPressed=false;
  const startPress=()=>{longPressed=false;card.classList.add('pressing');pressTimer=setTimeout(()=>{longPressed=true;if(navigator.vibrate)navigator.vibrate([30,40,30]);toggleFav(c);const pop=document.createElement('div');pop.className='fav-pop';pop.textContent=isFav(c.url)?'⭐':'💔';card.appendChild(pop);setTimeout(()=>pop.remove(),650);showToast(isFav(c.url)?'⭐ Favorites এ যোগ হলো':'Favorites থেকে বাদ গেলো');card.classList.remove('pressing');},550);};
  const endPress=()=>{clearTimeout(pressTimer);card.classList.remove('pressing');};
  card.addEventListener('touchstart',startPress,{passive:true});card.addEventListener('touchend',endPress,{passive:true});card.addEventListener('touchmove',endPress,{passive:true});card.addEventListener('touchcancel',endPress,{passive:true});
  card.addEventListener('contextmenu',e=>e.preventDefault());
  card.addEventListener('click',()=>{if(longPressed)return;openCh(c.url,c.name,c.source||'',c.group||'',i+1);});
  return card;
}
function renderGrid(reset=true){
  const grid=document.getElementById('grid');const wrap=document.getElementById('loadMoreWrap');const feat=document.getElementById('featured');const q=getSearchQ();
  if(currentGroupFilter&&!q){
    grid.style.display='grid';grid.style.gridTemplateColumns='repeat(2,minmax(0,1fr))';if(reset)visibleCount=200;
    let list=[];
    if(currentGroupFilter==='__fav__')list=getFav().map(r=>({...r,logo:r.logo||all.find(x=>x.url===r.url)?.logo||''}));
    else list=all.filter(c=>normName(cleanGroupName(c.group))===normName(currentGroupFilter));
    currentFiltered=list;const show=list.slice(0,visibleCount);grid.replaceChildren();
    const head=document.createElement('div');head.className='cat-head';
    const title=document.createElement('b');title.textContent=currentGroupFilter==='__fav__'?'Favorites':currentGroupFilter;
    const back=document.createElement('button');back.className='back-btn';back.innerHTML='<svg viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg> Categories';back.addEventListener('click',()=>{currentGroupFilter=null;categoryHomeMode=true;switchTab('category');});
    head.append(title,back);grid.appendChild(head);
    if(!show.length){const em=document.createElement('div');em.style.cssText='grid-column:1/-1;text-align:center;color:#9a9ab5;padding:30px 10px;font-size:13px';em.textContent=currentGroupFilter==='__fav__'?'কোনো চ্যানেল লং প্রেস করে Favorites করো':'এই ক্যাটাগরিতে চ্যানেল নাই';grid.appendChild(em);}
    show.forEach((c,i)=>grid.appendChild(makeChannelCard(c,i)));
    const btn=document.getElementById('loadMoreBtn');if(list.length>visibleCount){wrap.style.display='block';btn.textContent='Load More ('+visibleCount+'/'+list.length+') ↓';}else wrap.style.display='none';
    if(feat)feat.style.display='none';return;
  }
  if(q){grid.style.display='grid';grid.style.gridTemplateColumns='repeat(2,minmax(0,1fr))';if(reset)visibleCount=200;currentFiltered=all.filter(c=>String(c.name).toLowerCase().includes(q)||String(c.group).toLowerCase().includes(q)||String(c.source).toLowerCase().includes(q));const show=currentFiltered.slice(0,visibleCount);grid.replaceChildren();show.forEach((c,i)=>grid.appendChild(makeChannelCard(c,i)));const btn=document.getElementById('loadMoreBtn');if(currentFiltered.length>visibleCount){wrap.style.display='block';btn.textContent='Load More ('+visibleCount+'/'+currentFiltered.length+') ↓';}else wrap.style.display='none';if(feat)feat.style.display='none';return;}
  if(currentTab==='events'){grid.replaceChildren();grid.style.display='none';if(wrap)wrap.style.display='none';if(feat)feat.style.display='none';if(reset){const sa=document.getElementById('scrollArea');if(sa)sa.scrollTop=0;window.scrollTo({top:0});}return;}
  if(currentTab==='category'&&categoryHomeMode){renderCategoryHome();return;}
  grid.style.display='grid';grid.style.gridTemplateColumns='repeat(2,minmax(0,1fr))';if(reset)visibleCount=200;const effCat=currentTab==='home'?'All':cat;currentFiltered=all.filter(c=>matchesCat(c,effCat));const show=currentFiltered.slice(0,visibleCount);grid.replaceChildren();show.forEach((c,i)=>grid.appendChild(makeChannelCard(c,i)));const btn=document.getElementById('loadMoreBtn');if(currentFiltered.length>visibleCount){wrap.style.display='block';btn.textContent='Load More ('+visibleCount+'/'+currentFiltered.length+') ↓';}else wrap.style.display='none';if(reset){const sa=document.getElementById('scrollArea');if(sa)sa.scrollTop=0;window.scrollTo({top:0});}
}
function loadMore(){visibleCount+=200;renderGrid(false);}
let _searchT=null;document.getElementById('search').addEventListener('input',()=>{clearTimeout(_searchT);_searchT=setTimeout(()=>{renderGrid(true);renderMatches();},100);});
window.addEventListener('resize',()=>{setTimeout(()=>switchTab(currentTab),150);});
function openSettings(){renderMyPlList();updateQualBtns();applyModes();document.getElementById('settingsOverlay').classList.add('open');}
function closeSettings(){document.getElementById('settingsOverlay').classList.remove('open');}
function updateQualBtns(){document.querySelectorAll('.qual-btn').forEach(b=>b.classList.toggle('active',b.dataset.q===(CFG.quality||'auto')));}
function renderMyPlList(){
  const wrap=document.getElementById('myPlList');if(!wrap)return;wrap.replaceChildren();
  const custom=getCustomPl();
  if(!custom.length)wrap.innerHTML='<span style="font-size:11px;color:#9a9ab5">এখনো নিজের Playlist Add করো নাই</span>';
  else custom.forEach(p=>{const row=document.createElement('div');row.className='pl-item';const b=document.createElement('b');b.textContent=p.name;const tag=document.createElement('button');tag.className='tag';tag.textContent='Yours';const del=document.createElement('button');del.className='del';del.textContent='Delete';del.addEventListener('click',()=>{let c=getCustomPl().filter(x=>!(x.url===p.url&&x.name===p.name));saveCustomPl(c);CFG.playlists=CFG.playlists.filter(x=>!(x.url===p.url&&x.name===p.name));all=all.filter(ch=>ch.source!==p.name);_catCache=null;renderMyPlList();renderGrid();showToast('Playlist ডিলিট হলো');});row.append(b,tag,del);wrap.appendChild(row);});
  // NOTE: Default / Built-in Playlist এখানে শো করবে না - ইচ্ছা করে বাদ দেওয়া
}
document.getElementById('viewBtn')?.addEventListener('click',()=>{if(tvMode){showToast('TV Mode ON - Settings থেকে OFF করো');return;}currentView=currentView==='grid'?'list':currentView==='list'?'compact':'grid';applyView();showToast(currentView==='grid'?'▦ Grid View':currentView==='list'?'☰ List View':'⊞ Compact View');renderGrid(false);});
document.getElementById('searchBtn')?.addEventListener('click',()=>{const w=document.getElementById('searchWrap');w.classList.toggle('open');if(w.classList.contains('open'))document.getElementById('search').focus();else{document.getElementById('search').value='';renderGrid(true);renderMatches();}});
document.getElementById('settingsBtn')?.addEventListener('click',openSettings);
document.getElementById('settingsBackBtn')?.addEventListener('click',closeSettings);
document.getElementById('networkStreamRow')?.addEventListener('click',()=>{const b=document.getElementById('networkStreamBox');b.style.display=b.style.display==='none'?'block':'none';});
document.getElementById('tvModeToggle')?.addEventListener('click',()=>{tvMode=!tvMode;localStorage.setItem('rslive_tv_mode',tvMode?'1':'0');applyModes();showToast(tvMode?'TV Mode ON':'TV Mode OFF');renderGrid();});
document.getElementById('eventsModeToggle')?.addEventListener('click',()=>{eventsMode=!eventsMode;localStorage.setItem('rslive_events_mode',eventsMode?'1':'0');applyModes();showToast(eventsMode?'Events Mode ON':'Events Mode OFF');renderMatches();if(!eventsMode&&currentTab==='events')switchTab('home');});
document.getElementById('checkUpdateRow')?.addEventListener('click',()=>{showToast('Checking...');setTimeout(()=>showToast('✅ তুমি Latest Version এ আছো - v38'),800);});
document.getElementById('aboutRow')?.addEventListener('click',()=>{showToast('RsLive Go v38 • Made in Bangladesh 🇧🇩');});
document.getElementById('teleRow')?.addEventListener('click',()=>{window.open(CFG.telegram,'_blank');});
document.getElementById('playDirectBtn')?.addEventListener('click',async()=>{
  const url=document.getElementById('directUrl').value.trim();const name=document.getElementById('directName').value.trim()||'Direct Channel';
  if(!url||!url.startsWith('http')){showToast('সঠিক লিংক দাও');return;}
  closeSettings();showToast('লোড হচ্ছে...');
  if(url.toLowerCase().includes('.m3u')&&!url.toLowerCase().includes('.m3u8')){try{const r=await fetch(url);const txt=await r.text();const list=parse(txt);if(!list.length){showToast('Playlist এ চ্যানেল পাই নাই');return;}const f=list[0];openCh(f.url,f.name,'Direct',f.group||'',1);}catch(e){showToast('লিংক খুলে নাই');}}
  else openCh(url,name,'Direct','Direct',1);
});
document.getElementById('addPlBtn')?.addEventListener('click',async()=>{
  const name=document.getElementById('newPlName').value.trim();const url=document.getElementById('newPlUrl').value.trim();
  if(!name||!url||!url.startsWith('http')){showToast('নাম + সঠিক M3U URL দাও');return;}
  if(getCustomPl().some(x=>x.url===url)){showToast('এই Playlist আগেই আছে');return;}
  const np={name,url,useProxy:false};let c=getCustomPl();c.push(np);saveCustomPl(c);CFG.playlists.push(np);
  document.getElementById('newPlName').value='';document.getElementById('newPlUrl').value='';showToast('Playlist যোগ হচ্ছে...');closeSettings();
  const list=await loadOne(np);for(const ch of list){ch.source=np.name;const ex=all.find(y=>y.url===ch.url);if(!ex)all.push(ch);}
  _catCache=null;renderGrid();showToast('✅ '+name+' যোগ হলো - '+list.length+' চ্যানেল');
});
document.querySelectorAll('.qual-btn').forEach(b=>{b.addEventListener('click',()=>{CFG.quality=b.dataset.q;try{let s=JSON.parse(localStorage.getItem('rslive_config')||'{}');s.quality=CFG.quality;localStorage.setItem('rslive_config',JSON.stringify(s));}catch(e){}updateQualBtns();showToast('Quality: '+CFG.quality.toUpperCase());});});
document.getElementById('clearFavBtn')?.addEventListener('click',()=>{localStorage.removeItem('rslive_fav');showToast('Favorites ক্লিয়ার হলো');renderGrid();});
document.getElementById('clearCacheBtn')?.addEventListener('click',()=>{localStorage.removeItem('rslive_fav');showToast('Cache ক্লিয়ার - Reload হচ্ছে...');setTimeout(()=>location.reload(),800);});
applyView();applyModes();loadAll();setInterval(loadMatches,60000);setInterval(renderMatches,1000);
if('serviceWorker' in navigator){navigator.serviceWorker.register('/sw.js').catch(e=>{});}
let deferredPrompt=null;
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredPrompt=e;if(!window.matchMedia('(display-mode: standalone)').matches){const bar=document.getElementById('installBar');if(bar&&!localStorage.getItem('rslive_install_closed'))bar.style.display='flex';}});
document.getElementById('installBtn')?.addEventListener('click',async()=>{if(/iPhone|iPad|iPod/i.test(navigator.userAgent)){alert('iPhone: Share → Add to Home Screen');return;}if(!deferredPrompt){alert('Browser Menu → Add to Home Screen');return;}deferredPrompt.prompt();const ch=await deferredPrompt.userChoice;if(ch.outcome==='accepted')document.getElementById('installBar').style.display='none';deferredPrompt=null;});
document.getElementById('closeInstall')?.addEventListener('click',()=>{document.getElementById('installBar').style.display='none';localStorage.setItem('rslive_install_closed','1');});
