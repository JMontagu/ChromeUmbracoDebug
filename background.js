/**
 * Copyright 2012 Jade Montagu
 *
 * This file is part of Chrome Umbraco Debug
 * 
 * Chrome Umbraco Debug is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
 * 
 * Chrome Umbraco Debug is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License along with Chrome Umbraco Debug. If not, see http://www.gnu.org/licenses/.
 **/
 
/**
 * Holds the state of debug mode. True means we should debug the page.
 */
var debug = false;
var trackedTab;

/**
 * Responds to clicks on the extension's icon. Toggles debug mode.
 */
chrome.browserAction.onClicked.addListener(
  function(tab) {
    debug = !debug;
	
	renderExtensionActivity(debug);
	
	if(debug) {
		chrome.tabs.getSelected(null, function(tab){
			trackedTab = tab;
		});
	}
	
	chrome.webRequest.onBeforeRequest.addListener(
		function(details) {
			 if(debug && trackedTab && details.tabId === trackedTab.id) {
				 if(!getParameterByName(details.url, "umbDebugShowTrace")) {
					var newUrl = details.url + "?umbDebugShowTrace=true";
					return {redirectUrl: newUrl};
				 }
			 }
			 else if(!debug && details.tabId === trackedTab.id) {
				if(getParameterByName(details.url, "umbDebugShowTrace")) {
					var newUrl = details.url.replace("?umbDebugShowTrace=true","");
					return {redirectUrl: newUrl};
				}
			 }
		},
		{
			urls: [
				"<all_urls>"
			]
		},
		["blocking"]);
	
	// Show/disable icon
	chrome.tabs.onActivated.addListener(function(activeInfo) {
		if(!debug || trackedTab && activeInfo.tabId !== trackedTab.id) {
			renderExtensionActivity(false);
			trackedTab = null;
		} else if(debug && trackedTab && activeInfo.tabId === trackedTab.id) {
			renderExtensionActivity(true);
		}
	});
	
	//Reload tab to kickstart the event handler
	chrome.tabs.getSelected(null, function(tab){
		chrome.tabs.reload();
	});
  }
);

function renderExtensionActivity(isOn) {
	if(!isOn) {
		chrome.browserAction.setIcon({
			 path: 'icon-off.png'
		});
		
		chrome.browserAction.setBadgeText({
			text: ''
		});
		
		chrome.browserAction.setTitle({
		  title: 'Umbraco Debug: OFF'
		});
	} 
	else {
		chrome.browserAction.setIcon({
			 path: 'icon-on.png'
		});
		
		chrome.browserAction.setBadgeText({
			text: 'ON'
		});
		
		chrome.browserAction.setTitle({
		  title: 'Umbraco Debug: ON'
		});
	}
}

function getParameterByName(url, name)
{
	name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
	var regexS = "[\\?&]" + name + "=([^&#]*)";
	var regex = new RegExp(regexS);
	var results = regex.exec(url);
	if(results == null) {
		return "";
	}
	else {
		return decodeURIComponent(results[1].replace(/\+/g, " "));
	}
}
