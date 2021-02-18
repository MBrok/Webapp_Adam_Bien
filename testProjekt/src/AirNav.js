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
        window.onhashchange = evt => this.onAdressBarChanged(evt);

    }

    onAdressBarChanged(evt){
        const { location } = window;
        const { href } = location;
        const { hash} = location;
        const event = new CustomEvent('air-nav', {
            detail: {
                href: href,
                hash: hash.substring(1)
            },
            bubbles: true
        });
        this.dispatchEvent(event);
        const element = this.querySelector(`[href="${hash}"]`);
        this.onLinkClicked({target: element});
    }

    onLinkClicked(evt) {
        const { target } = evt;
        if(this.activelLnk) {
            this.activelLnk.classList.toggle(this.activeLinkClass);
        }
        this.activelLnk = target;
        this.activelLnk.classList.toggle(this.activeLinkClass);

    }
}

customElements.define('air-nav', AirNav);
