Chrome Umbraco Debug
==================

A chrome extension which appends umbraco debug trace on all page requests within a tab (i.e ?umbDebugShowTrace=true).

How to use
==========
1. Browse to your umbraco site and click the greyed out Umbraco icon next to the omnibox to enable. The page will reload with 'umbDebugShowTrace' appended to the URL.
2. To disable, click the Umbraco icon and the page URL will revert back to the non-trace version. 

n.b: your browsing history won't be affected by this plugin as it changes the URL after the history is saved.

How to install
==========
To install this extension: 

1. Download the source
2. In Chrome, bring up the extensions management page by clicking the settings icon (3 lines stacked), and choosing Tools > Extensions
3. To the right of the Extensions title is a checkbox titled 'Developer mode', ensure this is checked.
4. Click the 'Load unpacked extension' button. A file dialog appears.
5. In the file dialog, navigate to this extension's folder and click OK.
6. Information about this extension will appear in the installed extensions list, and a new grey Umbraco icon will be added to the browser tab.

Permissions Needed
==================
This extension requires the following permissions:
* tabs - to reload the tab when enabling debug
* webRequest and webRequestBlocking - to hijack the tab's page request to append umbDebugShowTrace
