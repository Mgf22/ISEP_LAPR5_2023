import "../../../support/commands";
describe('Update tests for Edificio', () => {
	beforeEach(() => {
	  cy.login()
	});
    
	it('should update edificio', () => {
	cy.get(':nth-child(2) > .mdc-button__label').click();
	cy.get('.cdk-focused').click();
	cy.get('#mat-menu-panel-1 > .mat-mdc-menu-content > :nth-child(3) > .mat-mdc-menu-item-text').click();
	cy.url().should('include', '/edificioUpdate');
	cy.get('#mat-mdc-form-field-label-0 > .ng-tns-c1798928316-13').click();
	cy.get('#mat-option-3').click();
	cy.get(':nth-child(2) > :nth-child(2) > .ng-untouched').clear();
	cy.get(':nth-child(2) > :nth-child(2) > .ng-untouched').type('[100,100]');
	cy.get(':nth-child(3) > :nth-child(2) > .ng-untouched').clear();
	cy.get(':nth-child(3) > :nth-child(2) > .ng-untouched').type('blabla');
	cy.get(':nth-child(4) > :nth-child(2) > .ng-untouched').click();
	cy.get('.ng-untouched').clear();
	cy.get('.ng-untouched').type('edificio D');
	cy.get('.box > :nth-child(2) > :nth-child(1)').click();
	cy.on("window:alert", (text) =>  {
		expect(text).to.contain("Success edificio update!")
	}) 
	});
  });