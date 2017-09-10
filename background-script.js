chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if (request) {
			var response = grabVerse(request);
			response.then(sendResponse(response));
		}
	});

function grabVerse(request) {
	return new Promise(function(resolve, reject) {
		let parsedRequest = JSON.parse(request);
		//let abbObj = parsedRequest.abbObj;
		let book = parsedRequest.abbObj.book;
			if (book) {book = book.replace(" ", "%20");};
		// let chapterStart = abbObj.chapterStart;
		// let verseStart = abbObj.verseStart;
		// let verseEnd = abbObj.verseEnd;
		// let letter = abbObj.letter;
		let charset = parsedRequest.charset;
		// let startMatchString = parsedRequest.startMatchString;
		// let endMatchString = parsedRequest.endMatchString;
		// let endOfTextString = parsedRequest.endOfTextString;
		var urlsToGet = parsedRequest.urlsToGet;
		var fetchedPages = [];
		var promises = [];
		$.ajaxSetup({
	        processData: false,
	        beforeSend: function(jqXHR) {
	            jqXHR.overrideMimeType('text/html;charset=' + charset);
        	}
    	});
    	//console.log(urlsToGet);
    	for (i in urlsToGet){
    		promises.push(new Promise(function(resolve, reject)
    			{let myGet = $.get(urlsToGet[i], function(fetchedData){
    				fetchedPages.push(fetchedData);
    				//console.log(fetchedPages);
    				myGet.then(function () {
   						resolve(fetchedData);
					});
    				// myGet.then(resolve(fetchedData)); 
    				//resolve(data);
    			})
    		}));
    	Promise.all(promises).then(function () {
   			resolve(fetchedPages);
			});
    	}
	})
}
