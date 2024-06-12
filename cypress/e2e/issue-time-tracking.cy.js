describe('Issue comments creating, editing and deleting', () => {
  beforeEach(() => {
      cy.visit('/');
      cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
          cy.visit(url + '/board');
          cy.contains('This is an issue of type: Task.').click();
      });
  });

    it('Need to create, edit and delete the time tracking estimation',()=> {

            cy.get('input[placeholder="Number"]').clear().type('10');
            cy.get('body').click(637, 520); 
            cy.reload();
          
            cy.get('input[placeholder="Number"]').should('have.value', '10').clear();
            cy.get('body').click(637, 520); 
            cy.reload();
            cy.get('input[placeholder="Number"]').should('have.value', '')
            cy.get('input[placeholder="Number"]').click().type('20');
            cy.get('body').click(637, 520); 
            cy.reload();

            cy.get('input[placeholder="Number"]').should('have.value', '20').clear();
            cy.get('body').click(637, 520); 
            cy.reload();
      
            cy.get('input[placeholder="Number"]').should('have.value', '');

            cy.get('[data-testid="icon:stopwatch"]').next().click().within(() => {
              cy.get('div.sc-TFwJaa:contains("Time spent (hours)")')
              .next()
              .find('input[placeholder="Number"]')
              .click()
              .type('4');

              cy.get('div:contains("Time remaining (hours)")')
              .next()
              .find('input[placeholder="Number"]')
              .type('10');
            });
        });
    });
