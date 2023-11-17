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
    cy.wait(1000);
    cy.get('[data-testid="register-submit"]').click();

    // create listing
    cy.wait(3000);
    cy.get('[data-testid="hosting-navbar"]').click();
    cy.wait(3000);
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
    cy.wait(1000);
    cy.get('[data-testid="create-submit"]').click();

    // edit
    cy.wait(5000);
    cy.get('[data-testid="host-edit"]').click();
    cy.get('[data-testid="edit-title"]').type('Hotel Sydney1');
    cy.get('[data-testid="edit-street"]').type('1 Big Street1');
    cy.get('[data-testid="edit-city"]').type('Sydney1');
    cy.get('[data-testid="edit-state"]').type('NSW1');
    cy.get('[data-testid="edit-postcode"]').type('2001');
    cy.get('[data-testid="edit-country"]').type('Australia1');
    cy.get('[data-testid="edit-thumbnail-video"]').type('https://www.youtube.com/embed/U9mJuUkhUzk');
    cy.get('[data-testid="edit-price"]').type(10001);
    cy.get('[data-testid="edit-property"]').type('no1');
    cy.get('[data-testid="edit-bed-type"]').type('king1');
    cy.get('[data-testid="edit-bed-number"]').type(0o11);
    cy.get('[data-testid="edit-bathroom-number"]').type(0o11);
    cy.get('[data-testid="edit-amentities"]').type('No features for this hotel1');
    cy.wait(1000);
    cy.get('[data-testid="edit-submit"]').click();

    // publish
    cy.wait(5000);
    cy.get('[data-testid="host-card-publish"]').click();
    cy.get('#mui-133').type(11111111);
    cy.get('#mui-135').type(12121212);
    cy.wait(1000);
    cy.get('[data-testid="publish-submit"]').click();

    // unpublish
    cy.wait(1000);
    cy.get('[data-testid="host-card-unpublish"]').click();

    // publish
    cy.wait(1000);
    cy.get('[data-testid="host-card-publish"]').click();
    cy.get('#mui-187').type(11111111);
    cy.get('#mui-189').type(12121212);
    cy.wait(1000);
    cy.get('[data-testid="publish-submit"]').click();

    // logout
    cy.wait(1000);
    cy.get('[data-testid="logout-navbar"]').click();
    cy.wait(1000);
    cy.get('[data-testid="login-navbar"]').click();

    // register
    cy.wait(1000);
    cy.get('[data-testid="login-register"]').click();
    cy.get('[data-testid="register-name"]').type('new');
    cy.get('[data-testid="register-email"]').type('good@email.com');
    cy.get('[data-testid="register-password"]').type('nice');
    cy.get('[data-testid="register-confirm"]').type('nice');
    cy.wait(1000);
    cy.get('[data-testid="register-submit"]').click();

    // click the card
    cy.wait(3000);
    cy.get('[data-testid="guest-card"]').click();
    cy.wait(1000);
    cy.get('[data-testid="book"]').click();
    
    // book
    cy.wait(1000);
    cy.get('#mui-296').type(11111111);
    cy.get('#mui-298').type(12121212);
    cy.get('[data-testid="book-submit"]').click();

    // logout
    cy.wait(1000);
    cy.get('[data-testid="logout-navbar"]').click();
    cy.get('[data-testid="login-navbar"]').click();

    // login
    cy.wait(2000);
    cy.get('[data-testid="login-email"]').type('good@email.com');
    cy.get('[data-testid="login-password"]').type('nice');
    cy.wait(1000);
    cy.get('[data-testid="login-submit"]').click();

    // logout
    cy.wait(1000);
    cy.get('[data-testid="logout-navbar"]').click();
  })
})
