

self.addEventListener('install', event => {
    console.log("Panthera Worker : Install");
    return self.skipWaiting();
});

self.addEventListener('activate', event => {
    console.log("Panthera Worker : Activate");
    return self.clients.claim();
});


self.addEventListener('fetch', event => {
    if (event.request.url.startsWith(self.location.origin)) {

        var headers = new Headers();


        console.log("Fetch : ClientId : " + event.clientId)
        headers.append('panthera-client', event.clientId);


        var newReq = new Request(event.request, { headers: headers });

        event.respondWith(
            fetch(newReq).then(response => {
                return response;
            })
        );
    }
});