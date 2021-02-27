context('navigation',()=> {
    beforeEach(()=>{
        cy.visit("http://localhost:3000");
    });

    const views = ['overview','add','list','about'];
    views.forEach( view => {
           it(`navigation by click -> ${view}`, () => {
                console.log("Clicking "+view);
                cy.get(`[href="#${view}"]`).click().should("have.class","a-link");
                cy.get('air-crumb').should('contain',view);
                cy.get('air-slot').then(ref => {
                    const  { currentView } = ref[0];
                    console.log("Tests Current View: "+currentView);          
                    expect(currentView).to.eq(view);
                });
            });

    });
});