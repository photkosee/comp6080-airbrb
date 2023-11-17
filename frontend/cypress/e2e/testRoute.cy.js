/* eslint-disable */

describe('happy path', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/');
  })

  it('Success user doing', () => {
    cy.get('[data-testid="login-navbar"]').click();

    // register
    cy.get('[data-testid="login-register"]').click();
    cy.get('[data-testid="register-name"]').type('name');
    cy.get('[data-testid="register-email"]').type('example@email.com');
    cy.get('[data-testid="register-password"]').type('password');
    cy.get('[data-testid="register-confirm"]').type('password');
    cy.get('[data-testid="register-submit"]').click();

    // create listing
    cy.wait(1000);
    cy.get('[data-testid="hosting-navbar"]').click();
    cy.get('[data-testid="create-host"]').click();
    cy.get('[data-testid="create-title"]').type('Hotel Sydney');
    cy.get('[data-testid="create-street"]').type('1 Big Street');
    cy.get('[data-testid="create-city"]').type('Sydney');
    cy.get('[data-testid="create-state"]').type('NSW');
    cy.get('[data-testid="create-postcode"]').type('2009');
    cy.get('[data-testid="create-country"]').type('Australia');
    cy.get('[data-testid="create-thumbnail-video"]').type('https://www.youtube.com/embed/U9mJuUkhUzk');
    cy.get('[data-testid="create-price"]').type(1000);
    cy.get('[data-testid="create-property"]').type('no');
    cy.get('[data-testid="create-bed-type"]').type('king');
    cy.get('[data-testid="create-bed-number"]').type(0o1);
    cy.get('[data-testid="create-bathroom-number"]').type(0o1);
    cy.get('[data-testid="create-amentities"]').type('No features for this hotel');
    cy.get('[data-testid="create-submit"]').click();

    // publish
    cy.wait(5000);
    cy.get('[data-testid="host-card-publish"]').click();
    cy.get('#mui-20').type(11111111);
    cy.get('#mui-22').type(12121212);
    cy.get('[data-testid="publish-submit"]').click();

    // switch to traveling
    cy.wait(1000);
    cy.get('[data-testid="traveling-navbar"]').click();
    cy.get('[data-testid="search"]').type('Sydney');
    cy.wait(2000);
    cy.get('[data-testid="search"]').type('ABCDEF');

    // switch to hosting
    cy.wait(1000);
    cy.get('[data-testid="hosting-navbar"]').click();

    // unpublish
    cy.wait(1000);
    cy.get('[data-testid="host-card-unpublish"]').click();

    // delete
    cy.wait(1000);
    cy.get('[data-testid="host-delete"]').click();

    // confirm
    cy.wait(1000);
    cy.get('[data-testid="confirm"]').click();

    // switch to traveling
    cy.wait(1000);
    cy.get('[data-testid="traveling-navbar"]').click();

    // logout
    cy.wait(1000);
    cy.get('[data-testid="logout-navbar"]').click();
  })
})
