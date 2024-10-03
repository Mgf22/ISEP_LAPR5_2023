import "../../../support/commands"
describe('List tests for Tarefas Nao Aprovadas', () => {
	beforeEach(() => {
		cy.loginGestorTarefa()
	});
	
	it('should List Tarefas by Estado', () => {
		cy.get(':nth-child(12) > .mdc-button__label').click();
		cy.get('.mat-mdc-menu-content > .mat-mdc-menu-trigger').click();
		cy.get('#mat-menu-panel-9 > .mat-mdc-menu-content > :nth-child(3)').click();
		cy.get('.box > :nth-child(1)').click();
		cy.get('.mat-mdc-select-placeholder').click();
		cy.get('#mat-option-2 > .mdc-list-item__primary-text').click();
		cy.get('button.ng-tns-c1798928316-16').click();
	});
	
	it('should List Tarefas by Utente', () => {
		cy.get(':nth-child(12) > .mdc-button__label').click();
		cy.get('.mat-mdc-menu-trigger > .mat-mdc-menu-item-text').click();
		cy.get('#mat-menu-panel-9 > .mat-mdc-menu-content > :nth-child(3) > .mat-mdc-menu-item-text').click();
		cy.get('.box > :nth-child(2)').click();
		cy.get('#mat-input-0').type('joao@isep.ipp.pt');
		cy.get('button.ng-tns-c1798928316-16').click();
	});
	
	it('should List Tarefas by Tipo Dispositivo', () => {
		cy.get(':nth-child(12) > .mdc-button__label').click();
		cy.get('.mat-mdc-menu-trigger > .mat-mdc-menu-item-text').click();
		cy.get('#mat-menu-panel-9 > .mat-mdc-menu-content > :nth-child(3) > .mat-mdc-menu-item-text').click();
		cy.get('.box > :nth-child(3)').click();
		cy.get('#mat-input-0').type('Polivalente');
		cy.get('button.ng-tns-c1798928316-16').click();

	});
	
	});