describe('Проверка работы очереди', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/queue')
    })

    it('Инпут пустой, кнопки неактивны', () => {
        cy.contains('Добавить').should('be.disabled')
        cy.contains('Удалить').should('be.disabled')
        cy.contains('Очистить').should('be.disabled')
        cy.get('input').should('be.empty')
        cy.get('[cy-id="circle"]').should('have.length', 6).should(($circle) => {
            expect($circle.eq(0)).to.contain('').to.have.css('border-color', 'rgb(0, 50, 255)')
            expect($circle.eq(1)).to.contain('').to.have.css('border-color', 'rgb(0, 50, 255)')
            expect($circle.eq(2)).to.contain('').to.have.css('border-color', 'rgb(0, 50, 255)')
            expect($circle.eq(3)).to.contain('').to.have.css('border-color', 'rgb(0, 50, 255)')
            expect($circle.eq(4)).to.contain('').to.have.css('border-color', 'rgb(0, 50, 255)')
            expect($circle.eq(5)).to.contain('').to.have.css('border-color', 'rgb(0, 50, 255)')
           })
    })

    it('Элемент добавляется и удаляется корректно', () => {
       cy.get('input').type('1').should('have.value', '1') 
       cy.contains('Добавить').should('not.be.disabled').click()
       cy.get('input').should('be.empty')

       cy.clock()

       cy.get('[class*=circle_content]').should('have.length', 6).should(($circle) => {
        expect($circle.eq(0)).to.contain('1')
        expect($circle.eq(0)).to.contain('head')
        expect($circle.eq(0)).to.contain('tail')
        expect($circle.eq(0).children('[cy-id="circle"]')).to.have.css('border-color', 'rgb(210, 82, 225)')
       })
       
       cy.get('input').type('2').should('have.value', '2')
       cy.contains('Добавить').should('not.be.disabled').click()
       
       cy.get('[class*=circle_content]').should('have.length', 6).should(($circle) => {
        expect($circle.eq(0)).to.contain('1')
        expect($circle.eq(1)).to.contain('2')
        expect($circle.eq(0)).to.contain('head')
        expect($circle.eq(1)).to.contain('tail')
        expect($circle.eq(0).children('[cy-id="circle"]')).to.have.css('border-color', 'rgb(0, 50, 255)')
        expect($circle.eq(1).children('[cy-id="circle"]')).to.have.css('border-color', 'rgb(210, 82, 225)')
       })

       cy.tick(1000)
       cy.contains('Удалить').click()

       cy.get('[class*=circle_content]').should('have.length', 6).should(($circle) => {
        expect($circle.eq(0)).to.contain('1')
        expect($circle.eq(0)).to.contain('head')
        expect($circle.eq(0).children('[cy-id="circle"]')).to.have.css('border-color', 'rgb(210, 82, 225)')
        expect($circle.eq(1).children('[cy-id="circle"]')).to.have.css('border-color', 'rgb(0, 50, 255)')
        expect($circle.eq(1)).to.contain('2')
        expect($circle.eq(1)).to.contain('tail')
        })

        cy.tick(1000)

        cy.get('[class*=circle_content]').should('have.length', 6).should(($circle) => {
          expect($circle.eq(0)).to.contain('')
          expect($circle.eq(0).children('[cy-id="circle"]')).to.have.css('border-color', 'rgb(0, 50, 255)')
          expect($circle.eq(1).children('[cy-id="circle"]')).to.have.css('border-color', 'rgb(0, 50, 255)')
          expect($circle.eq(1)).to.contain('2')
          expect($circle.eq(1)).to.contain('tail')
          expect($circle.eq(1)).to.contain('head')
         })
    })
    
    it('Очередь очищается корректно', () => {
        cy.get('input').type('1').should('have.value', '1') 
        cy.contains('Добавить').should('not.be.disabled').click()
        cy.get('input').type('2').should('have.value', '2') 
        cy.contains('Добавить').should('not.be.disabled').click()
        cy.get('input').type('3').should('have.value', '3') 
        cy.contains('Добавить').should('not.be.disabled').click()

        cy.clock()

        cy.contains('Очистить').should('not.be.disabled').click()

        cy.get('[class*=circle_content]').should('have.length', 6).should(($circle) => {
            expect($circle.eq(0)).to.contain('1')
            expect($circle.eq(0)).to.contain('head')
            expect($circle.eq(1)).to.contain('2')
            expect($circle.eq(2)).to.contain('3')
            expect($circle.eq(2)).to.contain('tail')
            expect($circle.eq(0).children('[cy-id="circle"]')).to.have.css('border-color', 'rgb(210, 82, 225)')
            expect($circle.eq(1).children('[cy-id="circle"]')).to.have.css('border-color', 'rgb(210, 82, 225)')
            expect($circle.eq(2).children('[cy-id="circle"]')).to.have.css('border-color', 'rgb(210, 82, 225)')
            })

        cy.tick(1000)

        cy.get('[class*=circle_content]').should('have.length', 6).should(($circle) => {
            expect($circle.eq(0)).to.contain('')
            expect($circle.eq(0)).not.to.contain('head')
            expect($circle.eq(1)).to.contain('')
            expect($circle.eq(2)).to.contain('')
            expect($circle.eq(2)).not.to.contain('tail')
            expect($circle.eq(0).children('[cy-id="circle"]')).to.have.css('border-color', 'rgb(0, 50, 255)')
            expect($circle.eq(1).children('[cy-id="circle"]')).to.have.css('border-color', 'rgb(0, 50, 255)')
            expect($circle.eq(2).children('[cy-id="circle"]')).to.have.css('border-color', 'rgb(0, 50, 255)')
            })


    })


})