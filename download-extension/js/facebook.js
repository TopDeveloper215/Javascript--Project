const SDText = "MP4 SD";
const HDText = "MP4 HD";
const SDTitle = "Download SD";
const HDTitle = "Download HD";
const TheaterModeRegex = /facebook\.com\/.+\/videos\/(.+?)\/?$/;
const facebookTahoeRequestUrl = "https://www.facebook.com/video/tahoe/async/{id}/?chain=true&isvideo=true&payloadtype=primary";

function isNewDesign() {
    return document.getElementById("ssrb_root_start") ? true : false;
}

function downloadLink(ev) {
    ev.preventDefault();
    chrome.storage.sync.get("user", function (obj) {
        if (obj.user)
            chrome.runtime.sendMessage({ url: ev.target.href, filename: ev.target.title + ".mp4" });
        else 
            alert('Please login into extension to download video.');
    });
}

function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

window.onload = function() {
    let isNew = isNewDesign();

    document.addEventListener('mouseover', function(e) {
        if(isNew) {
            if(e.target && e.target.tagName == "DIV" && e.target.hasAttribute("role") && e.target.getAttribute("role") === "presentation"){
                let match = TheaterModeRegex.exec(document.URL);
                if(!match)
                    return;
                
                let videoID = match[1];
                if(e.target.parentNode.innerHTML.indexOf("__wd-dropdown__") > 0)
                    return;

                // these elements ensure that the target is a video
                // different regions might have different elements to identify a video
                let legacyAncestor = e.target.closest("div[data-pagelet='TahoeVideo']");
                let newAncestor = e.target.closest("div[data-instancekey]");
                if(!legacyAncestor && !newAncestor)
                    return;

                addNewBlankDownloadButton(e.target, videoID);
             }
        } 
        else {
            if(e.target && e.target.tagName === "VIDEO") {
                if(e.target.parentNode.innerHTML.indexOf("__wd-dropdown__") > 0)
                    return;
                
                addLegacyBlankDownloadButton(e.target.parentNode, e.target);
             }
             else if (e.target && e.target.tagName === "A"
                                && e.target.hasAttribute("ajaxify") 
                                && e.target.getAttribute("ajaxify").indexOf("/videos/") > 0) {
                if(e.target.parentNode.innerHTML.indexOf("__wd-dropdown__") > 0)
                    return;
                
                addLegacyBlankDownloadButton(e.target.parentNode, e.target);
            }
        }
    });
}

function extractLegacyDownloadUrls(text){
    let videos = {};
    let qualities = [
        "sd",
        "hd"
    ];
    let src_types = [
        "src",
        "src_no_ratelimit"
    ];
    for (quality in qualities){
        for (src_type in src_types){
            let searchTerm = '"' + qualities[quality] + '_' + src_types[src_type] + '":"(.+?)"';
            let match = text.match(searchTerm);
            if(match != null){
                let url = match[1];
                url = url.replace(/\\u0025/g, "%");
                url = url.replace(/\\/g, '').replace("&amp", "&").replace("&;", "&");
                videos[qualities[quality]] = url;
                continue;
            }

            searchTerm = qualities[quality] + '_' + src_types[src_type] + ':"(.+?)"';
            match = text.match(searchTerm);
            if(match != null){
                let url = match[1];
                url = url.replace(/\\u0025/g, "%");
                url = url.replace(/\\/g, '').replace("&amp", "&").replace("&;", "&");
                videos[qualities[quality]] = url;
            }
        }
    }

    if(!videos["sd"]){
        videos["sd"] = "NaN";
    }
    if(!videos["hd"]){
        videos["hd"] = "NaN";
    }
    return videos;
}

function getLegacyVideoID(parent){
    let ancestor = parent.closest("div[data-ft]");
    let url = document.URL;
    if(url.indexOf("/videos/") > -1) {
        if(url.indexOf("&theater") > -1) {
            let searchTerm = '\/videos\/.+?\/(.+?)\/\\?';
            let match = url.match(searchTerm);

            if(match != null)
                return match[1];
        }
        else {
            let searchTerm = '\/videos\/(.+?)\/';
            let match = url.match(searchTerm);

            if(match != null)
                return match[1];
        }
    }

    if(ancestor != null) {
        let json = ancestor.getAttribute("data-ft");
        if(json.indexOf("mf_story_key") > 0){
            if(ancestor.getAttribute("data-ft").indexOf("photo_id") < 0)
                return null;

            let json_object = JSON.parse(json);
            return json_object.mf_story_key;
        }
        else {
            let searchTerm = 'ajaxify=\"\/ajax.+?;id=(.+?)&';
            let match = parent.innerHTML.match(searchTerm);

            if(match != null)
                return match[1];
        }

        if(parent.firstChild.tagName.toLowerCase() == "a"){
            let searchTerm = '\/videos\/.+?\/(.+?)\/\\?';
            let match = parent.innerHTML.match(searchTerm);

            if(match != null)
                return match[1];
        }
    }

    return null;
}

