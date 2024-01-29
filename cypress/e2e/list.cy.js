describe('Проверка работы связного списка', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/list')
    })

    it('Инпуты пустые, кнопки добавления неактивны, кнопки удаления активны', () => {
        cy.contains('Добавить в Head').should('be.disabled')
        cy.contains('Добавить в Tail').should('be.disabled')
        cy.contains('Добавить по индексу').should('be.disabled')
        cy.contains('Удалить по индексу').should('be.disabled')
        cy.contains('Удалить из Head').should('not.be.disabled')
        cy.contains('Удалить из Tail').should('not.be.disabled')
        cy.get('input[type="text"]').should('be.empty')
        cy.get('input[type="number"]').should('be.empty')
    })

    it('Элемент добавляется и удаляется корректно', () => {
        cy.get('input[type="text"]').type('1').should('have.value', '1') 
        cy.contains('Добавить в Head').should('not.be.disabled').click()
        cy.clock()
        

        cy.get('[class*=circle_small]').should('exist').should('have.css', 'border-color', 'rgb(210, 82, 225)').should('have.text', '1')

        cy.tick(1000) 

        cy.get('[class*=circle_content]').should(($circle) => {
            expect($circle.eq(0)).to.contain('1')
            expect($circle.eq(0)).to.contain('head')
            expect($circle.eq(0).children('[cy-id="circle"]')).to.have.css('border-color', 'rgb(127, 224, 81)')
           })
        

        cy.tick(1000)
        
        cy.contains('Удалить из Head').should('not.be.disabled').click()

        cy.get('[class*=circle_small]').should('exist').should('have.css', 'border-color', 'rgb(210, 82, 225)').should('have.text', '1')

        cy.get('[class*=circle_content]').should(($circle) => {
            expect($circle.eq(0)).to.contain('')
            expect($circle.eq(0)).to.contain('head')
            expect($circle.eq(0).children('[cy-id="circle"]')).to.have.css('border-color', 'rgb(0, 50, 255)')
           })


        cy.tick(1000)   


        cy.get('input[type="text"]').type('1').should('have.value', '1') 
        cy.contains('Добавить в Tail').should('not.be.disabled').click()

        cy.get('[class*=circle_small]').should('exist').should('have.css', 'border-color', 'rgb(210, 82, 225)').should('have.text', '1')

        cy.tick(1000)

        cy.get('[class*=circle_content]').should(($circle) => {
            expect($circle.eq($circle.length - 1)).to.contain('1')
            expect($circle.eq($circle.length - 1)).to.contain('tail')
            expect($circle.eq($circle.length - 1).children('[cy-id="circle"]')).to.have.css('border-color', 'rgb(127, 224, 81)')
           })


        cy.tick(1000)
        
        cy.contains('Удалить из Tail').should('not.be.disabled').click()
   
        cy.get('[class*=circle_small]').should('exist').should('have.css', 'border-color', 'rgb(210, 82, 225)').should('have.text', '1')   
 
        cy.tick(1000)

        cy.get('[class*=circle_content]').should(($circle) => {
            expect($circle.eq($circle.length - 1)).to.contain('')
            expect($circle.eq($circle.length - 1)).to.contain('tail')
            expect($circle.eq($circle.length - 1).children('[cy-id="circle"]')).to.have.css('border-color', 'rgb(0, 50, 255)')
           })
 

        cy.tick(1000)
    })

    it('Элемент корректно добавляется и удаляется по индексу', () => {
        cy.get('input[type="text"]').type('1').should('have.value', '1') 
        cy.get('input[type="number"]').type(3).should('have.value', '3')
        cy.contains('Добавить по индексу').should('not.be.disabled').click()

        cy.clock()

        cy.get('[class*=circle_small]').should('exist').should('have.css', 'border-color', 'rgb(210, 82, 225)').should('have.text', '1')

        cy.tick(1000) 

        cy.get('[class*=circle_content]').should(($circle) => {
            expect($circle.eq(3)).to.contain('1')
            expect($circle.eq(3).children('[cy-id="circle"]')).to.have.css('border-color', 'rgb(127, 224, 81)')
           })
        
        cy.tick(1000)   

        cy.get('input[type="number"]').type(2).should('have.value', '2')
        cy.contains('Удалить по индексу').should('not.be.disabled').click()

        cy.get('[class*=circle_small]').should('exist')

        cy.get('[class*=circle_content]').should(($circle) => {
            expect($circle.eq(2)).to.contain('')
            expect($circle.eq(2).children('[cy-id="circle"]')).to.have.css('border-color', 'rgb(0, 50, 255)')
           })

        cy.tick(1000)     

  


    })
})