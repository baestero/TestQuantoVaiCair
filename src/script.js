const valorSalario = document.querySelector("#valorSalario");
const valorDescontos = document.querySelector("#valorDescontos");
const btn = document.querySelector("#calc");
const res = document.querySelector("#res");
let vtS = document.querySelector("#vts");
let vtN = document.querySelector("#vtn");
let btnVts;
let salarioLiquido = document.querySelector(".salario-liquido");
let INSS = document.querySelector(".INSS");
let impostoDeRenda = document.querySelector(".imposto-de-renda");
let valeTransporte = document.querySelector(".valeTransporte");
let descontosAdicionais = document.querySelector(".descontos-adicionais");

vtS.addEventListener("click", () => {
  vtS.classList.add("ativo");
  vtN.classList.remove("ativo2");
  btnVts = true;
  console.log(btnVts);
});

vtN.addEventListener("click", () => {
  vtS.classList.remove("ativo");
  vtN.classList.add("ativo2");
  btnVts = false;
  console.log(btnVts);
});

function calculaLiquido() {
  let salario = valorSalario.value;
  salario = +salario.replace(".", "");
  let descontosAdd;
  let inss = 0.075;
  let ir = 0;
  let salarioDescontado;
  let vt;
  let resultado;

  if (salario === 0 || isNaN(salario)) {
    alert("Valor de entrada não é um numero valido");
  } else {
    function calculaInss() {
      if (salario <= 1412) {
        inss = salario * 0.075;
      } else if (salario > 1412 && salario <= 2666.68) {
        inss = salario * 0.09 - 21.18;
      } else if (salario > 2666.68 && salario <= 4000.03) {
        inss = salario * 0.12 - 101.18;
      } else if (salario > 4000.03 && salario <= 7786.02) {
        inss = salario * 0.14 - 181.18;
      } else if (salario > 7786.02) {
        inss = 908.86;
      }
    }
    calculaInss();

    salarioDescontado = salario - inss;

    function calculaIR() {
      if (salarioDescontado < 2259.21) {
        ir = 0;
      } else if (salarioDescontado >= 2259.21 && salarioDescontado < 2826.65) {
        ir = salarioDescontado * 0.075 - 169.44;
      } else if (salarioDescontado > 2826.35 && salarioDescontado < 3751.05) {
        ir = salarioDescontado * 0.15 - 381.44;
      } else if (salarioDescontado > 3751 && salarioDescontado < 4664.68) {
        ir = salarioDescontado * 0.225 - 662.77;
      } else if (salarioDescontado > 4464.68) {
        ir = salarioDescontado * 0.275 - 896;
      }
    }
    calculaIR();

    function animaNumeros(descontoFolha, tipoDesconto) {
      const incremento = tipoDesconto / 100;
      let start = 0;
      const timer = setInterval(() => {
        start += incremento;
        descontoFolha.innerHTML = start.toFixed(2);
        if (start >= tipoDesconto) {
          descontoFolha.innerHTML = tipoDesconto.toFixed(2);
          clearInterval(timer);
        }
      }, 20 * Math.random());
    }

    if (btnVts === true) {
      vt = salario * 0.06;
      descontosAdd = valorDescontos.value;
      descontosAdd = +descontosAdd.replace(".", "");
      resultado = salarioDescontado - ir - vt - descontosAdd;

      animaNumeros(salarioLiquido, resultado);
      animaNumeros(INSS, inss);
      animaNumeros(impostoDeRenda, ir);
      animaNumeros(valeTransporte, vt);
      animaNumeros(descontosAdicionais, descontosAdd);
    } else if (btnVts === false) {
      vt = 0.0;
      descontosAdd = valorDescontos.value;
      descontosAdd = +descontosAdd.replace(".", "");
      resultado = salarioDescontado - ir - descontosAdd;

      animaNumeros(salarioLiquido, resultado);
      animaNumeros(INSS, inss);
      animaNumeros(impostoDeRenda, ir);
      animaNumeros(valeTransporte, vt);
      animaNumeros(descontosAdicionais, descontosAdd);
    } else {
      alert("Selecione se deseja descontar Vale transporte ou não!");
    }
  }
}

btn.addEventListener("click", () => {
  calculaLiquido();
});

const animacao = document.querySelectorAll(".js-scroll");

animacao.forEach((item) => {
  item.classList.add("ativo1");
});
