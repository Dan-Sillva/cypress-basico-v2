/// <reference types="cypress" />

describe('Central de atendimento ao cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html')
  });
  
  it('verificar o titulo da aplicação', () => {
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
  });

  context('envio de formulário', () => {
    Cypress._.times(5, () => {
      it('verificar envio do formulário (cenário de sucesso)', () => {
        cy.clock()
        cy.fillMandatoryFields() // comando customizado
    
        cy.contains('Enviar').click()
        cy.get('.success').should('be.visible')
  
        cy.tick(3000)
        cy.get('.success').should('not.be.visible')
      });
    })

    it('verificar envio do formuário com erro na formatação do email', () => {
      cy.clock()
      
      cy.get('#firstName').invoke('val', 'Danilo')
      cy.get('#lastName').invoke('val', 'Araujo Silva')
  
      cy.get('#email').invoke('val', 'mail@ex')
  
      cy.get('#open-text-area').invoke('val', 'Traz a budweiser do pai')
  
      cy.contains('Enviar').click()
  
      cy.get('.error').should('be.visible')

      cy.tick(3000)
      cy.get('.error').should('not.be.visible')
    });

    it('verificando restrição do campo de telefone (somente numeros)', () => {
      cy.get('#phone').invoke('val', 'asdfasdfasdf')

      cy.get('#phone').should('have.value', '')
    });

    it('verificar envio do formuário com erro, quando o telefone se torna obrigatório (campo telefone não preenchido)', () => {
      cy.clock()

      cy.fillMandatoryFields()

      cy.get('#phone-checkbox').check()
      cy.contains('Enviar').click()
      
      cy.get('.error').should('be.visible')

      cy.tick(3000)
      cy.get('.error').should('not.be.visible')
    });

    it('verificar campos ao preencher e limpar seu conteudo', () => {
      cy.get('#firstName').invoke('val', 'Danilo').should('have.value', 'Danilo')
      .clear().should('have.value', '') 

      cy.get('#lastName').invoke('val', 'Araujo Silva').should('have.value', 'Araujo Silva')
      .clear().should('have.value', '')

      cy.get('#email').invoke('val', 'mail@example.com').should('have.value', 'mail@example.com')
      .clear().should('have.value', '')

      cy.get('#open-text-area').invoke('val', 'testeee').should('have.value', 'testeee')
      .clear().should('have.value', '')
    });

    it('verificar envio do formulário sem preencher os campos', () => {
      cy.clock()
      
      cy.contains('Enviar').click()
      cy.get('.error').should('be.visible')

      cy.tick(3000)
      cy.get('.error').should('not.be.visible')
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

  context('validando mensagens de sucesso e erro utilizando invoke ', () => {
    it('validar mensagem de sucesso', () => {
      cy.get('.success')
        .should('not.be.visible')
        .invoke('show')
        .should('be.visible')
        .invoke('hide')
        .should('not.be.visible')
    });

    it('validar mensagem de erro', () => {
      cy.get('.error')
        .should('not.be.visible')
        .invoke('show')
        .should('be.visible')
        .invoke('hide')
        .should('not.be.visible')
    });
  });

  context('teste da aplicação via requisição a nivel de rede', () => {
    it.only('realizar uma requisição http', () => {
      cy.request('GET', 'https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
        .then((response) => {
          expect(response.status).to.eq(200)
          expect(response.statusText).to.eq('OK')
          expect(response.body).to.include('CAC TAT')
        });
    });
  });

})
