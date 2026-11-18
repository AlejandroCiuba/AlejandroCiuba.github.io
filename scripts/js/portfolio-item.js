var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export default class PortfolioItem {
    constructor(json, ref, width = "128vw", height = "128vh") {
        var _a, _b, _c, _d;
        this.ref = "";
        this.name = "";
        this.description = "";
        this.link = "";
        this.repository = "";
        this.image = "";
        this.iframe = "";
        this.height = "";
        this.width = "";
        if (ref === undefined || ref === "") {
            console.debug("No reference given, assigning default");
            this.ref = "PortfolioDiv";
        }
        this.ref = ref;
        this.name = json.TITLE;
        this.description = (_a = json.TEXT) !== null && _a !== void 0 ? _a : "";
        this.link = (_b = json.LINK) !== null && _b !== void 0 ? _b : "";
        this.repository = (_c = json.REPO) !== null && _c !== void 0 ? _c : "";
        this.image = json.IMAGE;
        this.iframe = (_d = json.IFRAME) !== null && _d !== void 0 ? _d : "";
        this.width = width;
        this.height = height;
    }
    static from_file(file_1) {
        return __awaiter(this, arguments, void 0, function* (file, width = "128vw", height = "128vh") {
            const json = yield fetch(file)
                .then(response => response.json())
                .catch(error => {
                console.error(`Information on this game cannot be retrieved due to ${error}`);
            });
            if (json === undefined) {
                return undefined;
            }
            return new PortfolioItem(json, file.substring(file.lastIndexOf("/") + 1, file.lastIndexOf(".")), width, height);
        });
    }
    create_div() {
        return __awaiter(this, void 0, void 0, function* () {
            const div = document.createElement("div");
            div.setAttribute("class", "personal_entry");
            const a = document.createElement("a");
            a.setAttribute("href", `play-game.html?game=${this.ref}`);
            const img = document.createElement("img");
            img.setAttribute("src", this.image);
            img.setAttribute("width", this.width);
            img.setAttribute("height", this.height);
            img.setAttribute("style", "border-radius: 10%;");
            div.appendChild(a);
            a.appendChild(img);
            return div;
        });
    }
    create_iframe() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.iframe !== "") {
                const div = document.createElement("div");
                div.innerHTML = this.iframe;
                return div.firstChild;
            }
            const iframe = document.createElement("iframe");
            const attrs = {
                src: this.link,
                width: "1152",
                height: "692",
                allowfullscreen: "",
                frameborder: "0",
            };
            for (const attr in attrs) {
                iframe.setAttribute(attr, attrs[attr]);
            }
            return iframe;
        });
    }
}
//# sourceMappingURL=portfolio-item.js.map