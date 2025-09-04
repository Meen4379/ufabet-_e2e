describe('Qrpay dropdown check', () => {
    beforeEach(() => {
      cy.visit('https://tangtem-24-dev.24plusv3.vip/');
      Cypress.on('uncaught:exception', () => false);
    });

  it('หาก User มีบัญชี 1 บัญชี เมื่อเข้า ฝากQrpay จะเลือกบัญชีของ User อัตโนมัติ', () => {
    cy.contains('button','เข้าสู่ระบบ').click();
    cy.get('input[type="tel"]').type('0659876532');
    cy.get('input[placeholder="กรอกรหัสผ่าน"]')
    .type('Aa1234');
    cy.get('#buttonLoginInLoginModal').click();
    cy.get('#closePopupModal > .font-theme').click();
    cy.get('#closePopupModal > .font-theme').click();
    cy.get('#closePopupModal > .font-theme').click();
    cy.get('#buttonFooterdeposit img').click();
    cy.get('#closePopupModal > .font-theme').click();
    cy.get('#closePopupModal > .font-theme').click();
    cy.get('.box-menu-deposit:nth-child(2)').click();
    cy.get('[id^="__BVID__"]')
    .invoke('text')
    .should('not.eq', 'เลือกบัญชีธนาคาร');
  });
      it('หาก User มีบัญชีมากกว่า 1 บัญชี เมื่อเข้า ฝากQrpay บังคับให้เลือกบัญชีของ User เอง', () => {
    cy.contains('button','เข้าสู่ระบบ').click();
    cy.get('input[type="tel"]').type('0874108744');
    cy.get('input[placeholder="กรอกรหัสผ่าน"]')
    .type('123456');
    cy.get('#buttonLoginInLoginModal').click();
    cy.get('#closePopupModal > .font-theme').click();
    cy.get('#closePopupModal > .font-theme').click();
    cy.get('#closePopupModal > .font-theme').click();
    cy.get('#buttonFooterdeposit img').click();
    cy.get('#closePopupModal > .font-theme').click();
    cy.get('#closePopupModal > .font-theme').click();
    cy.get('.box-menu-deposit:nth-child(2)').click();
    cy.get('[id^="__BVID__"]')
    .should('contain.text', 'เลือกบัญชีธนาคาร');
    // .should('have.length', 2);
  });
})





