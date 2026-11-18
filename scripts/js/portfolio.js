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
function create_portfolio(items) {
    return __awaiter(this, void 0, void 0, function* () {
        const path = "../../files/";
        const start = document.querySelector("#personal_work > div");
        console.debug(start);
        const load_widget = (item) => __awaiter(this, void 0, void 0, function* () {
            const fp = path + item + ".json";
            console.debug(fp);
            const div = yield PortfolioItem.from_file(fp, item === "commander" ? "230vw" : "128vw");
            if (div === undefined) {
                console.error(`Could not generate ${item} PortfolioDiv`);
                return document.createElement("div");
            }
            const ele = yield div.create_div();
            console.debug(`Appended ${ele} to ${start}`);
            return ele;
        });
        Promise.all(items.map(load_widget))
            .then((responses) => {
            responses.map((e) => start.appendChild(e));
        });
    });
}
create_portfolio(["colorpicker", "commander", "paradise", "salvador", "terminal"]);
//# sourceMappingURL=portfolio.js.map