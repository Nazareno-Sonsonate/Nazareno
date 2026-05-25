// ==================== app.js (route data is in routes-data.js, loaded first) ====================

// ========== LOCAL STORAGE ==========
const SAVE_KEY = 'semanaSanta_v47';
function getWPs(){return currentDay===0?LUN_WP_REF:currentDay===1?MART_WP_REF:currentDay===2?MIER_WP_REF:currentDay===3?VIER_WP_REF:currentDay===4?SE_WP_REF:[];}
function saveAll() {
  try {
    savedPositions[currentDay] = positions.map(p=>({lat:p.lat,lng:p.lng,n:p.n||''}));
    if(positionsW.length>0) savedPositionsW[currentDay] = positionsW.map(p=>({lat:p.lat,lng:p.lng,n:p.n||''}));
    savedRefs[currentDay] = getWPs().map(w=>({lat:w.lat,lng:w.lng,n:w.n}));
    const data = {
      sp: savedPositions, sr: savedRefs, spw: savedPositionsW,
      sc: daySaca, sh: dayHours, sm: daySacaManual, sd: dayDates, smj: daySacaMuj,
      cfg: {g:+$('cG').value,t:+$('cType').value,mn:+$('cMn').value,color:+($('cColor')?$('cColor').value:0),cortH:VIER_CORTESIAS_CHANGE,cortM:VIER_CORTESIAS_CHANGE_M,cortMin:VIER_CORTESIAS_MIN},
      cd: currentDay,
      ga: liveGrupoData ? {d:currentDay, data:liveGrupoData} : null
    };
    localStorage.setItem(SAVE_KEY, JSON.stringify(data));
  } catch(e) {}
}
// Separate function to sync positions - only call after actual edits
function syncAndSave(){
  saveAll();
  if(typeof syncPositions==='function') syncPositions();
}
function loadSaved() {
  try {
    let raw = localStorage.getItem(SAVE_KEY);
    if(!raw){
      for(let v=44;v>=13;v--){
        raw=localStorage.getItem('semanaSanta_v'+v);
        if(raw){
          localStorage.setItem(SAVE_KEY,raw);
          localStorage.removeItem('semanaSanta_v'+v);
          break;
        }
      }
    }
    if(!raw) return false;
    const d = JSON.parse(raw);
    // Load saved positions (admin uses these, shared users use KML)
    if(d.sp) savedPositions = d.sp;
    if(d.spw) savedPositionsW = d.spw;
    // Only load refs if user added custom ones
    if(d.sr) savedRefs = d.sr;
    if(d.sc) daySaca = d.sc;
    if(d.sh) dayHours = d.sh;
    if(d.sm) daySacaManual = d.sm;
    if(d.sd) dayDates = d.sd;
    if(d.smj) daySacaMuj = d.smj;
    if(d.cfg){$('cG').value=d.cfg.g||5;$('cType').value=d.cfg.t||21;$('cMn').value=d.cfg.mn||6;if(d.cfg.color!==undefined)$('cColor').value=d.cfg.color;$('colorDiv').style.display=(+$('cType').value===27)?'block':'none';if(d.cfg.cortH)VIER_CORTESIAS_CHANGE=d.cfg.cortH;if(d.cfg.cortM)VIER_CORTESIAS_CHANGE_M=d.cfg.cortM;if(d.cfg.cortMin)VIER_CORTESIAS_MIN=d.cfg.cortMin;}
    // currentDay is now managed by lastViewedDay in localStorage, not saved data
    // Restore grupo actual
    if(d.ga&&d.ga.data&&d.ga.d===currentDay){
      liveGrupoData=d.ga.data;
      currentGrupoActual=d.ga.data.cambio||0;
      if(d.ga.data.desfase!==undefined) virgenDesfase=d.ga.data.desfase;
      if(d.ga.data.movidos!==undefined) virgenMovidos=d.ga.data.movidos;
      if(d.ga.data.sacaMuj) daySacaMuj[currentDay]=d.ga.data.sacaMuj;
      // Validate: cambio can't exceed day's total points
      var dayTotals=[LUN_PTS.length,MART_PTS.length,MIER_PTS.length,VIER_PTS.length];
      var maxForDay=dayTotals[currentDay]||44;
      if(currentGrupoActual>maxForDay+30){currentGrupoActual=0;liveGrupoData=null;}
    }
    if(savedRefs[0]&&savedRefs[0].length){LUN_WP_REF.length=0;savedRefs[0].forEach(r=>LUN_WP_REF.push(r));}
    if(savedRefs[1]&&savedRefs[1].length){MART_WP_REF.length=0;savedRefs[1].forEach(r=>MART_WP_REF.push(r));}
    if(savedRefs[2]&&savedRefs[2].length){MIER_WP_REF.length=0;savedRefs[2].forEach(r=>MIER_WP_REF.push(r));}
    if(savedRefs[3]&&savedRefs[3].length){VIER_WP_REF.length=0;savedRefs[3].forEach(r=>VIER_WP_REF.push(r));}
    if(savedRefs[4]&&savedRefs[4].length){SE_WP_REF.length=0;savedRefs[4].forEach(r=>SE_WP_REF.push(r));}
    return true;
  } catch(e){return false;}
}
async function resetData(){
  if(!await customConfirm('¿Borrar TODO el progreso guardado?')) return;
  localStorage.removeItem(SAVE_KEY);
  savedPositions=[null,null,null,null,null];savedRefs=[null,null,null,null,null];
  location.reload();
}

// Touch guard
let lastMulti = 0;
document.addEventListener('touchstart', e => { if(e.touches.length>1) lastMulti=Date.now(); }, {passive:true});
function isZoom() { return Date.now()-lastMulti<500; }

// ========== URL PARAMS & SHARING ==========
// Default to PUBLIC (shared) — admin status comes from Firebase Auth
let isShared = true;
// Detect Santo Entierro at parse time so the rest of the script sees the
// right value. The dedicated /santo-entierro/index.html sets window._forceSE
// before loading us; otherwise fall back to the legacy ?se=1 query string.
let isSEMode = (typeof window!=='undefined' && window._forceSE === true);
let explicitDay = isSEMode;
if(isSEMode) currentDay = 4;
// Mode-aware accent: green for Jesús Nazareno, muted gold for the Santo Entierro
// mourning theme. Called at render time so it tracks the current procession.
function seAccent(){ return isSEMode?'#b49963':'#a855f7'; }
function seAccentTxt(){ return isSEMode?'#d4c08a':'#c084fc'; }
function seAccentBg(a){ return (isSEMode?'rgba(180,153,99,':'rgba(168,85,247,')+a+')'; }
function seCheck(){ return ''; }
function readParams(){
  const p = new URLSearchParams(window.location.search);
  // Legacy: ?se=1 → day 4 + SE theme (kept for backward compatibility with
  // shared links from before the santo-entierro/ subdirectory existed)
  if(p.has('se')){
    currentDay=4;isSEMode=true;explicitDay=true;
  }
  // Legacy: ?dia=N
  if(p.has('dia')){
    const d=parseInt(p.get('dia'));
    if(d>=0&&d<=4){currentDay=d;explicitDay=true;}
    if(d===4) isSEMode=true;
  }
  // Legacy: ?saca=N sets default group
  if(p.has('saca')) $('cS').value=p.get('saca');
  // Public group picker: shown for everyone except admins (auth flips this later)
  if(isShared && _spectatorMode){
    // Spectator: no group needed; use sensible defaults and skip the picker.
    var savedSpec=localStorage.getItem(isSEMode?'sharedUserSE':'sharedUser');
    if(savedSpec){ try{ var ss=JSON.parse(savedSpec); $('cType').value=ss.t||21; $('cG').value=ss.g||5; }catch(e){} }
  } else if(isShared){
    var storageKey=isSEMode?'sharedUserSE':'sharedUser';
    const saved=localStorage.getItem(storageKey);
    if(saved){
      const s=JSON.parse(saved);
      sharedPickedType=+s.t||21;
      sharedPickedColor=+s.color||0;
      sharedLastGroup=+s.g||0;
      $('cType').value=s.t;
      $('cG').value=s.g;
      if(s.color!==undefined) $('cColor').value=s.color;
      $('colorDiv').style.display=(+s.t===27)?'block':'none';
      if(isSEMode){
        var isM3=(+s.t===27);
        $('cS').value=isM3?defaultSacaM[4]:defaultSacaH[4];
      }
    } else {
      if(isSEMode){
        var step1El=document.getElementById('step1');
        if(step1El){
          step1El.innerHTML='<div style="font-size:20px;margin-bottom:4px">✝️</div><div style="font-size:16px;color:#e8e8e8;font-weight:700;margin-bottom:4px;letter-spacing:1px">SANTO ENTIERRO DE CRISTO</div><div style="font-size:12px;color:#aaa;margin-bottom:16px" id="sharedDayLabel"></div><div style="font-size:14px;color:#eee;margin-bottom:14px;font-weight:600">¿Qué cargás?</div><div style="display:flex;gap:12px;justify-content:center"><div onclick="pickType(21)" style="cursor:pointer;flex:1;background:#000;border:2px solid #444;border-radius:14px;padding:12px;text-align:center"><img src="'+_asset('se-entierro.jpg')+'" style="width:100%;border-radius:10px;margin-bottom:8px"><div style="font-size:14px;color:#e8e8e8;font-weight:700">CARGADOR</div><div style="font-size:11px;color:#aaa">22 grupos</div></div><div onclick="pickType(27)" style="cursor:pointer;flex:1;background:#000;border:2px solid #444;border-radius:14px;padding:12px;text-align:center"><img src="'+_asset('se-virgen.jpg')+'" style="width:100%;border-radius:10px;margin-bottom:8px"><div style="font-size:14px;color:#e8e8e8;font-weight:700">CARGADORA</div><div style="font-size:11px;color:#aaa">23 grupos</div></div></div><div style="margin-top:14px;padding-top:12px;border-top:1px solid rgba(255,255,255,.12)"><button id="btnSpectator" onclick="pickSpectator()" style="width:100%;padding:12px;border:1px solid #888;border-radius:12px;background:rgba(255,255,255,.05);color:#ddd;font-size:14px;font-weight:600;cursor:pointer;font-family:inherit">👁️ Solo quiero seguir la procesión</button><div style="font-size:10px;color:#888;margin-top:6px;text-align:center">Modo espectador · sin grupo</div></div>';
        }
      }
      $('sharedModal').style.display='flex';
      $('sharedDayLabel').textContent=isSEMode?'Santo Entierro de Cristo':dayNames[currentDay];
      ensureSpectatorButton();
    }
  }
  // Apply SE theme if day 4
  if(isSEMode){
    $('hTitle').textContent='✝️ Santo Entierro';
    $('hTitle').style.color='#e8e8e8';
    document.body.classList.add('se-mode');
    var opts=$('cType').options;
    for(var oi=0;oi<opts.length;oi++){
      if(opts[oi].value==='21') opts[oi].textContent='Hombres (22 grupos)';
      if(opts[oi].value==='27') opts[oi].textContent='Mujeres (23 grupos)';
    }
    var ds2=document.getElementById('daySelector');
    if(ds2) ds2.value=4;
  }
}

let sharedPickedType=21;
let sharedPickedColor=0;
let sharedLastGroup=0;

// Spectator mode: a viewer who only follows the procession, no group/carries.
var _spectatorMode = (function(){ try{ return localStorage.getItem('procMode')==='espectador'; }catch(e){ return false; } })();
function setSpectatorMode(on){
  _spectatorMode = !!on;
  try{ localStorage.setItem('procMode', on?'espectador':'cargador'); }catch(e){}
}
function pickSpectator(){
  setSpectatorMode(true);
  var sm=document.getElementById('sharedModal'); if(sm) sm.style.display='none';
  if(typeof calc==='function') calc();
}
// Inject the "Espectador" button into step1 of the shared modal once it is
// visible (SE mode rebuilds step1's HTML, so we append after it shows).
function ensureSpectatorButton(){
  var step1=document.getElementById('step1');
  if(!step1 || document.getElementById('btnSpectator')) return;
  var wrap=document.createElement('div');
  wrap.id='btnSpectatorWrap';
  wrap.style.cssText='margin-top:14px;padding-top:12px;border-top:1px solid rgba(255,255,255,.12)';
  var b=document.createElement('button');
  b.id='btnSpectator';
  b.onclick=pickSpectator;
  b.style.cssText='width:100%;padding:12px;border:1px solid #888;border-radius:12px;background:rgba(255,255,255,.05);color:#ddd;font-size:14px;font-weight:600;cursor:pointer;font-family:inherit';
  b.innerHTML='👁️ Solo quiero seguir la procesión';
  wrap.appendChild(b);
  var hint=document.createElement('div');
  hint.style.cssText='font-size:10px;color:#888;margin-top:6px;text-align:center';
  hint.textContent='Modo espectador · sin grupo';
  wrap.appendChild(hint);
  step1.appendChild(wrap);
}

function pickType(t){
  sharedPickedType=t;
  $('step1').style.display='none';
  if(t===27){
    $('step2').style.display='block';
  } else {
    showGroupGrid(t);
  }
}

function pickColor(c){
  sharedPickedColor=c;
  $('step2').style.display='none';
  showGroupGrid(sharedPickedType);
}

function showGroupGrid(t){
  $('step3').style.display='block';
  const colores=['🟡','🔴','🔵'];
  var gridCount=isSEMode?(t===27?23:22):t;
  $('step3label').textContent=isSEMode?(t===27?'23 grupos · Virgen Dolorosa':'22 grupos · Santo Entierro'):t===27?'Cargadora '+colores[sharedPickedColor]+' · '+t+' grupos':t+' grupos';
  let h='';
  for(let i=1;i<=gridCount;i++){
    const isLast=(i===sharedLastGroup);
    const goldBg=isSEMode?(isLast?'background:#e8e8e8;color:#000;border-color:#e8e8e8':'background:rgba(255,255,255,.08);color:#e8e8e8;border-color:#444'):'';
    const purpleBg=!isSEMode?(isLast?'background:#7c3aed;color:#fff;border-color:#c084fc':'background:rgba(124,58,237,.15);color:#c084fc;border-color:#7c3aed'):'';
    const bg=isSEMode?goldBg:purpleBg;
    h+='<button onclick="pickGroup('+i+')" style="padding:10px 0;border:1px solid;border-radius:8px;'+bg+';font-size:16px;font-weight:700;cursor:pointer;font-family:inherit">'+i+'</button>';
  }
  $('groupGrid').innerHTML=h;
}

function pickGroup(g){
  // Choosing a group means the user is a carrier, not a spectator.
  setSpectatorMode(false);
  $('cType').value=sharedPickedType;
  $('cG').value=g;
  if(sharedPickedType===27) $('cColor').value=sharedPickedColor;
  $('colorDiv').style.display=(sharedPickedType===27)?'block':'none';
  const isM=(sharedPickedType===27);
  $('cS').value=isM?defaultSacaM[currentDay]:defaultSacaH[currentDay];
  localStorage.setItem(isSEMode?'sharedUserSE':'sharedUser',JSON.stringify({t:sharedPickedType,g:g,color:sharedPickedColor}));
  $('sharedModal').style.display='none';
  calc();
}

function reopenGroupSelector(){
  // Reset modal to step 1 (type selection)
  $('step1').style.display='block';
  $('step2').style.display='none';
  $('step3').style.display='none';
  $('sharedDayLabel').textContent=isSEMode?'Santo Entierro de Cristo':dayNames[currentDay];
  $('sharedModal').style.display='flex';
}

function shareWhatsApp(){
  // Two installable PWAs from this codebase, both under a common root.
  // Build the canonical link for the current mode by trimming the current
  // app's directory off the path and appending the target's directory.
  const isSE = isSEMode || currentDay === 4;
  let pn = window.location.pathname;
  pn = pn.replace(/index\.html$/, '');
  pn = pn.replace(/(jesus-nazareno|santo-entierro)\/$/, '');
  if(!pn.endsWith('/')) pn += '/';
  const root = window.location.origin + pn;
  const link = root + (isSE ? 'santo-entierro/' : 'jesus-nazareno/');
  const msg=(isSE?'✝️ *Santo Entierro de Cristo · Sonsonate*\n\n':'✝️ *Jesús Nazareno · Sonsonate*\n\n')
    +'Rastreo en vivo de la procesión\n'
    +'Abrí el link, elegí tu grupo y mirá tus cargadas:\n'+link;
  if(navigator.share){
    navigator.share({title:isSE?'Santo Entierro · Sonsonate':'Jesús Nazareno · Sonsonate',text:msg,url:link}).catch(function(){});
  } else {
    window.open('https://wa.me/?text='+encodeURIComponent(msg),'_blank');
  }
}

// Filter the day-selector options to match the current mode for public users.
// Admins keep all options so they can edit any day from a single view.
function applyDayFilter(){
  var sel = document.getElementById('daySelector');
  if(!sel) return;
  var seOpt = document.getElementById('seOpt');
  var procOpts = sel.querySelectorAll('option:not(#seOpt)');
  if(isAdmin){
    // Admin: every option visible
    if(seOpt) seOpt.hidden = false;
    procOpts.forEach(function(o){ o.hidden = false; });
    sel.style.display = '';
    return;
  }
  if(isSEMode){
    // Public viewer locked to Santo Entierro
    procOpts.forEach(function(o){ o.hidden = true; });
    if(seOpt) seOpt.hidden = false;
    // Only one option left — hide the dropdown entirely to reduce clutter
    sel.style.display = 'none';
  } else {
    // Public viewer locked to the regular procession days
    if(seOpt) seOpt.hidden = true;
    procOpts.forEach(function(o){ o.hidden = false; });
    sel.style.display = '';
  }
}

function showOffSeasonBanner(){
  if(document.getElementById('offSeasonBanner')) return;
  var b=document.createElement('div');
  b.id='offSeasonBanner';
  b.style.cssText='padding:8px 12px;background:rgba(124,58,237,.15);border-bottom:1px solid rgba(124,58,237,.3);text-align:center;font-size:11px;color:#c084fc;line-height:1.4';
  b.innerHTML='📜 Semana Santa terminó. Estás viendo el resultado del último día. Volvé el próximo año.';
  var hdr=document.querySelector('.hdr');
  if(hdr&&hdr.nextSibling) hdr.parentNode.insertBefore(b,hdr.nextSibling);
  else document.body.insertBefore(b,document.body.firstChild);
}

