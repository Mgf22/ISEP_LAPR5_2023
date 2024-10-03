import "../../support/commands"
describe('Atualizar conta', () => {
	beforeEach(() => {
		cy.loginUtente()
	});
	
	it('should update conta', () => {
		cy.get(':nth-child(19) > .mdc-button__label').click();
		cy.get(':nth-child(2) > .mat-mdc-menu-item-text').click();
		cy.get(':nth-child(1) > :nth-child(2) > .ng-untouched').type('Gabriel Silva');
		cy.get(':nth-child(2) > :nth-child(2) > .ng-untouched').type('+351938727436');
		cy.get(':nth-child(3) > :nth-child(2) > .ng-untouched').type('243069002');
		cy.get(':nth-child(4) > :nth-child(2) > .ng-untouched').click();
		cy.get('.ng-untouched').clear();
		cy.get('.ng-untouched').type('Teste123456@');
		cy.get('.box > :nth-child(2) > :nth-child(1)').click();
		});
	});