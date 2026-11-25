/* RsLive Go - app.js - FINAL CLEAN */
let ALL_CHANNELS = [];
let CURRENT_TAB = 'home';
let CURRENT_HOME_CAT = 'all';
let CURRENT_CAT = '';

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
  if(t.includes('sport') || t.includes('cricket') || t.includes('football') || t.includes('t sports') || t.includes('star sports') || t.includes('sony sports') || t.includes('ptv sports')) return 'sports';
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
    renderHomePills(); renderHome(); renderEvents(); renderCategories();
  }catch(e){ document.getElementById('homeGrid').innerHTML='<div class="empty">লোড হয় নাই</div>'; }
}
function cardHTML(c, isLive){
  const logo = c.logo || 'https://cdn-icons-png.flaticon.com/512/1179/1179069.png';
  return `<div class="card" onclick="openChannel('${encodeURIComponent(c.url)}','${encodeURIComponent(c.name)}','${encodeURIComponent(c.src)}','${encodeURIComponent(c.group)}')">${isLive?'<span class="live-badge">● LIVE</span>':''}<img src="${logo}" onerror="this.src='https://cdn-icons-png.flaticon.com/512/1179/1179069.png'"><p>${cleanName(c.name)}</p><small>${c.src}</small></div>`;
}
function openChannel(url, name, src, group){ location.href = 'player.html?url='+url+'&name='+name+'&src='+src+'&group='+group; }
window.openChannel = openChannel;

// HOME - Pill + All Channels
function renderHomePills(){
  const pills = [{key:'all', label:'All'}, ...Object.keys(CAT_META).map(k=>({key:k, label:CAT_META[k].title}))];
  document.getElementById('homeCatPills').innerHTML = pills.map(p=>{
    const cnt = p.key==='all' ? ALL_CHANNELS.length : ALL_CHANNELS.filter(c=>c.cat===p.key).length;
    return `<button class="cat-pill ${CURRENT_HOME_CAT===p.key?'active':''}" onclick="setHomeCat('${p.key}')">${p.label} • ${cnt}</button>`;
  }).join('');
}
function setHomeCat(key){ CURRENT_HOME_CAT=key; renderHomePills(); renderHome(); }
window.setHomeCat = setHomeCat;
function renderHome(){
  let arr = CURRENT_HOME_CAT==='all' ? ALL_CHANNELS : ALL_CHANNELS.filter(c=>c.cat===CURRENT_HOME_CAT);
  document.getElementById('homeGrid').innerHTML = arr.length ? arr.map(c=>cardHTML(c,false)).join('') : '<div class="empty">কোনো চ্যানেল নাই</div>';
}

// EVENTS - শুধু Upcoming Match, আর কিছু না
function renderEvents(){
  const listEl = document.getElementById('eventsList');
  // তোমার আগের Upcoming Match - এটাই থাকবে
  const upcoming = [
    { t1:'Bangladesh', t1Flag:'https://flagcdn.com/w320/bd.png', t2:'South Africa', t2Flag:'https://flagcdn.com/w320/za.png', time:'আজ • রাত ৮:০০ টা', tag:'UPCOMING' },
    { t1:'India', t1Flag:'https://flagcdn.com/w320/in.png', t2:'Pakistan', t2Flag:'https://flagcdn.com/w320/pk.png', time:'কাল • বিকাল ৪:০০ টা', tag:'UPCOMING' }
  ];
  listEl.innerHTML = upcoming.map(m=>`
    <div class="up-card">
      <div class="up-top"><span class="up-badge">${m.tag}</span><span class="up-time">🕐 ${m.time}</span></div>
      <div class="up-teams">
        <div class="up-team"><img src="${m.t1Flag}"><p>${m.t1}</p></div>
        <div class="up-vs">VS</div>
        <div class="up-team"><img src="${m.t2Flag}"><p>${m.t2}</p></div>
      </div>
      <button class="up-btn" onclick="switchTab('home')">📺 চ্যানেল দেখো</button>
    </div>`).join('');
  const hasLive = ALL_CHANNELS.filter(c=>c.cat==='sports').length>0;
  document.getElementById('navEvents').classList.toggle('has-live', hasLive);
}

// CATEGORIES - শুধু Category
function renderCategories(){
  const grid = document.getElementById('catGrid'); let html='';
  Object.keys(CAT_META).forEach(key=>{
    const count = ALL_CHANNELS.filter(c=>c.cat===key).length; if(count===0) return; const m = CAT_META[key];
    html += `<div class="cat-card" onclick="openCategory('${key}')"><div class="cat-logo"><img src="${m.logo}" onerror="this.src='https://cdn-icons-png.flaticon.com/512/1179/1179069.png'"></div><h3>${m.title}</h3><p>${m.desc}</p><span class="count">${count} টা চ্যানেল</span></div>`;
  });
  grid.innerHTML = html || '<div class="empty">Category লোড হয় নাই</div>';
}
function openCategory(key){ CURRENT_CAT=key; const m=CAT_META[key]; document.getElementById('catListWrap').style.display='none'; document.getElementById('catDetailWrap').style.display='block'; document.getElementById('catDetailTitle').textContent='📂 '+m.title; const arr=ALL_CHANNELS.filter(c=>c.cat===key); document.getElementById('catDetailGrid').innerHTML=arr.map(c=>cardHTML(c,key==='sports')).join(''); window.scrollTo({top:0}); }
window.openCategory=openCategory;
function backToCategories(){ document.getElementById('catListWrap').style.display='block'; document.getElementById('catDetailWrap').style.display='none'; }
window.backToCategories=backToCategories;
function switchTab(tab){ CURRENT_TAB=tab; ['home','events','categories'].forEach(t=>{ document.getElementById('view-'+t).classList.toggle('active', t===tab); document.getElementById('nav'+t.charAt(0).toUpperCase()+t.slice(1)).classList.toggle('active', t===tab); }); if(tab==='categories') backToCategories(); window.scrollTo({top:0}); }
window.switchTab=switchTab;
document.getElementById('searchInput').addEventListener('input', e=>{
  const q=e.target.value.toLowerCase().trim(); if(!q){ renderHome(); return; }
  const filtered=ALL_CHANNELS.filter(c=>c.name.toLowerCase().includes(q));
  document.getElementById('homeGrid').innerHTML = filtered.map(c=>cardHTML(c,false)).join('');
});
loadAll();
