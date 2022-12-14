import { clientsClaim, skipWaiting } from "workbox-core";
import { ExpirationPlugin } from "workbox-expiration";
import {
  NetworkOnly,
  NetworkFirst,
  CacheFirst,
  StaleWhileRevalidate
} from "workbox-strategies";
import {
  registerRoute,
  setDefaultHandler,
  setCatchHandler
} from "workbox-routing";
import {
  matchPrecache,
  precacheAndRoute,
  cleanupOutdatedCaches
} from "workbox-precaching";

self.skipWaiting();
clientsClaim();

const WB_MANIFEST = self.__WB_MANIFEST;
// // // // Precache fallback route and image
WB_MANIFEST.push({
  url: "/",
  revision: "1234567890"
});

precacheAndRoute(WB_MANIFEST);

cleanupOutdatedCaches();

registerRoute(
  new RegExp("/_next/static"),
  new StaleWhileRevalidate({
    cacheName: "static-caches"
  })
);

registerRoute(
  "/",
  new NetworkFirst({
    cacheName: "start-url",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 1,
        maxAgeSeconds: 86400,
        purgeOnQuotaError: !0
      })
    ]
  }),
  "GET"
);
registerRoute(
  /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
  new CacheFirst({
    cacheName: "google-fonts",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 4,
        maxAgeSeconds: 31536e3,
        purgeOnQuotaError: !0
      })
    ]
  }),
  "GET"
);
registerRoute(
  /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
  new StaleWhileRevalidate({
    cacheName: "static-font-assets",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 4,
        maxAgeSeconds: 604800,
        purgeOnQuotaError: !0
      })
    ]
  }),
  "GET"
);
// disable image cache, so we could observe the placeholder image when offline
registerRoute(
  /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
  new NetworkOnly({
    cacheName: "static-image-assets",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 64,
        maxAgeSeconds: 86400,
        purgeOnQuotaError: !0
      })
    ]
  }),
  "GET"
);
registerRoute(
  /\.(?:js)$/i,
  new StaleWhileRevalidate({
    cacheName: "static-js-assets",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 32,
        maxAgeSeconds: 86400,
        purgeOnQuotaError: !0
      })
    ]
  }),
  "GET"
);
registerRoute(
  /\.(?:css|less)$/i,
  new StaleWhileRevalidate({
    cacheName: "static-style-assets",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 32,
        maxAgeSeconds: 86400,
        purgeOnQuotaError: !0
      })
    ]
  }),
  "GET"
);
registerRoute(
  /\.(?:json|xml|csv)$/i,
  new NetworkFirst({
    cacheName: "static-data-assets",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 32,
        maxAgeSeconds: 86400,
        purgeOnQuotaError: !0
      })
    ]
  }),
  "GET"
);
registerRoute(
  /\/api\/.*$/i,
  new NetworkFirst({
    cacheName: "apis",
    networkTimeoutSeconds: 10,
    plugins: [
      new ExpirationPlugin({
        maxEntries: 16,
        maxAgeSeconds: 86400,
        purgeOnQuotaError: !0
      })
    ]
  }),
  "GET"
);
registerRoute(
  /.*/i,
  new NetworkFirst({
    cacheName: "others",
    networkTimeoutSeconds: 10,
    plugins: [
      new ExpirationPlugin({
        maxEntries: 32,
        maxAgeSeconds: 86400,
        purgeOnQuotaError: !0
      })
    ]
  }),
  "GET"
);

setDefaultHandler(new StaleWhileRevalidate());

setCatchHandler(({ event }) => {
  switch (event.request.destination) {
    case "document":
      // If using precached URLs:
      return matchPrecache("/fallback");
      // return caches.match('/fallback')
      break;
    case "image":
      // If using precached URLs:
      return matchPrecache("/static/images/fallback.png");
      // return caches.match('/static/images/fallback.png')
      break;
    case "font":
    // If using precached URLs:
    // return matchPrecache(FALLBACK_FONT_URL);
    // return caches.match('/static/fonts/fallback.otf')
    // break
    default:
      // If we don't have a fallback, just return an error response.
      return Response.error();
  }
});


