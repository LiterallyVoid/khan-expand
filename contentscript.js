
var observer = new MutationObserver(function(mutations) {
    var el = document.getElementById("scratchpad-code-editor-tab");
    if(el) {
	var s = document.createElement('script');
	s.setAttribute('asset-url', chrome.runtime.getURL('assets/'));
	s.src = chrome.runtime.getURL('script.js');
	s.onload = function() {
	    this.remove();
	};
	(document.head || document.documentElement).appendChild(s);
	
	observer.disconnect();
    }
});

var config = {
    "childList": true, 
    "subtree": true
};

observer.observe(document.body, config);
