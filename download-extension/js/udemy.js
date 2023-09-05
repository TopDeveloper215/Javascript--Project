function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }

      if (c.indexOf(name) == 0) 
        return c.substring(name.length, c.length);
    }
    return "";
}

const ApiUrl = "https://www.udemy.com/api-2.0/users/me/subscribed-courses/";

function getSource(callback) {
    const token = "Bearer " + getCookie("access_token");
    let headers = {
        "accept": "application/json, text/plain, */*",
        "accept-language": "en-US,en;q=0.9",
        "authorization": token,
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-requested-with": "XMLHttpRequest",
        "x-udemy-authorization": token,
        "x-udemy-cache-brand": getCookie("ud_cache_brand"),
        "x-udemy-cache-device": "desktop",
        "x-udemy-cache-language": getCookie("ud_cache_language"),
        "x-udemy-cache-logged-in": getCookie("ud_cache_logged_in"),
        "x-udemy-cache-marketplace-country": getCookie("ud_cache_marketplace_country"),
        "x-udemy-cache-modern-browser": getCookie("ud_cache_version"),
        "x-udemy-cache-price-country": getCookie("ud_cache_price_country"),
        "x-udemy-cache-release": getCookie("ud_cache_release"),
        "x-udemy-cache-user": getCookie("ud_cache_user"),
        "x-udemy-cache-version": getCookie("ud_cache_version")
    };

    let courseInfo = document.querySelector("div[data-module-id='course-taking']");
    let courseJson = courseInfo.getAttribute("data-module-args");
    let course = JSON.parse(courseJson);

    let lectureMatch = document.URL.match(":\/\/.*\/(.*?)#");
    if(!lectureMatch)
        return;
    let lectureId = lectureMatch[1];    

    chrome.runtime.sendMessage({
        provider: "udemy-api", 
        href: ApiUrl + course.courseId + "/lectures/" + lectureId + "/?fields[lecture]=asset,title&fields[asset]=stream_urls,title",
        headers: headers
    }, callback);
}

function addButton(video_container, isLast){
    let div = document.createElement("div");
    div.id = "__wd-container__";
    div.setAttribute("class", "__wd-dropdown__");
    div.setAttribute("style", "float:left; z-index: 100; margin: 0px 10px 0px 10px;");
    let btn = document.createElement("button");
    btn.setAttribute("class", "__wd-dropbtn__");
    btn.innerText = "Download";
    div.appendChild(btn);

    let titleContainer = document.querySelector('li[aria-current="true"]');
    btn.addEventListener("click", function(e){
        e.preventDefault();
        let video = document.getElementsByTagName("VIDEO");
        if(!video) return;
    
        video = video[0];
        let src = video.getAttribute("src");
        if(!src)
            return;
        
        chrome.storage.sync.get("user", function (obj) {
            if (obj.user) {
                btn.innerText = "Loading...";
                if(!src.includes("blob:")) {
                    getSource((obj) => {
                        const video = obj.asset.stream_urls.Video.find(v => v.type === "video/mp4");
                        if(!video) {
                            btn.innerText = "Not found";
                            return;
                        }
                        chrome.runtime.sendMessage({url: video.file, filename: obj.title + " " + video.label + "P.mp4"});
                        btn.innerText = "Download";
                    });
                }
                else {
                    if(!titleContainer)
                        chrome.runtime.sendMessage({url:src});
                    else {
                        let title = titleContainer.firstChild.innerText.split('\n')[0];
                        chrome.runtime.sendMessage({url: src, filename: title + ".mp4"});
                    }
                    btn.innerText = "Download";
                }
            }
            else
                alert('Please login into extension to download video.');
        });
    });

    if(!isLast)
        video_container.insertBefore(div, video_container.firstChild);
    else 
        insertAfter(div, video_container.lastChild);
}

window.onload = function(){
    document.addEventListener('mouseover', function(e){
        if(e.target.tagName === "VIDEO"){
            if(e.target.hasAttribute("__wd-processed__"))
                return;

            e.target.setAttribute("__wd-processed__", "");
            let prev = document.getElementById("__wd-container__");
            if(prev)
                prev.parentNode.removeChild(prev);
            
            let video = e.target;
            let src = video.getAttribute("src");
            if(!src)
                return;

            let container = document.querySelector('div[data-purpose="settings-menu"]');
            if(container)
                addButton(container.parentNode, true);
            else 
                addButton(video.parentNode, false);
        }
    });
}