describe("Quanto vai cair?", () => {
  beforeEach(() => {
    cy.visit("./src/index.html");
  });
  it("verifica o titulo da aplicação", () => {
    cy.title().should("be.equal", "Quanto vai cair?");
  });

  it("calcular com valor estipulado em 0", () => {
    cy.get("#valorSalario").should("have.value", "0");
    cy.get("#calc").click();

    cy.on("window:alert", (textoDoAlerta) => {
      expect(textoDoAlerta).to.equal("Valor de entrada não é um numero valido");
    });
  });

  it("calcular com valor limpo", () => {
    cy.get("#valorSalario").clear().should("have.value", "");
    cy.get("#calc").click();

    cy.on("window:alert", (textoDoAlerta) => {
      expect(textoDoAlerta).to.equal("Valor de entrada não é um numero valido");
    });
  });

  it("preencher salario, sem selecionar preferencia por vale  transporte", () => {
    cy.get("#valorSalario").clear().should("have.value", "").type("3500");
    cy.get("#calc").click();

    cy.on("window:alert", (textoDoAlerta) => {
      expect(textoDoAlerta).to.equal(
        "Selecione se deseja descontar Vale transporte ou não!"
      );
    });
  });

  it("preencher salario e vale transporte: SIM", () => {
    cy.get("#valorSalario").clear().should("have.value", "").type("3500");
    cy.get("#vts").click().should("have.class", "ativo");
    cy.get("#calc").click();

    cy.get("#valeTransporte").should("text", "210.00");
  });

  it("preencher salario e vale transporte: NAO", () => {
    cy.get("#valorSalario").clear().should("have.value", "").type("3500");
    cy.get("#vtn").click().should("have.class", "ativo2");
    cy.get("#calc").click();

    cy.get("#valeTransporte").should("text", "0.00");
  });

  it('preencher salario, descontos adicionais e vale transporte: "SIM" ', () => {
    cy.get("#valorSalario")
      .clear()
      .should("have.value", "")
      .type("3500")
      .should("have.value", "3500");

    cy.get("#valorDescontos")
      .clear()
      .should("have.value", "")
      .type("100")
      .should("have.value", "100");

    cy.get("#vts").click().should("have.class", "ativo");
    cy.get("#calc").click();

    cy.get("#valeTransporte").should("text", "210.00");
    cy.get("#descontosAdicionais").should("text", "100.00");
  });

  it('preencher salario, descontos adicionais e vale transporte: "NAO" ', () => {
    cy.get("#valorSalario")
      .clear()
      .should("have.value", "")
      .type("3500")
      .should("have.value", "3500");

    cy.get("#valorDescontos")
      .clear()
      .should("have.value", "")
      .type("100")
      .should("have.value", "100");
    cy.get("#vtn").click().should("have.class", "ativo2");
    cy.get("#calc").click();

    cy.get("#valeTransporte").should("text", "0.00");
    cy.get("#descontosAdicionais").should("text", "100.00");
  });
  it('preencher salario, descontos adicionais (valor limpo)  e vale transporte: "SIM" ', () => {
    cy.get("#valorSalario")
      .clear()
      .should("have.value", "")
      .type("3500")
      .should("have.value", "3500");

    cy.get("#valorDescontos").clear().should("have.value", "");
    cy.get("#vts").click().should("have.class", "ativo");
    cy.get("#calc").click();

    cy.get("#valeTransporte").should("text", "210.00");
    cy.get("#descontosAdicionais").should("text", "0.00");
  });
  it('preencher salario, descontos adicionais (valor limpo)  e vale transporte: "NAO" ', () => {
    cy.get("#valorSalario")
      .clear()
      .should("have.value", "")
      .type("3500")
      .should("have.value", "3500");

    cy.get("#valorDescontos").clear().should("have.value", "");
    cy.get("#vtn").click().should("have.class", "ativo2");
    cy.get("#calc").click();

    cy.get("#valeTransporte").should("text", "0.00");
    cy.get("#descontosAdicionais").should("text", "0.00");
  });
  it("preencher descontos adicionais, vale transporte: 'SIM' sem salario bruto ", () => {
    cy.get("#valorDescontos")
      .clear()
      .should("have.value", "")
      .type("100")
      .should("have.value", "100");

    cy.get("#vts").click().should("have.class", "ativo");
    cy.get("#calc").click();

    cy.on("window:alert", (textoDoAlerta) => {
      expect(textoDoAlerta).to.equal("Valor de entrada não é um numero valido");
    });
  });
  it("preencher descontos adicionais, vale transporte: 'NÃO' sem salario bruto ", () => {
    cy.get("#valorDescontos")
      .clear()
      .should("have.value", "")
      .type("100")
      .should("have.value", "100");

    cy.get("#vtn").click().should("have.class", "ativo2");
    cy.get("#calc").click();

    cy.on("window:alert", (textoDoAlerta) => {
      expect(textoDoAlerta).to.equal("Valor de entrada não é um numero valido");
    });
  });

  it("Validar Salario Liquido", () => {
    let salarioBruto = 3500;
    let salarioLiquido;
    let inss;
    let impostoDeRenda;
    let valeTransporte;
    let descontosAdd;

    cy.get("#valorSalario")
      .clear()
      .should("have.value", "")
      .type("3500")
      .should("have.value", salarioBruto);

    cy.get("#valorDescontos")
      .clear()
      .should("have.value", "")
      .type("100")
      .should("have.value", "100");

    cy.get("#vts").click().should("have.class", "ativo");
    cy.get("#calc").click();

    cy.wait(2000);

    cy.get("#salarioLiquido")
      .invoke("text")
      .then((text) => {
        salarioLiquido = parseFloat(text.replace("R$", "").trim());
      });

    cy.get("#INSS")
      .invoke("text")
      .then((text) => {
        inss = parseFloat(text.replace("R$", "").trim());
      });

    cy.get("#impostoDeRenda")
      .invoke("text")
      .then((text) => {
        impostoDeRenda = parseFloat(text.replace("R$", "").trim());
      });

    cy.get("#valeTransporte")
      .invoke("text")
      .then((text) => {
        valeTransporte = parseFloat(text.replace("R$", "").trim());
      });

    cy.get("#descontosAdicionais")
      .invoke("text")
      .then((text) => {
        descontosAdd = parseFloat(text.replace("R$", "").trim());
      });

    cy.then(() => {
      const salarioLiquidoCalculado =
        salarioBruto - inss - impostoDeRenda - valeTransporte - descontosAdd;
      expect(salarioLiquido).to.be.closeTo(salarioLiquidoCalculado, 0.01);
    });
  });
});

