"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const txtInputEl = document.getElementById("txt-input");
const txtResultEl = document.getElementById("txt-result");
const btnTranslateEl = document.getElementById("btn-translate");
btnTranslateEl.addEventListener("click", (evt) => __awaiter(void 0, void 0, void 0, function* () {
    evt.preventDefault();
    const res = yield fetch("https://libretranslate.com/translate", {
        method: "POST",
        body: JSON.stringify({
            q: "big",
            source: "auto",
            target: "de",
            format: "text",
            api_key: "",
        }),
        headers: { "Content-Type": "application/json" },
    });
    console.log(yield res.json());
}));
const mySet = new Set([1, 2, 3]);