// Offline indicator: red banner under the header whenever the device drops
// its network connection. We keep it minimal and pure-CSS so it can render
// even if the rest of the app is mid-load.
(function(){
  function _ensureBanner(){
    var b=document.getElementById('offlineBanner');
    if(b) return b;
    b=document.createElement('div');
    b.id='offlineBanner';
    b.style.cssText='padding:9px 12px;background:rgba(220,38,38,.18);border-bottom:1px solid rgba(220,38,38,.45);text-align:center;font-size:13px;color:#ff8a8a;font-weight:600;line-height:1.4;display:none';
    b.innerHTML='📡 Sin conexión — los datos pueden estar desactualizados';
    return b;
  }
  function _attach(){
    var b=_ensureBanner();
    if(b.parentNode) return; // already inserted
    var hdr=document.querySelector('.hdr');
    if(hdr && hdr.nextSibling) hdr.parentNode.insertBefore(b, hdr.nextSibling);
    else if(document.body) document.body.insertBefore(b, document.body.firstChild);
  }
  function _show(){ _attach(); var b=document.getElementById('offlineBanner'); if(b) b.style.display='block'; }
  function _hide(){ var b=document.getElementById('offlineBanner'); if(b) b.style.display='none'; }
  // Wait for body to exist before trying to attach
  function _init(){
    _attach();
    if(!navigator.onLine) _show();
    window.addEventListener('offline', _show);
    window.addEventListener('online', _hide);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', _init);
  else _init();
})();

// Pull-to-refresh: when scrolled to the top of the page, dragging downward
// past the threshold reloads the page. Skipped if the touch starts on the
// Google Map (Google Maps handles its own pan gestures and we don't want
// to fight it). Designed to feel native on Android Chrome.
(function(){
  var startY=0, currentY=0, pulling=false, indicator=null;
  var THRESHOLD=72;
  function _ind(){
    if(indicator) return indicator;
    indicator=document.createElement('div');
    indicator.id='ptrIndicator';
    indicator.style.cssText='position:fixed;top:52px;left:0;right:0;height:0;background:rgba(26,10,31,.96);color:#aaa;text-align:center;z-index:3000;font-size:13px;font-weight:600;overflow:hidden;display:flex;align-items:center;justify-content:center;pointer-events:none;border-bottom:1px solid rgba(255,255,255,.08);transition:height .12s ease-out';
    indicator.innerHTML='↓ Tirá para refrescar';
    document.body.appendChild(indicator);
    return indicator;
  }
  function _set(distance){
    var ind=_ind();
    var h=Math.min(distance,90);
    ind.style.height=h+'px';
    if(distance>THRESHOLD){
      ind.innerHTML='↑ Soltá para refrescar';
      ind.style.color=seAccent();
    } else {
      ind.innerHTML='↓ Tirá para refrescar';
      ind.style.color='#aaa';
    }
  }
  function _reset(){
    var ind=_ind();
    ind.style.transition='height .2s ease-out';
    ind.style.height='0';
    setTimeout(function(){ if(ind) ind.style.transition='height .12s ease-out'; },220);
  }
  document.addEventListener('touchstart',function(e){
    if(window.scrollY>5) return;
    if(e.touches.length!==1) return;
    // Skip when the gesture starts inside the Google Map — Maps handles
    // its own pan and we mustn't hijack it
    var t=e.target;
    if(t && (t.closest && (t.closest('#map') || t.closest('.gm-style')))) return;
    startY=e.touches[0].pageY;
    currentY=startY;
    pulling=true;
  },{passive:true});
  document.addEventListener('touchmove',function(e){
    if(!pulling) return;
    if(window.scrollY>0){ pulling=false; _reset(); return; }
    currentY=e.touches[0].pageY;
    var distance=currentY-startY;
    if(distance<0){ pulling=false; _reset(); return; }
    if(distance>4) _set(distance);
  },{passive:true});
  document.addEventListener('touchend',function(){
    if(!pulling) return;
    pulling=false;
    var distance=currentY-startY;
    if(distance>THRESHOLD){
      var ind=_ind();
      ind.style.height='44px';
      ind.style.color='#c084fc';
      ind.innerHTML='⟳ Refrescando...';
      setTimeout(function(){ location.reload(); },180);
    } else {
      _reset();
    }
  },{passive:true});
})();

const $ = id => document.getElementById(id);
function _escapeHtml(s){
  return String(s==null?'':s).replace(/[&<>"']/g, function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});
}

// Static asset prefix. The procession and Santo Entierro PWAs live in
// /jesus-nazareno/ and /santo-entierro/ subdirectories; their HTML and
// markers reference shared images that live in the parent directory.
var _ASSET_PREFIX = (function(){
  var pn = window.location.pathname;
  return (pn.indexOf('/jesus-nazareno/') !== -1 || pn.indexOf('/santo-entierro/') !== -1) ? '../' : './';
})();
function _asset(name){ return _ASSET_PREFIX + name; }

// Mobile detection — used to apply tighter marker culling and stricter
// label thresholds, since phones have far less GPU/CPU headroom for
// 100+ Google Maps markers than a desktop browser.
var _MOBILE = (function(){
  var ua = navigator.userAgent || '';
  if(/Mobi|Android|iPhone|iPad|iPod/i.test(ua)) return true;
  // Some Android tablets identify as Linux but expose touch + small DPI
  if(navigator.maxTouchPoints > 1 && window.innerWidth < 900) return true;
  return false;
})();

// Resolve a time-of-day (hour h, minute m) to the closest real Date around
// "now". Procession days routinely cross midnight (Lun/Mar/Mié/Vie often go
// past 1 AM, Santo Entierro past 5 AM), so a naive new Date() + setHours()
// puts the timestamp 22+ hours in the future when the user enters a
// pre-midnight time after midnight has already passed.
//
//   mode='past'   → the time refers to something that already happened.
//                   If naive parse lands >12h in the future, it was
//                   actually yesterday; subtract a day.
//   mode='future' → the time is an upcoming estimate.
//                   If naive parse lands >12h in the past, it's actually
//                   tomorrow; add a day.
function _resolveTimeOfDay(h, m, mode){
  var now = new Date();
  var d = new Date();
  d.setHours(h, m, 0, 0);
  var diff = d.getTime() - now.getTime();
  var TWELVE_H = 12 * 3600 * 1000;
  if(mode === 'past' && diff > TWELVE_H){
    d.setDate(d.getDate() - 1);
  } else if(mode === 'future' && diff < -TWELVE_H){
    d.setDate(d.getDate() + 1);
  }
  return d;
}

// Initialize early so any later GPS-active comparison
// (Date.now() - window._lastRealGPS < GPS_TIMEOUT) is well-defined even
// before the auto-time bootstrap block runs further down.
if(typeof window._lastRealGPS !== 'number') window._lastRealGPS = 0;

// Stable per-tab session id used as the Firebase key for the GPS keep-
// alive ping, replacing the timestamp%10000 scheme that could collide
// across two GPS-tracking phones pinging on the same millisecond.
var _GPS_SESSION_ID = 'gps_' + Math.random().toString(36).substring(2, 10)
  + '_' + Date.now().toString(36);

// Convert an FCM push token into a Firebase-safe key. FCM tokens can
// contain '/' '.' '$' '#' '[' ']' which are forbidden in Realtime
// Database keys. Replace those with underscores so we can use the FULL
// token as the key — the previous .substring(0,20) truncation collided
// across phones whose tokens happened to share a prefix.
function _tokenToKey(t){
  return String(t || '').replace(/[.\#$\[\]\/]/g, '_');
}

// Non-blocking alert that replaces the native one. Native browser alerts
// pause the entire JS thread and on PWAs are sometimes suppressed entirely;
// this modal shows the same message without freezing the page.
function customAlert(message){
  var overlay = document.createElement('div');
  overlay.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,.85);z-index:99998;display:flex;align-items:center;justify-content:center;padding:16px';
  overlay.innerHTML='<div style="background:#1a0a1f;border:2px solid #c084fc;border-radius:14px;padding:22px;max-width:360px;width:100%;box-shadow:0 8px 30px rgba(0,0,0,.6)"><div id="customAlertMsg" style="color:#eee;font-size:16px;line-height:1.5;margin-bottom:18px;white-space:pre-wrap;word-wrap:break-word"></div><button id="customAlertOK" style="width:100%;padding:12px;background:rgba(124,58,237,.2);border:1px solid #7c3aed;color:#c084fc;font-weight:700;font-size:15px;border-radius:8px;cursor:pointer;font-family:inherit">OK</button></div>';
  document.body.appendChild(overlay);
  overlay.querySelector('#customAlertMsg').textContent = String(message==null?'':message);
  var btn = overlay.querySelector('#customAlertOK');
  var close = function(){ overlay.remove(); document.removeEventListener('keydown', onKey); };
  var onKey = function(e){ if(e.key==='Enter'||e.key==='Escape') close(); };
  btn.addEventListener('click', close);
  overlay.addEventListener('click', function(e){ if(e.target===overlay) close(); });
  document.addEventListener('keydown', onKey);
  setTimeout(function(){ btn.focus(); }, 0);
}
window.alert = customAlert;

function _customDialog(opts){
  // Shared modal scaffold for confirm/prompt. Returns a Promise.
  return new Promise(function(resolve){
    var overlay = document.createElement('div');
    overlay.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,.85);z-index:99998;display:flex;align-items:center;justify-content:center;padding:16px';
    var inputHtml = opts.input ? '<input id="cdInput" type="text" style="width:100%;background:rgba(0,0,0,.4);border:1px solid #666;color:#fff;padding:12px;border-radius:6px;font-size:16px;font-family:inherit;margin-bottom:14px">' : '';
    var okLabel = opts.okLabel || 'OK';
    var cancelLabel = opts.cancelLabel || 'Cancelar';
    overlay.innerHTML =
      '<div style="background:#1a0a1f;border:2px solid #c084fc;border-radius:14px;padding:22px;max-width:360px;width:100%;box-shadow:0 8px 30px rgba(0,0,0,.6)">' +
      '<div id="cdMsg" style="color:#eee;font-size:16px;line-height:1.5;margin-bottom:16px;white-space:pre-wrap;word-wrap:break-word"></div>' +
      inputHtml +
      '<div style="display:flex;gap:10px">' +
      '<button id="cdCancel" style="flex:1;padding:12px;background:none;border:1px solid #666;color:#bbb;font-weight:600;font-size:15px;border-radius:8px;cursor:pointer;font-family:inherit">'+cancelLabel+'</button>' +
      '<button id="cdOK" style="flex:1;padding:12px;background:rgba(124,58,237,.2);border:1px solid #7c3aed;color:#c084fc;font-weight:700;font-size:15px;border-radius:8px;cursor:pointer;font-family:inherit">'+okLabel+'</button>' +
      '</div></div>';
    document.body.appendChild(overlay);
    overlay.querySelector('#cdMsg').textContent = String(opts.message==null?'':opts.message);
    var input = overlay.querySelector('#cdInput');
    if(input){ input.value = opts.defaultValue || ''; setTimeout(function(){ input.focus(); input.select(); }, 0); }
    else { setTimeout(function(){ overlay.querySelector('#cdOK').focus(); }, 0); }
    var close = function(result){
      overlay.remove();
      document.removeEventListener('keydown', onKey);
      resolve(result);
    };
    var doOK = function(){ close(opts.input ? input.value : true); };
    var doCancel = function(){ close(opts.input ? null : false); };
    var onKey = function(e){
      if(e.key==='Enter'){ e.preventDefault(); doOK(); }
      else if(e.key==='Escape'){ e.preventDefault(); doCancel(); }
    };
    overlay.querySelector('#cdOK').addEventListener('click', doOK);
    overlay.querySelector('#cdCancel').addEventListener('click', doCancel);
    overlay.addEventListener('click', function(e){ if(e.target===overlay) doCancel(); });
    document.addEventListener('keydown', onKey);
  });
}

function customConfirm(message){
  return _customDialog({message: message, input: false, okLabel: 'Sí', cancelLabel: 'No'});
}

function customPrompt(message, defaultValue){
  return _customDialog({message: message, input: true, defaultValue: defaultValue, okLabel: 'OK', cancelLabel: 'Cancelar'});
}

// Centralized error logger for swallowed exceptions. Silent by default; turn on
// in the browser console with `window._debug = true` to surface every catch
// that was previously empty. Useful for diagnosing field issues without
// flooding logs in production.
function _logErr(label, err){
  try{
    if(window._debug || (typeof localStorage!=='undefined' && localStorage.getItem('debug')==='1')){
      console.warn('['+label+']', err);
    }
  }catch(_){/* localStorage unavailable in private mode */}
}
function cfg() {
  var mujGrupos=isSEMode?23:27;
  var st=getStartTime();
  return {g:+$('cG').value||5, t:+$('cType').value||21, s:+$('cS').value||19, h:st.h, hm:st.m, mn:+$('cMn').value||6, color:+($('cColor')?$('cColor').value:0), mujG:mujGrupos};
}
function getMujCount(){return isSEMode?23:27;}
function getHomCount(){return isSEMode?22:21;}
// Default sacas: [lun, mar, mie, vie] per type
const defaultSacaH = [19, 17, 13, 16, 5]; // hombres 21 grupos
const defaultSacaM = [19, 27, 13, 22, 6]; // mujeres 27 grupos
function localDateStr(dt){var y=dt.getFullYear();var m=String(dt.getMonth()+1).padStart(2,'0');var d=String(dt.getDate()).padStart(2,'0');return y+'-'+m+'-'+d;}
function getStartTime(){
  var h=+($('cHour')?$('cHour').value:15);
  var m=+($('cMin')?$('cMin').value:0);
  return{h:h,m:m};
}
function parseTimeStr(v){
  if(typeof v==='number') return{h:v,m:0};
  if(typeof v==='string'&&v.indexOf(':')>=0){var p=v.split(':');return{h:parseInt(p[0])||15,m:parseInt(p[1])||0};}
  return{h:parseInt(v)||15,m:0};
}
function updateStartTime(){
  var st=getStartTime();
  dayHours[currentDay]=String(st.h).padStart(2,'0')+':'+String(st.m).padStart(2,'0');
  calc();
  
  // Only auto-position if this day is TODAY
  var now=new Date();
  var checkDate=new Date(now);
  if(now.getHours()<5) checkDate.setDate(checkDate.getDate()-1);
  var todayStr=localDateStr(checkDate);
  var isToday=(dayDates[currentDay]===todayStr);
  
  if(positions.length>0&&!isShared&&isToday){
    var mn=+$('cMn').value||6;
    var departMs=new Date(dayDates[currentDay]+'T'+String(st.h).padStart(2,'0')+':'+String(st.m).padStart(2,'0')+':00').getTime();
    var elapsed=Date.now()-departMs;
    
    if(elapsed>0){
      var expectedCambio=Math.floor(elapsed/(mn*60000))+1;
      expectedCambio=Math.min(expectedCambio,positions.length);
      expectedCambio=Math.max(1,expectedCambio);
      
      if(expectedCambio!==currentGrupoActual){
        currentGrupoActual=expectedCambio;
        var sacaH=daySaca[currentDay]||16;
        var grp=((sacaH-1+expectedCambio-1)%getHomCount())+1;
        var nombre=(expectedCambio<=changes.length&&changes[expectedCambio-1])?changes[expectedCambio-1].n||'':'';
        // Set timestamp to the calculated time for this cambio (not Date.now)
        var correctTs=departMs+(expectedCambio-1)*mn*60000;
        liveGrupoData={cambio:expectedCambio,grp:grp,nombre:nombre,tot:positions.length,desfase:virgenDesfase,movidos:virgenMovidos,sacaMuj:daySacaMuj[currentDay],t:correctTs,autoSet:true};
        try{localStorage.setItem('grupoActual_day'+currentDay,JSON.stringify(liveGrupoData));}catch(e){_logErr("swallow",e);}
        saveAll();
        db.ref('grupoActual/day'+currentDay).set(liveGrupoData);
      }
      window._autoTimeOffset=0;
      if(typeof syncAutoState==='function') syncAutoState();
    } else {
      currentGrupoActual=0;
      liveGrupoData={cambio:0,grp:0,nombre:'',tot:positions.length,desfase:virgenDesfase,movidos:virgenMovidos,sacaMuj:daySacaMuj[currentDay],t:Date.now()};
      db.ref('grupoActual/day'+currentDay).set(liveGrupoData);
      window._autoTimeOffset=0;
      if(typeof syncAutoState==='function') syncAutoState();
    }
  }
  
  if(typeof renderLive==='function') renderLive();
  if(typeof syncConfig==='function') syncConfig();
  if(window._autoTimeRunning) autoTimeStep();
  forceAndaPosition();
}
function updateRhythm(){
  calc();
  if(typeof renderLive==='function') renderLive();
  if(typeof syncConfig==='function') syncConfig();
  if(window._autoTimeRunning) autoTimeStep();
  forceAndaPosition();
}
function forceAndaPosition(){
  if(!positions.length) return;
  if(Date.now()-window._lastRealGPS<GPS_TIMEOUT) return;
  var _stF=getStartTime();
  var mn=window._realRhythm||(+$('cMn').value)||6;
  var dateStr=dayDates[currentDay]||localDateStr(new Date());
  var startTime=new Date(dateStr+'T'+String(_stF.h).padStart(2,'0')+':'+String(_stF.m).padStart(2,'0')+':00').getTime();
  var now=Date.now()+(window._autoTimeOffset*60000);
  var elapsed=now-startTime;
  if(elapsed<0) return;
  var mnMs=mn*60000;
  var exactPos=elapsed/mnMs;
  var camb=Math.floor(exactPos)+1;
  var frac=exactPos-Math.floor(exactPos);
  camb=Math.min(camb,positions.length);
  camb=Math.max(1,camb);
  // Interpolate Jesus
  var idxA=Math.min(camb-1,positions.length-1);
  var idxB=Math.min(camb,positions.length-1);
  var ptA=positions[idxA],ptB=positions[idxB];
  var jLat=ptA.lat+(ptB.lat-ptA.lat)*frac;
  var jLng=ptA.lng+(ptB.lng-ptA.lng)*frac;
  db.ref('jesus').set({lat:jLat,lng:jLng,t:Date.now()});
  // Interpolate Virgen
  var vRoute=(positionsW.length>=2)?positionsW:positions;
  var vExact=Math.max(0,exactPos-virgenDesfase);
  var vC=Math.floor(vExact);
  var vF=vExact-vC;
  var vA=Math.min(vC,vRoute.length-1);
  var vB=Math.min(vC+1,vRoute.length-1);
  var vLat=vRoute[vA].lat+(vRoute[vB].lat-vRoute[vA].lat)*vF;
  var vLng=vRoute[vA].lng+(vRoute[vB].lng-vRoute[vA].lng)*vF;
  db.ref('virgen').set({lat:vLat,lng:vLng,t:Date.now()});
}
function setStartTimeUI(h,m){
  if($('cHour')) $('cHour').value=h;
  if($('cMin')){
    // Snap to nearest 5
    var snapped=Math.round(m/5)*5;if(snapped>=60)snapped=55;
    $('cMin').value=snapped;
  }
}
function changeDayDate(val){
  dayDates[currentDay]=val;
  // Auto-fill using Semana Santa intervals
  // Gaps: Lun→Mar:1, Mar→Mie:1, Mie→Vie:2 (skip Jueves), Vie→SE:0
  var gaps=[0,1,1,2,0]; // gap FROM previous day TO this day
  var d=new Date(val+'T12:00:00');
  for(var i=currentDay-1;i>=0;i--){
    d.setDate(d.getDate()-gaps[i+1]);
    dayDates[i]=localDateStr(d);
  }
  d=new Date(val+'T12:00:00');
  for(var j=currentDay+1;j<dayDates.length;j++){
    d.setDate(d.getDate()+gaps[j]);
    dayDates[j]=localDateStr(d);
    d=new Date(dayDates[j]+'T12:00:00');
  }
  // Auto-calculate sacas: each day's saca = previous day's last group + 1
  for(var k=1;k<5;k++){
    if(k===4) continue;
    var prevLast=getLastGroup(k-1);
    if(prevLast>0){
      var isM=(+$('cType').value===27);
      var grpCount=isM?getMujCount():getHomCount();
      var nextSaca=(prevLast%grpCount)+1;
      if(isM){daySacaMuj[k]=nextSaca;}
      else{daySaca[k]=nextSaca;}
    }
  }
  // Auto-complete past days in Firebase
  var now=new Date();
  for(var p=0;p<dayDates.length;p++){
    var ddPast=isDayPast(p);
    if(ddPast&&p!==currentDay){
      var dayPts=[LUN_PTS,MART_PTS,MIER_PTS,VIER_PTS,SE_PTS];
      var pts=dayPts[p]||[];
      var totP=savedPositions[p]?savedPositions[p].length:pts.length;
      if(totP>0){
        var sacaP=daySaca[p]||17;
        var lastGrpP=((sacaP-1+totP-1)%getHomCount())+1;
        var pastData={cambio:totP,grp:lastGrpP,nombre:'',tot:totP,desfase:0,movidos:0,sacaMuj:daySacaMuj[p]||22,t:Date.now()};
        db.ref('grupoActual/day'+p).set(pastData);
      }
    }
  }
  detectToday();
  // Reset avance for current day
  currentGrupoActual=0;
  liveGrupoData={cambio:0,grp:0,nombre:'',tot:positions.length||44,desfase:0,movidos:0,sacaMuj:daySacaMuj[currentDay]||6,t:Date.now()};
  db.ref('grupoActual/day'+currentDay).set(liveGrupoData);
  var bc2=document.getElementById('bannersContainer');if(bc2) bc2.innerHTML='';
  // Update UI
  var isM2=(+$('cType').value===27);
  $('cS').value=isM2?daySacaMuj[currentDay]:daySaca[currentDay];
  if($('cDate')) $('cDate').value=dayDates[currentDay];
  calc();
  renderLive();
  updateBanners();
  saveAll();
  syncConfig();
}
function openCfg(){
  $('cfgP').style.display='block';
  $('cfgOverlay').style.display='block';
  // Show cortesias config only for Viernes
  var cc=document.getElementById('cortesiasConfig');
  if(cc) cc.style.display=(currentDay===3)?'block':'none';
  if(cc&&currentDay===3){
    var ch=document.getElementById('cortCambioH');if(ch) ch.value=VIER_CORTESIAS_CHANGE;
    var cm=document.getElementById('cortCambioM');if(cm) cm.value=VIER_CORTESIAS_CHANGE_M;
    var cmin=document.getElementById('cortMinutos');if(cmin) cmin.value=VIER_CORTESIAS_MIN;
  }
  updateAdminLiveControls();
  // Lazily inject a "mode switch" section — only for public (non-admin) users.
  if(isShared && !document.getElementById('cfgModeSection')){
    var panelM=document.getElementById('cfgP');
    if(panelM){
      var msec=document.createElement('div');
      msec.id='cfgModeSection';
      msec.style.cssText='border-top:1px solid rgba(255,255,255,.1);margin-top:10px;padding-top:10px';
      msec.innerHTML='<div style="font-size:12px;color:#aaa;margin-bottom:6px">👁️ Modo de uso</div><div id="cfgModeBtns"></div>'
        +'<div style="font-size:10px;color:#666;margin-top:6px;line-height:1.4">Espectador: seguís la procesión sin grupo. Cargador: registrás tus cargadas.</div>';
      panelM.appendChild(msec);
    }
  }
  renderModeButtons();
  // Lazily inject the "reading size" toggle.
  if(!document.getElementById('cfgTextSection')){
    var panelT=document.getElementById('cfgP');
    if(panelT){
      var tsec=document.createElement('div');
      tsec.id='cfgTextSection';
      tsec.style.cssText='border-top:1px solid rgba(255,255,255,.1);margin-top:10px;padding-top:10px';
      tsec.innerHTML='<div style="font-size:12px;color:#aaa;margin-bottom:6px">🔠 Tamaño de letra</div><div id="cfgTextBtns"></div>'
        +'<div style="font-size:10px;color:#666;margin-top:6px;line-height:1.4">Agranda los textos de cargadas y oraciones para leerlos más fácil.</div>';
      panelT.appendChild(tsec);
    }
  }
  renderTextSizeButtons();
  // Lazily inject a "force update" section at the bottom of the cfg panel.
  // Visible to everyone so users can always nudge the PWA to refresh.
  if(!document.getElementById('cfgUpdateSection')){
    var panel=document.getElementById('cfgP');
    if(panel){
      var sec=document.createElement('div');
      sec.id='cfgUpdateSection';
      sec.style.cssText='border-top:1px solid rgba(255,255,255,.1);margin-top:10px;padding-top:10px';
      sec.innerHTML=
        '<div style="font-size:12px;color:#aaa;margin-bottom:6px">🔄 Actualizar la app</div>'
        +'<button id="forceUpdateBtn" onclick="forceUpdateApp()" style="width:100%;padding:10px;border:1px solid #7c3aed;border-radius:8px;background:rgba(124,58,237,.15);color:#c084fc;font-size:13px;font-weight:700;cursor:pointer;font-family:inherit">🔄 Forzar actualización ahora</button>'
        +'<div style="font-size:10px;color:#666;margin-top:6px;line-height:1.4">Borra el caché local y descarga la versión más reciente. Útil si los cambios no aparecen automáticamente.</div>';
      panel.appendChild(sec);
    }
  }
}

function renderModeButtons(){
  var el=document.getElementById('cfgModeBtns');
  if(!el) return;
  var specOn=_spectatorMode;
  el.style.cssText='display:flex;gap:6px';
  el.innerHTML=
    '<button onclick="switchToCargador()" style="flex:1;padding:9px;border:1px solid '+(!specOn?'#7c3aed':'#666')+';border-radius:8px;background:'+(!specOn?'rgba(124,58,237,.2)':'rgba(255,255,255,.04)')+';color:'+(!specOn?'#c084fc':'#888')+';font-size:13px;font-weight:700;cursor:pointer;font-family:inherit">🙋 Cargador</button>'
    +'<button onclick="switchToSpectator()" style="flex:1;padding:9px;border:1px solid '+(specOn?'#7c3aed':'#666')+';border-radius:8px;background:'+(specOn?'rgba(124,58,237,.2)':'rgba(255,255,255,.04)')+';color:'+(specOn?'#c084fc':'#888')+';font-size:13px;font-weight:700;cursor:pointer;font-family:inherit">👁️ Espectador</button>';
}
var _bigText=(function(){ try{ return localStorage.getItem('bigText')==='1'; }catch(e){ return false; } })();
function applyBigText(){ document.body.classList.toggle('big-text', _bigText); }
function setBigText(on){
  _bigText=!!on;
  try{ localStorage.setItem('bigText', on?'1':'0'); }catch(e){}
  applyBigText();
  renderTextSizeButtons();
}
function renderTextSizeButtons(){
  var el=document.getElementById('cfgTextBtns');
  if(!el) return;
  el.style.cssText='display:flex;gap:6px';
  el.innerHTML=
    '<button onclick="setBigText(false)" style="flex:1;padding:9px;border:1px solid '+(!_bigText?'#7c3aed':'#666')+';border-radius:8px;background:'+(!_bigText?'rgba(124,58,237,.2)':'rgba(255,255,255,.04)')+';color:'+(!_bigText?'#c084fc':'#888')+';font-size:13px;font-weight:700;cursor:pointer;font-family:inherit">Normal</button>'
    +'<button onclick="setBigText(true)" style="flex:1;padding:9px;border:1px solid '+(_bigText?'#7c3aed':'#666')+';border-radius:8px;background:'+(_bigText?'rgba(124,58,237,.2)':'rgba(255,255,255,.04)')+';color:'+(_bigText?'#c084fc':'#888')+';font-size:16px;font-weight:700;cursor:pointer;font-family:inherit">Grande</button>';
}
function switchToSpectator(){
  setSpectatorMode(true);
  renderModeButtons();
  if(typeof calc==='function') calc();
}
function switchToCargador(){
  setSpectatorMode(false);
  renderModeButtons();
  // If no group was ever chosen, reopen the picker so they configure one.
  var saved=localStorage.getItem(isSEMode?'sharedUserSE':'sharedUser');
  if(!saved && isShared){
    closeCfg();
    var sm=document.getElementById('sharedModal'); if(sm){ sm.style.display='flex'; ensureSpectatorButton(); }
    return;
  }
  if(typeof calc==='function') calc();
}
function closeCfg(){
  $('cfgP').style.display='none';
  $('cfgOverlay').style.display='none';
}
function updateAdminLiveControls(){
  var el=$('adminLiveControls');
  if(!el||isShared) return;
  var h='';
  // Grupo actual +/-
  var sacaDef=daySaca[currentDay]||16;
  var adminGText='#'+sacaDef;
  if(liveGrupoData&&liveGrupoData.cambio>0){
    var adminTot=positions.length||changes.length;
    if(liveGrupoData.cambio>adminTot){adminGText='✅#'+(((sacaDef-1+adminTot-1)%getHomCount())+1);}
    else{adminGText='#'+(((sacaDef-1+liveGrupoData.cambio-1)%getHomCount())+1);}
  }
  h+='<div style="display:flex;gap:6px;margin-bottom:8px;align-items:center;justify-content:center">';
  h+='<span style="font-size:13px;color:#aaa">'+(isSEMode?'SE:':'Jesús:')+'</span>';
  h+='<button onclick="advanceGrupo(-1);updateAdminLiveControls()" style="padding:8px 16px;border:1px solid #666;border-radius:8px;background:rgba(255,255,255,.05);color:#ccc;font-size:18px;font-weight:700;cursor:pointer">−</button>';
  h+='<span onclick="setGrupoManual();updateAdminLiveControls()" style="font-size:22px;font-weight:700;color:#c084fc;min-width:50px;text-align:center;cursor:pointer;text-decoration:underline">'+adminGText+'</span>';
  h+='<button onclick="advanceGrupo(1);updateAdminLiveControls()" style="padding:8px 16px;border:1px solid #7c3aed;border-radius:8px;background:rgba(124,58,237,.3);color:#c084fc;font-size:18px;font-weight:700;cursor:pointer">+</button>';
  h+='</div>';
  // GPS + Auto toggles
  h+='<div style="display:flex;gap:6px;margin-bottom:8px;justify-content:center">';
  h+='<button onclick="toggleAutoGPS()" style="flex:1;padding:8px;border:1px solid '+(autoAdvanceGPS?seAccent():'#666')+';border-radius:8px;background:'+(autoAdvanceGPS?seAccentBg('.15'):'rgba(255,255,255,.05)')+';color:'+(autoAdvanceGPS?seAccent():'#888')+';font-size:13px;cursor:pointer;font-family:inherit">'+(autoAdvanceGPS?'📡 GPS: ON':'📡 GPS: OFF')+'</button>';
  var autoLabel=window._autoTimeRunning?(window._autoRemote?'⏱ Auto: ON 📡':'⏱ Auto: ON'):'⏱ Auto: OFF';
  h+='<button onclick="toggleAutoTime();updateAdminLiveControls();" style="flex:1;padding:8px;border:1px solid '+(window._autoTimeRunning?'#f44336':'#666')+';border-radius:8px;background:'+(window._autoTimeRunning?'rgba(244,67,54,.15)':'rgba(255,255,255,.05)')+';color:'+(window._autoTimeRunning?'#f44336':'#888')+';font-size:13px;cursor:pointer;font-family:inherit">'+autoLabel+'</button>';
  h+='</div>';
  // Ritmo offset
  if(window._autoTimeRunning){
    h+='<div style="display:flex;gap:6px;margin-bottom:8px;align-items:center;justify-content:center">';
    h+='<span style="font-size:12px;color:#f44336">Ritmo:</span>';
    h+='<button onclick="adjustAutoTime(-5);updateAdminLiveControls()" style="padding:4px 10px;border:1px solid #666;border-radius:6px;background:rgba(255,255,255,.05);color:#ccc;font-size:14px;cursor:pointer">-5m</button>';
    h+='<button onclick="adjustAutoTime(-1);updateAdminLiveControls()" style="padding:4px 10px;border:1px solid #666;border-radius:6px;background:rgba(255,255,255,.05);color:#ccc;font-size:14px;cursor:pointer">-1m</button>';
    h+='<span style="font-size:14px;font-weight:700;color:#f44336;min-width:40px;text-align:center">'+(window._autoTimeOffset>0?'+':'')+window._autoTimeOffset+'m</span>';
    h+='<button onclick="adjustAutoTime(1);updateAdminLiveControls()" style="padding:4px 10px;border:1px solid #f44336;border-radius:6px;background:rgba(244,67,54,.15);color:#f44336;font-size:14px;cursor:pointer">+1m</button>';
    h+='<button onclick="adjustAutoTime(5);updateAdminLiveControls()" style="padding:4px 10px;border:1px solid #f44336;border-radius:6px;background:rgba(244,67,54,.15);color:#f44336;font-size:14px;cursor:pointer">+5m</button>';
    h+='</div>';
  }
  // Show real rhythm from GPS (info only)
  if(window._realRhythm){
    h+='<div style="text-align:center;margin-bottom:6px;padding:4px;background:'+seAccentBg('.08')+';border-radius:6px;font-size:12px;color:'+seAccentTxt()+'">📡 Ritmo real GPS: <b>'+window._realRhythm+' min/cambio</b> (config: '+($('cMn').value||6)+' min)</div>';
  }
  // Desfase Virgen
  h+='<div style="display:flex;gap:6px;margin-bottom:6px;align-items:center;justify-content:center">';
  h+='<span style="font-size:13px;color:#93c5fd">Desfase Virgen:</span>';
  h+='<button onclick="changeDesfase(-1);updateAdminLiveControls()" style="padding:5px 12px;border:1px solid #666;border-radius:6px;background:rgba(255,255,255,.05);color:#ccc;font-size:16px;cursor:pointer">−</button>';
  h+='<span style="font-size:18px;font-weight:700;color:#93c5fd;min-width:30px;text-align:center">'+virgenDesfase+'</span>';
  h+='<button onclick="changeDesfase(1);updateAdminLiveControls()" style="padding:5px 12px;border:1px solid #3b82f6;border-radius:6px;background:rgba(59,130,246,.2);color:#93c5fd;font-size:16px;cursor:pointer">+</button>';
  h+='</div>';
  // Movidos Virgen
  h+='<div style="display:flex;gap:6px;margin-bottom:6px;align-items:center;justify-content:center">';
  h+='<span style="font-size:13px;color:#f59e0b">Movidos Virgen:</span>';
  h+='<button onclick="changeMovidos(-1);updateAdminLiveControls()" style="padding:5px 12px;border:1px solid #666;border-radius:6px;background:rgba(255,255,255,.05);color:#ccc;font-size:16px;cursor:pointer">−</button>';
  h+='<span style="font-size:18px;font-weight:700;color:#f59e0b;min-width:30px;text-align:center">'+(virgenMovidos>0?'+':'')+virgenMovidos+'</span>';
  h+='<button onclick="changeMovidos(1);updateAdminLiveControls()" style="padding:5px 12px;border:1px solid #f59e0b;border-radius:6px;background:rgba(245,158,11,.2);color:#f59e0b;font-size:16px;cursor:pointer">+</button>';
  h+='</div>';
  // Virgen own rhythm - only when she has her own route
  if(positionsW.length>=2){
    var vMnDisplay=virgenMn||+$('cMn').value||6;
    h+='<div style="display:flex;gap:6px;margin-bottom:6px;align-items:center;justify-content:center">';
    h+='<span style="font-size:13px;color:#3b82f6">Ritmo Virgen:</span>';
    h+='<button onclick="changeVirgenMn(-1);updateAdminLiveControls()" style="padding:5px 12px;border:1px solid #666;border-radius:6px;background:rgba(255,255,255,.05);color:#ccc;font-size:16px;cursor:pointer">−</button>';
    h+='<span style="font-size:18px;font-weight:700;color:#3b82f6;min-width:40px;text-align:center">'+vMnDisplay+'</span>';
    h+='<button onclick="changeVirgenMn(1);updateAdminLiveControls()" style="padding:5px 12px;border:1px solid #3b82f6;border-radius:6px;background:rgba(59,130,246,.2);color:#93c5fd;font-size:16px;cursor:pointer">+</button>';
    h+='<span style="font-size:10px;color:#888">min</span>';
    h+='</div>';
  }
  // Cortesías config (only Viernes)
  if(currentDay===3){
    var isMujC=(+$('cType').value===27);
    var cortV=isMujC?VIER_CORTESIAS_CHANGE_M:VIER_CORTESIAS_CHANGE;
    h+='<div style="border-top:1px solid rgba(255,152,0,.2);padding-top:6px;margin-top:6px">';
    h+='<div style="display:flex;gap:6px;margin-bottom:6px;align-items:center;justify-content:center">';
    h+='<span style="font-size:13px;color:#ff9800">✝️ Cortesías cambio:</span>';
    h+='<button onclick="changeCortesias(-1);updateAdminLiveControls()" style="padding:5px 12px;border:1px solid #666;border-radius:6px;background:rgba(255,255,255,.05);color:#ccc;font-size:16px;cursor:pointer">−</button>';
    h+='<span style="font-size:18px;font-weight:700;color:#ff9800;min-width:30px;text-align:center">'+cortV+'</span>';
    h+='<button onclick="changeCortesias(1);updateAdminLiveControls()" style="padding:5px 12px;border:1px solid #ff9800;border-radius:6px;background:rgba(255,152,0,.2);color:#ff9800;font-size:16px;cursor:pointer">+</button>';
    h+='</div>';
    h+='<div style="display:flex;gap:6px;margin-bottom:4px;align-items:center;justify-content:center">';
    h+='<span style="font-size:13px;color:#ff9800">⏸️ Pausa:</span>';
    h+='<button onclick="VIER_CORTESIAS_MIN=Math.max(5,VIER_CORTESIAS_MIN-5);calc();renderLive();updateAdminLiveControls()" style="padding:5px 12px;border:1px solid #666;border-radius:6px;background:rgba(255,255,255,.05);color:#ccc;font-size:16px;cursor:pointer">−</button>';
    h+='<span style="font-size:18px;font-weight:700;color:#ff9800;min-width:40px;text-align:center">'+VIER_CORTESIAS_MIN+'</span>';
    h+='<button onclick="VIER_CORTESIAS_MIN=Math.min(90,VIER_CORTESIAS_MIN+5);calc();renderLive();updateAdminLiveControls()" style="padding:5px 12px;border:1px solid #ff9800;border-radius:6px;background:rgba(255,152,0,.2);color:#ff9800;font-size:16px;cursor:pointer">+</button>';
    h+='<span style="font-size:10px;color:#888">min</span>';
    h+='</div>';
    h+='</div>';
  }
  el.innerHTML=h;
}
function changeCortesias(delta){
  var isMujC=(+$('cType').value===27);
  if(isMujC){
    VIER_CORTESIAS_CHANGE_M=Math.max(1,Math.min(100,VIER_CORTESIAS_CHANGE_M+delta));
  } else {
    VIER_CORTESIAS_CHANGE=Math.max(1,Math.min(100,VIER_CORTESIAS_CHANGE+delta));
  }
  calc();
  if(typeof renderLive==='function') renderLive();
}
function onTypeChange(){
  // Touching the carrier type means the user is a carrier, not a spectator.
  if(_spectatorMode){ setSpectatorMode(false); if(typeof renderModeButtons==='function') renderModeButtons(); }
  $('colorDiv').style.display=(+$('cType').value===27)?'block':'none';
  const isM=(+$('cType').value===27);
  $('cS').value=isM?(daySacaMuj[currentDay]||defaultSacaM[currentDay]):(daySaca[currentDay]||defaultSacaH[currentDay]);
  calc();
}
// Called from the cfg "Tu grupo" input so editing the group exits spectator mode.
function onGroupChange(){
  if(_spectatorMode){ setSpectatorMode(false); if(typeof renderModeButtons==='function') renderModeButtons(); }
  calc();
  if(typeof closeCfg==='function') closeCfg();
}
function fmt(min) {
  let h=Math.floor(min/60), m=Math.round(min%60);
  if(m===60){h++;m=0;}
  // Normalize to 0-23 range (handles past midnight)
  h=h%24;if(h<0)h+=24;
  var ampm=h>=12?'PM':'AM';
  var h12=h%12;if(h12===0)h12=12;
  return h12+':'+String(m).padStart(2,'0')+' '+ampm;
}
function hd(a,b){const R=6371000,d1=(b.lat-a.lat)*Math.PI/180,d2=(b.lng-a.lng)*Math.PI/180;const x=Math.sin(d1/2)**2+Math.cos(a.lat*Math.PI/180)*Math.cos(b.lat*Math.PI/180)*Math.sin(d2/2)**2;return R*2*Math.atan2(Math.sqrt(x),Math.sqrt(1-x));}
function placeAlong(path,intv){const r=[];if(path.length<2)return r;let a=0;for(let i=1;i<path.length;i++){const p=path[i-1],q=path[i],s=hd(p,q);if(s<.1)continue;let u=0;while(a+(s-u)>=intv){const ad=intv-a;u+=ad;const f=u/s;r.push({lat:p.lat+(q.lat-p.lat)*f,lng:p.lng+(q.lng-p.lng)*f});a=0;}a+=(s-u);}return r;}

// ========== INIT ==========
function initMap() {
  gmap = new google.maps.Map($('map'), {
    center:{lat:13.721,lng:-89.726}, zoom:15,
    mapTypeControl:false, streetViewControl:false, fullscreenControl:false,
    gestureHandling:'greedy',
    minZoom:15, maxZoom:21,
    clickableIcons:false,
    restriction:{
      latLngBounds:{north:13.732,south:13.714,east:-89.718,west:-89.735},
      strictBounds:true
    },
    styles:[
      // Hide commercial POIs and transit overlays — they add visual noise
      // and force Google Maps to redraw a lot during pan. Keep places of
      // worship and schools (useful procession landmarks).
      {featureType:'poi.business',stylers:[{visibility:'off'}]},
      {featureType:'poi.medical',stylers:[{visibility:'simplified'}]},
      {featureType:'transit',stylers:[{visibility:'off'}]}
    ]
  });
  infoWin = new google.maps.InfoWindow();
  // Marker visibility during gestures: while the user is actively zooming
  // (or panning fast), keep the markers off the canvas so Google Maps only
  // has the basemap to repaint. The 'idle' event fires once the camera
  // settles; we render the markers in their final positions then.
  let zoomTimer=null;
  let _gestureActive=false;
  gmap.addListener('zoom_changed',function(){
    if(_gestureActive) return;
    _gestureActive=true;
    if(allMarkers && allMarkers.length){
      for(var i=0;i<allMarkers.length;i++){
        if(allMarkers[i].getMap()) allMarkers[i].setMap(null);
      }
    }
  });
  gmap.addListener('idle',function(){
    clearTimeout(zoomTimer);
    zoomTimer=setTimeout(function(){
      _gestureActive=false;
      renderMarkers();
    },120);
  });
  const hasSaved = loadSaved();
  readParams();
  // Auto-detect today's day, constrained to the current mode so a public
  // viewer locked into SE mode never switches to a procession day, and
  // vice versa. Admins still have all days available via the day selector.
  if(!explicitDay){
    const todayIdx = detectToday();
    if(isSEMode){
      currentDay = 4;
      if(todayIdx !== 4){
        try{ showOffSeasonBanner(); }catch(e){_logErr("swallow",e);}
      }
    } else if(todayIdx >= 0 && todayIdx <= 3){
      currentDay = todayIdx;
    } else {
      // Either off-season or today is the SE day. In procession mode show
      // the most recently viewed procession day with the off-season notice.
      var lastDay=+(localStorage.getItem('lastViewedDay')||0);
      currentDay = (lastDay>=0&&lastDay<=3) ? lastDay : 0;
      try{ showOffSeasonBanner(); }catch(e){_logErr("swallow",e);}
    }
  }
  // Apply admin/public UI based on current auth state
  applyAuthMode();
  // Restore day tabs and dropdown
  document.querySelectorAll('.day').forEach((b,i)=>b.classList.toggle('a',i===currentDay));
  var dsInit=document.getElementById('daySelector');
  if(dsInit) dsInit.value=currentDay;
  // Apply SE theme if needed
  if(currentDay===4){
    isSEMode=true;
    $('hTitle').textContent='✝️ Santo Entierro';
    $('hTitle').style.color='#e8e8e8';
    document.body.classList.add('se-mode');
    var optsInit=$('cType').options;
    for(var oii=0;oii<optsInit.length;oii++){
      if(optsInit[oii].value==='21') optsInit[oii].textContent='Hombres (22 grupos)';
      if(optsInit[oii].value==='27') optsInit[oii].textContent='Mujeres (23 grupos)';
    }
  }
  $('cS').value = (+$('cType').value===27)?daySacaMuj[currentDay]:daySaca[currentDay];
  var _st1=parseTimeStr(dayHours[currentDay]);setStartTimeUI(_st1.h,_st1.m);
  if($('cDate')) $('cDate').value=dayDates[currentDay]||'';

  window.currentDay=currentDay;
  loadDay(currentDay);
  setTimeout(function(){restoreMapView();},1000);
  window._mapReady=true;
  // Show urna button only for admin (after isShared is set)
  if(typeof showUrnaButton==='function') showUrnaButton();
  if(typeof showAdminTools==='function') showAdminTools();
  if(typeof startDayListeners==='function') startDayListeners();
  // Editor: push dates to Firebase so shared users can detect today
  if(!isShared){
    setTimeout(function(){
      db.ref('config/dates').set(dayDates);
      syncConfig();
    },2000);
  }
  // Shared: fetch dates from Firebase FIRST, then detect today and switch
  if(isShared){
    db.ref('config/dates').once('value',function(snap){
      var dd=snap.val();
      if(dd&&Array.isArray(dd)){
        for(var ddi=0;ddi<dd.length;ddi++){if(dd[ddi]) dayDates[ddi]=dd[ddi];}
        var todayD=detectToday();
        if(todayD>=0&&todayD!==currentDay){
          switchDay(todayD);
        }
      }
    });
    // Also keep listening for future changes
    db.ref('config/dates').on('value',function(snap){
      var dd=snap.val();
      if(!dd||!Array.isArray(dd)) return;
      for(var ddi=0;ddi<dd.length;ddi++){if(dd[ddi]) dayDates[ddi]=dd[ddi];}
      var todayD=detectToday();
      if(todayD>=0&&todayD!==currentDay) switchDay(todayD);
    });
  }
  // Ensure grupo actual displays after everything loads
  if(typeof updateGrupoUI==='function') setTimeout(updateGrupoUI,500);
  // Auto-start if today is procession day and near departure (editor only)
  if(!isShared) setTimeout(function(){if(typeof startAutoIfNeeded==='function')startAutoIfNeeded();},3000);
}

// ========== DAY SWITCHING ==========
function getLastGroup(day){
  // Calculate which group "enters" (last change) for a given day
  const s=daySaca[day]||19;
  const t=+$('cType').value||21;
  const pts=day===0?LUN_PTS:day===1?MART_PTS:day===2?MIER_PTS:day===3?VIER_PTS:day===4?SE_PTS:[];
  const tot=pts.length;
  if(tot===0) return s;
  return ((s-1+tot-1)%t)+1;
}

function switchDay(d) {
  // Save current day's state
  if(+$('cType').value===27){
    daySacaMuj[currentDay]=+$('cS').value||13;
  } else {
    daySaca[currentDay]=+$('cS').value||19;
  }
  var _st3=getStartTime();dayHours[currentDay]=String(_st3.h).padStart(2,'0')+':'+String(_st3.m).padStart(2,'0');
  saveAll();

  // Stop auto timer before switching day
  if(window._autoTimeTimer){clearInterval(window._autoTimeTimer);window._autoTimeTimer=null;}
  window._autoTimeRunning=false;
  window._autoTimeOffset=0;

  // Auto-calculate saca for the new day if not manually set
  if(d>0 && !daySacaManual[d]){
    const prevDay=d-1;
    const lastGrp=getLastGroup(prevDay);
    const t=+$('cType').value||21;
    daySaca[d]=((lastGrp)%t)+1;
  }

  currentDay = d;
  window.currentDay=d;
  try{localStorage.setItem('lastViewedDay',d);}catch(e){_logErr("swallow",e);}
  isSEMode=(d===4);
  document.querySelectorAll('.day').forEach((b,i) => b.classList.toggle('a',i===d));
  var ds=document.getElementById('daySelector');
  if(ds) ds.value=d;

  // Apply/remove SE theme
  if(isSEMode){
    $('hTitle').textContent='✝️ Santo Entierro';
    $('hTitle').style.color='#e8e8e8';
    document.body.classList.add('se-mode');
    // Update group count labels
    var opts=$('cType').options;
    for(var oi=0;oi<opts.length;oi++){
      if(opts[oi].value==='21') opts[oi].textContent='Hombres (22 grupos)';
      if(opts[oi].value==='27') opts[oi].textContent='Mujeres (23 grupos)';
    }
  } else {
    document.body.classList.remove('se-mode');
    var opts2=$('cType').options;
    for(var oi2=0;oi2<opts2.length;oi2++){
      if(opts2[oi2].value==='21') opts2[oi2].textContent='Hombres (21 grupos)';
      if(opts2[oi2].value==='27') opts2[oi2].textContent='Mujeres (27 grupos)';
    }
  }

  // Restore config for this day
  var isM=(+$('cType').value===27);
  $('cS').value = isM?daySacaMuj[d]:daySaca[d];
  var _st2=parseTimeStr(dayHours[d]);setStartTimeUI(_st2.h,_st2.m);
  if($('cDate')) $('cDate').value=dayDates[d]||'';

  // Save map view if locked before switching
  if(mapLocked[currentDay]){
    mapSavedView[currentDay]={lat:gmap.getCenter().lat(),lng:gmap.getCenter().lng(),zoom:gmap.getZoom()};
  }

  // Reset grupo actual for new day BEFORE loading
  currentGrupoActual=0;
  liveGrupoData=null;
  var bc=document.getElementById('bannersContainer');if(bc) bc.innerHTML='';
  // If this day is TODAY, clear stale completed data from Firebase
  var nowDate=localDateStr(new Date());
  if(dayDates[d]===nowDate){
    // Clear any stale completed data
    try{localStorage.removeItem('grupoActual_day'+d);}catch(e){_logErr("swallow",e);}
    db.ref('grupoActual/day'+d).once('value',function(snap){
      var gd=snap.val();
      if(gd&&gd.cambio>0&&gd.cambio>=(positions.length||44)){
        // Stale completed data - reset
        var resetData={cambio:0,grp:0,nombre:'',tot:positions.length||44,desfase:0,movidos:0,sacaMuj:daySacaMuj[d]||22,t:Date.now()};
        db.ref('grupoActual/day'+d).set(resetData);
        currentGrupoActual=0;
        liveGrupoData=resetData;
        if(typeof renderLive==='function') renderLive();
        updateBanners();
      }
    });
  }
  loadDay(d);
  // Restore saved map view if locked
  restoreMapView();
  if(typeof stopDayListeners==='function') stopDayListeners();
  if(typeof startDayListeners==='function') startDayListeners();
  if(typeof populateAlertSelects==='function') populateAlertSelects();
  setTimeout(function(){
    if(typeof renderLive==='function') renderLive();
    updateBanners();
  },500);
}

function loadDay(d) {
  // Clear map
  allMarkers.forEach(m=>m.setMap(null));
  wpMarkers.forEach(m=>m.setMap(null));
  wMarkers.forEach(function(m){m.setMap(null);});
  allMarkers=[]; wpMarkers=[]; wMarkers=[];
  if(routeLine){routeLine.setMap(null);routeLine=null;}
  if(routeClickLine){routeClickLine.setMap(null);routeClickLine=null;}
  if(routeLineW){routeLineW.setMap(null);routeLineW=null;}
  if(routeClickLineW){routeClickLineW.setMap(null);routeClickLineW=null;}
  $('noti').classList.remove('show');
  editingWomen=false;
  var bw=document.getElementById('bRouteW');
  if(bw){bw.textContent='🔵 Ruta mujeres';bw.style.background='rgba(0,0,0,.6)';}

  // Admin: load saved edits if available. Shared: always KML
  const dayPts=[LUN_PTS,MART_PTS,MIER_PTS,VIER_PTS,SE_PTS];
  if(!isShared && savedPositions[d] && savedPositions[d].length>0){
    positions = savedPositions[d].map(p=>({lat:p.lat,lng:p.lng,n:p.n||''}));
  } else if(dayPts[d] && dayPts[d].length>0){
    positions = dayPts[d].map(p=>({lat:p.lat,lng:p.lng,n:p.n}));
  } else {
    positions = [];
  }
  // Load women's positions
  if(savedPositionsW[d] && savedPositionsW[d].length>0){
    positionsW = savedPositionsW[d].map(p=>({lat:p.lat,lng:p.lng,n:p.n||''}));
  } else {
    positionsW = [];
  }
  if(positions.length>0){
    drawRouteLine();
    calc();
    fitBounds();
  }
}

// ========== MIÉRCOLES: draw polyline through exact points ==========
var routeClickLineW=null;
function drawRouteLine() {
  // Men's route (purple)
  var path = positions.map(function(p){return{lat:p.lat,lng:p.lng};});
  if(routeLine){
    routeLine.setPath(path);
    routeLine.setOptions({strokeOpacity:editingWomen?.4:.8,strokeWeight:editingWomen?3:5});
  } else {
    routeLine = new google.maps.Polyline({path:path, map:gmap, strokeColor:'#9333ea', strokeWeight:editingWomen?3:5, strokeOpacity:editingWomen?.4:.8, zIndex:1});
  }
  // Men's click line
  if(!editingWomen){
    if(routeClickLine){
      routeClickLine.setPath(path);
      routeClickLine.setMap(gmap);
    } else {
      routeClickLine = new google.maps.Polyline({path:path, map:gmap, strokeColor:'#9333ea', strokeWeight:25, strokeOpacity:0.01, zIndex:2});
      routeClickLine.addListener('click', function(e){
        if(isZoom()||!editMode) return;
        insertAtPosition(e.latLng.lat(), e.latLng.lng(), e.edge);
      });
    }
  } else if(routeClickLine){
    routeClickLine.setMap(null);
  }
  // Women's route (blue)
  if(positionsW.length>=2){
    var pathW=positionsW.map(function(p){return{lat:p.lat,lng:p.lng};});
    if(routeLineW){
      routeLineW.setPath(pathW);
      routeLineW.setOptions({strokeOpacity:editingWomen?.9:.6,strokeWeight:editingWomen?5:3,zIndex:editingWomen?3:0});
    } else {
      routeLineW=new google.maps.Polyline({path:pathW, map:gmap, strokeColor:'#3b82f6', strokeWeight:editingWomen?5:3, strokeOpacity:editingWomen?.9:.6, zIndex:editingWomen?3:0});
    }
    if(editingWomen){
      if(routeClickLineW){
        routeClickLineW.setPath(pathW);
        routeClickLineW.setMap(gmap);
      } else {
        routeClickLineW=new google.maps.Polyline({path:pathW, map:gmap, strokeColor:'#3b82f6', strokeWeight:25, strokeOpacity:0.01, zIndex:4});
        routeClickLineW.addListener('click', function(e){
          if(isZoom()||!editMode) return;
          insertAtPositionW(e.latLng.lat(), e.latLng.lng(), e.edge);
        });
      }
    } else if(routeClickLineW){
      routeClickLineW.setMap(null);
    }
  } else {
    if(routeLineW){routeLineW.setMap(null);routeLineW=null;}
    if(routeClickLineW){routeClickLineW.setMap(null);routeClickLineW=null;}
  }
}

var mapLocked=[false,false,false,false,false];
var mapSavedView=[null,null,null,null,null];
function fitBounds() {
  if(mapLocked[currentDay]) return;
  if(positions.length<2) return;
  const b = new google.maps.LatLngBounds();
  positions.forEach(p=>b.extend(p));
  gmap.fitBounds(b,{top:80,bottom:80,left:20,right:20});
}
function toggleMapLock(){
  if(mapLocked[currentDay]){
    // Unlock: remove restrictions
    mapLocked[currentDay]=false;
    mapSavedView[currentDay]=null;
    gmap.setOptions({restriction:null,maxZoom:21});
  } else {
    // Lock: save current view and restrict
    var center=gmap.getCenter();
    var zoom=gmap.getZoom();
    var bounds=gmap.getBounds();
    mapLocked[currentDay]=true;
    mapSavedView[currentDay]={lat:center.lat(),lng:center.lng(),zoom:zoom,bounds:{north:bounds.getNorthEast().lat(),south:bounds.getSouthWest().lat(),east:bounds.getNorthEast().lng(),west:bounds.getSouthWest().lng()}};
    // Expand bounds slightly so user can pan a little
    var latPad=(bounds.getNorthEast().lat()-bounds.getSouthWest().lat())*0.3;
    var lngPad=(bounds.getNorthEast().lng()-bounds.getSouthWest().lng())*0.3;
    gmap.setOptions({
      restriction:{latLngBounds:{north:bounds.getNorthEast().lat()+latPad,south:bounds.getSouthWest().lat()-latPad,east:bounds.getNorthEast().lng()+lngPad,west:bounds.getSouthWest().lng()-lngPad},strictBounds:true},
      maxZoom:21,
      minZoom:zoom
    });
  }
  var btn=document.getElementById('mapLockBtn');
  if(btn){
    btn.textContent=mapLocked[currentDay]?'🔒 Mapa fijo':'🔓 Mapa libre';
    btn.style.background=mapLocked[currentDay]?seAccentBg('.85'):'rgba(0,0,0,.6)';
  }
  try{localStorage.setItem('mapLocks',JSON.stringify({l:mapLocked,v:mapSavedView}));}catch(e){_logErr("swallow",e);}
  if(typeof syncConfig==='function') syncConfig();
}
function restoreMapView(){
  var sv=mapSavedView[currentDay];
  if(sv&&mapLocked[currentDay]){
    gmap.setCenter({lat:sv.lat,lng:sv.lng});
    gmap.setZoom(sv.zoom);
    var latPad=(sv.bounds.north-sv.bounds.south)*0.3;
    var lngPad=(sv.bounds.east-sv.bounds.west)*0.3;
    gmap.setOptions({
      restriction:{latLngBounds:{north:sv.bounds.north+latPad,south:sv.bounds.south-latPad,east:sv.bounds.east+lngPad,west:sv.bounds.west-lngPad},strictBounds:true},
      maxZoom:21,
      minZoom:sv.zoom
    });
  } else {
    gmap.setOptions({restriction:null,maxZoom:21,minZoom:null});
  }
  var btn=document.getElementById('mapLockBtn');
  if(btn){
    btn.textContent=mapLocked[currentDay]?'🔒 Mapa fijo':'🔓 Mapa libre';
    btn.style.background=mapLocked[currentDay]?seAccentBg('.85'):'rgba(0,0,0,.6)';
  }
}
// Load saved locks
try{var ml=JSON.parse(localStorage.getItem('mapLocks')||'{}');if(ml.l)mapLocked=ml.l;if(ml.v)mapSavedView=ml.v;}catch(e){_logErr("swallow",e);}

// ========== INSERT CHANGE (tap on route line) ==========
function insertAtPosition(lat,lng,edge) {
  if(!editMode||isShared) return;
  if(positions.length<2) return;

  // Google Maps gives us the edge (segment) index that was clicked
  // edge = index of segment between positions[edge] and positions[edge+1]
  let insertIdx;
  if(typeof edge==='number' && edge>=0 && edge<positions.length){
    insertIdx=edge+1; // insert after the start of the clicked segment
  } else {
    // Fallback: find closest segment
    let bestSeg=0, bestD=Infinity;
    for(let i=0;i<positions.length-1;i++){
      const d=distToSegment({lat,lng},positions[i],positions[i+1]);
      if(d<bestD){bestD=d;bestSeg=i;}
    }
    insertIdx=bestSeg+1;
  }

  pushMapHistory();
  positions.splice(insertIdx,0,{lat,lng,n:''});

  drawRouteLine();
  calc();
  if(typeof syncPositions==='function') syncPositions();

  const c=cfg();
  const grp=((c.s-1+insertIdx)%((c.t===27)?getMujCount():getHomCount()))+1;
  const num=insertIdx+1;
  infoWin.setContent('<div style="text-align:center;font-family:Georgia;color:#111;font-size:13px"><b style="color:#2e7d32;font-size:15px">✅ Cambio #'+num+'</b><br>Grupo <b>#'+grp+'</b><br><span style="font-size:11px;color:#777">Secuencia actualizada</span></div>');
  infoWin.setPosition({lat,lng});
  infoWin.open(gmap);
  setTimeout(()=>infoWin.close(),2500);
}

// Distance from point p to line segment a→b
function distToSegment(p,a,b){
  const dx=b.lng-a.lng, dy=b.lat-a.lat;
  const len2=dx*dx+dy*dy;
  if(len2===0) return hd(p,a);
  let t=((p.lng-a.lng)*dx+(p.lat-a.lat)*dy)/len2;
  t=Math.max(0,Math.min(1,t));
  const proj={lat:a.lat+t*dy, lng:a.lng+t*dx};
  return hd(p,proj);
}

// ========== WOMEN'S ROUTE ==========
var mapHistory=[];
var mapHistoryW=[];

// Take a full snapshot of the editable state so any undo can restore both
// the route points AND the waypoint references for the current day.
function pushMapHistory(){
  var wps = (typeof getWPs==='function') ? getWPs() : [];
  mapHistory.push({
    positions: positions.map(function(p){return{lat:p.lat,lng:p.lng,n:p.n||''};}),
    wps: wps.map(function(w){return{lat:w.lat,lng:w.lng,n:w.n||''};}),
    day: currentDay,
    t: Date.now()
  });
  if(mapHistory.length>30) mapHistory.shift();
  _updateUndoButton();
}
function pushMapHistoryW(){
  mapHistoryW.push(positionsW.map(function(p){return{lat:p.lat,lng:p.lng,n:p.n||''};}));
  if(mapHistoryW.length>30) mapHistoryW.shift();
  _updateUndoButton();
}

// Update the visible undo button to show how many steps back we can go
function _updateUndoButton(){
  var btn = document.querySelector('button[onclick="undoMapEdit()"]');
  if(!btn) return;
  var count = editingWomen ? mapHistoryW.length : mapHistory.length;
  if(count === 0){
    btn.textContent = '↩️ Deshacer';
    btn.style.opacity = '0.4';
  } else {
    btn.textContent = '↩️ Deshacer ('+count+')';
    btn.style.opacity = '1';
  }
}

function _showUndoToast(remaining){
  var t=document.getElementById('undoToast');
  if(!t){
    t=document.createElement('div');
    t.id='undoToast';
    t.style.cssText='position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:'+seAccentBg('.95')+';color:#fff;padding:10px 18px;border-radius:24px;font-size:14px;font-weight:600;z-index:99999;box-shadow:0 4px 12px rgba(0,0,0,.4);transition:opacity .3s;pointer-events:none';
    document.body.appendChild(t);
  }
  t.textContent='↩️ Deshecho · '+remaining+' paso'+(remaining===1?'':'s')+' restante'+(remaining===1?'':'s');
  t.style.opacity='1';
  clearTimeout(t._timer);
  t._timer=setTimeout(function(){ t.style.opacity='0'; },2200);
}

function undoMapEdit(){
  if(editingWomen){
    if(mapHistoryW.length===0){customAlert('No hay cambios para deshacer en la ruta de mujeres');return;}
    positionsW=mapHistoryW.pop();
    drawRouteLine();
    renderMarkersW();
    syncPositionsW();
    _updateUndoButton();
    _showUndoToast(mapHistoryW.length);
  } else {
    if(mapHistory.length===0){customAlert('No hay cambios para deshacer');return;}
    var snap=mapHistory.pop();
    if(snap.day !== currentDay){
      // Restore the day first so the snapshot makes sense
      mapHistory.push(snap);
      customAlert('Ese cambio era de '+(dayNames[snap.day]||'otro día')+'. Cambiá a ese día y volvé a presionar deshacer.');
      _updateUndoButton();
      return;
    }
    positions=snap.positions;
    // Restore waypoints if the snapshot has them (older snapshots without
    // wps stay backward-compatible — only positions get restored)
    if(snap.wps && typeof getWPs==='function'){
      var wps=getWPs();
      wps.length=0;
      snap.wps.forEach(function(w){wps.push(w);});
      try{ if(typeof renderWPmarkers==='function') renderWPmarkers(); }catch(e){_logErr('renderWPmarkers',e);}
    }
    drawRouteLine();
    allMarkers.forEach(function(m){m.setMap(null);});
    allMarkers=[];
    calc();
    if(typeof syncPositions==='function') syncPositions();
    _updateUndoButton();
    _showUndoToast(mapHistory.length);
  }
}

// Keyboard shortcut for desktop admins editing in a browser
document.addEventListener('keydown', function(e){
  if(!editMode) return;
  // Ctrl+Z (Windows/Linux) or Cmd+Z (Mac)
  if((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey){
    e.preventDefault();
    undoMapEdit();
  }
});

function toggleEditWomen(){
  editingWomen=!editingWomen;
  var btn=document.getElementById('bRouteW');
  if(btn){
    btn.textContent=editingWomen?'🔵 Editando mujeres':'🔵 Ruta mujeres';
    btn.style.background=editingWomen?'rgba(59,130,246,.85)':'rgba(0,0,0,.6)';
  }
  if(editingWomen&&positionsW.length===0){
    // Copy men's route as starting point
    positionsW=positions.map(function(p){return{lat:p.lat,lng:p.lng,n:p.n||''};});
    syncPositionsW();
  }
  // Redraw lines with correct emphasis and click targets
  drawRouteLine();
  if(editingWomen){
    renderMarkersW();
  } else {
    // Clear women's markers, show men's
    wMarkers.forEach(function(m){m.setMap(null);});
    wMarkers=[];
    allMarkers.forEach(function(m){m.setMap(null);});
    allMarkers=[];
    calc();
  }
}

var wMarkers=[];
function renderMarkersW(){
  // Recreate only if count changed
  if(wMarkers.length!==positionsW.length){
    wMarkers.forEach(function(m){m.setMap(null);});
    wMarkers=[];
    for(var i=0;i<positionsW.length;i++){
      var mk=new google.maps.Marker({
        position:{lat:positionsW[i].lat,lng:positionsW[i].lng},map:gmap,
        label:{text:String(i+1),color:'#fff',fontWeight:'bold',fontSize:'10px'},
        icon:{path:google.maps.SymbolPath.CIRCLE,scale:dragMode?14:10,fillColor:'#3b82f6',fillOpacity:1,strokeColor:'#fff',strokeWeight:2},
        zIndex:3000, draggable:dragMode&&editMode, optimized:true
      });
      (function(mk2,idx){
        mk2.addListener('click',function(){
          if(dragMode) return;
          var del=editMode?'<br><button onclick="deletePointW('+idx+')" style="margin-top:4px;padding:6px 12px;border:none;border-radius:5px;background:#c0392b;color:#fff;font-size:12px;cursor:pointer">🗑️ Eliminar</button>':'';
          infoWin.setContent('<div style="text-align:center;color:#111;font-size:13px"><b style="color:#3b82f6">🔵 Punto #'+(idx+1)+'</b><br><span style="font-size:11px">Ruta mujeres</span>'+del+'</div>');
          infoWin.open(gmap,mk2);
        });
        mk2.addListener('dragstart',function(){ pushMapHistoryW(); });
        mk2.addListener('dragend',function(){
          var p=mk2.getPosition();
          positionsW[idx]={lat:p.lat(),lng:p.lng(),n:positionsW[idx].n||''};
          drawRouteLine();
          syncPositionsW();
        });
        mk2.addListener('drag',function(){
          var p=mk2.getPosition();
          positionsW[idx]={lat:p.lat(),lng:p.lng(),n:positionsW[idx].n||''};
          // Update line in real-time during drag
          if(routeLineW) routeLineW.setPath(positionsW.map(function(pt){return{lat:pt.lat,lng:pt.lng};}));
        });
      })(mk,i);
      wMarkers.push(mk);
    }
  } else {
    // Just update positions and draggable state
    for(var j=0;j<wMarkers.length;j++){
      wMarkers[j].setPosition({lat:positionsW[j].lat,lng:positionsW[j].lng});
      wMarkers[j].setDraggable(dragMode&&editMode);
      wMarkers[j].setIcon({path:google.maps.SymbolPath.CIRCLE,scale:dragMode?14:10,fillColor:'#3b82f6',fillOpacity:1,strokeColor:'#fff',strokeWeight:2});
      wMarkers[j].setLabel({text:String(j+1),color:'#fff',fontWeight:'bold',fontSize:'10px'});
    }
  }
  // Hide men's markers when editing women
  allMarkers.forEach(function(m){m.setMap(null);});
}

function deletePointW(idx){
  if(idx<0||idx>=positionsW.length) return;
  pushMapHistoryW();
  positionsW.splice(idx,1);
  infoWin.close();
  drawRouteLine();
  renderMarkersW();
  syncPositionsW();
}

function insertAtPositionW(lat,lng,edge){
  if(!editMode||isShared) return;
  if(positionsW.length<2) return;
  var insertIdx;
  if(typeof edge==='number'&&edge>=0&&edge<positionsW.length){
    insertIdx=edge+1;
  } else {
    var bestSeg=0,bestD=Infinity;
    for(var i=0;i<positionsW.length-1;i++){
      var d=distToSegment({lat:lat,lng:lng},positionsW[i],positionsW[i+1]);
      if(d<bestD){bestD=d;bestSeg=i;}
    }
    insertIdx=bestSeg+1;
  }
  pushMapHistoryW();
  positionsW.splice(insertIdx,0,{lat:lat,lng:lng,n:''});
  drawRouteLine();
  renderMarkersW();
  syncPositionsW();
}

function syncPositionsW(){
  if(isShared) return;
  db.ref('positions_w/day'+currentDay).set(
    positionsW.map(function(p){return{lat:p.lat,lng:p.lng,n:p.n||''};})
  );
  savedPositionsW[currentDay]=positionsW.map(function(p){return{lat:p.lat,lng:p.lng,n:p.n||''};});
  saveAll();
}

// Snap a GPS point to the nearest position on the route
// Get effective cambio for current user (Virgen is ~5 behind Jesus)
function getEffCambio(){
  // Use liveGrupoData.cambio, fall back to currentGrupoActual
  var c=0;
  if(window.liveGrupoData&&window.liveGrupoData.cambio){
    c=window.liveGrupoData.cambio;
  } else if(window.currentGrupoActual>0){
    c=window.currentGrupoActual;
  }
  if(c===0) return 0;
  var cc=cfg();
  if(cc.t===27){
    var desf=(window.liveGrupoData&&window.liveGrupoData.desfase!==undefined)?window.liveGrupoData.desfase:virgenDesfase;
    c=Math.max(0,c-desf);
  }
  return c;
}

function snapToRoute(p){
  var pts=positions;
  if(!pts||pts.length<2){
    var dayPtsArr=[LUN_PTS,MART_PTS,MIER_PTS,VIER_PTS,SE_PTS];
    pts=dayPtsArr[currentDay]||[];
  }
  if(pts.length<2) return p;
  
  // If grupo actual is set, only search nearby segments (±15 changes)
  var startIdx=0, endIdx=pts.length-1;
  var effSnap=getEffCambio();
  if(effSnap>0){
    var curr=effSnap-1;
    startIdx=Math.max(0,curr-15);
    endIdx=Math.min(pts.length-1,curr+15);
  }
  
  let bestD=Infinity, bestProj=p;
  for(let i=startIdx;i<endIdx;i++){
    const a=pts[i], b=pts[i+1];
    const dx=b.lng-a.lng, dy=b.lat-a.lat;
    const len2=dx*dx+dy*dy;
    if(len2===0) continue;
    let t=((p.lng-a.lng)*dx+(p.lat-a.lat)*dy)/len2;
    t=Math.max(0,Math.min(1,t));
    const proj={lat:a.lat+t*dy, lng:a.lng+t*dx};
    const d=hd(p,proj);
    if(d<bestD){bestD=d;bestProj=proj;}
  }
  return bestProj;
}

// ========== CALCULATE ==========
// Viernes special timing
var VIER_CORTESIAS_CHANGE = 40; // cortesías at this change (hombres)
var VIER_CORTESIAS_CHANGE_M = 40; // cortesías for mujeres (different route)
var VIER_CORTESIAS_MIN = 45;    // 45 min pause (11:30-12:15)

function getCortesiasChange(){
  var isMuj=(+$('cType').value===27);
  return isMuj?VIER_CORTESIAS_CHANGE_M:VIER_CORTESIAS_CHANGE;
}
const VIER_LAST_EXTRA = 0.10;     // last change 10% longer

function calcTime(num, tot, c) {
  var departMin=c.h * 60 + (c.hm||0);
  if(currentDay !== 3) {
    return departMin + (num-1) * c.mn;
  }
  // VIERNES: uses c.mn rhythm but adds cortesías pause
  var cortChange=getCortesiasChange();
  var elapsed = 0;
  for(var i = 2; i <= num; i++) {
    elapsed += c.mn;
    if(i === cortChange) {
      elapsed += VIER_CORTESIAS_MIN;
    }
  }
  return departMin + elapsed;
}

function calc() {
  const c=cfg();
  const tot=positions.length;
  // Keep shared user prefs updated
  if(isShared) localStorage.setItem('sharedUser',JSON.stringify({t:c.t,g:c.g,color:c.color}));

  changes=positions.map((p,i)=>{
    const num=i+1;
    const grupoCnt=(c.t===27)?getMujCount():getHomCount();
    const grp=((c.s-1+i)%grupoCnt)+1;
    const timeMin=calcTime(num, tot, c);
    const isCortesia=(currentDay===3 && num===getCortesiasChange());
    return {num,grp,time:fmt(timeMin),lat:p.lat,lng:p.lng,n:p.n||'',mine:grp===c.g,cortesia:isCortesia};
  });
  myCarries=changes.filter(ch=>ch.mine);
  const isMujeres=c.t===27;
  const colores=['🟡','🔴','🔵'];
  const colorNames=['Amarillo','Rojo','Azul'];
  const colorHex=['#fbbf24','#ef4444','#3b82f6'];
  myCarries.forEach((mc,i)=>{
    mc.ci=i+1;
    if(isMujeres){
      mc.colorIdx=c.color;
      mc.colorIcon=colores[mc.colorIdx];
      mc.colorName=colorNames[mc.colorIdx];
      mc.colorHex=colorHex[mc.colorIdx];
      // Santos rotate colors each change
      const santoColor=(mc.colorIdx+i)%3;
      mc.santoColorIcon=colores[santoColor];
      mc.carryLabel='👑 Virgen + '+mc.santoColorIcon+' Santo';
    }
  });

  let totalM=0;
  for(let i=1;i<positions.length;i++) totalM+=hd(positions[i-1],positions[i]);
  const km=(totalM/1000).toFixed(2);

  // Estimated end time - use real average if available
  let endTime=tot>0?calcTime(tot,tot,c):c.h*60+(c.hm||0);
  let endLabel='Asienta (est.)';
  const realAvg=getRealAvg();
  if(realAvg && doneCount()>0){
    // Project from last recorded carry
    const recorded=myCarries.filter(x=>isDone(x.ci)).map(x=>({num:x.num,t:getEntry(x.ci).t})).sort((a,b)=>b.num-a.num);
    if(recorded.length>0){
      const last=recorded[0];
      const changesLeft=tot-last.num;
      const estMs=last.t+changesLeft*realAvg*60000;
      const estDate=new Date(estMs);
      const h=estDate.getHours(),m=estDate.getMinutes();
      endTime=h*60+m;
      endLabel='Asienta (real)';
    }
  }
  // Last group that enters
  const lastGrpCnt=(c.t===27)?getMujCount():getHomCount();
  const lastGrp=((c.s-1+tot-1)%lastGrpCnt)+1;

  let extra=currentDay===3?' · ✝️ Cortesías ~11:30-12:00':'';
  const dateStr=dayDates[currentDay]?dayDates[currentDay].slice(5).replace('-','/'):'';
  var titleIcon=isSEMode?'✝️':'✝️';
  var titleText=isSEMode?'Santo Entierro de Cristo':dayNames[currentDay];
  $('hTitle').textContent=titleIcon+' '+titleText;
  $('hTitle').style.color=isSEMode?'#e8e8e8':'#c084fc';
  var depTimeStr=fmt(c.h*60+(c.hm||0));
  if(_spectatorMode){
    var totGrp=(c.t===27)?getMujCount():getHomCount();
    $('hSub').textContent=dateStr+' · Sale '+depTimeStr+' · '+totGrp+' grupos · 👁️ Espectador';
  } else if(isShared){
    $('hSub').textContent=dateStr+' · Sale '+depTimeStr+' · Grupo #'+c.g;
  } else {
    $('hSub').textContent=dateStr+' · Sale '+depTimeStr+' · '+c.mn+'min · #'+c.g+' · Saca #'+c.s+' → #'+lastGrp+extra;
  }
  const isMuj=c.t===27;

  renderTable();
  renderLive();
  renderMarkers();
  renderWPmarkers();
  saveAll();
  if(typeof populateAlertSelects==='function') populateAlertSelects();
}

// ========== WAYPOINT REFERENCE MARKERS ==========
function renderWPmarkers() {
  wpMarkers.forEach(m=>m.setMap(null));
  wpMarkers=[];
  const wps = getWPs();
  wps.forEach((wp,i)=>{
    const mk=new google.maps.Marker({
      position:{lat:wp.lat,lng:wp.lng}, map:gmap,
      label:{text:'◆',color:'#c084fc',fontWeight:'bold',fontSize:'12px'},
      icon:{path:google.maps.SymbolPath.CIRCLE,scale:(dragMode&&editMode)?16:12,
        fillColor:'#222',fillOpacity:.9,
        strokeColor:'#7c3aed',strokeWeight:2},
      zIndex:5000, draggable:dragMode&&editMode,
      optimized:!(dragMode&&editMode)
    });
    mk.addListener('click',function(){
      if(isZoom())return;
      const ren=editMode?'<br><button onclick="renameRef('+i+')" style="margin-top:4px;padding:6px 12px;border:none;border-radius:5px;background:#7c3aed;color:#fff;font-size:12px;font-weight:600;cursor:pointer">✏️ Renombrar</button>':'';
      const del=editMode?'<br><button onclick="deleteRef('+i+')" style="margin-top:4px;padding:6px 12px;border:none;border-radius:5px;background:#c0392b;color:#fff;font-size:12px;font-weight:600;cursor:pointer">🗑️ Eliminar</button>':'';
      const drag=(dragMode&&editMode)?'<br><i style="font-size:11px;color:#777">Arrastrá para mover</i>':'';
      const svBtn='<br><button onclick="openStreetView('+wp.lat+','+wp.lng+')" style="margin-top:4px;padding:6px 12px;border:none;border-radius:5px;background:#1a73e8;color:#fff;font-size:12px;font-weight:600;cursor:pointer">🛣️ Street View</button>';
      infoWin.setContent('<div style="text-align:center;font-family:Georgia;color:#111;font-size:13px"><b style="font-size:15px">'+_escapeHtml(wp.n)+'</b><br><span style="font-size:12px;color:#555">Referencia</span>'+drag+ren+del+svBtn+'</div>');
      infoWin.open(gmap,mk);
    });
    if(dragMode&&editMode){
      mk.addListener('dragstart',function(){ pushMapHistory(); });
      mk.addListener('dragend',function(){
        const p=mk.getPosition();
        wps[i].lat=p.lat(); wps[i].lng=p.lng();
        saveAll();
      });
    }
    wpMarkers.push(mk);
  });
}

async function addRef(){
  const name=await customPrompt('Nombre de la referencia:');
  if(!name) return;
  pushMapHistory();
  const center=gmap.getCenter();
  const wps=getWPs();
  wps.push({n:name,lat:center.lat(),lng:center.lng()});
  renderWPmarkers();
  saveAll();
}

function deleteRef(i){
  const wps=getWPs();
  if(i<0||i>=wps.length) return;
  pushMapHistory();
  wps.splice(i,1);
  infoWin.close();
  renderWPmarkers();
  saveAll();
}

async function renameRef(i){
  const wps=getWPs();
  if(i<0||i>=wps.length) return;
  const name=await customPrompt('Nuevo nombre para referencia:',wps[i].n);
  if(name===null) return;
  pushMapHistory();
  wps[i].n=name;
  infoWin.close();
  renderWPmarkers();
  saveAll();
}

async function renameChange(ci){
  if(ci<0||ci>=positions.length) return;
  const name=await customPrompt('Nuevo nombre para este cambio:',positions[ci].n||'');
  if(name===null) return;
  pushMapHistory();
  positions[ci].n=name;
  infoWin.close();
  calc();
  if(typeof syncPositions==='function') syncPositions();
}

function exportPoints(){
  // Generate JSON of current day's positions
  const day=dayNames[currentDay];
  const pts=positions.map((p,i)=>({n:p.n||'Punto '+(i+1),lat:Math.round(p.lat*10000000)/10000000,lng:Math.round(p.lng*10000000)/10000000}));
  const json=JSON.stringify(pts);
  
  // Also generate refs
  const wps=getWPs();
  const refs=wps.map(w=>({n:w.n,lat:Math.round(w.lat*10000000)/10000000,lng:Math.round(w.lng*10000000)/10000000}));
  
  const txt='📍 '+day+' ('+pts.length+' cambios, '+refs.length+' refs)\n\nPUNTOS:\n'+json+'\n\nREFS:\n'+JSON.stringify(refs);
  
  // Try share, fallback to clipboard
  if(navigator.share){
    navigator.share({title:day+' - Puntos exportados',text:txt}).catch(()=>{
      copyToClip(txt);
    });
  } else {
    copyToClip(txt);
  }
}

function copyToClip(txt){
  navigator.clipboard.writeText(txt).then(()=>{
    alert('✅ Copiado al portapapeles. Pegalo en WhatsApp y mandámelo.');
  }).catch(()=>{
    // Fallback: show in modal so user can copy manually
    customPrompt('Copiá este texto y mandámelo por WhatsApp:',txt);
  });
}

// ========== MARKERS ==========
function renderMarkers() {
  const zoom=gmap?gmap.getZoom():15;
  // Mobile gets tighter rules: hide other-group markers until zoom 16,
  // and labels appear at zoom 17 instead of 16. Desktop has plenty of
  // CPU headroom and keeps the original behaviour.
  const showOthersZoomThreshold = _MOBILE ? 16 : 15;
  const showLabelsZoomThreshold = _MOBILE ? 17 : 16;
  const showOthers=showAll&&(zoom>=showOthersZoomThreshold||editMode);
  const bounds=gmap?gmap.getBounds():null;
  // At low zoom we show small unlabeled dots so Google Maps can keep all
  // markers in its optimized canvas (labels force per-marker DOM nodes,
  // killing fluidity on phones with 100+ groups in view at once).
  const showLabels=zoom>=showLabelsZoomThreshold;
  // Buffer the viewport so markers near the edge don't pop in/out as you
  // pan. Mobile uses a smaller buffer (10%) to keep fewer markers in
  // memory; desktop a generous 25%.
  var paddedBounds=null;
  if(bounds){
    var pad = _MOBILE ? 0.10 : 0.25;
    var ne=bounds.getNorthEast(), sw=bounds.getSouthWest();
    var latPad=(ne.lat()-sw.lat())*pad, lngPad=(ne.lng()-sw.lng())*pad;
    paddedBounds=new google.maps.LatLngBounds(
      new google.maps.LatLng(sw.lat()-latPad, sw.lng()-lngPad),
      new google.maps.LatLng(ne.lat()+latPad, ne.lng()+lngPad)
    );
  }

  // Recreate if changes count changed
  if(allMarkers.length>0&&allMarkers.length!==changes.length){
    allMarkers.forEach(function(m){m.setMap(null);});
    allMarkers=[];
  }

  // Helper: build the icon descriptor for a marker given its state and zoom.
  function _iconFor(m, fc, labeled){
    if(labeled){
      return {path:google.maps.SymbolPath.CIRCLE,scale:m?14:10,fillColor:fc,fillOpacity:m?1:.85,strokeColor:m?'#fff':'#1a1a2e',strokeWeight:m?2:1.5};
    }
    // Compact dots for the unlabeled (zoom <16) view
    return {path:google.maps.SymbolPath.CIRCLE,scale:m?9:6,fillColor:fc,fillOpacity:m?1:.7,strokeColor:m?'#fff':'#1a1a2e',strokeWeight:m?1.5:0.8};
  }

  // First time: create all markers (without labels — we apply them below
  // based on the current zoom).
  if(allMarkers.length===0&&changes.length>0){
    changes.forEach(function(ch,ci){
      var m=ch.mine;
      var fc=m?'#c084fc':'#5599ff';
      if(m){var mc2=myCarries.find(function(x){return x.num===ch.num});if(mc2&&mc2.colorHex) fc=mc2.colorHex;}
      var mk=new google.maps.Marker({
        position:{lat:ch.lat,lng:ch.lng},map:null,
        icon:_iconFor(m, fc, showLabels),
        zIndex:m?3000:100, draggable:false,
        optimized:true, clickable:true
      });
      mk._isMine=m;mk._ci=ci;mk._ch=ch;mk._fc=fc;
      // Click handler
      (function(mk2,ch2,ci2,m2){
        mk2.addListener('click',function(){
          if(isZoom())return;
          var tag=m2?'<br><b style="color:#7c3aed">✝️ Tu cargada #'+ch2.ci+'</b>':'';
          var colorTag='';if(m2){var mc3=myCarries.find(function(x){return x.num===ch2.num});if(mc3&&mc3.carryLabel) colorTag='<br><span style="font-size:12px">'+_escapeHtml(mc3.carryLabel)+'</span>';}
          var ref=ch2.n?'<br><span style="font-size:12px;color:#555">'+_escapeHtml(ch2.n)+'</span>':'';
          var svBtn2='<br><button onclick="openStreetView('+positions[ci2].lat+','+positions[ci2].lng+')" style="margin-top:4px;padding:6px 12px;border:none;border-radius:5px;background:#1a73e8;color:#fff;font-size:12px;font-weight:600;cursor:pointer">🛣️ Street View</button>';
          var ren=editMode?'<br><button onclick="renameChange('+ci2+')" style="margin-top:4px;padding:6px 12px;border:none;border-radius:5px;background:#7c3aed;color:#fff;font-size:12px;font-weight:600;cursor:pointer">✏️ Renombrar</button>':'';
          var del=editMode?'<br><button onclick="deleteChange('+ci2+')" style="margin-top:4px;padding:6px 12px;border:none;border-radius:5px;background:#c0392b;color:#fff;font-size:12px;font-weight:600;cursor:pointer">🗑️ Eliminar</button>':'';
          infoWin.setContent('<div style="text-align:center;font-family:Georgia;min-width:150px;color:#111;font-size:13px"><b style="font-size:15px">Grupo #'+ch2.grp+'</b><br>Cambio #'+ch2.num+'<br><b>~'+ch2.time+'</b>'+tag+colorTag+ref+ren+del+svBtn2+'</div>');
          infoWin.open(gmap,mk2);
        });
        mk2.addListener('dragstart',function(){ pushMapHistory(); });
        mk2.addListener('drag',function(){
          var p=mk2.getPosition();
          positions[ci2]={lat:p.lat(),lng:p.lng(),n:positions[ci2].n||''};
          if(routeLine) routeLine.setPath(positions.map(function(pt){return{lat:pt.lat,lng:pt.lng};}));
          if(routeClickLine) routeClickLine.setPath(positions.map(function(pt){return{lat:pt.lat,lng:pt.lng};}));
        });
        mk2.addListener('dragend',function(){
          var p=mk2.getPosition();
          positions[ci2]={lat:p.lat(),lng:p.lng(),n:positions[ci2].n||''};
          drawRouteLine();calc();
          if(typeof syncPositions==='function') syncPositions();
        });
      })(mk,ch,ci,m);
      allMarkers.push(mk);
    });
  }

  // Apply zoom-dependent style + visibility in a single pass
  for(var mi=0;mi<allMarkers.length;mi++){
    var mk=allMarkers[mi];
    var visible=true;
    if(!mk._isMine&&!showOthers) visible=false;
    if(paddedBounds&&!paddedBounds.contains(mk.getPosition())) visible=false;
    // Toggle label/icon only when the zoom mode actually changes — avoids
    // the per-marker repaint cost of setLabel/setIcon during pan.
    if(mk._labeled !== showLabels){
      mk._labeled = showLabels;
      if(showLabels){
        mk.setLabel({text:String(mk._ch.grp),color:mk._isMine?'#111':'#fff',fontWeight:'bold',fontSize:mk._isMine?'13px':'11px'});
      } else {
        mk.setLabel(null);
      }
      mk.setIcon(_iconFor(mk._isMine, mk._fc, showLabels));
    }
    // Avoid redundant setMap calls — they trigger unnecessary repaints.
    var current = mk.getMap();
    if(visible && !current) mk.setMap(gmap);
    else if(!visible && current) mk.setMap(null);
    // Update draggable for edit mode
    if(dragMode&&editMode&&mk.getDraggable()!==true){
      mk.setDraggable(true);
      mk.setIcon({path:google.maps.SymbolPath.CIRCLE,scale:mk._isMine?20:14,fillColor:mk._fc,fillOpacity:mk._isMine?1:.85,strokeColor:mk._isMine?'#fff':'#1a1a2e',strokeWeight:mk._isMine?2:1.5});
    } else if(!dragMode&&mk.getDraggable()===true){
      mk.setDraggable(false);
      mk.setIcon(_iconFor(mk._isMine, mk._fc, showLabels));
    }
  }
}

// ========== DELETE CHANGE ==========
function deleteChange(ci) {
  if(ci<0||ci>=positions.length) return;
  pushMapHistory();
  const removed = positions[ci];
  positions.splice(ci, 1);
  infoWin.close();
  drawRouteLine();
  calc();
  if(typeof syncPositions==='function') syncPositions();
}

// ========== TABLE ==========
function autoCarryName(mc){
  var total=positions.length;
  if(!total) return '';
  var idx=(mc.num||1)-1;
  // Semantic labels — first/last carry of the day + Viernes cortesías
  if(idx===0) return 'Salida';
  if(idx===total-1) return 'Regreso';
  if(currentDay===3 && (mc.num||idx+1)===getCortesiasChange()) return 'Cortesías';
  // Look at the two nearest waypoints
  var wps=getWPs();
  if(!wps.length) return '';
  var ranked=wps.map(function(w){return {n:w.n,d:hd(mc,w)};}).sort(function(a,b){return a.d-b.d;});
  var a=ranked[0], b=ranked[1];
  if(a.d<25) return a.n;                                 // basically on top of it
  if(b && b.d<100 && b.d < a.d*2.5) return 'Entre '+a.n+' y '+b.n;  // sandwich
  if(a.d<80) return a.n;                                  // close enough to assume
  if(a.d<200) return 'Cerca de '+a.n;                     // far but identifiable
  return '';                                              // nothing useful nearby
}

function getCarryRef(mc){
  var cc=cfg();
  if(cc.t===27&&window.liveGrupoData&&window.liveGrupoData.movidos){
    var adjIdx=mc.num-1-window.liveGrupoData.movidos;
    if(adjIdx>=0&&adjIdx<positions.length){
      var adjName=positions[adjIdx].n||'';
      if(adjName) return adjName;
      var adjPt={lat:positions[adjIdx].lat,lng:positions[adjIdx].lng,num:adjIdx+1};
      return autoCarryName(adjPt)||nearWP(adjPt);
    }
  }
  return mc.n || autoCarryName(mc) || nearWP(mc);
}

function renderTable() {
  let h='<div class="th"><span>#</span><span>Ubicación / Referencia</span><span style="text-align:right">Hora</span></div>';
  myCarries.forEach((mc,i)=>{
    const ref=_escapeHtml(getCarryRef(mc));
    const label=_escapeHtml(mc.carryLabel||'');
    h+='<div class="tr" onclick="zoomTo('+i+')"><span class="rn">'+mc.ci+'</span><div><div style="font-weight:600">'+ref+'</div><div class="rs">Cambio #'+mc.num+(label?' · '+label:'')+'</div></div><div class="rt">'+_escapeHtml(mc.time)+'</div></div>';
  });
  $('tbl').innerHTML=h;
}

// ========== EN VIVO ==========
// Store: {dayNum: {ci: timestamp_ms, ...}}
let carryTimes = {};
const COMP_KEY = 'ssLive_v2';

function loadCompleted(){
  try{
    const raw=localStorage.getItem(COMP_KEY);
    if(raw) carryTimes=JSON.parse(raw);
  }catch(e){_logErr("swallow",e);}
}
function saveCompleted(){
  try{localStorage.setItem(COMP_KEY,JSON.stringify(carryTimes));}catch(e){_logErr("swallow",e);}
}
loadCompleted();

function getDayTimes(){
  if(!carryTimes[currentDay]) carryTimes[currentDay]={};
  return carryTimes[currentDay];
}
function getEntry(ci){
  const v=getDayTimes()[String(ci)];
  if(!v) return null;
  // Support old format (just number) and new {t,manual}
  if(typeof v==='number') return {t:v,manual:false};
  return v;
}
function isDone(ci){return getDayTimes().hasOwnProperty(String(ci));}
function doneCount(){return Object.keys(getDayTimes()).length;}

function markDone(ci){
  getDayTimes()[String(ci)]={t:Date.now(),manual:false};
  saveCompleted();
  renderLive();
  calc();
}

function markDoneWithTime(ci){
  const panel=$('livePanel');
  const existing=document.getElementById('timePicker');
  if(existing) existing.remove();

  let hOpts='';
  for(let h=1;h<=12;h++) hOpts+='<option value="'+h+'">'+h+'</option>';
  let mOpts='';
  for(let m=0;m<60;m+=5) mOpts+='<option value="'+m+'">'+String(m).padStart(2,'0')+'</option>';

  const div=document.createElement('div');
  div.id='timePicker';
  div.style.cssText='background:rgba(0,0,0,.85);border:2px solid #c084fc;border-radius:12px;padding:16px;margin:10px 0;text-align:center';
  div.innerHTML='<div style="color:#c084fc;font-size:14px;font-weight:700;margin-bottom:10px">🕐 ¿A qué hora cargaste #'+ci+'?</div>'
    +'<div style="display:flex;gap:8px;justify-content:center;align-items:center;margin-bottom:12px">'
    +'<select id="tpH" style="background:#222;color:#fff;border:1px solid #666;border-radius:6px;padding:10px;font-size:18px;font-family:inherit">'+hOpts+'</select>'
    +'<span style="color:#fff;font-size:20px;font-weight:700">:</span>'
    +'<select id="tpM" style="background:#222;color:#fff;border:1px solid #666;border-radius:6px;padding:10px;font-size:18px;font-family:inherit">'+mOpts+'</select>'
    +'<select id="tpAP" style="background:#222;color:#fff;border:1px solid #666;border-radius:6px;padding:10px;font-size:18px;font-family:inherit"><option>AM</option><option>PM</option></select>'
    +'</div>'
    +'<div style="display:flex;gap:8px;justify-content:center">'
    +'<button onclick="confirmTimePick('+ci+')" style="background:'+seAccent()+';color:#fff;border:none;border-radius:8px;padding:12px 24px;font-size:14px;font-weight:700;cursor:pointer;font-family:inherit">'+seCheck()+'Confirmar</button>'
    +'<button onclick="document.getElementById(\'timePicker\').remove()" style="background:rgba(255,255,255,.1);color:#ccc;border:1px solid #666;border-radius:8px;padding:12px 16px;font-size:14px;cursor:pointer;font-family:inherit">Cancelar</button>'
    +'</div>';

  // Pre-select the PROJECTED time of this carry
  const mc=myCarries.find(x=>x.ci===ci);
  if(mc){
    const est=getEstimate(mc);
    const tp=est.match(/(\d+):(\d+)\s*(AM|PM)/i);
    if(tp){
      let eh=parseInt(tp[1]), em=parseInt(tp[2]);
      const epm=tp[3].toUpperCase()==='PM';
      div.querySelector('#tpAP').selectedIndex=epm?1:0;
      div.querySelector('#tpH').value=eh;
      div.querySelector('#tpM').value=Math.floor(em/5)*5;
    }
  }

  // Insert after the button
  const btn=panel.querySelector('.live-btn-done');
  if(btn) btn.parentNode.insertBefore(div, btn.nextSibling.nextSibling);
  else panel.appendChild(div);
}

function confirmTimePick(ci){
  let h=parseInt($('tpH').value);
  const m=parseInt($('tpM').value);
  const ap=$('tpAP').value;
  if(ap==='PM'&&h<12) h+=12;
  if(ap==='AM'&&h===12) h=0;
  // Resolve to a real Date that handles past-midnight procession days
  const recordedAt = _resolveTimeOfDay(h, m, 'past');
  getDayTimes()[String(ci)]={t:recordedAt.getTime(),manual:true};
  saveCompleted();
  renderLive();
  calc();
}

function undoLast(){
  const dt=getDayTimes();
  const keys=Object.keys(dt);
  if(keys.length===0) return;
  // Sort by timestamp descending, remove most recent
  keys.sort((a,b)=>{
    const ta=typeof dt[a]==='object'?dt[a].t:dt[a];
    const tb=typeof dt[b]==='object'?dt[b].t:dt[b];
    return tb-ta;
  });
  delete dt[keys[0]];
  saveCompleted();
  renderLive();
  calc();
}

async function resetLive(){
  if(!await customConfirm('¿Reiniciar cargadas de '+dayNames[currentDay]+'?')) return;
  carryTimes[currentDay]={};
  saveCompleted();
  renderLive();
  calc();
}

// Calculate real average min/change, ignoring outliers
function getRealAvg(){
  const entries=[];
  myCarries.forEach(mc=>{
    const e=getEntry(mc.ci);
    if(e) entries.push({ci:mc.ci, num:mc.num, t:e.t});
  });
  if(entries.length<2) return null;
  entries.sort((a,b)=>a.num-b.num);
  
  // Calculate per-segment rates
  const rates=[];
  for(let i=1;i<entries.length;i++){
    const diffMin=(entries[i].t-entries[i-1].t)/60000;
    const diffChanges=entries[i].num-entries[i-1].num;
    if(diffMin>0&&diffChanges>0) rates.push(diffMin/diffChanges);
  }
  if(rates.length===0) return null;
  
  // Find median
  const sorted=[...rates].sort((a,b)=>a-b);
  const median=sorted[Math.floor(sorted.length/2)];
  
  // Keep only rates within 2x of median (ignore extreme outliers)
  const filtered=rates.filter(r=>r>=median*0.3&&r<=median*2.5);
  if(filtered.length===0) return median;
  
  return filtered.reduce((a,b)=>a+b,0)/filtered.length;
}

// Get last recorded time and project forward
function getEstimate(mc){
  // 1. If we have registered carries, project from last one
  const recorded=myCarries.filter(x=>isDone(x.ci)).map(x=>({num:x.num,t:getEntry(x.ci).t})).sort((a,b)=>b.num-a.num);
  const avg=getRealAvg();
  if(recorded.length>0&&avg){
    const last=recorded[0];
    if(mc.num<=last.num) return fmtClock(last.t); // already passed
    return fmtClock(last.t+(mc.num-last.num)*avg*60000);
  }

  // 2. If GPS is actively tracking, use real rhythm
  if(window._lastRealGPS&&(Date.now()-window._lastRealGPS<GPS_TIMEOUT)&&window._realRhythm>0){
    var cc=cfg();
    var dateStr=dayDates[currentDay]||localDateStr(new Date());
    var departMs=new Date(dateStr+'T'+String(cc.h).padStart(2,'0')+':'+String(cc.hm||0).padStart(2,'0')+':00').getTime();
    if(Date.now()>departMs){
      return fmtClock(departMs+(mc.num-1)*window._realRhythm*60000);
    }
  }

  // 3. Default: use calc() time (departure + n × mn)
  return mc.time;
}

function parseTimeToMs(timeStr){
  const tp=timeStr.match(/(\d+):(\d+)\s*(AM|PM)/i);
  if(!tp) return null;
  let h=parseInt(tp[1]),m=parseInt(tp[2]);
  if(tp[3].toUpperCase()==='PM'&&h<12)h+=12;
  if(tp[3].toUpperCase()==='AM'&&h===12)h=0;
  // Treat parsed times as "past" by default (recorded events). Callers
  // that need future-tense parsing should resolve manually.
  return _resolveTimeOfDay(h, m, 'past').getTime();
}

function fmtClock(ts){
  const d=new Date(ts);
  let h=d.getHours(),m=d.getMinutes();
  let h12=((h-1)%12)+1;if(h12<=0)h12+=12;
  return h12+':'+String(m).padStart(2,'0')+' '+(h>=12&&h<24?'PM':'AM');
}

// Debounce + skip-if-unchanged wrapper around the heavy renderLiveImpl.
// renderLive is called from many sources (Firebase listeners, polls, intervals);
// coalescing close calls and skipping equal HTML cuts CPU/repaint cost on mobile.
let _renderLiveTimer = null;
let _renderLiveLastHTML = '';
function renderLive(){
  if(_renderLiveTimer) return;
  _renderLiveTimer = setTimeout(function(){
    _renderLiveTimer = null;
    renderLiveImpl();
  }, 80);
}
function renderLiveImmediate(){
  if(_renderLiveTimer){ clearTimeout(_renderLiveTimer); _renderLiveTimer = null; }
  renderLiveImpl();
}
// Center the map on a change point (used by the spectator list rows).
function zoomChange(i){
  if(!changes||!changes[i]) return;
  showView(0);
  var c=changes[i];
  if(typeof gmap!=='undefined'&&gmap){ gmap.setCenter({lat:c.lat,lng:c.lng}); gmap.setZoom(19); }
}

// Spectator view: read-only, procession-centric. No personal group, no
// register/undo buttons — just "what's happening now" plus the full list.
function renderSpectatorView(){
  // Spectator has no personal stats — clear any sticky info left over from a
  // previous carrier-mode render (otherwise "Mi grupo" + a duplicate
  // "Procesión completada" linger above the spectator list).
  var siEl=document.getElementById('stickyInfo');
  if(siEl) siEl.innerHTML='';
  if(!changes||changes.length===0){
    _renderLiveLastHTML='<<spec-loading>>';
    $('livePanel').innerHTML='<div class="live-card"><p style="color:#aaa">Esperando datos de la procesión...</p></div>';
    return;
  }
  var total=changes.length;
  var isPast=isDayPast(currentDay);
  var eff=getEffCambio();
  if(isPast) eff=total;
  var done=Math.max(0,Math.min(eff,total));
  var pct=total>0?Math.round(done/total*100):0;
  var h='';
  if(isPast || eff>=total){
    h+='<div style="text-align:center;padding:12px;margin-bottom:8px;border-radius:10px;background:'+seAccentBg('.1')+';border:1px solid '+seAccentBg('.3')+'"><div style="font-size:16px;font-weight:700;color:'+seAccentTxt()+'">'+seCheck()+'Procesión completada</div></div>';
  } else if(eff>0){
    var nowObj=changes[Math.min(eff,total)-1];
    h+='<div class="live-next">';
    h+='<div class="ln-label">Cargando ahora</div>';
    h+='<div class="ln-num">Grupo '+nowObj.grp+'</div>';
    h+='<div class="ln-ref">📍 '+_escapeHtml(getCarryRef(nowObj))+'</div>';
    h+='<div class="ln-time">Cambio '+Math.min(eff,total)+' de '+total+'</div>';
    h+='</div>';
  } else {
    h+='<div class="live-next"><div class="ln-label">La procesión aún no comienza</div><div class="ln-num" style="font-size:22px">⏳</div><div class="ln-ref">Seguí el avance en vivo aquí</div></div>';
  }
  h+='<div class="live-progress"><div class="live-progress-bar" style="width:'+pct+'%">'+done+'/'+total+'</div></div>';
  h+='<div style="margin-top:12px">';
  for(var i=0;i<changes.length;i++){
    var ch=changes[i];
    var cls=ch.num<eff?'done':(ch.num===eff?'current':'pending');
    var ref=_escapeHtml(getCarryRef(ch));
    h+='<div class="live-carry '+cls+'" onclick="zoomChange('+i+')">';
    h+='<div class="lc-num"></div>';
    h+='<div class="lc-info"><div class="lc-ref">Grupo '+ch.grp+(ref?' — '+ref:'')+'</div><div class="lc-sub">Cambio #'+ch.num+'</div></div>';
    h+='<div class="lc-time">'+_escapeHtml(ch.time||'')+'</div>';
    h+='</div>';
  }
  h+='</div>';
  if(h===_renderLiveLastHTML) return;
  _renderLiveLastHTML=h;
  $('livePanel').innerHTML=h;
}

function renderLiveImpl(){
  // Always update banners first
  updateBanners();
  // Spectator mode has its own simplified read-only view.
  if(_spectatorMode){ renderSpectatorView(); return; }
  // Wait for changes to be calculated
  if(!changes||changes.length===0){
    _renderLiveLastHTML='<<loading>>';
    $('livePanel').innerHTML=
      '<div class="skel-card">'
      +'<span class="skel skel-line" style="width:40%;margin:6px auto;height:11px"></span>'
      +'<span class="skel skel-line" style="width:60px;height:36px;margin:8px auto"></span>'
      +'<span class="skel skel-line" style="width:55%;margin:6px auto"></span>'
      +'<span class="skel skel-line" style="width:35%;margin:6px auto"></span>'
      +'</div>'
      +'<div class="skel-row"><span class="skel skel-circle"></span><div class="skel-info"><span class="skel skel-line" style="width:80%;height:13px"></span><span class="skel skel-line" style="width:50%;height:10px;margin-top:4px"></span></div><span class="skel skel-time"></span></div>'
      +'<div class="skel-row"><span class="skel skel-circle"></span><div class="skel-info"><span class="skel skel-line" style="width:75%;height:13px"></span><span class="skel skel-line" style="width:45%;height:10px;margin-top:4px"></span></div><span class="skel skel-time"></span></div>'
      +'<div class="skel-row"><span class="skel skel-circle"></span><div class="skel-info"><span class="skel skel-line" style="width:70%;height:13px"></span><span class="skel skel-line" style="width:55%;height:10px;margin-top:4px"></span></div><span class="skel skel-time"></span></div>';
    return;
  }
  // Check if this day is in the past
  var isPastDay=isDayPast(currentDay);

  // Past day + procession data exists + the user's group config doesn't land
  // on any cargada (e.g. they're viewing a day for a different group). Instead
  // of blanking the panel, render the full procession as a read-only list so
  // the historical record is always visible after Semana Santa.
  if(isPastDay&&changes.length>0&&!myCarries.length){
    var sigPD=daySaca[currentDay]||17;
    var totPD2=changes.length;
    var lastGrpPD2=((sigPD-1+totPD2-1)%getHomCount())+1;
    currentGrupoActual=totPD2;
    liveGrupoData={cambio:totPD2,grp:lastGrpPD2,nombre:(totPD2<=changes.length&&changes[totPD2-1])?changes[totPD2-1].n||'':'',tot:totPD2,desfase:0,movidos:0,sacaMuj:daySacaMuj[currentDay],t:Date.now()};
    var ph='';
    var cfgNow=cfg();
    var tipoNow=cfgNow.t===27?'Mujeres (27)':'Hombres (21)';
    ph+='<div style="padding:12px 14px;margin-bottom:10px;border-radius:10px;background:rgba(255,152,0,.12);border:1px solid rgba(255,152,0,.4)">';
    ph+='<div style="font-size:14px;font-weight:700;color:#ff9800;margin-bottom:6px">⚠️ Tu grupo no aparece en esta procesión</div>';
    ph+='<div style="font-size:12px;color:#ddd;line-height:1.5">Estás viendo la lista completa de cargadas. Tu config actual: <b>Grupo #'+cfgNow.g+'</b> · <b>'+tipoNow+'</b>. Para ver tus cargadas personales, abrí <b>⚙️ Configuración</b> y corregí el grupo o el tipo de cargador.</div>';
    ph+='<div style="font-size:11px;color:#aaa;margin-top:6px">📜 Resultado histórico · '+totPD2+' '+(totPD2===1?'cargada':'cargadas')+'</div>';
    ph+='</div>';
    ph+='<div>';
    for(var pi=0;pi<changes.length;pi++){
      var pch=changes[pi];
      var prefSafe=_escapeHtml(pch.n||autoCarryName(pch)||'');
      ph+='<div class="live-carry done" style="padding:8px 10px"><div class="lc-num"></div><div class="lc-info"><div class="lc-ref" style="font-size:14px">Grupo '+pch.grp+(prefSafe?' — '+prefSafe:'')+'</div><div class="lc-sub">Cambio #'+pch.num+'</div></div><div class="lc-time" style="font-size:13px;color:#aaa">'+_escapeHtml(pch.time||'')+'</div></div>';
    }
    ph+='</div>';
    if(ph!==_renderLiveLastHTML){ _renderLiveLastHTML=ph; $('livePanel').innerHTML=ph; }
    return;
  }

  if(!myCarries.length&&!isPastDay){_renderLiveLastHTML='<<no-carries>>';$('livePanel').innerHTML='<div class="live-card"><p style="color:#aaa">No hay cargadas. Verificá la configuración.</p></div>';return;}

  var isPastDay=isDayPast(currentDay);
  
  // For past days, auto-set grupo actual to last cambio
  if(isPastDay&&changes.length>0){
    var sacaPD=daySaca[currentDay]||17;
    var totPD=changes.length;
    var lastGrpPD=((sacaPD-1+totPD-1)%getHomCount())+1;
    currentGrupoActual=totPD;
    liveGrupoData={cambio:totPD,grp:lastGrpPD,nombre:(totPD<=changes.length&&changes[totPD-1])?changes[totPD-1].n||'':'',tot:totPD,desfase:0,movidos:0,sacaMuj:daySacaMuj[currentDay],t:Date.now()};
  }

  const total=myCarries.length;
  const manualDone=doneCount();
  var effCambio=getEffCambio();
  // Past days: all carries are done
  if(isPastDay) effCambio=changes.length;
  const grupoDone=effCambio>0?myCarries.filter(mc=>mc.num<=effCambio).length:0;
  const done=Math.max(manualDone,grupoDone);
  const pending=myCarries.filter(mc=>!isDone(mc.ci)&&!(effCambio>0&&mc.num<=effCambio));
  const nextCarry=pending[0];
  const pct=total>0?Math.round(done/total*100):0;

  let h='';

  const lastGrpLive=changes.length>0?changes[changes.length-1].grp:'?';
  const cc=cfg();const isMuj=cc.t===27;
  const coloresH=['🟡','🔴','🔵'];
  const grupoInfo='#'+cc.g+(isMuj?' '+coloresH[cc.color]:'');
  const cargaInfo=isMuj?total+'×2':total;
  const cargaLabel=isMuj?'Cambios':'Cargadas';

  // Procession complete only when ALL cambios are done or past day
  var procComplete=(done>=total&&total>0)||isPastDay||(liveGrupoData&&liveGrupoData.cambio>=total&&total>0);

  // Banners always updated (updateBanners handles isPastDay styling)
  updateBanners();

  // Admin grupo +/- moved to stickyInfo
  // Chronometer (everyone sees, not past days)
  if(!isPastDay){
    h+='<div style="text-align:center;margin-bottom:8px"><span id="grupoCrono" style="font-size:18px;font-weight:700;color:#ff9800;font-family:monospace">⏱ 0:00</span><br><span id="grupoLastUpdate" style="font-size:10px;color:#888"></span></div>';
  }

  // Progress
  h+='<div class="live-progress"><div class="live-progress-bar" style="width:'+pct+'%">'+done+'/'+total+'</div></div>';

  // Cortesías banner for Viernes (only when NOT complete)
  if(currentDay===3&&!procComplete){
    var cortChangeNum=getCortesiasChange();
    var cortChangeObj=changes.find(function(ch){return ch.num===cortChangeNum;});
    if(cortChangeObj){
      var sacaCort=daySaca[currentDay]||17;
      var cortGrp=((sacaCort-1+cortChangeNum-1)%getHomCount())+1;
      var cortDone=cortChangeNum<=Math.max.apply(null,myCarries.filter(function(mc2){return isDone(mc2.ci);}).map(function(mc2){return mc2.num;}).concat([0]));
      var cortTime=cortChangeObj.time;
      var cortStatus=cortDone?(seCheck()+'Cortesías completadas'):'✝️ Cortesías · Grupo #'+cortGrp+' (~'+cortTime+')';
      h+='<div style="text-align:center;padding:8px;margin-bottom:8px;border-radius:8px;background:rgba(255,152,0,.12);border:1px solid rgba(255,152,0,.3)"><span style="font-size:13px;color:#ff9800;font-weight:700">'+cortStatus+'</span><br><span style="font-size:11px;color:#ccc">Encuentro de las imágenes · ~'+VIER_CORTESIAS_MIN+' min pausa</span>';
      if(isMuj) h+='<br><span style="font-size:10px;color:#f59e0b">⚠️ Cargadoras: las cortesías aplican al Nazareno</span>';
      h+='</div>';
    }
  }

  if(procComplete&&!isPastDay){
    // Your carries are done
    if(!(liveGrupoData&&liveGrupoData.cambio>0&&liveGrupoData.cambio>=(positions.length||changes.length))){
      h+='<div style="text-align:center;padding:12px;margin-bottom:8px;border-radius:10px;background:'+seAccentBg('.1')+';border:1px solid '+seAccentBg('.3')+'">';
      h+='<div style="font-size:16px;font-weight:700;color:'+seAccentTxt()+'">'+seCheck()+'¡Completaste todas tus cargadas!</div>';
      h+='</div>';
    }
    const times=[];
    myCarries.forEach(mc=>{const e=getEntry(mc.ci);if(e)times.push({ci:mc.ci,num:mc.num,t:e.t,colorIcon:mc.colorIcon||''});});
    times.sort((a,b)=>a.num-b.num);
    if(times.length>=2){
      const firstT=times[0].t,lastT=times[times.length-1].t;
      const totalMin=Math.round((lastT-firstT)/60000);
      const totalHrs=Math.floor(totalMin/60),totalMins=totalMin%60;
      const avg=getRealAvg();
      let durs='';
      for(let i=1;i<times.length;i++){
        const dur=((times[i].t-times[i-1].t)/60000).toFixed(1);
        durs+='<div style="display:flex;justify-content:space-between;padding:4px 0;border-bottom:1px solid rgba(255,255,255,.05)"><span>'+times[i-1].colorIcon+' #'+times[i-1].ci+' → #'+times[i].ci+'</span><span style="color:'+seAccentTxt()+';font-weight:700">'+dur+' min</span></div>';
      }
      h+='<div style="background:'+seAccentBg('.08')+';border:1px solid '+seAccentBg('.2')+';border-radius:10px;padding:12px;margin-bottom:10px">';
      h+='<div style="text-align:center;font-size:14px;font-weight:700;color:'+seAccentTxt()+';margin-bottom:8px">📊 Resumen Final</div>';
      h+='<div style="display:flex;justify-content:space-around;margin-bottom:10px">';
      h+='<div style="text-align:center"><div style="font-size:22px;font-weight:700;color:#fff">'+totalHrs+'h '+totalMins+'m</div><div style="font-size:10px;color:#aaa">Tiempo total</div></div>';
      if(avg) h+='<div style="text-align:center"><div style="font-size:22px;font-weight:700;color:#fff">'+avg.toFixed(1)+'</div><div style="font-size:10px;color:#aaa">Min/cambio</div></div>';
      h+='<div style="text-align:center"><div style="font-size:22px;font-weight:700;color:#fff">'+total+'</div><div style="font-size:10px;color:#aaa">Cargadas</div></div>';
      h+='</div>';
      h+='<div style="font-size:12px;color:#ccc;margin-bottom:4px"><b>Detalle:</b></div>';
      h+=durs;
      h+='<div style="margin-top:8px;font-size:11px;color:#aaa">Primera: '+fmtClock(firstT)+' · Última: '+fmtClock(lastT)+'</div>';
      h+='</div>';
    }
  } else if(nextCarry) {
    const ref=nextCarry.n||nearWP(nextCarry);
    const estTime=getEstimate(nextCarry);
    const realAvg=getRealAvg();

    h+='<div class="live-next" onclick="zoomTo('+(nextCarry.ci-1)+')" style="cursor:pointer;'+(nextCarry.colorHex?'border-color:'+nextCarry.colorHex:'')+'\">';
    h+='<div class="ln-label">Próxima cargada · tocá para ver en mapa</div>';
    h+='<div class="ln-num"'+(nextCarry.colorHex?' style="color:'+nextCarry.colorHex+'"':'')+'>#'+nextCarry.ci+'</div>';
    if(nextCarry.carryLabel) h+='<div style="font-size:14px;margin:4px 0">'+nextCarry.carryLabel+'</div>';
    h+='<div class="ln-ref">📍 '+ref+'</div>';
    h+='<div class="ln-time">~'+estTime+'</div>';
    h+='<div id="countdownText" style="font-size:13px;margin-top:4px"></div>';
    if(realAvg) h+='<div style="font-size:11px;color:'+seAccentTxt()+';margin-top:2px">⏱ Ritmo real: '+realAvg.toFixed(1)+' min/cambio</div>';
    h+='<div style="font-size:10px;color:#aaa;margin-top:2px">Cambio #'+nextCarry.num+'</div>';
    h+='</div>';

    // Compact register buttons
    h+='<div style="display:flex;gap:4px;margin-bottom:4px">';
    h+='<button onclick="markDone('+nextCarry.ci+')" style="flex:3;padding:8px;border:none;border-radius:8px;background:'+seAccent()+';color:#fff;font-size:13px;font-weight:700;cursor:pointer;font-family:inherit">'+seCheck()+'Registrar #'+nextCarry.ci+'</button>';
    h+='<button onclick="markDoneWithTime('+nextCarry.ci+')" style="flex:1;padding:6px;border:1px solid #555;border-radius:8px;background:none;color:#888;font-size:9px;font-family:inherit;cursor:pointer">🕐</button>';
    h+='</div>';
  }

  // Undo
  if(done>0){
    h+='<button class="live-btn live-btn-undo" onclick="undoLast()">↩️ Deshacer última</button>';
  }

  // Carry list
  h+='<div style="margin-top:12px">';
  myCarries.forEach((mc,idx)=>{
    // Insert cortesías separator between carries that span the cortesías change
    if(currentDay===3 && idx>0){
      const prevNum=myCarries[idx-1].num;
      if(prevNum<=getCortesiasChange() && mc.num>getCortesiasChange()){
        h+='<div style="text-align:center;padding:8px;margin:4px 0;border-radius:6px;background:rgba(255,152,0,.1);border:1px dashed rgba(255,152,0,.4)"><span style="font-size:12px;color:#ff9800">✝️ — CORTESÍAS — ✝️</span></div>';
      }
    }
    const mcDone=isDone(mc.ci);
    const passedByGrupo=!mcDone&&effCambio>0&&mc.num<=effCambio;
    const isCurrent=nextCarry&&mc.ci===nextCarry.ci;
    const cls=mcDone?'done':(passedByGrupo?'done':(isCurrent?'current':'pending'));
    const ref=_escapeHtml(getCarryRef(mc));
    const label=_escapeHtml(mc.carryLabel||'');
    const entry=getEntry(mc.ci);
    const realT=entry?_escapeHtml(fmtClock(entry.t)):'';
    const estT=_escapeHtml(mcDone?realT:getEstimate(mc));
    const colorHexSafe=/^#[0-9a-fA-F]{3,8}$/.test(mc.colorHex||'')?mc.colorHex:'#c084fc';
    const borderColor=mc.colorHex&&isCurrent?'border-color:'+colorHexSafe:'';
    h+='<div class="live-carry '+cls+'" style="'+borderColor+'" onclick="zoomTo('+(mc.ci-1)+')">';
    h+='<div class="lc-num"></div>';
    h+='<div class="lc-info"><div class="lc-ref">Cargada #'+mc.ci+' — '+ref+'</div><div class="lc-sub">Cambio #'+mc.num+(label?' · '+label:'')+(realT?' · '+realT:'')+'</div></div>';
    h+='<div class="lc-time" style="color:'+(mcDone?seAccent():colorHexSafe)+';'+(isSEMode?'font-size:11px;':'')+'">'+estT+'</div>';
    h+='</div>';
  });
  h+='</div>';

  h+='<div style="text-align:center;margin-top:12px"><button onclick="resetLive()" style="background:none;border:1px solid #914444;color:#e08080;padding:6px 14px;border-radius:5px;font-size:11px;cursor:pointer;font-family:inherit">🗑️ Reiniciar cargadas</button></div>';

  // Skip the DOM write if nothing changed since the last render
  if(h === _renderLiveLastHTML) return;
  _renderLiveLastHTML = h;
  $('livePanel').innerHTML=h;
  // Populate sticky info panel
  var si='';
  // Stats row
  si+='<div style="display:flex;justify-content:space-around;padding:4px 0;margin-bottom:3px;border-bottom:1px solid rgba(255,255,255,.06)">';
  si+='<div style="text-align:center"><div style="font-size:18px;font-weight:700;color:#c084fc">'+grupoInfo+'</div><div style="font-size:10px;color:#888">Mi grupo</div></div>';
  si+='<div style="text-align:center"><div style="font-size:18px;font-weight:700;color:#fff">'+cargaInfo+'</div><div style="font-size:10px;color:#888">'+cargaLabel+'</div></div>';
  si+='<div style="text-align:center"><div style="font-size:16px;font-weight:700;color:#fff">#'+lastGrpLive+'</div><div style="font-size:10px;color:#888">Asienta</div></div>';
  si+='<div style="text-align:center"><div style="font-size:16px;font-weight:700;color:'+(done>=total?seAccent():'#ff9800')+'">'+done+'/'+total+'</div><div style="font-size:10px;color:#888">Avance</div></div>';
  si+='</div>';
  // Grupo +/- for editor
  if(!isShared&&!isPastDay){
    var sacaDef2=daySaca[currentDay]||16;
    var adminG2='#'+sacaDef2;
    if(liveGrupoData&&liveGrupoData.cambio>0){
      var at2=positions.length||changes.length;
      if(liveGrupoData.cambio>=at2){adminG2='✅';}
      else{adminG2='#'+(((sacaDef2-1+liveGrupoData.cambio-1)%getHomCount())+1);}
    }
    si+='<div style="display:flex;gap:6px;margin-bottom:4px;align-items:center;justify-content:center">';
    si+='<span style="font-size:10px;color:#888">Carga:</span>';
    si+='<button onclick="advanceGrupo(-1)" style="padding:6px 14px;border:1px solid #666;border-radius:8px;background:rgba(255,255,255,.05);color:#ccc;font-size:16px;font-weight:700;cursor:pointer">−</button>';
    si+='<span onclick="setGrupoManual()" style="font-size:20px;font-weight:700;color:#c084fc;min-width:45px;text-align:center;cursor:pointer">'+adminG2+'</span>';
    si+='<button onclick="advanceGrupo(1)" style="padding:6px 14px;border:1px solid #7c3aed;border-radius:8px;background:rgba(124,58,237,.3);color:#c084fc;font-size:16px;font-weight:700;cursor:pointer">+</button>';
    si+='</div>';
  }
  // Compact próxima cargada
  if(nextCarry&&!procComplete){
    var ref2=nextCarry.n||nearWP(nextCarry);
    var est2=getEstimate(nextCarry);
    si+='<div onclick="zoomTo('+(nextCarry.ci-1)+')" style="cursor:pointer;display:flex;align-items:center;gap:6px;padding:6px 8px;background:rgba(192,132,252,.08);border:1px solid rgba(192,132,252,.2);border-radius:8px;margin-bottom:2px">';
    si+='<span style="font-size:20px;font-weight:700;color:#c084fc">#'+nextCarry.ci+'</span>';
    si+='<span style="font-size:12px;color:#ccc;flex:1;overflow:hidden;white-space:nowrap;text-overflow:ellipsis">📍 '+ref2+'</span>';
    si+='<span style="font-size:14px;font-weight:700;color:#c084fc">~'+est2+'</span>';
    si+='<span id="stickyCountdown" style="font-size:11px;color:#ff9800;min-width:40px;text-align:right"></span>';
    si+='</div>';
  } else if(procComplete){
    si+='<div style="text-align:center;padding:4px;font-size:13px;color:'+seAccentTxt()+';font-weight:700">'+seCheck()+'Procesión completada</div>';
  }
  var stickyEl=$('stickyInfo');
  if(stickyEl) stickyEl.innerHTML=si;
  updateCountdown();
  if(typeof updateGrupoUI==='function') updateGrupoUI();
  if(typeof startCrono==='function') startCrono();
}
function nearWP(p){
  const wps = getWPs();
  let b='Punto',bd=1e9;
  wps.forEach(w=>{const d=hd(p,w);if(d<bd){bd=d;b=w.n;}});
  return b;
}
function zoomTo(i){
  if(!myCarries[i])return;
  showView(0);
  const mc=myCarries[i];
  gmap.setCenter({lat:mc.lat,lng:mc.lng});
  gmap.setZoom(20);
  setTimeout(function(){
    const t=allMarkers.find(m=>{const p=m.getPosition();return Math.abs(p.lat()-mc.lat)<.0001&&Math.abs(p.lng()-mc.lng)<.0001;});
    if(t) google.maps.event.trigger(t,'click');
  },300);
}

// ========== UI ==========
let editMode=false;
function toggleEdit(){
  if(isShared) return;
  editMode=!editMode;
  $('mapEditBar').style.display=editMode?'none':'flex';
  $('mapEditTools').style.display=editMode?'flex':'none';
  if(!editMode&&dragMode) toggleDrag();
  // Refresh the undo button count now that the toolbar is visible
  if(editMode) _updateUndoButton();
}
function toggleDrag(){
  dragMode=!dragMode;
  $('bDrag').style.background=dragMode?seAccentBg('.8'):'rgba(0,0,0,.7)';
  $('bDrag').style.borderColor=dragMode?seAccent():'#666';
  if(editingWomen){renderMarkersW();}else{renderMarkers();}
  renderWPmarkers();
}
function toggleAll(){showAll=!showAll;$('bAll').textContent=showAll?'👥 Ver otros grupos':'👤 Solo mis cargadas';$('bAll').style.background=showAll?'rgba(0,0,0,.75)':seAccentBg('.8');renderMarkers();}
function showView(n){document.querySelectorAll('.vtab').forEach((t,i)=>t.classList.toggle('a',i===n));document.querySelectorAll('.pnl').forEach((p,i)=>p.classList.toggle('a',i===n));}

// ========== GPS TRACKING ==========
let gpsMarker=null, gpsCircle=null, gpsWatchId=null, gpsOn=false;

function toggleGps(){
  if(gpsOn){
    if(gpsWatchId!==null){navigator.geolocation.clearWatch(gpsWatchId);gpsWatchId=null;}
    if(gpsMarker){gpsMarker.setMap(null);gpsMarker=null;}
    if(gpsCircle){gpsCircle.setMap(null);gpsCircle=null;}
    gpsOn=false;
    $('bGps').style.background='rgba(0,0,0,.75)';
    $('noti').classList.remove('show');
    calc(); // restore footer
    return;
  }
  if(!navigator.geolocation){
    $('noti').textContent='❌ Tu navegador no soporta GPS';
    $('noti').classList.add('show');
    return;
  }
  gpsOn=true;
  $('bGps').style.background='rgba(66,133,244,.8)';
  $('noti').textContent='📍 Buscando ubicación...';
  $('noti').classList.add('show');

  gpsWatchId=navigator.geolocation.watchPosition(
    function(pos){
      const lat=pos.coords.latitude, lng=pos.coords.longitude, acc=pos.coords.accuracy;
      const ll={lat,lng};
      $('noti').classList.remove('show');
      if(!gpsMarker){
        gpsMarker=new google.maps.Marker({
          position:ll, map:gmap, zIndex:9000,
          icon:{path:google.maps.SymbolPath.CIRCLE,scale:10,fillColor:'#4285F4',fillOpacity:1,strokeColor:'#fff',strokeWeight:3}
        });
        gpsCircle=new google.maps.Circle({
          center:ll,radius:acc,map:gmap,fillColor:'#4285F4',fillOpacity:.12,strokeColor:'#4285F4',strokeOpacity:.3,strokeWeight:1
        });
        gmap.setCenter(ll);
        gmap.setZoom(17);
      } else {
        gpsMarker.setPosition(ll);
        gpsCircle.setCenter(ll);
        gpsCircle.setRadius(acc);
      }
      // Info about nearest change
      let nearIdx=0,nearD=Infinity;
      changes.forEach((ch,i)=>{const d=hd(ll,ch);if(d<nearD){nearD=d;nearIdx=i;}});
      const near=changes[nearIdx];
      if(near){
        const nextMine=myCarries.find(mc=>mc.num>near.num);
        let info='📍 Cerca del cambio #'+(+near.num||0)+' (Grp #'+(+near.grp||0)+')';
        if(near.n) info+=' · '+_escapeHtml(near.n);
        if(nextMine) info+='<br>Próxima cargada: #'+(+nextMine.ci||0)+' (~'+_escapeHtml(nextMine.time||'')+')';
        $('noti').innerHTML='<b style="color:#4285F4">'+info+'</b>';
        $('noti').classList.add('show');
      }
    },
    function(err){
      gpsOn=false;
      $('bGps').style.background='rgba(0,0,0,.75)';
      if(err.code===1){
        $('noti').innerHTML='❌ Permiso denegado.<br>Si abriste el archivo descargado, el GPS no funciona por seguridad del navegador.<br><b>Solución:</b> Abrí la app desde Claude (sin descargar) o subila a un hosting HTTPS.';
      } else if(err.code===2){
        $('noti').textContent='❌ GPS no disponible. Activá la ubicación en Ajustes del cel.';
      } else {
        $('noti').textContent='❌ Tiempo agotado. Asegurate de tener GPS activado.';
      }
      $('noti').classList.add('show');
    },
    {enableHighAccuracy:true, maximumAge:5000, timeout:10000}
  );
}
// ========== COUNTDOWN TIMER ==========
let countdownInterval=null;
function startCountdown(){
  if(countdownInterval) clearInterval(countdownInterval);
  countdownInterval=setInterval(updateCountdown,30000); // every 30s
  // Also refresh projected times every 60s
  setInterval(function(){if(myCarries.length>0)renderLive();},60000);
  updateCountdown();
}
function updateCountdown(){
  const el=document.getElementById('countdownText');
  if(!el||!myCarries.length) return;
  var effCambio=getEffCambio();
  const pending=myCarries.filter(mc=>!isDone(mc.ci)&&!(effCambio>0&&mc.num<=effCambio));
  if(pending.length===0){el.textContent='';hideAlert();return;}
  const next=pending[0];
  const est=getEstimate(next);
  const tp=est.match(/(\d+):(\d+)\s*(AM|PM)/i);
  if(!tp){el.textContent='';return;}
  let h=parseInt(tp[1]),m=parseInt(tp[2]);
  if(tp[3].toUpperCase()==='PM'&&h<12)h+=12;
  if(tp[3].toUpperCase()==='AM'&&h===12)h=0;
  const now=new Date();
  // Forward-looking estimate: handle midnight crossings via the shared helper
  const estDate = _resolveTimeOfDay(h, m, 'future');
  const diffMin=Math.round((estDate-now)/60000);
  if(diffMin<=0){
    el.innerHTML='<span style="color:#c084fc;font-weight:700">⏰ Cargada en curso</span>';
    if(navigator.vibrate&&lastAlertCi!==next.ci){navigator.vibrate([300,100,300,100,500]);lastAlertCi=next.ci;}
  } else if(diffMin<=5){
    el.innerHTML='<span style="color:#ff9800;font-weight:700">⚠️ ¡Faltan <b>~'+diffMin+' min</b>! Preparáte</span>';
    if(navigator.vibrate&&lastAlertCi!==next.ci){navigator.vibrate([200,100,200]);lastAlertCi=next.ci;}
  } else if(diffMin<=60){
    el.innerHTML='<span style="color:#c084fc">⏳ Faltan <b>~'+diffMin+' min</b> para tu cargada</span>';

  } else {
    const hrs=Math.floor(diffMin/60),mins=diffMin%60;
    el.innerHTML='<span style="color:#aaa">⏳ Faltan ~'+hrs+'h '+mins+'min</span>';

  }
}

// ========== CARRY ALERT (vibration + flash) ==========
let lastAlertCi=0, lastAlertType='';
function triggerAlert(ci,type){
  const key=ci+'-'+type;
  if(lastAlertCi===ci&&lastAlertType===type) return; // already alerted
  lastAlertCi=ci;lastAlertType=type;
  // Vibrate
  if(navigator.vibrate){
    if(type==='now') navigator.vibrate([300,100,300,100,500]); // strong
    else navigator.vibrate([200,100,200]); // medium
  }
  // Show flash banner
  const banner=document.getElementById('alertBanner');
  if(banner){
    if(type==='now'){
      banner.innerHTML='⏰ <b>¡CARGADA #'+ci+' EN CURSO!</b>';
      banner.style.background='rgba(192,132,252,.2)';
      banner.style.borderColor='#c084fc';
    } else {
      banner.innerHTML='⚠️ <b>¡Preparáte! Cargada #'+ci+' en menos de 5 min</b>';
      banner.style.background='rgba(255,152,0,.2)';
      banner.style.borderColor='#ff9800';
    }
    banner.style.display='block';
    banner.classList.add('flash');
    setTimeout(function(){banner.classList.remove('flash');},5000);
  }
}
function hideAlert(){
  const banner=document.getElementById('alertBanner');
  if(banner){banner.style.display='none';banner.classList.remove('flash');}
}
startCountdown();

// ========== INSTALL BANNER ==========
let deferredPrompt=null;
window.addEventListener('beforeinstallprompt',function(e){
  e.preventDefault();
  deferredPrompt=e;
  showInstallBanner();
});
function showInstallBanner(){
  const isStandalone=window.matchMedia('(display-mode: standalone)').matches||window.navigator.standalone;
  const dismissed=localStorage.getItem('installDismissed');
  if(!isStandalone&&!dismissed){
    $('installBanner').style.display='block';
  }
}
function installApp(){
  if(deferredPrompt){
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(function(result){
      if(result.outcome==='accepted') $('installBanner').style.display='none';
      deferredPrompt=null;
    });
  } else {
    // Fallback: show manual instructions
    alert('Tocá los 3 puntos (⋮) arriba a la derecha → "Agregar a pantalla de inicio"');
  }
}
function dismissInstall(){
  $('installBanner').style.display='none';
  localStorage.setItem('installDismissed','1');
}
// Also show if no prompt captured after 3s (for browsers that don't fire beforeinstallprompt)
setTimeout(function(){
  if(!deferredPrompt) showInstallBanner();
},3000);

// ========== SERVICE WORKER + UPDATE FLOW ==========
// On every load we register the SW and then aggressively check for a newer
// version. When one is found we surface a top banner; applying it hands control
// to the new SW (which pre-caches fresh files on install and drops old caches
// on activate) and reloads. We deliberately avoid wiping caches client-side
// before reload, since that can leave the app unstyled if the network blips.
(function(){
  if(!('serviceWorker' in navigator)) return;
  var reg=null;
  var bannerShown=false;
  var countdownTimer=null;
  function showUpdateBanner(){
    if(bannerShown) return; bannerShown=true;
    var bar=document.createElement('div');
    bar.id='swUpdateBanner';
    bar.setAttribute('role','alert');
    bar.style.cssText='position:fixed;top:0;left:0;right:0;z-index:10000;background:linear-gradient(90deg,#7c3aed,#a855f7);color:#fff;padding:12px 16px;text-align:center;font-size:14px;font-weight:700;box-shadow:0 4px 14px rgba(0,0,0,.4);font-family:inherit;animation:swSlideIn .35s ease-out';
    // Inject the slide-in keyframe once
    if(!document.getElementById('swUpdateStyle')){
      var st=document.createElement('style'); st.id='swUpdateStyle';
      st.textContent='@keyframes swSlideIn{from{transform:translateY(-100%)}to{transform:translateY(0)}}';
      document.head.appendChild(st);
    }
    var secs=10;
    function paint(){
      bar.innerHTML=
        '🆕 Nueva versión disponible'
        +'<div style="font-size:11px;font-weight:400;opacity:.95;margin-top:3px">Actualizando en '+secs+'s · limpia caché y reinstala</div>'
        +'<div style="margin-top:8px;display:flex;gap:8px;justify-content:center">'
        +'<button id="swNow" style="padding:6px 14px;border:none;border-radius:8px;background:#fff;color:#7c3aed;font-size:12px;font-weight:700;cursor:pointer;font-family:inherit">Actualizar ya</button>'
        +'<button id="swLater" style="padding:6px 14px;border:1px solid rgba(255,255,255,.6);border-radius:8px;background:transparent;color:#fff;font-size:12px;font-weight:600;cursor:pointer;font-family:inherit">Ahora no</button>'
        +'</div>';
      var nowBtn=bar.querySelector('#swNow');
      var laterBtn=bar.querySelector('#swLater');
      if(nowBtn) nowBtn.onclick=function(e){ e.stopPropagation(); if(countdownTimer)clearInterval(countdownTimer); applyUpdate(bar); };
      if(laterBtn) laterBtn.onclick=function(e){ e.stopPropagation(); if(countdownTimer)clearInterval(countdownTimer); bar.remove(); bannerShown=false; };
    }
    paint();
    document.body.appendChild(bar);
    countdownTimer=setInterval(function(){
      // Don't yank the app out from under an admin who is editing the map.
      if(typeof editMode!=='undefined' && editMode) return;
      secs--;
      if(secs<=0){ clearInterval(countdownTimer); applyUpdate(bar); return; }
      paint();
    },1000);
  }
  function applyUpdate(bar){
    if(bar){
      bar.style.pointerEvents='none';
      bar.innerHTML='<span style="display:inline-block;animation:swSlideIn .8s infinite alternate">⏳ Actualizando versión nueva...</span>';
    }
    // IMPORTANT: do NOT wipe all caches client-side before reloading. Doing so
    // leaves a window with an empty cache; if the network blips during the
    // reload, app.css/app.js fail to fetch and the page renders unstyled.
    // The new SW (bumped CACHE_NAME) already pre-caches the fresh files on
    // install and deletes old caches on activate — that is enough to refresh.
    var reloaded=false;
    var doReload=function(){ if(reloaded) return; reloaded=true; window.location.reload(); };
    if(reg && reg.waiting){
      // Hand control to the freshly-installed SW, then reload once it takes over.
      try{ navigator.serviceWorker.addEventListener('controllerchange', doReload); }catch(e){}
      try{ reg.waiting.postMessage({type:'SKIP_WAITING'}); }catch(e){}
      setTimeout(doReload, 2000); // safety net if controllerchange never fires
    } else {
      // No pending SW (manual force): network-first will pull fresh HTML/JS/CSS.
      setTimeout(doReload, 300);
    }
  }
  // Expose so the ⚙️ panel can offer a manual "force update" button. Useful
  // when the automatic banner missed an update (e.g. first deploy after we
  // shipped the banner itself, or a slow network where the SW install raced
  // ahead of the listener).
  window.forceUpdateApp = function(){
    var btn = document.getElementById('forceUpdateBtn');
    if(btn){ btn.disabled=true; btn.textContent='⏳ Actualizando...'; }
    applyUpdate(null);
  };
  function watchForUpdate(r){
    if(!r) return;
    r.addEventListener('updatefound', function(){
      var n=r.installing;
      if(!n) return;
      n.addEventListener('statechange', function(){
        if(n.state==='installed' && navigator.serviceWorker.controller){
          // A new SW is waiting to take over — surface the banner
          showUpdateBanner();
        }
      });
    });
  }
  navigator.serviceWorker.register('./firebase-messaging-sw.js').then(function(r){
    reg=r;
    watchForUpdate(r);
    // Trigger an update check at load and then every 15 min while open
    try{ r.update(); }catch(e){}
    setInterval(function(){ try{ r.update(); }catch(e){} }, 15*60*1000);
    // Also check when the tab comes back to the foreground
    document.addEventListener('visibilitychange', function(){
      if(document.visibilityState==='visible'){ try{ r.update(); }catch(e){} }
    });
    // If a SW is already waiting (e.g. installed during a previous load), prompt now
    if(r.waiting && navigator.serviceWorker.controller) showUpdateBanner();
  }).catch(function(err){ console.log('SW register error', err); });
  // Reload once the active SW changes (e.g. after SKIP_WAITING)
  var reloaded=false;
  navigator.serviceWorker.addEventListener('controllerchange', function(){
    if(reloaded) return; reloaded=true;
    // Only auto-reload if the user clicked the banner; otherwise we already
    // call reload() in applyUpdate() which is enough.
  });
})();

// ========== Block 2: Firebase init, auth, push, GPS ==========
// ========== URNA GPS TRACKING ==========
const firebaseConfig = {
  apiKey: "AIzaSyCxQxXH4qihmmjiGTVdWC7QnBfdbklfcU8",
  authDomain: "procesion-sonsonate.firebaseapp.com",
  databaseURL: "https://procesion-sonsonate-default-rtdb.firebaseio.com",
  projectId: "procesion-sonsonate",
  storageBucket: "procesion-sonsonate.firebasestorage.app",
  messagingSenderId: "972231146098",
  appId: "1:972231146098:web:fedd850a29d974484520eb"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// ========== ADMIN AUTH (Google Identity Services + Firebase) ==========
// We use GIS instead of Firebase signInWithRedirect because the firebaseapp.com
// auth handler fails on mobile due to third-party cookie restrictions when the
// app is hosted cross-origin (GitHub Pages).
// Super-admins are hardcoded. They can manage the editors list via UI.
// Other editors live at /admins/{email-with-dots-as-commas} in Firebase.
const ADMIN_SUPER_EMAILS = [
  'njrmancia@gmail.com'
];
const ADMIN_OAUTH_CLIENT_ID = '972231146098-2q1titms75k7mfdvsu2l5upmrb73ltcm.apps.googleusercontent.com';
const auth = firebase.auth();
let isAdmin = false;
let isSuperAdmin = false;
let authResolved = false;
let _gisInitialized = false;
let _adminListFromDB = [];
let _adminListLoaded = false;

function _emailToKey(email){
  return (email||'').toLowerCase().trim().replace(/\./g,',');
}
function _keyToEmail(key){
  return (key||'').replace(/,/g,'.');
}
function _isSuperAdmin(email){
  if(!email) return false;
  return ADMIN_SUPER_EMAILS.indexOf(email.toLowerCase().trim()) !== -1;
}
function _isAdminEmail(email){
  if(!email) return false;
  email = email.toLowerCase().trim();
  if(_isSuperAdmin(email)) return true;
  return _adminListFromDB.indexOf(email) !== -1;
}

// Live editor list from Firebase
db.ref('admins').on('value', function(snap){
  var d = snap.val() || {};
  _adminListFromDB = Object.keys(d).filter(function(k){return d[k]===true;}).map(_keyToEmail);
  _adminListLoaded = true;
  renderAdminList();
  _recheckCurrentUser();
}, function(err){
  console.warn('Cannot read /admins:', err && err.code);
  _adminListLoaded = true;
  _adminListFromDB = [];
  _recheckCurrentUser();
});

function _recheckCurrentUser(){
  var user = auth.currentUser;
  if(!user) return;
  var nowAdmin = _isAdminEmail(user.email);
  if(nowAdmin === isAdmin) return;
  if(!nowAdmin && isAdmin){
    // Was admin, now revoked
    isAdmin = false; isShared = true;
    try{ alert('Tu acceso de editor fue revocado.'); }catch(e){_logErr("swallow",e);}
    auth.signOut().then(function(){ window.location.href = window.location.pathname; });
    return;
  }
  // Newly admin (e.g., list loaded after auth)
  isAdmin = true; isShared = false;
  _cleanEditParam();
  applyAuthMode();
}

auth.onAuthStateChanged(function(user){
  authResolved = true;
  if(user && _isSuperAdmin(user.email)){
    isAdmin = true; isShared = false;
    _cleanEditParam();
  } else if(user){
    if(!_adminListLoaded){
      // List not loaded yet — public UI for now; _recheckCurrentUser will flip it
      isAdmin = false; isShared = true;
    } else if(_isAdminEmail(user.email)){
      isAdmin = true; isShared = false;
      _cleanEditParam();
    } else {
      isAdmin = false; isShared = true;
      auth.signOut();
      try{ alert('Esta cuenta de Google no está autorizada para editar.'); }catch(e){_logErr("swallow",e);}
    }
  } else {
    isAdmin = false; isShared = true;
  }
  applyAuthMode();
});

function _cleanEditParam(){
  try{
    var u=new URL(window.location.href);
    if(u.searchParams.has('edit')){
      u.searchParams.delete('edit');
      window.history.replaceState({}, '', u.pathname + (u.search?u.search:'') + u.hash);
    }
  }catch(e){_logErr("swallow",e);}
}

function _waitForGIS(timeoutMs){
  return new Promise(function(resolve, reject){
    var start = Date.now();
    (function check(){
      if(typeof google!=='undefined' && google.accounts && google.accounts.id){
        return resolve();
      }
      if(Date.now()-start > timeoutMs) return reject(new Error('GIS load timeout'));
      setTimeout(check, 100);
    })();
  });
}

function _initGIS(){
  if(_gisInitialized) return;
  google.accounts.id.initialize({
    client_id: ADMIN_OAUTH_CLIENT_ID,
    callback: handleGoogleCredential,
    auto_select: false,
    cancel_on_tap_outside: true,
    use_fedcm_for_prompt: true
  });
  _gisInitialized = true;
}

function handleGoogleCredential(response){
  if(!response||!response.credential){
    try{ alert('No se recibió credencial de Google.'); }catch(e){_logErr("swallow",e);}
    return;
  }
  // Exchange the Google id_token for a Firebase credential
  var credential = firebase.auth.GoogleAuthProvider.credential(response.credential);
  auth.signInWithCredential(credential).then(function(result){
    if(result && result.user && _isAdminEmail(result.user.email)){
      // Reload to clean URL so admin-only init runs from a fresh state
      window.location.href = window.location.pathname;
    }
    // Wrong account is handled by onAuthStateChanged (signs out + alert)
  }).catch(function(err){
    console.error('signInWithCredential error:', err);
    try{ alert('Error al iniciar sesión: '+(err.message||err.code||'desconocido')); }catch(e){_logErr("swallow",e);}
  });
}

function loginAsAdmin(){
  _waitForGIS(8000).then(function(){
    _initGIS();
    _showGoogleLoginModal();
  }).catch(function(err){
    console.error('GIS not loaded:', err);
    try{ alert('La librería de Google no se cargó. Refrescá la página y probá de nuevo.'); }catch(e){_logErr("swallow",e);}
  });
}

function _showGoogleLoginModal(){
  var modal = document.getElementById('googleLoginModal');
  if(!modal){
    modal = document.createElement('div');
    modal.id = 'googleLoginModal';
    modal.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,.92);z-index:99999;display:flex;align-items:center;justify-content:center;padding:16px';
    modal.innerHTML='<div style="background:#1a0a1f;border:2px solid #c084fc;border-radius:14px;padding:24px;text-align:center;max-width:340px;width:100%"><div style="font-size:14px;color:#c084fc;font-weight:700;margin-bottom:8px">🔐 Acceso administrador</div><div style="font-size:12px;color:#aaa;margin-bottom:20px">Iniciá sesión con la cuenta autorizada</div><div id="googleSignInButton" style="display:flex;justify-content:center;margin-bottom:16px"></div><button onclick="document.getElementById(\'googleLoginModal\').remove()" style="background:none;border:1px solid #666;color:#aaa;padding:8px 16px;border-radius:6px;font-size:12px;cursor:pointer;font-family:inherit">Cancelar</button></div>';
    document.body.appendChild(modal);
  } else {
    modal.style.display='flex';
  }
  google.accounts.id.renderButton(
    document.getElementById('googleSignInButton'),
    {type:'standard', theme:'filled_blue', size:'large', text:'signin_with', shape:'rectangular', logo_alignment:'left', width:280}
  );
}

function logoutAdmin(){
  // Sign out of Firebase + revoke GIS auto-select to force account picker next time
  if(typeof google!=='undefined' && google.accounts && google.accounts.id){
    try{ google.accounts.id.disableAutoSelect(); }catch(e){_logErr("swallow",e);}
  }
  auth.signOut().then(function(){
    // Redirect to clean public URL
    window.location.href = window.location.pathname;
  });
}

function applyAuthMode(){
  // Toggle UI between admin (editor) and public (shared) mode
  var eb = document.getElementById('mapEditBar');
  var cfgBtn = document.getElementById('btnConfig');
  var modal = document.getElementById('sharedModal');
  var glModal = document.getElementById('googleLoginModal');
  var loginBtn = document.getElementById('btnAdminLogin');
  var logoutBtn = document.getElementById('btnAdminLogout');
  isSuperAdmin = isAdmin && !!auth.currentUser && _isSuperAdmin(auth.currentUser.email);
  if(isAdmin){
    if(eb) eb.style.display='flex';
    document.querySelectorAll('.adminOnly').forEach(function(el){el.style.display='';});
    document.querySelectorAll('.superAdminOnly').forEach(function(el){el.style.display=isSuperAdmin?'':'none';});
    if(cfgBtn) cfgBtn.onclick = function(){openCfg();};
    if(modal) modal.style.display='none';
    if(glModal) glModal.remove();
    if(loginBtn) loginBtn.style.display='none';
    if(logoutBtn) logoutBtn.style.display='';
    if(isSuperAdmin) renderAdminList();
  } else {
    if(eb) eb.style.display='none';
    document.querySelectorAll('.adminOnly').forEach(function(el){el.style.display='none';});
    document.querySelectorAll('.superAdminOnly').forEach(function(el){el.style.display='none';});
    if(cfgBtn) cfgBtn.onclick = function(){reopenGroupSelector();};
    if(loginBtn) loginBtn.style.display='';
    if(logoutBtn) logoutBtn.style.display='none';
  }
  applyDayFilter();
  syncHeaderPad();
}

// The header is position:fixed and the body offsets content with a fixed
// padding-top. Editor-only rows (like the AHSEC GPS status) make the header
// taller, so the first banner would slide underneath. Keep the body padding in
// sync with the header's real height instead of a hard-coded value.
function syncHeaderPad(){
  var hdr=document.querySelector('.hdr');
  if(hdr) document.body.style.paddingTop=hdr.offsetHeight+'px';
}
window.addEventListener('resize', syncHeaderPad);
window.addEventListener('load', syncHeaderPad);

// ========== ADMIN LIST MANAGEMENT (super-admin only) ==========
function renderAdminList(){
  var container = document.getElementById('adminListContainer');
  if(!container) return;
  var html = '';
  ADMIN_SUPER_EMAILS.forEach(function(email){
    html += '<div style="display:flex;justify-content:space-between;align-items:center;padding:6px 8px;background:rgba(212,175,55,.1);border:1px solid rgba(212,175,55,.3);border-radius:6px;margin-bottom:4px"><span style="font-size:12px;color:#d4af37;word-break:break-all">👑 '+_escapeHtml(email)+'</span><span style="font-size:9px;color:#aaa;flex-shrink:0;margin-left:6px">super-admin</span></div>';
  });
  _adminListFromDB.forEach(function(email){
    if(_isSuperAdmin(email)) return;
    html += '<div style="display:flex;justify-content:space-between;align-items:center;padding:6px 8px;background:rgba(124,58,237,.1);border:1px solid rgba(124,58,237,.3);border-radius:6px;margin-bottom:4px"><span style="font-size:12px;color:#c084fc;word-break:break-all">'+_escapeHtml(email)+'</span><button onclick="removeAdminEmail(\''+email.replace(/'/g,"\\'")+'\')" style="background:none;border:none;color:#c0392b;font-size:14px;cursor:pointer;flex-shrink:0;margin-left:6px">🗑️</button></div>';
  });
  if(_adminListFromDB.filter(function(e){return !_isSuperAdmin(e);}).length === 0){
    html += '<div style="font-size:11px;color:#888;text-align:center;padding:8px;font-style:italic">Sin editores adicionales</div>';
  }
  container.innerHTML = html;
}

function addAdminEmail(){
  var input = document.getElementById('newAdminEmail');
  if(!input) return;
  var email = (input.value||'').toLowerCase().trim();
  if(!email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)){
    alert('Email inválido. Tiene que ser un correo de Google (gmail.com o Workspace).');
    return;
  }
  if(_isSuperAdmin(email)){ alert('Ese email ya es super-admin.'); input.value=''; return; }
  if(_adminListFromDB.indexOf(email) !== -1){ alert('Ese email ya es editor.'); input.value=''; return; }
  db.ref('admins/' + _emailToKey(email)).set(true).then(function(){
    input.value='';
  }).catch(function(err){
    alert('Error al agregar: '+(err.message||err.code||'desconocido'));
  });
}

async function removeAdminEmail(email){
  if(!await customConfirm('¿Quitar a '+email+' como editor?\n\nVa a perder acceso de edición la próxima vez que use la app.')) return;
  db.ref('admins/' + _emailToKey(email)).remove().catch(function(err){
    alert('Error al quitar: '+(err.message||err.code||'desconocido'));
  });
}

// If URL has ?edit=1 and user isn't already authenticated, auto-open the login modal
(function(){
  var p = new URLSearchParams(window.location.search);
  if(!p.has('edit')) return;
  setTimeout(function(){
    if(!auth.currentUser) loginAsAdmin();
  }, 1500);
})();

// ========== PUSH NOTIFICATIONS (FCM) ==========
var fcmMessaging=null;
var pushSubscribed=false;
var VAPID_KEY='BCTlwjihU000PcnYjnMlRlbZFgG5bo88aTbk-P9gaYflY_xncobn9b85FiWV1RaEKgUxTUTgtF_vTzbjoP_gAMc';

function initPush(){
  try{
    fcmMessaging=firebase.messaging();
    // Foreground message handler
    fcmMessaging.onMessage(function(payload){
      var data=payload.data||{};
      var title=data.title||(isSEMode?'Santo Entierro · Sonsonate':'Jesús Nazareno · Sonsonate');
      var body=data.body||'Grupo actualizado';
      // Show in-app notification
      var notDiv=document.getElementById('pushNotiBanner');
      if(notDiv){
        notDiv.innerHTML='<b>'+_escapeHtml(title)+'</b><br>'+_escapeHtml(body);
        notDiv.style.display='block';
        setTimeout(function(){notDiv.style.display='none';},5000);
      }
      // Also vibrate
      if(navigator.vibrate) navigator.vibrate([200,100,200]);
    });
  }catch(e){console.log('FCM init error',e);}
}

function subscribePush(){
  if(!('Notification' in window)){alert('Tu navegador no soporta notificaciones');return;}
  // Already denied by browser - show instructions
  if(Notification.permission==='denied'){
    showPermissionHelp();
    return;
  }
  // Already granted - just get token
  if(Notification.permission==='granted'){
    getPushToken();
    return;
  }
  // Never asked - show custom dialog first
  showPushPreDialog();
}

function showPushPreDialog(){
  var d=document.createElement('div');
  d.id='pushPreDialog';
  d.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,.85);z-index:9999;display:flex;align-items:center;justify-content:center;padding:16px';
  d.innerHTML='<div style="background:#1a1a2e;border:2px solid #7c3aed;border-radius:14px;padding:20px;max-width:300px;text-align:center">'
    +'<div style="font-size:40px;margin-bottom:10px">🔔</div>'
    +'<div style="font-size:16px;font-weight:700;color:#c084fc;margin-bottom:8px">¿Querés recibir alertas?</div>'
    +'<div style="font-size:13px;color:#ccc;margin-bottom:16px">Te avisamos cuando tu grupo esté por cargar, aunque la app esté cerrada.</div>'
    +'<button onclick="closePushPreDialog();requestBrowserPush()" style="width:100%;padding:12px;border:none;border-radius:8px;background:#7c3aed;color:#fff;font-size:15px;font-weight:700;cursor:pointer;margin-bottom:8px;font-family:inherit">Sí, activar alertas</button>'
    +'<button onclick="closePushPreDialog()" style="width:100%;padding:10px;border:1px solid #666;border-radius:8px;background:none;color:#888;font-size:13px;cursor:pointer;font-family:inherit">Ahora no</button>'
    +'</div>';
  document.body.appendChild(d);
}
function closePushPreDialog(){
  var d=document.getElementById('pushPreDialog');if(d)d.remove();
}
function requestBrowserPush(){
  Notification.requestPermission().then(function(perm){
    if(perm==='granted'){
      getPushToken();
    } else {
      showPermissionHelp();
    }
  });
}
function getPushToken(){
  navigator.serviceWorker.ready.then(function(reg){
    return fcmMessaging.getToken({vapidKey:VAPID_KEY,serviceWorkerRegistration:reg});
  }).then(function(token){
    if(!token) return;
    pushSubscribed=true;
    try{localStorage.setItem('pushToken',token);}catch(e){_logErr("swallow",e);}
    updatePushToken();
    updatePushUI();
    alert('✅ ¡Notificaciones activadas! Te avisaremos cuando tu grupo esté por cargar.');
  }).catch(function(err){
    console.log('Push token error',err);
    alert('Error: '+err.message);
  });
}
function showPermissionHelp(){
  var msg='⚠️ Las notificaciones están bloqueadas.\n\n';
  msg+='Para activarlas:\n';
  msg+='1. Tocá el candado 🔒 junto a la URL\n';
  msg+='2. Tocá "Permisos" o "Configuración del sitio"\n';
  msg+='3. Cambiá Notificaciones a "Permitir"\n';
  msg+='4. Recargá la página y volvé a intentar';
  alert(msg);
}

function updatePushToken(){
  var token;try{token=localStorage.getItem('pushToken');}catch(e){_logErr("swallow",e);}
  if(!token) return;
  var grupo=+document.getElementById('cG').value||5;
  var tipo=+document.getElementById('cType').value||21;
  var saca=daySaca[currentDay]||19;
  var watchSel=document.getElementById('pushWatchGrp');
  var watchGrp=watchSel?(+watchSel.value||0):0;
  var actualWatch=watchGrp||grupo;
  var grpCount=(tipo===27)?getMujCount():getHomCount();
  var alertBefore=+(document.getElementById('pushAlertBefore')?document.getElementById('pushAlertBefore').value:3);
  var tot=positions.length||44;
  
  // Find ALL cambios where this grupo carries
  var misCambios=[];
  for(var c=1;c<=tot;c++){
    var grpAtC=((saca-1+c-1)%grpCount)+1;
    if(grpAtC===actualWatch) misCambios.push(c);
  }
  
  // Find the NEXT cambio that hasn't passed yet
  var currentCambio=currentGrupoActual||0;
  var nextCambio=0;
  for(var j=0;j<misCambios.length;j++){
    if(misCambios[j]>currentCambio){
      nextCambio=misCambios[j];
      break;
    }
  }
  // If all passed, no alert needed
  var alertAtCambio=nextCambio>0?Math.max(1,nextCambio-alertBefore):0;
  
  db.ref('pushTokens/'+_tokenToKey(token)).set({
    token:token,
    grupo:grupo,
    tipo:tipo,
    watchGrp:actualWatch,
    alertAtCambio:alertAtCambio,
    alertCambio:nextCambio,
    alertBefore:alertBefore,
    allCambios:misCambios,
    day:currentDay,
    t:Date.now()
  });
  try{localStorage.setItem('pushWatchGrp',watchGrp);localStorage.setItem('pushAlertBefore',alertBefore);}catch(e){_logErr("swallow",e);}
}

function updatePushUI(){
  var btn=document.getElementById('pushSubBtn');
  if(!btn) return;
  if(pushSubscribed||localStorage.getItem('pushToken')){
    btn.textContent='🔕 Desactivar notificaciones';
    btn.style.background='rgba(244,67,54,.15)';
    btn.style.borderColor='#f44336';
    btn.style.color='#f44336';
    btn.onclick=unsubscribePush;
    pushSubscribed=true;
    var ps=document.getElementById('pushSettings');
    if(ps) ps.style.display='block';
    // Populate watch group selector
    var sel=document.getElementById('pushWatchGrp');
    if(sel&&sel.options.length<=1){
      var grpCount=(+document.getElementById('cType').value===27)?getMujCount():getHomCount();
      for(var g=1;g<=grpCount;g++){
        var opt=document.createElement('option');
        opt.value=g;opt.textContent='Grupo #'+g;
        sel.appendChild(opt);
      }
      var saved=localStorage.getItem('pushWatchGrp');
      if(saved) sel.value=saved;
    }
    var abSel=document.getElementById('pushAlertBefore');
    var savedAb=localStorage.getItem('pushAlertBefore');
    if(abSel&&savedAb) abSel.value=savedAb;
  } else {
    btn.textContent='🔔 Activar notificaciones push';
    btn.style.background='rgba(124,58,237,.15)';
    btn.style.borderColor='#7c3aed';
    btn.style.color='#c084fc';
    btn.onclick=subscribePush;
    var ps2=document.getElementById('pushSettings');
    if(ps2) ps2.style.display='none';
  }
}

function unsubscribePush(){
  var token;try{token=localStorage.getItem('pushToken');}catch(e){_logErr("swallow",e);}
  if(token){
    // Remove both the new safe key and the old truncated key (legacy
    // entries from devices that subscribed before _tokenToKey existed)
    db.ref('pushTokens/'+_tokenToKey(token)).remove();
    try{ db.ref('pushTokens/'+token.substring(0,20)).remove(); }catch(e){_logErr('legacy push key', e);}
  }
  try{
    localStorage.removeItem('pushToken');
    localStorage.removeItem('pushWatchGrp');
    localStorage.removeItem('pushAlertBefore');
  }catch(e){_logErr("swallow",e);}
  pushSubscribed=false;
  updatePushUI();
  alert('✅ Notificaciones desactivadas');
}

function syncPushPrefs(){updatePushToken();}

// Auto-init push
setTimeout(function(){
  initPush();
  // Check if already subscribed
  if(localStorage.getItem('pushToken')) pushSubscribed=true;
},2000);

// ========== LIVE BROADCAST (runs first for everyone) ==========
db.ref('broadcast').on('value',function(snap){
  var d=snap.val();
  var banner=document.getElementById('broadcastBanner');
  if(!banner) return;
  if(!d||!d.text){
    banner.style.display='none';
    return;
  }
  document.getElementById('broadcastText').textContent='📢 '+d.text;
  var ago=Math.round((Date.now()-d.t)/60000);
  document.getElementById('broadcastTime').textContent=ago<1?'Ahora mismo':ago<60?'Hace '+ago+' min':'Hace '+Math.floor(ago/60)+'h '+ago%60+'m';
  banner.style.display='block';
});

let urnaMarkers={jesus:null,virgen:null};
let urnaActive={jesus:false,virgen:false};
let urnaWatchIds={jesus:null,virgen:null};
let wakeLock=null;

function showUrnaButton(){
  if(!isShared){
    document.getElementById('bUrna').style.display='block';
    document.getElementById('bUrnaV').style.display='block';
  }
}

async function requestWakeLock(){
  try{if('wakeLock' in navigator){wakeLock=await navigator.wakeLock.request('screen');}}catch(e){_logErr("swallow",e);}
}
function releaseWakeLock(){
  if(wakeLock){wakeLock.release();wakeLock=null;}
}

function toggleUrna(tipo){
  const btnId=tipo==='jesus'?'bUrna':'bUrnaV';
  const label=tipo==='jesus'?'✝️ Anda Jesús':'👑 Anda Virgen';
  const activeLabel=tipo==='jesus'?'✝️ Jesús ACTIVA':'👑 Virgen ACTIVA';
  const bgOff=tipo==='jesus'?'rgba(220,38,38,.8)':'rgba(59,130,246,.8)';
  const bgOn=tipo==='jesus'?'rgba(220,38,38,1)':'rgba(59,130,246,1)';

  if(urnaActive[tipo]){
    if(urnaWatchIds[tipo]!==null){navigator.geolocation.clearWatch(urnaWatchIds[tipo]);urnaWatchIds[tipo]=null;}
    db.ref(tipo).remove();
    urnaActive[tipo]=false;
    saveUrnaState();
    if(!urnaActive.jesus&&!urnaActive.virgen){releaseWakeLock();stopKeepAlive();}
    document.getElementById(btnId).style.background=bgOff;
    document.getElementById(btnId).textContent=label;
    return;
  }
  if(!navigator.geolocation){alert('GPS no disponible');return;}
  
  db.ref(tipo).once('value',async function(snap){
    const d=snap.val();
    if(d&&d.t&&Date.now()-d.t<120000){
      if(!await customConfirm('⚠️ '+label+' ya está siendo rastreada. ¿Tomar control?')) return;
    }
    urnaActive[tipo]=true;
    saveUrnaState();
    requestWakeLock();
    startKeepAlive();
    document.getElementById(btnId).style.background=bgOn;
    document.getElementById(btnId).textContent=activeLabel;
    startGPSWatch(tipo);
  });
}

function startGPSWatch(tipo){
  if(urnaWatchIds[tipo]!==null){navigator.geolocation.clearWatch(urnaWatchIds[tipo]);}
  var lastWrite={};
  urnaWatchIds[tipo]=navigator.geolocation.watchPosition(function(pos){
    var now=Date.now();
    if(lastWrite[tipo]&&now-lastWrite[tipo]<8000) return;
    lastWrite[tipo]=now;
    if(tipo==='jesus') window._lastRealGPS=now;
    db.ref(tipo).set({lat:pos.coords.latitude,lng:pos.coords.longitude,t:now});
  },function(err){
    console.log(tipo+' GPS error',err);
    // Auto-retry on error
    setTimeout(function(){
      if(urnaActive[tipo]) startGPSWatch(tipo);
    },5000);
  },{enableHighAccuracy:true, maximumAge:10000, timeout:15000});
}

// Save/restore GPS tracking state
function saveUrnaState(){
  try{localStorage.setItem('urnaActive',JSON.stringify(urnaActive));}catch(e){_logErr("swallow",e);}
}

function restoreUrnaState(){
  try{
    var saved=localStorage.getItem('urnaActive');
    if(!saved) return;
    var state=JSON.parse(saved);
    if(state.jesus){
      urnaActive.jesus=true;
      requestWakeLock();
      startKeepAlive();
      startGPSWatch('jesus');
      var btn=document.getElementById('bUrna');
      if(btn){btn.style.background='rgba(220,38,38,1)';btn.textContent='✝️ Jesús ACTIVA';}
    }
    if(state.virgen){
      urnaActive.virgen=true;
      requestWakeLock();
      startKeepAlive();
      startGPSWatch('virgen');
      var btn2=document.getElementById('bUrnaV');
      if(btn2){btn2.style.background='rgba(59,130,246,1)';btn2.textContent='👑 Virgen ACTIVA';}
    }
  }catch(e){_logErr("swallow",e);}
}

// Keep-alive: prevent browser from killing the tab when screen is off
var _keepAliveTimer=null;
function startKeepAlive(){
  if(_keepAliveTimer) return;
  // Ping Firebase every 30s to keep connection alive
  _keepAliveTimer=setInterval(function(){
    if(!urnaActive.jesus&&!urnaActive.virgen){stopKeepAlive();return;}
    db.ref('online/'+_GPS_SESSION_ID).set(Date.now());
  },30000);
  // Show persistent notification to keep service worker alive
  if('Notification' in window&&Notification.permission==='granted'){
    navigator.serviceWorker.ready.then(function(reg){
      reg.showNotification('📡 Rastreando procesión',{
        body:'GPS activo — no cierre la app',
        icon:_asset('icon-192.png'),
        tag:'gps-active',
        requireInteraction:true,
        silent:true
      });
    }).catch(function(){});
  }
  showBlackScreenBtn();
}
function showBlackScreenBtn(){
  if(document.getElementById('blackScreenBtn')) return;
  var btn=document.createElement('div');
  btn.id='blackScreenBtn';
  btn.innerHTML='🌑 Pantalla negra';
  btn.style.cssText='position:fixed;bottom:70px;left:50%;transform:translateX(-50%);z-index:3002;background:rgba(0,0,0,.9);color:'+seAccent()+';font-size:13px;font-weight:700;padding:10px 20px;border-radius:22px;border:2px solid '+seAccent()+';cursor:pointer';
  btn.onclick=toggleBlackScreen;
  document.body.appendChild(btn);
}
function removeBlackScreenBtn(){
  var btn=document.getElementById('blackScreenBtn');if(btn)btn.remove();
  var ov=document.getElementById('blackScreenOverlay');if(ov)ov.remove();
}
function toggleBlackScreen(){
  var ov=document.getElementById('blackScreenOverlay');
  if(ov){ov.remove();return;}
  ov=document.createElement('div');
  ov.id='blackScreenOverlay';
  ov.style.cssText='position:fixed;top:0;left:0;right:0;bottom:0;background:#000;z-index:99999;display:flex;align-items:center;justify-content:center;-webkit-tap-highlight-color:transparent';
  ov.innerHTML='<div style="text-align:center;color:#222;font-size:11px"><div style="font-size:20px;margin-bottom:6px">📡</div>GPS activo<br><span style="font-size:9px">Tocá para volver</span></div>';
  ov.onclick=function(){ov.remove();};
  document.body.appendChild(ov);
}
function stopKeepAlive(){
  if(_keepAliveTimer){clearInterval(_keepAliveTimer);_keepAliveTimer=null;}
  // Remove persistent notification
  if(navigator.serviceWorker&&navigator.serviceWorker.ready){
    navigator.serviceWorker.ready.then(function(reg){
      reg.getNotifications({tag:'gps-active'}).then(function(notifs){
        notifs.forEach(function(n){n.close();});
      });
    }).catch(function(){});
  removeBlackScreenBtn();
  }
}

document.addEventListener('visibilitychange',function(){
  if(document.visibilityState==='visible'){
    if(urnaActive.jesus||urnaActive.virgen){
      requestWakeLock();
      // Re-check GPS watches are alive
      if(urnaActive.jesus&&urnaWatchIds.jesus===null) startGPSWatch('jesus');
      if(urnaActive.virgen&&urnaWatchIds.virgen===null) startGPSWatch('virgen');
    }
    // Installed PWAs get aggressively suspended by the OS; the Firebase
    // WebSocket can die silently and never recover, so the live cargadas stop
    // arriving. Forcing offline→online wakes the channel and replays
    // subscriptions. Browser tabs don't hit this because their suspension
    // is lighter.
    try{ db.goOffline(); db.goOnline(); }catch(e){}
  }
});

// Same fix path when the device regains network after being offline.
window.addEventListener('online',function(){ try{ db.goOffline(); db.goOnline(); }catch(e){} });

// Auto-restore GPS on page load
setTimeout(function(){if(typeof restoreUrnaState==='function')restoreUrnaState();},3000);

function buscarAnda(tipo){
  const m=urnaMarkers[tipo];
  const nombre=tipo==='jesus'?'Jesús':'Virgen';
  const icon=tipo==='jesus'?'🔴':'🔵';
  if(!m){
    alert('⏳ La anda de '+nombre+' no está conectada en este momento');
    return;
  }
  showView(0);
  gmap.setCenter(m.getPosition());gmap.setZoom(18);
  const noti=document.getElementById('noti');
  noti.textContent=icon+' '+nombre+' localizada';
  noti.classList.add('show');
  setTimeout(()=>noti.classList.remove('show'),2000);
}

// ========== GPS AUTO-ADVANCE ==========
var autoAdvanceGPS=(function(){ try{ return localStorage.getItem('autoAdvanceGPS')==='1'; }catch(e){ return false; } })();
function toggleAutoGPS(){
  autoAdvanceGPS=!autoAdvanceGPS;
  try{ localStorage.setItem('autoAdvanceGPS', autoAdvanceGPS?'1':'0'); }catch(e){}
  updateAdminLiveControls();
  if(typeof renderLive==='function') renderLive();
}

// Track progress along the route as a "rail"
var railProgress=0;
var lastAutoAdvance=0;
var aheadCount=0;
var gpsReadings=[];
var virgenCambioGPS=0;
var virgenAheadCount=0;
var virgenLastAdvance=0;
var virgenGpsReadings=[];
var virgenGPSLastUpdate=0;
var jesusCambioGPS=0;
var jesusAheadCount=0;
var jesusGpsReadings=[]; // Independent Virgen tracking from GPS // collect readings during cooldown for averaging

function getRouteDistances(){
  var dists=[0];
  for(var i=1;i<positions.length;i++){
    var dlat=(positions[i].lat-positions[i-1].lat)*111320;
    var dlng=(positions[i].lng-positions[i-1].lng)*111320*Math.cos(positions[i].lat*Math.PI/180);
    dists.push(dists[i-1]+Math.sqrt(dlat*dlat+dlng*dlng));
  }
  return dists;
}

function projectOnRail(lat,lng){
  if(positions.length<2) return {dist:0,cambio:0};
  var cosLat=Math.cos(lat*Math.PI/180);
  var startSeg=Math.max(0,currentGrupoActual);
  var endSeg=Math.min(positions.length,currentGrupoActual+3);
  var bestDist=Infinity,bestCambio=startSeg;
  for(var i=startSeg;i<endSeg;i++){
    var distM=Math.sqrt(Math.pow((lat-positions[i].lat)*111320,2)+Math.pow((lng-positions[i].lng)*111320*cosLat,2));
    if(distM<bestDist){bestDist=distM;bestCambio=i+1;}
  }
  if(bestDist>80) return {dist:-1,cambio:-1};
  return {dist:bestCambio,cambio:bestCambio,distFromRoute:bestDist};
}

function findNearestCambio(lat,lng){
  if(positions.length<2) return -1;
  gpsReadings.push({lat:lat,lng:lng,t:Date.now()});
  if(gpsReadings.length>20) gpsReadings.shift();
  var recent=gpsReadings.slice(-3);
  var avgLat=0,avgLng=0;
  for(var r=0;r<recent.length;r++){avgLat+=recent[r].lat;avgLng+=recent[r].lng;}
  avgLat/=recent.length;avgLng/=recent.length;
  var cosLat2=Math.cos(avgLat*Math.PI/180);
  var startK=Math.max(0,currentGrupoActual-2);
  var endK=Math.min(positions.length,currentGrupoActual+5);
  var bestD=Infinity,bestP=-1;
  for(var k=startK;k<endK;k++){
    var dk=Math.sqrt(Math.pow((avgLat-positions[k].lat)*111320,2)+Math.pow((avgLng-positions[k].lng)*111320*cosLat2,2));
    if(dk<bestD){bestD=dk;bestP=k;}
  }
  if(bestD>50) return -1;
  if(bestP+1<=currentGrupoActual){aheadCount=0;return -1;}
  aheadCount++;
  if(aheadCount<3) return -1; // 3 confirmations (~30 sec)
  aheadCount=0;
  gpsReadings=[];
  return bestP+1;
}

var rawGpsDots={};
var _smoothTimers={};
function smoothMove(tipo,target){
  var marker=urnaMarkers[tipo];
  if(!marker) return;
  if(_smoothTimers[tipo]) cancelAnimationFrame(_smoothTimers[tipo]);
  var start=marker.getPosition();
  if(!start) return;
  var sLat=start.lat(),sLng=start.lng();
  var tLat=target.lat,tLng=target.lng;
  var dist=Math.abs(tLat-sLat)+Math.abs(tLng-sLng);
  if(dist<0.000001) return;
  // If jump is too big (>500m), skip animation
  if(dist>0.005){marker.setPosition(target);if(marker._ring)marker._ring.setCenter(target);return;}
  var duration=800;
  var startTime=performance.now();
  function step(now){
    if(!urnaMarkers[tipo]){_smoothTimers[tipo]=null;return;}
    var t=Math.min((now-startTime)/duration,1);
    t=1-Math.pow(1-t,2);
    var lat=sLat+(tLat-sLat)*t;
    var lng=sLng+(tLng-sLng)*t;
    urnaMarkers[tipo].setPosition({lat:lat,lng:lng});
    if(urnaMarkers[tipo]._ring) urnaMarkers[tipo]._ring.setCenter({lat:lat,lng:lng});
    if(t<1) _smoothTimers[tipo]=requestAnimationFrame(step);
    else _smoothTimers[tipo]=null;
  }
  _smoothTimers[tipo]=requestAnimationFrame(step);
}
function getAndaIcon(tipo){
  if(tipo==='jesus') return isSEMode?_asset('se-entierro-marker.png'):_asset('jesus-marker.png');
  return isSEMode?_asset('se-virgen-marker.png'):_asset('maria-marker.png');
}
function getAndaColor(tipo){
  if(isSEMode) return '#e8e8e8';
  return tipo==='jesus'?'#dc2626':'#3b82f6';
}
function listenAnda(tipo,imgUrl,color,zIdx){
  db.ref(tipo).on('value',function(snap){
    const d=snap.val();
    if(!d||!d.lat||!d.lng||Date.now()-d.t>120000){
      if(urnaMarkers[tipo]){
        if(urnaMarkers[tipo]._ring){urnaMarkers[tipo]._ring.setMap(null);}
        urnaMarkers[tipo].setMap(null);urnaMarkers[tipo]=null;
      }
      if(rawGpsDots[tipo]){rawGpsDots[tipo].setMap(null);rawGpsDots[tipo]=null;}
      return;
    }
    const raw={lat:d.lat,lng:d.lng};
    var isRealGPS=(Date.now()-window._lastRealGPS<GPS_TIMEOUT);
    const ll=isRealGPS?snapToRoute(raw):raw;
    var curIcon=getAndaIcon(tipo);
    var curColor=getAndaColor(tipo);

    if(!urnaMarkers[tipo]&&gmap){
      urnaMarkers[tipo]=new google.maps.Marker({
        position:ll, map:gmap, zIndex:zIdx,
        icon:{
          url:curIcon,
          scaledSize:new google.maps.Size(54,66),
          anchor:new google.maps.Point(27,66)
        }
      });
      urnaMarkers[tipo]._iconUrl=curIcon;
      urnaMarkers[tipo]._ring=new google.maps.Circle({
        center:ll,map:gmap,radius:15,
        fillColor:curColor,fillOpacity:0.25,
        strokeColor:curColor,strokeWeight:5,strokeOpacity:0.9,
        zIndex:zIdx-1
      });
    } else if(urnaMarkers[tipo]){
      smoothMove(tipo,ll);
      // Update icon if SE mode changed
      if(urnaMarkers[tipo]._iconUrl!==curIcon){
        urnaMarkers[tipo].setIcon({url:curIcon,scaledSize:new google.maps.Size(54,66),anchor:new google.maps.Point(27,66)});
        urnaMarkers[tipo]._iconUrl=curIcon;
        if(urnaMarkers[tipo]._ring){urnaMarkers[tipo]._ring.setOptions({fillColor:curColor,strokeColor:curColor});}
      }
    }
    // Show small raw GPS dot when real GPS is active (to see if drifting)
    if(isRealGPS&&tipo==='jesus'&&!isShared){
      if(!rawGpsDots[tipo]&&gmap){
        rawGpsDots[tipo]=new google.maps.Circle({
          center:raw,map:gmap,radius:4,
          fillColor:'#ff0',fillOpacity:0.8,
          strokeColor:'#ff0',strokeWeight:1,strokeOpacity:0.6,
          zIndex:zIdx+1
        });
      } else if(rawGpsDots[tipo]){
        rawGpsDots[tipo].setCenter(raw);
        rawGpsDots[tipo].setMap(gmap);
      }
    } else if(rawGpsDots[tipo]){
      rawGpsDots[tipo].setMap(null);
    }
    // GPS Auto-advance: if this is the main anda (jesus) and auto is on
    if(tipo==='jesus'&&autoAdvanceGPS&&!isShared){
      window._lastRealGPS=Date.now();
      var nearCambio=findNearestCambio(ll.lat,ll.lng);
      if(nearCambio>0&&nearCambio>currentGrupoActual){
        // Track real rhythm (for display only, doesn't overwrite cMn)
        if(!window._grupoTimestamps) window._grupoTimestamps=[];
        window._grupoTimestamps.push({cambio:nearCambio,t:Date.now()});
        if(window._grupoTimestamps.length>=3){
          var ts=window._grupoTimestamps;
          var totalTime=ts[ts.length-1].t-ts[0].t;
          var totalCambios=ts[ts.length-1].cambio-ts[0].cambio;
          if(totalCambios>0){
            window._realRhythm=Math.round((totalTime/(totalCambios*60000))*10)/10;
          }
          if(window._grupoTimestamps.length>10) window._grupoTimestamps=window._grupoTimestamps.slice(-5);
        }
        currentGrupoActual=nearCambio;
        var sacaH=daySaca[currentDay]||16;
        var tot=positions.length;
        var grp=((sacaH-1+nearCambio-1)%getHomCount())+1;
        var nombre=nearCambio<=changes.length?changes[nearCambio-1].n||'':'';
        liveGrupoData={cambio:nearCambio,grp:grp,nombre:nombre,tot:tot,desfase:virgenDesfase,movidos:virgenMovidos,sacaMuj:daySacaMuj[currentDay],t:Date.now()};
        try{localStorage.setItem('grupoActual_day'+currentDay,JSON.stringify(liveGrupoData));}catch(e){_logErr("swallow",e);}
        saveAll();
        updateGrupoUI();
        db.ref('grupoActual/day'+currentDay).set(liveGrupoData);
        if(typeof renderLive==='function') renderLive();
        // Sync auto-time offset so it continues from here if GPS drops
        if(window._autoTimeRunning){
          var _stG=getStartTime();
          var mnG=+$('cMn').value||6;
          var dateStrG=dayDates[currentDay]||localDateStr(new Date());
          var startTimeG=new Date(dateStrG+'T'+String(_stG.h).padStart(2,'0')+':'+String(_stG.m).padStart(2,'0')+':00').getTime();
          var shouldBeG=startTimeG+(nearCambio-1)*mnG*60000;
          window._autoTimeOffset=Math.round((shouldBeG-Date.now())/60000);
          if(typeof syncAutoState==='function') syncAutoState();
        }
      }
    }
  });
}
listenAnda('jesus',isSEMode?_asset('se-entierro-marker.png'):_asset('jesus-marker.png'),isSEMode?'#e8e8e8':'#dc2626',10000);
listenAnda('virgen',isSEMode?_asset('se-virgen-marker.png'):_asset('maria-marker.png'),isSEMode?'#e8e8e8':'#3b82f6',9998);

// AHSEC GPS tracking for SE mode
// ========== VIBRATION ALERTS ==========
var vibrateBeforeN=+(localStorage.getItem('vibrateBeforeN')||0);
function setVibrateN(n){
  vibrateBeforeN=n;
  localStorage.setItem('vibrateBeforeN',n);
}
function populateAlertSelects(){
  // Populate vibrate select
  var vSel=document.getElementById('vibrateCfg');
  if(vSel&&vSel.options.length<=1){
    for(var vn=1;vn<=10;vn++){
      var opt=document.createElement('option');opt.value=vn;opt.textContent=vn+' cambio'+(vn>1?'s':'')+' antes';
      vSel.appendChild(opt);
    }
  }
  if(vSel) vSel.value=vibrateBeforeN;
  // Populate watch group select
  var wSel=document.getElementById('watchGrpCfg');
  var maxGrp=(+$('cType').value===27)?getMujCount():getHomCount();
  if(wSel){
    var curVal=+(localStorage.getItem('watchGroup')||0);
    while(wSel.options.length>1) wSel.remove(1);
    for(var wg=1;wg<=maxGrp;wg++){
      var opt2=document.createElement('option');opt2.value=wg;opt2.textContent='Grupo #'+wg;
      wSel.appendChild(opt2);
    }
    wSel.value=curVal;
  }
}
function checkVibrate(cambio){
  if(!window.myCarries||!myCarries.length) return;
  // 1. Carry alert
  if(vibrateBeforeN){
    var effC=cambio;
    for(var i=0;i<myCarries.length;i++){
      if(myCarries[i].num>effC){
        var diff=myCarries[i].num-effC;
        if(diff<=vibrateBeforeN){
          if(navigator.vibrate) navigator.vibrate([300,100,300,100,500]);
          if('Notification' in window){
            if(Notification.permission==='granted'){
              try{new Notification('🔔 ¡Prepárate!',{body:'Tu cargada #'+myCarries[i].ci+' está a '+diff+' cambio'+(diff>1?'s':'')+' · Grupo #'+myCarries[i].grp,icon:_asset(isSEMode?'se-icon-192.png':'icon-192.png'),tag:'cargada-'+myCarries[i].ci,renotify:true});}catch(e){_logErr("swallow",e);}
            } else if(Notification.permission!=='denied'){
              Notification.requestPermission();
            }
          }
        }
        break;
      }
    }
  }
  // 2. Watch group alert
  var watchGrp=+(localStorage.getItem('watchGroup')||0);
  if(watchGrp>0&&changes.length>0){
    var saca=isSEMode?5:(window.daySaca?window.daySaca[window.currentDay]:16);
    var grupoCnt=isSEMode?getHomCount():getHomCount();
    var currentGrp=((saca-1+cambio-1)%grupoCnt)+1;
    // How many cambios until watchGrp appears
    var found=false;
    for(var w=cambio;w<Math.min(cambio+10,changes.length+1);w++){
      var wGrp=((saca-1+w-1)%grupoCnt)+1;
      if(wGrp===watchGrp){
        var wDiff=w-cambio;
        if(wDiff<=10&&wDiff>=0){
          if(navigator.vibrate) navigator.vibrate([200,100,200,100,200,100,400]);
          if('Notification' in window&&Notification.permission==='granted'){
            try{new Notification('👁️ Grupo #'+watchGrp+(wDiff===0?' ¡AHORA!':' en '+wDiff+' cambio'+(wDiff>1?'s':'')),{body:wDiff===0?'El grupo que vigilás está cargando ahora':'Faltan '+wDiff+' cambio'+(wDiff>1?'s':'')+' para el Grupo #'+watchGrp,icon:_asset(isSEMode?'se-icon-192.png':'icon-192.png'),tag:'watch-'+watchGrp,renotify:true});}catch(e){_logErr("swallow",e);}
          }
          found=true;
          break;
        }
      }
    }
  }
}
// Request notification permission on first interaction
document.addEventListener('click',function _reqNot(){
  if('Notification' in window&&Notification.permission==='default') Notification.requestPermission();
  document.removeEventListener('click',_reqNot);
},{once:true});

var _isSE=(typeof window!=='undefined'&&window._forceSE===true)||new URLSearchParams(window.location.search).has('se');
if(_isSE){
  // Fetch a single number from the AHSEC realtime DB. Returns null on
  // any failure (HTTP error, timeout, parse error, missing/zero value).
  async function _fetchAHSECValue(path){
    var ctrl = new AbortController();
    var timer = setTimeout(function(){ ctrl.abort(); }, 5000);
    try{
      var resp = await fetch('https://bd-recorrido-ahsec-default-rtdb.firebaseio.com/'+path+'?_='+Date.now(), {signal: ctrl.signal});
      if(!resp.ok) return null;
      var v = await resp.json();
      return (v===null||v===undefined||v===0) ? null : v;
    } catch(err){
      _logErr('AHSEC '+path, err);
      return null;
    } finally {
      clearTimeout(timer);
    }
  }

  // The AHSEC feed exposes only lat/lng with no timestamp, and the official app
  // leaves the last coordinates in place after the procession ends — a frozen,
  // non-zero coordinate would otherwise read as "en vivo" forever. We infer
  // freshness from movement: if the position hasn't changed in a few minutes the
  // feed is treated as inactive. Persisted so a frozen position is detected as
  // stale on the next app open instead of after a fresh grace window each time.
  var AHSEC_STALE_MS = 5*60*1000;
  var _ahsecMove;
  try{ _ahsecMove = JSON.parse(localStorage.getItem('ahsecMove')) || {}; }catch(e){ _ahsecMove = {}; }
  function _ahsecLive(key, lat, lng){
    var now = Date.now();
    var p = _ahsecMove[key];
    var moved = !p || Math.abs(p.lat-lat)>0.00004 || Math.abs(p.lng-lng)>0.00004; // ~4-5 m
    if(moved){ _ahsecMove[key] = {lat:lat, lng:lng, t:now}; try{ localStorage.setItem('ahsecMove', JSON.stringify(_ahsecMove)); }catch(e){} }
    return (now - _ahsecMove[key].t) < AHSEC_STALE_MS;
  }

  async function fetchAHSECGPS(){
    var statusParts = [];

    // ----- Jesus / Santo Entierro side -----
    try {
      var lat = await _fetchAHSECValue('latitud.json');
      if(lat == null){
        statusParts.push('Jesús ⚠️ sin señal');
      } else {
        var lng = await _fetchAHSECValue('longitud.json');
        if(lng != null){
          var ll = {lat:+lat, lng:+lng};
          var jLive = _ahsecLive('j', +lat, +lng);
          statusParts.push('Jesús '+(jLive?'🟢 en vivo':'⚪ inactivo'));
          if(gmap){
            if(!urnaMarkers.jesus){
              urnaMarkers.jesus=new google.maps.Marker({position:ll,map:gmap,zIndex:10000,icon:{url:_asset('se-entierro-marker.png'),scaledSize:new google.maps.Size(54,66),anchor:new google.maps.Point(27,66)}});
              urnaMarkers.jesus._ring=new google.maps.Circle({center:ll,map:gmap,radius:15,fillColor:'#e8e8e8',fillOpacity:0.25,strokeColor:'#e8e8e8',strokeWeight:5,strokeOpacity:0.9,zIndex:9999});
            } else {
              urnaMarkers.jesus.setPosition(ll);
              if(urnaMarkers.jesus._ring) urnaMarkers.jesus._ring.setCenter(ll);
            }
            // GPS tracking for banner (only when GPS Auto is ON)
            if(autoAdvanceGPS&&positions.length>2){
              jesusGpsReadings.push({lat:ll.lat,lng:ll.lng});
              if(jesusGpsReadings.length>20) jesusGpsReadings.shift();
              var jRecent=jesusGpsReadings.slice(-3);
              var jAvgLat=0,jAvgLng=0;
              for(var jr=0;jr<jRecent.length;jr++){jAvgLat+=jRecent[jr].lat;jAvgLng+=jRecent[jr].lng;}
              jAvgLat/=jRecent.length;jAvgLng/=jRecent.length;
              if(jesusCambioGPS===0){
                var cosLatJI=Math.cos(jAvgLat*Math.PI/180);
                var bestJI=Infinity,bestJCI=0;
                for(var jii=0;jii<positions.length;jii++){
                  var dji=Math.sqrt(Math.pow((jAvgLat-positions[jii].lat)*111320,2)+Math.pow((jAvgLng-positions[jii].lng)*111320*cosLatJI,2));
                  if(dji<bestJI){bestJI=dji;bestJCI=jii+1;}
                }
                if(bestJI<80){
                  jesusCambioGPS=bestJCI;
                  if(!isShared){
                    currentGrupoActual=bestJCI;
                    var sacaH=5;var tot=positions.length;
                    var grp=((sacaH-1+bestJCI-1)%getHomCount())+1;
                    var nombre=bestJCI<=changes.length?changes[bestJCI-1].n||'':'';
                    liveGrupoData={cambio:bestJCI,grp:grp,nombre:nombre,tot:tot,desfase:virgenDesfase,movidos:virgenMovidos,sacaMuj:daySacaMuj[4]||6,t:Date.now()};
                    currentDay=4;
                    db.ref('grupoActual/day4').set(liveGrupoData);
                  }
                  if(typeof renderLive==='function') renderLive();
                }
              } else {
                var nextJIdx=jesusCambioGPS;
                if(nextJIdx<positions.length){
                  var cosLatJ2=Math.cos(jAvgLat*Math.PI/180);
                  var bestJD=Infinity,bestJP=nextJIdx;
                  for(var jk=nextJIdx;jk<Math.min(positions.length,nextJIdx+3);jk++){
                    var djk=Math.sqrt(Math.pow((jAvgLat-positions[jk].lat)*111320,2)+Math.pow((jAvgLng-positions[jk].lng)*111320*cosLatJ2,2));
                    if(djk<bestJD){bestJD=djk;bestJP=jk;}
                  }
                  if(bestJD<=50&&bestJP>=nextJIdx){
                    jesusAheadCount++;
                    if(jesusAheadCount>=2){
                      jesusCambioGPS=bestJP+1;
                      jesusAheadCount=0;
                      jesusGpsReadings=[];
                      if(!isShared){
                        currentGrupoActual=bestJP+1;
                        var sacaH2=5;var tot2=positions.length;
                        var grp2=((sacaH2-1+jesusCambioGPS-1)%getHomCount())+1;
                        var nombre2=jesusCambioGPS<=changes.length?changes[jesusCambioGPS-1].n||'':'';
                        liveGrupoData={cambio:jesusCambioGPS,grp:grp2,nombre:nombre2,tot:tot2,desfase:virgenDesfase,movidos:virgenMovidos,sacaMuj:daySacaMuj[4]||6,t:Date.now()};
                        currentDay=4;
                        db.ref('grupoActual/day4').set(liveGrupoData);
                        updateGrupoUI();
                      }
                      if(typeof renderLive==='function') renderLive();
                    }
                  } else { jesusAheadCount=0; }
                }
              }
            }
          }
        }
      }
    } catch(err){ _logErr('jesus AHSEC', err); }

    // ----- Virgen side -----
    try {
      var latV = await _fetchAHSECValue('latitud_V.json');
      if(latV != null){
        var lngV = await _fetchAHSECValue('longitud_V.json');
        if(lngV != null){
          var llV = {lat:+latV, lng:+lngV};
          var vLive = _ahsecLive('v', +latV, +lngV);
          statusParts.push('Virgen '+(vLive?'🟢 en vivo':'⚪ inactivo'));
          if(gmap){
            if(!urnaMarkers.virgen){
              urnaMarkers.virgen=new google.maps.Marker({position:llV,map:gmap,zIndex:9998,icon:{url:_asset('se-virgen-marker.png'),scaledSize:new google.maps.Size(54,66),anchor:new google.maps.Point(27,66)}});
              urnaMarkers.virgen._ring=new google.maps.Circle({center:llV,map:gmap,radius:15,fillColor:'#3b82f6',fillOpacity:0.25,strokeColor:'#3b82f6',strokeWeight:5,strokeOpacity:0.9,zIndex:9997});
            } else {
              urnaMarkers.virgen.setPosition(llV);
              if(urnaMarkers.virgen._ring) urnaMarkers.virgen._ring.setCenter(llV);
            }
          }
          if(positions.length>2){
            virgenGpsReadings.push({lat:llV.lat,lng:llV.lng});
            if(virgenGpsReadings.length>20) virgenGpsReadings.shift();
            var vRecent2=virgenGpsReadings.slice(-3);
            var vAvgLat2=0,vAvgLng2=0;
            for(var vr2=0;vr2<vRecent2.length;vr2++){vAvgLat2+=vRecent2[vr2].lat;vAvgLng2+=vRecent2[vr2].lng;}
            vAvgLat2/=vRecent2.length;vAvgLng2/=vRecent2.length;
            if(virgenCambioGPS===0){
              var cosLatVI2=Math.cos(vAvgLat2*Math.PI/180);
              var bestVI2=Infinity,bestVCI2=0;
              for(var vii2=0;vii2<positions.length;vii2++){
                var dvi2=Math.sqrt(Math.pow((vAvgLat2-positions[vii2].lat)*111320,2)+Math.pow((vAvgLng2-positions[vii2].lng)*111320*cosLatVI2,2));
                if(dvi2<bestVI2){bestVI2=dvi2;bestVCI2=vii2+1;}
              }
              if(bestVI2<80){
                virgenCambioGPS=bestVCI2;
                if(typeof renderLive==='function') renderLive();
              }
            } else {
              var nextVI2=virgenCambioGPS;
              if(nextVI2<positions.length){
                var cosLatV3=Math.cos(vAvgLat2*Math.PI/180);
                var bestVD3=Infinity,bestVP3=nextVI2;
                for(var vk3=nextVI2;vk3<Math.min(positions.length,nextVI2+3);vk3++){
                  var dvk3=Math.sqrt(Math.pow((vAvgLat2-positions[vk3].lat)*111320,2)+Math.pow((vAvgLng2-positions[vk3].lng)*111320*cosLatV3,2));
                  if(dvk3<bestVD3){bestVD3=dvk3;bestVP3=vk3;}
                }
                if(bestVD3<=50&&bestVP3>=nextVI2){
                  virgenAheadCount++;
                  if(virgenAheadCount>=2){
                    virgenCambioGPS=bestVP3+1;
                    virgenAheadCount=0;
                    virgenGpsReadings=[];
                    if(typeof renderLive==='function') renderLive();
                  }
                } else { virgenAheadCount=0; }
              }
            }
          }
        }
      }
    } catch(err){ _logErr('virgen AHSEC', err); }

    var el = document.getElementById('ahsecStatus');
    if(el){
      var live = statusParts.some(function(s){return s.indexOf('🟢')>-1;});
      el.textContent = '📡 GPS oficial — ' + (statusParts.length?statusParts.join(' · '):'sin señal');
      el.classList.toggle('ahsec-live', live);
      if(typeof syncHeaderPad==='function') syncHeaderPad();
    }
  }
  fetchAHSECGPS();
  setInterval(fetchAHSECGPS,10000);
}

// ========== ONLINE COUNTER ==========
// Register presence with heartbeat
const myPresRef=db.ref('online/'+Math.random().toString(36).substr(2,9));
db.ref('.info/connected').on('value',function(snap){
  if(snap.val()===true){
    myPresRef.set(Date.now());
    myPresRef.onDisconnect().remove();
  }
});
// Heartbeat: update timestamp every 30 seconds
setInterval(function(){myPresRef.set(Date.now());},30000);
// Clean stale entries (older than 2 minutes)
function cleanStaleOnline(){
  db.ref('online').once('value',function(snap){
    var d=snap.val();
    if(!d) return;
    var now=Date.now();
    Object.keys(d).forEach(function(k){
      if(now-d[k]>60000){
        try{db.ref('online/'+k).remove();}catch(e){_logErr("swallow",e);}
      }
    });
  });
}
cleanStaleOnline();
setInterval(cleanStaleOnline,30000);
// Listen for count
function showAdminTools(){
  if(!isShared){
    document.getElementById('broadcastInput').style.display='block';
    document.getElementById('onlineCounter').style.display='block';
    db.ref('online').on('value',function(snap){
      var d=snap.val();
      if(!d){document.getElementById('onlineCounter').textContent='👥 0 conectados';return;}
      var now=Date.now();
      var count=Object.keys(d).filter(function(k){return now-d[k]<60000;}).length;
      document.getElementById('onlineCounter').textContent='👥 '+count+' conectado'+(count!==1?'s':'')+' ahora';
    });
  }
}

// ========== LIVE BROADCAST ==========
function sendBroadcast(){
  const msg=document.getElementById('broadcastMsg').value.trim();
  if(!msg) return;
  db.ref('broadcast').set({text:msg,t:Date.now()});
  document.getElementById('broadcastMsg').value='';
}
function clearBroadcast(){
  db.ref('broadcast').remove();
}

// ========== GRUPO ACTUAL (admin marks current group) ==========
let currentGrupoActual=0;
var liveGrupoData=null;
var virgenDesfase=5;
var virgenMovidos=0;
var virgenMn=0; // 0 = same as Jesus, >0 = independent rhythm

function changeVirgenMn(delta){
  var current=virgenMn||+$('cMn').value||6;
  virgenMn=Math.max(1,Math.min(20,current+delta));
  if(liveGrupoData){liveGrupoData.virgenMn=virgenMn;}
  if(liveGrupoData&&liveGrupoData.cambio>0){
    try{localStorage.setItem('grupoActual_day'+currentDay,JSON.stringify(liveGrupoData));}catch(e){_logErr("swallow",e);}
    saveAll();
    db.ref('grupoActual/day'+currentDay).set(liveGrupoData);
  }
  if(typeof renderLive==='function') renderLive();
}
var daySacaMuj=[19,27,13,22,6]; // saca de mujeres por día

function loadGrupoFromStorage(){
  try{
    var savedGrupo=localStorage.getItem('grupoActual_day'+currentDay);
    if(savedGrupo){
      var sg=JSON.parse(savedGrupo);
      if(sg&&sg.cambio){currentGrupoActual=sg.cambio;liveGrupoData=sg;}
      if(sg&&sg.desfase!==undefined) virgenDesfase=sg.desfase;
      if(sg&&sg.movidos!==undefined) virgenMovidos=sg.movidos;
      if(sg&&sg.virgenMn) virgenMn=sg.virgenMn;
    }
  }catch(e){_logErr("swallow",e);}
}

var cronoInterval=null;

function updateCrono(){
  var el=document.getElementById('grupoCrono');
  var upEl=document.getElementById('grupoLastUpdate');
  if(!el) return;
  if(!liveGrupoData||!liveGrupoData.t||liveGrupoData.cambio===0){
    el.textContent='⏱ 0:00';
    if(upEl) upEl.textContent='';
    return;
  }
  var elapsed=Math.floor((Date.now()-liveGrupoData.t)/1000);
  var min=Math.floor(elapsed/60);
  var sec=elapsed%60;
  el.textContent='⏱ '+min+':'+(sec<10?'0':'')+sec;
  if(upEl){
    var d=new Date(liveGrupoData.t);
    var h=d.getHours(),m=d.getMinutes();
    var h12=((h-1)%12)+1;if(h12<=0)h12+=12;
    var ampm=h>=12&&h<24?'PM':'AM';
    upEl.textContent='Última actualización: '+h12+':'+(m<10?'0':'')+m+' '+ampm;
  }
}

function startCrono(){
  if(cronoInterval) clearInterval(cronoInterval);
  cronoInterval=setInterval(updateCrono,1000);
}
startCrono();

function advanceGrupo(delta){
  if(changes.length===0&&positions.length>0) calc();
  var tot=changes.length;
  if(tot===0) tot=positions.length;
  if(tot===0) return;
  var maxCambio=tot+virgenDesfase;
  currentGrupoActual=Math.max(0,Math.min(maxCambio,currentGrupoActual+delta));
  var sacaH=daySaca[currentDay]||17;
  var grp=0,nombre='';
  if(currentGrupoActual>0&&currentGrupoActual<=changes.length){
    grp=((sacaH-1+currentGrupoActual-1)%getHomCount())+1;
    nombre=(currentGrupoActual<=changes.length&&changes[currentGrupoActual-1])?changes[currentGrupoActual-1].n||'':'';
  } else if(currentGrupoActual>0){
    grp=((sacaH-1+Math.min(currentGrupoActual,tot)-1)%getHomCount())+1;
  }
  liveGrupoData={cambio:currentGrupoActual,grp:grp,nombre:nombre,tot:tot,desfase:virgenDesfase,movidos:virgenMovidos,sacaMuj:daySacaMuj[currentDay],t:Date.now()};
  try{localStorage.setItem('grupoActual_day'+currentDay,JSON.stringify(liveGrupoData));}catch(e){_logErr("swallow",e);}
  saveAll();
  updateGrupoUI();
  db.ref('grupoActual/day'+currentDay).set(liveGrupoData);
  if(typeof renderLive==='function') renderLive();
  if(typeof syncConfig==='function') syncConfig();
  // Recalculate auto-time offset so auto follows from this position
  if(window._autoTimeRunning&&currentGrupoActual>0){
    var _stA=getStartTime();var h2=_stA.h;
    var mn2=+$('cMn').value||6;
    var dateStr2=dayDates[currentDay]||new Date().toISOString().slice(0,10);
    var startTime2=new Date(dateStr2+'T'+String(_stA.h).padStart(2,'0')+':'+String(_stA.m).padStart(2,'0')+':00').getTime();
    // What time SHOULD it be for this cambio?
    var shouldBeTime=startTime2+(currentGrupoActual-1)*mn2*60000;
    // Offset = difference between "should be" and actual now
    window._autoTimeOffset=Math.round((shouldBeTime-Date.now())/60000);
    if(typeof syncAutoState==='function') syncAutoState();
  }
}

async function setGrupoManual(){
  var tot=changes.length;
  if(tot===0) tot=positions.length;
  var input=await customPrompt('En que cambio van? (1 al '+tot+')');
  if(!input) return;
  var num=parseInt(input);
  if(isNaN(num)||num<0||num>tot){alert('Numero invalido');return;}
  currentGrupoActual=num;
  var sacaH=daySaca[currentDay]||17;
  var grp=0,nombre='';
  if(num>0&&num<=changes.length){grp=((sacaH-1+num-1)%getHomCount())+1;nombre=changes[num-1].n||'';}
  liveGrupoData={cambio:num,grp:grp,nombre:nombre,tot:tot,desfase:virgenDesfase,movidos:virgenMovidos,sacaMuj:daySacaMuj[currentDay],t:Date.now()};
  try{localStorage.setItem('grupoActual_day'+currentDay,JSON.stringify(liveGrupoData));}catch(e){_logErr("swallow",e);}
  saveAll();
  updateGrupoUI();
  db.ref('grupoActual/day'+currentDay).set(liveGrupoData);
  if(typeof renderLive==='function') renderLive();
  if(window._autoTimeRunning&&num>0){
    var _stB=getStartTime();var h3=_stB.h;
    var mn3=+$('cMn').value||6;
    var dateStr3=dayDates[currentDay]||localDateStr(new Date());
    var startTime3=new Date(dateStr3+'T'+String(_stB.h).padStart(2,'0')+':'+String(_stB.m).padStart(2,'0')+':00').getTime();
    var shouldBeTime3=startTime3+(num-1)*mn3*60000;
    window._autoTimeOffset=Math.round((shouldBeTime3-Date.now())/60000);
    if(typeof syncAutoState==='function') syncAutoState();
  }
}

function changeDesfase(delta){
  virgenDesfase=Math.max(1,Math.min(30,virgenDesfase+delta));
  if(liveGrupoData){liveGrupoData.desfase=virgenDesfase;}
  var el=document.getElementById('desfaseNum');
  if(el) el.textContent=virgenDesfase;
  if(liveGrupoData&&liveGrupoData.cambio>0){
    try{localStorage.setItem('grupoActual_day'+currentDay,JSON.stringify(liveGrupoData));}catch(e){_logErr("swallow",e);}
    saveAll();
    db.ref('grupoActual/day'+currentDay).set(liveGrupoData);
  }
  updateGrupoUI();
  if(typeof renderLive==='function') renderLive();
}

function changeMovidos(delta){
  virgenMovidos=virgenMovidos+delta;
  if(liveGrupoData){liveGrupoData.movidos=virgenMovidos;}
  var el=document.getElementById('movidosNum');
  if(el) el.textContent=(virgenMovidos>0?'+':'')+virgenMovidos;
  if(liveGrupoData&&liveGrupoData.cambio>0){
    try{localStorage.setItem('grupoActual_day'+currentDay,JSON.stringify(liveGrupoData));}catch(e){_logErr("swallow",e);}
    saveAll();
    db.ref('grupoActual/day'+currentDay).set(liveGrupoData);
  }
  updateGrupoUI();
  setTimeout(function(){if(typeof renderLive==='function') renderLive();},100);
}

function updateGrupoUI(){
  if(!changes||changes.length===0) return;
  var tot=changes.length;
  // Update popup controls if open
  if($('cfgP')&&$('cfgP').style.display==='block'){
    updateAdminLiveControls();
  }
  updateCrono();
  updateBanners();
}
// ========== SINGLE BANNER WRITER ==========
function updateBanners(){
  var container=document.getElementById('bannersContainer');
  if(!container) return;
  var cambio=(liveGrupoData&&liveGrupoData.cambio)?liveGrupoData.cambio:0;
  var tot=positions.length||changes.length||147;
  var isMuj=(+$('cType').value===27);
  var isPast=isDayPast(currentDay);
  // A past day is complete by definition. Pin the banner to the final cambio
  // so it doesn't flicker between the stale remote value (Firebase listener)
  // and the computed total (past-day render fallback).
  if(isPast && tot>0) cambio=tot;
  var procDone=(cambio>=tot&&tot>0)||isPast;
  
  // Create banner HTML if not exists or mode changed
  var existingBanner=document.getElementById('grupoActualBanner');
  if(existingBanner&&window._bannerSEMode!==isSEMode){
    container.innerHTML='';existingBanner=null;
  }
  if(!existingBanner){
    window._bannerSEMode=isSEMode;
    var jLabel1=isSEMode?'Santo Entierro':'Jesús Nazareno';
    var vLabel=isSEMode?'Virgen Dolorosa':'María Santísima';
    var jImg=isSEMode?_asset('se-entierro.jpg'):_asset('jesus.jpg');
    var vImg=isSEMode?_asset('se-virgen.jpg'):_asset('maria.jpg');
    // Main banner = user's type (full with image)
    // Secondary = other type (slim line)
    var mainLabel=isMuj?vLabel:jLabel1;
    var mainImg=isMuj?vImg:jImg;
    var mainColor=isMuj?'59,130,246':'192,132,252';
    var mainTextColor=isMuj?'#93c5fd':'#c084fc';
    var mainId=isMuj?'Virgen':'Actual';
    var secId=isMuj?'Actual':'Virgen';
    var secLabel=isMuj?jLabel1:vLabel;
    var secIcon=isMuj?'\u271d\ufe0f':'\ud83d\udc51';
    var secColor=isMuj?'#c084fc':'#93c5fd';
    var mainHtml='<div id="grupo'+mainId+'Banner" onclick="buscarAnda(\''+(isMuj?'virgen':'jesus')+'\')" style="cursor:pointer;display:flex;align-items:stretch;border-radius:10px;overflow:hidden;background:rgba('+mainColor+',.12);border:1px solid rgba('+mainColor+',.3);margin-bottom:4px">'
      +'<img src="'+mainImg+'" style="width:54px;object-fit:cover;flex-shrink:0" onerror="this.style.display=\'none\'">'
      +'<div style="flex:1;min-width:0;padding:5px 10px;display:flex;flex-direction:column;justify-content:center;gap:1px">'
      +'<div style="display:flex;align-items:center;gap:6px"><span style="font-size:11px;color:#aaa;flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">'+mainLabel+'</span><span id="grupo'+mainId+'State" class="gb-pill"></span></div>'
      +'<div id="grupo'+mainId+'Text" style="font-size:23px;font-weight:800;color:'+mainTextColor+';line-height:1.05"></div>'
      +'<div style="display:flex;align-items:center;gap:6px"><span id="grupo'+mainId+'Progress" style="font-size:11px;color:#bbb;flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis"></span><span class="gb-maphint">Ver mapa &rsaquo;</span></div>'
      +'</div></div>';
    var secHtml='<div id="grupo'+secId+'Banner" onclick="buscarAnda(\''+(isMuj?'jesus':'virgen')+'\')" style="cursor:pointer;display:flex;align-items:center;gap:8px;padding:6px 10px;border-radius:8px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1)">'
      +'<span style="font-size:12px;color:'+secColor+';white-space:nowrap;flex-shrink:0">'+secIcon+' '+secLabel+'</span>'
      +'<span id="grupo'+secId+'Text" style="font-size:16px;font-weight:800;color:'+secColor+';white-space:nowrap;flex-shrink:0"></span>'
      +'<span id="grupo'+secId+'Progress" style="font-size:10px;color:#777;flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis"></span>'
      +'<span id="grupo'+secId+'State" class="gb-pill" style="margin-left:auto"></span>'
      +'</div>';
    container.innerHTML=mainHtml+secHtml;
  }
  
  // Pill + next-change helpers
  function _setPill(el,txt,kind){ if(!el)return; el.textContent=txt||''; el.className='gb-pill '+(kind||''); }
  function _nextChange(n){ var nx=(changes&&changes[n])?changes[n]:null; return nx?('Próximo cambio ~'+nx.time):''; }
  function _animNum(el,val){ if(!el||el.textContent===val)return; el.textContent=val; el.classList.remove('gb-num-flip'); void el.offsetWidth; el.classList.add('gb-num-flip'); }
  // "Asentó" tint: green for Jesús, muted gold for the Santo Entierro mourning theme
  var _doneBg=isSEMode?'rgba(180,153,99,.14)':'rgba(124,58,237,.2)';
  var _doneBorder=isSEMode?'rgba(180,153,99,.45)':'rgba(124,58,237,.5)';

  // Jesus/SE banner
  var jEl=document.getElementById('grupoActualText');
  var jProg=document.getElementById('grupoActualProgress');
  var jState=document.getElementById('grupoActualState');
  var jBanner=document.getElementById('grupoActualBanner');
  if(jEl){
    var sacaJ=daySaca[currentDay]||16;
    if(procDone){
      var lastJ=((sacaJ-1+Math.min(cambio,tot)-1)%getHomCount()+1);
      _animNum(jEl,'Grupo #'+lastJ);
      if(jProg) jProg.textContent=(currentDay>=3)?((isSEMode)?'Hasta el próximo año, Santo Entierro de Cristo':'Hasta el próximo año, Jesús Nazareno'):'Procesión completada';
      _setPill(jState,'ASENTÓ','done');
      if(jBanner){jBanner.style.background=_doneBg;jBanner.style.borderColor=_doneBorder;}
    } else if(cambio>0){
      _animNum(jEl,'Grupo #'+((sacaJ-1+cambio-1)%getHomCount()+1));
      var streetJ=(liveGrupoData&&liveGrupoData.nombre||'').replace(/^Grupo\s*\d+\s*/i,'');
      var nxJ=_nextChange(cambio);
      if(jProg) jProg.textContent=[streetJ?('📍 '+streetJ):'',nxJ].filter(Boolean).join(' · ')||'En recorrido';
      _setPill(jState,'EN VIVO','live');
      if(jBanner){jBanner.style.background='rgba(192,132,252,.12)';jBanner.style.borderColor='rgba(192,132,252,.3)';}
    } else {
      _animNum(jEl,'Grupo #'+sacaJ);
      var depJ=(changes&&changes[0])?changes[0].time:'';
      if(jProg) jProg.textContent=depJ?('Sale ~'+depJ):'Esperando inicio';
      _setPill(jState,'POR SALIR','soon');
      if(jBanner){jBanner.style.background='rgba(192,132,252,.12)';jBanner.style.borderColor='rgba(192,132,252,.3)';}
    }
  }
  // Virgen banner
  var vEl=document.getElementById('grupoVirgenText');
  var vProg2=document.getElementById('grupoVirgenProgress');
  var vState=document.getElementById('grupoVirgenState');
  var vBanner=document.getElementById('grupoVirgenBanner');
  if(vEl){
    if(procDone){
      var sacaM2=liveGrupoData?liveGrupoData.sacaMuj||daySacaMuj[currentDay]:daySacaMuj[currentDay]||22;
      var mov2=liveGrupoData?liveGrupoData.movidos||0:0;
      var lastM2=(((sacaM2-1+Math.min(cambio,tot)-1-mov2)%getMujCount())+getMujCount())%getMujCount()+1;
      _animNum(vEl,'Grupo #'+lastM2);
      if(vProg2) vProg2.textContent=(currentDay>=3)?'Hasta el próximo año':'Procesión completada';
      _setPill(vState,'ASENTÓ','done');
      if(vBanner){vBanner.style.background=_doneBg;vBanner.style.borderColor=_doneBorder;}
    } else if(cambio>0&&liveGrupoData){
      var desf=liveGrupoData.desfase||0;
      var sacaM=liveGrupoData.sacaMuj||daySacaMuj[currentDay]||6;
      var mov=liveGrupoData.movidos||0;
      var vCambio=Math.max(1,cambio-desf);
      var vCambioGrp=Math.max(1,vCambio-mov);
      if(vCambio>=tot){
        var lastM=(((sacaM-1+tot-1-mov)%getMujCount())+getMujCount())%getMujCount()+1;
        _animNum(vEl,'Grupo #'+lastM);
        if(vProg2) vProg2.textContent=(currentDay>=3)?'Hasta el próximo año':'Procesión completada';
        _setPill(vState,'ASENTÓ','done');
        if(vBanner){vBanner.style.background=_doneBg;vBanner.style.borderColor=_doneBorder;}
      } else {
        var grpM=(((sacaM-1+vCambioGrp-1)%getMujCount())+getMujCount())%getMujCount()+1;
        _animNum(vEl,'Grupo #'+grpM);
        if(vProg2) vProg2.textContent='Posición estimada';
        _setPill(vState,'EST.','est');
        if(vBanner){vBanner.style.background='rgba(59,130,246,.08)';vBanner.style.borderColor='rgba(59,130,246,.3)';}
      }
    } else {
      _animNum(vEl,'Grupo #'+(daySacaMuj[currentDay]||22));
      if(vProg2) vProg2.textContent='Esperando inicio';
      _setPill(vState,'POR SALIR','soon');
      if(vBanner){vBanner.style.background='rgba(59,130,246,.08)';vBanner.style.borderColor='rgba(59,130,246,.3)';}
    }
  }
  var jLabel1El=document.getElementById('grupoActualLabel1');
  if(jLabel1El) jLabel1El.textContent=isSEMode?'Santo Entierro de Cristo':'Venerada Imagen de Jesús Nazareno';
  var vLabel1El=document.getElementById('grupoVirgenLabel1');
  if(vLabel1El) vLabel1El.textContent=isSEMode?'Virgen Dolorosa':'María Santísima';
}
// ========== STREET VIEW ==========
var streetViewPano=null;
function openStreetView(lat,lng){
  var sv=document.getElementById('streetView');
  var mapEl=document.getElementById('map');
  var btn=document.getElementById('bStreet');
  if(!sv||!mapEl) return;
  mapEl.style.display='none';
  sv.style.display='block';
  btn.style.display='block';
  if(!streetViewPano){
    streetViewPano=new google.maps.StreetViewPanorama(sv,{
      position:{lat:lat,lng:lng},
      pov:{heading:0,pitch:0},
      zoom:1,
      addressControl:false,
      fullscreenControl:true,
      motionTracking:false,
      motionTrackingControl:false
    });
  } else {
    streetViewPano.setPosition({lat:lat,lng:lng});
  }
  infoWin.close();
}
function closeStreetView(){
  var sv=document.getElementById('streetView');
  var mapEl=document.getElementById('map');
  var btn=document.getElementById('bStreet');
  if(sv) sv.style.display='none';
  if(mapEl) mapEl.style.display='block';
  if(btn) btn.style.display='none';
}

// ========== CONFIG SYNC ==========
function syncConfig(){
  if(isShared) return;
  var st=getStartTime();
  var cfgData={
    s:+document.getElementById('cS').value,
    h:st.h,
    hm:st.m,
    mn:+document.getElementById('cMn').value,
    date:dayDates[currentDay]||'',
    autoOffset:window._autoTimeOffset||0,
    mapLock:mapLocked[currentDay]?mapSavedView[currentDay]:null,
    t:Date.now()
  };
  if(currentDay===3){
    cfgData.cortH=VIER_CORTESIAS_CHANGE;
    cfgData.cortM=VIER_CORTESIAS_CHANGE_M;
    cfgData.cortMin=VIER_CORTESIAS_MIN;
  }
  db.ref('config/day'+currentDay).set(cfgData);
  db.ref('config/dates').set(dayDates);
}

// ========== MAP POSITIONS SYNC ==========
var syncTimer=null;
function syncPositions(){
  if(isShared) return;
  clearTimeout(syncTimer);
  syncTimer=setTimeout(function(){
    var pts=positions.map(function(p){return{lat:p.lat,lng:p.lng,n:p.n||''};});
    db.ref('positions/day'+currentDay).set(pts);
  },500);
}

// ========== START ALL DAY-DEPENDENT LISTENERS (called after initMap) ==========
var activeDayRefs=[];
function stopDayListeners(){
  activeDayRefs.forEach(function(r){r.off();});
  activeDayRefs=[];
}

function startDayListeners(){
  stopDayListeners();
  if(typeof loadGrupoFromStorage==='function') loadGrupoFromStorage();
  if(typeof loadAutoState==='function') loadAutoState();
  // Grupo actual
  var gaRef=db.ref('grupoActual/day'+currentDay);
  activeDayRefs.push(gaRef);
  gaRef.on('value',function(snap){
    var d=snap.val();
    if(!d) return;
    // Reject snapshots older than what we already have (race-condition guard)
    if(liveGrupoData && d.t && liveGrupoData.t && d.t < liveGrupoData.t) return;
    // Check for stale auto-completed data: if today and cambio>=tot, reset
    var nowDateGA=localDateStr(new Date());
    if(dayDates[currentDay]===nowDateGA&&d.cambio>0){
      var totGA=positions.length||changes.length||44;
      if(d.cambio>=totGA&&!isShared){
        var resetD={cambio:0,grp:0,nombre:'',tot:totGA,desfase:d.desfase||0,movidos:d.movidos||0,sacaMuj:d.sacaMuj||daySacaMuj[currentDay],t:Date.now()};
        db.ref('grupoActual/day'+currentDay).set(resetD);
        currentGrupoActual=0;
        liveGrupoData=resetD;
        if(typeof renderLive==='function') renderLive();
        updateBanners();
        return;
      }
    }
    currentGrupoActual=d.cambio||0;
    liveGrupoData=d;
    if(d.desfase!==undefined) virgenDesfase=d.desfase;
    if(d.movidos!==undefined) virgenMovidos=d.movidos;
    if(d.virgenMn) virgenMn=d.virgenMn;
    if(d.sacaMuj) daySacaMuj[currentDay]=d.sacaMuj;
    try{localStorage.setItem('grupoActual_day'+currentDay,JSON.stringify(d));}catch(e){_logErr("swallow",e);}
    try{updateGrupoUI();}catch(e8){_logErr('updateGrupoUI',e8);}
    try{if(typeof renderLive==='function') renderLive();}catch(e9){_logErr('renderLive',e9);}
    if(d.cambio!==window._lastSyncCambio){
      window._lastSyncCambio=d.cambio;
      try{checkVibrate(d.cambio);}catch(e10){_logErr('checkVibrate',e10);}
    }
  });
  // The Firebase websocket listener registered above is the single source
  // of truth for grupoActual updates. The previous backup XHR poll was
  // redundant — it duplicated the same data fetch over HTTP every 10s and
  // surfaced false-alarm Timeout banners on flaky mobile networks even
  // when realtime sync was working fine. Dropped on purpose; if the
  // websocket really did silently drop in production we'd add a smarter
  // health check instead.
  // Config sync
  if(!isShared){
    ['cS','cHour','cMin','cMn'].forEach(function(id){
      var el=document.getElementById(id);
      if(el) el.addEventListener('change',function(){setTimeout(syncConfig,100);});
    });
  }
  // Config sync - ALL users listen (not just shared)
  var cfgRef=db.ref('config/day'+currentDay);
  activeDayRefs.push(cfgRef);
  cfgRef.on('value',function(snap){
    var d=snap.val();
    if(!d) return;
    var changed=false;
    if(d.s&&+document.getElementById('cS').value!==d.s){document.getElementById('cS').value=d.s;daySaca[currentDay]=d.s;changed=true;}
    if(d.h!==undefined){var curSt=getStartTime();if(curSt.h!==d.h||curSt.m!==(d.hm||0)){setStartTimeUI(d.h,d.hm||0);changed=true;}}
    if(d.mn&&+document.getElementById('cMn').value!==d.mn){document.getElementById('cMn').value=d.mn;changed=true;}
    if(d.date&&dayDates[currentDay]!==d.date){dayDates[currentDay]=d.date;if($('cDate'))$('cDate').value=d.date;detectToday();changed=true;}
    if(d.autoOffset!==undefined) window._autoTimeOffset=d.autoOffset;
    if(d.mapLock){
      mapLocked[currentDay]=true;
      mapSavedView[currentDay]=d.mapLock;
      restoreMapView();
    } else if(d.mapLock===null&&mapLocked[currentDay]){
      mapLocked[currentDay]=false;
      mapSavedView[currentDay]=null;
      restoreMapView();
    }
    if(d.cortH) VIER_CORTESIAS_CHANGE=d.cortH;
    if(d.cortM) VIER_CORTESIAS_CHANGE_M=d.cortM;
    if(d.cortMin) VIER_CORTESIAS_MIN=d.cortMin;
    if(changed) calc();
  });
  // Listen for dates sync
  var datesRef=db.ref('config/dates');
  activeDayRefs.push(datesRef);
  datesRef.on('value',function(snap){
    var d=snap.val();
    if(!d||!Array.isArray(d)) return;
    var changed2=false;
    for(var di=0;di<d.length;di++){
      if(d[di]&&dayDates[di]!==d[di]){dayDates[di]=d[di];changed2=true;}
    }
    if(changed2){
      var newToday=detectToday();
      if($('cDate'))$('cDate').value=dayDates[currentDay];
      // Shared users: auto-switch to today's day
      if(isShared&&newToday>=0&&newToday!==currentDay){
        switchDay(newToday);
      }
    }
  });
  // Positions sync - ALL users listen
  var posRef=db.ref('positions/day'+currentDay);
  activeDayRefs.push(posRef);
  posRef.on('value',function(snap){
    var d=snap.val();
    if(!d||!d.length) return;
    var newPos=d.filter(function(p){return p&&p.lat&&p.lng;}).map(function(p){return{lat:p.lat,lng:p.lng,n:p.n||''};});
    // Only update if different
    if(JSON.stringify(newPos)!==JSON.stringify(positions)){
      var wasEmpty=positions.length<2;
      positions=newPos;
      drawRouteLine();
      calc();
      if(wasEmpty&&positions.length>=2) fitBounds();
    }
  });
  // Women's positions sync
  var posRefW=db.ref('positions_w/day'+currentDay);
  activeDayRefs.push(posRefW);
  posRefW.on('value',function(snap){
    var d=snap.val();
    if(!d||!d.length){positionsW=[];return;}
    var newPosW=d.filter(function(p){return p&&p.lat&&p.lng;}).map(function(p){return{lat:p.lat,lng:p.lng,n:p.n||''};});
    if(JSON.stringify(newPosW)!==JSON.stringify(positionsW)){
      positionsW=newPosW;
      drawRouteLine();
    }
  });
}


// ========== Block 3: auto-advance time ==========
// Sync: fetch Firebase and UPDATE UI every 10 seconds
// ========== AUTO-AVANCE POR TIEMPO ==========
window._autoTimeRunning=false;
window._autoTimeTimer=null;
window._autoTimeOffset=0;
window._lastRealGPS=0;
var GPS_TIMEOUT=120000; // 2 min — GPS can drop briefly between buildings

function startAutoIfNeeded(){
  if(isShared) return;
  if(window._autoTimeRunning) return;
  // Consider past midnight: before 5 AM = still previous day
  var now=new Date();
  var checkDate=new Date(now);
  if(now.getHours()<5) checkDate.setDate(checkDate.getDate()-1);
  var todayStr=localDateStr(checkDate);
  if(dayDates[currentDay]!==todayStr) return;
  // Don't start if procession already finished (past 3:30 AM next day)
  if(isDayPast(currentDay)) return;
  var _stA=getStartTime();
  var startMs=new Date(dayDates[currentDay]+'T'+String(_stA.h).padStart(2,'0')+':'+String(_stA.m).padStart(2,'0')+':00').getTime();
  var diff=now.getTime()-startMs;
  if(diff>-1800000){
    toggleAutoTime();
  }
}

function toggleAutoTime(){
  window._autoTimeRunning=!window._autoTimeRunning;
  window._autoRemote=false;
  if(window._autoTimeRunning){
    if(currentGrupoActual>0){
      var _stI=getStartTime();
      var mnI=+$('cMn').value||6;
      var dateStrI=dayDates[currentDay]||localDateStr(new Date());
      var startTimeI=new Date(dateStrI+'T'+String(_stI.h).padStart(2,'0')+':'+String(_stI.m).padStart(2,'0')+':00').getTime();
      var shouldBeI=startTimeI+(currentGrupoActual-1)*mnI*60000;
      window._autoTimeOffset=Math.round((shouldBeI-Date.now())/60000);
    }
    autoTimeStep();
    window._autoTimeTimer=setInterval(autoTimeStep,3000);
    startHeartbeat();
  } else {
    if(window._autoTimeTimer) clearInterval(window._autoTimeTimer);
    window._autoTimeTimer=null;
    stopHeartbeat();
  }
  syncAutoState();
  if(typeof renderLive==='function') renderLive();
}

function syncAutoState(){
  if(isShared) return;
  db.ref('config/auto/day'+currentDay).set({
    running:window._autoTimeRunning,
    offset:window._autoTimeOffset,
    owner:window._autoTimeRunning?window._deviceId:'',
    heartbeat:Date.now(),
    t:Date.now()
  });
}

// Unique device ID
window._deviceId=localStorage.getItem('deviceId');
if(!window._deviceId){window._deviceId='d'+Date.now().toString(36)+Math.random().toString(36).slice(2,6);localStorage.setItem('deviceId',window._deviceId);}

// Heartbeat: owner pings every 30s
var _heartbeatTimer=null;
function startHeartbeat(){
  if(_heartbeatTimer) return;
  _heartbeatTimer=setInterval(function(){
    if(window._autoTimeRunning&&!window._autoRemote&&!isShared){
      db.ref('config/auto/day'+currentDay+'/heartbeat').set(Date.now());
    }
  },15000);
}
function stopHeartbeat(){
  if(_heartbeatTimer){clearInterval(_heartbeatTimer);_heartbeatTimer=null;}
}

function loadAutoState(){
  db.ref('config/auto/day'+currentDay).on('value',function(snap){
    var d=snap.val();
    if(!d) return;
    if(d.offset!==undefined) window._autoTimeOffset=d.offset;
    
    if(d.running){
      var isMyOwn=(!d.owner||d.owner===window._deviceId);
      var ownerDead=(d.heartbeat&&(Date.now()-d.heartbeat>30000));
      
      if(isMyOwn||ownerDead){
        // This device runs Auto (owns it or owner died)
        if(ownerDead&&!isMyOwn){
          console.log('Auto owner died, taking over');
          window._deviceId=window._deviceId; // keep own ID
          if(!isShared) db.ref('config/auto/day'+currentDay+'/owner').set(window._deviceId);
        }
        window._autoRemote=false;
        if(!window._autoTimeRunning||!window._autoTimeTimer){
          window._autoTimeRunning=true;
          autoTimeStep();
          window._autoTimeTimer=setInterval(autoTimeStep,3000);
          startHeartbeat();
        }
      } else {
        // Another device owns it and is alive
        window._autoTimeRunning=true;
        window._autoRemote=true;
        if(window._autoTimeTimer){clearInterval(window._autoTimeTimer);window._autoTimeTimer=null;}
        stopHeartbeat();
      }
      if(typeof renderLive==='function') renderLive();
    } else if(!d.running&&window._autoTimeRunning){
      window._autoTimeRunning=false;
      window._autoRemote=false;
      if(window._autoTimeTimer){clearInterval(window._autoTimeTimer);window._autoTimeTimer=null;}
      stopHeartbeat();
      if(typeof renderLive==='function') renderLive();
    }
  });
}

function autoTimeStep(){
  if(!positions.length) return;
  var tot=positions.length;
  var gpsActive=(Date.now()-window._lastRealGPS<GPS_TIMEOUT);

  var _stC=getStartTime();
  var mn=window._realRhythm||(+$('cMn').value)||6; // prefer real GPS rhythm
  var dateStr=dayDates[currentDay]||localDateStr(new Date());
  var startTime=new Date(dateStr+'T'+String(_stC.h).padStart(2,'0')+':'+String(_stC.m).padStart(2,'0')+':00').getTime();
  var now=Date.now()+(window._autoTimeOffset*60000);
  var elapsed=now-startTime;

  if(elapsed<0){
    if(!gpsActive){
      db.ref('jesus').set({lat:positions[0].lat,lng:positions[0].lng,t:Date.now()});
      var vRoute0=(positionsW.length>=2)?positionsW:positions;
      db.ref('virgen').set({lat:vRoute0[0].lat,lng:vRoute0[0].lng,t:Date.now()});
    }
    updateBanners();
    return;
  }

  var mnMs=mn*60000;
  var exactPos=elapsed/mnMs;
  var currentCambio=Math.floor(exactPos)+1;
  var fraction=exactPos-Math.floor(exactPos);
  currentCambio=Math.min(currentCambio,tot);
  currentCambio=Math.max(1,currentCambio);
  var procFinished=(currentCambio>=tot);
  if(procFinished) fraction=1;

  // Auto-stop when procession is done
  if(procFinished&&window._autoTimeRunning){
    // Ensure final cambio is written
    if(currentGrupoActual<tot){
      currentGrupoActual=tot;
      var sacaF=daySaca[currentDay]||16;
      var grpF=((sacaF-1+tot-1)%getHomCount())+1;
      var nombreF=(tot<=changes.length&&changes[tot-1])?changes[tot-1].n||'':'';
      liveGrupoData={cambio:tot,grp:grpF,nombre:nombreF,tot:tot,desfase:virgenDesfase,movidos:virgenMovidos,sacaMuj:daySacaMuj[currentDay],t:Date.now()};
      try{localStorage.setItem('grupoActual_day'+currentDay,JSON.stringify(liveGrupoData));}catch(e){_logErr("swallow",e);}
      saveAll();
      db.ref('grupoActual/day'+currentDay).set(liveGrupoData);
    }
    // Wait for virgen to finish too
    var vRoute2=(positionsW.length>=2)?positionsW:positions;
    var vExact2=Math.max(0,exactPos-virgenDesfase);
    if(vExact2>=vRoute2.length){
      window._autoTimeRunning=false;
      if(window._autoTimeTimer){clearInterval(window._autoTimeTimer);window._autoTimeTimer=null;}
      syncAutoState();
      if(typeof renderLive==='function') renderLive();
      updateBanners();
      return;
    }
  }

  // Update grupo when cambio changes (only if GPS not active)
  if(!gpsActive&&currentCambio!==currentGrupoActual&&currentCambio>0){
    currentGrupoActual=currentCambio;
    var sacaH=daySaca[currentDay]||16;
    var grp=((sacaH-1+currentCambio-1)%getHomCount())+1;
    var nombre=(currentCambio<=changes.length&&changes[currentCambio-1])?changes[currentCambio-1].n||'':'';
    liveGrupoData={cambio:currentCambio,grp:grp,nombre:nombre,tot:tot,desfase:virgenDesfase,movidos:virgenMovidos,sacaMuj:daySacaMuj[currentDay],t:Date.now()};
    try{localStorage.setItem('grupoActual_day'+currentDay,JSON.stringify(liveGrupoData));}catch(e){_logErr("swallow",e);}
    saveAll();
    db.ref('grupoActual/day'+currentDay).set(liveGrupoData);
    if(typeof renderLive==='function') renderLive();
  }

  // Animate Jesus marker (only if real GPS not active)
  if(!gpsActive){
    var idxA=Math.min(currentCambio-1,tot-1);
    var idxB=Math.min(currentCambio,tot-1);
    if(procFinished){idxA=tot-1;idxB=tot-1;fraction=0;}
    var ptA=positions[idxA],ptB=positions[idxB];
    var jLat=ptA.lat+(ptB.lat-ptA.lat)*fraction;
    var jLng=ptA.lng+(ptB.lng-ptA.lng)*fraction;
    db.ref('jesus').set({lat:jLat,lng:jLng,t:Date.now()});
  }
  // Always animate Virgen (she doesn't have her own GPS usually)
  var virgenHasGPS=(urnaActive&&urnaActive.virgen);
  if(!virgenHasGPS){
    var vRoute=(positionsW.length>=2)?positionsW:positions;
    var vTot=vRoute.length;
    var vDesfaseMin=Math.max(virgenDesfase,1);
    // Virgen's own rhythm when she has her own route
    var vMn=(positionsW.length>=2&&virgenMn>0)?virgenMn:mn;
    var vMnMs=vMn*60000;
    var vStartDelay=vDesfaseMin*mnMs; // she starts desfase*jesus_mn later
    var vElapsed=elapsed-vStartDelay;
    var vExactPos=vElapsed>0?(vElapsed/vMnMs):0;
    var vCambio=Math.floor(vExactPos);
    var vFrac=vExactPos-vCambio;
    var vFinished=(vCambio>=vTot-1);
    if(vFinished){vCambio=vTot-1;vFrac=0;}
    if(vElapsed<0){vCambio=0;vFrac=0;}
    var vIdxA=Math.min(Math.max(vCambio,0),vTot-1);
    var vIdxB=Math.min(vCambio+1,vTot-1);
    var vPtA=vRoute[vIdxA],vPtB=vRoute[vIdxB];
    var vLat=vPtA.lat+(vPtB.lat-vPtA.lat)*vFrac;
    var vLng=vPtA.lng+(vPtB.lng-vPtA.lng)*vFrac;
    db.ref('virgen').set({lat:vLat,lng:vLng,t:Date.now()});
  }

  updateBanners();
}

function adjustAutoTime(delta){
  window._autoTimeOffset+=delta;
  autoTimeStep();
  syncAutoState();
  if(typeof syncConfig==='function') syncConfig();
  if(typeof renderLive==='function') renderLive();
}

// ============================================================
// Menú espiritual — Vía Crucis y significado del día
// Textos del Vía Crucis: San Alfonso María de Ligorio (dominio público)
// Significado de cada día: Catecismo de la Iglesia Católica + Misal Romano
// ============================================================
// Las catorce estaciones del Vía Crucis. Imágenes opcionales — si `img` está
// definido, se muestra arriba de la meditación; si la carga falla en el
// browser, onerror la oculta y el bloque sigue funcionando sin ella.
var _SPIRITUAL_STATIONS = [
  { n:1, title:"Jesús es condenado a muerte",
    img:"../images/stations/station-01.jpg",
    med:"Considera, alma mía, cómo Jesús, después de haber sido azotado y coronado de espinas, fue injustamente condenado por Pilato a morir en la cruz. ¡Cuántas veces yo, con mis pecados, he confirmado esa sentencia!",
    or:"Jesús mío, abrazo tu sentencia y por amor tuyo acepto la muerte que tu Padre haya dispuesto para mí." },
  { n:2, title:"Jesús con la cruz a cuestas",
    img:"../images/stations/station-02.jpg",
    med:"Considera cómo Jesús, llevando sobre sus hombros la cruz, pensaba en mí, ofreciendo a su Padre, en favor mío, la muerte que iba a sufrir.",
    or:"Amantísimo Jesús, abrazo todas las tribulaciones que me has destinado hasta la muerte. Quiero llevarlas todas en unión con tu cruz." },
  { n:3, title:"Jesús cae por primera vez",
    img:"../images/stations/station-03.jpg",
    med:"Considera esta primera caída de Jesús bajo el peso de la cruz: tan delicado era su cuerpo y tan grande el peso. La debilidad de su carne y el peso de mis pecados le hicieron caer.",
    or:"Jesús mío, dame fortaleza para vencer las tentaciones, pues sin tu auxilio caeré también yo." },
  { n:4, title:"Jesús encuentra a su Madre Santísima",
    img:"../images/stations/station-04.jpg",
    med:"Considera el encuentro de Jesús con María, su Madre, en el camino del Calvario. ¡Qué espada de dolor traspasó el corazón de María al ver a su Hijo en tal estado!",
    or:"Madre Dolorosísima, por los méritos de tu dolor, alcánzame la gracia de amar de verdad a Jesús." },
  { n:5, title:"El Cireneo ayuda a Jesús a llevar la cruz",
    img:"../images/stations/station-05.jpg",
    med:"Considera cómo los verdugos, viendo a Jesús desfallecer, obligaron a Simón Cireneo a ayudarle a llevar la cruz.",
    or:"Dulcísimo Jesús, no rehuso la cruz como el Cireneo: la abrazo, la acepto. Acepto, en particular, la muerte que me esté destinada, con las penas que la acompañen; la uno a la tuya y te la ofrezco." },
  { n:6, title:"La Verónica enjuga el rostro de Jesús",
    img:"../images/stations/station-06.jpg",
    med:"Considera cómo la santa mujer Verónica, viendo el rostro de Jesús cubierto de sudor y de sangre, le presentó un lienzo en el que quedó impresa la imagen de su santa Faz.",
    or:"Amado Jesús, tu rostro era hermoso antes, pero esta jornada lo ha desfigurado. Imprime tu imagen en mi alma, y haz que mi corazón te ame siempre." },
  { n:7, title:"Jesús cae por segunda vez",
    img:"../images/stations/station-07.jpg",
    med:"Considera esta segunda caída de Jesús bajo la cruz: caída que renueva el dolor de María, en lo profundo que sentía al ver a su Hijo de tal manera maltratado.",
    or:"Bondadosísimo Jesús, ¡cuántas veces me has perdonado y cuántas he vuelto a caer y a ofenderte! Por los méritos de esta nueva caída, dame la fuerza necesaria para perseverar en tu gracia hasta la muerte." },
  { n:8, title:"Jesús consuela a las mujeres de Jerusalén",
    img:"../images/stations/station-08.jpg",
    med:"Considera cómo las mujeres, viendo a Jesús en tal estado, lloraban llenas de compasión. Y Jesús les dijo: «No lloréis por mí, sino por vosotras y por vuestros hijos».",
    or:"Jesús mío, lloro por las ofensas que te he hecho, por las penas que te he causado. Es tu amor, mi Jesús, el que me hace llorar más que el temor del infierno." },
  { n:9, title:"Jesús cae por tercera vez",
    img:"../images/stations/station-09.jpg",
    med:"Considera la tercera caída de Jesús: era extraordinaria su debilidad, y enorme la crueldad de los verdugos, que pretendían hacerle apresurar el paso cuando apenas le quedaba aliento.",
    or:"Oh Jesús, sufrimiento de los sufrimientos, por los méritos de tu debilidad, dame fuerzas para vencer todo respeto humano y todas mis pasiones desordenadas, que me han llevado a despreciar tu amistad." },
  { n:10, title:"Jesús es despojado de sus vestiduras",
    img:"../images/stations/station-10.jpg",
    med:"Considera la violencia con que los verdugos despojaron a Jesús. Las vestiduras estaban pegadas a su carne lacerada, y al arrancárselas las despegaban, llevándose consigo parte de la piel.",
    or:"Inocentísimo Jesús, por los méritos del dolor que sentiste, ayúdame a despojarme de todo apego a las cosas de la tierra, para poner solamente en ti mi amor y mi deseo." },
  { n:11, title:"Jesús es clavado en la cruz",
    img:"../images/stations/station-11.jpg",
    med:"Considera cómo Jesús, después de ser arrojado sobre la cruz, extendió por sí mismo sus manos, y ofreció a su Padre eterno el sacrificio de su vida por nuestra salvación. Aquellos verdugos le clavaron, y luego, enarbolando la cruz, le dejaron morir de dolor sobre ella.",
    or:"Crucificado Jesús mío, clavo en tu cruz mi corazón; allí lo dejo amando, y allí muero contigo." },
  { n:12, title:"Jesús muere en la cruz",
    img:"../images/stations/station-12.jpg",
    med:"Considera cómo tu Jesús, después de tres horas de agonía sobre la cruz, consumido por el dolor, exhausto, inclina la cabeza y muere.",
    or:"Oh Jesús, dulce amor mío, beso esa cruz en que has muerto por mí. Yo, por mis pecados, he merecido la muerte; pero tu muerte es mi esperanza." },
  { n:13, title:"Jesús es bajado de la cruz y entregado a María",
    img:"../images/stations/station-13.jpg",
    med:"Considera cómo, después de muerto el Señor, dos discípulos, José y Nicodemo, lo bajaron de la cruz y lo entregaron a su Madre Santísima, que con dolor lo recibió en su regazo.",
    or:"Madre Dolorosísima, recibe mi corazón en esos brazos en que recibiste a tu Hijo difunto; te lo doy entero, y te pido que me lo conserves siempre tuyo." },
  { n:14, title:"Jesús es sepultado",
    img:"../images/stations/station-14.jpg",
    med:"Considera cómo los discípulos llevaron al sepulcro el cuerpo de Jesús; allí lo depositaron, y se cerró la piedra. ¡Cuánto dolor sintió María al separarse de su Hijo!",
    or:"Sepultado Jesús, beso esa piedra que te cierra. Pero al tercer día has resucitado: dame la gracia de resucitar gloriosamente contigo en el día final." }
];

var _SPIRITUAL_DAYS = {
  0: {
    title:"Lunes Santo",
    short:"Lunes",
    head:"La unción en Betania",
    body:"En el Evangelio de san Juan (Jn 12, 1–11), seis días antes de la Pascua, en casa de Lázaro, María unge los pies de Jesús con un perfume costosísimo y los enjuga con sus cabellos. Jesús defiende ese gesto como un anticipo de su sepultura: «Déjala, lo tenía guardado para el día de mi sepultura». La Iglesia, al iniciar la Semana Santa, nos invita a contemplar el amor desinteresado de quien todo lo da por amor a Cristo, frente a la avaricia de Judas, que ya empieza a tramar la traición.<br><br>La primera lectura de hoy (Is 42, 1–7) presenta a Cristo como el Siervo elegido del Padre: «No gritará, no levantará la voz, la caña cascada no la quebrará». Es el comienzo de un camino que se hace silencioso, humilde, redentor.",
    cite:"Misal Romano · Lunes de la Semana Santa · Jn 12, 1–11; Is 42, 1–7" },
  1: {
    title:"Martes Santo",
    short:"Martes",
    head:"El anuncio de la traición y de la negación",
    body:"En la liturgia de hoy, durante la Última Cena (Jn 13, 21–33.36–38), Jesús anuncia con turbación: «Uno de vosotros me va a entregar». Predice también la negación de Pedro: «No cantará el gallo antes de que me hayas negado tres veces». La Iglesia nos invita a mirar con honestidad nuestro propio corazón: somos capaces, como Pedro, de amar al Señor y a la vez negarle por miedo; somos capaces, como Judas, de seguirle de cerca y traicionarle por interés.<br><br>Pero vemos también la paciencia del Señor, que no rechaza a ninguno de los dos: a Judas le ofrece un bocado en signo de amistad, y a Pedro, después de la negación, le mirará con misericordia (cf. Lc 22, 61). En este día, dejémonos mirar también nosotros con esa mirada que perdona.",
    cite:"Misal Romano · Martes de la Semana Santa · Jn 13, 21–33.36–38" },
  2: {
    title:"Miércoles Santo",
    short:"Miércoles",
    head:"El pacto de Judas",
    body:"Llamado también «Miércoles de espía», la liturgia (Mt 26, 14–25) presenta a Judas Iscariote ajustando con los sumos sacerdotes el precio de la traición: «¿Cuánto me dais y yo os lo entrego?». Le pesaron treinta monedas de plata. Desde ese momento, Judas buscaba una ocasión para entregarlo.<br><br>Frente a esa figura sombría, la primera lectura del día (Is 50, 4–9) pone en boca del Siervo del Señor una respuesta totalmente distinta: «Ofrecí la espalda a los que me golpeaban, las mejillas a los que me arrancaban la barba; no escondí el rostro ante los insultos y los salivazos». Cristo va libremente a la entrega. Hoy es día de pedir el don de la lealtad: no vender al Señor por ningún precio, por pequeño que parezca.",
    cite:"Misal Romano · Miércoles Santo · Mt 26, 14–25; Is 50, 4–9" },
  3: {
    title:"Viernes Santo",
    short:"Viernes",
    head:"La Pasión y muerte del Señor",
    body:"En este día único en el año, la Iglesia no celebra la Eucaristía: contempla la Cruz desnuda y proclama la Pasión según san Juan. El Catecismo enseña que «Cristo murió por nuestros pecados, según las Escrituras» (1 Co 15, 3): su entrega libre en la Cruz es la entrega del Hijo amado al Padre, en el Espíritu, para la salvación del mundo (CIC 599–605). Jesús no fue víctima del azar: «Nadie me quita la vida; yo la doy libremente» (Jn 10, 18).<br><br>En la Pasión se cumple la voluntad amorosa del Padre, que «tanto amó al mundo, que entregó a su Hijo único» (Jn 3, 16). La Cruz no es derrota sino victoria: «Por tu santa cruz redimiste al mundo». Hoy adoramos la cruz, ayunamos y guardamos silencio, porque hoy ha muerto el Autor de la vida.",
    cite:"Catecismo de la Iglesia Católica 599–630 · Misal Romano · Viernes Santo · Jn 18–19" },
  4: {
    title:"Santo Entierro de Cristo",
    short:"S. Entierro",
    head:"Descansa en el sepulcro · El descenso a los infiernos",
    body:"La Iglesia contempla a Cristo en el sepulcro y confiesa en el Credo: «descendió a los infiernos, al tercer día resucitó de entre los muertos». El Catecismo lo explica: «Jesús, como todos los hombres, conoció la muerte y se reunió con ellos en la morada de los muertos. Pero descendió allí como Salvador, proclamando la Buena Nueva a los espíritus que allí se encontraban» (CIC 632). «Estos justos esperaban a su Libertador en el seno de Abraham» (CIC 633).<br><br>Es la noche del silencio: María, junto al sepulcro cerrado, sostiene en su corazón la fe de toda la Iglesia, esperando la mañana de la Resurrección. El Santo Entierro es procesión de luto y de esperanza: no lloramos como los que no tienen esperanza, porque sabemos que ese cuerpo bendito, descansando, ya está venciendo a la muerte.",
    cite:"Catecismo de la Iglesia Católica 624–637 · Símbolo Apostólico · Sábado Santo (Sabbatum Sanctum)" }
};

// Las Siete Palabras de Cristo en la cruz. Las frases son texto bíblico literal;
// las meditaciones siguen la tradición devocional clásica del Tridentino al P.
// Alonso Messía SJ (1684), de uso libre.
var _SPIRITUAL_PALABRAS = [
  { n:1,
    title:"«Padre, perdónalos, porque no saben lo que hacen.»",
    ref:"Lucas 23, 34",
    med:"La primera palabra es perdón. Crucificado, despojado, escarnecido, el Señor no pide justicia para sí: pide perdón para los que lo ejecutan. Pide al Padre que no les tenga en cuenta esta sangre, porque no saben de Quién la derraman. Es el corazón mismo del Evangelio hecho súplica.",
    or:"Jesús crucificado, dame un corazón capaz de perdonar como vos perdonaste, sin que nadie me lo pida y sin esperar nada a cambio." },
  { n:2,
    title:"«Hoy estarás conmigo en el Paraíso.»",
    ref:"Lucas 23, 43",
    med:"Al ladrón que en el último momento le pide ser recordado, Jesús le promete más de lo que pidió: no «te recordaré algún día», sino «hoy estarás conmigo». La salvación es don gratuito del Crucificado, no premio del que se cree justo. Nunca es tarde para volverse a Cristo en la cruz.",
    or:"Señor, acordate de mí; aunque sea tarde, abrime las puertas de tu Reino." },
  { n:3,
    title:"«Mujer, ahí tienes a tu hijo... Ahí tienes a tu madre.»",
    ref:"Juan 19, 26-27",
    med:"Desde la cruz, Jesús entrega su Madre a Juan, y en Juan a toda la Iglesia. María se convierte en Madre de los discípulos, y los discípulos en hijos suyos. La maternidad espiritual de María nace al pie de la cruz, donde la fe parecía vencida.",
    or:"María, Madre del Crucificado, recibime también a mí como hijo tuyo y enseñame a estar al pie de la cruz." },
  { n:4,
    title:"«Dios mío, Dios mío, ¿por qué me has abandonado?»",
    ref:"Mateo 27, 46 · Marcos 15, 34 · Salmo 22, 2",
    med:"Jesús hace suyo el grito del Salmo 22, el lamento de toda la humanidad herida. No es desesperación: es la entrega más honda a un Padre que parece silencioso, pero que está presente. Cristo asume el abandono que es consecuencia del pecado para que ningún abandonado del mundo esté ya solo.",
    or:"Cuando me sienta solo y sin respuesta, dame, Señor, confiarte mi abandono como vos confiaste el tuyo." },
  { n:5,
    title:"«Tengo sed.»",
    ref:"Juan 19, 28",
    med:"La sed física del agonizante revela una sed más honda: la de Dios por la salvación de cada alma. «Quien tenga sed, venga a mí y beba» había dicho (Jn 7, 37). En la cruz, Cristo tiene sed de nosotros, y se cumplen las palabras del Salmo: «En mi sed me dieron a beber vinagre» (Sal 69, 22).",
    or:"Jesús sediento, dame sed de vos; que no me sacien las aguas del mundo, sino la fuente de tu costado abierto." },
  { n:6,
    title:"«Todo está cumplido.»",
    ref:"Juan 19, 30",
    med:"No dice «todo terminó», sino «todo está consumado», cumplido. La obra que el Padre le encomendó —la redención del mundo— queda completa en la cruz. Por eso san Pablo dirá: «Cuando llegó la plenitud de los tiempos, envió Dios a su Hijo» (Gal 4, 4). La cruz no es derrota: es victoria.",
    or:"Jesús, ayudame a cumplir hasta el final lo que mi Padre me ha encomendado, sin desviarme ni quedar a la mitad." },
  { n:7,
    title:"«Padre, en tus manos encomiendo mi espíritu.»",
    ref:"Lucas 23, 46 · Salmo 31, 6",
    med:"Última palabra y entrega total. Como hijo que vuelve a los brazos del Padre, Jesús deposita su vida con confianza filial. Es la oración de la noche, la oración del último suspiro de los justos. La Iglesia hace suya esta palabra cada noche en el Oficio de Completas.",
    or:"Padre, en tus manos pongo lo que tengo y lo que soy; en tus manos quiero morir y resucitar con tu Hijo." }
];

// ========== MAIN MENU (replaces the cryptic header icon row) ==========
function openAlerts(){
  var ap=document.getElementById('alertPanel');
  var ao=document.getElementById('alertOverlay');
  if(!ap||!ao) return;
  ap.style.display='block'; ao.style.display='block';
  if(typeof populateAlertSelects==='function') populateAlertSelects();
  if(typeof updatePushUI==='function') updatePushUI();
}
function openMainMenu(){
  var ov=document.getElementById('mainMenuOverlay');
  if(!ov){
    ov=document.createElement('div');
    ov.id='mainMenuOverlay';
    ov.className='mm-overlay';
    ov.onclick=function(e){ if(e.target===ov) closeMainMenu(); };
    document.body.appendChild(ov);
  }
  var row=function(ic,title,desc,fn){
    return '<button class="mm-row" onclick="closeMainMenu();'+fn+'"><span class="mm-ic">'+ic+'</span>'
      +'<span class="mm-tx"><b>'+title+'</b><small>'+desc+'</small></span><span class="mm-arrow">›</span></button>';
  };
  var adminRow = isAdmin
    ? row('🚪','Cerrar sesión de editor','Salir del modo administrador','logoutAdmin()')
    : row('🔑','Acceso administrador','Solo para editores autorizados','loginAsAdmin()');
  ov.innerHTML='<div class="mm-sheet">'
    +'<div class="mm-handle"></div>'
    +'<div class="mm-title">MENÚ</div>'
    +row('📖','Vía Crucis y oraciones','Estaciones, significado del día, 7 Palabras','openSpiritual()')
    +row('⚙️','Configuración','Tu grupo, modo de uso, tamaño de letra','openCfg()')
    +row('🔔','Alertas y avisos','Notificaciones cuando se acerca tu grupo','openAlerts()')
    +row('📤','Compartir','Enviar la app por WhatsApp','shareWhatsApp()')
    +adminRow
    +'</div>';
  ov.style.display='flex';
}
function closeMainMenu(){ var ov=document.getElementById('mainMenuOverlay'); if(ov) ov.style.display='none'; }

function openSpiritual(){
  var modal=document.getElementById('spiritualModal');
  if(!modal){
    var overlay=document.createElement('div');
    overlay.id='spiritualOverlay';
    overlay.style.cssText='display:none;position:fixed;inset:0;background:rgba(0,0,0,.75);z-index:5999';
    overlay.onclick=closeSpiritual;
    document.body.appendChild(overlay);
    modal=document.createElement('div');
    modal.id='spiritualModal';
    modal.className='spiritual-modal';
    document.body.appendChild(modal);
  }
  renderSpiritual('day');
  document.getElementById('spiritualOverlay').style.display='block';
  modal.style.display='flex';
}

function closeSpiritual(){
  var m=document.getElementById('spiritualModal');
  var o=document.getElementById('spiritualOverlay');
  if(m) m.style.display='none';
  if(o) o.style.display='none';
}

function renderSpiritual(section){
  var m=document.getElementById('spiritualModal');
  if(!m) return;
  var cd=(typeof currentDay==='number')?currentDay:0;
  var d=_SPIRITUAL_DAYS[cd]||_SPIRITUAL_DAYS[0];
  var bodyHTML='';
  if(section==='day'){
    bodyHTML='<div class="sp-block">'
      +'<div class="sp-head">'+d.head+'</div>'
      +'<div class="sp-body">'+d.body+'</div>'
      +'<div class="sp-cite">📜 '+d.cite+'</div>'
      +'</div>';
  } else if(section==='sp'){
    bodyHTML='<div class="sp-intro">Las Siete Palabras son las últimas frases que los Evangelios recogen de los labios de Jesús en la cruz. Se meditan tradicionalmente el Viernes Santo entre las 12 y las 3 de la tarde, pero pueden rezarse cualquier día de la Semana Santa.</div>';
    for(var pi=0;pi<_SPIRITUAL_PALABRAS.length;pi++){
      var p=_SPIRITUAL_PALABRAS[pi];
      bodyHTML+='<div class="sp-station">'
        +'<div class="sp-st-title"><span class="sp-st-n">'+p.n+'</span> '+p.title+'</div>'
        +'<div class="sp-st-vr">📖 '+p.ref+'</div>'
        +'<div class="sp-st-med">'+p.med+'</div>'
        +'<div class="sp-st-or"><i>'+p.or+'</i></div>'
        +'</div>';
    }
    bodyHTML+='<div class="sp-cite">📜 Evangelios sinópticos y de san Juan · Misal Romano (liturgia del Viernes Santo) · tradición devocional de las Siete Palabras (s. XVII, popularizada por el P. Alonso Messía SJ).</div>';
  } else {
    bodyHTML='<div class="sp-intro">«Te adoramos, oh Cristo, y te bendecimos: que por tu santa cruz redimiste al mundo.»<br><br>Las catorce estaciones se rezan completas cada día de la Semana Santa. Texto: san Alfonso María de Ligorio.</div>';
    for(var i=0;i<_SPIRITUAL_STATIONS.length;i++){
      var s=_SPIRITUAL_STATIONS[i];
      bodyHTML+='<div class="sp-station">'
        +'<div class="sp-st-title"><span class="sp-st-n">'+s.n+'</span> '+s.title+'</div>'
        +(s.img?'<img loading="lazy" decoding="async" class="sp-st-img" src="'+s.img+'" alt="Estación '+s.n+'" onerror="this.remove()">':'')
        +'<div class="sp-st-vr"><b>V.</b> Te adoramos, oh Cristo, y te bendecimos.<br><b>R.</b> Que por tu santa cruz redimiste al mundo.</div>'
        +'<div class="sp-st-med">'+s.med+'</div>'
        +'<div class="sp-st-or"><i>'+s.or+'</i></div>'
        +'<div class="sp-st-pad">Padre Nuestro · Ave María · Gloria al Padre.</div>'
        +'</div>';
    }
    // Epílogo: la Resurrección. El Vía Crucis no termina en el sepulcro; el
    // sentido de toda la cruz se ve al tercer día. Imagen de la serie devocional.
    bodyHTML+='<div class="sp-station" style="border-color:rgba(255,215,100,.35);background:rgba(255,215,100,.05)">'
      +'<div class="sp-st-title" style="color:#ffd766"><span class="sp-st-n" style="background:#b89033">✟</span> Epílogo · La Resurrección</div>'
      +'<img loading="lazy" decoding="async" class="sp-st-img" src="../images/stations/station-15-resurrection.jpg" alt="Resurrección de Cristo" onerror="this.remove()">'
      +'<div class="sp-st-med">«¿Por qué buscáis entre los muertos al que vive? No está aquí, ha resucitado» (Lc 24, 5-6). El Vía Crucis no termina en el sepulcro: la cruz se entiende sólo a la luz de la Pascua. Por eso meditar la Pasión no es quedarnos en el dolor, sino acompañar al Señor sabiendo que el sufrimiento, ofrecido con Él, tiene la victoria asegurada.</div>'
      +'<div class="sp-st-or"><i>Cristo resucitado, hacé que mi vida, atravesada por muchas pequeñas cruces, conozca ya el comienzo de tu Pascua.</i></div>'
      +'</div>';
    bodyHTML+='<div class="sp-cite">📜 Texto base: san Alfonso María de Ligorio, <i>Vía Crucis</i> (s. XVIII). De uso devocional libre.</div>';
  }
  m.innerHTML=
    '<div class="sp-hdr">'
    +'<div class="sp-tabs">'
    +'<button class="sp-tab '+(section==='day'?'a':'')+'" onclick="renderSpiritual(\'day\')">🕊️ '+(d.short||d.title)+'</button>'
    +'<button class="sp-tab '+(section==='vc'?'a':'')+'" onclick="renderSpiritual(\'vc\')">✝️ Vía Crucis</button>'
    +'<button class="sp-tab '+(section==='sp'?'a':'')+'" onclick="renderSpiritual(\'sp\')">✟ 7 Palabras</button>'
    +'</div>'
    +'<button class="sp-close" onclick="closeSpiritual()" aria-label="Cerrar">✕</button>'
    +'</div>'
    +'<div class="sp-content">'+bodyHTML+'</div>';
}


// Apply the saved reading-size preference as soon as the body is available.
try{ if(document.body){ applyBigText(); } else { document.addEventListener('DOMContentLoaded', applyBigText); } }catch(e){}
