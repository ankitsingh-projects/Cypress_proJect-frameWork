
describe("E-commerece webapplication", ()=> {

it("Green-kart e2e", ()=> {

cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/');
cy.url().should('include', "https://rahulshettyacademy.com/seleniumPractise/#/");

//asseration on heraders 
cy.get('.container div.greenLogo').should('have.text', "GREENKART");
cy.get('[href="#/offers"]').should('have.text', "Top Deals");
cy.get('.blinkingText')
  .should('contain.text', 'Limited offer - FREE Core Java & QA Resume course');

// count of items 
cy.get('.products .product').then(($products) => {
  cy.log(`Total products count: ${$products.length}`);
});

//search product & add to cart
cy.get('.search-keyword').type("ca");
cy.get('.products .product').should('have.length', '4')
cy.contains("ADD TO CART").first().click();
cy.wait(2000);
cy.get('.products .product').eq(3).contains("ADD TO CART").click();

//asseration on cart count and total price 
cy.get('tbody tr').eq(0).should('have.text', "Items:2");
cy.get('tbody tr').eq(1).should('have.text', "Price:710");

//clear the text from search box 
cy.get('.search-keyword').clear();

//validation of product from cart
cy.get('[alt="Cart"]').click();
cy.get('.cart-preview').within(() => {
  cy.get('.cart-item')
    .eq(0)
    .should('contain.text', 'Cauliflower - 1 Kg');
});
cy.get('[alt="Cart"]').click();
cy.get('.cart-preview').within(() => {
  cy.get('.cart-item')
    .eq(1)
    .should('contain.text', 'Cashews - 1 Kg');
});
cy.get('[alt="Cart"]').click();
cy.contains('PROCEED TO CHECKOUT').click();

// extracting data from web table 
cy.get('#productCartTables tbody tr').each(($row) => {
  if ($row.text().includes('Cashews - 1 Kg')) {
    cy.wrap($row)
      .find('td:nth-child(4) p')   // price column
      .should('have.text', '650');
  }
});
//error validation for empty promo apply 
cy.get('.promoBtn').click()
cy.get('.promoInfo').should('have.text', "Empty code ..!");

//error validation for invalid promo apply 
cy.get('.promoCode').type("Abc")
cy.get('.promoBtn').click()
cy.get('.promoInfo', { timeout: 50000 }).should('have.text', "Invalid code ..!");

//placing order 
cy.contains("Place Order").click();
cy.get('select').select('India');

cy.contains('Proceed').click();
cy.get('.errorAlert').should('have.text', "Please accept Terms & Conditions - Required");

cy.get('.chkAgree').check();
cy.contains('Proceed').click();

});
});
