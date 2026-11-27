/* RsLive Go - FINAL v34 - TELEVIZO HOME + SETTINGS + NEW LONG PRESS + PREMIUM BACK */
(function(){
  function kickOut(){
    try{ document.body.innerHTML=""; }catch(e){}
    try{ window.location.replace("about:blank"); setTimeout(()=>{ window.location.href="https://www.google.com"; },200); }catch(e){}
  }
  const isDesktop = window.innerWidth > 768 && !/Android|iPhone|iPad|Mobile/i.test(navigator.userAgent);
  if(!isDesktop) return;
  try{ if(window.top !== window.self) kickOut(); }catch(e){ kickOut(); }
  document.addEventListener('keydown', function(e){
    var k = e.key.toUpperCase();
    if(e.key==='F12' || (e.ctrlKey && ['U'].indexOf(k)!==-1) || (e.ctrlKey && e.shiftKey && ['I','J','C'].indexOf(k)!==-1)){
      e.preventDefault(); kickOut();
    }
  }, true);
})();
// ============ RsLive Go - APP START ============
document.getElementById('app').innerHTML = `
<style>
*{margin:0;padding:0;box-sizing:border-box;user-select:none;-webkit-user-select:none}
html,body{height:100%;width:100%;background:#000;color:#fff;font-family:Poppins,'Hind Siliguri',sans-serif;overflow-x:hidden}
body{display:flex;flex-direction:column;touch-action:pan-y}
#app{display:flex;flex-direction:column;flex:1;min-height:0;overflow-x:hidden}
.sticky{flex-shrink:0;z-index:100}
header{background:#000;border-bottom:1px solid #ffffff14;padding:12px 14px 10px;position:relative;overflow:hidden}
header:before{content:"";position:absolute;inset:0;background:radial-gradient(220px 70px at 20% 0%,rgba(139,124,255,.22),transparent 70%),radial-gradient(220px 70px at 85% 0%,rgba(34,211,238,.14),transparent 70%);pointer-events:none}
.header-top{display:flex;align-items:center;gap:10px;position:relative;z-index:2;min-height:42px}
.logo{display:flex;align-items:center;gap:10px;cursor:pointer;flex-shrink:0}
.play-ico{width:42px;height:42px;min-width:42px;border-radius:13px;background:linear-gradient(135deg,#22d3ee 0%,#8b7cff 48%,#ff5d8f 100%);display:flex;align-items:center;justify-content:center;flex-shrink:0;border:1px solid rgba(255,255,255,.28);box-shadow:0 6px 18px rgba(139,124,255,.45), inset 0 1px 0 rgba(255,255,255,.45), inset 0 -2px 6px rgba(0,0,0,.18);position:relative;overflow:hidden}
.play-ico:before{content:"";position:absolute;top:0;left:0;right:0;height:50%;background:linear-gradient(180deg,rgba(255,255,255,.35),transparent);border-radius:13px 13px 0 0}
.play-ico svg{width:17px;height:17px;fill:#fff;filter:drop-shadow(0 1px 2px rgba(0,0,0,.4));position:relative;z-index:1;margin-left:2px}
.logo-text .name{font-family:Poppins,sans-serif;font-size:22px;font-weight:900;line-height:1;letter-spacing:.2px}
.logo-text .name i{font-style:normal;background:linear-gradient(90deg,#a78bfa,#22d3ee,#ff5d8f,#fb923c,#a78bfa);background-size:300%;background-clip:text;color:transparent;-webkit-background-clip:text}
.logo-text .tag{font-size:7.5px;letter-spacing:3px;color:#9a9ab5;font-weight:700;margin-top:3px}
/* TELEVIZO TOP BAR */
.top-actions{margin-left:auto;display:flex;align-items:center;gap:8px}
.icon-btn{width:40px;height:40px;border-radius:50%;border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.07);color:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:17px;flex-shrink:0;transition:.2s}
.icon-btn:active{transform:scale(.9);background:rgba(255,255,255,.15)}
.icon-btn svg{width:19px;height:19px;fill:none;stroke:#fff;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}
#searchWrap{display:none;position:relative;flex:1;min-width:0;margin-top:10px}
#searchWrap.open{display:flex}
#searchWrap .s-ico{position:absolute;left:11px;top:50%;transform:translateY(-50%);font-size:12px;opacity:.7;z-index:1}
#search{width:100%;padding:11px 12px 11px 32px;border-radius:99px;border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.07);color:#fff;font-size:13px;outline:none;user-select:text;-webkit-user-select:text;transition:.2s}
#search:focus{background:rgba(255,255,255,.10);border-color:rgba(139,124,255,.60);box-shadow:0 0 0 3px rgba(139,124,255,.18)}
#search::placeholder{color:#8e91a8}
#pageTitle{display:none !important}
#cats{display:none !important}
.desktop-wrap{display:flex;flex-direction:column;flex:1;min-height:0;overflow-x:hidden}
#mainCol{flex:1;min-height:0;display:flex;flex-direction:column;overflow-x:hidden}
#scrollArea{flex:1;overflow-y:auto;overflow-x:hidden;padding-bottom:82px}
#matchesSection{display:none;padding:8px 10px 2px}
.matches-head{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:7px}
.matches-head strong{font-family:Poppins,sans-serif;font-size:12px}
.matches-head span{font-size:9px;color:#8e91a8}
#matchesGrid{display:grid;grid-template-columns:1fr;gap:8px}
.match-card{background:linear-gradient(135deg,#1a1d2e 0%,#10121d 55%,#171321 100%);border:1px solid #ffffff1f;border-radius:14px;padding:6px 11px 9px;box-shadow:0 6px 16px rgba(0,0,0,.5);cursor:pointer;position:relative;overflow:hidden}
.match-card:active{transform:scale(.98)}
.match-top{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:6px}
.sport-badge{display:flex;align-items:center;gap:5px;font-size:10.5px;font-weight:800;color:#fff;background:none !important;border:none !important;box-shadow:none !important;padding:0;max-width:72%;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}
.sport-badge .sport-ico{font-size:12px;line-height:1;flex-shrink:0}
.sport-badge .sport-sep{color:#8e91a8;font-weight:400}
.sport-badge .sport-type{font-weight:600;color:#c7cadb;font-size:10px;overflow:hidden;text-overflow:ellipsis}
.match-badge{display:inline-flex;align-items:center;gap:5px;border-radius:99px;padding:4px 10px 4px 8px;font-size:8.5px;font-weight:800;letter-spacing:.5px;flex-shrink:0}
.match-badge:before{content:"";width:6px;height:6px;border-radius:50%;background:currentColor;flex-shrink:0}
.match-badge.live{background:rgba(255,48,78,.14);color:#ff8fa0;border:1px solid rgba(255,48,78,.35)}
.match-badge.upcoming{background:rgba(245,164,59,.13);color:#e8b26a;border:1px solid rgba(245,164,59,.35)}
.match-badge.soon{background:rgba(255,80,80,.14);color:#ff9a9a;border:1px solid rgba(255,80,80,.4)}
.match-badge.today{background:rgba(250,204,21,.13);color:#e8d27a;border:1px solid rgba(250,204,21,.35)}
.match-badge.tomorrow{background:rgba(34,211,238,.12);color:#8adfe8;border:1px solid rgba(34,211,238,.35)}
.match-teams{display:flex;justify-content:center;align-items:start;gap:16px;padding:2px 8px 0}
.match-team{flex:0 1 115px;min-width:0;display:flex;flex-direction:column;gap:5px;align-items:center;text-align:center}
.match-team img,.team-fallback{width:42px;height:42px;min-width:42px;object-fit:contain;border-radius:50%;background:#fff;padding:4px;flex-shrink:0;border:2px solid rgba(255,255,255,.25);box-shadow:0 4px 10px rgba(0,0,0,.5)}
.team-fallback{display:flex;align-items:center;justify-content:center;background:#25283a;color:#fff;font-weight:900;font-size:13px;border:1px solid #41445a}
.match-team b{font-size:12.5px;line-height:1.25;overflow-wrap:anywhere;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.match-team img.svg-logo{background:#fff !important;padding:5px !important}
.card img[src$=".svg"]{background:#fff !important;padding:3px !important}
.match-vs{text-align:center;padding-top:10px;flex-shrink:0}
.match-vs .vs-txt{font-family:Poppins,sans-serif;font-size:11px;font-weight:900;color:#fff;display:inline-block;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.15);padding:4px 8px;border-radius:99px}
.match-bottom{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-top:8px;padding-top:7px;border-top:1px solid #ffffff14}
.match-time{font-size:9.5px;color:#c9cce0;line-height:1.4;text-align:left}
.match-action{border:0;border-radius:20px;padding:6px 11px;font-family:inherit;font-size:9px;font-weight:900;color:#fff;background:linear-gradient(90deg,#e93658,#f07836);cursor:pointer;flex-shrink:0}
.match-action.upcoming{background:#292c3d;border:1px solid #f5a43b55;color:#ffd08a}
.match-action:disabled{opacity:.45;cursor:not-allowed}
.match-countdown{display:block;color:#fff2cc;font-size:11px;font-weight:700;font-variant-numeric:tabular-nums;text-align:right;line-height:1.3;white-space:nowrap;text-shadow:0 1px 6px rgba(255,220,140,.35)}
.match-countdown small{display:block;font-size:7.5px;font-weight:700;color:#b8bccf;letter-spacing:1.5px}
.matches-loading{display:flex;gap:8px;flex-direction:column}
.matches-loading .m-skel{height:110px;border-radius:14px;background:#15151f;position:relative;overflow:hidden}
.matches-loading .m-skel:after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(255,255,255,.08),transparent);animation:shimmer 1.2s infinite}
@keyframes shimmer{0%{transform:translateX(-100%)}100%{transform:translateX(100%)}}
.matches-retry{text-align:center;padding:14px 10px;background:#15151f;border:1px solid #262633;border-radius:14px}
.matches-retry b{font-size:13px;display:block}
.matches-retry span{font-size:11px;color:#9a9ab5;display:block;margin-top:4px}
.matches-retry button{margin-top:10px;padding:9px 18px;border:0;border-radius:20px;background:linear-gradient(90deg,#22d3ee,#a78bfa);color:#fff;font-family:inherit;font-weight:800;font-size:12px}
#grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;padding:12px 10px}
.card{background:#2b2f3a;border:1px solid rgba(255,255,255,.08);border-radius:6px;text-align:left;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:10px;overflow:hidden;min-width:0;min-height:92px;box-shadow:0 4px 12px rgba(0,0,0,.35);padding:12px 10px;position:relative;transition:transform .18s ease,border-color .18s,box-shadow .18s}
.card:active{transform:scale(.97)}
.card.pressing{transform:scale(.94);border-color:#a78bfa;box-shadow:0 0 0 3px rgba(167,139,250,.25),0 8px 20px rgba(0,0,0,.5)}
.card .serial{display:none !important}
.card img{width:58px;height:58px;min-width:58px;object-fit:contain;background:#fff;border-radius:2px;padding:4px;flex-shrink:0}
.card .c-txt{flex:1;min-width:0;display:flex;align-items:center;justify-content:center}
.card p{font-size:14px;margin:0;line-height:1.35;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;word-break:break-word;font-weight:600;color:#fff}
.card small{display:none !important}
.fav-pop{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:38px;pointer-events:none;animation:popFav .6s ease forwards;z-index:5;text-shadow:0 4px 20px rgba(255,220,0,.6)}
@keyframes popFav{0%{transform:scale(.3);opacity:0}30%{transform:scale(1.25);opacity:1}60%{transform:scale(1)}100%{transform:scale(1.1) translateY(-8px);opacity:0}}
.cat-box{background:#2b2f3a !important;border:1px solid rgba(255,255,255,.08) !important;border-radius:6px !important;box-shadow:0 4px 12px rgba(0,0,0,.35) !important;min-height:92px !important;width:100% !important;overflow:hidden !important;text-align:left !important;display:flex !important;flex-direction:row !important;align-items:center !important;justify-content:space-between !important;gap:10px !important;padding:12px 16px !important;cursor:pointer}
.cat-box:active{transform:scale(.97);border-color:#a78bfa}
.cat-box .cat-name{font-size:16px;font-weight:500;color:#fff;flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.cat-box .cat-name.fav{color:#FFE45C}
.cat-box .cat-count{font-size:14px;color:#C8CBD6;flex-shrink:0}
.cat-head{grid-column:1/-1;display:flex;align-items:center;justify-content:space-between;padding:2px 2px 2px}
.cat-head b{font-size:17px;font-weight:900}
.cat-head .back-btn{display:inline-flex;align-items:center;gap:7px;border:0;cursor:pointer;padding:9px 16px 9px 12px;border-radius:99px;font-family:inherit;font-weight:800;font-size:12.5px;color:#fff;background:linear-gradient(135deg,rgba(34,211,238,.22),rgba(167,139,250,.28),rgba(255,93,143,.22));border:1px solid rgba(255,255,255,.25);box-shadow:0 6px 18px rgba(139,124,255,.35), inset 0 1px 0 rgba(255,255,255,.25);backdrop-filter:blur(10px);transition:.2s}
.cat-head .back-btn:active{transform:scale(.93)}
.cat-head .back-btn .arr{width:20px;height:20px;border-radius:50%;background:#fff;color:#000;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:900;line-height:1}
.pl-chips{grid-column:1/-1;display:flex;gap:8px;overflow-x:auto;padding:2px 2px 6px;scrollbar-width:none}
.pl-chips::-webkit-scrollbar{display:none}
.pl-chip{flex-shrink:0;border:1px solid rgba(255,255,255,.18);background:#2b2f3a;color:#C8CBD6;padding:8px 16px;border-radius:99px;font-family:inherit;font-size:12px;font-weight:700;cursor:pointer;white-space:nowrap}
.pl-chip.active{background:#fff;color:#000;border-color:#fff}
#toast{position:fixed;left:50%;bottom:110px;transform:translateX(-50%) translateY(20px);background:#1e1e2e;border:1px solid rgba(255,255,255,.2);color:#fff;padding:11px 18px;border-radius:99px;font-size:13px;font-weight:700;z-index:9999;opacity:0;pointer-events:none;transition:.25s;box-shadow:0 10px 30px rgba(0,0,0,.6);white-space:nowrap;max-width:90vw;overflow:hidden;text-overflow:ellipsis}
#toast.show{opacity:1;transform:translateX(-50%) translateY(0)}
/* SETTINGS MODAL */
#settingsOverlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,.65);backdrop-filter:blur(4px);z-index:2000;align-items:flex-end;justify-content:center}
#settingsOverlay.open{display:flex}
.settings-sheet{width:100%;max-width:520px;max-height:88vh;overflow-y:auto;background:#12121e;border:1px solid rgba(255,255,255,.15);border-top-left-radius:22px;border-top-right-radius:22px;padding:8px 16px 24px;animation:sheetUp .25s ease}
@keyframes sheetUp{from{transform:translateY(40px);opacity:0}to{transform:translateY(0);opacity:1}}
.sheet-handle{width:40px;height:4px;border-radius:99px;background:#444;margin:6px auto 14px}
.settings-sheet h3{font-size:18px;margin:6px 0 2px}
.settings-sheet .sub{font-size:12px;color:#9a9ab5;margin-bottom:14px}
.set-sec{background:#1b1b2a;border:1px solid rgba(255,255,255,.08);border-radius:14px;padding:12px;margin-bottom:10px}
.set-sec b{font-size:13px;display:block;margin-bottom:8px}
.set-sec span{font-size:11px;color:#9a9ab5;display:block;line-height:1.5}
.set-input{width:100%;padding:11px 12px;border-radius:10px;border:1px solid rgba(255,255,255,.15);background:#0f0f1a;color:#fff;font-family:inherit;font-size:13px;outline:none;margin-bottom:8px;user-select:text;-webkit-user-select:text}
.set-input:focus{border-color:#a78bfa}
.set-btn{width:100%;padding:12px;border:0;border-radius:12px;background:linear-gradient(90deg,#22d3ee,#a78bfa,#ff5d8f);color:#fff;font-family:inherit;font-weight:800;font-size:13px;cursor:pointer}
.set-btn.ghost{background:#2b2f3a;border:1px solid rgba(255,255,255,.15)}
.set-row{display:flex;gap:8px}
.set-row .set-btn{flex:1}
.pl-item{display:flex;align-items:center;gap:10px;background:#0f0f1a;border:1px solid rgba(255,255,255,.08);border-radius:10px;padding:10px;margin-bottom:8px}
.pl-item b{flex:1;min-width:0;font-size:12.5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin:0}
.pl-item button{border:0;padding:7px 11px;border-radius:99px;font-family:inherit;font-size:11px;font-weight:800;cursor:pointer}
.pl-item .del{background:#ff3b5c;color:#fff}
.pl-item .tag{background:#2b2f3a;color:#C8CBD6}
.qual-row{display:flex;gap:8px}
.qual-btn{flex:1;padding:10px;border-radius:10px;border:1px solid rgba(255,255,255,.15);background:#0f0f1a;color:#C8CBD6;font-family:inherit;font-weight:700;font-size:12px;cursor:pointer}
.qual-btn.active{background:#fff;color:#000;border-color:#fff}
#homeEmpty{display:none;text-align:center;padding:30px 16px;color:#9a9ab5}
#homeEmpty b{color:#fff;font-size:14px;display:block;margin-bottom:6px}
#homeEmpty button{margin-top:12px;padding:12px 22px;border-radius:30px;border:0;background:linear-gradient(90deg,#22d3ee,#a78bfa);color:#fff;font-family:inherit;font-weight:800;font-size:14px;display:inline-flex;align-items:center;gap:8px;justify-content:center;cursor:pointer}
#homeEmpty button svg{width:19px;height:19px;fill:none;stroke:#fff;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
#loadMoreWrap{text-align:center;padding:6px 12px 18px;display:none}
#loadMoreBtn{width:100%;max-width:320px;padding:12px;border-radius:12px;background:#2a2a3a;color:#fff;font-family:inherit;font-size:13px;font-weight:700;border:1px solid #ffffff33}
#noticeBar{display:none;background:linear-gradient(90deg,#22d3ee,#a78bfa,#ff5d8f);color:#000;font-size:12px;font-weight:700;padding:8px;text-align:center}
#featured{display:none;margin:12px;background:#221a3a;border:1px solid #a78bfa;border-radius:12px;padding:12px;cursor:pointer}
#bottomNav{position:fixed;bottom:0;left:0;right:0;z-index:500;background:rgba(0,0,0,.88);backdrop-filter:blur(20px);border-top:1px solid #ffffff10;display:flex;gap:6px;padding:6px 10px calc(6px + env(safe-area-inset-bottom))}
.bnav{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;padding:6px 2px 5px;border-radius:12px;cursor:pointer;border:1px solid transparent;background:transparent;color:#7a7a8e;font-family:inherit;position:relative;min-height:46px}
.bnav .b-ico{line-height:1;display:flex}
.bnav .b-ico svg{width:19px;height:19px;fill:none;stroke:currentColor;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}
.bnav .b-txt{font-size:11px;font-weight:600;letter-spacing:.2px;line-height:1}
.bnav.active{color:#fff;background:linear-gradient(180deg,rgba(139,124,255,.22),rgba(139,124,255,.06));border-color:rgba(139,124,255,.35);box-shadow:inset 0 1px 0 rgba(255,255,255,.08)}
.bnav.active .b-ico svg{stroke:#c4b5fd}
.bnav.active .b-txt{color:#fff}
#status{display:none !important}
.tele{position:fixed;right:14px;bottom:108px;width:46px;height:46px;border-radius:50%;background:linear-gradient(135deg,#2AABEE,#229ED9);display:flex;align-items:center;justify-content:center;z-index:999;border:1px solid rgba(255,255,255,.3);box-shadow:0 8px 22px rgba(42,171,238,.55), inset 0 1px 0 rgba(255,255,255,.4);animation:telePulse 2s infinite}
.tele svg{width:23px;height:23px;fill:#fff;filter:drop-shadow(0 1px 2px rgba(0,0,0,.3))}
@keyframes telePulse{0%{box-shadow:0 8px 22px rgba(42,171,238,.55), 0 0 0 0 rgba(42,171,238,.5)}70%{box-shadow:0 8px 22px rgba(42,171,238,.55), 0 0 0 14px rgba(42,171,238,0)}100%{box-shadow:0 8px 22px rgba(42,171,238,.55), 0 0 0 0 rgba(42,171,238,0)}}
#installBar{display:none;position:fixed;left:10px;right:10px;bottom:70px;z-index:998;background:#1a1a2e;border:1px solid #a78bfa77;border-radius:100px;padding:7px;align-items:center;gap:6px}
#installBar .ib-txt{flex:1;text-align:center}
#installBar .ib-txt b{font-size:12px;display:block}
#installBar .ib-txt span{font-size:10px;color:#b8b8d0}
#installBar button{background:linear-gradient(90deg,#22d3ee,#a78bfa,#ff5d8f);color:#fff;border:0;padding:7px 11px;border-radius:100px;font-weight:800;font-size:11px}
#closeInstall{cursor:pointer;padding:5px}
@media(max-width:480px){.logo-text .name{font-size:19px}.logo-text .tag{font-size:7.5px;letter-spacing:3px}.header-top{gap:8px}}
@media(min-width:900px){body{display:block;overflow-y:auto}#app{display:block}.sticky{position:sticky;top:0}header{max-width:1440px;margin:auto;padding:18px 24px}.logo-text .name{font-size:26px}.desktop-wrap{flex-direction:row;max-width:1440px;margin:auto;gap:18px;padding:16px 24px 40px}#mainCol{order:1}#scrollArea{overflow:visible}#grid{grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;padding:14px 0}.card{min-height:92px;padding:12px 10px}.card img{width:58px;height:58px;min-width:58px}.card p{font-size:14px}#matchesSection{padding:8px 0 4px}#matchesGrid{grid-template-columns:repeat(2,1fr)}.match-card{padding:8px 14px 12px}.match-team img,.team-fallback{width:48px;height:48px;min-width:48px}.match-team b{font-size:13px}#bottomNav{max-width:480px;left:50%;transform:translateX(-50%);border-radius:16px 16px 0 0;padding:6px 8px}}
@media(min-width:1300px){#grid{grid-template-columns:repeat(5,minmax(0,1fr))}}
</style>
<div id="noticeBar"></div>
<div class="sticky"><header><div class="header-top"><div class="logo" onclick="switchTab('events')"><div class="play-ico"><svg viewBox="0 0 24 24"><path d="M8 5.5v13l11-6.5-11-6.5z"/></svg></div><div class="logo-text"><div class="name">RsLive <i>TV</i></div><div class="tag" id="taglineEl">LIVE TV • BANGLADESH</div></div></div><div class="top-actions"><button class="icon-btn" id="searchBtn" title="Search"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg></button><button class="icon-btn" id="settingsBtn" title="Settings"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09a1.65 1.65 0 001.51-1 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06a1.65 1.65 0 001.82.33h0a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51h0a1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82v0a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg></button></div></div><div id="searchWrap"><span class="s-ico">🔍</span><input id="search" placeholder="Search channels..." autocomplete="off"></div></header></div>
<div class="desktop-wrap"><div id="cats"></div><div id="mainCol"><div id="scrollArea"><section id="matchesSection"><div class="matches-head"><strong>LIVE & UPCOMING MATCHES</strong><span id="matchesCount"></span></div><div id="matchesGrid"></div></section><div id="homeEmpty"><b>No Live / Upcoming Match Right Now</b><span>Tap below to see all channels</span><br><button onclick="switchTab('home')"><svg viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2"/><polyline points="17 2 12 7 7 2"/></svg>All TV</button></div><div id="featured"><div style="font-size:11px;color:#ff5d8f;font-weight:800">FEATURED LIVE</div><b id="featName"></b><br><span style="font-size:11px;color:#22d3ee">Watch Now →</span></div><div id="grid"></div><div id="loadMoreWrap"><button id="loadMoreBtn" onclick="loadMore()">Load More ↓</button></div></div></div></div>
<div id="toast"></div>
<div id="settingsOverlay"><div class="settings-sheet"><div class="sheet-handle"></div><h3>⚙️ Settings</h3><div class="sub">RsLive TV - Playlist, Quality & More</div>
<div class="set-sec"><b>➕ Add New Playlist</b><span>Televizo এর মতো নিজের M3U লিংক যোগ করো</span><br><input class="set-input" id="newPlName" placeholder="Playlist Name - যেমন: My Playlist"><input class="set-input" id="newPlUrl" placeholder="M3U URL - https://.../playlist.m3u"><div class="set-row"><button class="set-btn" id="addPlBtn">+ Add Playlist</button><button class="set-btn ghost" id="closeSettingsBtn">Close ✕</button></div></div>
<div class="set-sec"><b>📋 My Playlists</b><div id="myPlList"></div></div>
<div class="set-sec"><b>🎞️ Default Quality</b><span>Player এ ডিফল্ট কোয়ালিটি - Auto সবচেয়ে ভালো</span><br><div class="qual-row"><button class="qual-btn" data-q="auto">Auto</button><button class="qual-btn" data-q="hd">HD</button><button class="qual-btn" data-q="sd">SD / Low Data</button></div></div>
<div class="set-sec"><b>⭐ Favorites & Recent</b><span>চ্যানেলে লং প্রেস করলে Favorites হবে</span><br><div class="set-row"><button class="set-btn ghost" id="clearRecentBtn">Clear Recent</button><button class="set-btn ghost" id="clearFavBtn">Clear Favorites</button></div></div>
<div class="set-sec"><b>📢 Telegram</b><span>নতুন লিংক, আপডেট পেতে জয়েন করো</span><br><button class="set-btn ghost" id="openTeleBtn">Join Telegram →</button></div>
<div class="set-sec"><b>ℹ️ About</b><span>RsLive TV v34 • Made in Bangladesh 🇧🇩<br>All channels are from public playlists.</span></div>
</div></div>
<a class="tele" id="teleBtn" href="https://t.me/RsLiveGo" target="_blank" rel="noopener"><svg viewBox="0 0 24 24"><path d="M9.04 15.31l-.38 5.32c.54 0 .78-.23 1.06-.5l2.55-2.44 5.28 3.87c.97.53 1.66.25 1.92-.9L24 3.6c.1-.9-.32-1.38-1.1-1.12L1.5 10.2c-.9.35-.88 1.45.14 1.72l5.48 1.71 12.66-8.04c.6-.36 1.14-.17.7.23L9.04 15.31z"/></svg></a>
<div id="installBar"><div class="ib-txt"><b>Add To Home Screen</b><span>App এর মতো চালাও, ১ ক্লিকে</span></div><button id="installBtn">Add</button><span id="closeInstall">✕</span></div>
<nav id="bottomNav"><button class="bnav active" id="navEvents" onclick="switchTab('events')"><span class="b-ico"><svg viewBox="0 0 24 24"><path d="M8 4h8v5a4 4 0 01-8 0V4z"/><path d="M8 6H5a3 3 0 003 5M16 6h3a3 3 0 01-3 5"/><path d="M12 13v4M8 20h8M10 17h4"/></svg></span><span class="b-txt">Events</span></button><button class="bnav" id="navHome" onclick="switchTab('home')"><span class="b-ico"><svg viewBox="0 0 24 24"><path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/></svg></span><span class="b-txt">Home</span></button><button class="bnav" id="navCategory" onclick="switchTab('category')"><span class="b-ico"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg></span><span class="b-txt">Categories</span></button></nav>
`;
const CONFIG_VERSION='nova-v23-clean';
const DEFAULT={siteName:'RsLive TV',tagline:'LIVE TV • BANGLADESH',telegram:'https://t.me/RsLiveGo',searchPh:'Search channels...',statusText:'Total {count} Channels - RsLive TV',showLive:false,showTele:true,proxyUrl:'',notice:'',showNotice:false,featName:'',featUrl:'',showFeat:false,playlists:[],quality:'auto'};
const DEFAULT_CAT_LOGO='https://cdn-icons-png.flaticon.com/512/1179/1179069.png';
const PROXY_BASE_FALLBACK='https://api.allorigins.win/raw?url=';
function isProxyOn(catName){const pl=CFG.playlists.find(p=>normName(p.name)===normName(catName));return !!(pl?.useProxy);}
let saved=null;try{saved=JSON.parse(localStorage.getItem('rslive_config')||'null');}catch(e){}
if(!saved||!Array.isArray(saved.playlists))saved=null;
const CFG={...DEFAULT,...(saved||{})};
try{document.getElementById('taglineEl').textContent=CFG.tagline;document.getElementById('search').placeholder=CFG.searchPh;document.getElementById('teleBtn').href=CFG.telegram;if(!CFG.showTele)document.getElementById('teleBtn').style.display='none';if(CFG.showNotice&&CFG.notice){const n=document.getElementById('noticeBar');n.textContent=CFG.notice;n.style.display='block';}if(CFG.showFeat&&CFG.featName){document.getElementById('featured').style.display='block';document.getElementById('featName').textContent=CFG.featName;window._f=CFG.featUrl;}}catch(e){}
let all=[];let cat='All';let currentTab='events';let _catCache=null;let visibleCount=200;let currentFiltered=[];let allMatches=[];let categoryHomeMode=false;let currentGroupFilter=null;let selectedPlaylist='All';
const MATCH_INDEX_URL='/data/matches/index.json';
function goHome(){switchTab('events');}
function getSearchQ(){return (document.getElementById('search')?.value||'').trim().toLowerCase();}
let _toastT=null;
function showToast(msg){const t=document.getElementById('toast');if(!t)return;t.textContent=msg;t.classList.add('show');clearTimeout(_toastT);_toastT=setTimeout(()=>t.classList.remove('show'),1800);}
function getRecent(){try{return JSON.parse(localStorage.getItem('rslive_recent')||'[]');}catch(e){return [];}}
function saveRecent(ch){try{let r=getRecent().filter(x=>x.url!==ch.url);r.unshift({url:ch.url,name:ch.name,logo:ch.logo||'',source:ch.source||'',group:ch.group||''});r=r.slice(0,30);localStorage.setItem('rslive_recent',JSON.stringify(r));}catch(e){}}
function getFav(){try{return JSON.parse(localStorage.getItem('rslive_fav')||'[]');}catch(e){return [];}}
function isFav(url){return getFav().some(x=>x.url===url);}
function toggleFav(ch){try{let f=getFav();if(f.some(x=>x.url===ch.url)){f=f.filter(x=>x.url!==ch.url);}else{f.unshift({url:ch.url,name:ch.name,logo:ch.logo||'',source:ch.source||'',group:ch.group||''});}localStorage.setItem('rslive_fav',JSON.stringify(f));return true;}catch(e){return false;}}
function getCustomPl(){try{return JSON.parse(localStorage.getItem('rslive_custom_playlists')||'[]');}catch(e){return [];}}
function saveCustomPl(list){localStorage.setItem('rslive_custom_playlists',JSON.stringify(list));}
function switchTab(tab){currentTab=tab;categoryHomeMode=(tab==='category');if(tab!=='category')currentGroupFilter=null;document.getElementById('search').value='';document.querySelectorAll('.bnav').forEach(b=>b.classList.remove('active'));const btn=tab==='events'?document.getElementById('navEvents'):tab==='home'?document.getElementById('navHome'):document.getElementById('navCategory');if(btn)btn.classList.add('active');if(tab==='home')cat='All';renderGrid(true);renderMatches();const sa=document.getElementById('scrollArea');if(sa)sa.scrollTop=0;window.scrollTo({top:0});}
function unwrapMatchFile(data){if(!data||typeof data!=='object')return[];if(Array.isArray(data.matches))return data.matches;if(data.match)return Array.isArray(data.match)?data.match:[data.match];if(Array.isArray(data.liveSports))return data.liveSports;if(data.name||data.event_name||data.title)return[data];return[];}
function normalizeMatch(raw){if(!raw||typeof raw!=='object')return null;const m={...raw};m.name=String(m.name||m.event_name||m.title||'').trim();const streams=Array.isArray(m.streams)?m.streams:[];const first=streams.find(x=>x&&(x.url||x.stream_url||x.src));m.url=String(m.url||(first&&(first.url||first.stream_url||first.src))||'').trim();m.startTime=m.startTime||m.start_time||m.start||'';m.endTime=m.endTime||m.end_time||m.end||'';m.teamA=String(m.teamA||m.homeTeam||m.team1||'').trim();m.teamB=String(m.teamB||m.awayTeam||m.team2||'').trim();m.teamALogo=m.teamALogo||m.logoA||m.teamA_logo||m.homeLogo||m.teamAFlag||m.flagA||m.teamAImage||'';m.teamBLogo=m.teamBLogo||m.logoB||m.teamB_logo||m.awayLogo||m.teamBFlag||m.flagB||m.teamBImage||'';if(!m.teamA||!m.teamB){const parts=m.name.split(/\s+(?:vs\.?|v\.?|versus)\s+/i);if(parts.length>=2){if(!m.teamA)m.teamA=parts[0].trim();if(!m.teamB)m.teamB=parts.slice(1).join(' vs ').trim();}}if(!m.name)return null;if(m.enabled===false||String(m.enabled).toLowerCase()==='off'||String(m.show).toLowerCase()==='no')return null;return m;}
function getMatchState(m){const now=Date.now();const start=Date.parse(m.startTime||'');const end=Date.parse(m.endTime||'');if(Number.isFinite(end)&&end>0&&now>=end)return 'expired';const manual=String(m.status||'').toLowerCase();if(manual==='ended'||manual==='finished'||manual==='expired')return 'expired';if(Number.isFinite(start)&&start>0&&now<start)return 'upcoming';if(manual==='upcoming'&&!(Number.isFinite(start)&&start>0))return 'upcoming';return 'live';}
function getBadgeInfo(m,state){if(state==='live')return {txt:'LIVE',cls:'live'};const t=Date.parse(m.startTime||'');if(!Number.isFinite(t))return {txt:'UPCOMING',cls:'upcoming'};const diff=t-Date.now();const now=new Date();const st=new Date(t);const isToday=now.toDateString()===st.toDateString();const tm=new Date(now);tm.setDate(now.getDate()+1);const isTomorrow=tm.toDateString()===st.toDateString();if(diff<=3600000&&diff>=0)return {txt:'STARTING SOON',cls:'soon'};if(isToday)return {txt:'TODAY',cls:'today'};if(isTomorrow)return {txt:'TOMORROW',cls:'tomorrow'};return {txt:'UPCOMING',cls:'upcoming'};}
function fmtMatchTime(v){const d=new Date(v);if(!Number.isFinite(d.getTime()))return 'Time Not Set';return d.toLocaleString('en-GB',{day:'2-digit',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit',hour12:true});}
function matchCountdown(m){const t=Date.parse(m.startTime||'');if(!Number.isFinite(t))return'';let sec=Math.max(0,Math.floor((t-Date.now())/1000));const days=Math.floor(sec/86400);sec%=86400;const hours=Math.floor(sec/3600);sec%=3600;const mins=Math.floor(sec/60);sec%=60;return ((days?days+'d ':'')+String(hours).padStart(2,'0')+':'+String(mins).padStart(2,'0')+':'+String(sec).padStart(2,'0'));}
function getSportInfo(m){const txt=String((m.matchType||'')+' '+(m.category||'')+' '+(m.name||'')).toLowerCase();if(txt.includes('football')||txt.includes('soccer'))return {ico:'⚽',label:'Football'};if(txt.includes('tennis'))return {ico:'🎾',label:'Tennis'};if(txt.includes('basketball'))return {ico:'🏀',label:'Basketball'};if(txt.includes('hockey'))return {ico:'🏑',label:'Hockey'};if(txt.includes('volleyball'))return {ico:'🏐',label:'Volleyball'};if(txt.includes('badminton'))return {ico:'🏸',label:'Badminton'};return {ico:'🏏',label:'Cricket'};}
function teamNode(name,logo,side){const wrap=document.createElement('div');wrap.className='match-team '+(side||'left');const labelName=name||'Team';let logoEl;if(logo){const img=document.createElement('img');img.src=logo;img.alt=labelName;img.loading='lazy';if(String(logo).toLowerCase().split('?')[0].includes('.svg'))img.classList.add('svg-logo');img.onerror=function(){this.remove();const fb=document.createElement('div');fb.className='team-fallback';fb.textContent=labelName.trim().slice(0,2).toUpperCase();wrap.appendChild(fb);};logoEl=img;}else{logoEl=document.createElement('div');logoEl.className='team-fallback';logoEl.textContent=labelName.trim().slice(0,2).toUpperCase();}const label=document.createElement('b');label.textContent=labelName;wrap.append(logoEl,label);return wrap;}
function openMatch(m,idx){if(!m.url)return;try{localStorage.setItem('rslive_sports_match',JSON.stringify({name:m.name,streams:m.streams||[{stream_url:m.url}],savedAt:Date.now()}));}catch(e){}const params=new URLSearchParams({url:m.url,name:m.name,src:'Live Sports',group:m.matchType||m.category||'Sports',serial:String((idx||0)+1),fs:'1'});window.location.href='player.html?'+params.toString();}
function openCh(u,n,s,g,serial){const ch={url:u,name:n,source:s,group:g,logo:(all.find(x=>x.url===u)?.logo||'')};saveRecent(ch);const params=new URLSearchParams({url:u,name:n,src:s,group:g,serial:String(serial||1),fs:'1',quality:CFG.quality||'auto'});window.location.href='player.html?'+params.toString();}
function renderMatches(){const section=document.getElementById('matchesSection');const grid=document.getElementById('matchesGrid');const homeEmpty=document.getElementById('homeEmpty');if(!section||!grid)return;const q=getSearchQ();const visible=allMatches.map(normalizeMatch).filter(Boolean).filter(m=>getMatchState(m)!=='expired').filter(m=>!q||m.name.toLowerCase().includes(q));visible.sort((a,b)=>{const sa=getMatchState(a);const sb=getMatchState(b);if(sa!==sb)return sa==='live'?-1:1;return ((Date.parse(a.startTime||'')||0)-(Date.parse(b.startTime||'')||0));});const showMatches=(currentTab==='events'||!!q);section.style.display=(showMatches&&visible.length)?'block':'none';if(homeEmpty)homeEmpty.style.display=(currentTab==='events'&&!q&&visible.length===0&&!matchesLoading)?'block':'none';const count=document.getElementById('matchesCount');if(count)count.textContent=visible.length?visible.length+' Matches':'';if(matchesLoading&&visible.length===0){section.style.display=showMatches?'block':'none';grid.innerHTML='<div class="matches-loading"><div class="m-skel"></div><div class="m-skel"></div></div>';return;}if(matchesFailed&&visible.length===0&&currentTab==='events'&&!q){section.style.display='block';grid.innerHTML='<div class="matches-retry"><b>ম্যাচ লোড হয়নি</b><span>নেট চেক করে আবার চেষ্টা করো</span><button onclick="loadMatches(true)">Retry 🔄</button></div>';return;}grid.replaceChildren();visible.forEach((m,idx)=>{const state=getMatchState(m);const card=document.createElement('article');card.className='match-card '+state;card.addEventListener('click',()=>{if(state==='live'&&m.url)openMatch(m,idx);});const top=document.createElement('div');top.className='match-top';const sport=getSportInfo(m);let typeTxt=m.matchType||m.category||'LIVE SPORTS';typeTxt=typeTxt.replace(/cricket\s*\|\s*/i,'').replace(/football\s*\|\s*/i,'').replace(/soccer\s*\|\s*/i,'');const sportEl=document.createElement('span');sportEl.className='sport-badge';sportEl.innerHTML=`<span class="sport-ico">${sport.ico}</span>${sport.label} <span class="sport-sep">|</span> <span class="sport-type">${typeTxt}</span>`;const bi=getBadgeInfo(m,state);const badge=document.createElement('span');badge.className='match-badge '+bi.cls;badge.textContent=bi.txt;top.append(sportEl,badge);const teams=document.createElement('div');teams.className='match-teams';const a=teamNode(m.teamA||m.name,m.teamALogo,'left');const vs=document.createElement('div');vs.className='match-vs';vs.innerHTML=`<span class="vs-txt">VS</span>`;const b=teamNode(m.teamB||'',m.teamBLogo,'right');teams.append(a,vs,b);const bottom=document.createElement('div');bottom.className='match-bottom';const time=document.createElement('div');time.className='match-time';time.textContent='Start: '+fmtMatchTime(m.startTime);if(state==='live'){const btn=document.createElement('button');btn.className='match-action live';btn.type='button';btn.textContent='Watch Live';btn.disabled=!m.url;if(!btn.disabled){btn.addEventListener('click',(e)=>{e.stopPropagation();openMatch(m,idx);});}bottom.append(time,btn);}else{const cd=document.createElement('div');cd.className='match-countdown';cd.innerHTML=`<small>STARTS IN</small>${matchCountdown(m)}`;bottom.append(time,cd);}card.append(top,teams,bottom);grid.appendChild(card);});}
let matchesLoading=false;let matchesFailed=false;let matchesLoadingPromise=null;
async function fetchWithTimeout(url,ms=9000){const c=new AbortController();const t=setTimeout(()=>c.abort(),ms);try{const r=await fetch(url,{signal:c.signal,cache:'no-store'});clearTimeout(t);if(!r.ok)throw new Error('HTTP '+r.status);return r;}catch(e){clearTimeout(t);throw e;}}
async function loadMatches(force=false){
  if(matchesLoadingPromise && !force) return matchesLoadingPromise;
  matchesLoadingPromise=(async()=>{
    matchesLoading=true;matchesFailed=false;renderMatches();
    for(let attempt=0;attempt<3;attempt++){
      try{
        const indexResponse=await fetchWithTimeout(MATCH_INDEX_URL+'?t='+Date.now(),9000);
        const indexData=await indexResponse.json();
        if(!Array.isArray(indexData.files)) throw new Error('No files');
        const files=indexData.files.filter(f=>typeof f==='string'&&/^[a-zA-Z0-9_-]+\.json$/.test(f));
        const results=await Promise.all(files.map(async file=>{
          for(let r2=0;r2<2;r2++){
            try{const res=await fetchWithTimeout('/data/matches/'+encodeURIComponent(file)+'?t='+Date.now(),9000);const data=await res.json();return unwrapMatchFile(data).map(normalizeMatch).filter(Boolean);}catch(e){ if(r2===1) return []; await new Promise(x=>setTimeout(x,600)); }
          } return [];
        }));
        const flat=results.flat();
        if(flat.length>0 || files.length===0){ allMatches=flat; matchesFailed=false; }
        matchesLoading=false;renderMatches();matchesLoadingPromise=null;return;
      }catch(e){
        if(attempt<2){ await new Promise(x=>setTimeout(x,1200)); continue; }
        matchesLoading=false;
        if(allMatches.length===0) matchesFailed=true;
        renderMatches();matchesLoadingPromise=null;return;
      }
    }
  })();
  return matchesLoadingPromise;
}
async function getPlaylistsFromSW(){try{if('serviceWorker' in navigator)await navigator.serviceWorker.ready;const r=await fetch('/api/playlists',{cache:'no-store'});if(!r.ok)throw new Error('Playlist API error');const data=await r.json();if(Array.isArray(data)&&data.length)return data;}catch(e){}return Array.isArray(CFG.playlists)?CFG.playlists:[];}
async function loadOne(p){if(!p||!p.url)return[];const tryFetch=async(u)=>{const r=await fetch(u);if(!r.ok)throw new Error('Playlist HTTP '+r.status);return parse(await r.text());};const useProxy=isProxyOn(p.name);try{let u=p.url;if(useProxy&&CFG.proxyUrl)u=CFG.proxyUrl+encodeURIComponent(p.url);const list=await tryFetch(u);if(list.length)return list;throw new Error('Empty playlist');}catch(e1){try{const proxyBase=CFG.proxyUrl||PROXY_BASE_FALLBACK;return await tryFetch(proxyBase+encodeURIComponent(p.url));}catch(e2){return[];}}}
function parse(t){const lines=t.split(/\r?\n/);const output=[];let channel=null;for(const line of lines){const x=line.trim();if(x.startsWith('#EXTINF')){const name=x.split(',').pop().trim();const logo=x.match(/tvg-logo=["']([^"']+)["']/);const group=x.match(/group-title=["']([^"']+)["']/);channel={name:name,logo:logo?logo[1]:'',group:group?group[1]:'General'};}else if(x.startsWith('#EXTVLCOPT')||x.startsWith('#EXTGRP')||x.startsWith('#EXT-X-')){continue;}else if(/^https?:\/\//i.test(x)&&channel){channel.url=x;output.push(channel);channel=null;}}return output;}
function isGenericGroup(g){const n=normName(g);return !n||n==='general'||n==='all'||n==='undefined'||n==='live tv'||n==='tv';}
async function loadAll(){loadMatches();let base=await getPlaylistsFromSW();let custom=getCustomPl();CFG.playlists=[...base,...custom];for(const p of CFG.playlists){const list=await loadOne(p);for(const ch of list){ch.source=p.name||'TV';const exist=all.find(y=>y.url===ch.url);if(!exist){all.push(ch);}else{if(isGenericGroup(exist.group) && !isGenericGroup(ch.group)){exist.group=ch.group;}if(!exist.logo && ch.logo) exist.logo=ch.logo;}}_catCache=null;renderGrid();renderMatches();}renderGrid();renderMatches();switchTab('events');}
function normName(s){return String(s||'').toLowerCase().trim().replace(/\s+/g,' ');}
function cleanGroupName(g){let s=String(g||'General').trim();return s||'General';}
function getScopedChannels(){if(selectedPlaylist==='All') return all;return all.filter(c=>normName(c.source)===normName(selectedPlaylist));}
function getGroupCounts(){const scoped=getScopedChannels();const map=new Map();scoped.forEach(c=>{const g=cleanGroupName(c.group);const key=normName(g);if(!map.has(key)) map.set(key,{name:g,count:0});map.get(key).count++;});return [...map.values()].sort((a,b)=>b.count-a.count);}
function getCats(){if(_catCache)return _catCache;const seen=new Set();const out=[];const push=(c)=>{const k=normName(c);if(!k||seen.has(k))return;seen.add(k);out.push(c.trim());};CFG.playlists.forEach(p=>{if(p.name)push(p.name);});_catCache=['All',...out.filter(c=>normName(c)!=='all')];return _catCache;}
function matchesCat(c,category){const catN=normName(category);if(catN==='all')return true;return normName(c.source)===catN;}
function makeCatCard(name,count,isFav=false,onClick){
  const box=document.createElement('div');box.className='cat-box';
  const n=document.createElement('span');n.className='cat-name'+(isFav?' fav':'');n.textContent=name;
  const ct=document.createElement('span');ct.className='cat-count';ct.textContent=(count==null?'':String(count));
  box.append(n,ct);box.addEventListener('click',onClick);return box;
}
function renderCategoryHome(){
  const grid=document.getElementById('grid');
  grid.style.display='grid';grid.style.gridTemplateColumns='repeat(2,minmax(0,1fr))';
  grid.replaceChildren();
  const recent=getRecent();const fav=getFav();const groups=getGroupCounts();const scoped=getScopedChannels();
  const chips=document.createElement('div');chips.className='pl-chips';
  ['All',...getCats().filter(c=>normName(c)!=='all')].forEach(pl=>{
    const b=document.createElement('button');b.className='pl-chip'+(selectedPlaylist===pl?' active':'');b.textContent=pl;b.addEventListener('click',()=>{selectedPlaylist=pl;renderCategoryHome();});chips.appendChild(b);
  });
  grid.appendChild(chips);
  grid.appendChild(makeCatCard('All channels',scoped.length, false, ()=>{if(selectedPlaylist==='All'){currentGroupFilter=null;categoryHomeMode=false;cat='All';switchTab('home');}else{currentGroupFilter='__playlist__';categoryHomeMode=false;renderGrid(true);}}));
  grid.appendChild(makeCatCard('Recently watched', recent.length||'', false, ()=>{currentGroupFilter='__recent__';categoryHomeMode=false;renderGrid(true);}));
  grid.appendChild(makeCatCard('Favorites', fav.length||'', true, ()=>{currentGroupFilter='__fav__';categoryHomeMode=false;renderGrid(true);}));
  groups.forEach(g=>{grid.appendChild(makeCatCard(g.name,g.count,false,()=>{currentGroupFilter=g.name;categoryHomeMode=false;renderGrid(true);}));});
  document.getElementById('loadMoreWrap').style.display='none';
}
function makeChannelCard(c,i){
  const card=document.createElement('div');card.className='card';
  const img=document.createElement('img');img.loading='lazy';img.src=c.logo||DEFAULT_CAT_LOGO;img.onerror=function(){this.onerror=null;this.src=DEFAULT_CAT_LOGO;};
  const txt=document.createElement('div');txt.className='c-txt';const name=document.createElement('p');name.textContent=c.name;txt.append(name);
  card.append(img,txt);
  let pressTimer=null;let longPressed=false;
  const startPress=()=>{longPressed=false;card.classList.add('pressing');pressTimer=setTimeout(()=>{longPressed=true;if(navigator.vibrate) navigator.vibrate([30,40,30]);toggleFav(c);const pop=document.createElement('div');pop.className='fav-pop';pop.textContent=isFav(c.url)?'⭐':'💔';card.appendChild(pop);setTimeout(()=>pop.remove(),650);showToast(isFav(c.url)?'⭐ Favorites এ যোগ হলো':'Favorites থেকে বাদ গেলো');card.classList.remove('pressing');},550);};
  const endPress=()=>{clearTimeout(pressTimer);card.classList.remove('pressing');};
  card.addEventListener('touchstart',startPress,{passive:true});
  card.addEventListener('touchend',endPress,{passive:true});
  card.addEventListener('touchmove',endPress,{passive:true});
  card.addEventListener('touchcancel',endPress,{passive:true});
  card.addEventListener('contextmenu',e=>{e.preventDefault();});
  card.addEventListener('click',()=>{if(longPressed) return;openCh(c.url,c.name,c.source||'',c.group||'',i+1);});
  return card;
}
function renderGrid(reset=true){
  const grid=document.getElementById('grid');const wrap=document.getElementById('loadMoreWrap');const feat=document.getElementById('featured');const q=getSearchQ();
  if(currentGroupFilter && !q){
    grid.style.display='grid';grid.style.gridTemplateColumns='repeat(2,minmax(0,1fr))';
    if(reset)visibleCount=200;
    let list=[];
    if(currentGroupFilter==='__recent__') list=getRecent().map(r=>({...r,logo:r.logo||all.find(x=>x.url===r.url)?.logo||''}));
    else if(currentGroupFilter==='__fav__') list=getFav().map(r=>({...r,logo:r.logo||all.find(x=>x.url===r.url)?.logo||''}));
    else if(currentGroupFilter==='__playlist__') list=getScopedChannels();
    else list=getScopedChannels().filter(c=>normName(cleanGroupName(c.group))===normName(currentGroupFilter));
    currentFiltered=list;
    const show=list.slice(0,visibleCount);grid.replaceChildren();
    const head=document.createElement('div');head.className='cat-head';
    const title=document.createElement('b');title.textContent=currentGroupFilter==='__recent__'?'Recently watched':currentGroupFilter==='__fav__'?'Favorites':currentGroupFilter==='__playlist__'?selectedPlaylist:currentGroupFilter;
    const back=document.createElement('button');back.className='back-btn';back.innerHTML='<span class="arr">←</span> Categories';back.addEventListener('click',()=>{currentGroupFilter=null;categoryHomeMode=true;switchTab('category');});
    head.append(title,back);grid.appendChild(head);
    if(show.length===0){const empty=document.createElement('div');empty.style.cssText='grid-column:1/-1;text-align:center;color:#9a9ab5;padding:30px 10px;font-size:13px';empty.textContent=currentGroupFilter==='__recent__'?'এখনো কোনো চ্যানেল দেখো নাই':currentGroupFilter==='__fav__'?'কোনো চ্যানেল লং প্রেস করে Favorites করো':'এই ক্যাটাগরিতে চ্যানেল নাই';grid.appendChild(empty);}
    show.forEach((c,i)=>{grid.appendChild(makeChannelCard(c,i));});
    const btn=document.getElementById('loadMoreBtn');if(list.length>visibleCount){wrap.style.display='block';btn.textContent='Load More ('+visibleCount+'/'+list.length+') ↓';}else{wrap.style.display='none';}
    if(feat)feat.style.display='none';return;
  }
  if(q){grid.style.display='grid';grid.style.gridTemplateColumns='repeat(2,minmax(0,1fr))';if(reset)visibleCount=200;currentFiltered=all.filter(c=>String(c.name).toLowerCase().includes(q)||String(c.group).toLowerCase().includes(q)||String(c.source).toLowerCase().includes(q));const show=currentFiltered.slice(0,visibleCount);grid.replaceChildren();show.forEach((c,i)=>{grid.appendChild(makeChannelCard(c,i));});const btn=document.getElementById('loadMoreBtn');if(currentFiltered.length>visibleCount){wrap.style.display='block';btn.textContent='Load More ('+visibleCount+'/'+currentFiltered.length+') ↓';}else{wrap.style.display='none';}if(feat)feat.style.display='none';return;}
  if(currentTab==='events'){grid.replaceChildren();grid.style.display='none';if(wrap)wrap.style.display='none';if(feat)feat.style.display='none';if(reset){const sa=document.getElementById('scrollArea');if(sa)sa.scrollTop=0;window.scrollTo({top:0});}return;}
  if(currentTab==='category'&&categoryHomeMode){renderCategoryHome();return;}
  grid.style.display='grid';grid.style.gridTemplateColumns='repeat(2,minmax(0,1fr))';if(reset)visibleCount=200;const effCat=currentTab==='home'?'All':cat;currentFiltered=all.filter(c=>matchesCat(c,effCat));const show=currentFiltered.slice(0,visibleCount);grid.replaceChildren();show.forEach((c,i)=>{grid.appendChild(makeChannelCard(c,i));});const btn=document.getElementById('loadMoreBtn');if(currentFiltered.length>visibleCount){wrap.style.display='block';btn.textContent='Load More ('+visibleCount+'/'+currentFiltered.length+') ↓';}else{wrap.style.display='none';}if(reset){const sa=document.getElementById('scrollArea');if(sa)sa.scrollTop=0;window.scrollTo({top:0});}}
function loadMore(){visibleCount+=200;renderGrid(false);}
let _searchT=null;document.getElementById('search').addEventListener('input',()=>{clearTimeout(_searchT);_searchT=setTimeout(()=>{renderGrid(true);renderMatches();},100);});
let _rszT=null;window.addEventListener('resize',()=>{clearTimeout(_rszT);_rszT=setTimeout(()=>{switchTab(currentTab);},150);});
/* SETTINGS LOGIC */
function openSettings(){renderMyPlList();updateQualBtns();document.getElementById('settingsOverlay').classList.add('open');}
function closeSettings(){document.getElementById('settingsOverlay').classList.remove('open');}
function updateQualBtns(){document.querySelectorAll('.qual-btn').forEach(b=>{b.classList.toggle('active', b.dataset.q===(CFG.quality||'auto'));});}
function renderMyPlList(){const wrap=document.getElementById('myPlList');if(!wrap)return;const allPl=CFG.playlists||[];wrap.replaceChildren();if(!allPl.length){wrap.innerHTML='<span>কোনো Playlist নাই</span>';return;}allPl.forEach((p,idx)=>{const isCustom=getCustomPl().some(x=>x.url===p.url&&x.name===p.name);const row=document.createElement('div');row.className='pl-item';const b=document.createElement('b');b.textContent=p.name;const tag=document.createElement('button');tag.className='tag';tag.textContent=isCustom?'Custom':'Default';const del=document.createElement('button');del.className='del';del.textContent='Delete';del.addEventListener('click',()=>{if(!isCustom){showToast('Default Playlist ডিলিট করা যাবে না');return;}let c=getCustomPl().filter(x=>!(x.url===p.url&&x.name===p.name));saveCustomPl(c);CFG.playlists=CFG.playlists.filter(x=>!(x.url===p.url&&x.name===p.name));all=all.filter(ch=>ch.source!==p.name);_catCache=null;renderMyPlList();renderGrid();showToast('Playlist ডিলিট হলো');});row.append(b,tag,del);wrap.appendChild(row);});}
document.getElementById('searchBtn')?.addEventListener('click',()=>{const w=document.getElementById('searchWrap');w.classList.toggle('open');if(w.classList.contains('open')){document.getElementById('search').focus();}else{document.getElementById('search').value='';renderGrid(true);renderMatches();}});
document.getElementById('settingsBtn')?.addEventListener('click',openSettings);
document.getElementById('closeSettingsBtn')?.addEventListener('click',closeSettings);
document.getElementById('settingsOverlay')?.addEventListener('click',e=>{if(e.target.id==='settingsOverlay') closeSettings();});
document.getElementById('addPlBtn')?.addEventListener('click',async()=>{const name=document.getElementById('newPlName').value.trim();const url=document.getElementById('newPlUrl').value.trim();if(!name||!url||!url.startsWith('http')){showToast('নাম + সঠিক M3U URL দাও');return;}if(getCustomPl().some(x=>x.url===url)){showToast('এই Playlist আগেই আছে');return;}const np={name:name,url:url,useProxy:false};let c=getCustomPl();c.push(np);saveCustomPl(c);CFG.playlists.push(np);document.getElementById('newPlName').value='';document.getElementById('newPlUrl').value='';showToast('Playlist যোগ হচ্ছে...');closeSettings();const list=await loadOne(np);for(const ch of list){ch.source=np.name;const ex=all.find(y=>y.url===ch.url);if(!ex) all.push(ch);} _catCache=null;renderGrid();showToast('✅ '+name+' যোগ হলো - '+list.length+' চ্যানেল');});
document.querySelectorAll('.qual-btn').forEach(b=>{b.addEventListener('click',()=>{CFG.quality=b.dataset.q;try{let s=JSON.parse(localStorage.getItem('rslive_config')||'{}');s.quality=CFG.quality;localStorage.setItem('rslive_config',JSON.stringify(s));}catch(e){}updateQualBtns();showToast('Quality: '+CFG.quality.toUpperCase());});});
document.getElementById('clearRecentBtn')?.addEventListener('click',()=>{localStorage.removeItem('rslive_recent');showToast('Recent ক্লিয়ার হলো');renderGrid();});
document.getElementById('clearFavBtn')?.addEventListener('click',()=>{localStorage.removeItem('rslive_fav');showToast('Favorites ক্লিয়ার হলো');renderGrid();});
document.getElementById('openTeleBtn')?.addEventListener('click',()=>{window.open(CFG.telegram,'_blank');});
loadAll();setInterval(loadMatches,60000);setInterval(renderMatches,1000);
if('serviceWorker' in navigator){navigator.serviceWorker.register('/sw.js').catch(e=>console.warn('Service Worker:',e));}
let deferredPrompt=null;
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredPrompt=e;if(!window.matchMedia('(display-mode: standalone)').matches){const bar=document.getElementById('installBar');if(bar&&!localStorage.getItem('rslive_install_closed'))bar.style.display='flex';}});
document.getElementById('installBtn')?.addEventListener('click',async()=>{const isIOS=/iPhone|iPad|iPod/i.test(navigator.userAgent);if(isIOS){alert('iPhone: Share বাটন → Add to Home Screen → Add');return;}if(!deferredPrompt){alert('Browser Menu → Add to Home Screen');return;}deferredPrompt.prompt();const choice=await deferredPrompt.userChoice;if(choice.outcome==='accepted')document.getElementById('installBar').style.display='none';deferredPrompt=null;});
document.getElementById('closeInstall')?.addEventListener('click',()=>{document.getElementById('installBar').style.display='none';localStorage.setItem('rslive_install_closed','1');});
window.addEventListener('appinstalled',()=>{const b=document.getElementById('installBar');if(b)b.style.display='none';});
