/// <reference types="cypress" />

describe('testando a página de politica de privacidade de forma independente', () => {
    beforeEach(() => {
        cy.visit('localhost:5500/src/privacy.html')
    });
    
    it('verificando titulo', () => {
        cy.get('#title').should('have.text', 'CAC TAT - Política de privacidade')
    });

    it('verificando a presença do elemento portador do texto', () => {
        cy.get('.privacy').should('be.visible')
    });


});