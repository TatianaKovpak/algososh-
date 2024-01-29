describe('Фибоначчи работает корректно', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/fibonacci')
    })
    it('Инпут пустой, кнопка неактивна', () => {
        cy.contains('Рассчитать').should('be.disabled')
        cy.get('input').should('be.empty')
    })

    it('Последовательнось Фибоначчи разворачивается корректно', () => {
        cy.get('input').type('9').should('have.value', '9')
        cy.contains('Рассчитать').should('not.be.disabled').click()

        cy.get('[cy-id="circle"]').should('have.length', 1).should(($circle) => {
            expect($circle.eq(0)).to.contain('1').to.have.css('border-color', 'rgb(0, 50, 255)')
        })
  
        cy.get('[cy-id="circle"]').should('have.length', 2).should(($circle) => {
            expect($circle.eq(1)).to.contain('1').to.have.css('border-color', 'rgb(0, 50, 255)')
        })

        cy.get('[cy-id="circle"]').should('have.length', 3).should(($circle) => {
            expect($circle.eq(2)).to.contain('2').to.have.css('border-color', 'rgb(0, 50, 255)')
        })
    
        cy.get('[cy-id="circle"]').should('have.length', 4).should(($circle) => {
            expect($circle.eq(3)).to.contain('3').to.have.css('border-color', 'rgb(0, 50, 255)')
        })
   
        cy.get('[cy-id="circle"]').should('have.length', 5).should(($circle) => {
            expect($circle.eq(4)).to.contain('5').to.have.css('border-color', 'rgb(0, 50, 255)')
        })

        cy.get('[cy-id="circle"]').should('have.length', 6).should(($circle) => {
            expect($circle.eq(5)).to.contain('8').to.have.css('border-color', 'rgb(0, 50, 255)')
        })
  
        cy.get('[cy-id="circle"]').should('have.length', 7).should(($circle) => {
            expect($circle.eq(6)).to.contain('13').to.have.css('border-color', 'rgb(0, 50, 255)')
        })

        cy.get('[cy-id="circle"]').should('have.length', 8).should(($circle) => {
            expect($circle.eq(7)).to.contain('21').to.have.css('border-color', 'rgb(0, 50, 255)')
        })

        cy.get('[cy-id="circle"]').should('have.length', 9).should(($circle) => {
            expect($circle.eq(8)).to.contain('34').to.have.css('border-color', 'rgb(0, 50, 255)')
        })

        cy.get('[cy-id="circle"]').should('have.length', 10).should(($circle) => {
            expect($circle.eq(9)).to.contain('55').to.have.css('border-color', 'rgb(0, 50, 255)')
        })

    })
})