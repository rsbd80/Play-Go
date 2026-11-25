/* RsLive Go - app.js - FULL - Events from Sports_data.json */
let ALL_CHANNELS = [];
let EVENTS_DATA = [];
let CURRENT_TAB = 'home';
let CURRENT_CAT = '';

const EVENTS_URL = 'https://raw.githubusercontent.com/sm-monirulislam/Upcoming-and-Live-Sports-Data/refs/heads/main/Sports_data.json';

const CAT_META = {
  sports: { title: 'Sports', logo: 'https://cdn-icons-png.flaticon.com/512/857/857681.png', desc: 'Cricket, Football, Live Match' },
  news: { title: 'News', logo: 'https://cdn-icons-png.flaticon.com/512/330/330442.png', desc: 'Bangla & World News' },
  movies: { title: 'Movies', logo: 'https://cdn-icons-png.flaticon.com/512/3163/3163478.png', desc: 'Cinema, Films' },
  kids: { title: 'Kids', logo: 'https://cdn-icons-png.flaticon.com/512/3098/3098090.png', desc: 'Cartoon & Kids' },
  music: { title: 'Music', logo: 'https://cdn-icons-png.flaticon.com/512/727/727239.png', desc: 'Songs & Music' },
  bangla: { title: 'Bangla', logo: 'https://flagcdn.com/w320/bd.png', desc: 'Bangladeshi Channels' },
  entertainment: { title: 'Entertainment', logo: 'https://cdn-icons-png.flaticon.com/512/2103/2103791.png', desc: 'Drama, Shows' },
  general: { title: 'General', logo: 'https://cdn-icons-png.flaticon.com/512/1179/1179069.png', desc: 'All Other Channels' }
};

function cleanName(n){ return (n||'').replace(/\(.*?\)/g,'').replace(/\[.*?\]/g,'').replace(/HD|FHD|4K|1080p|720p/gi,'').replace(/\s+/g,' ').trim(); }
function getCategory(name, group){
  const t = ((name||'') + ' ' + (group||'')).toLowerCase();
  if(t.includes('sport') || t.includes('cricket') || t.includes('football') || t.includes('t sports') || t.includes('star sports') || t.includes('sony sports') || t.includes('ptv sports') || t.includes('live') || t.includes('vs')) return 'sports';
  if(t.includes('news') || t.includes('somoy') || t.includes('jamuna') || t.includes('dbc') || t.includes('independent') || t.includes('atn news') || t.includes('channel 24') || t.includes('ekattor') || t.includes('ndtv') || t.includes('aaj tak')) return 'news';
  if(t.includes('movie') || t.includes('cinema') || t.includes('film') || t.includes('star gold') || t.includes('zee cinema')) return 'movies';
  if(t.includes('kid') || t.includes('cartoon') || t.includes('chutti') || t.includes('disney') || t.includes('pogo') || t.includes('nick')) return 'kids';
  if(t.includes('music') || t.includes('song') || t.includes('mtv') || t.includes('9xm')) return 'music';
  if(t.includes('bangla') || t.includes('btv') || t.includes('channel i') || t.includes('ntv') || t.includes('maasranga') || t.includes('gazi') || t.includes('jalsha') || t.includes('zee bangla')) return 'bangla';
  if(t.includes('star') || t.includes('sony') || t.includes('zee') || t.includes('colors') || t.includes('entertainment')) return 'entertainment';
  return 'general';
}
function parseM3U(text, srcName){
  const lines = text.split('\n'); let out=[]; let cur=null;
  for(let line of lines){ line=line.trim();
    if(line.startsWith('#EXTINF')){ const name=line.split(',').pop().trim(); const logo=(line.match(/tvg-logo="([^"]+)"/)||[])[1]||''; const group=(line.match(/group-title="([^"]+)"/)||[])[1]||'General'; cur={name, logo, group, src:srcName}; }
    else if(line.startsWith('http') && cur){ cur.url=line; cur.cat=getCategory(cur.name, cur.group); out.push(cur); cur=null; }
  }
  return out;
}
async function loadAll(){
  try{
    const res = await fetch('/api/playlists'); const pls = await res.json();
    for(let p of pls){ try{ const r = await fetch(p.url); const t = await r.text(); const chs = parseM3U(t, p.name); chs.forEach(c=>c.useProxy=p.useProxy); ALL_CHANNELS.push(...chs); }catch(e){} }
    const seen=new Set(); ALL_CHANNELS = ALL_CHANNELS.filter(c=>{ if(seen.has(c.url)) return false; seen.add(c.url); return true; });
    renderHome(); renderCategories();
  }catch(e){ document.getElementById('homeGrid').innerHTML='<div class="empty">লোড হয় নাই</div>'; }
  loadEvents(); // Events আলাদা JSON থেকে, Playlist এর উপর নির্ভর না
}
function cardHTML(c, isLive){
  const logo = c.logo || 'https://cdn-icons-png.flaticon.com/512/1179/1179069.png';
  return `<div class="card" onclick="openChannel('${encodeURIComponent(c.url)}','${encodeURIComponent(c.name)}','${encodeURIComponent(c.src)}','${encodeURIComponent(c.group)}')">${isLive?'<span class="live-badge">● LIVE</span>':''}<img src="${logo}" onerror="this.src='https://cdn-icons-png.flaticon.com/512/1179/1179069.png'"><p>${cleanName(c.name)}</p></div>`;
}
function openChannel(url, name, src, group){ location.href = 'player.html?url='+url+'&name='+name+'&src='+src+'&group='+group; }
window.openChannel = openChannel;
function renderHome(){
  document.getElementById('homeGrid').innerHTML = ALL_CHANNELS.length ? ALL_CHANNELS.map(c=>cardHTML(c,false)).join('') : '<div class="empty">কোনো চ্যানেল নাই</div>';
}

