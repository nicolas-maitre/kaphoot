//const
DEV_PREVENT_HISTORY = false;

//memory
var globalMemory = {};
var elements = {};

//instanciate managers
var pagesManager = new PagesManager();
var apiManager = new ApiManager();
var builder = new Builder();
var actions = new Actions();

document.addEventListener("DOMContentLoaded", function(domEv){
	//elements
	elements.pagesContainer = document.getElementById("pagesContainer");
	elements.topMenuButton = document.getElementById("topMenuButton");
	elements.globalLoader = false;

	//other init (TO MOVE)
	elements.topMenuButton.addEventListener("click", actions.onHeadButtonClick);

	//manage landing page
	var pageToShow = config.landingPage;
	if(window.location.pathname != "/"){
		pageToShow = window.location.pathname.split("/")[1];
	}
	//load views
	pagesManager.preloadViews(pageToShow);
	//display page
	pagesManager.changePage(pageToShow);
	//popstate
	window.addEventListener("popstate",function(evt){
		console.log("pop", evt);
		if(evt.state && evt.state.pageName){
			pagesManager.changePage(evt.state.pageName, false);
			return;
		}
		console.log("no pop state defined");
	});
	console.log("init completed");
});