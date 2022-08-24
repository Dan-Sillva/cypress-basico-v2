/// <reference types="cypress" />

describe('Central de atendimento ao cliente TAT', () => {
  beforeEach(() => {
    cy.visit('localhost:5500/src')
  });
  
  it('verificar o titulo da aplicação', () => {
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
  });

  context('envio de formulário', () => {
    it('verificar envio do formulário (cenário de sucesso)', () => {
      cy.fillMandatoryFieldsAndSubmit() // comando customizado
  
      cy.contains('Enviar').click()
      cy.get('.success').should('be.visible')
    });

    it('verificar envio do formuário com erro na formatação do email', () => {
      cy.get('#firstName').type('Danilo')
      cy.get('#lastName').type('Araujo Silva')
  
      cy.get('#email').type('mail@ex')
  
      cy.get('#open-text-area').type('Traz a budweiser do pai')
  
      cy.contains('Enviar').click()
  
      cy.get('.error').should('be.visible')
    });

    it('verificando restrição do campo de telefone (somente numeros)', () => {
      cy.get('#phone').type('asdfasdfasdf')

      cy.get('#phone').should('have.value', '')
    });

    it('verificar envio do formuário com erro, quando o telefone se torna obrigatório (campo telefone não preenchido)', () => {
      cy.fillMandatoryFieldsAndSubmit()

      cy.get('#phone-checkbox').click()
      cy.contains('Enviar').click()
      
      cy.get('.error').should('be.visible')
    });

    it('verificar campos ao preencher e limpar seu conteudo', () => {
      cy.get('#firstName').type('Danilo').should('have.value', 'Danilo')
      .clear().should('have.value', '') 

      cy.get('#lastName').type('Araujo Silva').should('have.value', 'Araujo Silva')
      .clear().should('have.value', '')

      cy.get('#email').type('mail@example.com').should('have.value', 'mail@example.com')
      .clear().should('have.value', '')

      cy.get('#open-text-area').type('testeee').should('have.value', 'testeee')
      .clear().should('have.value', '')
    });

    it('verificar envio do formulário sem preencher os campos', () => {
      cy.contains('Enviar').click()

      cy.get('.error').should('be.visible')
    });

  });

})