// ============ EVENTS - Sports_data.json থেকে ============
function normalizeEvents(json){
  // JSON যেই ফরম্যাটেই আসুক - Array / {live:[], upcoming:[]} / {data:[]} / {events:[]} সব হ্যান্ডেল
  let arr = [];
  if(Array.isArray(json)) arr = json;
  else if(json && typeof json === 'object'){
    if(Array.isArray(json.events)) arr = json.events;
    else if(Array.isArray(json.data)) arr = json.data;
    else if(Array.isArray(json.matches)) arr = json.matches;
    else if(Array.isArray(json.sports)) arr = json.sports;
    else {
      // { live: [...], upcoming: [...] } হলে ২ টা মিলায় দাও
      Object.keys(json).forEach(k=>{ if(Array.isArray(json[k])) arr.push(...json[k].map(x=>({...x, _section:k}))); });
    }
  }
  return arr.map(e=>{
    // সব সম্ভাব্য Key থেকে নাম / টিম / লোগো / টাইম বের করো
    const title = e.match || e.title || e.name || e.event || e.match_name || e.event_name || '';
    const t1 = e.team1 || e.team_1 || e.home_team || e.home || e.teamA || e.first_team || '';
    const t2 = e.team2 || e.team_2 || e.away_team || e.away || e.teamB || e.second_team || '';
    const logo1 = e.team1_logo || e.team_1_logo || e.home_logo || e.logo1 || e.logo_1 || e.image1 || e.team1_image || '';
    const logo2 = e.team2_logo || e.team_2_logo || e.away_logo || e.logo2 || e.logo_2 || e.image2 || e.team2_image || '';
    const logo = e.logo || e.image || e.poster || e.thumbnail || '';
    const tournament = e.tournament || e.league || e.competition || e.category || e.sport || e.event_type || '';
    const time = e.time || e.start_time || e.start || e.date_time || e.date || e.match_time || '';
    const statusRaw = (e.status || e.state || e.live || e._section || '').toString().toLowerCase();
    const isLive = statusRaw.includes('live') || statusRaw.includes('playing') || e.is_live === true;
    const url = e.url || e.link || e.stream || e.stream_url || e.m3u8 || e.play_url || e.channel_url || '';
    // Title এ VS থাকলে ওইটা থেকে টিম ভাগ করো
    let finalT1 = t1, finalT2 = t2;
    if(!finalT1 && title.includes(' VS ')) { const p = title.split(' VS '); finalT1 = p[0]; finalT2 = p[1]; }
    else if(!finalT1 && title.includes(' vs ')) { const p = title.split(' vs '); finalT1 = p[0]; finalT2 = p[1]; }
    else if(!finalT1 && title.includes(' - ')) { const p = title.split(' - '); finalT1 = p[0]; finalT2 = p[1]; }
    return { title: title || (finalT1 + ' VS ' + finalT2), t1: cleanName(finalT1 || title), t2: cleanName(finalT2 || ''), logo1: logo1 || logo, logo2: logo2 || logo, tournament, time, isLive, url, raw: e };
  }).filter(x=>x.t1);
}
async function loadEvents(){
  const listEl = document.getElementById('eventsList');
  try{
    const r = await fetch(EVENTS_URL);
    const j = await r.json();
    EVENTS_DATA = normalizeEvents(j);
    renderEvents();
  }catch(e){
    listEl.innerHTML = '<div class="empty">Events লোড হয় নাই 😔<br>নেট চেক করে আবার Events এ আসো</div>';
  }
}
function openEvent(idx){
  const ev = EVENTS_DATA[idx]; if(!ev) return;
  // ১. JSON এ সরাসরি লিংক থাকলে ওইটা চালাও
  if(ev.url && ev.url.startsWith('http')){
    location.href = 'player.html?url='+encodeURIComponent(ev.url)+'&name='+encodeURIComponent(ev.title)+'&src='+encodeURIComponent('Events')+'&group='+encodeURIComponent('Events');
    return;
  }
  // ২. না থাকলে Playlist এর চ্যানেল থেকে টিমের নাম মিলায় খুঁজো
  const found = ALL_CHANNELS.find(c=>{
    const n = c.name.toLowerCase();
    return (ev.t1 && n.includes(ev.t1.toLowerCase().split(' ')[0])) || (ev.t2 && n.includes(ev.t2.toLowerCase().split(' ')[0]));
  });
  if(found){ openChannel(encodeURIComponent(found.url), encodeURIComponent(found.name), encodeURIComponent(found.src), encodeURIComponent(found.group)); return; }
  // ৩. না পাইলে Home এ নিয়ে যাও
  switchTab('home');
}
window.openEvent = openEvent;

