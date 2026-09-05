// Service Worker for Unikatno šiveno – Jelena Erić PWA
const CACHE_NAME = 'unikatno-siveno-v2'; // Incremented to bust cache
const OFFLINE_URL = '/offline.html';

// Only cache essential app shell - NOT dynamic asset chunks
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/logo.png',
  '/offline.html'
];

// Install event - cache essential files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(PRECACHE_URLS);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event - network-first for fresh content, cache fallback for offline
self.addEventListener('fetch', (event) => {
  // Skip cross-origin requests and non-GET requests
  if (!event.request.url.startsWith(self.location.origin) ||
      event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    // Try network first for fresh content
    fetch(event.request)
      .then((networkResponse) => {
        // Return network response immediately
        return networkResponse;
      })
      .catch(() => {
        // If network fails, try cache
        return caches.match(event.request)
          .then((cachedResponse) => {
            // Return cached response if found
            if (cachedResponse) {
              return cachedResponse;
            }

            // If it's a navigation request, return offline page
            if (event.request.mode === 'navigate') {
              return caches.match(OFFLINE_URL);
            }

            // Otherwise, return nothing (let browser handle error)
            return null;
          });
      })
  );
});

// Listen for push notifications
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'Nova poruka od Jelene Erić',
    icon: '/logo.png',
    badge: '/logo.png',
    tag: 'unikatno-siveno-push',
    renotify: true,
    actions: [
      {
        action: 'explore',
        title: 'Istražite kolekciju',
        icon: '/logo.png'
      },
      {
        action: 'close',
        title: 'Zatvori',
        icon: '/logo.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Unikatno šiveno – Jelena Erić', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  } else {
    // Default action - open app
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Listen for push notifications
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'Nova poruka od Jelene Erić',
    icon: '/logo.png',
    badge: '/logo.png',
    tag: 'unikatno-siveno-push',
    renotify: true,
    actions: [
      {
        action: 'explore',
        title: 'Istražite kolekciju',
        icon: '/logo.png'
      },
      {
        action: 'close',
        title: 'Zatvori',
        icon: '/logo.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Unikatno šiveno – Jelena Erić', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  } else {
    // Default action - open app
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});