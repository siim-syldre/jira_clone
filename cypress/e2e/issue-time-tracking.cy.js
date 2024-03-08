describe('Issue comments creating, editing and deleting', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
            cy.visit(url + '/board');
            cy.get('[data-testid="board-list:backlog"]').within(() => {
                // Assert that this list contains 5 issues and first element with tag p has specified text
                cy.get('[data-testid="list-issue"]')
                    .first()
                    .click() 
              });
        });
    });

    const getIssueDetailsModal = () => cy.get('[data-testid="modal:issue-details"]');
    const estimateInput = () => cy.get('input').should('have.attr', 'placeholder', 'Number');
    const timeTrackingModal = () => cy.get('[data-testid="modal:tracking"]');

    it.only('Should edit timetracking estimate', () => {

        getIssueDetailsModal().within(() => {

            editEstimateTime(7)

        });

        cy.get('[data-testid="icon:stopwatch"]').click()

        timeTrackingModal().within(() => {

           const timeValues = [15, 10]
            
            estimateInput()
                .should('be.visible')

            for (let i = 0; i < 2; i++) {
                estimateInput()
                    .eq(i)
                    .click()
                    .clear()
                    .type(timeValues[i]);
                }
            
            cy.contains('div', 'logged')
                .contains(timeValues[0])
                .should('be.visible')
            cy.contains('div', 'remaining')
                .click()
                .contains('remaining')
                .should('be.visible')
            
            
            estimateInput()
                .eq(0)
                .clear()
            estimateInput()    
                .eq(1)
                .clear()
            
            cy.contains('div', 'logged')
                .contains('No time logged')
                .should('be.visible')

            cy.contains('button', 'Done')
                .click()

        });

        cy.contains('div', 'logged')
            .contains('No time logged')
            .should('be.visible')
    });

    function editEstimateTime(customTime) {

        estimateInput()
            .should('be.visible')
            .click()
            .clear()
            .type(customTime)
    
        cy.contains('div', 'estimated')
            .contains(customTime)
            .should('be.visible')
        
        clearEstimate()
    
        function clearEstimate(){
    
            estimateInput()
                .should('be.visible')
                .click()
                .clear()
            
            cy.contains('div', 'estimated')
                .should('not.exist')
            
        }
    
    }


});



