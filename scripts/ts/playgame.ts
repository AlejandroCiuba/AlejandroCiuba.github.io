async function loadGamePage() {

    let url = new URL(document.URL);
    const game = url.searchParams.get("game");

    console.log(game);

    const json = await fetch(`../../files/${game}.json`)
        .then(response => response.json())
        .catch(error => {
            console.error(`Information on this game cannot be retrieved due to ${error}`);
        }
    );

    console.log(json);

    if (json === undefined) {
        return;
    }

    loadGameEmbed(json);
    loadGameText(json);
    
}

function loadGameText(json: any) {
    
    if ("TEXT" in json) {
        let textNode = document.createTextNode(json["TEXT"]);
        document.getElementById("text")?.appendChild(textNode);
    }
    
    if ("REPO" in json) {
        let repoNode = document.createElement("a")
        repoNode.setAttribute("href", json["REPO"]);
        repoNode.innerText = "GitHub Repository Link"
        document.getElementById("githublink")?.appendChild(repoNode);
    }

    if ("TITLE" in json) {
        let headerNode = document.getElementById("title");
        if (headerNode !== null) {
            headerNode.innerText = json["TITLE"];
        }
    }
    
}

function loadGameEmbed(json: any) {

    let json_link: string = (typeof json["LINK"] === 'string')? json["LINK"] : "";
    
    const attrs = {
        src: json_link,
        width: "1152",
        height: "692",
        allowfullscreen: "",
        frameborder: "0",
    }
    
    let iframeNode = document.createElement("iframe");
    
    for (const attr in attrs) {
        iframeNode.setAttribute(attr, attrs[attr as keyof typeof attrs]);
    }
    
    document.getElementById("game")?.appendChild(iframeNode);
}


loadGamePage()