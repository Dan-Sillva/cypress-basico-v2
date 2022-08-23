/// <reference types="cypress" />

describe('Central de atendimento ao cliente TAT', () => {
  it('verificar o titulo da aplicação', () => {
    cy.visit('localhost:5500/src')

    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
  })
})