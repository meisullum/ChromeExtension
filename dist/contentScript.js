/******/ (() => { // webpackBootstrap
/*!********************************************!*\
  !*** ./src/contentScript/contentScript.ts ***!
  \********************************************/
console.log("content script !");
chrome.runtime.sendMessage("from the content script", (response) => console.log(response));

/******/ })()
;
//# sourceMappingURL=contentScript.js.map