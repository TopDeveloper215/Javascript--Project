function getElementsByXPath(xpath) {
    let result = document.evaluate(xpath, document, null, XPathResult.ANY_TYPE, null);

    let node, nodes = []
    while (node = result.iterateNext())
        nodes.push(node);

    return nodes;
}

function downloadLink(ev) {
    ev.preventDefault();
    chrome.storage.sync.get("user", function (obj) {
        if (obj.user) {
            if(ev.target.title && ev.target.title.includes(".mp4"))
                chrome.runtime.sendMessage({ url:ev.target.href, filename: ev.target.title});
            else
                chrome.runtime.sendMessage({url:ev.target.href});
        }else {
            alert('Please login into extension to download video.')
        }
    });
}

function dynamic_sort(property) {
    var sortOrder = 1;
    if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a, b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

const wistiaRequestUrl = "https://fast.wistia.net/embed/iframe/";

function add_wistia_download_button(_document, before_element, assets) {
    let div = _document.createElement("div");
    div.setAttribute("class", "__wd-dropdown__");
    div.setAttribute("style", "float:left; z-index: 100; position: absolute;");
    let btn = _document.createElement("button");
    btn.setAttribute("class", "__wd-dropbtn__");
    btn.innerText = "Download";
    div.appendChild(btn);

    let div_content = _document.createElement("div");
    div_content.setAttribute("class", "__wd-dropdown-content__");
    div_content.setAttribute("style", "left:0;");

    let added = [];
    assets.sort(dynamic_sort("-display_name"));
    for (i in assets) {
        if ((assets[i].ext == "mp4" || assets[i].ext == "m4v") && !added.includes(assets[i].display_name)) {
            var link = _document.createElement("a");
            let url = assets[i].url;
            url = url.replace(".bin", ".mp4");
            link.setAttribute("href", url);
            link.setAttribute("download", "");
            link.setAttribute("class", "download_link");
            link.setAttribute("target", "_blank");
            link.addEventListener('click', downloadLink);
            link.addEventListener('contextmenu', downloadLink);
            if(assets[i].ext != "mp4"){
                link.innerText = assets[i].display_name.toUpperCase();
            } else {
                link.innerText = assets[i].ext.toUpperCase() + " " + assets[i].display_name.toUpperCase();
            }
            div_content.appendChild(link);
            added.push(assets[i].display_name);
        }
    }
    if(before_element == null){
        return;
    }
    div.appendChild(div_content);
    if (before_element.hasAttribute("id")) {
        if (before_element.getAttribute("id").indexOf("wistia_chrome_") > -1) {
            before_element.style.verticalAlign = "inherit";
            before_element = before_element.parentNode;
        }
    }
    
    before_element.insertBefore(div, before_element.firstChild);
}

function add_vimeo_download_button(_this, before_element, vimeoJSON) {
    let div = _this.document.createElement("div");
    div.setAttribute("class", "__wd-dropdown__");
    div.setAttribute("style", "float:left; z-index: 100;");
    let btn = _this.document.createElement("button");
    btn.setAttribute("class", "__wd-dropbtn__");
    btn.innerText = "Download";
    div.appendChild(btn);

    let div_content = _this.document.createElement("div");
    div_content.setAttribute("class", "__wd-dropdown-content__");
    div_content.setAttribute("style", "left:0;");

    var vimeoDownloadArray = vimeoJSON.request.files.progressive;
    vimeoDownloadArray.sort(vimeoDownloadCompare).reverse();
    vimeoDownloadArray.forEach(function (e) {
        let url = e.url;
        if(url.includes('?'))
            url = url.substring(0, url.indexOf('?'));
        var element = _this.document.createElement('a');
        element.innerHTML = "<a download href='" + url + "' target='_blank' title='Download " + e.quality + " with " + e.fps + "fps'>MP4 " + e.quality + "</a>";
        element.addEventListener('click', downloadLink);
        element.addEventListener('contextmenu', downloadLink);
        div_content.appendChild(element);
    });
    div.appendChild(div_content);
    before_element.insertBefore(div, before_element.firstChild);
}

function extract_wistia_object(html) {
    let content = html;
    let index_of_json = content.indexOf("({") + 1;
    content = content.substring(index_of_json, content.lastIndexOf("}}") + 2);

    try {
        return JSON.parse(content);
    } catch {
        return null;
    }
}

function extract_vimeo_object(html) {
    let content = html;
    let search_for = "var config = {";
    let index_of_json = content.indexOf(search_for) + search_for.length - 1;
    content = content.substring(index_of_json);
    content = content.substring(0, content.indexOf("};") + 1);
    return JSON.parse(content);
}

function get_inline_wistia_videos_id(elements) {
    let ids = [];

    for (var element of elements) {
        if (element.innerHTML.includes("__wd-dropdown__")) {
            continue;
        }
        let url = location.href;
        if(url.includes("fast.wistia.net/embed") || (url.includes("wistia.com") && url.includes("/medias/"))){
            if(url.includes("?"))
                url = url.substring(0, url.indexOf("?"));
            if(url.includes("/")){
                let videoId = url.substring(url.lastIndexOf("/") + 1);
                let obj = {};
                obj.id = videoId;
                obj.element = element;
                ids.push(obj);
                continue;
            }
        }
        if (element.hasAttribute("id") && element.hasAttribute("class")) {
            let el_class = element.getAttribute("class");
            let el_id = element.getAttribute("id");
            if (el_class.indexOf("wistia_async_") > -1) {
                let id_index = el_class.indexOf("wistia_async_") + 13;
                let id = el_class.substring(id_index);
                id = id.substring(0, id.indexOf(" "));

                let obj = {};
                obj.id = id;
                obj.element = element;
                ids.push(obj);
            } else if(el_class.indexOf("wistia_") > -1 && element.hasAttribute("data-track-progress")) {
                let id_index = el_id.indexOf("wistia_") + 7;
                let id = el_id.substring(id_index);
                
                let obj = {};
                obj.id = id;
                obj.element = element;
                ids.push(obj);
            } else if(el_id.indexOf("wistia_") > -1 && el_class.includes("wistia_embed")) {
                let id_index = el_id.indexOf("wistia_") + 7;
                let id = el_id.substring(id_index);

                let obj = {};
                obj.id = id;
                obj.element = element;
                ids.push(obj);
            }
        }
    }
    return ids;
}

function process_inline_wistia_videos(_document, elements) {
    let ids = get_inline_wistia_videos_id(elements);

    for (i in ids) {
        (function (i) {
            const xhr = new XMLHttpRequest();
            const url = wistiaRequestUrl + ids[i].id.toString();
            xhr.open("GET", url);
            xhr.send();
            xhr.onreadystatechange = (e) => {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    let response = xhr.responseText;
                    let sources = extract_wistia_object(response);
                    if (sources) {
                        add_wistia_download_button(_document, ids[i].element.firstChild, sources.assets);
                    }
                }
            }
        })(i);
    }
}