context("Quanto vai cair (tablet)", () => {
  beforeEach(() => {
    cy.visit("./src/index.html");
    cy.viewport(820, 1180);
  });

  it("verifica o titulo da aplicação", () => {
    cy.title().should("be.equal", "Quanto vai cair?");
  });

  it("calcular com valor estipulado em 0", () => {
    cy.get("#valorSalario").should("have.value", "0");
    cy.get("#calc").click();

    cy.on("window:alert", (textoDoAlerta) => {
      expect(textoDoAlerta).to.equal("Valor de entrada não é um numero valido");
    });
  });

  it("calcular com valor limpo", () => {
    cy.get("#valorSalario").clear().should("have.value", "");
    cy.get("#calc").click();

    cy.on("window:alert", (textoDoAlerta) => {
      expect(textoDoAlerta).to.equal("Valor de entrada não é um numero valido");
    });
  });

  it("preencher salario, sem selecionar preferencia por vale  transporte", () => {
    cy.get("#valorSalario").clear().should("have.value", "").type("3500");
    cy.get("#calc").click();

    cy.on("window:alert", (textoDoAlerta) => {
      expect(textoDoAlerta).to.equal(
        "Selecione se deseja descontar Vale transporte ou não!"
      );
    });
  });

  it("preencher salario e vale transporte: SIM", () => {
    cy.get("#valorSalario").clear().should("have.value", "").type("3500");
    cy.get("#vts").click().should("have.class", "ativo");
    cy.get("#calc").click();

    cy.get("#valeTransporte").should("text", "210.00");
  });

  it("preencher salario e vale transporte: NAO", () => {
    cy.get("#valorSalario").clear().should("have.value", "").type("3500");
    cy.get("#vtn").click().should("have.class", "ativo2");
    cy.get("#calc").click();

    cy.get("#valeTransporte").should("text", "0.00");
  });

  it('preencher salario, descontos adicionais e vale transporte: "SIM" ', () => {
    cy.get("#valorSalario")
      .clear()
      .should("have.value", "")
      .type("3500")
      .should("have.value", "3500");

    cy.get("#valorDescontos")
      .clear()
      .should("have.value", "")
      .type("100")
      .should("have.value", "100");

    cy.get("#vts").click().should("have.class", "ativo");
    cy.get("#calc").click();

    cy.get("#valeTransporte").should("text", "210.00");
    cy.get("#descontosAdicionais").should("text", "100.00");
  });

  it('preencher salario, descontos adicionais e vale transporte: "NAO" ', () => {
    cy.get("#valorSalario")
      .clear()
      .should("have.value", "")
      .type("3500")
      .should("have.value", "3500");

    cy.get("#valorDescontos")
      .clear()
      .should("have.value", "")
      .type("100")
      .should("have.value", "100");
    cy.get("#vtn").click().should("have.class", "ativo2");
    cy.get("#calc").click();

    cy.get("#valeTransporte").should("text", "0.00");
    cy.get("#descontosAdicionais").should("text", "100.00");
  });
  it('preencher salario, descontos adicionais (valor limpo)  e vale transporte: "SIM" ', () => {
    cy.get("#valorSalario")
      .clear()
      .should("have.value", "")
      .type("3500")
      .should("have.value", "3500");

    cy.get("#valorDescontos").clear().should("have.value", "");
    cy.get("#vts").click().should("have.class", "ativo");
    cy.get("#calc").click();

    cy.get("#valeTransporte").should("text", "210.00");
    cy.get("#descontosAdicionais").should("text", "0.00");
  });
  it('preencher salario, descontos adicionais (valor limpo)  e vale transporte: "NAO" ', () => {
    cy.get("#valorSalario")
      .clear()
      .should("have.value", "")
      .type("3500")
      .should("have.value", "3500");

    cy.get("#valorDescontos").clear().should("have.value", "");
    cy.get("#vtn").click().should("have.class", "ativo2");
    cy.get("#calc").click();

    cy.get("#valeTransporte").should("text", "0.00");
    cy.get("#descontosAdicionais").should("text", "0.00");
  });
  it("preencher descontos adicionais, vale transporte: 'SIM' sem salario bruto ", () => {
    cy.get("#valorDescontos")
      .clear()
      .should("have.value", "")
      .type("100")
      .should("have.value", "100");

    cy.get("#vts").click().should("have.class", "ativo");
    cy.get("#calc").click();

    cy.on("window:alert", (textoDoAlerta) => {
      expect(textoDoAlerta).to.equal("Valor de entrada não é um numero valido");
    });
  });
  it("preencher descontos adicionais, vale transporte: 'NÃO' sem salario bruto ", () => {
    cy.get("#valorDescontos")
      .clear()
      .should("have.value", "")
      .type("100")
      .should("have.value", "100");

    cy.get("#vtn").click().should("have.class", "ativo2");
    cy.get("#calc").click();

    cy.on("window:alert", (textoDoAlerta) => {
      expect(textoDoAlerta).to.equal("Valor de entrada não é um numero valido");
    });
  });

  it("Validar Salario Liquido", () => {
    let salarioBruto = 3500;
    let salarioLiquido;
    let inss;
    let impostoDeRenda;
    let valeTransporte;
    let descontosAdd;

    cy.get("#valorSalario")
      .clear()
      .should("have.value", "")
      .type("3500")
      .should("have.value", salarioBruto);

    cy.get("#valorDescontos")
      .clear()
      .should("have.value", "")
      .type("100")
      .should("have.value", "100");

    cy.get("#vts").click().should("have.class", "ativo");
    cy.get("#calc").click();

    cy.wait(2000);

    cy.get("#salarioLiquido")
      .invoke("text")
      .then((text) => {
        salarioLiquido = parseFloat(text.replace("R$", "").trim());
      });

    cy.get("#INSS")
      .invoke("text")
      .then((text) => {
        inss = parseFloat(text.replace("R$", "").trim());
      });

    cy.get("#impostoDeRenda")
      .invoke("text")
      .then((text) => {
        impostoDeRenda = parseFloat(text.replace("R$", "").trim());
      });

    cy.get("#valeTransporte")
      .invoke("text")
      .then((text) => {
        valeTransporte = parseFloat(text.replace("R$", "").trim());
      });

    cy.get("#descontosAdicionais")
      .invoke("text")
      .then((text) => {
        descontosAdd = parseFloat(text.replace("R$", "").trim());
      });

    cy.then(() => {
      const salarioLiquidoCalculado =
        salarioBruto - inss - impostoDeRenda - valeTransporte - descontosAdd;
      expect(salarioLiquido).to.be.closeTo(salarioLiquidoCalculado, 0.01);
    });
  });
});

