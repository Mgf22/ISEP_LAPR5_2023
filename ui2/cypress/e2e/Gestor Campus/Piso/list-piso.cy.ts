import "../../../support/commands";

describe('List tests for pisos', () => {
	beforeEach(() => {
	  cy.login()
	});
    
	it('should list all pisos ', () => {
		cy.get(':nth-child(2) > .mdc-button__label').click();
		cy.get('#mat-menu-panel-0 > .mat-mdc-menu-content > :nth-child(2)').click();
		cy.get('#mat-menu-panel-2 > .mat-mdc-menu-content > :nth-child(2) > .mat-mdc-menu-item-text').click();
		cy.get('table.ng-tns-c1798928316-13 > tr > :nth-child(1)').click();
		cy.get('#mat-input-0').clear();
		cy.get('#mat-input-0').type('A');
		cy.get('button.ng-tns-c1798928316-13').click();
	}); 

  });