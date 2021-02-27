context('navigation',()=> {
    beforeEach(()=>{
        cy.visit("http://localhost:3000");
    });

    it('navigation by click', () => {
        cy.get(`[href="#overview"]`).click().should("have.class","a-link");
        cy.get(`[href="#list"]`).click().should("have.class","a-link");
        cy.get(`[href="#overview"]`).should("not.have.class","a-link");
    });

});