describe('Register Page Tests', () => {
  const baseUrl = 'https://practice.expandtesting.com/register';

  beforeEach(() => {
    cy.visit(baseUrl);
    // cy.reload(); // รีหน้าใหม่ก่อนทุกเคส
  });

  it('Register with empty fields', () => {
    cy.get('button[type="submit"]').click();
    cy.contains('All fields are required.').should('be.visible');
  });

  it('Register with only username', () => {
    cy.get('#username').type('testuser');
    cy.get('button[type="submit"]').click();
    cy.contains('All fields are required.').should('be.visible');
  });

  it('Register with only password', () => {
    cy.get('#password').type('1234');
    cy.get('button[type="submit"]').click();
    cy.contains('All fields are required.').should('be.visible');
  });

  it('Register with only confirm password', () => {
    cy.get('#confirmPassword').type('1234');
    cy.get('button[type="submit"]').click();
    cy.contains('All fields are required.').should('be.visible');
  });

  it('Register with password & confirm password < 4 characters', () => {
    cy.get('#username').type('user01');
    cy.get('#password').type('123');
    cy.get('#confirmPassword').type('123');
    cy.get('button[type="submit"]').click();
    cy.contains('Password must be at least 4 characters long.').should('be.visible');
  });

  it('Register with mismatched password and confirm password', () => {
    cy.get('#username').type('user01');
    cy.get('#password').type('1234');
    cy.get('#confirmPassword').type('9999');
    cy.get('button[type="submit"]').click();
    cy.contains('Passwords do not match.').should('be.visible');
  });

  it('Register with valid data', () => {
    const randomUser = `user${Math.floor(Math.random() * 10000)}`;
    cy.get('#username').type(randomUser);
    cy.get('#password').type('1234');
    cy.get('#confirmPassword').type('1234');
    cy.get('button[type="submit"]').click();
    cy.contains('Successfully registered, you can log in now.').should('be.visible');
  });
});