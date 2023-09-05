function getVideoId(){
    let url = window.location.href;
    let match = url.match(/videos\/(.+)\?/);
    if(!match)
        return null;

    return match[1];
}

function normalizeUrl(url) {
    return url.replace(/\\u0026/g, "&");
}

function downloadLink(ev) {
    ev.preventDefault();
    chrome.storage.sync.get("user", function (obj) {
        if (obj.user) {
            chrome.runtime.sendMessage({url:ev.target.href});
        }else {
            alert('Please login into extension to download video.')
        }
    });
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

function vimeoDownloadCompare(a, b) {
    aquality = parseInt(a.quality);
    afps = a.fps;
    bquality = parseInt(b.quality);
    bfps = b.fps;
    if (aquality === bquality) {
        if (afps === bfps) {
            return 0;
        } else if (afps < bfps) {
            return -1;
        } else {
            return 1;
        }
    } else if (aquality < bquality) {
        return -1;
    } else {
        return 1;
    }
}

function addDownloadButton(json) {
    let div = document.createElement("div");
    div.setAttribute("class", "__wd-dropdown__");
    div.setAttribute("style", "float:right; z-index: 100;");
    let btn = document.createElement("button");
    btn.setAttribute("class", "__wd-dropbtn__");
    btn.innerText = "Download";
    div.appendChild(btn);

    let div_content = document.createElement("div");
    div_content.setAttribute("class", "__wd-dropdown-content__");
    div_content.setAttribute("style", "left:0;");

    var vimeoDownloadArray = json.request.files.progressive;
    vimeoDownloadArray.sort(vimeoDownloadCompare).reverse();
    vimeoDownloadArray.forEach(function (e) {
        let url = e.url;
        if(url.includes('?'))
            url = url.substring(0, url.indexOf('?'));
        var element = document.createElement('a');
        element.setAttribute("href", url);
        element.setAttribute("target", "_blank");
        element.setAttribute("download", "");
        element.setAttribute("title", "Download " + e.quality + " with " + e.fps + "fps");
        element.setAttribute("target", "_blank");
        element.innerText = "MP4 " + e.quality;
        element.addEventListener('click', downloadLink);
        element.addEventListener('contextmenu', downloadLink);
        div_content.appendChild(element);
    });

    div.appendChild(div_content);

    let container = document.getElementsByClassName("player-container");
    if(!container || container.length == 0)
        return;

    container = container[0];
    container.insertBefore(div, container.firstChild);
}

window.onload = async function() {
    let videoId = getVideoId();
    if(!videoId)
        return;

    //let response = await fetch(window.location.href);

    let html = document.body.innerHTML; //  await response.text();
    let configUrlMatch = html.match(/.config_url.:\"(.+?)\"/);
    if(!configUrlMatch)
        return;

    let configUrl = normalizeUrl(configUrlMatch[1]);
    let configResponse = await fetch(configUrl);

    let configText = await configResponse.text();
    let json = JSON.parse(configText);
    addDownloadButton(json);
}