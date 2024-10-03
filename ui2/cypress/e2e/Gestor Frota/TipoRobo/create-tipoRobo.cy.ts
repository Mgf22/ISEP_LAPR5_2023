import "../../../support/commands"
describe('Creation tests for Tipo Robo', () => {
	beforeEach(() => {
	  cy.login()
	});
  
it('should create tipo robo', () => {
		cy.get(':nth-child(10) > .mdc-button__label').click();
		cy.get('.cdk-focused').click();
		cy.get('.cdk-focused').click();
		cy.url().should('include','/tipoRoboCreate');
		cy.get(':nth-child(1) > :nth-child(2) > .ng-untouched').clear();
		cy.get(':nth-child(1) > :nth-child(2) > .ng-untouched').type('carregador');
		cy.get(':nth-child(2) > :nth-child(2) > .ng-untouched').clear();
		cy.get(':nth-child(2) > :nth-child(2) > .ng-untouched').type('xiaomi');
		cy.get(':nth-child(3) > :nth-child(2) > .ng-untouched').click();
		cy.get(':nth-child(2) > .ng-untouched').clear();
		cy.get(':nth-child(2) > .ng-untouched').type('mi note 10 pro plus max ultra');
		cy.get('.mat-mdc-select-placeholder').click();
		cy.get('#mat-option-0 > .mdc-list-item__primary-text').click();
		cy.get('.cdk-overlay-backdrop').click();
		cy.get('.box > :nth-child(2) > :nth-child(1)').click();
		
		cy.on("window:alert", (text) =>  {
			expect(text).to.contain("Success Tipo Robo creation!")
		}) 
	});
  });