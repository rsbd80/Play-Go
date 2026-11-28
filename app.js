// RsLive-Go v16 - ALL FIXES + Private Repo Support
// CONFIG_URL changed to /data/config.json so Private Repo also works
const CONFIG_URL='/data/config.json';
const DEFAULT_CONFIG={version:0,matches:[],channels:[],notifications:[]};
const DEFAULT_CHANNELS=[
  {id:'1',name:'Sky Sports Premier League HD',code:'SSPL',logo:'https://i.ibb.co/MVjK8bT/sspl.png',category:'Sports',quality:'HD',streams:['https://topembed.pw/channel/SkySportsPremierLeague[UK]','https://streamtp4.com/global1.php'],is_featured:true},
  {id:'2',name:'T Sports HD',code:'TS',logo:'https://i.ibb.co/3Y9g2yK/tsports.png',category:'Sports',quality:'HD',streams:['https://streamtp4.com/global1.php'],is_featured:false},
  {id:'3',name:'Star Sports 1 HD',code:'SS1',logo:'https://i.ibb.co/7Jv3K9Q/starsports.png',category:'Sports',quality:'HD',streams:['https://topembed.pw/channel/StarSports1[IN]'],is_featured:false},
  {id:'4',name:'Star Sports Select 1 HD',code:'SSS1',logo:'https://i.ibb.co/0jZqJjK/sss1.png',category:'Sports',quality:'HD',streams:['https://topembed.pw/channel/StarSportsSelect1[IN]'],is_featured:true},
  {id:'5',name:'Sony Sports Ten 1 HD',code:'SONY1',logo:'https://i.ibb.co/9ZkQjK9/sony.png',category:'Sports',quality:'HD',streams:['https://topembed.pw/channel/SonySportsTen1[IN]'],is_featured:false},
  {id:'6',name:'PTV Sports HD',code:'PTV',logo:'https://i.ibb.co/2yZqJjK/ptv.png',category:'Sports',quality:'HD',streams:['https://streamtp4.com/global1.php'],is_featured:false},
  {id:'7',name:'Gazi TV HD',code:'GTV',logo:'https://i.ibb.co/4jZqJjK/gtv.png',category:'Sports',quality:'HD',streams:['https://streamtp4.com/global1.php'],is_featured:true},
  {id:'8',name:'BeIN Sports 1 HD',code:'BEIN1',logo:'https://i.ibb.co/8jZqJjK/bein.png',category:'Sports',quality:'HD',streams:['https://topembed.pw/channel/BeINSports1[EN]'],is_featured:true}
];

let currentState={matches:[],channels:[],notifications:[]};
let currentCategory='all';
let selectedChannels=new Set();
let currentPlaying={type:null,id:null};
let activeChannelFilter='all';
let activeSubFilter='all';
let searchQuery='';
let currentStreamIndex=0;
let currentStreams=[];
let currentMatch=null;
let currentChannel=null;
let filteredMatches=[];
let filteredChannels=[];
let pendingNav=null;
let currentMatchChannelFilter='all';
let pinnedIds=[];
let currentEventPage=1;
const ITEMS_PER_PAGE=6;
let currentPage=1;
const CHANNELS_PER_PAGE=8;

function openApp(){try{document.getElementById('splashScreen').style.display='none';document.getElementById('mainApp').style.display='block';if(document.getElementById('liveClock'))setInterval(updateClock,1000);updateClock();checkLiveStatus();showSection('events');}catch(e){console.error(e);}}

