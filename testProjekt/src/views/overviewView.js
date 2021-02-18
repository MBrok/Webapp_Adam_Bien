export default class OverviewView extends HTMLElement {

    constructor(){
        super();
    }

    connectedCallback(){
        this.innerHTML = `
            abc
            <output>1000 SUN Micro</output>
        `;      
    }
}

customElements.define('overview-view',OverviewView);