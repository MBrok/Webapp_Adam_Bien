import AddStock from './views/AddStock.js';
import ListStocks from './views/ListStocks.js';

export default class AirSlot extends HTMLElement {

    constructor() {
        super();
        this.oldChild = null;
        this.root = this.attachShadow({mode:'open'});
    }

    connectedCallback() {
        document.addEventListener('air-nav', e => this.onNavigation(e));
        this.root.innerHTML = `
            <slot name="header">HEADER</slot>
            <slot name="view">CONTENT</slot>
            <slot name="footer">FOOTER</slot>
        `;
        this.oldChild = this.root.querySelector("[name=view]");
    }

    onNavigation(evt) {
        const { detail } = evt;
        const { hash:linkName } = detail;
        const { text } = detail;
        const { href } = detail;

        console.log(href, linkName, text);
        
        let newChild = null;

        if(linkName === 'add') {
            newChild = new AddStock();
        }
        if(linkName === 'list') {
            newChild = new ListStocks();
        }
        if(this.oldChild){
            this.root.replaceChild(newChild,this.oldChild);
        }else {
            this.root.appendChild(newChild);
        }
        this.oldChild = newChild;
    }
}

customElements.define('air-slot', AirSlot);