function updateClock(){try{const now=new Date();const t=now.toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit',second:'2-digit'});const d=now.toLocaleDateString('en-GB',{weekday:'short',day:'numeric',month:'short'});const el=document.getElementById('liveClock');if(el)el.textContent=d+' • '+t;}catch(e){}}

async function loadCloudConfig(){try{const res=await fetch(CONFIG_URL);if(!res.ok)throw new Error('Cloud not found');const data=await res.json();if(data.matches)currentState.matches=data.matches;if(data.channels)currentState.channels=data.channels;if(data.notifications)currentState.notifications=data.notifications;if(data.pinned) pinnedIds=data.pinned;localStorage.setItem('rslive_config',JSON.stringify(data));return true;}catch(e){console.log('Cloud load failed, using local',e);const local=localStorage.getItem('rslive_config');if(local){try{const d=JSON.parse(local);currentState.matches=d.matches||[];currentState.channels=d.channels||[];currentState.notifications=d.notifications||[];pinnedIds=d.pinned||[];}catch(_){}}return false;}}

function getNotifs(){return currentState.notifications||[];}

function saveToCloud(data){localStorage.setItem('rslive_config',JSON.stringify(data));currentState=data;}

function renderMatches(){try{let list=[...currentState.matches];if(searchQuery){const q=searchQuery.toLowerCase();list=list.filter(m=>(m.homeTeam+' '+m.awayTeam+' '+m.league).toLowerCase().includes(q));}if(activeSubFilter!=='all'){if(activeSubFilter==='live')list=list.filter(m=>m.status==='live');if(activeSubFilter==='upcoming')list=list.filter(m=>m.status==='upcoming');if(activeSubFilter==='today'){const today=new Date().toISOString().split('T')[0];list=list.filter(m=>m.date===today);}if(activeSubFilter==='pinned')list=list.filter(m=>pinnedIds.includes(m.id));}if(currentMatchChannelFilter!=='all'){list=list.filter(m=>(m.channels||[]).includes(currentMatchChannelFilter));}list.sort((a,b)=>{const pa=pinnedIds.includes(a.id)?0:1;const pb=pinnedIds.includes(b.id)?0:1;if(pa!==pb)return pa-pb;if(a.status==='live'&&b.status!=='live')return -1;if(b.status==='live'&&a.status!=='live')return 1;return new Date(a.date+'T'+a.time)-new Date(b.date+'T'+b.time);});filteredMatches=list;renderMatchGrid();}catch(e){console.error(e);}}

function renderMatchGrid(){const grid=document.getElementById('eventsGrid');if(!grid)return;const start=(currentEventPage-1)*ITEMS_PER_PAGE;const pageItems=filteredMatches.slice(start,start+ITEMS_PER_PAGE);if(pageItems.length===0){grid.innerHTML='<div style="grid-column:1/-1;text-align:center;padding:40px;color:#888;">কোনো ইভেন্ট পাওয়া যায়নি</div>';}else{grid.innerHTML=pageItems.map(m=>matchCard(m)).join('');}renderPagination();}

function matchCard(m){const isLive=m.status==='live';const isPinned=pinnedIds.includes(m.id);const timeStr=m.time||'--:--';return `<div class="event-card" onclick="openMatch('${m.id}')">
<div class="event-header"><span class="league-badge">${m.league||'Football'}</span><span class="pin-btn" onclick="event.stopPropagation();togglePin('${m.id}')">${isPinned?'📌':'📍'}</span></div>
<div class="teams"><div class="team"><img src="${m.homeLogo||''}" onerror="this.style.display='none'"><span>${m.homeTeam}</span></div><div class="vs">${isLive?'<span class="live-dot">● LIVE</span>':timeStr}</div><div class="team"><img src="${m.awayLogo||''}" onerror="this.style.display='none'"><span>${m.awayTeam}</span></div></div>
<div class="event-footer"><span>${m.date||''} • ${m.venue||''}</span><button class="watch-btn">Watch →</button></div></div>`;}

function renderPagination(){const el=document.getElementById('pagination');if(!el)return;const totalPages=Math.ceil(filteredMatches.length/ITEMS_PER_PAGE);if(totalPages<=1){el.innerHTML='';return;}let html='';for(let i=1;i<=totalPages;i++){html+=`<button class="${i===currentEventPage?'active':''}" onclick="goToPage(${i})">${i}</button>`;}el.innerHTML=html;}

function goToPage(p){currentEventPage=p;renderMatchGrid();window.scrollTo({top:0,behavior:'smooth'});}

function togglePin(id){if(pinnedIds.includes(id))pinnedIds=pinnedIds.filter(x=>x!==id);else pinnedIds.push(id);renderMatches();}

function openMatch(id){const m=currentState.matches.find(x=>x.id===id);if(!m)return;currentMatch=m;const chIds=m.channels||[];let streams=[];chIds.forEach(cid=>{const ch=currentState.channels.find(c=>c.id===cid);if(ch&&(ch.streams||[]).length)streams.push(...ch.streams);});if(streams.length===0)streams=['https://streamtp4.com/global1.php'];currentStreams=streams;currentStreamIndex=0;playStream(streams[0]);showSection('player');document.getElementById('playerTitle').textContent=m.homeTeam+' vs '+m.awayTeam;document.getElementById('playerSubtitle').textContent=(m.league||'')+' • '+(m.date||'')+' '+ (m.time||'');renderServerButtons();}

function renderServerButtons(){const c=document.getElementById('serverButtons');if(!c)return;c.innerHTML=currentStreams.map((s,i)=>`<button class="${i===currentStreamIndex?'active':''}" onclick="switchServer(${i})">Server ${i+1}</button>`).join('');}

function switchServer(i){currentStreamIndex=i;playStream(currentStreams[i]);renderServerButtons();}

function playStream(url){const f=document.getElementById('playerFrame');if(f)f.src=url;const s=document.getElementById('playerStatus');if(s)s.textContent='Loading Server '+(currentStreamIndex+1)+'...';setTimeout(()=>{if(s)s.textContent='Now Playing';},2000);}

function openChannel(id){const ch=currentState.channels.find(c=>c.id===id);if(!ch)return;currentChannel=ch;currentStreams=ch.streams||['https://streamtp4.com/global1.php'];currentStreamIndex=0;playStream(currentStreams[0]);showSection('player');document.getElementById('playerTitle').textContent=ch.name;document.getElementById('playerSubtitle').textContent=ch.category+' • '+ch.quality;renderServerButtons();}

function renderChannels(){try{let list=[...currentState.channels];if(searchQuery){const q=searchQuery.toLowerCase();list=list.filter(c=>c.name.toLowerCase().includes(q));}if(activeChannelFilter!=='all')list=list.filter(c=>c.category===activeChannelFilter);filteredChannels=list;const grid=document.getElementById('channelsGrid');if(!grid)return;const start=(currentPage-1)*CHANNELS_PER_PAGE;const items=list.slice(start,start+CHANNELS_PER_PAGE);if(items.length===0)grid.innerHTML='<div style="grid-column:1/-1;text-align:center;padding:40px;color:#888;">কোনো চ্যানেল পাওয়া যায়নি</div>';else grid.innerHTML=items.map(c=>`<div class="channel-card" onclick="openChannel('${c.id}')"><img src="${c.logo||''}" onerror="this.style.display='none'"><div><b>${c.name}</b><span>${c.category} • ${c.quality}</span></div><span class="play-icon">▶</span></div>`).join('');renderChannelPagination();}catch(e){console.error(e);}}

function renderChannelPagination(){const el=document.getElementById('channelPagination');if(!el)return;const total=Math.ceil(filteredChannels.length/CHANNELS_PER_PAGE);if(total<=1){el.innerHTML='';return;}let h='';for(let i=1;i<=total;i++)h+=`<button class="${i===currentPage?'active':''}" onclick="goToChannelPage(${i})">${i}</button>`;el.innerHTML=h;}

function goToChannelPage(p){currentPage=p;renderChannels();}

function showSection(sec){document.querySelectorAll('.section').forEach(s=>s.classList.remove('active'));const el=document.getElementById('section-'+sec);if(el)el.classList.add('active');document.querySelectorAll('.nav-btn').forEach(b=>b.classList.remove('active'));const nav=document.querySelector(`[data-nav="${sec}"]`);if(nav)nav.classList.add('active');if(sec==='events')renderMatches();if(sec==='channels')renderChannels();if(sec==='notifications')renderNotifications();}

function renderNotifications(){const el=document.getElementById('notificationsList');if(!el)return;const n=getNotifs();if(n.length===0)el.innerHTML='<p style="text-align:center;color:#888;padding:30px;">কোনো নোটিফিকেশন নেই</p>';else el.innerHTML=n.map(x=>`<div class="notif-card"><b>${x.title||''}</b><p>${x.message||''}</p><small>${x.time||''}</small></div>`).join('');}

function setFilter(f,btn){activeSubFilter=f;currentEventPage=1;document.querySelectorAll('.filter-chip').forEach(b=>b.classList.remove('active'));if(btn)btn.classList.add('active');renderMatches();}

function setChannelFilter(c,btn){activeChannelFilter=c;currentPage=1;document.querySelectorAll('.cat-chip').forEach(b=>b.classList.remove('active'));if(btn)btn.classList.add('active');renderChannels();}

function handleSearch(v){searchQuery=v;currentEventPage=1;currentPage=1;renderMatches();renderChannels();}

function checkLiveStatus(){const live=currentState.matches.filter(m=>m.status==='live').length;const el=document.getElementById('liveCount');if(el)el.textContent=live>0?live+' LIVE':'No Live';}

function refreshData(){loadCloudConfig().then(()=>{renderMatches();renderChannels();checkLiveStatus();alert('Refreshed!');});}

document.addEventListener('DOMContentLoaded',async()=>{await loadCloudConfig();if(currentState.channels.length===0)currentState.channels=DEFAULT_CHANNELS;renderMatches();renderChannels();checkLiveStatus();renderNotifications();});