function renderEvents(){
  const listEl = document.getElementById('eventsList');
  if(!EVENTS_DATA.length){ listEl.innerHTML = '<div class="empty">এখন কোনো Live / Upcoming ম্যাচ নাই 😔</div>'; return; }
  // Live আগে, তারপর Upcoming
  const sorted = [...EVENTS_DATA].sort((a,b)=> (b.isLive - a.isLive));
  let html = '';
  sorted.forEach((ev, idx)=>{
    const l1 = ev.logo1 || 'https://cdn-icons-png.flaticon.com/512/1179/1179069.png';
    const l2 = ev.logo2 || 'https://cdn-icons-png.flaticon.com/512/1179/1179069.png';
    const badge = ev.isLive ? `<span class="m-live"><i></i>LIVE</span>` : `<span class="m-up">UPCOMING</span>`;
    html += `<div class="match-card" onclick="openEvent(${idx})">
      <div class="match-title">${ev.tournament ? ev.tournament + ' • ' : ''}${ev.title}</div>
      <div class="match-teams">
        <div class="m-team"><img src="${l1}" onerror="this.src='https://cdn-icons-png.flaticon.com/512/1179/1179069.png'"><p>${ev.t1}</p></div>
        <div class="m-mid">${badge}<div class="m-vs">VS</div></div>
        <div class="m-team"><img src="${l2}" onerror="this.src='https://cdn-icons-png.flaticon.com/512/1179/1179069.png'"><p>${ev.t2 || 'TBD'}</p></div>
      </div>
      <div class="m-time">🕐 ${ev.time || 'Time TBD'}</div>
    </div>`;
  });
  listEl.innerHTML = html;
  document.getElementById('navEvents').classList.toggle('has-live', EVENTS_DATA.some(x=>x.isLive));
}

function renderCategories(){
  const grid = document.getElementById('catGrid'); let html='';
  Object.keys(CAT_META).forEach(key=>{
    const count = ALL_CHANNELS.filter(c=>c.cat===key).length; if(count===0) return; const m = CAT_META[key];
    html += `<div class="cat-card" onclick="openCategory('${key}')"><div class="cat-logo"><img src="${m.logo}" onerror="this.src='https://cdn-icons-png.flaticon.com/512/1179/1179069.png'"></div><h3>${m.title}</h3><p>${m.desc}</p><span class="count">${count} টা চ্যানেল</span></div>`;
  });
  grid.innerHTML = html || '<div class="empty">Category লোড হয় নাই</div>';
}
function openCategory(key){ CURRENT_CAT=key; const m=CAT_META[key]; document.getElementById('catListWrap').style.display='none'; document.getElementById('catDetailWrap').style.display='block'; document.getElementById('catDetailTitle').textContent=m.title; const arr=ALL_CHANNELS.filter(c=>c.cat===key); document.getElementById('catDetailGrid').innerHTML=arr.map(c=>cardHTML(c,key==='sports')).join(''); window.scrollTo({top:0}); }
window.openCategory=openCategory;
function backToCategories(){ document.getElementById('catListWrap').style.display='block'; document.getElementById('catDetailWrap').style.display='none'; }
window.backToCategories=backToCategories;
function switchTab(tab){ CURRENT_TAB=tab; ['home','events','categories'].forEach(t=>{ document.getElementById('view-'+t).classList.toggle('active', t===tab); document.getElementById('nav'+t.charAt(0).toUpperCase()+t.slice(1)).classList.toggle('active', t===tab); }); if(tab==='categories') backToCategories(); if(tab==='events' && !EVENTS_DATA.length) loadEvents(); window.scrollTo({top:0}); }
window.switchTab=switchTab;
loadAll();
