$(document).ready(function(){
	$("#confirm").on("click", function(){
		chrome.tabs.create({"url":"https://scratch.mit.edu/projects/56534898/"});
	})
});