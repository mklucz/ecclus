window.ecclus = window.ecclus || {};
window.ecclus.worker = {
	booksMap : new Map([
		['Rdz', 'Rdz'],
		['Wj', 'Wj'],
		['Lb', 'Lb'],
		['Pwt', 'Pwt'],
		['Joz', 'Joz'],
		['Sdz', 'Sdz'],
		['Rt', 'Rt'],
		['1 Sm', '1 Sm'],
		['2 Sm', '2 Sm'],
		['1 Krl', '1 Krl'],
		['2 Krl', '2 Krl'],
		['1 Krn', '1 Krn'],
		['2 Krn', '2 Krn'],
		['Ezd', 'Ezd'],
		['Ne', 'Ne'],
		['Tb', 'Tb'],
		['Jdt', 'Jdt'],
		['Est', 'Est'],
		['1 Mch', '1 Mch'],
		['2 Mch', '2 Mch'],
		['Hi', 'Hi'],
		['Ps', 'Ps'], ['Psalm', 'Ps'],
		['Prz', 'Prz'],
		['Koh', 'Koh'],
		['Pnp', 'Pnp'],
		['Mdr', 'Mdr'],
		['Syr', 'Syr'],
		['Iz', 'Iz'],
		['Jr', 'Jr'],
		['Lm', 'Lm'],
		['Ba', 'Ba'],
		['Ez', 'Ez'],
		['Dn', 'Dn'],
		['Oz', 'Oz'],
		['Jl', 'Jl'],
		['Am', 'Am'],
		['Ab', 'Ab'],
		['Jon', 'Jon'],
		['Mi', 'Mi'],
		['Na', 'Na'],
		['Ha', 'Ha'],
		['So', 'So'],
		['Ag', 'Ag'],
		['Za', 'Za'],
		['Ml', 'Ml'],
		
		['Mt', 'Mt'],
		['Mk', 'Mk'],
		['Łk', '%A3k'],
		['J', 'J'],
		['Dz', 'Dz'],
		['Rz', 'Rz'],
		['1 Kor', '1 Kor'],
		['2 Kor', '2 Kor'],
		['Ga', 'Ga'],
		['Ef', 'Ef'],
		['Flp', 'Flp'],
		['Kol', 'Kol'],
		['1 Tes', '1 Tes'],
		['2 Tes', '2 Tes'],
		['1 Tm', '1 Tm'],
		['2 Tm', '2 Tm'],
		['Tt', 'Tt'],
		['Flm', 'Flm'],
		['Hbr', 'Hbr'],
		['Jk', 'Jk'],
		['1 P', '1 P'],
		['2 P', '2 P'],
		['1 J', '1 J'],
		['Ap', 'Ap'],
		['2 J', '2 J'],
		['3 J', '3 J'],
		['Jud', 'Jud'],
		[';', ';']
		]
	),

	searchForAbbreviations : 
	function(text) {

	var candidates =
	text.match(/(|\d )([A-ZŁ][a-zł]*|;|; ) (\d{1,3}),* *((\d{1,2})(a|b|n|))(((([,. -])|(\. )|)\d{1,2})(a|b|n|)| n|)(-*)((( |)([,.-]) ?(((\d{1,2})(a|b|))([,.-]) ?)+)|()|)((,? ?((\d{1,2})(a|b|)?))|)/g);
	//https://regex101.com/r/zHI49B/10

	if (candidates == null) {return null};
	var previousBook = null; //handles the semicolon in >>1 Kor 12, 3-5; 13, 1-2<< 
	var dictToReturn = new Map();
	for (var i = 0; i < candidates.length; i++) {
		var candidate = candidates[i];
		var fullCandidate = candidate;
		var book = null;
		var fullBook = null;
		
		var escapedCandidate = window.ecclus.escapeRegExp(candidate);
		var isCandidateAlreadyALink = new RegExp("(<a href).*" + escapedCandidate + ".*(<\/a>)", "g");
		if (text.search(isCandidateAlreadyALink) !== -1) { continue; }
		
		try {
			var possibleBooks = candidate.match(/([0-9]? ?[A-ZŁa-zł]+)|;/g); //https://regex101.com/r/kS53nP/1
			// console.log(candidate, " <> ", possibleBooks);
			for (var j = 0; j < possibleBooks.length; j++) {
				if (window.ecclus.booksMap.has(possibleBooks[j])) {
					//console.log(book, previousBook); //
					book = window.ecclus.booksMap.get(possibleBooks[j]);
					fullBook = possibleBooks[j];
					if (book == ";") {
						book = previousBook;
					}
					else {
						previousBook = book;
					}
				}
				else {continue;}
			}
		}
		catch(err) {
			continue;
		}
		if (book == null) {continue;}
		
		var individualNumbers = window.ecclus.extractIndividualNums(candidate.replace(fullBook, ""));

		try {
			var chapterStart = candidate.match(/[0-9]*,/g)[0].slice(0, -1); //https://regex101.com/r/Lrfl0A/1
		}
		catch(err) {
			//console.log("chapterStart error >> " + candidate + " <<>> " + book);
			continue;
		}
		
		try {
			var verseStart = candidate.match(/, ?[0-9]*/g)[0];
		}
		catch(err) {
			//console.log("verseStart error >> " + candidate + verseStart);
			continue;
		}

		try {
			var verseEnd = candidate.slice(
			candidate.indexOf(verseStart) + verseStart.length);
			//console.log(verseEnd);
			let possiblyLetter = verseEnd.slice(-1);
			if (possiblyLetter.match(/[a-z]/i)) {
				var letter = possiblyLetter;
			}
			else {
				var letter = false;
			}
			verseEnd = verseEnd.match(/[0-9]+/g)[0];
			verseStart = verseStart.match(/[0-9]+/g)[0];
		}
		catch(err) {
			//console.log("verseEnd error >> " + candidate);
			//continue;
		}

		verseStart = verseStart.match(/[0-9]+/g)[0];
		//console.log(verseStart.match(/[0-9]+/g)[0]);
		
		dictToReturn.set(fullCandidate, {
										book: book, 
										chapterStart: chapterStart,
										verseStart: verseStart,
										verseEnd: verseEnd,
										letter: letter,
										individualNumbers: individualNumbers
										//charset: document.characterSet
										});
	}
	console.log(dictToReturn);
	return dictToReturn;
	},

	extractIndividualNums:
	function(nums){
		var splitNums = nums.split(/([., -])/);
		splitNums = splitNums.filter(function(e) {return e !== " " && e !== "";});
		var orderedNums = [];
		for (var i = 0; i < splitNums.length; i++) {
			// TODO : nest these more to avoid multiple testing of the same condition
			// TODO : write a class to contain this in a more civilized manner
			if (i == 0) {
				var currentChapter = splitNums[0];
				continue;
			}
			if (splitNums[i-1] === ",") {
				if (Number.isInteger(parseInt(splitNums[i])) &&
					splitNums[i+1] === "-" &&
					Number.isInteger(parseInt(splitNums[i+2])) &&
					i+4 > splitNums.length 
					) {
					orderedNums.push([currentChapter, [splitNums[i], "hyphen", splitNums[i+2], "end"]]);
					//console.log(orderedNums);
				}
				else if (Number.isInteger(parseInt(splitNums[i])) &&
					i+2 > splitNums.length &&
					i-3 < 0
					) {
					orderedNums.push([currentChapter, [splitNums[i], "end"]]);
					//console.log(orderedNums);
					break;
				}
				else if (Number.isInteger(parseInt(splitNums[i])) &&
					splitNums[i+1] === "." &&
					Number.isInteger(parseInt(splitNums[i+2])) &&
					i+4 > splitNums.length
					) {
					//orderedNums.push([currentChapter, [splitNums[i], "end", splitNums[i+2], "end"]]);
					orderedNums.push([currentChapter, [splitNums[i], "end"]]);
					//console.log(orderedNums);
				}
				else if (Number.isInteger(parseInt(splitNums[i])) &&
					splitNums[i+1] === "." &&
					Number.isInteger(parseInt(splitNums[i+2])) &&
					i+4 <= splitNums.length
					) {
					orderedNums.push([currentChapter, [splitNums[i], "end"]]);
					//console.log(orderedNums);
				}
				else if (Number.isInteger(parseInt(splitNums[i])) &&
					splitNums[i+1] === "-" &&
					Number.isInteger(parseInt(splitNums[i+2])) &&
					splitNums[i+3] === "," &&
					Number.isInteger(parseInt(splitNums[i+4]))
					) {
					orderedNums.push([currentChapter, [splitNums[i], "split chapter"]]);
					//currChapInd += 1;
					orderedNums.push([splitNums[i+2], ["continue until", splitNums[i+4]]]);
					//console.log(orderedNums);
					//  Iz 61, 10 - 62, 5
				}
				else if (Number.isInteger(parseInt(splitNums[i])) &&
					splitNums[i+1] === "-" &&
					Number.isInteger(parseInt(splitNums[i+2])) &&
					splitNums[i+3] === "."
					) {
					orderedNums.push([currentChapter, [splitNums[i], "split verses", splitNums[i+2], "end"]]);
					//console.log(orderedNums);
					//var versesIndex = 1;
				}
			}
			else if (splitNums[i-1] === ".") {
				if (Number.isInteger(parseInt(splitNums[i])) &&
					splitNums[i+1] === "-" &&
					Number.isInteger(parseInt(splitNums[i+2]))
					) {
					//orderedNums[currChapInd] = [currentChapter]
					//console.log("bum");
					orderedNums[orderedNums.length-1].push([splitNums[i], "hyphen", splitNums[i+2], "end"]);
					//console.log(orderedNums);
				}
				else if (Number.isInteger(parseInt(splitNums[i])) &&
					splitNums[i+1] === "." &&
					Number.isInteger(parseInt(splitNums[i+2])) &&
					i+2 <= splitNums.length
					) {
					orderedNums[orderedNums.length-1].push([splitNums[i], "end"]);
					//console.log(orderedNums, "<><>", i);
				}
				else if (Number.isInteger(parseInt(splitNums[i])) &&
					//splitNums[i+1] === "." &&
					i+1 == splitNums.length
					) {
					orderedNums[orderedNums.length-1].push([splitNums[i], "end"]);
				}
			}
		}
		return orderedNums;
	},

	translations : {
		deon : {

			makeLink : 
			function(key, abbObj) {
			return new Promise(function(resolve, reject){
				let book = abbObj.book;
				//	if (book) {book = book.replace(" ", "%20");};
					if (book) {book = encodeURIComponent(book)};
				let chapterStart = abbObj.chapterStart;
				let verseStart = abbObj.verseStart;
				let verseEnd = abbObj.verseEnd;
				let letter = abbObj.letter;
				let title = window.ecclus.fetchVerse(key, abbObj);
				title.then(function(fetchedVerses){
					let link = "<a href=http://biblia.deon.pl/otworz.php?skrot=" + 
								book + "%20" + chapterStart + "#W" + verseStart + " title=\"" +
								fetchedVerses.replace(/<(?:.|\n)*?>/gm, '') + "\">" + key + "</a>"
					resolve(link);
					});
				})
			},

			extractVerse :
			function(data, abbObj) {
			return new Promise(function(resolve, reject){
				var slice = ""
				var nums = abbObj.individualNumbers;
				if (nums[0][0]) {var chapter = nums[0][0];};
				for (i in nums) {
					for (j in nums[i]){
						if (data) {
							//if (data[i] == undefined) {console.log(data);}
							var endofTextIndex = data[i].indexOf('<div class="bottom-navi">');
						}
						if (typeof nums[i][j] == "object"){
							var startingVerse = null;
							var startMatch = null;
							var startIndex = null;
							var endingVerse = null;
							var endMatch = null;
							var endIndex = null;
							var andHere = null;

							for (var k = 0; k < nums[i][j].length; k++) {
								let entry = nums[i][j][k];
								var justTheNumber = parseInt(entry);
								if (k == 0 && Number.isInteger(justTheNumber)) {
									startingVerse = entry;
									startMatch = justTheNumber.toString() + "&nbsp;<\/span>";
									startIndex = data[i].indexOf(startMatch);
									//slice += "starting\n"
								}
								else if (entry == "hyphen") {
									endingVerse = parseInt(nums[i][j][k+1]) + 1;
									//var kPlusOne = parseInt(k) + 1;
									//console.log(nums[i][j][kPlusOne], " <> ", typeof k);
									//slice += "hyphen\n";
								}
								else if (entry == "split verses") {
									endingVerse = parseInt(nums[i][j][k+1]) + 1;
								}
								else if (entry == "end") {
									//console.log(startMatch);
									if (!endingVerse) {
										endingVerse = parseInt(startingVerse) + 1;
									}
									//slice += "ending\n";
								}
								else if (entry == "split chapter") {
									endHere = endofTextIndex;
									break;
								}
								else if (entry == "continue until") {
									startingVerse = 1;
									startMatch = "1&nbsp;<\/span>";
									startIndex = data[i].indexOf(startMatch);
									endingVerse = parseInt(nums[i][j][k+1]) + 1;
									endHere = data[i].indexOf("<a name=\"W" + endingVerse.toString());
									//console.log(startMatch endingVerse)
									break;
								}
								if (endingVerse) {
									endMatch = "<a name=\"W" + endingVerse.toString();
									endIndex = data[i].indexOf(endMatch);
									if (endIndex == -1 || endIndex > endofTextIndex){
										endHere = endofTextIndex;
									}
									else {
										endHere = endIndex;
									}
								}
							}
							slice += parseInt(startingVerse).toString() + " " +
								data[i].slice(startIndex + startMatch.length, endHere);
						}
					}
				}
			

				// let verseStart = abbObj.verseStart;
				// if (abbObj.verseEnd != "") {
				// 	var verseEnd = Number(abbObj.verseEnd) + 1;
				// }
				// else {
				// 	var verseEnd = Number(abbObj.verseStart) + 1;
				// }
				//let startMatch = verseStart.toString() + "&nbsp;<\/span>";
				//let startIndex = data.indexOf(startMatch);
				//let endofTextIndex = data.indexOf('<div class="bottom-navi">');
				//let endMatch = "<a name=\"W" + verseEnd.toString();
				//console.log(data);
				//let endIndex = data.search(endMatch);
				// if (endIndex == -1 || endIndex > endofTextIndex){
				// 	var endHere = endofTextIndex;
				// }
				// else {
				// 	var endHere = endIndex;
				// }
				//let slice = data.slice(startIndex + startMatch.length, endHere);
				slice = slice.replace(/(\<sup>.*?\<\/sup\>)/gi, "");
				slice = slice.replace(/(\<div class=miedzy.*\<\/div\>)/gi, "");
				slice = slice.replace(/(\<div class=rd.*\<\/div\>)/gi, "");
				slice = slice.replace(/"/g, '&quot;');
				slice = slice.replace(/<(?:.|\n)*?>/gm, "")
				slice = slice.replace(/\s+$/, "")
				console.log(slice);
				//slice = parseInt(startingVerse).toString() + " " + slice;
				resolve(slice);
				})
			},
			
			fetchVerse :
			function(key, abbObj) {
			return new Promise(function(resolve, reject){
				let nums = abbObj.individualNumbers;
				let chaptersToFetch = [];
				let urlsToGet = [];
				for (i in nums) {
					if (chaptersToFetch.indexOf(nums[i][0]) == -1) {
						chaptersToFetch.push(nums[i][0]);
					}
				}
				for (j in chaptersToFetch) {
					urlsToGet.push("http://biblia.deon.pl/otworz.php?skrot=" +
									abbObj.book +
									"%20" +
									chaptersToFetch[j]);
				}
				let msg = {
					startMatchString: "&nbsp;<\/span>",
					endMatchString: "<a name=\"W",
					endOfTextString: '<div class="bottom-navi">',
					//url: url,
					charset: "iso-8859-2", 
					abbObj: abbObj,
					urlsToGet: urlsToGet
				};
				chrome.runtime.sendMessage(JSON.stringify(msg), function(response) {
	 				let extracted = window.ecclus.extractVerse(response, abbObj);
	 				extracted.then(resolve(extracted));
	 				});
				})
			},

			addQuotations :
			function(node, abbs) {
		    for (let key of abbs.keys()) {
				if (node.innerHTML) { //add a test to see if it's not a script or something else that we shouldn't mess up
					theLink = window.ecclus.makeLink(key, abbs.get(key));
					theLink.then(function(madeLink){
						node.innerHTML = window.ecclus.replaceAll(node.innerHTML, key, madeLink);
					});
					theLink.catch(function (error) {
						console.log(error)
					})
				}
			}
		    return null;
			}
		}
			
	}

};
