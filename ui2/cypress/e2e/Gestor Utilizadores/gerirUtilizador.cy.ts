import "../../support/commands"
describe('List tests for Tarefas Nao Aprovadas', () => {
	beforeEach(() => {
		cy.loginGestorUtilizador()
	});
	
	it('should aceitar utilizador', () => {
	cy.get(':nth-child(2) > .mdc-button__label').click();
	cy.get(':nth-child(2) > .mat-mdc-menu-item-text').click();
	cy.get(':nth-child(1) > .button-container > .mat-primary > .mdc-button__label').click();
	});
	
	it('should recusar utilizador', () => {
		cy.get(':nth-child(2) > .mdc-button__label').click();
		cy.get(':nth-child(2) > .mat-mdc-menu-item-text').click();
		cy.get(':nth-child(2) > .button-container > .mat-primary > .mdc-button__label').click();
		});
	});