function get_inline_vimeo_videos_id(elements) {
    let ids = [];
    for (i in elements) {
        if (elements[i].style.display == "none") {
            continue;
        }

        let config = elements[i].getAttribute("data-config-url");
        let id_index = config.indexOf("/video/") + 7;
        let id = config.substring(id_index, config.indexOf("/", id_index));
        let obj = {};
        obj.id = id;
        obj.element = elements[i].parentNode;
        ids.push(obj);
    }
    return ids;
}

function process_inline_vimeo_videos(_this, elements) {
    let ids = get_inline_vimeo_videos_id(elements);

    for (i in ids) {
        (function (i) {
            chrome.runtime.sendMessage({provider: "vimeo", id: ids[i].id.toString()}, response => {
                let sources = JSON.parse(response);
                add_vimeo_download_button(this, ids[i].element, sources); 
            });
        })(i);
    }
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

function inject(source) {
    const j = document.createElement('script'),
      f = document.getElementsByTagName('script')[0];
    j.textContent = source;
    f.parentNode.insertBefore(j, f);
    f.parentNode.removeChild(j);
}

function getJWJSVar(whichVar){
    const dummyId = "__wd-jw-dummy__";
    let oldDummy = document.getElementById(dummyId);
    if(oldDummy)
        oldDummy.parentNode.removeChild(oldDummy);

    let objs = [];
    let dummy = document.createElement("div");
    dummy.id = dummyId;
    dummy.style.display = "none";

    for (let obj of whichVar.allSources) {
        objs.push(
            { 
                type: obj.type, 
                height: obj.height,
                mimeType: obj.mimeType,
                file: obj.file
            });
    }

    dummy.setAttribute("data", JSON.stringify(objs));
    document.body.insertBefore(dummy, document.body.firstChild);
}

function add_videojs_download_button(video_container){
    let div = document.createElement("div");
    div.setAttribute("class", "__wd-dropdown__");
    div.setAttribute("style", "float:left; z-index: 100; margin-right: 15px; font-size:14px");
    let btn = document.createElement("button");
    btn.setAttribute("class", "__wd-dropbtn__");
    btn.setAttribute("style", "background-color: #4CAF50");
    btn.innerText = "Download";
    div.appendChild(btn);
    btn.addEventListener("click", function(e){
        e.preventDefault();

        let vid = video_container.getElementsByTagName("SOURCE");
        if(vid.length < 1){
            vid = video_container.getElementsByTagName("VIDEO");
            if(vid.length < 1)
                return;
            vid = vid[0];
        } else {
            vid = vid[0];
        }

        let src = vid.getAttribute("src");
        if(src && !src.includes("blob:")){
            chrome.storage.sync.get("user", function (obj) {
                if (obj.user) {
                    chrome.runtime.sendMessage({url:src});
                }else {
                    alert('Please login into extension to download video.')
                }
            });
        }
    });
    video_container.insertBefore(div, video_container.firstChild);
}

function add_jw_download_button(before_element, sources) {
    let div = document.createElement("div");
    div.setAttribute("class", "__wd-dropdown__");
    div.setAttribute("style", "float:left; z-index: 100;");
    let btn = document.createElement("button");
    btn.setAttribute("class", "__wd-dropbtn__");
    btn.innerText = "Download";
    div.appendChild(btn);

    let div_content = document.createElement("div");
    div_content.setAttribute("class", "__wd-dropdown-content__");
    div_content.setAttribute("style", "left:0;");

    for (let source of sources){
        if(source.type !== "mp4" || source.height < 1 || (source.mimeType && source.mimeType.includes("audio")))
            continue;

        var element = document.createElement('a');
        element.setAttribute("href", source.file);
        if(source.height)
            element.innerHTML = "MP4 " + source.height + "P";
        else 
            element.innerHTML = "MP4";
        element.addEventListener('click', downloadLink);
        element.addEventListener('contextmenu', downloadLink);
        div_content.appendChild(element);
    }
    
    div.appendChild(div_content);
    before_element.insertBefore(div, before_element.firstChild);
}

function addVimeoPlaylistDownloadButton(clips) {
    let div = document.createElement("div");
    div.setAttribute("class", "__wd-dropdown__");
    div.setAttribute("style", "float:right; z-index: 100; width:100px;");
    let btn = document.createElement("button");
    btn.setAttribute("class", "__wd-dropbtn__");
    btn.innerText = "Download";
    div.appendChild(btn);

    let div_content = document.createElement("div");
    div_content.setAttribute("class", "__wd-dropdown-content__");
    div_content.setAttribute("style", "left:0;");

    clips.forEach(function (clip) {
        var element = document.createElement('a');
        element.setAttribute("href", "#");
        element.innerText = clip.title;
        element.setAttribute("title", clip.title + ".mp4");

        element.addEventListener('click', async function (ev) {
            ev.preventDefault();

            let currentHref = element.getAttribute("href");
            if(currentHref !== "#") {
                downloadLink(ev);
                return;
            }

            let oldText = element.innerText;
            element.innerText = "Preparing...";

            var response = await fetch(clip.config);
            var sources = await response.json();

            element.setAttribute("href", sources.request.files.progressive[0].url);

            downloadLink(ev);
            element.innerText = oldText;
        });

        element.addEventListener('contextmenu', downloadLink);
        div_content.appendChild(element);
    });

    div.appendChild(div_content);

    let container = document.getElementsByClassName("player_container");
    if(!container || container.length == 0)
        return;

    container = container[0];
    container.insertBefore(div, container.firstChild);
}


window.onload = async function () {
    if(this.document.body.innerHTML.indexOf("iframeBlocker") > -1){
        var blockers = document.getElementsByClassName("iframeBlocker");
        for(var i = 0; i < blockers.length; i++){
            blockers[i].addEventListener("click", function()
            {
                this.parentNode.removeChild(this);
            });
        }
    }

    if(location.host === "wistia.com") {
        var embeds = Array.from(document.getElementsByClassName("wistia_embed"));
        
        process_inline_wistia_videos(document, embeds);
    }

    if(location.host === "vimeo.com"){
        let vimeo_container = document.getElementsByClassName("player_container");
        if(vimeo_container && vimeo_container.length > 0){
            vimeo_container = vimeo_container[0];

            let firstChild = vimeo_container.firstElementChild;
            let args = firstChild.getAttribute("data-config-url");
            if(args) {
                chrome.runtime.sendMessage({ provider: "vimeo", args: args }, response => {
                    let sources = JSON.parse(response);
                    add_vimeo_download_button(this, vimeo_container, sources); 
                });
            }
            else {
                // extract iframe playlist data
                let appData = document.getElementById("app-data");
                if(appData) {
                    let json = appData.innerHTML;
                    let playlistData = JSON.parse(json);

                    if(playlistData.clips)
                        addVimeoPlaylistDownloadButton(playlistData.clips);
                }
            }
        }
    }
    else {
        if (this.location.href.indexOf("player.vimeo.com/video/") > -1) {
            let content = this.document.documentElement.innerHTML;
            let sources = extract_vimeo_object(content);

            let player = this.document.getElementById("player");
            add_vimeo_download_button(this, player.parentNode, sources);
        }

        let vimeo_players = getElementsByXPath("//div[contains(@data-config-url, 'player.vimeo.com/video/')]");
        if (vimeo_players.length > 0) {
            process_inline_vimeo_videos(this, vimeo_players);
        }
    }
    
    document.addEventListener('mouseover', async function(e){
        if(e.target.tagName === "DIV"){
            if(e.target.classList.contains("w-vulcan--background")) {
                if(e.target.hasAttribute("__wd-processed__"))
                    return;

                var embeds = Array.from(document.getElementsByClassName("wistia_embed"));
                
                process_inline_wistia_videos(document, embeds);
            }
            else if (e.target.classList.contains("vjs-poster")){
                if(e.target.hasAttribute("__wd-processed__"))
                    return;
                let vid = e.target.parentNode.getElementsByTagName("SOURCE");
                if(!vid || vid.length < 1){
                    vid = e.target.parentNode.getElementsByTagName("VIDEO");
                    if(vid.length < 1)
                        return;
                    vid = vid[0];
                } else {
                    vid = vid[0];
                }
                
                if(!vid.hasAttribute("src") || vid.getAttribute("src").includes("blob:"))
                    return;
                e.target.setAttribute("__wd-processed__", "");
                add_videojs_download_button(e.target.parentNode);
            }
            else if(e.target.classList.contains("vp-target")) {
                if(location.host === "vimeo.com" && location.href.includes("/review/")) {
                    if(e.target.hasAttribute("__wd-processed__"))
                        return;
    
                    let match = location.href.match(/\/review\/(.+)\//);
                    if(match) {
                        e.target.setAttribute("__wd-processed__", null);
                        chrome.runtime.sendMessage({ provider: "vimeo", id: match[1] }, response => {
                            let sources = JSON.parse(response);
                            add_vimeo_download_button(window, e.target.parentNode.parentNode, sources); 
                        });
                    }
                }
                else if(location.host === "vimeo.com"){
                    if(e.target.hasAttribute("__wd-processed__"))
                        return;

                    let playerIdentifier = document.getElementsByTagName("STYLE");
                    if(playerIdentifier.length != 0) {
                        let playerId = null;
                        for(let identifier of playerIdentifier){
                            if(identifier.hasAttribute("data-player")){
                                playerId = "player" + identifier.getAttribute("data-player");
                                break;
                            }
                        }
            
                        if(playerId == null) return;
            
                        let url = document.location.href;
                        let match = url.match(/vimeo\.com\/(.+?)\/(.+)\?/);
            
                        if(!match) return;
            
                        e.target.setAttribute("__wd-processed__", null);
                        let id = match[1];
                        let secondaryId = match[2];
                        chrome.runtime.sendMessage({ provider: "vimeo", id: id, secondaryId: secondaryId}, response => {
                                let sources = JSON.parse(response);
                                add_vimeo_download_button(window, document.getElementById(playerId).parentElement, sources); 
                        });
                    }
                    else {
                        let hrefMatch = location.href.match(/\..+\/(.+)\/.+/);
                        if(hrefMatch){
                            e.target.setAttribute("__wd-processed__", null);
                            chrome.runtime.sendMessage({ provider: "vimeo", id: hrefMatch[1] }, response => {
                                let sources = JSON.parse(response);
                                add_vimeo_download_button(window, e.target.parentNode.parentNode, sources); 
                            });
                        }
                    }
                }
            }
        }
        else if(e.target.tagName == "VIDEO") {
            if (e.target.classList.contains("jw-video")){
                if(e.target.hasAttribute("__wd-processed__"))
                    return;

                let ancestor = e.target.closest("[class^=jwplayer]");
                if(!ancestor)
                    return;
                let playerId = ancestor.getAttribute("id");
                inject('(' + getJWJSVar.toString() + ')(jwplayer("' + playerId + '").getPlaylist()[0])');

                let dummy = document.getElementById('__wd-jw-dummy__');
                if(!dummy)
                    return;
                if(dummy.hasAttribute("data")) {
                    e.target.setAttribute("__wd-processed__", "");
                    let sources = JSON.parse(dummy.getAttribute("data"));

                    add_jw_download_button(e.target.parentNode, sources);
                }
            }
        }
        
    });
}

function getURLParameter(parameter) {
    let url = new URL(location.href);
    return url.searchParams.get(parameter);
}

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    if (msg != 'url_update') {
        return;
    }

    if(this.document.body.innerHTML.indexOf("iframeBlocker") > -1){
        var blockers = document.getElementsByClassName("iframeBlocker");
        for(var i = 0; i < blockers.length; i++){
            blockers[i].addEventListener("click", function()
            {
                this.parentNode.removeChild(this);
            });
        }
    }
});