function addNewBlankDownloadButton(parent, videoID) {
    let div = createDownloadButtonDiv();
    let button = createDownloadButtonElement();
    div.appendChild(button);

    let divContent = createDownloadButtonDivContent();

    div.appendChild(divContent);
    parent.insertBefore(div, parent.firstChild);

    button.addEventListener("click", function(ev) {
        if(divContent.childElementCount > 0)
            return;

        if(button.innerText === "Loading...") 
            return;

        button.innerText = "Loading...";
        chrome.runtime.sendMessage({provider: "facebook", id: videoID}, async response => {
            let revMatch = response.match(/client_revision["\']\s*:\s*(\d+),/);
            let rev = "3944515";
            if(revMatch)
                rev = revMatch[1];
            
            let fb_dtsgMatch = response.match(/"DTSGInitialData"\s*,\s*\[\]\s*,\s*{\s*"token"\s*:\s*"([^"]+)"/);
            let fb_dtsg = "";
            if(fb_dtsgMatch)
                fb_dtsg = fb_dtsgMatch[1];
                
            let pcMatch = response.match(/pkg_cohort["\']\s*:\s*["\'](.+?)["\']/);
            let pc = "PHASED:DEFAULT";
            if(pcMatch)
                pc = pcMatch[1];
            
            let titleMatch = response.match(/<title.+>(.+)<\/title>/);
            let title = "Facebook video #" + videoID;
            if(titleMatch)
                title = titleMatch[1];
            let reqUrl = facebookTahoeRequestUrl.replace("{id}", videoID);

            let data = {};
            data['__a'] = 1;
            data['__pc'] = pc;
            data['__rev'] = rev;
            data['fb_dtsg'] = fb_dtsg;
            const qs = Object.keys(data)
                                .map(key => `${key}=${data[key]}`)
                                .join('&');

            let tahoeResponse = await fetch(reqUrl, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: qs
            });

            let text = await tahoeResponse.text();
            let videos = extractLegacyDownloadUrls(text);
            
            if(videos["sd"] != "NaN")
                createAndAppendAnchor(divContent, button, videos["sd"], title, SDText);
    
            if(videos["hd"] != "NaN")
                createAndAppendAnchor(divContent, button, videos["hd"], title + " - HD", HDText);

            if(videos["sd"] === "NaN" && videos["hd"] === "NaN")
                createAndAppendNotFoundElement(divContent, button);
        });
    });
}

function addLegacyBlankDownloadButton(parent, videoElement){
    let div = createDownloadButtonDiv();
    let button = createDownloadButtonElement();
    div.appendChild(button);

    let divContent = createDownloadButtonDivContent();

    let videoID = getLegacyVideoID(parent);
    if(!videoID) {
        if(videoElement.hasAttribute("src")) {
            let src = videoElement.getAttribute("src");
            if(src.includes("blob:") || !src.includes(".mp4"))
                return;

            let style = "padding: 10px !important;";
            createAndAppendAnchor(divContent, button, src, SDTitle, SDText, style);

            div.appendChild(divContent);
            parent.insertBefore(div, videoElement);
        }
        
        return;
    }

    div.appendChild(divContent);
    insertAfter(div, parent.firstChild);

    button.addEventListener("click", function(ev) {
        if(divContent.childElementCount > 0)
            return;

        if(button.innerText === "Loading...") 
            return;

        button.innerText = "Loading...";
        addLegacyDownloadButton(divContent, button, true, videoID);
    });
}

function addLegacyDownloadButton(divContent, button, recursive, videoID){
    chrome.runtime.sendMessage({provider: "facebook", id: videoID}, response => {
        let videos = extractLegacyDownloadUrls(response);
        if(videos["sd"] != "NaN")
            createAndAppendAnchor(divContent, button, videos["sd"], SDTitle, SDText);
        
        if(videos["hd"] != "NaN")
            createAndAppendAnchor(divContent, button, videos["hd"], HDTitle, HDText);
        

        if(videos["sd"] === "NaN" && videos["hd"] === "NaN") {
            let og_video = response.match('<meta.*?property="og:video:url".*?content="([^"]*?)".*?>');
            if(og_video) {
                let href = og_video[1].replace(/&amp;/g, '&');
                createAndAppendAnchor(divContent, button, href, SDTitle, SDText);
            }
            else {
                if(recursive == true) {
                    chrome.runtime.sendMessage({provider: "mfacebook", id: videoID}, retryResponse => {
                        let retryMatch = retryResponse.match('\"contentUrl\":\"(.*?)\"');
                        if(retryMatch) {
                            let href = retryMatch[1].replace(/\\\/|\/\\/g, "/");
                            createAndAppendAnchor(divContent, button, href, SDTitle, SDText);
                        } 
                        else 
                            createAndAppendNotFoundElement(divContent, button);
                    });
                } 
                else 
                    createAndAppendNotFoundElement(divContent, button);
            }
        }
    });
}

function createDownloadButtonDiv() {
    let div = document.createElement("div");
    div.setAttribute("class", "__wd-dropdown__");
    div.setAttribute("style", "float:right; z-index: 100; margin-right: 20px;");

    return div;
}

function createDownloadButtonElement() {
    let button = document.createElement("button");
    button.setAttribute("class", "__wd-dropbtn__");
    button.innerText = "Download";

    return button;
}

function createDownloadButtonDivContent() {
    let div = document.createElement("div");
    div.setAttribute("class", "__wd-dropdown-content__");
    div.setAttribute("style", "left:0;");

    return div;
}

function createAnchor(href, title, text, style = "") {
    let anchor = document.createElement('a');
    anchor.setAttribute("href", href);
    anchor.setAttribute("target", "_blank");
    anchor.setAttribute("title", title);
    if(style)
        anchor.setAttribute("style", style);
    anchor.innerText = text;
    anchor.addEventListener('click', downloadLink);
    anchor.addEventListener('contextmenu', downloadLink);

    return anchor;
}

function createNotFoundElement() {
    let span = document.createElement('span');
    span.innerHTML = "<span>Not found</span>";
    
    return span;
}

function createAndAppendAnchor(parent, button, href, title, text, style = "") {
    let anchor = createAnchor(href, title, text, style);
    parent.appendChild(anchor);

    button.innerText = "Download";
}

function createAndAppendNotFoundElement(parent, button) {
    let element = createNotFoundElement();
    parent.appendChild(element);

    button.innerText = "Download";
}