import "../../../support/commands";

describe('List tests for passagens', () => {
	beforeEach(() => {
	  cy.login()
	});
    
	it('should list all passagens ', () => {
		cy.get(':nth-child(2) > .mdc-button__label').click();
		cy.get('#mat-menu-panel-0 > .mat-mdc-menu-content > :nth-child(4)').click();
		cy.get('#mat-menu-panel-3 > .mat-mdc-menu-content > :nth-child(2) > .mat-mdc-menu-item-text').click();
		
	}); 
	
	it('should list passagens by keyword', () => {
		cy.get(':nth-child(2) > .mdc-button__label').click();
		cy.get('#mat-menu-panel-0 > .mat-mdc-menu-content > :nth-child(4)').click();
		cy.get('#mat-menu-panel-3 > .mat-mdc-menu-content > :nth-child(2) > .mat-mdc-menu-item-text').click();
		cy.get('.mat-mdc-header-row > .cdk-column-Designacao').click();
		cy.get('#mat-input-0').clear();
		cy.get('#mat-input-0').type('B1');

	})

  });