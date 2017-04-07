
var langPack = null;

function getLanguage() {
	// placeholder
	return "pl"
}

function detectAbbreviation(node) {
	if (node.hasChildNodes()) {
		for (var i = 0; i < node.childNodes.length; i++) {
			detectAbbreviation(node.childNodes[i]);
			} 
	    }
	var text = node.textContent;
	    if (text != undefined) {
			var abbreviations = searchForAbbreviations(text);
			if (abbreviations) {
				addQuotations(node, abbreviations);
		    }
		}
}	

function addQuotations(node, abbs) {
    /**
     * Takes in a piece of text and the Bible references (Latin "sigla")
     * detected by searchForAbbreviations function and returns the same 
     * piece of text, but with the references replaced with links.
     * 
     * text is the innerHTML of the node currently being processed
     * abbs is the dictionary containing abbreviations to add tooltips
     * and links to
     * 
     * /^((?! <a).*Iz 42, 1-6.*(?!<\/a>).)/g
     * This regex should be what we're looking for
     */
    for (let key of abbs.keys()) {
		//regexp = "/^((?! <a).*" + key + ".*(?!<\/a>).)/g";
		//console.log(regexp);
		/** For some reason Ł in "Łk" gets lost, somehow, it's not that big of a problem, 
		 * in Polish it's fine to use just the "k", as for other languages, we'll
		 * cross that bridge when we get there.
		 */
		
		if (node.innerHTML) { //add a test to see if it's not a script or something else that we shouldn't mess up
			node.innerHTML = node.innerHTML.replace(key, makeLink(key, abbs.get(key)));
		}
	}
    return null
    }

function makeLink (key, abbObj) {
	let book = abbObj.book;
	let chapter = abbObj.chapter;
	let verseStart = abbObj.verseStart;
	let verseEnd = abbObj.verseEnd;
	let tbc = abbObj.tbc;
	return "<a href=http://biblia.deon.pl/otworz.php?skrot=" + book + "%20" + chapter + "#W" + verseStart + ">" + key + "</a>";
}

function fetchVerse (key, abbObj) {
	let book = abbObj.book;
	let chapter = abbObj.chapter;
	let verseStart = abbObj.verseStart;
	let verseEnd = abbObj.verseEnd;
	let tbc = abbObj.tbc;
	return null
}


$(document).ready(function() {
    //console.log($('head'));
   importLanguagePack(function () {
        var searchForAbbreviations = window.wrappedJSObject.searchForAbbreviations;
        console.log($.isEmptyObject(langPack));
        detectAbbreviation(document.body);
        //console.log(langPack);
   });
   
});

document.addEventListener('langPackEvent', function(event, data) {
	//console.log(event.detail);
	langPack = event.detail;
	//console.log(window.wrappedJSObject.drugiTesting());
	//var drugi = window.wrappedJSObject.drugiTesting;
	//drugi();
	//console.log(langPack);
	var searchForAbbreviations = window.wrappedJSObject.searchForAbbreviations;
});

function importLanguagePack(callback) {
    document.addEventListener('languageLoaded', function(event, data) {
        //console.log(event.detail.dictionary);
        //console.log(data)
        var temp = event.detail.dictionary;
        //langPack = event.detail.dictionary;
        //console.log($.isEmptyObject(langPack));
        //console.log(langPack);
        var searchForAbbreviations = window.wrappedJSObject.searchForAbbreviations;
        document.dispatchEvent(new CustomEvent('langPackEvent', {'detail' : temp}) )
        callback();
        
        //document.langPack.value = event;
    });
    var lang = getLanguage();
    var urlToLang = browser.extension.getURL("lang/" + lang + "/general.js");
    $.getScript(urlToLang);
    //require([urlToLang]);
    //return eventToReturn;
}
