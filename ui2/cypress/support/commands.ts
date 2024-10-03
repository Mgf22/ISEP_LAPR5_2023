// ***********************************************
// This example namespace declaration will help
// with Intellisense and code completion in your
// IDE or Text Editor.
// ***********************************************
declare namespace Cypress {
   interface Chainable<Subject = any> {
    login(login?: string, password?: string): typeof login;
    loginGestorTarefa(login?: string, password?: string): typeof loginGestorTarefa;
    loginGestorUtilizador(login?: string, password?: string):typeof loginGestorUtilizador;
    loginUtente(login?: string, password?: string):typeof loginUtente;
   }
}

function login(login: string = "asist", password: string = "teste1234"): void {
	cy.visit('http://localhost:4200/login'); // Adjust the path if needed
	
	cy.get('input[name="username"]').type(login);
	cy.get('input[name="password"]').type(password); // Replace with a valid password
	
	// Click the login button
	cy.get('button').click();
	
	cy.url().should('include', '/mainMenu');
}

function loginGestorTarefa(login: string = "taf2@isep.ipp.pt", password: string = "Teste123456@"): void {
	cy.visit('http://localhost:4200/login');
		cy.get('[type="text"]').type('taf2@isep.ipp.pt');
		cy.get('.ng-pristine').click();
		cy.get('.ng-untouched').type('Teste123456@');
		cy.get('button').click();
	cy.url().should('include', '/mainMenu');
}

function loginGestorUtilizador(login: string = "jmm@isep.ipp.pt", password: string = "Teste123456!"): void {
	cy.visit('http://localhost:4200/login');
		cy.get('[type="text"]').type('jmm@isep.ipp.pt');
		cy.get('.ng-pristine').click();
		cy.get('.ng-untouched').type('Teste123456!');
		cy.get('button').click();
	cy.url().should('include', '/mainMenu');
}

function loginUtente():void{
	cy.visit('http://localhost:4200/login');
		cy.get('[type="text"]').type('gcs@isep.ipp.pt');
		cy.get('.ng-pristine').click();
		cy.get('.ng-untouched').type('Teste123456!');
		cy.get('button').click();
	cy.url().should('include', '/mainMenu');
}
Cypress.Commands.add("loginUtente", loginUtente);
Cypress.Commands.add("login", login)
Cypress.Commands.add("loginGestorTarefa", loginGestorTarefa)
Cypress.Commands.add("loginGestorUtilizador", loginGestorUtilizador)

//
// NOTE: You can use it like so:
// Cypress.Commands.add('customCommand', customCommand);
//
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
