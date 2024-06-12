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
  
        cy.wait(60000); 

        cy.get('[data-testid="list-issue"]').first().click();
  
        // Interact with the "Time tracking" field
        cy.contains('Time tracking').click();
        cy.get('input[placeholder="Number"]').eq(0).click().type('5'); // Assuming first field is "Original Estimate"
        cy.get('body').click(637, 520); // Click on empty space to remove focus from the input field
  
        cy.get('input[placeholder="Number"]').eq(0).should('have.value', '5').clear().type('10');
        cy.get('body').click(637, 520); // Click on empty space to remove focus from the input field
  
        cy.get('input[placeholder="Number"]').eq(0).should('have.value', '10').clear();
        cy.get('body').click(637, 520); // Click on empty space to remove focus from the input field
  
        cy.get('input[placeholder="Number"]').eq(0).should('have.value', '');
  
        // Interact with the second "Number" field if there is one
        cy.get('input[placeholder="Number"]').eq(1).click().type('5'); // Assuming second field is "Time Tracking"
        cy.get('body').click(637, 520); // Click on empty space to remove focus from the input field
  
        cy.get('input[placeholder="Number"]').eq(1).should('have.value', '5').clear().type('10');
        cy.get('body').click(637, 520); // Click on empty space to remove focus from the input field
  
        cy.get('input[placeholder="Number"]').eq(1).should('have.value', '10').clear();
        cy.get('body').click(637, 520); // Click on empty space to remove focus from the input field
  
        cy.get('input[placeholder="Number"]').eq(1).should('have.value', '');
    });
  });