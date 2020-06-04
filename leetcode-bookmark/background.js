

// checks whether the bookmark folder already exits 
let doesBookmarkFolderExist = (fn) => {
    chrome.bookmarks.search({
        title: "LeetcodeFiles"
    },(arr) => {
        if(arr.length > 0){
            fn(arr[0].id)
        }
        else{
            fn("nope")
        }    
    })
}

// get the id of parent folder
let getParentId = (fn) => {
    chrome.bookmarks.search({
        title: "LeetcodeFiles"
    },(arr) => {
        fn(arr[0].id)   
    })
}

// check whether the bookmark already exists
let doesBookmarkExist = (title,fn) => {
    chrome.bookmarks.search({
        url: title
    },(arr) => {
        if(arr.length > 0){
            fn("true")
        }
        else{
            fn("false")
        }    
    })
}

// create a bookmarks folder to store all the links
let createBookmarksFolder = (fn) => {
    chrome.bookmarks.create({
        parentId: "1",
        title: "LeetcodeFiles"
    }, (booknode) => {
        fn(booknode.id);
    })
}

// get the list of saved bookmarks
let getSavedBookmarks = (id,fn) => {
    chrome.bookmarks.getSubTree(
        id,
        (bookmarks) => {
            fn((bookmarks[0].children));
    })
}

// adds a bookmark to the folder
let addABookmark = (id,title,url,fn) => {
    chrome.bookmarks.create({
        parentId: id,
        title: title,
        url: url
    }, (booknode) => {
        fn({
            title: booknode.title,
            url: booknode.url
        });
    })

}

let createListofBookmarks = (bookmarks , fn) => {
    let displaybookmark = [];
    for(bookmark in bookmarks){
        displaybookmark.push({
            title: bookmarks[bookmark].title,
            url: bookmarks[bookmark].url
        })
    }
    fn(displaybookmark);
}

// send the list of bookmarks to popup.js
let getBookmarks = (id) => {
    getSavedBookmarks(id,(bookmarks) => {
        createListofBookmarks(bookmarks, (displaybookmark) => {
            chrome.extension.onConnect.addListener(function(port) {
                console.assert(port.name == "Sample Communication")
                if(port.name == "Sample Communication"){
                    port.postMessage({displaybookmark : displaybookmark});
                }
           })
        })
        
    });
}

// if exits retrieve all the data else create a new folder and get the list of bookmarks
doesBookmarkFolderExist((id) => {
    if(id === "nope"){
        createBookmarksFolder((id) => {
            getBookmarks(id);
        });
    }
    else{
        getBookmarks(id);
    }
    
})

// check bookmark exits
let checkBookmarkExist = (url,func) => {
    doesBookmarkExist(url, (ans) => {
        func(ans);
    })

}

//check marked or not
chrome.runtime.onConnect.addListener(function(port) {
    console.assert(port.name == "leetcodecon");
    if(port.name == "leetcodecon"){
        port.onMessage.addListener((msg) => {
            checkBookmarkExist(msg.url, (ismarked) => {
                port.postMessage({ismarked : ismarked});
            })
            return true;
        });
    }
    
  });


// add a bookmark
chrome.runtime.onConnect.addListener((port) =>{
    console.assert(port.name == "addBookmark");
    if(port.name== "addBookmark"){
        port.onMessage.addListener((msg) =>{
            getParentId((id) => {
                addABookmark(id,msg.title, msg.url, (added)=>{
                    let displaybookmark = []
                    displaybookmark.push(added)
                    chrome.extension.onConnect.addListener(function(port) {
                        console.assert(port.name == "Sample Communication")
                        if(port.name == "Sample Communication"){
                            port.postMessage({displaybookmark : displaybookmark});
                        }
                   })
                })
            })
        })
    }
})

