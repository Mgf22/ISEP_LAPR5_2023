describe('Login Page', () => {
	beforeEach(() => {
	  cy.visit('http://localhost:4200/login'); // Adjust the path if needed
	});
  
	it('should login an user successfully', () => {
		cy.get('[type="text"]').type('taf2@isep.ipp.pt');
		cy.get('.ng-pristine').click();
		cy.get('.ng-untouched').type('Teste123456@');
		cy.get('button').click();
		cy.url().should('include', '/mainMenu');
	});
  
	it('should not login with invalid password', () => {
		cy.get('[type="text"]').type('taf2@isep.ipp.pt');
		cy.get('.ng-pristine').click();
		cy.get('.ng-untouched').type('Teste123456!');
		cy.get('button').click();
		cy.url().should('not.include', '/mainMenu');
	});
  });