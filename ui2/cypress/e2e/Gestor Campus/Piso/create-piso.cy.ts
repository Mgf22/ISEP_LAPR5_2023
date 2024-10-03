import "../../../support/commands";
describe('Creation tests for Piso', () => {
	beforeEach(() => {
	  cy.login()
	});
  
it('should create a piso successfully', () => {
		cy.get(':nth-child(2) > .mdc-button__label').click();
		cy.get('#mat-menu-panel-0 > .mat-mdc-menu-content > :nth-child(2)').click();
		cy.get('.cdk-focused > .mat-mdc-menu-item-text').click();
		cy.get(':nth-child(1) > :nth-child(2) > .ng-untouched').click();    
		cy.get(':nth-child(1) > :nth-child(2) > .ng-untouched').type('Change Piso 2');
		cy.get(':nth-child(2) > :nth-child(2) > .ng-untouched').click();
		cy.get(':nth-child(2) > .ng-untouched').clear();
		cy.get(':nth-child(2) > .ng-untouched').type('Z4');
		cy.get('.mat-mdc-form-field-infix').click();
		cy.get('#mat-option-4').click();
		cy.get('.box > :nth-child(2) > :nth-child(1)').click();
		cy.on("window:alert", (text) =>  {
			expect(text).to.contain("Success piso creation!")
		}) 
	});
  });