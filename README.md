Chrome Umbraco Debug
==================

A chrome extension which enables umbraco debug trace on all page requests (i.e ?umbDebugShowTrace=true).

Installing this
===============
To install this extension: 

1. Download the source
2. In Chrome, bring up the extensions management page by clicking the settings icon (3 lines stacked), and choosing Tools > Extensions
3. To the right of the Extensions title is a checkbox titled 'Developer mode', ensure this is checked.
4. Click the 'Load unpacked extension' button. A file dialog appears.
5. In the file dialog, navigate to your extension's folder and click OK.
6. Information about this extension will appear in the installed extensions list, and a new grey Umbraco icon will be added to the browser tab.
7. Browse to your umbraco site and click the greyed out Umbraco icon to enable. The page will reload with 'umbDebugShowTrace' appended to the URL.
8. To disable, click the Umbraco icon and the page URL will revert back to the non-trace version. 
