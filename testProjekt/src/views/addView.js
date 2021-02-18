export default class AddView extends HTMLElement {
    constructor(){
        super();
    }

    connectedCallback(){
        this.innerHTML = `
            <input placeholder="blabla"></input>
            <button>add</button>
        `;
    }
}

customElements.define("add-view",AddView);