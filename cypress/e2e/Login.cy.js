describe('Login Page Tests', () => {
  const baseUrl = 'https://practice.expandtesting.com/login';

  beforeEach(() => {
    cy.visit(baseUrl);
    // cy.reload(); // รีหน้าใหม่ก่อนแต่ละเคส
  });

  it('Login with empty username and password', () => {
    cy.get('button[type="submit"]').click();
    cy.contains('Your username is invalid!').should('be.visible');
  });

  it('Login with username only', () => {
    cy.get('#username').type('testuser');
    cy.get('button[type="submit"]').click();
    cy.contains('Your password is invalid!').should('be.visible');
  });

  it('Login with password only', () => {
    cy.get('#password').type('somepassword');
    cy.get('button[type="submit"]').click();
    cy.contains('Your username is invalid!').should('be.visible');
  });
  
  it('Login with invalid username and password', () => {
    cy.get('#username').type('wronguser');
    cy.get('#password').type('wrongpass');
    cy.get('button[type="submit"]').click();
    cy.contains('Your username is invalid!').should('be.visible');
  });

  it('Login with valid username and password', () => {
    cy.get('#username').type('practice');
    cy.get('#password').type('SuperSecretPassword!');
    cy.get('button[type="submit"]').click();
    cy.contains('You logged into a secure area!').should('be.visible');
  });
});