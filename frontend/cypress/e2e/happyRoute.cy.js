describe('happy path', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/')
  })

  it('Success user doing', () => {
    cy.get('[data-testid="login-navbar"]')
      .click();

    // eslint-disable-next-line cypress/unsafe-to-chain-command
    // cy.get('[data-testid="login-register"]').click()
    // cy.get('[data-testid="register-name"]').type('name')
    // cy.get('[data-testid="register-email"]').type('example@email.com')
    // cy.get('[data-testid="register-password"]').type('password')
    // cy.get('[data-testid="register-confirm"]').type('password')
    // cy.get('[data-testid="register-submit"]').click();
    cy.get('[data-testid="login-email"]').type('example@email.com')
    cy.get('[data-testid="login-password"]').type('password')
    cy.get('[data-testid="login-submit"]').click()
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000);
    cy.get('[data-testid="hosting-navbar"]').click()
    cy.get('[data-testid="create-host"]').click()
    // cy.findByLabelText('Title').click()
  })
})
