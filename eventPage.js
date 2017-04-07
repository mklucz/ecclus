//$('meta[name=charset]').remove();
//$('head').append( '<meta name="description" content="this is new">' );
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender);
    if (request) {
      console.log(request);
      sendResponse({farewell: "goodbye"});
  	}
});
console.log("DUPA");