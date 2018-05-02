var thisScript = document.currentScript;
var url = thisScript.getAttribute('asset-url');

var output;
setTimeout(function() {
    var editor = ace.edit(document.getElementsByClassName('scratchpad-editor')[0]);

    var mode = editor.session.$modeId;
    
    mode = mode.substr(mode.lastIndexOf('/') + 1);
    if(mode != 'html') {
	return;
    }
    output = document.getElementById('output-frame');
    var button = document.createElement('img');
    button.style.position = 'fixed';
    button.style.right = '30px';
    button.style.bottom = '20px';
    button.style.width = '30px';
    button.style.height = '30px';
    button.style.opacity = '0.5';
    button.style.zIndex = 1000000;
    button.style.cursor = 'pointer';
    button.src = url + 'expand.png';
    var origParent = output.parentNode;
    origParent.appendChild(button);
    var fullscreen = false;
    var properties = {
	position: "fixed",
	left: 0,
	right: 0,
	top: 0,
	bottom: 0
    };
    var popup;
    button.onclick = function() {
	if(fullscreen) {
	    popup.parentNode.removeChild(popup);
	    popup = null;
	    document.body.removeChild(button);
	    origParent.appendChild(button);
	}
	fullscreen = !fullscreen;
	if(fullscreen) {
	    button.src = url + 'retract.png';
	    output.style.display = "none";
	    var htmlDoc = editor.getValue();
	    output.style.display = "unset";
	    popup = document.createElement('table');
	    document.body.appendChild(popup);
	    
	    for(var i of ['border', 'cellspacing', 'cellpadding']) {
		popup.setAttribute(i, 0);
	    }
	    popup.style.margin = '0 auto';
	    popup.style.padding = 0;
	    popup.style.width = '100%';
	    popup.style.height = '100%';
	    var iframe = document.createElement('iframe');
	    iframe.src = 'data:text/html,' + encodeURIComponent(htmlDoc);
	    iframe.style.position = 'fixed';
	    iframe.style.left = iframe.style.right = iframe.style.top = iframe.style.bottom = 0;
	    iframe.style.width = '100%';
	    iframe.style.height = '100%';
	    iframe.style.zIndex = 999999;
	    popup.appendChild(iframe);
	    origParent.removeChild(button);
	    document.body.appendChild(button);
	    document.body.style.overflow = 'hidden';
	} else {
	    output.style.display = null;
	    button.src = url + 'expand.png';
	    document.body.style.overflow = null;
	}
    };
    console.log(button);
}, 100);
