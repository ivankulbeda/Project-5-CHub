

describe('Issue create', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url()
      .should('eq', `${Cypress.env('baseUrl')}project/board`)
      .then((url) => {
        cy.visit(url + '/board?modal-issue-create=true');
      });
  });

it('Need to create a new issue with random data plugin',()=> {
  cy.get('[data-testid="modal:issue-create"]').within(() => {
    cy.get('.ql-editor').type('Random data plugin description');
    cy.get('input[name="title"]').type('Random Name');
    cy.get('[data-testid="select:type"]').click();
    cy.get('[data-testid="icon:task"]').should('be.visible');
    cy.get('[data-testid="select:reporterId"]').click();
    cy.get('[data-testid="select-option:Baby Yoda"]').click();
    cy.get('[data-testid="select:priority"]').click();
    cy.get('[data-testid="select-option:Low"]').click();
    cy.get('button[type="submit"]').click();
  });
    
  cy.contains('Issue has been successfully created.').should('be.visible');
    cy.reload();
    cy.contains('Issue has been successfully created.').should('not.exist');
    cy.get('[data-testid="modal:issue-create"]').should('not.exist');
    cy.get('[data-testid="board-list:backlog"]')
      .should('be.visible')
      .and('have.length', '1')
      .within(() => {
        cy.get('[data-testid="list-issue"]')
          .should('have.length', '5')
          .first()
          .find('p')
          .contains('Random Name')
          .siblings()
          .within(() => {
          cy.get('[data-testid="icon:task"]').should('be.visible');
          })
          })
  })
})
