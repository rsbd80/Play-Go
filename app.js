/* RsLive Go - app.js - FULL - No Default, Playlist থেকে লোড */
let ALL_CHANNELS = [];
let CURRENT_TAB = 'home';
let CURRENT_CAT = '';
let CURRENT_PILL = 'all';

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
    renderHome(); renderEventsPills(); renderEvents(); renderCategories();
  }catch(e){ document.getElementById('homeGrid').innerHTML='<div class="empty">লোড হয় নাই</div>'; }
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

// EVENTS - Category Playlist Pill - Playlist থেকে অটো, Default নাই
function renderEventsPills(){
  // Playlist থেকে আসল Category / Source গুলা
  const sources = [...new Set(ALL_CHANNELS.map(c=>c.src))];
  // All + Live Sports + বাকি Playlist
  let pills = [{key:'all', label:'🏠 All', count: ALL_CHANNELS.length}, {key:'sports', label:'🏆 Live Sports', count: ALL_CHANNELS.filter(c=>c.cat==='sports').length}];
  sources.forEach(s=>{
    if(s.toLowerCase()==='sports') return;
    pills.push({key:s.toLowerCase(), label:'📺 '+s, count: ALL_CHANNELS.filter(c=>c.src===s).length});
  });
  document.getElementById('eventsPills').innerHTML = pills.map(p=>`<button class="pill ${CURRENT_PILL===p.key?'active':''}" onclick="setPill('${p.key}')">${p.label} <span class="cnt">${p.count}</span></button>`).join('');
}
function setPill(key){ CURRENT_PILL=key; renderEventsPills(); renderEvents(); }
window.setPill = setPill;

function renderEvents(){
  const listEl = document.getElementById('eventsList');
  // Pill অনুযায়ী ফিল্টার - সব Playlist থেকে
  let arr = [];
  if(CURRENT_PILL==='all') arr = ALL_CHANNELS;
  else if(CURRENT_PILL==='sports') arr = ALL_CHANNELS.filter(c=>c.cat==='sports');
  else arr = ALL_CHANNELS.filter(c=>c.src.toLowerCase()===CURRENT_PILL);
  // শুধু VS ওয়ালা ম্যাচ - Default বাদ, আসল Playlist এর ম্যাচ
  const matches = arr.filter(c=>c.name.includes(' VS ') || c.name.includes(' vs ') || c.name.includes(' Vs ') || c.name.includes(' VS') || c.name.includes('vs'));
  if(!matches.length){ listEl.innerHTML = '<div class="empty">এই Playlist এ এখন কোনো Live ম্যাচ নাই 😔</div>'; return; }
  let html = '';
  matches.forEach(c=>{
    const parts = c.name.split(/\s+VS\s+|\s+vs\s+|\s+Vs\s+/);
    const t1 = cleanName(parts[0]||c.name), t2 = cleanName(parts[1]||'');
    if(!t2) return;
    const logo = c.logo || 'https://cdn-icons-png.flaticon.com/512/1179/1179069.png';
    // ছবির মতো Time - এখনকার Time দেখাবে, Playlist এ Time থাকলে ওইটা
    const now = new Date(); const timeStr = now.toLocaleDateString('en-GB') + ' ' + now.toLocaleTimeString('en-US', {hour:'2-digit', minute:'2-digit'});
    html += `<div class="match-card" onclick="openChannel('${encodeURIComponent(c.url)}','${encodeURIComponent(c.name)}','${encodeURIComponent(c.src)}','${encodeURIComponent(c.group)}')">
      <div class="match-title">${cleanName(c.name)}</div>
      <div class="match-teams">
        <div class="m-team"><img src="${logo}" onerror="this.src='https://cdn-icons-png.flaticon.com/512/1179/1179069.png'"><p>${t1}</p></div>
        <div class="m-mid"><span class="m-live"><i></i>LIVE</span><div class="m-vs">VS</div></div>
        <div class="m-team"><img src="${logo}" onerror="this.src='https://cdn-icons-png.flaticon.com/512/1179/1179069.png'"><p>${t2}</p></div>
      </div>
      <div class="m-time">🕐 ${timeStr}</div>
    </div>`;
  });
  listEl.innerHTML = html;
  document.getElementById('navEvents').classList.toggle('has-live', matches.length>0);
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
function switchTab(tab){ CURRENT_TAB=tab; ['home','events','categories'].forEach(t=>{ document.getElementById('view-'+t).classList.toggle('active', t===tab); document.getElementById('nav'+t.charAt(0).toUpperCase()+t.slice(1)).classList.toggle('active', t===tab); }); if(tab==='categories') backToCategories(); window.scrollTo({top:0}); }
window.switchTab=switchTab;
document.getElementById('searchInput').addEventListener('input', e=>{
  const q=e.target.value.toLowerCase().trim(); if(!q){ renderHome(); return; }
  const filtered=ALL_CHANNELS.filter(c=>c.name.toLowerCase().includes(q));
  document.getElementById('homeGrid').innerHTML = filtered.map(c=>cardHTML(c,false)).join('');
});
loadAll();
