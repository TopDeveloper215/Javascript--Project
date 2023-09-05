chrome.runtime.onMessage.addListener(function (arg, sender, sendResponse) {
    const wistiaRequestUrl = "https://fast.wistia.net/embed/iframe/";
    const vimeoRequestUrl = "https://player.vimeo.com/video/{id}/config";
    const vimeoRequestHUrl = "https://player.vimeo.com/video/{id}/config?h={secondaryId}";
    const facebookRequestUrl = "https://www.facebook.com/video/video.php?v={id}"; //"https://www.facebook.com/watch/?v={id}";
    const facebookMobileRequestUrl = "https://m.facebook.com/video/video.php?v=";
    
    if(arg.filename){
        chrome.downloads.download({
            url: arg.url,
            filename: arg.filename
        });
    } else if(arg.url) {
        chrome.downloads.download({
            url: arg.url
        });
    } else if(arg.provider) {
        if(arg.provider === "vimeo"){
            let reqUrl = vimeoRequestUrl;
            if(arg.id && arg.secondaryId) {
                reqUrl = vimeoRequestHUrl.replace("{id}", arg.id).replace("{secondaryId}", arg.secondaryId);
            }
            else if(arg.id)
                reqUrl = reqUrl.replace("{id}", arg.id);
            else 
                reqUrl = arg.args;
            fetch(reqUrl)
                .then(response => response.text())
                .then(text => sendResponse(text));
        } else if(arg.provider === "facebook"){
            let reqUrl = facebookRequestUrl.replace("{id}", arg.id);
            fetch(reqUrl)
                .then(response => response.text())
                .then(text => sendResponse(text));
        } else if(arg.provider === "mfacebook"){
            let reqUrl = facebookMobileRequestUrl + arg.id;
            fetch(reqUrl)
                .then(response => response.text())
                .then(text => sendResponse(text));
        } else if(arg.provider === "udemy-api") {
            fetch(arg.href, {
               headers: arg.headers 
            })
                .then(response => response.json())
                .then(json => sendResponse(json));
        }
    } 
    
    return true;
});

/*chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if(changeInfo.status === "complete"){
        try {
            chrome.tabs.sendMessage(tabId, 'url_update');
            
        } catch (e) {}
    }
});*/