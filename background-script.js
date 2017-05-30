function waitForGrabVerse(response, someFunction){
	if (typeof response !== "undefined"){
		someFunction(response);
	}
	else {
		setTimeout(waitForGrabVerse, 500);
	}
}

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		//console.log(request);
		if (request) {
			var response = grabVerseTwo(request);
			response.then(sendResponse(response));

	  	}
	  	//return true;
	});

function grabVerseTwo(request) {
	return new Promise(function(resolve, reject) {
		let parsedRequest = JSON.parse(request);
		//let url = 
		let abbObj = parsedRequest.abbObjGNRL;
		let book = abbObj.book;
			if (book) {book = book.replace(" ", "%20");};
		let chapterStart = abbObj.chapterStart;
		let verseStart = abbObj.verseStart;
			if (verseStart) {verseStart = verseStart.match(/\d+/g)[0];};
		let verseEnd = abbObj.verseEnd;
		let tbc = abbObj.tbc;
		$.ajaxSetup({processData: false});
		let url = "http://biblia.deon.pl/otworz.php?skrot=" + book + "%20" + chapterStart;
		let site = $.get(url, function(data) {
			//console.log(typeof data);
			console.log(data);
			resolve(encodeURIComponent(data));
		});
		//console.log(site);
	})
}

// function grabVerse(response, trigger, passedSiteHTML) {
// 	let parsedResponse = JSON.parse(response);
// 	let abbObjBS = parsedResponse.abbObjGNRL;
// 	let book = abbObjBS.book;
// 		if (book) {book = book.replace(" ", "%20");};
// 	let chapterStart = abbObjBS.chapterStart;
// 	let verseStart = abbObjBS.verseStart;
// 		//console.log(verseStart);
// 		if (verseStart) {verseStart = verseStart.match(/\d+/g)[0];};
// 		// index zero because we're grabbing the typical case here TODO: make it work with other flavors
// 	let verseEnd = abbObjBS.verseEnd;
// 	let tbc = abbObjBS.tbc;
// 	let versesMap = new Map();
// 	let verses = null;
// 	$.ajaxSetup({
//   		processData: false
// 		});
// 	if (trigger == true) {
// 		let theHTML = passedSiteHTML;
// 		if (theHTML) {
// 			toMatch = new RegExp(verseStart + '&nbsp;\\<\\/span\\>.*\\<a name="W' + verseEnd, 'g');
// 			verses = theHTML.match(toMatch);
// 			}
// 		console.log(verses, trigger);
// 		return verses;
// 	}
// 	else {
// 	var dataOutside = null;
// 	$.get("http://biblia.deon.pl/otworz.php?skrot=" + book + "%20" + chapterStart, function(data) {
// 							//toReturn = grabVerse(response, true, data);
// 							dataOutside = data;
// 						});
// 	return grabVerse(response, true, dataOutside);
// 	};
// }