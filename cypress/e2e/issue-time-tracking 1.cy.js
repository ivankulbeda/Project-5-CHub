describe('Issue create', () => {
  beforeEach(() => {
      cy.visit('/');
      cy.url()
          .should('eq', `${Cypress.env('baseUrl')}project/board`)
          .then((url) => {
              cy.visit(url + '/board?modal-issue-create=true');
          });
  });

  it('Need to create, edit and delete the time tracking estimation', () => {
      cy.get('[data-testid="modal:issue-create"]').within(() => {
          cy.get('.ql-editor').type('Time tracking estimation');
          cy.get('input[name="title"]').type('Time tracking');
          cy.get('[data-testid="select:priority"]').click();
          cy.get('[data-testid="select-option:Highest"]').click();
          cy.get('button[type="submit"]').click();
      });

      cy.wait(60000); // Wait for 20 seconds to ensure the issue appears on the board

      cy.get('[data-testid="list-issue"]').first().click();

      // Click on the "Number" field and interact with it
      cy.get('input[placeholder="Number"]').click().type('5');
      cy.get('body').click(637, 520); // Click on empty space to remove focus from the input field

      cy.get('input[placeholder="Number"]').should('have.value', '5').clear().type('10');
      cy.get('body').click(637, 520); // Click on empty space to remove focus from the input field

      cy.get('input[placeholder="Number"]').should('have.value', '10').clear();
      cy.get('body').click(637, 520); // Click on empty space to remove focus from the input field

      cy.get('input[placeholder="Number"]').should('have.value', '');
  });
});