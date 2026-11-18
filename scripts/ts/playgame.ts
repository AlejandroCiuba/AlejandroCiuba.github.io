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

    loadGameText(item);
    await loadGameEmbed(item);
    
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

async function loadGameEmbed(item: PortfolioItem) {
    document.getElementById("game")?.appendChild(await item.create_iframe());
}

loadGamePage()