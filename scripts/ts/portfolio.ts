import PortfolioItem from "./portfolio-item.js";

async function create_portfolio(items: string[]) {

    const path: string = "../../files/";
    const start: HTMLElement = document.querySelector("#personal_work > div")!;

    console.debug(start);

    const load_widget = async (item: string): Promise<HTMLElement> => {

        const fp: string = path + item + ".json";
        console.debug(fp);

        const div: PortfolioItem | undefined = await PortfolioItem.from_file(fp, item === "commander"? "230vw": "128vw");

        if (div === undefined) {
            console.error(`Could not generate ${item} PortfolioDiv`);
            return document.createElement("div");
        }

        const ele = await div.create_div();

        console.debug(`Appended ${ele} to ${start}`);

        return ele;
    }

    Promise.all(items.map(load_widget))
        .then((responses:HTMLElement[]) => {
            responses.map((e: HTMLElement) => start.appendChild(e))
            }
        );
}

create_portfolio(["colorpicker", "commander", "paradise", "salvador", "terminal"])