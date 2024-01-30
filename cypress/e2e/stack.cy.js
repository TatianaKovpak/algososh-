import { circle, circleContent } from "../constans/constans"

describe('Проверка работы стэка', () => {
    beforeEach(() => {
        cy.visit('/stack')
    })

    it('Инпут пустой, кнопки неактивны', () => {
        cy.contains('Добавить').should('be.disabled')
        cy.contains('Удалить').should('be.disabled')
        cy.contains('Очистить').should('be.disabled')
        cy.get('input').should('be.empty')
        
    })

    it('Элемент добавляется и удаляется корректно', () => {
        cy.get('input').type('1').should('have.value', '1') 
        cy.contains('Добавить').should('not.be.disabled').click()
        cy.get('input').should('be.empty')

        cy.clock()

        cy.get(circleContent).should('have.length', 1).should(($circle) => {
            expect($circle.eq(0)).to.contain('1')
            expect($circle.eq(0)).to.contain('top')
            expect($circle.eq(0).children(circle)).to.have.css('border-color', 'rgb(210, 82, 225)')
           })
        cy.tick(1000)   

        cy.get('input').type('2').should('have.value', '2') 
        cy.contains('Добавить').should('not.be.disabled').click()  
        cy.get('input').should('be.empty') 

        cy.get(circleContent).should('have.length', 2).should(($circle) => {
            expect($circle.eq(0)).to.contain('1')
            expect($circle.eq(1)).to.contain('2')
            expect($circle.eq(0)).not.to.contain('top')
            expect($circle.eq(1)).to.contain('top')
            expect($circle.eq(0).children(circle)).to.have.css('border-color', 'rgb(0, 50, 255)')
            expect($circle.eq(1).children(circle)).to.have.css('border-color', 'rgb(210, 82, 225)')
           })
        cy.tick(1000)

        cy.contains('Удалить').click()

        cy.get(circleContent).should('have.length', 2).should(($circle) => {
            expect($circle.eq(0)).to.contain('1')
            expect($circle.eq(1)).to.contain('2')
            expect($circle.eq(0)).not.to.contain('top')
            expect($circle.eq(1)).to.contain('top')
            expect($circle.eq(0).children(circle)).to.have.css('border-color', 'rgb(0, 50, 255)')
            expect($circle.eq(1).children(circle)).to.have.css('border-color', 'rgb(210, 82, 225)')
           })

        cy.tick(1000)
        
        cy.get(circleContent).should('have.length', 1).should(($circle) => {
            expect($circle.eq(0)).to.contain('1')
            expect($circle.eq(0)).to.contain('top')
            expect($circle.eq(0).children(circle)).to.have.css('border-color', 'rgb(0, 50, 255)')
           })
        
        
    })

    it('Стэк очищается корректно', () => {
        cy.get('input').type('1').should('have.value', '1') 
        cy.contains('Добавить').should('not.be.disabled').click()
        cy.get('input').type('2').should('have.value', '2') 
        cy.contains('Добавить').should('not.be.disabled').click()
        cy.get('input').type('3').should('have.value', '3') 
        cy.contains('Добавить').should('not.be.disabled').click()

        cy.clock()

        cy.contains('Очистить').should('not.be.disabled').click()

        cy.get(circleContent).should('have.length', 3).should(($circle) => {
            expect($circle.eq(0)).to.contain('1')
            expect($circle.eq(1)).to.contain('2')
            expect($circle.eq(2)).to.contain('3')
            expect($circle.eq(2)).to.contain('top')
            expect($circle.eq(0).children(circle)).to.have.css('border-color', 'rgb(210, 82, 225)')
            expect($circle.eq(1).children(circle)).to.have.css('border-color', 'rgb(210, 82, 225)')
            expect($circle.eq(2).children(circle)).to.have.css('border-color', 'rgb(210, 82, 225)')
            })

        cy.tick(1000)

        cy.get(circleContent).should('not.exist')

    })

    
})