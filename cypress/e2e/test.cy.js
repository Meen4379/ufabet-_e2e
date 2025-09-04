describe('template spec', () => {

  it('passes', () => {
    cy.visit('https://example.cypress.io')
    // cy.get(':nth-child(4) > .row > .col-xs-12 > .home-list > :nth-child(1) > ul > :nth-child(1) > a').click()
    cy.contains('a', 'get').click()
    cy.get('#inputName').type('Test1')
    cy.get('.query-btn').click()
    cy.get('[placeholder=Email]').type('Nope')
  })
  it('Alert', () => {
    //JS Alert
    cy.visit('https://the-internet.herokuapp.com/javascript_alerts')
    cy.get("button[onclick='jsAlert()']").click()
    
    cy.on('window:alert',(t)=>{
      expect(t).to.contains('I am a JS Alert')
    })
    //JS Alert Window
  })
  it('Alert Window', () => {
    //JS Alert
    cy.visit('https://the-internet.herokuapp.com/javascript_alerts')
    cy.get("button[onclick='jsConfirm()']").click()
    
    cy.on('window:confirm',(t)=>{
      expect(t).to.contains('I am a JS Confirm')
    })
    cy.on('window:confirm',()=> true); //true คือกด confirm false คือกด exit
    })

  it('Alert Prompt', () => {
      //JS Alert
      cy.visit('https://the-internet.herokuapp.com/javascript_alerts')
      cy.window().then((win)=>{
          cy.stub(win,'prompt').returns('welcome');
      })
      cy.get("button[onclick='jsPrompt()']").click()
      cy.on('window:confirm',()=> true); //true คือกด confirm false คือกด exit
  })
})