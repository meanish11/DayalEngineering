// Service Worker for Dayal Engineering PWA
// Version 2.0.0 - Updated for PNG icons

const CACHE_NAME = 'dayal-engg-v2';
const urlsToCache = [
  '/',
  '/index.html',
  '/catalog.html',
  '/product-detail.html',
  '/our-work.html',
  '/css/style.css',
  '/js/main.js',
  '/js/env-config.js',
  '/js/translator.js',
  '/js/catalog.js',
  '/js/product-detail.js',
  '/js/our-work.js',
  '/logo/logo.svg',
  '/logo/icon-512x512.png',
  '/logo/icon-192x192.png',
  '/logo/icon-144x144.png',
  '/logo/icon-96x96.png',
  '/manifest.json',
  '/our-work-images.json',
  'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap'
];

// Install Service Worker
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Caching app shell');
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.error('[Service Worker] Cache failed:', error);
      })
  );
  self.skipWaiting();
});

// Activate Service Worker
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[Service Worker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch Strategy: Network First, falling back to Cache
self.addEventListener('fetch', (event) => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin) && 
      !event.request.url.includes('fonts.googleapis.com') &&
      !event.request.url.includes('gstatic.com')) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Clone the response
        const responseToCache = response.clone();

        // Cache the fetched response
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return response;
      })
      .catch(() => {
        // Network failed, try cache
        return caches.match(event.request).then((response) => {
          if (response) {
            return response;
          }

          // If not in cache, return offline page or placeholder
          if (event.request.destination === 'document') {
            return caches.match('/index.html');
          }

          // For images, you could return a placeholder
          if (event.request.destination === 'image') {
            return new Response(
              '<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg"><rect fill="#ddd" width="200" height="200"/><text x="50%" y="50%" text-anchor="middle" fill="#999">Offline</text></svg>',
              { headers: { 'Content-Type': 'image/svg+xml' } }
            );
          }
        });
      })
  );
});

// Listen for messages from the client
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
