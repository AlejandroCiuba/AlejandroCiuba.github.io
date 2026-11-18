interface ProjectJSON {
    LINK: string,
    TITLE: string,
    TEXT: string,
    REPO: string,
    IMAGE: string,
}


export default class PortfolioDiv {

    ref: string = "";
    name: string = "";
    description: string = "";

    link: string = "";
    repository: string = "";

    image: string = "";

    height: string = "";
    width: string = "";

    constructor(json: ProjectJSON, ref: string, width: string = "128vw", height: string = "128vh") {

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

    static async from_file(file: string, width: string = "128vw", height: string = "128vh"): Promise<PortfolioDiv | undefined> {
        
        const json = await fetch(file)
            .then(response => response.json())
            .catch(error => {
                console.error(`Information on this game cannot be retrieved due to ${error}`);
            }
        );

        if (json === undefined) {
            return undefined;
        }

        return new PortfolioDiv(json, file.substring(file.lastIndexOf("/") + 1, file.lastIndexOf(".")), width, height);
    }

    async create_div(): Promise<HTMLDivElement> {

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
    }
}