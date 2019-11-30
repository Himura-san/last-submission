importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox)
  console.log(`Workbox berhasil dimuat`);
else
  console.log(`Workbox gagal dimuat`);

workbox.precaching.precacheAndRoute([
  "./",
  "./nav.html",

  "./pages/klasemen.html",
  "./pages/jadwal.html",
  "./pages/fav.html",

  "./assets/css/custom.css",
  "./assets/css/materialize.min.css",
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css",

  "./assets/vendor/jquery-3.3.1/js/jquery-3.3.1.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/js/all.min.js",
  "./assets/js/materialize.min.js",
  "./assets/vendor/idb-2.1.3/idb.js",
  "./assets/js/moment.js",
  "./assets/js/db.js",
  "./assets/js/nav.js",
  "./assets/js/api.js",

  "./assets/images/icon.png",
  "./assets/images/x.png",
  { url: '/index.html', revision: '2' },
]);

workbox.routing.registerRoute(
  new RegExp('/pages/'),
  workbox.strategies.staleWhileRevalidate({
      cacheName: 'pages'
  })
);

workbox.routing.registerRoute(
  new RegExp('https://api.football-data.org/v2/'),
  workbox.strategies.staleWhileRevalidate({
      cacheName: 'data-bola'
  })
);


workbox.routing.registerRoute(
  new RegExp('/assets/css'),
  workbox.strategies.cacheFirst({
      cacheName: 'assets-css'
  })
);

workbox.routing.registerRoute(
  new RegExp('/assets/js'),
  workbox.strategies.cacheFirst({
      cacheName: 'assets-js'
  })
);

workbox.routing.registerRoute(
  new RegExp('/assets/vendor'),
  workbox.strategies.cacheFirst({
      cacheName: 'assets-vendor'
  })
);

workbox.routing.registerRoute(
  new RegExp('/assets/images'),
  workbox.strategies.cacheFirst({
    cacheName: 'images',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 hari
      }),
    ],
  }),
);

workbox.routing.registerRoute(
  /^https:\/\/fonts\.gstatic\.com/,
  workbox.strategies.cacheFirst({
    cacheName: 'google-fonts-webfonts',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30,
      }),
    ],
  })
);

self.addEventListener('push', function(event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  var options = {
    body: body,
  //   icon: 'img/notification.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('E-FootIn', options)
  );
});