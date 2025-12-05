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

it("Handling mouse hover and ", ()=> {
cy.visit("https://rahulshettyacademy.com/AutomationPractice/");

// Handling mouse hover popus
cy.get('div.mouse-hover-content').invoke('show');
cy.contains('Top').click();
cy.url().should('include','top');
cy.wait(6000);
cy.visit("https://rahulshettyacademy.com/AutomationPractice/");
cy.contains("Reload").click({force:true});

// handling child windows using cypress
// handling frames with cypress using real time example 
// Automating calendars using cypress 
});
});