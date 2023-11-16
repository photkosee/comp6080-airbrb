describe('happy path', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/')
  })

  it('Success user doing', () => {
    cy.get('[data-testid="login-navbar"]').click();

    // eslint-disable-next-line cypress/unsafe-to-chain-command

    // register
    cy.get('[data-testid="login-register"]').click()
    cy.get('[data-testid="register-name"]').type('name')
    cy.get('[data-testid="register-email"]').type('example@email.com')
    cy.get('[data-testid="register-password"]').type('password')
    cy.get('[data-testid="register-confirm"]').type('password')
    cy.get('[data-testid="register-submit"]').click();

    // login
    // cy.get('[data-testid="login-email"]').type('example@email.com')
    // cy.get('[data-testid="login-password"]').type('password')
    // cy.get('[data-testid="login-submit"]').click()
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000);
    cy.get('[data-testid="hosting-navbar"]').click();
    cy.get('[data-testid="create-host"]').click();
    cy.get('[data-testid="create-title"]').type('Hotel Sydney');
    cy.get('[data-testid="create-street"]').type('1 Big Street');
    cy.get('[data-testid="create-city"]').type('Sydney');
    cy.get('[data-testid="create-state"]').type('NSW');
    cy.get('[data-testid="create-postcode"]').type('2009');
    cy.get('[data-testid="create-country"]').type('Australia');
    // cy.get('input[type="file"]').attachFile('./photo.jpg');
    // cy.get('[data-testid="create-video"]').type('https://www.youtube.com/embed/U9mJuUkhUzk');
    cy.get('[data-testid="create-price"]').type(1000);
    cy.get('[data-testid="create-property"]').type('no');
    cy.get('[data-testid="create-bed-type"]').type('king');
    cy.get('[data-testid="create-bed-number"]').type('1');
    cy.get('[data-testid="create-bedroom"]').type(1);
    cy.get('[data-testid="create-amentities"]').type('No features for this hotel');
    cy.get('[data-testid="create-submit"]').click();

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(3000);
    cy.get('[data-testid="host-card-publish"]').click();
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000);

    cy.get('[data-testid="publish-submit"]').click();
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000);
    cy.get('[data-testid="host-card-unpublish"]').click();
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000);
    cy.get('[data-testid="host-card-publish"]').click();
    cy.get('[data-testid="publish-submit"]').click();

    // logout
    cy.get('[data-testid="logout-navbar"]').click();

    cy.get('[data-testid="login-navbar"]').click();

    // eslint-disable-next-line cypress/unsafe-to-chain-command

    // register
    cy.get('[data-testid="login-register"]').click()
    cy.get('[data-testid="register-name"]').type('new')
    cy.get('[data-testid="register-email"]').type('good@email.com')
    cy.get('[data-testid="register-password"]').type('nice')
    cy.get('[data-testid="register-confirm"]').type('nice')
    cy.get('[data-testid="register-submit"]').click();

    cy.get('[data-testid="guest-card"]').click();
    cy.get('[data-testid="book"]').click();
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000);
    cy.get('[data-testid="book-submit"]').click();
  })
})
