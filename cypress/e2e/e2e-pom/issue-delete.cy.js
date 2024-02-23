describe('Issue delete', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.url().should('eq', `${Cypress.env('baseUrl')}project`).then((url) => {
        cy.visit(url + '/board');
        cy.contains('This is an issue of type: Task.').click();
      });
    });

    it('Issue deletion', () => {
        getIssueDetailsModal().within(() => {
          cy.get('[data-testid="icon:trash"]').click();
        });
        deletePopup().within(() => {
          cy.contains('Delete issue').click()
        });
        cy.reload();
    
        backlog().should("be.visible");
        backlog().within(() => {
            cy.contains('This is an issue of type: Task.').should("not.exist");
          });
      });

    it.only('Issue deletion cancel', () => {
      getIssueDetailsModal().within(() => {
        cy.get('[data-testid="icon:trash"]').click();
      });
      deletePopup().within(() =>{
        cy.contains('Cancel').click()
      });

      getIssueDetailsModal().within(() => {
        cy.get('[data-testid="icon:close"]').first().click();
      });

      cy.reload();
    
      backlog().should("be.visible");
      backlog().within(() => {
          cy.contains('This is an issue of type: Task.').should("exist");
        });
    })


      const getIssueDetailsModal = () => cy.get('[data-testid="modal:issue-details"]');
      const deletePopup = () => cy.get('[data-testid="modal:confirm"]');
      const backlog = () => cy.get('[data-testid="board-list:backlog"]');

});