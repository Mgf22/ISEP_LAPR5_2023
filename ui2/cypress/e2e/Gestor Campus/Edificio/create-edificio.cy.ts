import "../../../support/commands"
describe('Creation tests for Edificio', () => {
	beforeEach(() => {
	  cy.login()
	});
  
it('should navigate to edificio', () => {
	
	cy.get(':nth-child(2) > .mdc-button__label').click();
	cy.get('.cdk-focused > .mat-mdc-menu-item-text').click();
	cy.get('.cdk-focused > .mat-mdc-menu-item-text').click();
	cy.url().should('include', '/edificioCreate')
	cy.get(':nth-child(1) > :nth-child(2) > .ng-untouched').clear();
	cy.get(':nth-child(1) > :nth-child(2) > .ng-untouched').type('Q');
	cy.get(':nth-child(2) > :nth-child(2) > .ng-untouched').clear();
	cy.get(':nth-child(2) > :nth-child(2) > .ng-untouched').type('[100, 100]');
	cy.get(':nth-child(3) > :nth-child(2) > .ng-untouched').clear();
	cy.get(':nth-child(3) > :nth-child(2) > .ng-untouched').type('edificio lol');
	cy.get(':nth-child(4) > :nth-child(2) > .ng-untouched').click();
	cy.get('.ng-untouched').clear();
	cy.get('.ng-untouched').type('edificio q');
	cy.get('.box > :nth-child(2) > :nth-child(1)').click()
	cy.on("window:alert", (text) =>  {
		expect(text).to.contain("Edificio criado")
	}) 
	});
  });