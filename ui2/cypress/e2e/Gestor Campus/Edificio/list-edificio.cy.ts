import "../../../support/commands";

describe('List tests for edificio', () => {
	beforeEach(() => {
	  cy.login()
	});
    
	it('should list all edificios ', () => {
		cy.get(':nth-child(2) > .mdc-button__label').click();
		cy.get('.cdk-focused').click();
		cy.get('#mat-menu-panel-1 > .mat-mdc-menu-content > :nth-child(2) > .mat-mdc-menu-item-text').click();
		cy.url().should('include', '/edificioList')
		cy.get('.box > :nth-child(1)').click();
		
	}); 
	
	it('should list edificios by min max pisos', () => {
		cy.get(':nth-child(2) > .mdc-button__label').click();
		cy.get('.cdk-focused').click();
		cy.get('#mat-menu-panel-1 > .mat-mdc-menu-content > :nth-child(2) > .mat-mdc-menu-item-text').click();
		cy.url().should('include', '/edificioList')
		cy.get('.box > :nth-child(2)').click();
		cy.get(':nth-child(1) > :nth-child(2) > .ng-untouched').clear();
		cy.get(':nth-child(1) > :nth-child(2) > .ng-untouched').type('0');
		cy.get(':nth-child(2) > td > .ng-untouched').click();
		cy.get('.ng-untouched').clear();
		cy.get('.ng-untouched').type('100');
		cy.get('.box > :nth-child(1) > :nth-child(4)').click();

	})

  });