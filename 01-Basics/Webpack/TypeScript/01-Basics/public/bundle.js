/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/forms.ts":
/*!**********************!*\
  !*** ./src/forms.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   formData: () => (/* binding */ formData)\n/* harmony export */ });\nvar formData = function (form) {\n    var inputs = form.querySelectorAll(\"input\");\n    var values = {};\n    inputs.forEach(function (input) {\n        values[input.id] = input.value;\n    });\n    return values;\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvZm9ybXMudHMiLCJtYXBwaW5ncyI6Ijs7OztBQUFPLElBQU0sUUFBUSxHQUFHLFVBQ3RCLElBQXFCO0lBSXJCLElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM5QyxJQUFJLE1BQU0sR0FBK0IsRUFBRSxDQUFDO0lBRTVDLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBQyxLQUFLO1FBQ25CLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQztJQUNqQyxDQUFDLENBQUMsQ0FBQztJQUNILE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovLzAxLWJhc2ljcy8uL3NyYy9mb3Jtcy50cz81MGI2Il0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBmb3JtRGF0YSA9IChcbiAgZm9ybTogSFRNTEZvcm1FbGVtZW50XG4pOiB7XG4gIFtwcm9wOiBzdHJpbmddOiBzdHJpbmc7XG59ID0+IHtcbiAgY29uc3QgaW5wdXRzID0gZm9ybS5xdWVyeVNlbGVjdG9yQWxsKFwiaW5wdXRcIik7XG4gIGxldCB2YWx1ZXM6IHsgW3Byb3A6IHN0cmluZ106IHN0cmluZyB9ID0ge307XG5cbiAgaW5wdXRzLmZvckVhY2goKGlucHV0KSA9PiB7XG4gICAgdmFsdWVzW2lucHV0LmlkXSA9IGlucHV0LnZhbHVlO1xuICB9KTtcbiAgcmV0dXJuIHZhbHVlcztcbn07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/forms.ts\n");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./forms */ \"./src/forms.ts\");\n\nvar formEl = document.querySelector(\"form\");\nformEl.addEventListener(\"submit\", function (evt) {\n    evt.preventDefault();\n    var dataForm = (0,_forms__WEBPACK_IMPORTED_MODULE_0__.formData)(formEl);\n    console.log(dataForm);\n});\nvar User = /** @class */ (function () {\n    function User(username, age) {\n        this.username = username;\n        this.age = age;\n    }\n    User.prototype.summary = function () {\n        return \"\".concat(this.username, \" is \").concat(this.age, \"-years old!\");\n    };\n    return User;\n}());\nvar user1 = new User(\"David\", 25);\nconsole.log(user1.summary());\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXgudHMiLCJtYXBwaW5ncyI6Ijs7QUFBbUM7QUFFbkMsSUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUUsQ0FBQztBQUUvQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLFVBQUMsR0FBRztJQUNwQyxHQUFHLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDckIsSUFBTSxRQUFRLEdBQUcsZ0RBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNsQyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ3hCLENBQUMsQ0FBQyxDQUFDO0FBRUg7SUFJRSxjQUFZLFFBQWdCLEVBQUUsR0FBVztRQUN2QyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztJQUNqQixDQUFDO0lBRU0sc0JBQU8sR0FBZDtRQUNFLE9BQU8sVUFBRyxJQUFJLENBQUMsUUFBUSxpQkFBTyxJQUFJLENBQUMsR0FBRyxnQkFBYSxDQUFDO0lBQ3RELENBQUM7SUFDSCxXQUFDO0FBQUQsQ0FBQztBQUVELElBQU0sS0FBSyxHQUFHLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQztBQUNwQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vMDEtYmFzaWNzLy4vc3JjL2luZGV4LnRzP2ZmYjQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZm9ybURhdGEgfSBmcm9tIFwiLi9mb3Jtc1wiO1xuXG5jb25zdCBmb3JtRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiZm9ybVwiKSE7XG5cbmZvcm1FbC5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIChldnQpID0+IHtcbiAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gIGNvbnN0IGRhdGFGb3JtID0gZm9ybURhdGEoZm9ybUVsKTtcbiAgY29uc29sZS5sb2coZGF0YUZvcm0pO1xufSk7XG5cbmNsYXNzIFVzZXIge1xuICBwdWJsaWMgdXNlcm5hbWU6IHN0cmluZztcbiAgcHVibGljIGFnZTogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKHVzZXJuYW1lOiBzdHJpbmcsIGFnZTogbnVtYmVyKSB7XG4gICAgdGhpcy51c2VybmFtZSA9IHVzZXJuYW1lO1xuICAgIHRoaXMuYWdlID0gYWdlO1xuICB9XG5cbiAgcHVibGljIHN1bW1hcnkoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYCR7dGhpcy51c2VybmFtZX0gaXMgJHt0aGlzLmFnZX0teWVhcnMgb2xkIWA7XG4gIH1cbn1cblxuY29uc3QgdXNlcjEgPSBuZXcgVXNlcihcIkRhdmlkXCIsIDI1KTtcbmNvbnNvbGUubG9nKHVzZXIxLnN1bW1hcnkoKSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/index.ts\n");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;