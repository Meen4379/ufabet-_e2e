describe('เข้าสู่ระบบ', () => {
    beforeEach(() => {
      cy.visit('https://ufaplus-24-dev.24plusv3.vip/en');
      Cypress.on('uncaught:exception', () => false);
      cy.wait(1000);
      cy.contains('button','Login').click();
    });
  
    // it('กรอกเบอร์ครบ 10 หลัก และไม่มีข้อความแจ้งเตือน', () => {
    //   cy.get('input[type="tel"]').type('0812345678');
    //   cy.contains('button','Login').click();
    //   cy.contains('เบอร์โทรศัพท์ต้องเป็นตัวเลข 10 หลัก').should('not.exist')
    // });
    // it('กรอกเบอร์ < 10 หลัก และมีข้อความแจ้งเตือน', () => {
    //   cy.get('input[type="tel"]').type('081237');
    //   cy.contains('button','Login').click();
    //   cy.contains('เบอร์โทรศัพท์ต้องเป็นตัวเลข 10 หลัก').should('be.visible')
    // });
    // it('กรอกเบอร์มากกว่า 10 หลัก จะกรอกเกินไม่ได้', () => {
    //   cy.get('input[type="tel"]').type('0812345678910')
    //   .should('have.value', '0812345678');
    // });  
    // it('ตัวอักษรและตัวอักษรพิเศษไม่สามารถกรอกได้', () => {
    //   cy.get('input[type="tel"]').type('abcd๑๒๓#@!')
    //   .should('have.value', '');
    // });  
    // it('กรอกเบอร์รูปแบบเบอร์ถูกต้องและไม่ถูกต้อง', () => {
    //   // cy.contains('button','สมัครสมาชิก').click();
    //   cy.get('input[type="tel"]').type('0112345678');
    //   cy.contains('button','Login').click();
    //   cy.contains('Phone number must start with 06, 08 or 09').should('be.visible');
    // });  
    // it('ไม่กรอกเบอร์ มีข้อความแจ้งเตือน', () => {
    //   cy.contains('button','Login').click();
    //   cy.contains('กรุณากรอกเบอร์โทรศัพท์').should('be.visible')
    // });
    // it('ช่องรหัสผ่านกรอก >= 6 และ <= 15 กรอกมากกว่า 15 หลักไม่ได้', () => {
    //   cy.get('input[type="password"]').type('1234567890123456')
    //   .should('have.value', '123456789012345');
    //   cy.get('.n-form-item-feedback__line')
    //   .should('not.exist');
    // });    
    // it('ช่องรหัสผ่านกรอก < 6', () => {
    //   cy.get('input[type="password"]').type('12345');
    //   cy.contains('button','Login').click();
    //   cy.contains('รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร').should('be.visible')
    //   // cy.get('.n-form-item-feedback__line')
    //   // .should('contain.text', 'รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร');
    // });   
    // it('ช่องรหัสผ่านพิมพ์อักษรไทยและอักษรพิเศษไม่ได้', () => {
    //   cy.get('input[type="password"]')
    //   .type('ฟฟไะำพำ');
    //   cy.contains('button','Login').click();
    //   cy.contains('กรุณากรอกข้อมูลเป็นตัวเลขหรือตัวอักษรภาษาอังกฤษเท่านั้น').should('be.visible')
    //   cy.get('input[type="password"]')
    //   .clear()
    //   .type('#@@#!๑๑+๑');
    //   cy.contains('button','Login').click();
    //   cy.contains('กรุณากรอกข้อมูลเป็นตัวเลขหรือตัวอักษรภาษาอังกฤษเท่านั้น').should('be.visible')
    // });   
    // it('ไม่กรอกรหัสผ่าน มีข้อความแจ้งเตือน', () => {
    //   cy.get('input[type="password"]').type('081234');
    //   cy.get('input[type="password"]').clear();
    //   cy.contains('button','Login').click();
    //   cy.contains('กรุณากรอกรหัสผ่าน').should('be.visible')
    // });    
    // it('กรอกรหัสผ่านถูก แต่ไม่ตรงกับบัญชี มีข้อความแจ้งเตือน', () => {
    //   cy.get('input[type="tel"]')
    //   .type('0812345678');
    //   cy.get('input[type="password"]')
    //   .type('Aa1122');
    //   cy.contains('button', 'Login').click();
    //   cy.contains('เบอร์หรือรหัสผ่านไม่ถูกต้อง กรุณาลองอีกครั้ง').should('be.visible');
    // });    
    it('กดจดจำในระบบ ระบบจะจำข้อมูลบัญชี', () => {
      cy.get('input[type="tel"]')
      .type('0812345678');
      cy.get('input[type="password"]')
      .type('Aa1122');
      cy.get('input[type="checkbox"]').click();
      cy.contains('Login').click();
      cy.contains('เข้าสู่ระบบสำเร็จ!').should('be.visible');
      cy.contains('หน้าหลัก').click();
      cy.wait(3000);
      cy.get('button').eq(1)
      .click();
      cy.contains('span', 'ออกจากระบบ').click();
      cy.contains('button','เข้าสู่ระบบ').click();
      cy.get('input[type="tel"]', { timeout: 10000 })
      .should('have.value', '0812345678');
      // cy.get('input[placeholder="กรอกรหัสผ่าน"]', { timeout: 10000 })
      // .should('have.value', '');
    });        
    it('ไม่กดจดจำในระบบ ระบบจะไม่จำข้อมูลบัญชี', () => {
      cy.get('input[type="tel"]')
      .type('0812345678');
      cy.get('input[type="password"]')
      .type('Aa1122');
      cy.contains('Login').click();
      cy.contains('เข้าสู่ระบบสำเร็จ!').should('be.visible');
      cy.contains('หน้าหลัก').click();
      cy.wait(3000);
      cy.get('button').eq(1)
      .click();
      cy.contains('span', 'ออกจากระบบ').click();
      cy.contains('button','เข้าสู่ระบบ').click();
      cy.get('input[type="tel"]', { timeout: 10000 })
      .should('have.value', '');
    }); 
    // it('กรอก Field เบอร์มือถือหรือรหัสผ่านไม่ถูกต้องอย่างใดอย่างนึง ไม่สามารถ login ได้', () => {
    //   cy.get('input[type="tel"]')
    //   .type('085518156');
    //   cy.get('input[type="password"]')
    //   .type('12345');
    //   cy.contains('button.custom-btn', 'เข้าสู่ระบบ').click();
    //   cy.get('[data-testid="toast-content"]')
    //   .should('contain.text', 'กรุณากรอกข้อมูลให้ถูกต้อง');
    // }); 
    it('ไม่กรอก Field เบอร์มือถือและรหัสผ่าน ไม่สามารถ login ได้', () => {
      cy.contains('button', 'Login').click();
      cy.contains('กรุณากรอกเบอร์โทรศัพท์').should('be.visible');
      cy.contains('กรุณากรอกรหัสผ่าน').should('be.visible');
    }); 
    
    it('กรอก Field เบอร์มือถือและรหัสผ่านถูกต้อง เข้าสู่ระบบได้', () => {
      cy.get('input[type="tel"]')
      .type('0812345678');
      cy.get('input[type="password"]')
      .type('Aa1122');
      cy.contains('button', 'Login').click();
      cy.contains('หน้าหลัก').should('exist');
    }); 
  });