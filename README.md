# Leetcode-bookmark

### Why was this made?
Leetcode doesn't have the feature bookmark posts yet. 
So I try saving the posts as bookmarks. It sometimes get time consuming to navigate through the folders to find the saved post.

### what it does?
It adds an icon for saving the post as a bookmark beside the title of the post. All the posts bookmarked through this icon gets stored in a specific folder. And we can easily access the bookmarks via extension popup.

### How to use it?
1. clone this repository.
2. Open the Extension Management page by navigating to chrome://extensions
3. Enable Developer Mode by clicking the toggle switch next to Developer mode.
4. Click the LOAD UNPACKED button and navigate to the cloned repository and select the folder ```leetcode-bookmark```

You can now see a new extension will be added. You will also see a new bookmarks folder will be created named ```LeetcodeFiles```.
If you can't see the star icon try refreshing the page.

### Disadvantages:
1. The load time is hardcoded to 4sec. I couldn't figure out any other way. PRs/Suggestions are welcomed.
2. We cannot remove a already marked bookmark from popup. ( To do so, you will have to refresh the extension)
