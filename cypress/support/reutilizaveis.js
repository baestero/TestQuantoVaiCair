export const verificaTitulo = () => {
  cy.title().should("be.equal", "Quanto vai cair?");
};

export const calculaValorEm0 = () => {
  cy.get("#valorSalario").should("have.value", "0");
  cy.get("#calc").click();

  cy.on("window:alert", (textoDoAlerta) => {
    expect(textoDoAlerta).to.equal("Valor de entrada não é um numero valido");
  });
};

export const calculaValorLimpo = () => {
  cy.get("#valorSalario").clear().should("have.value", "");
  cy.get("#calc").click();

  cy.on("window:alert", (textoDoAlerta) => {
    expect(textoDoAlerta).to.equal("Valor de entrada não é um numero valido");
  });
};

export const salarioSemVT = () => {
  cy.get("#valorSalario").clear().should("have.value", "").type("3500");
  cy.get("#calc").click();

  cy.on("window:alert", (textoDoAlerta) => {
    expect(textoDoAlerta).to.equal(
      "Selecione se deseja descontar Vale transporte ou não!"
    );
  });
};

export const salarioComVtSIM = () => {
  cy.get("#valorSalario").clear().should("have.value", "").type("3500");
  cy.get("#vts").click().should("have.class", "ativo");
  cy.get("#calc").click();

  cy.get("#valeTransporte").should("text", "210.00");
};

export const salarioComVtNAO = () => {
  cy.get("#valorSalario").clear().should("have.value", "").type("3500");
  cy.get("#vtn").click().should("have.class", "ativo2");
  cy.get("#calc").click();

  cy.get("#valeTransporte").should("text", "0.00");
};

export const salarioComDescontosAddeVtSIM = () => {
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
};

export const salarioComDescontosAddeVtNAO = () => {
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
};

export const salarioComDescontosLimpoVtSIM = () => {
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
};

export const salarioComDescontosLimpoVtNAO = () => {
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
};

export const validarSalarioLiquido = () => {
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
};
