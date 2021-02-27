context('navigation',()=> {
    beforeEach(()=>{
        cy.visit("http://localhost:3000");
    });

    const view = 'add';
    it('navigation by click', () => {
        cy.get(`[href="#${view}"]`).click().should("have.class","a-link");

        cy.get('air-crumb').should('contain',view);
        cy.get(`[href="#list"]`).click().should("have.class","a-link");
        cy.get(`[href="#${view}"]`).should("not.have.class","a-link");
    });

});