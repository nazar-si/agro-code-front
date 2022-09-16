describe('Drag test', () => {
    it('Drag panel', () => {
        cy.visit('http://127.0.0.1:5173/')
  
        cy.get("header").first().trigger("dragstart")
        cy.get(".side-snap").trigger("drop")
    })
})