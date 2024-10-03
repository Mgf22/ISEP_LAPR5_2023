import "../../support/commands"
describe('Requisitar Tarefa', () => {
	beforeEach(() => {
		cy.loginUtente()
	});
	
	it('should create tarefa', () => {
		

		cy.get('.mat-mdc-menu-trigger.ng-star-inserted > .mdc-button__label').click();
		cy.get(':nth-child(4) > .mat-mdc-menu-item-text').click();
		cy.get('#mat-select-value-1 > .mat-mdc-select-placeholder').click();
		cy.get('#mat-option-0 > .mdc-list-item__primary-text').click();
		cy.wait(5000);
		cy.get('#mat-select-value-3 > .mat-mdc-select-placeholder').click();
		cy.get('#mat-option-3').click();
		cy.wait(5000);
		cy.get(':nth-child(3) > .mat-mdc-form-field > .mat-mdc-text-field-wrapper > .mat-mdc-form-field-flex > .mat-mdc-form-field-infix').click();
		cy.get('#mat-option-124').click();
		cy.get(':nth-child(4) > :nth-child(2) > .ng-untouched').type('Miguel');
		cy.get(':nth-child(5) > :nth-child(2) > .ng-untouched').type('Gabriel');
		cy.get(':nth-child(6) > :nth-child(2) > .ng-untouched').type('Jubileu 3');
		cy.get(':nth-child(7) > :nth-child(2) > .ng-untouched').click();
		cy.get('.ng-untouched').type('Claro que sim');
		cy.get('.box > :nth-child(2) > :nth-child(1)').click(); 
		});
	});