/* RsLive Go - app.js - FULL - Events VS Fix + Header Plain */
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
// টিমের নাম থেকে ২ অক্ষরের Initials - লোগো না থাকলে এইটা দেখাবে
function initials(name){
  const w = (name||'').trim().split(/\s+/).filter(Boolean);
  if(!w.length) return 'VS';
  if(w.length===1) return w[0].slice(0,2).toUpperCase();
  return (w[0][0] + w[1][0]).toUpperCase();
}
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
  loadEvents();
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

// ============ EVENTS - Sports_data.json থেকে - VS / Vs / vs ফিক্স ============
function splitVS(title){
  // VS, Vs, vs, vS - যেইভাবেই থাকুক, ভাগ হবে - এইটাই ছবির বাগের ফিক্স
  const parts = (title||'').split(/\s+vs\.?\s+|\s+v\.?\s+|\s+-\s+/i);
  if(parts.length>=2) return [parts[0].trim(), parts.slice(1).join(' ').trim()];
  return [title, ''];
}
function pick(obj, keys){
  for(let k of keys){ if(obj[k] !== undefined && obj[k] !== null && obj[k] !== '') return obj[k]; }
  return '';
}
function normalizeEvents(json){
  let arr = [];
  if(Array.isArray(json)) arr = json;
  else if(json && typeof json === 'object'){
    if(Array.isArray(json.events)) arr = json.events;
    else if(Array.isArray(json.data)) arr = json.data;
    else if(Array.isArray(json.matches)) arr = json.matches;
    else if(Array.isArray(json.sports)) arr = json.sports;
    else { Object.keys(json).forEach(k=>{ if(Array.isArray(json[k])) arr.push(...json[k].map(x=>({...x, _section:k}))); }); }
  }
  return arr.map(e=>{
    if(typeof e === 'string') e = { match: e };
    const titleRaw = pick(e, ['match','title','name','event','match_name','event_name','fixture','game','match_title']) || '';
    // টিম - teams array থাকলেও হ্যান্ডেল
    let t1 = pick(e, ['team1','team_1','home_team','home','teamA','first_team','team1_name','home_name']);
    let t2 = pick(e, ['team2','team_2','away_team','away','teamB','second_team','team2_name','away_name']);
    if(!t1 && Array.isArray(e.teams) && e.teams.length>=2){ t1 = e.teams[0].name || e.teams[0]; t2 = e.teams[1].name || e.teams[1]; }
    if(!t1 && Array.isArray(e.team_names) && e.team_names.length>=2){ t1 = e.team_names[0]; t2 = e.team_names[1]; }
    // Title থেকে VS দিয়ে ভাগ - VS / Vs / vs সব চলবে
    if(!t1 && titleRaw){
      const sp = splitVS(titleRaw);
      t1 = sp[0]; t2 = sp[1];
    }
    const logo1 = pick(e, ['team1_logo','team_1_logo','home_logo','logo1','logo_1','image1','team1_image','home_image','team1_img']);
    const logo2 = pick(e, ['team2_logo','team_2_logo','away_logo','logo2','logo_2','image2','team2_image','away_image','team2_img']);
    const logo = pick(e, ['logo','image','poster','thumbnail','img','icon']);
    const tournament = pick(e, ['tournament','league','competition','category','sport','event_type','series','league_name','tournament_name']);
    // Time - date + time আলাদা থাকলেও মিলায় দিবে
    let time = pick(e, ['time','start_time','start','date_time','datetime','match_time','kickoff','event_time','startTime']);
    const dateOnly = pick(e, ['date','event_date','match_date','day']);
    if(!time && dateOnly) time = dateOnly;
    else if(time && dateOnly && !String(time).includes(dateOnly)) time = dateOnly + ' ' + time;
    const statusRaw = (pick(e, ['status','state','live','_section','match_status']) || '').toString().toLowerCase();
    const isLive = statusRaw.includes('live') || statusRaw.includes('playing') || statusRaw.includes('1st') || statusRaw.includes('2nd') || e.is_live === true || e.live === true;
    const url = pick(e, ['url','link','stream','stream_url','m3u8','play_url','channel_url','watch_url','href']);
    const finalT1 = cleanName(t1 || titleRaw);
    const finalT2 = cleanName(t2 || '');
    return { title: titleRaw || (finalT1 + ' VS ' + finalT2), t1: finalT1, t2: finalT2, logo1: logo1 || logo, ইlogo2: logo2 || logo, tournament, time, isLive, url, raw: e };
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
  if(ev.url && String(ev.url).startsWith('http')){
    location.href = 'player.html?url='+encodeURIComponent(ev.url)+'&name='+encodeURIComponent(ev.title)+'&src='+encodeURIComponent('Events')+'&group='+encodeURIComponent('Events');
    return;
  }
  const found = ALL_CHANNELS.find(c=>{
    const n = c.name.toLowerCase();
    return (ev.t1 && n.includes(ev.t1.toLowerCase().split(' ')[0])) || (ev.t2 && n.includes(ev.t2.toLowerCase().split(' ')[0]));
  });
  if(found){ openChannel(encodeURIComponent(found.url), encodeURIComponent(found.name), encodeURIComponent(found.src), encodeURIComponent(found.group)); return; }
  switchTab('home');
}
window.openEvent = openEvent;

function renderEvents(){
  const listEl = document.getElementById('eventsList');
  if(!EVENTS_DATA.length){ listEl.innerHTML = '<div class="empty">এখন কোনো Live / Upcoming ম্যাচ নাই 😔</div>'; return; }
  const sorted = [...EVENTS_DATA].sort((a,b)=> (b.isLive - a.isLive));
  let html = '';
  sorted.forEach((ev, idx)=>{
    // লোগো না থাকলে Initials - ক্ল্যাপবোর্ড আর আসবে না
    const l1HTML = ev.logo1 ? `<img src="${ev.logo1}" onerror="this.parentElement.innerHTML='${initials(ev.t1)}'">` : initials(ev.t1);
    const l2HTML = ev.t2 ? (ev.logo2 ? `<img src="${ev.logo2}" onerror="this.parentElement.innerHTML='${initials(ev.t2)}'">` : initials(ev.t2)) : 'TBD';
    const badge = ev.isLive ? `<span class="m-live"><i></i>LIVE</span>` : `<span class="m-up">UPCOMING</span>`;
    // উপরে শুধু Tournament, নিচে টিম - ডাবল Title আর দেখাবে না
    const topTitle = ev.tournament ? ev.tournament : ev.title;
    html += `<div class="match-card" onclick="openEvent(${idx})">
      <div class="match-title">${topTitle}</div>
      <div class="match-teams">
        <div class="m-team"><div class="m-logo">${l1HTML}</div><p>${ev.t1}</p></div>
        <div class="m-mid">${badge}<div class="m-vs">VS</div></div>
        <div class="m-team"><div class="m-logo">${l2HTML}</div><p>${ev.t2 || 'TBD'}</p></div>
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
