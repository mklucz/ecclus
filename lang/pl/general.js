pl = {
	searchForAbbreviations : 
	function(text) {
    
    var candidates =
    text.match(/(|[0-9] )([A-ZŁ][a-zł]*|;|; ) ([0-9]{1,3}),* *(([0-9]{1,2})(a|b|n|))(((|(-?|\.?|))[0-9]{1,2})(a|b|n|)| n|)/g);
    //https://regex101.com/r/jD7ldF/2

    //(Iz 61, 10 - 62, 5) 
    //Pwt 7, 6b. 8-9 
    //por. 13, 11

    if (candidates == null) {return null};
    var previousBook = null; //handles the semicolon in >>1 Kor 12, 3-5; 13, 1-2<< 
    var dictToReturn = new Map();
    for (var i = 0; i < candidates.length; i++) {
		var candidate = candidates[i];
		var fullCandidate = candidate;
		var book = null;
		
		try {
			var possibleBooks = candidate.match(/([0-9]? ?[A-ZŁa-zł]+)|;/g); //https://regex101.com/r/kS53nP/1
			//console.log(possibleBooks);
			for (var j = 0; j < possibleBooks.length; j++) {
				if (booksMap.has(possibleBooks[j])) {
					//console.log(book, previousBook); //
					book = possibleBooks[j];
					//console.log(book); //
					if (book == ";") {
						book = previousBook;
					}
					else {
						previousBook = book;
					}
				}
			}
		}
		catch(err) {console.log("book error");}
		
		try {
			var chapterStart = candidate.match(/[0-9]*,/g)[0].slice(0, -1); //https://regex101.com/r/Lrfl0A/1
		}
		catch(err) {console.log("chapterStart error");}
		//as above, and the slice is here to cut off the trailing coma
		
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
			//~ //there will also be tests for is the chapterStart in range and
			//~ //is the verse in range, I'll add them once I redo the 
			//~ //"books" mapping to contain js objects instead of strings
		    //~ var indexOfAbb = text.indexOf(candidate);
			//~ 
		//~
		dictToReturn.set(fullCandidate, {book: book, 
			                         chapterStart: chapterStart,
			                         verseStart: verseStart,
			                         verseEnd: verseEnd,
			                         tbc: tbc});
		
	}
    //console.log(dictToReturn);
    //console.log($('meta[name~="charset"]'));
    return dictToReturn;
	},
	
	// addQuotations :
	// function(node, abbs) {
 //    for (let key of abbs.keys()) {
	// 	if (node.innerHTML) { //add a test to see if it's not a script or something else that we shouldn't mess up
	// 		node.innerHTML = replaceAll(node.innerHTML, key, translations.deon.makeLink(key, abbs.get(key)));
	// 		//node.innerHTML = node.innerHTML.replace(key, makeLink(key, abbs.get(key)));
	// 		//console.log(fetchVerse(key, abbs.get(key)));
	// 		translations.deon.fetchVerse(key, abbs.get(key));
	// 	}
	// }
 //    return null
	// },

	booksMap : new Map(
		[['Rdz', 'Rdz'], ['Wj', 'Wj'], ['Lb', 'Lb'], ['Pwt', 'Pwt'],
		['Joz', 'Joz'], ['Sdz', 'Sdz'], ['Rt', 'Rt'], ['1 Sm', '1 Sm'],
		['2 Sm', '2 Sm'], ['1 Krl', '1 Krl'], ['2 Krl', '2 Krl'],
		['1 Krn', '1 Krn'], ['2 Krn', '2 Krn'], ['Ezd', 'Ezd'],
		['Ne', 'Ne'], ['Tb', 'Tb'], ['Jdt', 'Jdt'], ['Est', 'Est'],
		['1 Mch', '1 Mch'], ['2 Mch', '2 Mch'], ['Hi', 'Hi'], ['Ps', 'Ps'],
		['Prz', 'Prz'], ['Koh', 'Koh'], ['Pnp', 'Pnp'], ['Mdr', 'Mdr'],
		['Syr', 'Syr'], ['Iz', 'Iz'], ['Jr', 'Jr'], ['Lm', 'Lm'],
		['Ba', 'Ba'], ['Ez', 'Ez'], ['Dn', 'Dn'], ['Oz', 'Oz'],
		['Jl', 'Jl'], ['Am', 'Am'], ['Ab', 'Ab'], ['Jon', 'Jon'],
		['Mi', 'Mi'], ['Na', 'Na'], ['Ha', 'Ha'], ['So', 'So'],
		['Ag', 'Ag'], ['Za', 'Za'], ['Ml', 'Ml'], ['Mt', 'Mt'],
		['Mk', 'Mk'], ['J', 'J'], ['Dz', 'Dz'], ['Rz', 'Rz'],
		['1 Kor', '1 Kor'], ['2 Kor', '2 Kor'], ['Ga', 'Ga'],
		['Ef', 'Ef'], ['Flp', 'Flp'], ['Kol', 'Kol'],
		['1 Tes', '1 Tes'], ['2 Tes', '2 Tes'], ['1 Tm', '1 Tm'],
		['2 Tm', '2 Tm'], ['Tt', 'Tt'], ['Flm', 'Flm'],
		['Hbr', 'Hbr'], ['Jk', 'Jk'], ['1 P', '1 P'],
		['2 P', '2 P'], ['1 J', '1 J'], ['Ap', 'Ap'],
		['2 J', '2 J'], ['3 J', '3 J'], ['Jud', 'Jud'], [';', ';']]
	),

	translations : {
		deon : {

			makeLink : 
			function(key, abbObjGNRL) {
			let book = abbObjGNRL.book;
				if (book) {book = book.replace(" ", "%20");};
			let chapterStart = abbObjGNRL.chapterStart;
			let verseStart = abbObjGNRL.verseStart;
			let verseEnd = abbObjGNRL.verseEnd;
			let tbc = abbObjGNRL.tbc;
			let link = "<a href=http://biblia.deon.pl/otworz.php?skrot=" + book + "%20" + chapterStart + "#W" + verseStart + ">" + key + "</a>"
			return link;
			},

			fetchVerse :
			function(key, abbObjGNRL) {
			let link = makeLink(key, abbObjGNRL);
			console.log(chrome.extension.getURL('background-page.html'))
			let msg = {link: link, charset: getCharset(), abbObjGNRL:abbObjGNRL};
			chrome.runtime.sendMessage(JSON.stringify(msg), function(response) {
 				
 				console.log(decodeURIComponent(response));
			});
			// chrome.runtime.sendMessage(JSON.stringify(msg), function(response) {
 		// 		waitForResponse(response, console.log);
 				
			// });

			// $.ajaxSetup({dataType : 'xml',
			// 			 charset  : 'iso-8859-2',
			// 			 converters : {'text xml' : myParser}});	
			
			// let book = abbObjGNRL.book;
			// 	if (book) {book = book.replace(" ", "%20");};
			// let chapterStart = abbObjGNRL.chapterStart;
			// let verseStart = abbObjGNRL.verseStart;
			// let verseEnd = abbObjGNRL.verseEnd;
			// let tbc = abbObjGNRL.tbc;
			// //+ "%20" + chapterStart + "#W" + verseStart
			// let versesMap = new Map();
			// let verses = null;
			// let siteHTML = $.get("http://biblia.deon.pl/otworz.php?skrot=" + book + "%20" + chapterStart, function() {
			// 	//console.log("bum", siteHTML.responseText);
			// 	//siteHTML = siteHTML.responseText;
			// 	//(/13&nbsp;\<\/span\>.*\<a name="W14/g)
			// 	let toMatch = new RegExp(verseStart + '&nbsp;\\<\\/span\\>.*\\<a name="W' + verseEnd, 'g');
			// 	let verses = siteHTML.responseText.match(toMatch);
			// 	console.log(verses);
			// console.log(siteHTML);
			// });
			// //let regexp = null;
			// return null
			},

			addQuotations :
			function(node, abbs) {
		    for (let key of abbs.keys()) {
				if (node.innerHTML) { //add a test to see if it's not a script or something else that we shouldn't mess up
					node.innerHTML = replaceAll(node.innerHTML, key, makeLink(key, abbs.get(key)));
					//node.innerHTML = node.innerHTML.replace(key, makeLink(key, abbs.get(key)));
					//console.log(fetchVerse(key, abbs.get(key)));
					fetchVerse(key, abbs.get(key));
				}
			}
		    return null;
			}
		}
			
	}

};
