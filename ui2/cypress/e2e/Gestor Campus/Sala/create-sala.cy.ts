import "../../../support/commands"
describe('Creation tests for Sala', () => {
	beforeEach(() => {
	  cy.login()
	});
  
it('should create Sala', () => {
	cy.get(':nth-child(2) > .mdc-button__label').click();
	cy.get('#mat-menu-panel-0 > .mat-mdc-menu-content > :nth-child(6)').click();
	cy.get('.cdk-focused > .mat-mdc-menu-item-text').click();
	cy.get(':nth-child(1) > :nth-child(2) > .ng-untouched').clear();
	cy.get(':nth-child(1) > :nth-child(2) > .ng-untouched').type('sala incrivel');
	cy.get(':nth-child(2) > :nth-child(2) > .ng-untouched').clear();
	cy.get(':nth-child(2) > :nth-child(2) > .ng-untouched').type('atrasada');
	cy.get(':nth-child(3) > :nth-child(2) > .ng-untouched').click();
	cy.get(':nth-child(2) > .ng-untouched').clear();
	cy.get(':nth-child(2) > .ng-untouched').type('infelizmente');
	cy.get('.mat-mdc-form-field-infix').click();
	cy.get('#mat-option-4').click();
	cy.get('.box > :nth-child(2) > :nth-child(1)').click();
	});
  });