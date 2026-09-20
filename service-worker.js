/* =========================================================
   AVENTURA DEL HÉROE ARÁCNIDO
   SERVICE WORKER — PWA
   ========================================================= */

const CACHE_NAME = "aventura-aracnida-v1";

const ARCHIVOS = [
    "./",
    "./index.html",
    "./style.css",
    "./app.js",
    "./manifest.json",

    "./icons/icon-192.png",
    "./icons/icon-512.png"
];


/* =========================================================
   INSTALACIÓN
   ========================================================= */

self.addEventListener("install", event => {

    event.waitUntil(

        caches.open(CACHE_NAME)
            .then(cache => {

                return cache.addAll(ARCHIVOS);

            })

    );

    self.skipWaiting();

});


/* =========================================================
   ACTIVACIÓN
   ========================================================= */

self.addEventListener("activate", event => {

    event.waitUntil(

        caches.keys().then(nombres => {

            return Promise.all(

                nombres
                    .filter(nombre => nombre !== CACHE_NAME)
                    .map(nombre => caches.delete(nombre))

            );

        })

    );

    self.clients.claim();

});


/* =========================================================
   PETICIONES
   ========================================================= */

self.addEventListener("fetch", event => {

    if (event.request.method !== "GET") {
        return;
    }

    event.respondWith(

        caches.match(event.request)
            .then(respuesta => {

                if (respuesta) {
                    return respuesta;
                }

                return fetch(event.request)
                    .then(respuestaRed => {

                        if (
                            !respuestaRed ||
                            respuestaRed.status !== 200 ||
                            respuestaRed.type === "opaque"
                        ) {
                            return respuestaRed;
                        }

                        const copia = respuestaRed.clone();

                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(
                                    event.request,
                                    copia
                                );
                            });

                        return respuestaRed;

                    })
                    .catch(() => {

                        return caches.match(
                            "./index.html"
                        );

                    });

            })

    );

});