context("Quanto vai cair (mobile)", () => {
  beforeEach(() => {
    cy.visit("./src/index.html");
    cy.viewport(414, 896);
  });

  it("verifica o titulo da aplicação", () => {
    cy.title().should("be.equal", "Quanto vai cair?");
  });

  it("calcular com valor estipulado em 0", () => {
    cy.get("#valorSalario").should("have.value", "0");
    cy.get("#calc").click();

    cy.on("window:alert", (textoDoAlerta) => {
      expect(textoDoAlerta).to.equal("Valor de entrada não é um numero valido");
    });
  });

  it("calcular com valor limpo", () => {
    cy.get("#valorSalario").clear().should("have.value", "");
    cy.get("#calc").click();

    cy.on("window:alert", (textoDoAlerta) => {
      expect(textoDoAlerta).to.equal("Valor de entrada não é um numero valido");
    });
  });

  it("preencher salario, sem selecionar preferencia por vale  transporte", () => {
    cy.get("#valorSalario").clear().should("have.value", "").type("3500");
    cy.get("#calc").click();

    cy.on("window:alert", (textoDoAlerta) => {
      expect(textoDoAlerta).to.equal(
        "Selecione se deseja descontar Vale transporte ou não!"
      );
    });
  });

  it("preencher salario e vale transporte: SIM", () => {
    cy.get("#valorSalario").clear().should("have.value", "").type("3500");
    cy.get("#vts").click().should("have.class", "ativo");
    cy.get("#calc").click();

    cy.get("#valeTransporte").should("text", "210.00");
  });

  it("preencher salario e vale transporte: NAO", () => {
    cy.get("#valorSalario").clear().should("have.value", "").type("3500");
    cy.get("#vtn").click().should("have.class", "ativo2");
    cy.get("#calc").click();

    cy.get("#valeTransporte").should("text", "0.00");
  });

  it('preencher salario, descontos adicionais e vale transporte: "SIM" ', () => {
    cy.get("#valorSalario")
      .clear()
      .should("have.value", "")
      .type("3500")
      .should("have.value", "3500");

    cy.get("#valorDescontos")
      .clear()
      .should("have.value", "")
      .type("100")
      .should("have.value", "100");

    cy.get("#vts").click().should("have.class", "ativo");
    cy.get("#calc").click();

    cy.get("#valeTransporte").should("text", "210.00");
    cy.get("#descontosAdicionais").should("text", "100.00");
  });

  it('preencher salario, descontos adicionais e vale transporte: "NAO" ', () => {
    cy.get("#valorSalario")
      .clear()
      .should("have.value", "")
      .type("3500")
      .should("have.value", "3500");

    cy.get("#valorDescontos")
      .clear()
      .should("have.value", "")
      .type("100")
      .should("have.value", "100");
    cy.get("#vtn").click().should("have.class", "ativo2");
    cy.get("#calc").click();

    cy.get("#valeTransporte").should("text", "0.00");
    cy.get("#descontosAdicionais").should("text", "100.00");
  });
  it('preencher salario, descontos adicionais (valor limpo)  e vale transporte: "SIM" ', () => {
    cy.get("#valorSalario")
      .clear()
      .should("have.value", "")
      .type("3500")
      .should("have.value", "3500");

    cy.get("#valorDescontos").clear().should("have.value", "");
    cy.get("#vts").click().should("have.class", "ativo");
    cy.get("#calc").click();

    cy.get("#valeTransporte").should("text", "210.00");
    cy.get("#descontosAdicionais").should("text", "0.00");
  });
  it('preencher salario, descontos adicionais (valor limpo)  e vale transporte: "NAO" ', () => {
    cy.get("#valorSalario")
      .clear()
      .should("have.value", "")
      .type("3500")
      .should("have.value", "3500");

    cy.get("#valorDescontos").clear().should("have.value", "");
    cy.get("#vtn").click().should("have.class", "ativo2");
    cy.get("#calc").click();

    cy.get("#valeTransporte").should("text", "0.00");
    cy.get("#descontosAdicionais").should("text", "0.00");
  });
  it("preencher descontos adicionais, vale transporte: 'SIM' sem salario bruto ", () => {
    cy.get("#valorDescontos")
      .clear()
      .should("have.value", "")
      .type("100")
      .should("have.value", "100");

    cy.get("#vts").click().should("have.class", "ativo");
    cy.get("#calc").click();

    cy.on("window:alert", (textoDoAlerta) => {
      expect(textoDoAlerta).to.equal("Valor de entrada não é um numero valido");
    });
  });
  it("preencher descontos adicionais, vale transporte: 'NÃO' sem salario bruto ", () => {
    cy.get("#valorDescontos")
      .clear()
      .should("have.value", "")
      .type("100")
      .should("have.value", "100");

    cy.get("#vtn").click().should("have.class", "ativo2");
    cy.get("#calc").click();

    cy.on("window:alert", (textoDoAlerta) => {
      expect(textoDoAlerta).to.equal("Valor de entrada não é um numero valido");
    });
  });

  it("Validar Salario Liquido", () => {
    let salarioBruto = 3500;
    let salarioLiquido;
    let inss;
    let impostoDeRenda;
    let valeTransporte;
    let descontosAdd;

    cy.get("#valorSalario")
      .clear()
      .should("have.value", "")
      .type("3500")
      .should("have.value", salarioBruto);

    cy.get("#valorDescontos")
      .clear()
      .should("have.value", "")
      .type("100")
      .should("have.value", "100");

    cy.get("#vts").click().should("have.class", "ativo");
    cy.get("#calc").click();

    cy.wait(2000);

    cy.get("#salarioLiquido")
      .invoke("text")
      .then((text) => {
        salarioLiquido = parseFloat(text.replace("R$", "").trim());
      });

    cy.get("#INSS")
      .invoke("text")
      .then((text) => {
        inss = parseFloat(text.replace("R$", "").trim());
      });

    cy.get("#impostoDeRenda")
      .invoke("text")
      .then((text) => {
        impostoDeRenda = parseFloat(text.replace("R$", "").trim());
      });

    cy.get("#valeTransporte")
      .invoke("text")
      .then((text) => {
        valeTransporte = parseFloat(text.replace("R$", "").trim());
      });

    cy.get("#descontosAdicionais")
      .invoke("text")
      .then((text) => {
        descontosAdd = parseFloat(text.replace("R$", "").trim());
      });

    cy.then(() => {
      const salarioLiquidoCalculado =
        salarioBruto - inss - impostoDeRenda - valeTransporte - descontosAdd;
      expect(salarioLiquido).to.be.closeTo(salarioLiquidoCalculado, 0.01);
    });
  });
});
