(function () {
function getLanguage() {
	// placeholder
	return window.ecclus.worker;
}

function getTranslation() {
	//placeholder
	return window.ecclus.worker.translations.deon;
}

var searchForAbbreviations = null;
var addQuotations = null;
var makeLink = null;
var fetchVerse = null;

function detectAbbreviation(node) {
	if (node.hasChildNodes()) {
		for (var i = 0; i < node.childNodes.length; i++) {
			detectAbbreviation(node.childNodes[i]);
			} 
	    }
	var text = node.innerHTML;
    if (text != undefined) {
    	//console.log(text);
    	//console.log(window.ecclus.searchForAbbreviations);
		var abbreviations = window.ecclus.searchForAbbreviations(text);
    	//console.log(abbreviations);
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

window.ecclus = window.ecclus || {};
window.ecclus.escapeRegExp = escapeRegExp;
window.ecclus.replaceAll = replaceAll;

$(document).ready(function() {
	var lang = getLanguage();
	var translation = getTranslation();
	//console.log(lang)
	//console.log(translation)
	window.ecclus.searchForAbbreviations = lang.searchForAbbreviations;
	//addQuotations          = lang.addQuotations;
	window.ecclus.booksMap               = lang.booksMap;
	window.ecclus.extractIndividualNums  = lang.extractIndividualNums
	window.ecclus.makeLink               = translation.makeLink;
	window.ecclus.fetchVerse             = translation.fetchVerse;
	window.ecclus.addQuotations          = translation.addQuotations;
	window.ecclus.extractVerse           = translation.extractVerse;
	detectAbbreviation(document.body);
});
})();
