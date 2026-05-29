importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyCxQxXH4qihmmjiGTVdWC7QnBfdbklfcU8",
  projectId: "procesion-sonsonate",
  messagingSenderId: "972231146098",
  appId: "1:972231146098:web:fedd850a29d974484520eb"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  const data = payload.data || {};
  self.registration.showNotification(data.title || 'Jesús Nazareno · Sonsonate', {
    body: data.body || 'Grupo actualizado',
    icon: './icon-192.png',
    badge: './icon-192.png',
    vibrate: [200, 100, 200],
    tag: 'grupo-update',
    renotify: true,
    data: { url: self.registration.scope }
  });
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({type:'window',includeUncontrolled:true}).then(function(cl) {
      for(var i=0;i<cl.length;i++){
        if(cl[i].url.includes('procesion')&&'focus' in cl[i]) return cl[i].focus();
      }
      return clients.openWindow(event.notification.data.url||'/');
    })
  );
});

const CACHE_NAME = 'semana-santa-v105';
const URLS_TO_CACHE = ['./', './index.html', './app.js', './app.css', './routes-data.js', './icon-192.png', './icon-512.png', './se-icon-192.png', './jesus.jpg', './maria.jpg', './se-entierro.jpg', './se-virgen.jpg', './jesus-nazareno/', './jesus-nazareno/index.html', './jesus-nazareno/manifest.json', './santo-entierro/', './santo-entierro/index.html', './santo-entierro/manifest.json'];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(URLS_TO_CACHE)));
  self.skipWaiting();
});

// Allow the client to fast-track activation by posting {type:'SKIP_WAITING'}.
// Used by the in-app update banner so the new SW takes over immediately.
self.addEventListener('message', event => {
  if(event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))).then(()=>self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if(url.hostname.includes('googleapis.com')||url.hostname.includes('gstatic.com')||url.hostname.includes('firebaseio.com')||url.hostname.includes('firebase')||url.hostname.includes('fcm')) return;
  // Never cache manifests — the choice between procession and Santo Entierro
  // depends on what the user requests this load and must always be fresh.
  if(url.pathname.endsWith('.json') && (url.pathname.includes('manifest'))){
    event.respondWith(fetch(event.request));
    return;
  }
  // HTML and the JS/CSS bundle: network-first so deploys propagate quickly.
  if(event.request.url.includes('.html')||url.pathname.endsWith('/')||url.pathname.endsWith('app.js')||url.pathname.endsWith('app.css')||url.pathname.endsWith('routes-data.js')){
    event.respondWith(fetch(event.request).then(r=>{if(r.ok){const c=r.clone();caches.open(CACHE_NAME).then(cache=>cache.put(event.request,c));}return r;}).catch(()=>caches.match(event.request)));
  } else {
    event.respondWith(caches.match(event.request).then(c=>c||fetch(event.request).then(r=>{if(r.ok){const cl=r.clone();caches.open(CACHE_NAME).then(cache=>cache.put(event.request,cl));}return r;})));
  }
});
