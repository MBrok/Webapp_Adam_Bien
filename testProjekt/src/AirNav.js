export default class AirNav extends HTMLElement {
    constructor() {
        super();
        this.activelLnk = null;
    }

    connectedCallback() {
        this.activeLinkClass = this.getAttribute('activeLinkClass');
        if(!this.activeLinkClass){
            this.activeLinkClass = 'active-link';
        }
        const links = this.querySelectorAll("a");
        console.log(links);
        links.forEach(e => this.registerListener(e));
    }

    registerListener(e) {
        e.onclick = evt => this.onLinkClicked(evt);
    }

    onLinkClicked(evt) {
        const { target } = evt;
        if(this.activelLnk) {
            this.activelLnk.classList.toggle(this.activeLinkClass);
        }
        this.activelLnk = target;
        this.activelLnk.classList.toggle(this.activeLinkClass);
        evt.preventDefault();
        const event = new CustomEvent('air-nav', {
            detail: {
                href: target.href,
                hash: target.hash.substring(1), 
                text: target.text
            },
            bubbles: true
        });
        this.dispatchEvent(event);
    }
}

customElements.define('air-nav', AirNav);
