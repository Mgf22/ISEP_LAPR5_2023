import "../../../support/commands"
describe('Gerir tarefas nao aprovadas', () => {
	beforeEach(() => {
		cy.loginGestorTarefa()
	});
	
	it('should Accept Tarefa', () => {
		cy.get(':nth-child(12) > .mdc-button__label').click();
		cy.get('.mat-mdc-menu-trigger > .mat-mdc-menu-item-text').click();
		cy.get('.cdk-focused > .mat-mdc-menu-item-text').click();
		cy.get(':nth-child(1) > .button-container > .mat-primary > .mdc-button__label').click();
	});
	
	it('should Refuse Tarefa', () => {
		cy.get(':nth-child(12) > .mdc-button__label').click();
		cy.get('.mat-mdc-menu-content > .mat-mdc-menu-trigger').click();
		cy.get('.cdk-focused > .mat-mdc-menu-item-text').click();
		cy.get('.mat-warn > .mdc-button__label').click();

	});
	
	});