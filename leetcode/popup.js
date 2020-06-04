console.log("listening");

var port = chrome.extension.connect({
    name: "Sample Communication"
});

port.onMessage.addListener(function(msg) {
    console.log(msg.displaybookmark);
    let element = document.getElementById("bookmarks")
    let d = element.innerHTML + "<ul>" + "</ul>";
    for(let  i=0;i<msg.displaybookmark.length ; ++i){
        d += "<li> <a href= ' " + msg.displaybookmark[i].url + "' target='_blank'>" + msg.displaybookmark[i].title + "</a></li>";
    }
    element.innerHTML = d;
});