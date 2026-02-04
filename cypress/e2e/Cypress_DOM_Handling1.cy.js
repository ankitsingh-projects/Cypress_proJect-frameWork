

import 'cypress-iframe'

describe("Cypress new tests", ()=> {

it("handling the webelements", ()=> {

cy.visit("https://rahulshettyacademy.com/AutomationPractice/");

//handling checkboxes

cy.get('#checkBoxOption1').check().should('be.checked').and('have.value', 'option1');
cy.get('#checkBoxOption1').uncheck().should('not.be.checked');
cy.get('input[type="checkbox"]').check(['option2', 'option3']);

// static drop down

cy.get('#dropdown-class-example').select('option1');
cy.get('select').select('option2').should('have.value', 'option2');

// dynamic dropdown handling with each method

cy.get('[id="autocomplete"]').type('ind')
cy.get('.ui-menu-item div').each(($e1, index, $list)=> {
    if($e1.text()==="India"){
        $e1.click();
    }
})
cy.get('#autocomplete').should('have.value','India');

// handling the visible and invisible elements

cy.get('#displayed-text').should('be.visible');
cy.get('#hide-textbox').click();
cy.get('#displayed-text').should('not.be.visible');
cy.get('#show-textbox').click();
cy.get('#displayed-text').should('be.visible');

//handling radio button

cy.get('[value="radio2"]').check().should('be.checked');

//handling alerts

cy.get('#alertbtn').click();
cy.get('#confirmbtn').click();
cy.on('window:alert', (str) =>{
expect(str).to.equal("Hello , share this practice page and share your knowledge");
    })
cy.on('window:confirm', (str) =>{
 expect(str).to.equal("Hello , Are you sure you want to confirm?");
})
})

// Handling child tab 
//child window and multiple tab handling
it("Handling child tab", ()=> {

cy.visit("https://rahulshettyacademy.com/AutomationPractice/");

cy.get('#opentab').invoke('removeAttr', 'target').click();
cy.origin("https://www.qaclickacademy.com", ()=>{
cy.contains("About us").click();
cy.get('.mt-50 h2').should('contain',"Welcome to QAClick Academy");
})
})

// handling the web tables with cypress using each command

it("handling the web tables with cypress using each command", ()=>{

cy.visit("https://rahulshettyacademy.com/AutomationPractice/");

cy.get("tr td:nth-child(2)").each(($e1, index, $list)  =>  {
   const text = $e1.text()
   if(text.includes("Python Language"))
   {
    cy.get("tr td:nth-child(2)").eq(index).next().then(function(price)
    {
        const priceText = price.text()
        expect(priceText).to.equal('25');
    })
}   
})
});
});

// handling the dom elements as mouse hover,child-windows,frames,Automating calendars

describe("handling the dom elements", ()=> {

it("Handling mouse hover", ()=> {
cy.visit("https://rahulshettyacademy.com/AutomationPractice/");

// Handling mouse hover popus
cy.get('div.mouse-hover-content').invoke('show');
cy.contains('Top').click();
cy.url().should('include','top');
cy.wait(3000);
cy.visit("https://rahulshettyacademy.com/AutomationPractice/");
cy.contains("Reload").click({force:true});
});
});

//handling i-frame
// marking it as comment because the the url is now behaving as the cross origin
// so it will not handle by the cypress cy.iframe command only the internal browser iframe 
// describe("handling the frame",()=>{

//  it("Handling handling iframe", ()=> {
// cy.visit("https://rahulshettyacademy.com/AutomationPractice/");

// cy.frameLoaded("#courses-iframe");
// cy.iframe().find('a[href*="mentorship"]').eq(0).click();
// cy.iframe().find('h1[class*="pricing-title"]').should('have.length',2);
// })
// })

//child window and multiple tab handling
describe("handling the dom elements", ()=> {

it("Handling child windows using cypress", ()=> {
cy.visit("https://rahulshettyacademy.com/AutomationPractice/");
// handling child windows using cypress
cy.get('[id="opentab"]').then( function (el){
const url = el.prop('href')
cy.visit(url)
cy.origin (url, ()=> {
    cy.get("div.sub-menu-bar a[href*='about']").click();
})
// Handling child tab ( this approach is prefer for both child and multiple window )
// Cypress cannot handle real multiple tabs, so both tests are workarounds to deal with links that open new windows.
// The first it block handles a child window by removing target="_blank" and clicking the link, which makes the new page open in the same tab and closely matches real user behavior.
// The second it block handles the same scenario by extracting the URL and navigating with cy.visit(), which skips the actual click action.

// Both approaches are used for child window and multiple tab handling in Cypress.
// However, they do not open or switch tabs—they only simulate the behavior in a single tab.

//child window and multiple tab handling
it("Handling child tab", ()=> {

cy.visit("https://rahulshettyacademy.com/AutomationPractice/");

cy.get('#opentab').invoke('removeAttr', 'target').click();
cy.origin("https://www.qaclickacademy.com", ()=>{
cy.contains("About us").click();
cy.get('.mt-50 h2').should('contain',"Welcome to QAClick Academy");
})
})
});

/*
    
    handling the calenders  
    const monthNumber ="6";
    const date ="15";
    const year = "2027";
    cy.visit("url")
    cy.get(css locator with parent as represent year )
   cy.get(css locator with parent as represent  month)
   cy.get(css locator with parent as represent date )  
   cy.contains('buttons', year).click();
   cy.get(month css).eq(Number(monthNumber-1)).click();
   cy.contains("abb", date).click();

 */
 

  });

});



