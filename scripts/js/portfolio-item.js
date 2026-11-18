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
        this.ref = "";
        this.name = "";
        this.description = "";
        this.link = "";
        this.repository = "";
        this.image = "";
        this.height = "";
        this.width = "";
        if (ref === undefined || ref === "") {
            console.debug("No reference given, assigning default");
            this.ref = "PortfolioDiv";
        }
        this.ref = ref;
        this.name = json.TITLE;
        this.description = json.TEXT;
        this.link = json.LINK;
        this.repository = json.REPO;
        this.image = json.IMAGE;
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
            let div = document.createElement("div");
            div.setAttribute("class", "personal_entry");
            let a = document.createElement("a");
            a.setAttribute("href", `play-game.html?game=${this.ref}`);
            let img = document.createElement("img");
            img.setAttribute("src", this.image);
            img.setAttribute("width", this.width);
            img.setAttribute("height", this.height);
            img.setAttribute("style", "border-radius: 10%;");
            div.appendChild(a);
            a.appendChild(img);
            return div;
        });
    }
}
//# sourceMappingURL=portfolio-item.js.map