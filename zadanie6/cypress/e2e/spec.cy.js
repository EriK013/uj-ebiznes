/// <reference types="cypress" />

describe('Zadanie 6 - 20 przypadkow testowych (the-internet.herokuapp.com)', () => {

  it('Test 1: Strona glowna ladowanie', () => {
    cy.visit('/');
    cy.contains('Welcome to the-internet');
  });

  it('Test 2: Strona glowna ma liste linkow', () => {
    cy.visit('/');
    cy.get('ul li a').should('have.length.greaterThan', 30);
  });

  it('Test 3: Logowanie poprawne dane', () => {
    cy.visit('/login');
    cy.get('#username').type('tomsmith');
    cy.get('#password').type('SuperSecretPassword!');
    cy.get('button[type="submit"]').click();
    cy.contains('You logged into a secure area!');
  });

  it('Test 4: Logowanie bledne haslo', () => {
    cy.visit('/login');
    cy.get('#username').type('tomsmith');
    cy.get('#password').type('zlehaslo');
    cy.get('button[type="submit"]').click();
    cy.contains('Your password is invalid!');
  });

  it('Test 5: Checkboxes - zaznaczenie pierwszego', () => {
    cy.visit('/checkboxes');
    cy.get('input[type="checkbox"]').first().check().should('be.checked');
  });

  it('Test 6: Checkboxes - odznaczenie drugiego', () => {
    cy.visit('/checkboxes');
    cy.get('input[type="checkbox"]').eq(1).uncheck().should('not.be.checked');
  });

  it('Test 7: Dropdown - wybor opcji', () => {
    cy.visit('/dropdown');
    cy.get('#dropdown').select('Option 1').should('have.value', '1');
  });

  it('Test 8: Add/Remove Elements - dodanie przycisku', () => {
    cy.visit('/add_remove_elements/');
    cy.contains('Add Element').click();
    cy.get('.added-manually').should('exist');
  });

  it('Test 9: Add/Remove Elements - usuniecie przycisku', () => {
    cy.visit('/add_remove_elements/');
    cy.contains('Add Element').click();
    cy.get('.added-manually').click();
    cy.get('.added-manually').should('not.exist');
  });

  it('Test 10: Inputs - wpisanie liczby', () => {
    cy.visit('/inputs');
    cy.get('input[type="number"]').type('42').should('have.value', '42');
  });

  it('Test 11: JavaScript Alerts - alert', () => {
    cy.visit('/javascript_alerts');
    cy.contains('Click for JS Alert').click();
    cy.on('window:alert', (txt) => {
      expect(txt).to.equal('I am a JS Alert');
    });
    cy.get('#result').should('contain', 'You successfully clicked an alert');
  });

  it('Test 12: JavaScript Alerts - confirm OK', () => {
    cy.visit('/javascript_alerts');
    cy.contains('Click for JS Confirm').click();
    cy.get('#result').should('contain', 'You clicked: Ok');
  });

  it('Test 13: Hovers - najechanie na obrazek', () => {
    cy.visit('/hovers');
    cy.get('.figure').first().trigger('mouseover');
    cy.contains('name: user1');
  });

  it('Test 14: Forgot Password - przeslanie emaila', () => {
    cy.visit('/forgot_password');
    cy.get('#email').type('test@example.com').should('have.value', 'test@example.com');
  });

  it('Test 15: Dynamic Content - przeladowanie', () => {
    cy.visit('/dynamic_content');
    cy.get('.large-10').should('have.length.at.least', 3);
  });

  it('Test 16: Tables - sortowalna tabela', () => {
    cy.visit('/tables');
    cy.get('#table1').should('be.visible');
    cy.get('#table1 tbody tr').should('have.length', 4);
  });

  it('Test 17: Status Codes 200', () => {
    cy.visit('/status_codes/200');
    cy.contains('This page returned a 200 status code');
  });

  it('Test 18: Status Codes 404', () => {
    cy.visit('/status_codes/404', { failOnStatusCode: false });
    cy.contains('This page returned a 404 status code');
  });

  it('Test 19: Key Presses - wcisniecie klawisza', () => {
    cy.visit('/key_presses');
    cy.get('body').type('a');
    cy.get('#result').should('contain', 'You entered: A');
  });

  it('Test 20: Context Menu - prawy przycisk myszy', () => {
    cy.visit('/context_menu');
    cy.get('#hot-spot').should('be.visible');
  });

});
