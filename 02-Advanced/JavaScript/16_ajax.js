"use strict";

// Basic AJAX Request: XMLHttpRequest

// Retrieving the XHR Object
let request;
if (window.XMLHttpRequest) { // Mozilla, Safari, ...
    request = new XMLHttpRequest();
    console.log("XMLHttpRequest used!");
} else if (window.ActiveXObject) { // IE
  try {
      request = new ActiveXObject("Msxml2.XMLHTTP");
      console.log("ActiveXObject used!");
  }
  catch (e) {
    try {
        request = new ActiveXObject("Microsoft.XMLHTTP");
        console.log("ActiveXObject used!");
    }
    catch (e) {
        console.log(e);
    }
  }
}

// Request Callbacks
// state changes
request.onreadystatechange = function () {
    console.log("Ready State:", request.readyState);
    console.log("State:", request.status);
    if (request.readyState === 4) { // done
        console.log("Request Ready (4)");
        if (request.status === 200) { // complete
            console.log("Request Status 200");
            console.log(request.responseText);
		}
	}
};

// addEventListener
function callbackFn(e) {
	// Handle each event
    console.log("Callback", e);
}
request.addEventListener("progress", callbackFn, false);
request.addEventListener("load", callbackFn, false);
request.addEventListener("error", callbackFn, false);
request.addEventListener("abort", callbackFn, false);

// Making a Request
request.open("GET", "https://pokeapi.co/api/v2/pokemon/", true);
request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
request.send(null);