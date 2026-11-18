var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import PortfolioItem from "./portfolio-item.js";
function loadGamePage() {
    return __awaiter(this, void 0, void 0, function* () {
        let url = new URL(document.URL);
        const game = url.searchParams.get("game");
        console.debug(game);
        const item = yield PortfolioItem.from_file(`../../files/${game}.json`);
        if (item === undefined) {
            console.error(`Failed to load ${game} data`);
            return;
        }
        loadGameText(item);
        yield loadGameEmbed(item);
    });
}
function loadGameText(item) {
    var _a, _b;
    const textNode = document.createTextNode(item.description);
    (_a = document.getElementById("text")) === null || _a === void 0 ? void 0 : _a.appendChild(textNode);
    const repoNode = document.createElement("a");
    repoNode.innerText = "GitHub Repository Link";
    repoNode.setAttribute("href", item.repository);
    (_b = document.getElementById("githublink")) === null || _b === void 0 ? void 0 : _b.appendChild(repoNode);
    const headerNode = document.getElementById("title");
    if (headerNode !== null) {
        headerNode.innerText = item.name;
    }
}
function loadGameEmbed(item) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        (_a = document.getElementById("game")) === null || _a === void 0 ? void 0 : _a.appendChild(yield item.create_iframe());
    });
}
loadGamePage();
//# sourceMappingURL=playgame.js.map