import "../../support/commands"
describe('Criar Conta', () => {
	beforeEach(() => {
	});
	
	it('should not create Conta without checking terms', () => {
		cy.visit('http://localhost:4200/login');
		cy.get('.underline-text').click();
		cy.get(':nth-child(1) > :nth-child(2) > .ng-untouched').clear();
		cy.get(':nth-child(1) > :nth-child(2) > .ng-untouched').type('Atum Pireneus');
		cy.get(':nth-child(2) > :nth-child(2) > .ng-untouched').clear();
		cy.get(':nth-child(2) > :nth-child(2) > .ng-untouched').type('akl@isep.ipp.pt');
		cy.get(':nth-child(3) > :nth-child(2) > .ng-untouched').clear();
		cy.get(':nth-child(3) > :nth-child(2) > .ng-untouched').type('182734136');
		cy.get(':nth-child(3) > :nth-child(2) > .ng-untouched').click();
		cy.get(':nth-child(4) > :nth-child(2) > .ng-untouched').clear();
		cy.get(':nth-child(4) > :nth-child(2) > .ng-untouched').type('+351918102530');
		cy.get(':nth-child(5) > :nth-child(2) > .ng-untouched').click();
		cy.get(':nth-child(2) > .ng-untouched').type('Teste123456@');
		cy.get('[type="checkbox"]').check();
		cy.get('.box > :nth-child(2) > :nth-child(1)').click();
		});
	});