var cacheName = 'v$versionNumber::mika.house';

var filesToCache = [
  '//use.fontawesome.com/releases/v5.6.3/css/all.css',
  '//fonts.googleapis.com/css?family=Raleway',
  '/images/fallback0.jpg',
  '/images/fallback1.jpg'
];

var cacheableAssetTypes = [
  'jpg', 'png', 'webp', 'js', 'css', 'woff', 'woff2'
]

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(filesToCache);
    })
  );
});

let evaluateDomain = url => {
  if(url.indexOf('mika') === -1){
    return {};
  } else {
    return {
      credentials: 'include'
    }
  }
}

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open(cacheName)
      .then(async cache => {
        const response = await cache.match(event.request);
        return response || fetch(event.request, evaluateDomain)
          .then(resource => {
            var url = event.request.url;
            if(url && evaluateCacheable(url)) {
              cache.put(event.request, resource.clone())
                .catch(() => {})
            }
            return resource;
          })
          .catch(() => {})
      })
      .catch(() => {})
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => {
        if (key != cacheName) {
          return caches.delete(key);
        }
      })
    ))
  );  
});

var evaluateCacheable = function(url) {
  if(url.indexOf('?') !== -1 || url.indexOf('mp4') > -1)
    return false;
  var shouldCache = cacheableAssetTypes.map(type => url.indexOf(type) != -1);
  return shouldCache.includes(true);  
}