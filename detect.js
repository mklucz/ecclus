(function () {
window.ecclus = window.ecclus || {};

var detectedBrowser = null;
if (navigator.userAgent.indexOf("Chrome") != -1) {
	detectedBrowser = "Chrome";
	}
else if(navigator.userAgent.indexOf("Firefox") != -1) {
	detectedBrowser = "Firefox";
}

window.ecclus.lang = null;
var searchForAbbreviations = null;
var addQuotations = null;
var makeLink = null;
var fetchVerse = null;

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.language) {
		//console.log("jezyk ", request);
		let settingLanguage = chrome.storage.local.set({language : request.language});
		//settingLanguage.then(null, onError);
	}
	else if (request.translation) {
		//console.log("tlumaczenie ", request);
		let settingTranslation = chrome.storage.local.set({translation : request.translation});
		//settingTranslation.then(null, onError);
	}
	else if (request.grabLanguage) {
		console.log(request);
		//sendResponse("lang trans")
		if (detectedBrowser == "Firefox") {
			let gettingLanguage = chrome.storage.local.get("language");
			let gettingTranslation = chrome.storage.local.get("translation");
			Promise.all([gettingLanguage, gettingTranslation]).then(values => {
				sendResponse(values);
				//sendResponse("nico")
				//console.log(values);
			});
		}
		else if (detectedBrowser == "Chrome") {
			let gettingLanguage = chrome.storage.local.get("language", function(response) {
				console.log(response);
			})
		}
	}
});

function setLanguage(l) {
	return eval("window.ecclus." + l);
}

function setTranslation(l, t) {
	return eval("window.ecclus." + l + ".translations." + t);
}

function detectAbbreviation(node) {
	if (node.hasChildNodes()) {
		for (var i = 0; i < node.childNodes.length; i++) {
			detectAbbreviation(node.childNodes[i]);
			} 
	    }
	var text = node.innerHTML;
    if (text != undefined) {
		var abbreviations = window.ecclus.searchForAbbreviations(text);
		if (abbreviations) {
			window.ecclus.addQuotations(node, abbreviations);
	    }
	}
}	

function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

function getCharset() {
	//console.log($( 'meta[name="charset"]' ).prevObject[0]);
	return $( 'meta[name="charset"]' );
}

function testing(){ console.log("testing") }

window.ecclus = window.ecclus || {};
window.ecclus.escapeRegExp = escapeRegExp;
window.ecclus.replaceAll = replaceAll;

$(document).ready(function() {


	if (detectedBrowser == "Firefox"){
		gettingLanguage = chrome.storage.local.get("language");
		gettingLanguage.then((retrievedLanguage) => {
			if (retrievedLanguage) {
				//window.ecclus.lang = setLanguage(retrievedLanguage.language);
				var lang = setLanguage(retrievedLanguage.language);
				var retLang = retrievedLanguage.language;
			}
			else {
				//window.ecclus.lang = setLanguage("pl");
				var lang = setLanguage("pl");
				var retLang = "pl";
			}
			
			gettingTranslation = chrome.storage.local.get("translation");
			gettingTranslation.then((retrievedTranslation) => {
				if (retrievedTranslation) {
					//console.log(retLang, retrievedTranslation);
					var translation = setTranslation(retLang, retrievedTranslation.translation);
				}
				else {
					var translation = setTranslation("pl", "deon");
				}

				window.ecclus.searchForAbbreviations = lang.searchForAbbreviations;
				window.ecclus.booksMap               = lang.booksMap;
				window.ecclus.extractIndividualNums  = lang.extractIndividualNums
				window.ecclus.makeLink               = translation.makeLink;
				window.ecclus.fetchVerse             = translation.fetchVerse;
				window.ecclus.addQuotations          = translation.addQuotations;
				window.ecclus.extractVerse           = translation.extractVerse;
				detectAbbreviation(document.body);
			})
		})
	}
	//else if (browser = )
});
})();
