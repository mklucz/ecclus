console.log("general.js dziala")

var testing = function() {console.log('test funkcji')};

function drugiTesting() {
	console.log('drugi testing');
}

document.dispatchEvent(new CustomEvent('languageLoaded', {
    'detail': {
        'dictionary': {
            'abc': drugiTesting
        }
    }
}));

drugiTesting();

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

function searchForAbbreviations(text) {
    
    var candidates = text.match(/([0-9]?|)[A-ZŁ][a-zł]* [0-9]{1,2},* *[0-9]{1,2}((-?[0-9]{1,2})| n|)/g);
    //console.log(candidates);
    //For now the regex pattern is hardcoded here, eventually it's gonna
    //be bundled together with "abbreviation:book" map and link-making
    //function in language packs
    //
    //It also needs to skip over links, so we don't mess up pages that 
    //already fullfill ecclus' intended functionality, i.e. we don't 
    //want to make a link inside an existing link.
    if (candidates == null) {return null};
    var dictToReturn = new Map();
    for (var i = 0; i < candidates.length; i++) {
		//~ if (candidates[i].charAt(0) == " ") {
			//~ candidates[i] =
			//~ candidates[i].substring(1, candidates[i].length)
		//~ }
		//~ //strip the leading space. I can't figure out how to do it with
		//~ //regex, this is probably slower but still works. I may change
		//~ //it later, it would increase readability, if nothing else.
		var candidate = candidates[i];
		
		try {
			var book = candidate.match(/[0-9]? ?[A-Za-z]+/g)[0];
		}
		catch(err) {console.log("book error");}
		//extract the book name's abbreviation from a candidate
		//the index [0] at the end is there because match returns
		//an array
		
		try {
			var chapter = candidate.match(/[0-9]*,/g)[0].slice(0, -1);
		}
		catch(err) {console.log("chapter error");}
		//as above, and the slice is here to cut off the trailing
		//coma
		//This - this regex - will eventually be moved elsewhere too.
		//
		
		try {
			var verseStart = candidate.match(/, [0-9]*/g)[0].slice(2);
		}
		catch(err) {console.log("verseStart error");}
		//get the starting verse number
		
		try {
			var verseEnd = candidate.slice(
			candidate.indexOf(verseStart) + verseStart.length);
			if (verseEnd.slice(-1) == "n") {
				var tbc = true;
				verseEnd = verseEnd.match(/[0-9]*/g)[0];
				//tbc stands for "to be continued"
			}
			else {
				var tbc = false;
				verseEnd = verseEnd.slice(1);
			}
		}
		catch(err) {console.log("verseEnd error");}
		//this one's a bit different than the three above, as it needs
		//to handle the "n", meaning "and however many verses are below,
		//all the way to the next paragraph"
		//at least in polish it's "n", as for other languages, we'll see
		//in time, as I said already, all of this logic is supposed to be 
		//bundled with the languages
		
		//~ if (books.prototype.has(book)) {
			//~ //there will also be tests for is the chapter in range and
			//~ //is the verse in range, I'll add them once I redo the 
			//~ //"books" mapping to contain js objects instead of strings
		    //~ var indexOfAbb = text.indexOf(candidate);
			//~ 
		//~
		dictToReturn.set(candidate, {book: book, 
			                         chapter: chapter,
			                         verseStart: verseStart,
			                         verseEnd: verseEnd,
			                         tbc: tbc});
	}
    return dictToReturn;
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

detectAbbreviation(document.body);
