import "../../support/commands"
describe('List tests for Tarefas Nao Aprovadas', () => {
	beforeEach(() => {
		cy.loginGestorUtilizador()
	});
	
	it('should create Utilizador', () => {
		cy.get(':nth-child(2) > .mdc-button__label').click();
		cy.get('.cdk-focused > .mat-mdc-menu-item-text').click();
		cy.get(':nth-child(1) > :nth-child(2) > .ng-untouched').type('Gabriel Silva');
		cy.get(':nth-child(2) > :nth-child(2) > .ng-untouched').type('gcs@isep.ipp.pt');
		cy.get(':nth-child(3) > :nth-child(2) > .ng-untouched').type('+351919920200');
		cy.get(':nth-child(4) > :nth-child(2) > .ng-untouched').type('Teste123456@');
		cy.get('#mat-select-value-1').click();
		cy.get('#mat-option-4').click();
		cy.get('.box > :nth-child(2) > :nth-child(1)').click();
	});
	});