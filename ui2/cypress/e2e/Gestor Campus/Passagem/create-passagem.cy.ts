import "../../../support/commands"
describe('Creation tests for Passagem', () => {
	beforeEach(() => {
	  cy.login()
	});
  
it('should create passagem', () => {
	cy.get(':nth-child(2) > .mdc-button__label').click();
	cy.get('#mat-menu-panel-0 > .mat-mdc-menu-content > :nth-child(4)').click();
	cy.get('.cdk-focused > .mat-mdc-menu-item-text').click();
	cy.wait(1000);
	cy.get('#mat-select-value-1 > .mat-mdc-select-placeholder').click();
	cy.get('#mat-option-0').click();
	cy.get('td > .ng-untouched').clear();
	cy.get('td > .ng-untouched').type('lmao');
	cy.get('#mat-select-value-3 > .mat-mdc-select-placeholder').click();
	cy.get('#mat-option-14').click();
	cy.get('#mat-select-value-5 > .mat-mdc-select-placeholder').click();
	cy.get('#mat-option-26').click();
	cy.get('.mat-mdc-select-placeholder').click();
	cy.get('#mat-option-45').click();
	cy.get('.box > :nth-child(2) > :nth-child(1)').click();
	cy.on("window:alert", (text) =>  {
		expect(text).to.contain("Passagem criada")
	}) 
	});
  });