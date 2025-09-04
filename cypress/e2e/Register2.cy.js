describe('สมัครสมาชิก - ตรวจสอบช่องเบอร์โทรศัพท์', () => {
    beforeEach(() => {
      cy.visit('https://pgslot99-demo-new.sunnygreen.online/login');
      cy.contains('button','สมัครสมาชิก').click();
    //   cy.get('input[type="tel"]').clear(); // ปรับ selector ตามจริง
    });
  
    // หน้าเบอร์

    it('กรอกเบอร์ครบ 10 หลัก และไม่มีข้อความแจ้งเตือน', () => {
      // cy.contains('button','สมัครสมาชิก').click();
      cy.wait(500);
      cy.get('input[type="tel"]').invoke('val', '0812345678').trigger('input')
      cy.wait(500);
      cy.get('.n-form-item-feedback--error').should('not.exist');
    });
  
    it('กรอกเบอร์น้อยกว่า 10 หลัก มีข้อความแจ้งเตือน', () => {
      // cy.contains('button','สมัครสมาชิก').click();
      cy.get('input[type="tel"]').invoke('val', '081234').trigger('input')
      cy.get('.n-form-item-feedback--error').should('contain.text', 'กรุณากรอกเบอร์มือถือให้ครบ 10 หลัก');
    });

    it('กรอกเบอร์มากกว่า 10 หลัก จะกรอกเกินไม่ได้', () => {
      // cy.contains('button','สมัครสมาชิก').click();
      Cypress.on('uncaught:exception', () => false);
      cy.get('input[type="tel"]').type('0812345678910')
      .should('have.value', '0812345678');
    });  

    it('ตัวอักษรและตัวอักษรพิเศษไม่สามารถกรอกได้', () => {
      // cy.contains('button','สมัครสมาชิก').click();
      Cypress.on('uncaught:exception', () => false);
      cy.get('input[type="tel"]').type('abcd๑๒๓#@!')
      .should('have.value', '');
    });  

    it('กรอกเบอร์รูปแบบเบอร์ถูกต้องและไม่ถูกต้อง', () => {
      // cy.contains('button','สมัครสมาชิก').click();
      Cypress.on('uncaught:exception', () => false);
      cy.get('input[type="tel"]').type('0112345678')
      cy.get('.n-form-item-feedback--error').should('contain.text', 'กรุณากรอกข้อมูลให้ถูกต้อง');
      cy.get('input[type="tel"]').clear()
      .type('0812345678');
      // cy.get('.n-form-item-feedback--error').should('contain.text', 'กรุณากรอกข้อมูลให้ถูกต้อง');
      cy.get('.n-form-item-feedback--error').should('not.exist');
    });

    it('ไม่กรอกเบอร์ มีข้อความแจ้งเตือน', () => {
      // cy.contains('button','สมัครสมาชิก').click();
      cy.get('input[type="tel"]').invoke('val', '081234').trigger('input')
      cy.get('input[type="tel"]').invoke('val', '').trigger('input');
      cy.get('.n-form-item-feedback--error').should('contain.text', 'กรุณากรอกข้อมูล');
    });
  
    it('กรอกตัวอักษรพิเศษ/ไทย มีข้อความแจ้งเตือน "กรุณากรอกข้อมูล"', () => {
      // cy.contains('button','สมัครสมาชิก').click();
      cy.get('input[type="tel"]').invoke('val', 'abc@#ไทย').trigger('input')
      cy.get('.n-form-item-feedback--error').should('not.exist');
      // cy.get('input[type="tel"]').type('abc@#ไทย');
      // cy.get('.n-form-item-feedback--error').should('contain.text', 'กรุณากรอกข้อมูล');
    });
  
    it('กรอกเบอร์ครบ 10 หลัก แต่ไม่ถูกต้อง มีข้อความแจ้งเตือน "กรุณากรอกข้อมูลให้ถูกต้อง"', () => {
      // cy.get('input[type="tel"]').type('0000000000'); // เบอร์ไม่สมเหตุสมผล
      cy.get('input[type="tel"]').invoke('val', '0000000000').trigger('input')
      cy.get('.n-form-item-feedback--error').should('contain.text', 'กรุณากรอกข้อมูลให้ถูกต้อง');
    });
  
    it('ไม่กรอกเบอร์ติ๊ก checkbox + กด ถัดไป = แจ้งเตือน', () => {
      cy.get('.n-checkbox-box__border').click(); // Checkbox
      cy.contains('button', 'ส่ง OTP').click();
      cy.get('[data-testid="toast-content"]').should('contain.text', 'กรุณากรอกข้อมูลให้ถูกต้อง');
    });

    it('กรอกเบอร์ครบ 10 หลัก แต่ไม่ถูกต้อง + ติ๊ก checkbox + กด ถัดไป = แจ้งเตือน', () => {
      cy.get('input[type="tel"]').invoke('val', '0000000000').trigger('input')
      cy.get('.n-checkbox-box__border').click(); // Checkbox
      cy.contains('button', 'ส่ง OTP').click();
      cy.get('.n-form-item-feedback--error').should('contain.text', 'กรุณากรอกข้อมูลให้ถูกต้อง');
      cy.get('[data-testid="toast-content"]').should('contain.text', 'กรุณากรอกข้อมูลให้ถูกต้อง');
    });

    it('กรอกเบอร์ถูกต้อง 10 หลัก แต่ไม่ติ๊ก checkbox จะมีแจ้งเตือน', () => {
      Cypress.on('uncaught:exception', () => false);
      cy.get('input[type="tel"]').type('0812345678');
      cy.contains('button.custom-btn', 'ส่ง OTP').click();
      cy.get('[data-testid="toast-content"]').should('contain.text', 'กรุณายอมรับเงื่อนไขการสมัคร');
    });
  
    it('กรอกเบอร์ถูกต้อง + ติ๊ก checkbox + กด ถัดไป แล้วเจอหน้ารหัสผ่าน', () => {

      Cypress.on('uncaught:exception', () => false);
      // const phone = '0812345678';
      cy.get('input[type="tel"]').type('0812345678');      
      // [...phone].forEach((digit) => {
      //   cy.get('input[type="tel"]').type(digit, { delay: 0 });
      // });
      cy.get('.n-checkbox-box__border').click();
      cy.contains('button.custom-btn', 'ส่ง OTP').click();
  
      // ตรวจสอบว่าไปหน้าใหม่ที่มีช่อง "OTP"
      cy.get('.v-otp-input__field').eq(0).should('exist');
      cy.get('.v-otp-input__field').eq(1).should('exist');
      cy.get('.v-otp-input__field').eq(2).should('exist');
      cy.get('.v-otp-input__field').eq(3).should('exist');
      cy.get('.v-otp-input__field').eq(4).should('exist');
      cy.get('.v-otp-input__field').eq(5).should('exist');
    });

    // หน้า OTP

    it('OTP กรอกตัวอักษร ไม่ได้', () => {
      Cypress.on('uncaught:exception', () => false);
      cy.get('input[type="tel"]').type('0812345678');      
      cy.get('.n-checkbox-box__border').click();
      cy.contains('button.custom-btn', 'ส่ง OTP').click();
  
      // ตรวจสอบว่าไปหน้าใหม่ที่มีช่อง "OTP"
      cy.get('.v-otp-input__field').eq(0).type('t')
      .should('contain.text', '');
      cy.get('.v-otp-input__field').eq(0).type('เ')
      .should('contain.text', '');
      cy.get('.v-otp-input__field').eq(0).type('#')
      .should('contain.text', '');
      cy.get('.v-otp-input__field').eq(0).type('๑')
      .should('contain.text', '');
    });

    it('OTP กรอกตัวเลขไม่ครบ', () => {
      Cypress.on('uncaught:exception', () => false);
      cy.get('input[type="tel"]').type('0812345678');      

      cy.get('.n-checkbox-box__border').click();
      cy.contains('button.custom-btn', 'ส่ง OTP').click();

      cy.get('.v-otp-input__field').eq(0).type('1')
      .should('contain.text', '');
      cy.contains('button.custom-btn', 'ยืนยัน')
      .should('have.class', 'btn-disable');
      cy.get('.v-otp-input__field').eq(1).type('2')
      .should('contain.text', '');
      cy.contains('button.custom-btn', 'ยืนยัน')
      .should('have.class', 'btn-disable');
      cy.get('.v-otp-input__field').eq(2).type('3')
      .should('contain.text', '');
      cy.contains('button.custom-btn', 'ยืนยัน')
      .should('have.class', 'btn-disable');
      cy.get('.v-otp-input__field').eq(3).type('4')
      .should('contain.text', '');
      cy.contains('button.custom-btn', 'ยืนยัน')
      .should('have.class', 'btn-disable');
      cy.get('.v-otp-input__field').eq(4).type('5')
      .should('contain.text', '');
      cy.contains('button.custom-btn', 'ยืนยัน')
      .should('have.class', 'btn-disable');
    });

    it('OTP กรอกไม่ถูกต้อง', () => {
      Cypress.on('uncaught:exception', () => false);
      cy.get('input[type="tel"]').type('0812345678');      

      cy.get('.n-checkbox-box__border').click();
      cy.contains('button.custom-btn', 'ส่ง OTP').click();

      cy.get('.v-otp-input__field').eq(0).type('1')
      .should('contain.text', '');
      cy.get('.v-otp-input__field').eq(1).type('2')
      .should('contain.text', '');
      cy.get('.v-otp-input__field').eq(2).type('3')
      .should('contain.text', '');
      cy.get('.v-otp-input__field').eq(3).type('4')
      .should('contain.text', '');
      cy.get('.v-otp-input__field').eq(4).type('5')
      .should('contain.text', '');
      cy.get('.v-otp-input__field').eq(5).type('6')
      .should('contain.text', '');
      cy.contains('button.custom-btn', 'ยืนยัน')
      .click();
      cy.get('[data-testid="toast-content"]').should('contain.text', 'รหัส OTP ผิด กรุณาลองใหม่!!');
    });    

    it('กดย้อนกลับ ในหน้า otp', () => {
      Cypress.on('uncaught:exception', () => false);
      cy.get('input[type="tel"]').type('0812345678');      
      cy.get('.n-checkbox-box__border').click();
      cy.contains('button.custom-btn', 'ส่ง OTP').click();
      cy.contains('button.custom-btn', 'ย้อนกลับ').click();
      cy.get('input[type="tel"]').should('exist');
    });   

    // หน้าตั้งรหัสผ่าน

    it('ไปหน้าตั้งรหัสผ่าน', () => {
      Cypress.on('uncaught:exception', () => false);
      cy.get('input[type="tel"]').type('0874408756');      
      cy.get('.n-checkbox-box__border').click();
      cy.contains('button.custom-btn', 'ส่ง OTP').click();
      cy.get('input[placeholder="กรอกรหัสผ่าน"]').should('be.visible');
      cy.get('input[placeholder="ยืนยันรหัสผ่านอีกครั้ง"]').should('be.visible');
    });
    
    it('กดแสดงรหัสผ่านทั้ง 2 ช่อง', () => {
      Cypress.on('uncaught:exception', () => false);
      cy.get('input[type="tel"]').type('0874408756');      
      cy.get('.n-checkbox-box__border').click();
      cy.contains('button.custom-btn', 'ส่ง OTP').click();
      // คลิก toggle ของช่อง "รหัสผ่าน"
      cy.get('input[placeholder="กรอกรหัสผ่าน"]')   // หา input ที่ต้องการ
      .parents('.n-input')                                      // ขึ้นไปหา wrapper หลัก
      .find('.n-input__eye')                                    // หา div ที่เป็นปุ่มแสดงรหัสผ่าน
      .click();                                                 // คลิก!
      cy.get('input[placeholder="กรอกรหัสผ่าน"]').should('have.attr', 'type', 'text');

      // คลิก toggle ของช่อง "ยืนยันรหัสผ่าน"
      cy.get('input[placeholder="ยืนยันรหัสผ่านอีกครั้ง"]')   // หา input ที่ต้องการ
      .parents('.n-input')                                      // ขึ้นไปหา wrapper หลัก
      .find('.n-input__eye')                                    // หา div ที่เป็นปุ่มแสดงรหัสผ่าน
      .click();                                                 // คลิก!
      cy.get('input[placeholder="ยืนยันรหัสผ่านอีกครั้ง"]').should('have.attr', 'type', 'text');
    });   

    it('ช่องรหัสผ่านกรอก < 6', () => {
      Cypress.on('uncaught:exception', () => false);
      cy.get('input[type="tel"]').type('0874408756');      
      cy.get('.n-checkbox-box__border').click();
      cy.contains('button.custom-btn', 'ส่ง OTP').click();
      // คลิก toggle ของช่อง "รหัสผ่าน"                                        // คลิก!
      cy.get('input[placeholder="กรอกรหัสผ่าน"]').type('12345');
      cy.get('.n-form-item-feedback__line')
      .eq(0) // หรือใช้ .first()
      .should('contain.text', 'รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร');
      // คลิก toggle ของช่อง "ยืนยันรหัสผ่าน"
    });   

    it('ช่องรหัสผ่านไม่กรอก', () => {
      Cypress.on('uncaught:exception', () => false);
      cy.get('input[type="tel"]').type('0874408756');      
      cy.get('.n-checkbox-box__border').click();
      cy.contains('button.custom-btn', 'ส่ง OTP').click();
      // คลิก toggle ของช่อง "รหัสผ่าน"                                        // คลิก!
      cy.get('input[placeholder="กรอกรหัสผ่าน"]')
      .type('1')
      .clear();
      cy.get('.n-form-item-feedback__line')
      .eq(0) // หรือใช้ .first()
      .should('contain.text', 'กรุณากรอกข้อมูล');
      // คลิก toggle ของช่อง "ยืนยันรหัสผ่าน"
    });   

    it('ช่องรหัสผ่านพิมพ์อักษรไทยและอักษรพิเศษไม่ได้', () => {
      Cypress.on('uncaught:exception', () => false);
      cy.get('input[type="tel"]').type('0874408756');      
      cy.get('.n-checkbox-box__border').click();
      cy.contains('button.custom-btn', 'ส่ง OTP').click();
      // คลิก toggle ของช่อง "รหัสผ่าน"                                        // คลิก!
      cy.get('input[placeholder="กรอกรหัสผ่าน"]')
      .type('ฟฟไะำพำ');
      cy.get('.n-form-item-feedback__line')
      .eq(0) // หรือใช้ .first()
      .should('contain.text', 'กรุณากรอกข้อมูลเป็นตัวเลขหรือตัวอักษรภาษาอังกฤษเท่านั้น');
      cy.get('.n-form-item-feedback__line')
      .eq(0) // หรือใช้ .first()
      .should('contain.text', 'กรุณากรอกข้อมูลเป็นตัวเลขหรือตัวอักษรภาษาอังกฤษเท่านั้น');
      cy.get('input[placeholder="กรอกรหัสผ่าน"]')
      .clear()
      .type('#@@#!๑๑+๑');
      cy.get('.n-form-item-feedback__line')
      .eq(0) // หรือใช้ .first()
      .should('contain.text', 'กรุณากรอกข้อมูลเป็นตัวเลขหรือตัวอักษรภาษาอังกฤษเท่านั้น');
      // คลิก toggle ของช่อง "ยืนยันรหัสผ่าน"
    });   

    it('ช่องรหัสผ่านกรอก >= 6 แต่ไม่กรอกช่องยืนยันรหัสผ่าน', () => {
      Cypress.on('uncaught:exception', () => false);
      cy.get('input[type="tel"]').type('0874408756');      
      cy.get('.n-checkbox-box__border').click();
      cy.contains('button.custom-btn', 'ส่ง OTP').click();
      // คลิก toggle ของช่อง "รหัสผ่าน"                                        // คลิก!
      cy.get('input[placeholder="กรอกรหัสผ่าน"]').type('123456');
      cy.get('.n-form-item-feedback__line')
      .eq(0) // หรือใช้ .first()
      .should('contain.text', 'รหัสผ่านไม่ตรงกัน');
      // คลิก toggle ของช่อง "ยืนยันรหัสผ่าน"
      cy.get('.n-form-item-feedback__line')
      .eq(1) // หรือใช้ .first()
      .should('contain.text', 'กรุณากรอกข้อมูล');
    });   

    it('ช่องรหัสผ่านกรอก >= 6 แต่กรอกช่องยืนยันรหัสผ่าน < 6', () => {
      Cypress.on('uncaught:exception', () => false);
      cy.get('input[type="tel"]').type('0874408756');      
      cy.get('.n-checkbox-box__border').click();
      cy.contains('button.custom-btn', 'ส่ง OTP').click();
      // คลิก toggle ของช่อง "รหัสผ่าน"                                        // คลิก!
      cy.get('input[placeholder="กรอกรหัสผ่าน"]').type('123456');
      cy.get('.n-form-item-feedback__line')
      .eq(0) // หรือใช้ .first()
      .should('contain.text', 'รหัสผ่านไม่ตรงกัน');
      // คลิก toggle ของช่อง "ยืนยันรหัสผ่าน"
      cy.get('input[placeholder="ยืนยันรหัสผ่านอีกครั้ง"]').type('12345');
      cy.get('.n-form-item-feedback__line')
      .eq(1) // หรือใช้ .first()
      .should('contain.text', 'รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร');
    });   

    it('ช่องรหัสผ่านกรอก >= 6 แต่กรอกช่องยืนยันรหัสผ่านไม่เหมือนกัน', () => {
      Cypress.on('uncaught:exception', () => false);
      cy.get('input[type="tel"]').type('0874408756');      
      cy.get('.n-checkbox-box__border').click();
      cy.contains('button.custom-btn', 'ส่ง OTP').click();
      // คลิก toggle ของช่อง "รหัสผ่าน"                                        // คลิก!
      cy.get('input[placeholder="กรอกรหัสผ่าน"]').type('123456');
      cy.get('.n-form-item-feedback__line')
      .eq(0) // หรือใช้ .first()
      .should('contain.text', 'รหัสผ่านไม่ตรงกัน');
      // คลิก toggle ของช่อง "ยืนยันรหัสผ่าน"
      cy.get('input[placeholder="ยืนยันรหัสผ่านอีกครั้ง"]').type('123457');
      cy.get('.n-form-item-feedback__line')
      .eq(1) // หรือใช้ .first()
      .should('contain.text', 'รหัสผ่านไม่ตรงกัน');
    });   

    it('ช่องรหัสผ่านกรอก >= 6 กรอกช่องยืนยันรหัสผ่านเหมือนกัน', () => {
      Cypress.on('uncaught:exception', () => false);
      cy.get('input[type="tel"]').type('0874408756');      
      cy.get('.n-checkbox-box__border').click();
      cy.contains('button.custom-btn', 'ส่ง OTP').click();
      // คลิก toggle ของช่อง "รหัสผ่าน"                                        // คลิก!
      cy.get('input[placeholder="กรอกรหัสผ่าน"]').type('123456');
      // คลิก toggle ของช่อง "ยืนยันรหัสผ่าน"
      cy.get('input[placeholder="ยืนยันรหัสผ่านอีกครั้ง"]').type('123456');
      cy.get('.n-form-item-feedback__line')
      .should('not.exist');
    });

    it('ช่องรหัสผ่านกรอก >= 6 กรอกช่องยืนยันรหัสผ่านเหมือนกัน และกดยืนยัน', () => {
      Cypress.on('uncaught:exception', () => false);
      cy.get('input[type="tel"]').type('0874408756');      
      cy.get('.n-checkbox-box__border').click();
      cy.contains('button.custom-btn', 'ส่ง OTP').click();
      // คลิก toggle ของช่อง "รหัสผ่าน"                                        // คลิก!
      cy.get('input[placeholder="กรอกรหัสผ่าน"]').type('123456');
      // คลิก toggle ของช่อง "ยืนยันรหัสผ่าน"
      cy.get('input[placeholder="ยืนยันรหัสผ่านอีกครั้ง"]').type('123456');
      cy.get('.n-form-item-feedback__line')
      .should('not.exist');
      cy.contains('button.custom-btn', 'ยืนยัน').click();
      cy.get('.n-base-selection-label')
      .should('be.visible');
    });      

    it('กดย้อนกลับหน้ารหัสผ่าน', () => {
      Cypress.on('uncaught:exception', () => false);
      cy.get('input[type="tel"]').type('0874408756');      
      cy.get('.n-checkbox-box__border').click();
      cy.contains('button.custom-btn', 'ส่ง OTP').click();
      cy.contains('button.custom-btn', 'ย้อนกลับ').click();
      cy.get('input[type="tel"]').should('exist');
    });   

    // หน้าบัญชี

    it('เข้าหน้าบัญชีแต่ยังไม่ได้กดบัญชีธนาคาร', () => {
      Cypress.on('uncaught:exception', () => false);
      cy.get('input[type="tel"]').type('0874408756');      
      cy.get('.n-checkbox-box__border').click();
      cy.contains('button.custom-btn', 'ส่ง OTP').click();
      // คลิก toggle ของช่อง "รหัสผ่าน"                                        // คลิก!
      cy.get('input[placeholder="กรอกรหัสผ่าน"]').type('123456');
      // คลิก toggle ของช่อง "ยืนยันรหัสผ่าน"
      cy.get('input[placeholder="ยืนยันรหัสผ่านอีกครั้ง"]').type('123456');
      cy.get('.n-form-item-feedback__line')
      .should('not.exist');
      cy.contains('button.custom-btn', 'ยืนยัน').click();
      cy.get('input[placeholder="กรอกเลขบัญชีธนาคาร"]')
      .should('not.exist');
    });   

    it('เข้าหน้าบัญชี กดบัญชีธนาคาร', () => {
      Cypress.on('uncaught:exception', () => false);
      cy.get('input[type="tel"]').type('0874408756');      
      cy.get('.n-checkbox-box__border').click();
      cy.contains('button.custom-btn', 'ส่ง OTP').click();                                       // คลิก!
      cy.get('input[placeholder="กรอกรหัสผ่าน"]').type('123456');
      cy.get('input[placeholder="ยืนยันรหัสผ่านอีกครั้ง"]').type('123456');
      cy.contains('button.custom-btn', 'ยืนยัน').click();
      cy.get('div.grid img').eq(3).click(); //ไทยพาณิชย์
      cy.get('.text-theme-v2')
      .should('contain.text', 'ธนาคารไทยพาณิชย์');
      cy.get('input[placeholder="กรอกเลขบัญชีธนาคาร"]')
      .should('be.visible');
    }); 
    
    it('เข้าหน้าบัญชี กดบัญชี True wallet', () => {
      Cypress.on('uncaught:exception', () => false);
      cy.get('input[type="tel"]').type('0874408756');      
      cy.get('.n-checkbox-box__border').click();
      cy.contains('button.custom-btn', 'ส่ง OTP').click();                                       // คลิก!
      cy.get('input[placeholder="กรอกรหัสผ่าน"]').type('123456');
      cy.get('input[placeholder="ยืนยันรหัสผ่านอีกครั้ง"]').type('123456');
      cy.contains('button.custom-btn', 'ยืนยัน').click();
      cy.get('div.grid img').eq(1).click(); //True wallet
      cy.get('.text-theme-v2')
      .should('contain.text', 'ทรูมันนี่ วอลเลต');
      cy.get('input[placeholder="กรอกเลขบัญชีธนาคาร"]')
      .should('be.visible');
      cy.get('input[placeholder="กรอกชื่อบัญชีธนาคาร"]')
      .should('be.visible');
    });   

    it('ใส่เลขบัญชี < 10', () => {
      Cypress.on('uncaught:exception', () => false);
      cy.get('input[type="tel"]').type('0874408756');      
      cy.get('.n-checkbox-box__border').click();
      cy.contains('button.custom-btn', 'ส่ง OTP').click();                                       // คลิก!
      cy.get('input[placeholder="กรอกรหัสผ่าน"]').type('123456');
      cy.get('input[placeholder="ยืนยันรหัสผ่านอีกครั้ง"]').type('123456');
      cy.contains('button.custom-btn', 'ยืนยัน').click();
      cy.get('div.grid img').eq(3).click(); //ไทยพาณิชย์
      cy.get('.text-theme-v2')
      .should('contain.text', 'ธนาคารไทยพาณิชย์');
      cy.get('input[placeholder="กรอกเลขบัญชีธนาคาร"]')
      .type('012345678');
      cy.get('.n-form-item-feedback__line').
      should('contain.text', 'เลขบัญชีต้องมีความยาวอย่างน้อย 10 ตัวอักษร');
    }); 

    it('ใส่เลขบัญชี >= 10 แต่เลขบัญชีไม่ถูกต้อง', () => {
      Cypress.on('uncaught:exception', () => false);
      cy.get('input[type="tel"]').type('0874408756');      
      cy.get('.n-checkbox-box__border').click();
      cy.contains('button.custom-btn', 'ส่ง OTP').click();                                       // คลิก!
      cy.get('input[placeholder="กรอกรหัสผ่าน"]').type('123456');
      cy.get('input[placeholder="ยืนยันรหัสผ่านอีกครั้ง"]').type('123456');
      cy.contains('button.custom-btn', 'ยืนยัน').click();
      cy.get('div.grid img').eq(3).click(); //ไทยพาณิชย์
      cy.get('.text-theme-v2')
      .should('contain.text', 'ธนาคารไทยพาณิชย์');
      cy.get('input[placeholder="กรอกเลขบัญชีธนาคาร"]')
      .type('012345678910');
      cy.contains('button.custom-btn', 'ยืนยัน').click();
      cy.get('[data-testid="toast-content"]',{ timeout: 10000 })
      .should('contain.text', 'ไม่สามารถตราวจสอบบัญชีได้');
    }); 

    it('ไม่ใส่เลขบัญชี', () => {
      Cypress.on('uncaught:exception', () => false);
      cy.get('input[type="tel"]').type('0874408756');      
      cy.get('.n-checkbox-box__border').click();
      cy.contains('button.custom-btn', 'ส่ง OTP').click();                                       // คลิก!
      cy.get('input[placeholder="กรอกรหัสผ่าน"]').type('123456');
      cy.get('input[placeholder="ยืนยันรหัสผ่านอีกครั้ง"]').type('123456');
      cy.contains('button.custom-btn', 'ยืนยัน').click();
      cy.get('div.grid img').eq(3).click(); //ไทยพาณิชย์
      cy.get('.text-theme-v2')
      .should('contain.text', 'ธนาคารไทยพาณิชย์');
      cy.get('input[placeholder="กรอกเลขบัญชีธนาคาร"]')
      .type('0')
      .clear();
      cy.get('.n-form-item-feedback__line')
      .should('contain.text', 'กรุณากรอกข้อมูล');
    }); 

    it('กรอกตัวอักษรในช่องเลขบัญชีไม่ได้', () => {
      Cypress.on('uncaught:exception', () => false);
      cy.get('input[type="tel"]').type('0874408756');      
      cy.get('.n-checkbox-box__border').click();
      cy.contains('button.custom-btn', 'ส่ง OTP').click();                                       // คลิก!
      cy.get('input[placeholder="กรอกรหัสผ่าน"]').type('123456');
      cy.get('input[placeholder="ยืนยันรหัสผ่านอีกครั้ง"]').type('123456');
      cy.contains('button.custom-btn', 'ยืนยัน').click();
      cy.get('div.grid img').eq(3).click(); //ไทยพาณิชย์
      cy.get('.text-theme-v2')
      .should('contain.text', 'ธนาคารไทยพาณิชย์');
      cy.get('input[placeholder="กรอกเลขบัญชีธนาคาร"]')
      .type('เช็ค')
      .should('contain.text', '');
      cy.get('input[placeholder="กรอกเลขบัญชีธนาคาร"]')
      .type('๒๑+')
      .should('contain.text', '');
    }); 

    it('ใส่เลขบัญชี Truewallet < 10', () => {
      Cypress.on('uncaught:exception', () => false);
      cy.get('input[type="tel"]').type('0874408756');      
      cy.get('.n-checkbox-box__border').click();
      cy.contains('button.custom-btn', 'ส่ง OTP').click();                                       // คลิก!
      cy.get('input[placeholder="กรอกรหัสผ่าน"]').type('123456');
      cy.get('input[placeholder="ยืนยันรหัสผ่านอีกครั้ง"]').type('123456');
      cy.contains('button.custom-btn', 'ยืนยัน').click();
      cy.get('div.grid img').eq(1).click(); //True wallet
      cy.get('input[placeholder="กรอกเลขบัญชีธนาคาร"]')
      .type('012345678');
      cy.get('.n-form-item-feedback__line')
      .eq(0)
      .should('contain.text', 'เลขบัญชีต้องมีความยาวอย่างน้อย 10 ตัวอักษร');
    }); 

    it('ไม่ใส่เลขบัญชี Truewallet', () => {
      Cypress.on('uncaught:exception', () => false);
      cy.get('input[type="tel"]').type('0874408756');      
      cy.get('.n-checkbox-box__border').click();
      cy.contains('button.custom-btn', 'ส่ง OTP').click();                                       // คลิก!
      cy.get('input[placeholder="กรอกรหัสผ่าน"]').type('123456');
      cy.get('input[placeholder="ยืนยันรหัสผ่านอีกครั้ง"]').type('123456');
      cy.contains('button.custom-btn', 'ยืนยัน').click();
      cy.get('div.grid img').eq(1).click(); //True wallet
      cy.get('input[placeholder="กรอกเลขบัญชีธนาคาร"]')
      .type('012345678')
      .clear();
      cy.get('.n-form-item-feedback__line')
      .eq(0)
      .should('contain.text', 'กรุณากรอกข้อมูล');
    }); 

    it('กรอกตัวอักษรในช่องเลขบัญชี Truewallet ไม่ได้', () => {
      Cypress.on('uncaught:exception', () => false);
      cy.get('input[type="tel"]').type('0874408756');      
      cy.get('.n-checkbox-box__border').click();
      cy.contains('button.custom-btn', 'ส่ง OTP').click();                                       // คลิก!
      cy.get('input[placeholder="กรอกรหัสผ่าน"]').type('123456');
      cy.get('input[placeholder="ยืนยันรหัสผ่านอีกครั้ง"]').type('123456');
      cy.contains('button.custom-btn', 'ยืนยัน').click();
      cy.get('div.grid img').eq(1).click();
      cy.get('input[placeholder="กรอกเลขบัญชีธนาคาร"]')
      .type('เช็ค')
      .should('contain.text', '');
      cy.get('input[placeholder="กรอกเลขบัญชีธนาคาร"]')
      .type('๒๑+')
      .should('contain.text', '');
    }); 

    it('ใสอักษรพิเศษช่อง ชื่อบัญชีไม่ได้ ของบัญชี True wallet', () => {
      Cypress.on('uncaught:exception', () => false);
      cy.get('input[type="tel"]').type('0874408756');      
      cy.get('.n-checkbox-box__border').click();
      cy.contains('button.custom-btn', 'ส่ง OTP').click();                                       // คลิก!
      cy.get('input[placeholder="กรอกรหัสผ่าน"]').type('123456');
      cy.get('input[placeholder="ยืนยันรหัสผ่านอีกครั้ง"]').type('123456');
      cy.contains('button.custom-btn', 'ยืนยัน').click();
      cy.get('div.grid img').eq(1).click(); //True wallet
      cy.get('.text-theme-v2')
      .should('contain.text', 'ทรูมันนี่ วอลเลต');
      cy.get('input[placeholder="กรอกชื่อบัญชีธนาคาร"]')
      .type('12312')
      .should('contain.text', '');
      cy.get('input[placeholder="กรอกชื่อบัญชีธนาคาร"]')
      .type('@@');
      cy.get('.n-form-item-feedback__line')
      .eq(0)
      .should('contain.text', 'กรุณากรอกข้อมูลเป็นตัวอักษรเท่านั้น');
    });   

    it('ไม่ใส่ชื่อบัญชี Truewallet', () => {
      Cypress.on('uncaught:exception', () => false);
      cy.get('input[type="tel"]').type('0874408756');      
      cy.get('.n-checkbox-box__border').click();
      cy.contains('button.custom-btn', 'ส่ง OTP').click();                                       // คลิก!
      cy.get('input[placeholder="กรอกรหัสผ่าน"]').type('123456');
      cy.get('input[placeholder="ยืนยันรหัสผ่านอีกครั้ง"]').type('123456');
      cy.contains('button.custom-btn', 'ยืนยัน').click();
      cy.get('div.grid img').eq(1).click(); //True wallet
      cy.get('input[placeholder="กรอกชื่อบัญชีธนาคาร"]')
      .type('Test')
      .clear();
      cy.get('.n-form-item-feedback__line')
      .eq(0)
      .should('contain.text', 'กรุณากรอกข้อมูล');
    }); 

    it('กดย้อนกลับหน้าบัญชี', () => {
      Cypress.on('uncaught:exception', () => false);
      cy.get('input[type="tel"]').type('0874408756');      
      cy.get('.n-checkbox-box__border').click();
      cy.contains('button.custom-btn', 'ส่ง OTP').click();                                       // คลิก!
      cy.get('input[placeholder="กรอกรหัสผ่าน"]').type('123456');
      cy.get('input[placeholder="ยืนยันรหัสผ่านอีกครั้ง"]').type('123456');
      cy.contains('button.custom-btn', 'ยืนยัน').click();
      cy.contains('button.custom-btn', 'ย้อนกลับ').click();
      cy.get('input[placeholder="กรอกรหัสผ่าน"]')
      .should('be.visible');
      cy.get('input[placeholder="ยืนยันรหัสผ่านอีกครั้ง"]')
      .should('be.visible');
    });       

  });