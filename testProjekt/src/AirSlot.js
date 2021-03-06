export default class AirSlot extends HTMLElement {

    constructor() {
        super();
        this.oldChild = null;
        this.currentView = null;
        this.loadConfiguration();
        this.root = this.attachShadow({mode:'open'});
    }

    async loadConfiguration(){
        const response = await fetch('configuration.json');
        this.configuration = await response.json();
        document.addEventListener('air-nav', e => this.onNavigation(e));
    }

    connectedCallback() {
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
        this.currentView = linkName;
        console.log("Navs current view: "+this.currentView);
        let file = `${linkName}View.js`;
        const viewConfiguration = this.configuration[linkName];
        if(viewConfiguration && viewConfiguration.file){
            file = viewConfiguration.file;
        }
        this.loadView(file);
    }

    async loadView(file){
        const  { default: View } = await import(`./views/${file}`);
        let newChild;
        if(View.prototype instanceof HTMLElement){
            newChild = new View();
            if(this.oldChild){
                this.root.replaceChild(newChild,this.oldChild);
            }else {
                this.root.appendChild(newChild);
            }    
        } else {
            this.root.innerHTML = View;
            newChild = this.root.querySelector('article');
        }

        this.oldChild = newChild;

    }
}

customElements.define('air-slot', AirSlot);