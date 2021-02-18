export default class ListView extends HTMLElement {
    constructor(){
        super();
    }

    connectedCallback(){
        this.innerHTML = `
            <style>
                header{ 
                    background-color: var(--air-header-color,pink); 
                } 
            </style>
            <header>
            <h2> the stocks</h2>
            </header>
        `;
    }

}

customElements.define('list-view',ListView);