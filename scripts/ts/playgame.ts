import PortfolioItem from "./portfolio-item.js";

async function loadGamePage() {

    let url = new URL(document.URL);
    const game = url.searchParams.get("game");

    console.debug(game);

    const item: PortfolioItem | undefined = await PortfolioItem.from_file(`../../files/${game}.json`);

    
    if (item === undefined) {
        console.error(`Failed to load ${game} data`);
        return;
    }

    loadGameEmbed(item);
    loadGameText(item);
    
}

function loadGameText(item: PortfolioItem) {

    const textNode = document.createTextNode(item.description);
    document.getElementById("text")?.appendChild(textNode);

    const repoNode = document.createElement("a");
    repoNode.innerText = "GitHub Repository Link"
    repoNode.setAttribute("href", item.repository);
    document.getElementById("githublink")?.appendChild(repoNode);

    const headerNode = document.getElementById("title");
    if (headerNode !== null) {
        headerNode.innerText = item.name;
    }
}

function loadGameEmbed(item: PortfolioItem) {

    const json_link: string = (typeof item.link === 'string')? item.link : "";
    
    const attrs = {
        src: json_link,
        width: "1152",
        height: "692",
        allowfullscreen: "",
        frameborder: "0",
    }
    
    const iframeNode = document.createElement("iframe");
    
    for (const attr in attrs) {
        iframeNode.setAttribute(attr, attrs[attr as keyof typeof attrs]);
    }
    
    document.getElementById("game")?.appendChild(iframeNode);
}


loadGamePage()