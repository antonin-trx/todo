const cacheName = 'todo-v1';
const assets = [
  './',
  './index.html',
  './style.css',
  './todo.js',
  './manifest.json',
  './icon-192.png'
];

// Installation : mise en cache des fichiers
self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(cacheName).then(cache => {
      cache.addAll(assets);
    })
  );
});

// Intercepter les requêtes pour le mode hors-ligne
self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request);
    })
  );
});