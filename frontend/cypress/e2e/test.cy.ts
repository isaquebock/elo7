describe('Visualizar vagas', () => {
  describe('Visualizar vagas', () => {
    it('Dado que estou na página de vagas', () => {
      cy.visit('/')
    })

    it('Dado que estou na página de vagas', () => {
      cy.scrollTo(0, 3000)
    })

    it('Dado que estou na página de vagas', () => {
      cy.get('[data-cy="jobs__group"]')
    })
  })
})

describe('Paginação', () => {
  describe('Paginar listagem', () => {
    it('Dado que estou na página de vagas', () => {
      cy.visit('/')
    })

    it('Quando clico em trocar página', () => {
      cy.get('button[aria-label="Proxima página"]').click();
    })

    it('Então deve ser carregado a nova página de vagas', () => {
      cy.get('.mat-mdc-paginator-range-label').should('contain', '2 de 2');
    })
  })
})

describe('Buscar por vagas', () => {
  describe('Busca por vaga', () => {
    it('Dado que estou na página de vagas', () => {
      cy.visit('/')
    })

    it('Quando digito no input de busca', () => {
      cy.get('[data-cy="search"]').type('gerente');
    })

    it('Então deve aparecer as vagas correspondente a busca', () => {
      cy.get('.jobs__item-title').first().should('contain', 'gerente');
    })
  })
})