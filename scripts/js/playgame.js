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
loadGamePage();
function loadGamePage() {
    return __awaiter(this, void 0, void 0, function* () {
        let url = new URL(document.URL);
        const game = url.searchParams.get("game");
        console.log(game);
        const json = yield fetch(`../../files/${game}.json`)
            .then(response => response.json())
            .catch(error => {
            console.error(`Information on this game cannot be retrieved due to ${error}`);
        });
        console.log(json);
        if (json === null) {
            return;
        }
        loadGameEmbed(json);
        loadGameText(json);
    });
}
function loadGameText(json) {
    var _a, _b;
    if ("TEXT" in json) {
        let textNode = document.createTextNode(json["TEXT"]);
        (_a = document.getElementById("text")) === null || _a === void 0 ? void 0 : _a.appendChild(textNode);
    }
    if ("REPO" in json) {
        let repoNode = document.createElement("a");
        repoNode.setAttribute("href", json["REPO"]);
        repoNode.innerText = "GitHub Repository Link";
        (_b = document.getElementById("githublink")) === null || _b === void 0 ? void 0 : _b.appendChild(repoNode);
    }
    if ("TITLE" in json) {
        let headerNode = document.getElementById("title");
        if (headerNode !== null) {
            headerNode.innerText = json["TITLE"];
        }
    }
}
function loadGameEmbed(json) {
    var _a;
    let json_link = (typeof json["LINK"] === 'string') ? json["LINK"] : "";
    const attrs = {
        src: json_link,
        width: "1152",
        height: "692",
        allowfullscreen: "",
        frameborder: "0",
    };
    let iframeNode = document.createElement("iframe");
    for (const attr in attrs) {
        iframeNode.setAttribute(attr, attrs[attr]);
    }
    (_a = document.getElementById("game")) === null || _a === void 0 ? void 0 : _a.appendChild(iframeNode);
}
//# sourceMappingURL=playgame.js.map