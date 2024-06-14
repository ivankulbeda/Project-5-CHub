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

  cy.wait(60000); // Wait for 60 seconds to allow the issue to appear on the list

  cy.get('[data-testid="list-issue"]').first().click();

    cy.get('input[placeholder="Number"]').first().should('be.visible').clear().type('10').blur();
    cy.wait(2000); // Wait for 2 seconds to allow the change to be saved
    cy.reload();

    cy.get('input[placeholder="Number"]').first().should('be.visible').should('have.value', '10').clear().type('20').blur();
    cy.wait(2000); // Wait for 2 seconds to allow the change to be saved
    cy.reload();

    cy.get('input[placeholder="Number"]').first().should('be.visible').should('have.value', '20').clear().blur();
    cy.wait(2000); // Wait for 2 seconds to allow the change to be saved
    cy.reload();

    cy.get('input[placeholder="Number"]').first().should('be.visible').should('have.value', '');
  });

  it.only('Need to create and delete the logged time', () => {

    cy.get('[data-testid="modal:issue-create"]').within(() => {
      cy.get('.ql-editor').type('Time tracking estimation');
      cy.get('input[name="title"]').type('Time tracking');
      cy.get('[data-testid="select:priority"]').click();
      cy.get('[data-testid="select-option:Highest"]').click();
      cy.get('button[type="submit"]').click();
  });

    cy.wait(60000); // Wait for 60 seconds to allow the issue to appear on the list

    cy.get('[data-testid="list-issue"]').first().click();

    cy.get('[data-testid="icon:stopwatch"]').should('be.visible').click();

   
    cy.get('div:contains("Time spent (hours)")')
      .next()
      .find('input[placeholder="Number"]')
      .first()
      .should('be.visible')
      .clear().type('4').blur();

    cy.get('div:contains("Time remaining (hours)")')
      .next()
      .find('input[placeholder="Number"]')
      .first()
      .should('be.visible')
      .clear().type('10').blur();

      cy.contains('button', 'Done').click();

      cy.get('[data-testid="icon:stopwatch"]').should('be.visible').click();

      cy.contains('div', 'Time spent (hours)')
      .parent()
      .find('input[placeholder="Number"]')
      .should('have.value', '4')
      .clear();

    cy.contains('div', 'Time remaining (hours)')
      .parent()
      .find('input[placeholder="Number"]')
      .should('have.value', '10')
      .clear();
      cy.contains('button', 'Done').click();
  });
});