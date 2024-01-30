describe('Counter main', () => {
    it('Приложение должно открыться по адресу: http://localhost:3000', () => {
        cy.visit('/')
        cy.contains('МБОУ АЛГОСОШ')
        cy.get('[href*="/recursion"]')
        cy.get('[href*="/fibonacci"]')
        cy.get('[href*="/sorting"]')
        cy.get('[href*="/stack"]')
        cy.get('[href*="/queue"]')
        cy.get('[href*="/list"]')
    })
})