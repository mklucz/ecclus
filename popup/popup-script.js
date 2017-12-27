var detectedBrowser = null;
if (navigator.userAgent.indexOf("Chrome") != -1) {
	detectedBrowser = "Chrome";
	}
else if(navigator.userAgent.indexOf("Firefox") != -1) {
	detectedBrowser = "Firefox";
}
else {detectedBrowser = "Firefox"} //default for now

if (detectedBrowser == "Chrome") {
	var browser = chrome;
	let gettingLanguage = chrome.storage.local.get("language", function(retrievedLanguage) {
		console.log(typeof retrievedLanguage);
		console.log(typeof gettingLanguage);
	});
	let gettingActiveTab = chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			console.log(tabs[0])
			let langMessage = chrome.tabs.sendMessage(tabs[0].id, {grabLanguage: "test"}, function(response) {
				console.log(response);
				console.log("chrome response");
			});

		})	
}
else if (detectedBrowser == "Firefox") {
	let gettingLanguage = browser.storage.local.get("language");
	console.log(typeof gettingLanguage);
	gettingLanguage.then((retrievedLanguage) => {
		console.log(retrievedLanguage)
	});
	let gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
		gettingActiveTab.then((tabs) => {
			console.log(tabs[0])
			let langMessage = browser.tabs.sendMessage(tabs[0].id, {grabLanguage: "test"});
			langMessage.then((response) => {
				console.log(JSON.stringify(response));
				console.log(langMessage)
			})
		})
}
// let gettingLanguage = chrome.storage.local.get("language");
// console.log(typeof gettingLanguage);
// gettingLanguage.then((retrievedLanguage) => {
// 	if (retrievedLanguage) {
// 		console.log(retrievedLanguage)
// 	}
// })



document.addEventListener("click", function(event) {
	if (event.target.classList.contains("language")) {
		var lang = event.target.classList[1];
		let translationChoosers = document.getElementById("translation-choosers").children;
		for (i = 0; i < translationChoosers.length; i++) {
			if (translationChoosers[i].id == lang) {
				translationChoosers[i].style.display = "inline-block";
			}
			else {
				translationChoosers[i].style.display = "none";
			}
		}
		console.log(event.target.parentElement);
		event.target.parentElement.style.display = "none"
		let gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
		gettingActiveTab.then((tabs) => {
		browser.tabs.sendMessage(tabs[0].id, {language: lang});
		})
	}
	else if (event.target.classList.contains("translation")) {
		let gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
		gettingActiveTab.then((tabs) => {
		browser.tabs.sendMessage(tabs[0].id, {translation: event.target.classList[1]});
		})
	}
})
