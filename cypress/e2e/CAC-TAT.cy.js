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
      cy.fillMandatoryFields() // comando customizado
  
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
      cy.fillMandatoryFields()

      cy.get('#phone-checkbox').check()
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

  context('select de produto', () => {
    it('verificar a seleção de um produto (texto)', () => {
      cy.get('#product').select('Cursos')
      cy.get('#product').should('have.value', 'cursos')
      
      cy.get('#product').select('youtube')
      cy.get('#product').should('have.value', 'youtube')

      cy.get('#product').select(1)
      cy.get('#product').should('have.value', 'blog')

    });
  });

  context('check no input do tipo radio', () => {
    it('verificar o input radio', () => {
      cy.get('[value="elogio"]').check()
      cy.get('[value="elogio"]').should('be.checked')

    });

    it('verificar cada check', () => {
      
      cy.get('[type="radio"]')
      .should('have.length', 3).each((val) => {
        cy.wrap(val).check()
        cy.wrap(val).should('be.checked')
      } )

    });
  });

  context('marcando e desmarcando inputs do tipo checkbox', () => {
    it('testando os checkbox', () => {
      cy.get('[type="checkbox"]').each((val) => {
        cy.wrap(val).check()
        cy.wrap(val).should('be.checked')
      });

      cy.get('[type="checkbox"]').last().uncheck()
      cy.get('#phone-checkbox').should('not.be.checked')
    });

  });

  context('selecionando arquivo e anexando ao formulário', () => {
    it('selecionar arquivo da pasta fixtures', () => {
      const filePath = '../fixtures/genericFile.txt'

      cy.get('#file-upload')
      .should('not.have.value').attachFile(filePath)
      
      cy.get('#file-upload')
      .should((input) => {
        expect(input[0].files[0].name).to.eq('genericFile.txt')
      })

    });

    it('selecionar um arquivo simulando drag-and-drop e utilizando alias', () => {
      // cy.fixture('arquivo').as('alias-do-arquivo')

      cy.get('#file-upload')
      .should('not.have.value').attachFile('genericFile.txt', { action: 'drag-drop' })
      
      cy.get('#file-upload')
      .should((input) => {
        expect(input[0].files[0].name).to.eq('genericFile.txt')
      })
    });

  });

  context('lidando com links para outra aba do navegador', () => {
    it('verificar politica de privacidade sem clicar na mesma', () => {
      // verificar se o link está configurado para abrir em uma nova guia
      cy.contains('Política de Privacidade').should('have.attr', 'target', '_blank')
    });
    
    it('verificar politica de privacidade clicando no link', () => {
      cy.contains('Política de Privacidade')
        .invoke('removeAttr', 'target')
        .click()

      cy.get('#title').should('have.text', 'CAC TAT - Política de privacidade') 
    });
  });

})
