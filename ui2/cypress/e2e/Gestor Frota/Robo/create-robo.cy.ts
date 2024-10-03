import "../../../support/commands"
describe('Creation tests for Robo', () => {
	beforeEach(() => {
	  cy.login()
	});
	
	it('should create robo', () => {
		cy.get(':nth-child(10) > .mdc-button__label').click();
		cy.get('.cdk-focused').click();
		cy.get('.cdk-focused').click();
	});
	});