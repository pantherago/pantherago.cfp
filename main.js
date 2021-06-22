
if (navigator.serviceWorker) {
    navigator.serviceWorker.register('pantheraworker.js', { scope: '/' })
    if (!navigator.serviceWorker.controller) {
        window.location.reload()
    }
}

async function GoEvent(id, sender, para) {
    var durl = "/api/goevent/";

    if (id) {
        durl += id.toString() + "/"
    } else {
        durl += "noid/"
    }

    if (sender) {
        durl += sender.toString() + "/"
    } else {
        durl += "nosender/"
    }

    if (para) {
        durl += encodeURI(para.toString())
    } else {
        durl += "null"
    }

    var resp = await fetch(durl)
        .then(response => response.json());

    console.log("Event raised : " + durl + "  :  Response " + resp);

    if (resp.Reload == true) {
        console.log("Reload page")
        location.reload();
    } else if (resp.Update == true) {
        console.log("Update " + resp.ID)
        InjectElement(resp.ID, resp.Content)
        // location.reload();
    }
}


function InjectElement(ID, content) {
    document.getElementById(ID).innerHTML = content
}


var HTTPGetCache = {}

function HTTPGetAsync(url) {
    HTTPGetCache[url] = "GETTING"
    fetch(url)
        .then(response => response.text().then(
            respstr => {
                HTTPGetCache[url] = respstr
            }
        ));
}

function HTTPGet(url) {
    var r = HTTPGetCache[url]
    if (r == null) {
        HTTPGetAsync(url)
        return "GETTING"
    } else if (r == "GETTING") {
        return r
    }

    delete HTTPGetCache[url]
    return r
}