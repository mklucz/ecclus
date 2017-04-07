chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
	    console.log(sender);
	    if (request) {
	      console.log(request);
	      sendResponse({farewell: "goodbye"});
	  	}
	});


$('meta[name=charset]').remove();
$('head').append( '<meta charset="chujumuju">' , console.log("dalo sie"));
$(document).ready(console.log($('meta[name=charset]').value()));