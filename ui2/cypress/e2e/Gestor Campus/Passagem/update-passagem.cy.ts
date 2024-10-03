import "../../../support/commands";
describe('Update tests for Passagem', () => {
	beforeEach(() => {
	  cy.login()
	});
    
	it('should update passagem', () => {
		cy.get(':nth-child(2) > .mdc-button__label').click();
		cy.get('#mat-menu-panel-0 > .mat-mdc-menu-content > :nth-child(4)').click();
		cy.get('#mat-menu-panel-3 > .mat-mdc-menu-content > :nth-child(3) > .mat-mdc-menu-item-text').click();
		cy.wait(1000);
		cy.get(':nth-child(1) > .mat-mdc-form-field > .mat-mdc-text-field-wrapper > .mat-mdc-form-field-flex > .mat-mdc-form-field-infix').click();
		cy.get('#mat-option-62').click();
		cy.wait(1000);
		cy.get('#mat-select-value-3 > .mat-mdc-select-placeholder').click();
		cy.get('#mat-option-0').click();
		cy.wait(1000);
		cy.get('#mat-select-value-5 > .mat-mdc-select-placeholder').click();
		cy.get('#mat-option-14').click();
		cy.wait(1000);
		cy.get('#mat-select-value-7 > .mat-mdc-select-placeholder').click();
		cy.get('#mat-option-26').click();
		cy.wait(1000);
		cy.get('.mat-mdc-select-placeholder').click();
		cy.get('#mat-option-46').click();
		cy.get('.box > :nth-child(2) > :nth-child(1)').click();

		
		cy.on("window:alert", (text) =>  {
			expect(text).to.contain("Success passagem update!")
		}) 
	});
	
  });