import "../../../support/commands";
describe('Update tests for Piso', () => {
	beforeEach(() => {
	  cy.login()
	});
    
	it('should update piso', () => {
		cy.get(':nth-child(2) > .mdc-button__label').click();
		cy.get('#mat-menu-panel-0 > .mat-mdc-menu-content > :nth-child(2)').click();
		cy.get('#mat-menu-panel-2 > .mat-mdc-menu-content > :nth-child(3) > .mat-mdc-menu-item-text').click();
		cy.wait(2000);
		cy.get('#mat-select-value-1 > .mat-mdc-select-placeholder').click();
		cy.get('#mat-option-16').click();
		cy.get(':nth-child(2) > .ng-untouched').clear();
		cy.get(':nth-child(2) > .ng-untouched').type('aulas fantasticas');
		cy.wait(2000);
		cy.get('.mat-mdc-select-placeholder').click();
		cy.get('#mat-option-4').click();
		cy.get('.box > :nth-child(2) > :nth-child(1)').click();
		cy.on("window:alert", (text) =>  {
			expect(text).to.contain("Success piso update!")
		}) 
	});
  });