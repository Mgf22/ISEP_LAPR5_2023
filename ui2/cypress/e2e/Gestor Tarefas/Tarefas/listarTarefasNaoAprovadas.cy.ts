import "../../../support/commands"
describe('List tests for Tarefas Nao Aprovadas', () => {
	beforeEach(() => {
		cy.loginGestorTarefa()
	});
	
	it('should List tests for Tarefas Nao Aprovadas', () => {
		cy.get(':nth-child(12) > .mdc-button__label').click();
		cy.get('.mat-mdc-menu-content > .mat-mdc-menu-trigger').click();
		cy.get('#mat-menu-panel-9 > .mat-mdc-menu-content > :nth-child(2) > .mat-mdc-menu-item-text').click();
	});
	});