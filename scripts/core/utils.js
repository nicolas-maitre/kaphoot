//_PROTOTYPES_METHODS_
Element.prototype.addElement = function(type, className, options){
	var newElement = document.createElement(type); //create
	this.appendChild(newElement); //append to parent
	if(typeof className === 'string'){
		newElement.setAttribute('class', className); //set class name
	}
	return newElement;
}

Element.prototype.removeChilds = function(elemQuerySelector = false){
	if(elemQuerySelector){
		var elemsToRemove = [...this.querySelectorAll(elemQuerySelector)]
	} else {
		var elemsToRemove = [...this.childNodes];
	}
	elemsToRemove.forEach((elem) => {
		elem.remove();
	});
};

String.prototype.capitalise = function(){
	return this[0].toUpperCase() + this.slice(1);
}

Element.prototype.addElemBefore = function(ref){
	ref.parentNode.insertBefore(this, ref);
}

Element.prototype.addElemAfter = function(ref){
	ref.parentNode.insertBefore(this, ref.nextSibling);
}

HTMLCollection.prototype.forEach = Array.prototype.forEach;

var Cookies = {};
Cookies.get = function(){
    var cookiesStr = document.cookie;
    var cookiesArray = cookiesStr.split(";");
    var cookies = {};
    cookiesArray.forEach((cookie) => {
        var cookieComponents = cookie.split("=");
        if(cookieComponents.length != 2){
            return;
        }
        var cookey = decodeURIComponent(cookieComponents[0].trim());
        var value = decodeURIComponent(cookieComponents[1]);
        cookies[cookey] = value;
    });
    return cookies;
}
Cookies.set = function(key, value, expiration = (1000 * 60 * 60 * 24 * 365)/*1 year*/, path = false){
    var expirationDate = new Date(Date.now() + expiration);
    var cookieStr = `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    cookieStr += `; expires=${expirationDate.toUTCString()}`
    cookieStr += (path?`; path=${path}`:"");
    document.cookie = cookieStr;
}
Cookies.delete = function(key){
    Cookies.set(key, "deleted", -1);
}

function async_requestAnimationFrame(){
    return new Promise(function(res, rej){
        requestAnimationFrame(res);
    });
}
function async_setTimeout(time){
    return new Promise(function(res, rej){
        setTimeout(res, time);
    });
}
//_UTILS METHODS
var utils = {};
utils.getGlobalLoader = function(){
	if(!elements.globalLoader){
		elements.globalLoader = {};
		elements.globalLoader.container = document.body.addElement("div", "globalLoaderContainer none");
		elements.globalLoader.loader = elements.globalLoader.container.addElement("div", "globalLoaderImage");
		
		elements.globalLoader.show = function(){
			elements.globalLoader.container.classList.remove("none");
			requestAnimationFrame(function(){
				elements.globalLoader.container.style.opacity = 1;
			});
		}
		elements.globalLoader.hide = function(){
			requestAnimationFrame(function(){
				elements.globalLoader.container.style.opacity = 0;
				setTimeout(function(){
					elements.globalLoader.container.classList.add("none");
				}, 200);
			});
		}
	}
	return elements.globalLoader;
};
utils.infoBox = function(message, time = 5000){
	var infoBox = document.body.addElement("div", "infoMessageBox");
	infoBox.innerText = message;
	requestAnimationFrame(function(){
		infoBox.style.opacity = 1;
		setTimeout(function(){
			infoBox.style.opacity = 0;
			setTimeout(function(){
				infoBox.remove();
			}, 0.5 * 1000);
		}, time);
	});
	return infoBox;
};
utils.decodeQuery = function(queryString){
	if(!queryString){
		return false;
	}
	var cleanQuery = (queryString.split("?")[1] || queryString); //cleans query if it contains a `?` char
	var queryStringArray = cleanQuery.split("&");
	var queryObject = {};
	for(var indQuery in queryStringArray){
		var paramArray = queryStringArray[indQuery].split("=");
		if(paramArray[1]){
			queryObject[paramArray[0]] = paramArray[1];
		} else {
			queryObject[paramArray[0]] = false;
		}
	}
	return queryObject;
};
utils.encodeQuery = function(queryData){
	var encodedStr = ""
	for(var indQuery in queryData){
		encodedStr += encodeURIComponent(indQuery);
		encodedStr += "=";
		encodedStr += encodeURIComponent(queryData[indQuery]);
		encodedStr += "&"
	}
	return encodedStr.slice(0, -1);
}

utils.setDynamicLinks = function(parent){
	var linksList = parent.getElementsByTagName("a");
	for(var indLink = 0; indLink < linksList.length; indLink++){
		utils.setDynamicLink(linksList[indLink]);
	}
};
utils.setDynamicLink = function(elem){
	var href = elem.pathname;
	var hrefArray = href.split("/");
    var page = hrefArray[1];
	var query = utils.decodeQuery(elem.search)
	var path = (hrefArray.slice(2) || false); //get path
	if(pagesConfig[page]){//only adds event if the page target exists
        //add event
        elem.addEventListener("click", function(evt){
			evt.preventDefault();
			//remove href
            elem.removeAttribute("href");
            //change page
			pagesManager.changePage(page, {query, path});
            //put href back on
            requestAnimationFrame(function(frameTime){
                elem.setAttribute("href", href);
            });
        });
    }
};

//garbage
function $(){
	alert("nul! enlève ça de ton code!");
	throw new Error("oskur le jquery");
}