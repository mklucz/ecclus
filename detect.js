function getLanguage() {
	// placeholder
	return "pl";
}

function getTranslation() {
	//placeholder
	return "pl.translations.deon";
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
	var text = node.textContent;
    if (text != undefined) {
		var abbreviations = searchForAbbreviations(text);
		if (abbreviations) {
			addQuotations(node, abbreviations);
	    }
	}
}	

// function addQuotations(node, abbs) {
//     for (let key of abbs.keys()) {
// 		if (node.innerHTML) { //add a test to see if it's not a script or something else that we shouldn't mess up
// 			node.innerHTML = replaceAll(node.innerHTML, key, makeLink(key, abbs.get(key)));
// 			//node.innerHTML = node.innerHTML.replace(key, makeLink(key, abbs.get(key)));
// 		}
// 	}
//     return null
// }
// function addQuotations(node, abbs) {
//     for (let key of abbs.keys()) {
// 		if (node.innerHTML) { //add a test to see if it's not a script or something else that we shouldn't mess up
// 			node.innerHTML = replaceAll(node.innerHTML, key, makeLink(key, abbs.get(key)));
// 			//node.innerHTML = node.innerHTML.replace(key, makeLink(key, abbs.get(key)));
// 			//console.log(fetchVerse(key, abbs.get(key)));
// 			fetchVerse(key, abbs.get(key));
// 		}
// 	}
//     return null;
// }

function escapeRegExp(str) {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

function getCharset() {
	//console.log($( 'meta[name="charset"]' ).prevObject[0]);
	return $( 'meta[name="charset"]' );
}

// function waitForResponse(response, someFunction){
//     if (typeof response !== "undefined") {
//         someFunction(response);
//     }
//     else{
//         setTimeout(waitForResponse, 250);
//     }
// }

$(document).ready(function() {
	var lang = eval(getLanguage());
	var translation = eval(getTranslation());
	searchForAbbreviations = lang.searchForAbbreviations;
	//addQuotations          = lang.addQuotations;
	booksMap               = lang.booksMap;
	makeLink               = translation.makeLink;
	fetchVerse             = translation.fetchVerse;
	addQuotations          = translation.addQuotations;
	detectAbbreviation(document.body);
});
