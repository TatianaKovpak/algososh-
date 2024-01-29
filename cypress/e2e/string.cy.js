describe('Строка работает корректно', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/recursion')
        
    })

    it('Инпут пустой, кнопка неактивна', () => {
        cy.contains('Развернуть').should('be.disabled')
        cy.get('input').should('be.empty')
    })

    it('Строка разворачивается корректно', () => {
       cy.get('input').type('test').should('have.value', 'test') 
       cy.contains('Развернуть').should('not.be.disabled').click()

       cy.get('[cy-id="circle"]').should('have.length', 4).should(($circle) => {
        expect($circle.eq(0)).to.contain('t').to.have.css('border-color', 'rgb(0, 50, 255)')
        expect($circle.eq(1)).to.contain('e').to.have.css('border-color', 'rgb(0, 50, 255)')
        expect($circle.eq(2)).to.contain('s').to.have.css('border-color', 'rgb(0, 50, 255)')
        expect($circle.eq(3)).to.contain('t').to.have.css('border-color', 'rgb(0, 50, 255)')
       })

       cy.get('[cy-id="circle"]').should('have.length', 4).should(($circle) => {
        expect($circle.eq(0)).to.contain('t').to.have.css('border-color', 'rgb(210, 82, 225)')
        expect($circle.eq(1)).to.contain('e').to.have.css('border-color', 'rgb(0, 50, 255)')
        expect($circle.eq(2)).to.contain('s').to.have.css('border-color', 'rgb(0, 50, 255)')
        expect($circle.eq(3)).to.contain('t').to.have.css('border-color', 'rgb(210, 82, 225)')
       })

       cy.get('[cy-id="circle"]').should('have.length', 4).should(($circle) => {
        expect($circle.eq(0)).to.contain('t').to.have.css('border-color', 'rgb(127, 224, 81)')
        expect($circle.eq(1)).to.contain('s').to.have.css('border-color', 'rgb(210, 82, 225)')
        expect($circle.eq(2)).to.contain('e').to.have.css('border-color', 'rgb(210, 82, 225)')
        expect($circle.eq(3)).to.contain('t').to.have.css('border-color', 'rgb(127, 224, 81)')
       })

       cy.get('[cy-id="circle"]').should('have.length', 4).should(($circle) => {
        expect($circle.eq(0)).to.contain('t').to.have.css('border-color', 'rgb(127, 224, 81)')
        expect($circle.eq(1)).to.contain('s').to.have.css('border-color', 'rgb(127, 224, 81)')
        expect($circle.eq(2)).to.contain('e').to.have.css('border-color', 'rgb(127, 224, 81)')
        expect($circle.eq(3)).to.contain('t').to.have.css('border-color', 'rgb(127, 224, 81)')
       })

    })
})