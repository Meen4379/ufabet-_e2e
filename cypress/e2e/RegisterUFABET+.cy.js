describe('สมัครสมาชิก - ตรวจสอบช่องเบอร์โทรศัพท์', () => {
    beforeEach(() => {
      cy.visit('https://ufaplus-24-dev.24plusv3.vip/en');
      Cypress.on('uncaught:exception', () => false);
      cy.wait(1000);
      cy.contains('button','Register').click();
    });
  
    // หน้าเบอร์

    it('กรอกเบอร์ครบ 10 หลัก และไม่มีข้อความแจ้งเตือน', () => {
      cy.get('input[type="tel"]').type('0812345678');
      cy.wait(500);
      cy.contains('button', 'สมัครสมาชิก', { matchCase: false })
      .click({ force: true });
      // cy.contains('button', 'สมัครสมาชิก').scrollIntoView().click()
      cy.contains('กรุณากรอกเบอร์โทรศัพท์').should('not.exist');
    });
  
    it('กรอกเบอร์น้อยกว่า 10 หลัก มีข้อความแจ้งเตือน', () => {
      // cy.contains('button','สมัครสมาชิก').click();
      cy.get('input[type="tel"]').type('081234567');
      cy.contains('button', 'สมัครสมาชิก', { matchCase: false })
      .click({ force: true });
      cy.contains('เบอร์โทรศัพท์ต้องเป็นตัวเลข 10 หลัก').should('be.visible');
    });

    it('กรอกเบอร์มากกว่า 10 หลัก จะกรอกเกินไม่ได้', () => {
      // cy.contains('button','สมัครสมาชิก').click();
      cy.get('input[type="tel"]').type('0812345678910')
      .should('have.value', '0812345678');
    });  

    it('ตัวอักษรและตัวอักษรพิเศษไม่สามารถกรอกได้', () => {
      // cy.contains('button','สมัครสมาชิก').click();
      cy.get('input[type="tel"]').type('abcd๑๒๓#@!')
      .should('have.value', '');
    });  

    it('กรอกเบอร์รูปแบบเบอร์ถูกต้องและไม่ถูกต้อง', () => {
      cy.get('input[type="tel"]').type('0112345678')
      cy.contains('button', 'สมัครสมาชิก', { matchCase: false })
      .click({ force: true });
      cy.contains('เบอร์โทรศัพท์ต้องขึ้นต้นด้วย 06, 08 หรือ 09').should('be.visible');
    });

    it('ไม่กรอกเบอร์ มีข้อความแจ้งเตือน', () => {
      // cy.contains('button','สมัครสมาชิก').click();
      cy.contains('button', 'สมัครสมาชิก', { matchCase: false })
      .click({ force: true });
      cy.contains('กรุณากรอกเบอร์โทรศัพท์').should('be.visible');
    });
  
    it('กรอกตัวอักษรพิเศษ/ไทย มีข้อความแจ้งเตือน "กรุณากรอกข้อมูล"', () => {
      cy.get('input[type="tel"]').type('abc@#ไทย');
      cy.contains('button', 'สมัครสมาชิก', { matchCase: false })
      .click({ force: true });
      cy.contains('เบอร์โทรศัพท์ต้องเป็นตัวเลข 10 หลัก').should('be.visible');
    });
  
    it('กรอกเบอร์ครบ 10 หลัก แต่ไม่ถูกต้อง มีข้อความแจ้งเตือน "กรุณากรอกข้อมูลให้ถูกต้อง"', () => {
      // cy.get('input[type="tel"]').type('0000000000'); // เบอร์ไม่สมเหตุสมผล
      cy.get('input[type="tel"]').type('0000000000');
      cy.contains('button', 'สมัครสมาชิก', { matchCase: false })
      .click({ force: true });
      cy.contains('เบอร์โทรศัพท์ต้องขึ้นต้นด้วย 06, 08 หรือ 09').should('be.visible');
    });

    // หน้าตั้งรหัสผ่าน
    it('ช่องรหัสผ่านกรอก >= 6 มีตัวพิมพ์ใหญ่ >= 1', () => {
      cy.get('input[placeholder="รหัสผ่าน (ขั้นต่ำ 6 ตัว)"]').type('Aa1122');
      cy.contains('button', 'สมัครสมาชิก', { matchCase: false })
      .click({ force: true });
      cy.contains('รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร').should('not.exist');
      cy.contains('กรุณากรอกรหัสผ่าน').should('not.exist');
      cy.contains('รหัสผ่านต้องมีตัวอักษรพิมพ์ใหญ่อย่างน้อย 1 ตัว').should('not.exist');
    });   

    it('ช่องรหัสผ่านกรอก >= 6 ไม่มีตัวพิมพ์ใหญ่', () => {
      cy.get('input[placeholder="รหัสผ่าน (ขั้นต่ำ 6 ตัว)"]').type('aa1122');
      cy.contains('button', 'สมัครสมาชิก', { matchCase: false })
      .click({ force: true });
      cy.contains('รหัสผ่านต้องมีตัวอักษรพิมพ์ใหญ่อย่างน้อย 1 ตัว').should('be.visible');
    });       

    it('ช่องรหัสผ่านกรอก < 6', () => {
      cy.get('input[placeholder="รหัสผ่าน (ขั้นต่ำ 6 ตัว)"]').type('12345');
      cy.contains('button', 'สมัครสมาชิก', { matchCase: false })
      .click({ force: true });
      cy.contains('รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร').should('be.visible');
    });   

    it('ช่องรหัสผ่านไม่กรอก', () => {
      cy.contains('button', 'สมัครสมาชิก', { matchCase: false })
      .click({ force: true });
      cy.contains('กรุณากรอกรหัสผ่าน').should('be.visible');
    });   

    it('ช่องรหัสผ่านพิมพ์อักษรไทยและอักษรพิเศษไม่ได้', () => {
      cy.get('input[placeholder="รหัสผ่าน (ขั้นต่ำ 6 ตัว)"]')
      .type('ฟฟไะำพำ');
      cy.contains('button', 'สมัครสมาชิก', { matchCase: false })
      .click({ force: true });
      cy.contains('กรุณากรอกข้อมูลเป็นตัวเลขหรือตัวอักษรภาษาอังกฤษเท่านั้น').should('be.visible');
      cy.get('input[placeholder="กรอกรหัสผ่าน"]')
      .clear()
      .type('#@@#!๑๑+๑');
      cy.contains('button', 'สมัครสมาชิก', { matchCase: false })
      .click({ force: true });
      cy.contains('กรุณากรอกข้อมูลเป็นตัวเลขหรือตัวอักษรภาษาอังกฤษเท่านั้น').should('be.visible');
      // คลิก toggle ของช่อง "ยืนยันรหัสผ่าน"
    });    

    // หน้าบัญชี

    it('เลือกบัญชีธนาคาร', () => {
      cy.get('.dropdown-container button')
      .eq(0)
      .click();
      cy.contains('button', 'กสิกรไทย').click();
      cy.get('.dropdown-container span.flex-1')
      .should('contain.text', 'กสิกรไทย');
    }); 

    it('ใส่เลขบัญชี < 10', () => {
      cy.get('input[placeholder="เลขบัญชีธนาคาร"]')
      .type('012345678');
      cy.contains('button', 'สมัครสมาชิก', { matchCase: false })
      .click({ force: true });
      cy.contains('เลขบัญชีต้องมีความยาวอย่างน้อย 10 ตัวอักษร').should('be.visible');
    }); 

    // it('ใส่เลขบัญชี >= 10 แต่เลขบัญชีไม่ถูกต้อง', () => {
    //   cy.get('input[placeholder="เลขบัญชีธนาคาร"]')
    //   .type('012345678910');
    //   cy.contains('button', 'สมัครสมาชิก', { matchCase: false })
    //   .click({ force: true });
    //   cy.contains('กรอกเลขบัญชีให้ถูกต้อง').should('be.visible');
    // }); 

    it('ไม่ใส่เลขบัญชี', () => {
      cy.contains('button', 'สมัครสมาชิก', { matchCase: false })
      .click({ force: true });
      cy.contains('กรุณากรอกเลขบัญชีธนาคาร').should('be.visible');
    }); 

    it('กรอกตัวอักษรในช่องเลขบัญชีไม่ได้', () => {
      cy.get('input[placeholder="เลขบัญชีธนาคาร"]')
      .type('เช็ค')
      .should('contain.text', '');
      cy.get('input[placeholder="เลขบัญชีธนาคาร"]')
      .type('๒๑+')
      .should('contain.text', '');
    }); 

    it('ใส่ชื่อบัญชี', () => {
      cy.get('input[placeholder="ชื่อบัญชีธนาคาร"]')
      .type('Test TestRegistAuto');
      cy.contains('button', 'สมัครสมาชิก', { matchCase: false })
      .click({ force: true });
      cy.contains('กรุณากรอกชื่อบัญชีธนาคาร').should('not.exist');
    }); 

    it('ไม่ใส่ชื่อบัญชี', () => {
      cy.contains('button', 'สมัครสมาชิก', { matchCase: false })
      .click({ force: true });
      cy.contains('กรุณากรอกชื่อบัญชีธนาคาร', { matchCase: false })
      .should('exist');
    }); 

    it('สมัครสมาชิกสำเร็จ', () => {
      cy.get('input[type="tel"]').type('0812345678');
      cy.get('input[placeholder="รหัสผ่าน (ขั้นต่ำ 6 ตัว)"]').type('Aa1122');
      cy.get('.dropdown-container button')
      .eq(0)
      .click();
      cy.contains('button', 'กสิกรไทย').click();
      cy.get('input[placeholder="เลขบัญชีธนาคาร"]')
      .type('1234859850');      
      cy.get('input[placeholder="ชื่อบัญชีธนาคาร"]')
      .type('Test RegistAuto');
      cy.get('input[placeholder="เลขบัญชีธนาคาร"]')
      .type('เช็ค')
      cy.contains('button', 'สมัครสมาชิก', { matchCase: false })
      .click({ force: true });
      cy.contains('button','ตกลง').click();
      cy.contains('สมัครสมาชิกสำเร็จ').should('be.visible');
    }); 

  });