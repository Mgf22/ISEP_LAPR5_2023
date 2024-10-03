import "../../../support/commands";

describe('List tests for elevadores', () => {
	beforeEach(() => {
	  cy.login()
	});
    
	it('should list all elevadores ', () => {
		cy.get(':nth-child(2) > .mdc-button__label').click();
		cy.get('#mat-menu-panel-0 > .mat-mdc-menu-content > :nth-child(5)').click();
		cy.get('#mat-menu-panel-4 > .mat-mdc-menu-content > :nth-child(2) > .mat-mdc-menu-item-text').click();
		cy.get('#mat-input-0').clear();
		cy.get('#mat-input-0').type('A');
		cy.get('.small-button').click();

	}); 

  });