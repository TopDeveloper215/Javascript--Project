function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function addButton(video_container, isLast){
    let div = document.createElement("div");
    div.id = "__wd-container__";
    div.setAttribute("class", "__wd-dropdown__");
    div.setAttribute("style", "float:left; z-index: 100; margin-right: 15px;");
    let btn = document.createElement("button");
    btn.setAttribute("class", "__wd-dropbtn__");
    btn.innerText = "Download";
    div.appendChild(btn);
    btn.addEventListener("click", function(e){
        e.preventDefault();
        let video = document.getElementsByTagName("VIDEO");
        if(!video) return;
    
        video = video[0];
        let src = video.getAttribute("src");
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
    if(!isLast)
        video_container.insertBefore(div, video_container.firstChild);
    else 
        insertAfter(div, video_container.lastChild);
}

function processElement(element){
    if(element.hasAttribute("__wd-processed__"))
        return;

    element.setAttribute("__wd-processed__", "");
    let prev = document.getElementById("__wd-container__");
    if(prev)
        prev.parentNode.removeChild(prev);
    
    let video = element;
    let src = video.getAttribute("src");
    if(src && !src.includes("blob:")){
        let container = document.querySelector('.classroom-nav');
        if(container)
            addButton(container, true);
        else {
            container =  document.querySelector('.course-banner');
            if(container)
                addButton(container, true);
            else {
                container = document.querySelector(".vjs-control-bar");
                if(container)
                    addButton(container, true);
                else
                    addButton(video.parentNode, false);
            }
        }
    }
}

window.onload = function(){
    document.addEventListener('mouseover', function(e){
        if(e.target.tagName === "VIDEO"){
            processElement(e.target);
        }
    });
}