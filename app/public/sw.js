const staticCacheName = 'lmarket-v1.1';

const assets = [
  '/core/css/shop-homepage.css',
  '/core/error/css/style.css',
  '/core/vendor/bootstrap/css/bootstrap.css',
  '/core/vendor/bootstrap/css/bootstrap.css.map',
  '/core/vendor/bootstrap/css/bootstrap.min.css',
  '/core/vendor/bootstrap/css/bootstrap.min.css.map',
  '/core/vendor/bootstrap/css/bootstrap-grid.css',
  '/core/vendor/bootstrap/css/bootstrap-grid.css.map',
  '/core/vendor/bootstrap/css/bootstrap-grid.min.css',
  '/core/vendor/bootstrap/css/bootstrap-grid.min.css.map',
  '/core/vendor/bootstrap/css/bootstrap-reboot.min.css',
  '/core/vendor/bootstrap/css/bootstrap-reboot.min.css.map',
  '/core/vendor/bootstrap/js/bootstrap.js',
  '/core/vendor/bootstrap/js/bootstrap.bundle.js',
  '/core/vendor/bootstrap/js/bootstrap.bundle.js.map',
  '/core/vendor/bootstrap/js/bootstrap.bundle.min.js',
  '/core/vendor/bootstrap/js/bootstrap.bundle.min.js.map',
  '/core/vendor/bootstrap/js/bootstrap.js.map',
  '/core/vendor/bootstrap/js/bootstrap.min.js',
  '/core/vendor/bootstrap/js/bootstrap.min.js.map',
  '/core/vendor/bootstrap/js/fontawesome.js',
  '/core/vendor/jquery/jquery.js',
  '/core/vendor/jquery/jquery.min.js',
  '/core/vendor/jquery/jquery.min.map',
  '/core/vendor/jquery/jquery.slim.js',
  '/core/vendor/jquery/jquery.slim.min.js',
  '/core/vendor/jquery/jquery.slim.min.map',
  '/admin/assets/css/style.css',
  '/admin/assets/css/style.css.map',
  '/admin/assets/js/main.js',
  '/admin/assets/js/widgets.js',
  '/admin/assets/js/init-scripts/data-table/datatables-init.js',
  '/admin/assets/js/init-scripts/gmap/gmap.init.js',
  '/admin/assets/js/init-scripts/vector-map/vector.init.js',
  '/admin/assets/scss/style.scss',
  '/admin/assets/scss/_gauge.scss',
  '/admin/assets/scss/_socials.scss',
  '/admin/assets/scss/_switches.scss',
  '/admin/assets/scss/_variables.scss',
  '/admin/assets/scss/_widgets.scss',
  './offline/index.html',
  './offline/offline.html',
  'https://kit-free.fontawesome.com/releases/latest/css/free.min.css'
  
];

// install event
self.addEventListener('install', evt => {
  this.skipWaiting();
  evt.waitUntil(
    caches.open(staticCacheName)
      .then(cache => {
        console.log('caching shell assets');
        cache.addAll(assets);
      })
      .catch(error => {
        console.error(error);
      })
  );
  
})

// activate event
self.addEventListener("activate", function(e) {
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(
        keyList.map(function(key) {
          if (key !== staticCacheName) {
              console.log("Removing old cache", key);
              return caches.delete(key);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// fetch event

// stratege: cache first

self.addEventListener('fetch', event => {
  
  event.respondWith(
    caches.match(event.request)
    .then(response => {
      // return fetch(event.request) || response;
      return response || fetch(event.request);

    })
    .catch(() => {
      if(event.request.method == 'POST') {
        return caches.match('/offline/index.html');
      } else {
        return caches.match('/offline/offline.html');
      }
           
    })
  );

});



