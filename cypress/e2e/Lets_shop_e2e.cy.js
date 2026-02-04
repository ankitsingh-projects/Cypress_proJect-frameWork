describe ( "Lets Shop e2e" , ()=> {

it("Register user", ()=> {

const randomEmail = `user_${Date.now()}@testmail.com` 
const phoneNumber = Math.floor(1000000000 + Math.random() * 9000000000)

function generateRandomPassword(length = 8) {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@$!%*?&'

  let password = ''

  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length))
  }

  return password
}
 
const password = generateRandomPassword() 
console.log(password)

// url visit 
cy.visit("https://rahulshettyacademy.com/client/#/auth/login");
cy.url().should('eq', "https://rahulshettyacademy.com/client/#/auth/login");

//forget Password 
cy.get('[class="forgot-password-link"]').click();
cy.url().should('eq', "https://rahulshettyacademy.com/client/#/auth/password-new"); 
cy.get('[type="email"]').type('test404api1@gmail.com');
cy.get('#userPassword').type("Ankit@8285");
cy.get('#confirmPassword').type("Ankit@8285");
cy.get('[type="submit"]').click();

// header text asserations
cy.get('[href*="@rahulshettyacademy.com"]').should('have.text', " dummywebsite@rahulshettyacademy.com");
cy.get('[class="banner"] h3').should('have.text', "We Make Your Shopping Simple");
cy.get('[class="title"]').eq(0).should('have.text', "Practice Website for Rahul Shetty Academy Students")
cy.get('[class="title"] em').should('have.text', "Rahul Shetty Academy");

//blinking text
cy.get('[class="blink_me"]').should('have.text', "Register to sign in with your personal account");

//social users icon validation 

cy.get('span [class*="facebook"]').should('be.visible');
cy.get('span [class*="instagram"]').should('be.visible');
cy.get('span [class*="twitter"]').should('be.visible');
cy.get('span [class*="youtube"]').should('be.visible');

//Why People Choose Us? asserations 

cy.get('[class="title_header"]').should('have.text', "Why People Choose Us?");

cy.get('[class="card active"] h1').first().should('have.text', '3546540');
cy.get('p[class="mt-3"]').first().should('have.text', 'Successfull Orders');

cy.get('[class="card"] h1').eq(0).should('have.text', '37653');
cy.get('p[class="mt-3"]').eq(1).should('have.text', 'Customers');

cy.get('[class="card"] h1').eq(1).should('have.text', '3243');
cy.get('p[class="mt-3"]').eq(2).should('have.text', 'Sellers');

cy.get('[class="card"] h1').eq(2).should('have.text', '4500+');
cy.get('p[class="mt-3"]').eq(3).should('have.text', 'Daily Orders');

cy.get('[class="card active"] h1').last().should('have.text', '500+');
cy.get('p[class="mt-3"]').last().should('have.text', 'Daily New Customer Joining');

// User Registeration 
cy.get('[routerlink="/auth/register"]').click();
cy.get('[class="login-title"]').should('have.text', "Register");
cy.get('[class="login-wrapper-footer-text"]').should('have.text', 'Already have an account? Login here'
);
cy.get('[for="firstName"]').should('have.text', "First Name");
cy.get('#firstName').type("John");
cy.get('[for="lastName"]').should('have.text', "Last Name");
cy.get('#lastName').type("Cena");

cy.get('[for="email"]').should('have.text', "Email");
cy.get('#userEmail').type(randomEmail)

cy.contains('Phone Number').should('have.text', "Phone Number");
cy.get('#userMobile').type(phoneNumber.toString())

cy.contains('Occupation').should('have.text', "Occupation");
cy.get('select').select("2: Student");
cy.contains('Gender').should('have.text', "Gender");
cy.get('[value="Male"]').click();

cy.get('#userPassword').type(password);

cy.get('#confirmPassword').type(password);


cy.get('[type="checkbox"]').click(); 
cy.get('[class="col-md-6"]').last().should('have.text', " I am 18 year or Older ");
cy.get('[type="submit"]').click({ timeout: 40000 });

//cy.get('h1[class="headcolor"]').should('have.text', "Account Created Successfully");
cy.get('[routerlink="/auth"]').should('have.text', "Login")
cy.get('[routerlink="/auth"]').click();

//User login
cy.get('[class="login-wrapper-footer-text"]').should('have.text', "Don't have an account? Register here")
cy.get('[class="login-title"]').should('have.text', "Log in"); 
cy.contains('Email').should('have.text', "Email");
cy.get('#userEmail').type('test404api1@gmail.com')
cy.contains('Password').should('have.text', "Password"); 
cy.get('#userPassword').type("Ankit@8285");
cy.get('#login').click();
cy.url().should('eq', "https://rahulshettyacademy.com/client/#/dashboard/dash");

});
});